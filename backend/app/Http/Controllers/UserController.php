<?php

namespace App\Http\Controllers;

use App\Debug;
use App\Role;
use App\RoleUser;
use App\SchoolClass;
use App\StudentClassSubject;
use App\StudentSubject;
use App\Subject;
use App\TeacherClassSubject;
use App\User;
use App\UserInfo;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Excel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Extensions\EhlaGuzzleClient;

use Carbon\Carbon;

class UserController extends Controller
{

  public $class, $role, $errors;
  public $subject;
  public $student;
  public $teacher;
  public $teacher_subject_class;
  public $access_token;
  public $_client;
  public $_teachers_no, $_students_no;

  public function __construct()
  {

    $this->middleware(function ($request, $next) {
      $this->access_token = json_decode(Auth::user()->session)->access_token;
      return $next($request);
    });

    $this->_client = new EhlaGuzzleClient();

  }

  private function createUserInfo($data,$id=null){

    if ($userinfo = UserInfo::where('user_id',$id)->first()){

    }else{
      $userinfo = New UserInfo();
    }


    foreach($data as $k => $v){
      $userinfo->$k = $v;
    }
    $userinfo->save();
  }
  private function getClassID($class_name)
  {
    $ID = SchoolClass::where('c_name', $class_name)->pluck('id')->first();
    return $ID;
  }
  private function init()
  {
    foreach (Subject::all() as $v) {
      $this->subject[$v->id] = strtolower(str_replace(' ', '_', $v->s_name_en));
    }

    foreach (SchoolClass::all() as $v) {
      $this->class[$v->id] = strtolower($v->c_name);
    }

    foreach (Role::all() as $v) {
      $this->role[$v->id] = strtolower($v->name);
    }

    foreach(UserInfo::whereNull('class_no')->get() as $v){
      $this->_teachers_no[$v->user_id] = strtolower($v->school_num);
    }

    foreach(UserInfo::whereNotNull('class_no')->get() as $v){
      $this->_students_no[$v->user_id] = strtolower($v->school_num);
    }
  }

  public function changepw(Request $request)
  {

    $input = $request->json('params');
    $userSession = empty(Auth::user()->session) ? null : json_decode(Auth::user()->session);
    if (!$userSession) {
      return response()->json('', 401);
    }
    $access_token = $userSession->access_token;

    $client = new EhlaGuzzleClient();
    $data = $client->post(config('variables.changePWUrl') . $access_token, $input);
    return $data;
  }

  //Done
  public function getExcel(Request $request)
  {

    if($request->type == 'student') {
      $ids = StudentClassSubject::get()->pluck('student_id');
      $school_list = UserInfo::whereIn('user_id',$ids)
        ->leftJoin('student_class_subject', 'user_info.user_id', '=', 'student_class_subject.student_id')
        ->leftJoin('classes','student_class_subject.class_id','=','classes.id')
        ->select('c_name as class_name','class_no','realname_zh','realname_en','username','default_password')->orderBy('class_name','asc')->orderBy('class_no')->get()->toArray();
    }
    else if ($request->type =='teacher') {
      $ids = TeacherClassSubject::get()->pluck('teacher_id');
      $school_list = UserInfo::whereIn('user_id', $ids)->get();
    }





    $myFile =  Excel::create('school_list', function ($excel) use ($school_list) {
      $excel->sheet('sheet_1', function ($sheet) use ($school_list) {
        $sheet->fromArray($school_list);
      });
    });

    $myFile = $myFile->string('xlsx'); //change xlsx for the format you want, default is xls
    $response =  array(
      'name' => $request->type."_list", //no extention needed
      'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($myFile) //mime type of used format
    );
    return response()->json($response);

  }

  //Done Import teacher
  public function postTeacher(Request $request)
  {

//    print_r();
    $this->init();

    if ($request->hasFile('file')) {
      $path = $request->file('file')->getRealPath();
      Excel::load($path, function ($reader) use ($request) {
        $results = $reader->get()->toArray();
        $teacher_sheet = $results[0];

        $title = ['teacher_no', 'realname_en', 'realname_zh', 'class', 'subject'];

        $i = 0;

        foreach ($title as $v) {
          if (!array_key_exists($v, $teacher_sheet[0])) {
            $this->errors[$i] = 'No this column ' . $v;
            $i++;
          }
        }

        foreach ($teacher_sheet as $v) {

          if (!in_array(strtolower($v['class']), $this->class)) {
            $this->errors[$i] = 'No this class ' . $v['class'];
            $i++;
          }
          if (!in_array(strtolower($v['subject']), $this->subject)) {
            $this->errors[$i] = 'No this subject ' . $v['subject'];
            $i++;
          }

          if(in_array(strtolower($v['teacher_no']),$this->_teachers_no)){
            $this->errors[$i] = 'Teacher No. cannot be duplicated ' . $v['teacher_no'];
            $i++;
          }

        }

        if (!$this->errors) {
          foreach ($teacher_sheet as $k => $v) {
            $teacher[$v['teacher_no']]['school_num'] = $v['teacher_no'];
            $teacher[$v['teacher_no']]['realname_en'] = $v['realname_en'];
            $teacher[$v['teacher_no']]['realname_zh'] = $v['realname_zh'];

            $new_teacher_set[$k]['class_id'] = array_search(strtolower($v['class']), $this->class);
            $new_teacher_set[$k]['subject_id'] = array_search(strtolower($v['subject']), $this->subject);

          }

          $teachers = array_values($teacher);

          $input['userGroup'] = 'teacher';
          $input['accType'] = "";
          $input['users'] = $teachers;

          $access_token = json_decode(Auth::user()->session)->access_token;
          $client = new EhlaGuzzleClient();
          $res = $client->post(config('variables.createAccount') . $access_token, $input);

          if ($res['success']) {
            foreach ($res['data'] as $key => $value) {
              $teacher_num_id[$value['school_num']]['user_id'] = $value['user_id'];
              $teacher_num_id[$value['school_num']]['password'] = $value['password'];
              $teacher_num_id[$value['school_num']]['username'] = $value['username'];
              $teacher_role[$key]['role_id'] = array_search('teacher', $this->role);
              $teacher_role[$key]['user_id'] = $value['user_id'];
            }
          }


          foreach ($teacher_sheet as $k => $v) {
            $new_teacher_set[$k]['teacher_id'] = $teacher_num_id[$v['teacher_no']]['user_id'];
            $new_teacher_set[$k]['class_id'] = array_search(strtolower($v['class']), $this->class);
            $new_teacher_set[$k]['subject_id'] = array_search(strtolower($v['subject']), $this->subject);

            $teacher_info_set[$v['teacher_no']]['user_id']=$teacher_num_id[$v['teacher_no']]['user_id'];
            $teacher_info_set[$v['teacher_no']]['username']=$teacher_num_id[$v['teacher_no']]['username'];
            $teacher_info_set[$v['teacher_no']]['realname_en']=$v['realname_en'];
            $teacher_info_set[$v['teacher_no']]['realname_zh']=$v['realname_zh'];
            $teacher_info_set[$v['teacher_no']]['school_num']=$v['teacher_no'];
            $teacher_info_set[$v['teacher_no']]['default_password']= $teacher_num_id[$v['teacher_no']]['password'];
            $teacher_info_set[$v['teacher_no']]['created_at']=Carbon::now();
            $teacher_info_set[$v['teacher_no']]['updated_at']=Carbon::now();

          }

          $t_set = array_values($teacher_info_set);

          TeacherClassSubject::insert($new_teacher_set);
          RoleUser::insert($teacher_role);
          UserInfo::insert($t_set);
        }
      });
      if ($this->errors) {
        $result = [
          'status' => false,
          'code' => '',
          'message' => $this->errors
        ];
        return json($result);
      } else
        return success();
    } else {
      $result = [
        'status' => false,
        'code' => '',
        'message' => 'No file.'
      ];
      return json($result);
    }
  }

  //Done Import Student
  public function postStudent(Request $request)
  {
    $this->init();

    $total_receive = 0;
    if ($request->hasFile('file')) {
      $path = $request->file('file')->getRealPath();
      Excel::load($path, function ($reader) use ($request,&$total_receive) {
        $results = $reader->get()->toArray();
        $student_sheet = $results[0];



        $i = 0;

//        if ($results[0]) {
//          foreach (array_keys($results[0][0]) as $v) {
//            $subjects[] = $v;
//          }
//        }

        $subjects_from_excel = array_keys($results[0][0]);

        $subjects_db = Subject::all();

        foreach ($subjects_db as $v) {
          $new_subject_db[] = strtolower(str_replace(' ', '_', $v->s_name_en));
        }

        for ($j = 5; $j < count($subjects_from_excel); $j++) {
          if (!in_array(strtolower($subjects_from_excel[$j]), $new_subject_db)) {
            $this->errors[$i] = 'No this subject ' . $subjects_from_excel[$j];
          }
        }

        $title = ['student_no', 'realname_en', 'realname_zh', 'class'];


        foreach ($title as $v) {
          if (!array_key_exists($v, $student_sheet[0])) {
            $this->errors[$i] = 'No this column ' . $v;
            $i++;
          }
        }


        foreach ($student_sheet as $v) {

          if (!in_array(strtolower($v['class']), $this->class)) {
            $this->errors[$i] = 'No this class ' . $v['class'];
            $i++;
          }

          if(in_array(strtolower($v['student_no']),$this->_students_no)){
            $this->errors[$i] = 'Student No. cannot be duplicated ' . $v['student_no'];
            $i++;
          }

        }

        if (!$this->errors) {
          foreach ($student_sheet as $k => $v) {
            $student[$v['student_no']]['school_num'] = $v['student_no'];
            $student[$v['student_no']]['realname_en'] = $v['realname_en'];
            $student[$v['student_no']]['realname_zh'] = $v['realname_zh'];

//            $new_teacher_set[$k]['class_id'] = array_search(strtolower($v['class']), $this->class);
//            $new_teacher_set[$k]['subject_id'] = array_search(strtolower($v['subject']), $this->subject);

          }

          $students = array_values($student);



//          $debug = New Debug();
//          $debug->context = json_encode($input);
//          $debug->save();

          $total_sent = count($students);
          $chuck_no = ceil($total_sent/250);

          foreach(array_chunk($students, $chuck_no) as $curta ){
            $input['userGroup'] = 'student';
            $input['accType'] = "";
            $input['users'] = $curta;
            $res = $this->_client->post(config('variables.createAccount') . $this->access_token, $input);

  //          $debug = New Debug();
  //          $debug->context = json_encode($res);
  //          $debug->save();

            if ($res['success']) {
              foreach ($res['data'] as $key => $value) {
                $student_num_id[$value['school_num']]['user_id'] = $value['user_id'];
                $student_num_id[$value['school_num']]['password'] = $value['password'];
                $student_num_id[$value['school_num']]['username'] = $value['username'];
  //              $teacher_role[$key]['role_id'] = array_search('student', $this->role);
  //              $teacher_role[$key]['user_id'] = $value['user_id'];
              }
            }
          }

          $total_receive = count($student_num_id);

          if($total_sent == $total_receive) {

            foreach ($student_sheet as $k => $v) {
              if($v['english']==='Y'){
                $new_student_set[$k]['student_id'] = $student_num_id[$v['student_no']]['user_id'];
                $new_student_set[$k]['class_id'] = array_search(strtolower($v['class']), $this->class);
                $new_student_set[$k]['subject_id'] = array_search('english', $this->subject);
                $new_student_set[$k]['created_at'] = Carbon::now();
                $new_student_set[$k]['updated_at'] = Carbon::now();

                $student_info_set[$k]['user_id']=$student_num_id[$v['student_no']]['user_id'];
                $student_info_set[$k]['username']=$student_num_id[$v['student_no']]['username'];
                $student_info_set[$k]['realname_en']=$v['realname_en'];
                $student_info_set[$k]['realname_zh']=$v['realname_zh'];
                $student_info_set[$k]['school_num']=$v['student_no'];
                $student_info_set[$k]['class_no']=$v['class_no'];
                $student_info_set[$k]['default_password']= $student_num_id[$v['student_no']]['password'];
                $student_info_set[$k]['created_at']=Carbon::now();
                $student_info_set[$k]['updated_at']=Carbon::now();

              }
            }

            try{
              DB::transaction(function () use ($new_student_set,$student_info_set) {
                StudentClassSubject::insert($new_student_set);
                UserInfo::insert($student_info_set);
              },3);
            } catch (\Exception $e) {

            }
          }else{
            $this->errors[$i] = 'Excel not match usermodel';
          }
//          RoleUser::insert($teacher_role);
          ;
        }
      });
      if ($this->errors) {
        $result = [
          'status' => false,
          'code' => '',
          'message' => $this->errors
        ];

        return json($result);
      } else

        $message[0] = 'Total import '.$total_receive;
        $result = [
          'status' => true,
          'code' => '',
          'message' => $message
        ];

      return json($result);

    } else {
      $result = [
        'status' => false,
        'code' => '',
        'message' => 'No file.'
      ];
      return json($result);
    }
  }

  //Done Create teacher
  public function postSingleTeacher(Request $request)
  {
//    if ($class_id = $this->getClassID($request->className)) {
    $this->init();

    $input['userGroup'] = 'teacher';
    $input['accType'] = "";
    $input['users'][0]['realname_en'] = $request->realname_en;
    $input['users'][0]['realname_zh'] = $request->realname_zh;
    $input['users'][0]['username'] = $request->username;
    $input['users'][0]['password'] = $request->password;
    $input['users'][0]['school_num'] = $request->school_num;

    $access_token = json_decode(Auth::user()->session)->access_token;
    $client = new EhlaGuzzleClient();
    $res = $client->post(config('variables.createAccount') . $access_token, $input);

    $debug = new Debug();
    $debug->context = 'Create Single Teacher '.json_encode($res);
    $debug->save();

    if($res['success']){
      foreach ($request->className as $k => $v) {
        $class_id = $this->getClassID($v);
        $scs = New TeacherClassSubject();
        $scs->class_id = $class_id;
        $scs->teacher_id = $res['data'][0]['user_id'];
        $scs->subject_id = '1';
        $scs->save();
      }

      $role_user = new RoleUser();
      $role_user->user_id = $res['data'][0]['user_id'];
      $role_user->role_id = $request->role_id;
      $role_user->save();

      $data = [
        'user_id'=>$res['data'][0]['user_id'],
        'realname_zh' =>$request->realname_zh,
        'realname_en' =>$request->realname_en,
        'school_num' =>$request->school_num,
        'default_password' =>$request->password,
        'username' => $request->username,
      ];

      $this->createUserInfo($data);

    }

    return return_success();

//    } else {
//      $result = [
//        'status' => false,
//        'code' => '',
//        'message' => 'No such class'
//      ];
//      return error_json($result);
//    }


//    dd($request->all());

//    $rules = array('email' => 'unique:users,email');
//
//    $validator = Validator::make($request->all(), $rules);
//
//    if ($validator->fails()) {
//      $result = [
//        'status' => false,
//        'code' => '',
//        'message' => $validator->errors()
//      ];
//      return error_json($result);
//    }
//
//
//    DB::transaction(function () use ($request) {
//
//
//      $user = New User();
//      $user->email = $request->email;
//
//      $user->username = $request->username;
//      $user->password = $request->password;
//      $user->user_group = 3;
//      $user->save();
//
//      //user role 3 = student
//      $user->roles()->attach(5);
//
//      $this->init();
//
//      $count = 0;
//      foreach ($request->class_subject as $k => $v) {
//
//
//        $class_id = (array_key_exists(strtolower($v['class']['id']), $this->class)) ? $v['class']['id'] : false;
//        $subject_id = (array_key_exists(strtolower($v['subject']['id']), $this->subject)) ? $v['subject']['id'] : false;
//
//
//        if ($class_id && $subject_id) {
//          $teacher_class_subject = New TeacherClassSubject();
//          $teacher_class_subject->teacher_id = $user->id;
//          $teacher_class_subject->class_id = $class_id;
//          $teacher_class_subject->subject_id = $subject_id;
//          $teacher_class_subject->save();
//
//          $scs = StudentClassSubject::where('class_id', $class_id)->get()->pluck('student_id');
//          foreach ($scs as $k => $v) {
//            $new_scs[$count]['student_id'] = $v;
//            $new_scs[$count]['teacher_class_subject_id'] = $teacher_class_subject->id;
//            $count++;
//          }
//
//
//        } else {
//          $result = [
//            'status' => false,
//            'code' => '',
//            'message' => ['No such class or subject']
//          ];
//          return error_json($result);
//        }
//
//
//      }
//
//
//      StudentSubject::insert($new_scs);
//
//    }, 2);

    return return_success();
  }

  //Done Edit teacher
  public function putSingleTeacher(Request $request)
  {

//    print_r($request->all());
//    die();

    $input['id'] = $request->teacher_id;
    $input['realname_en'] = $request->realname_en;
    $input['realname_zh'] = $request->realname_zh;
    if (!empty($request->password))
      $input['password'] = $request->password;
    $input['school_num'] = $request->school_num;

    $access_token = json_decode(Auth::user()->session)->access_token;

    $client = new EhlaGuzzleClient();
    $res = $client->post(config('variables.updateUserInfo') . $access_token, $input);

    $debug = new Debug();
    $debug->context = 'Update single teacher '.json_encode($res);
    $debug->save();

    if($res['success']){
      TeacherClassSubject::where('teacher_id', $request->teacher_id)->delete();

      foreach ($request->className as $k => $v) {
        $class_id = $this->getClassID($v);
        $scs = New TeacherClassSubject();
        $scs->class_id = $class_id;
        $scs->teacher_id = $request->teacher_id;
        $scs->subject_id = '1';
        $scs->save();
      }

      RoleUser::where('user_id',$request->teacher_id)->delete();
      $role = New RoleUser();
      $role->user_id=$request->teacher_id;
      $role->role_id=$request->role_id;
      $role->save();

      $data = [
        'realname_zh' =>$request->realname_zh,
        'realname_en' =>$request->realname_en,
        'school_num' =>$request->school_num,
        'username' => $request->username
      ];
      if (!empty($request->password))
        $data['default_password'] = $request->password;

      $this->createUserInfo($data,$request->teacher_id);

    }

    return success();

  }

  //Done Create student
  public function postSingleStudent(Request $request)
  {

    if ($class_id = $this->getClassID($request->className)) {


      $input['userGroup'] = 'student';
      $input['accType'] = "";
      $input['users'][0]['realname_en'] = $request->realname_en;
      $input['users'][0]['realname_zh'] = $request->realname_zh;
      $input['users'][0]['username'] = $request->username;
      $input['users'][0]['password'] = $request->password;
      $input['users'][0]['school_num'] = $request->school_num;

      $access_token = json_decode(Auth::user()->session)->access_token;
      $client = new EhlaGuzzleClient();
      $res = $client->post(config('variables.createAccount') . $access_token, $input);

      $debug = new Debug();
      $debug->context = 'Create Single Student '.json_encode($res);
      $debug->save();

      if($res['success']){
        $scs = New StudentClassSubject();
        $scs->class_id = $class_id;
        $scs->student_id = $res['data'][0]['user_id'];
        $scs->subject_id = '1';
        $scs->save();

        $data = [
          'user_id'=>$res['data'][0]['user_id'],
          'realname_zh' =>$request->realname_zh,
          'realname_en' =>$request->realname_en,
          'school_num' =>$request->school_num,
          'class_no' =>$request->classNo,
          'default_password' =>$request->password,
          'username' => $res['data'][0]['username'],
        ];

        $this->createUserInfo($data);

      }

      return return_success();

    } else {
      $result = [
        'status' => false,
        'code' => '',
        'message' => 'No such class'
      ];
      return error_json($result);
    }


//    $rules = array('email' => 'unique:users,email');
//
//    $validator = Validator::make($request->all(), $rules);
//
//    if ($validator->fails()) {
//      $result = [
//        'status' => false,
//        'code' => '',
//        'message' => $validator->errors()
//      ];
//      return error_json($result);
//    }

//    try {
//      DB::transaction(function () use ($request) {
//
//        $user = New User();
//        $user->username = $request->username;
//        $user->email = $request->email;
//        $user->password = $request->password;
//        //$user->student_id = $request->student_id;
//        $user->save();
//
//        //user role 3 = student
//        $user->roles()->attach(3);
//
//        $scs = New StudentClassSubject();
//        $scs->class_id = $request->class_id;
//        $scs->student_id = $user->id;
//        $scs->save();
//
//        $this->init();
//
//        foreach (User::all() as $v) {
//          $this->student[$v->id] = $v->email;
//        }
//
//
//        $class_id = (array_key_exists($request->class_id, $this->class)) ? $request->class_id : false;
//        $user_id = array_search(strtolower($request->email), $this->student);
//
//
//        if ($class_id) {
//          $tcs = TeacherClassSubject::where('class_id', $class_id)->get();
//
//
//          foreach ($tcs as $v) {
//            $student_subject = New StudentSubject();
//            $student_subject->teacher_class_subject_id = $v->id;
//            $student_subject->student_id = $user_id;
//            $student_subject->save();
//          }
//        } else {
//          $result = [
//            'status' => false,
//            'code' => '',
//            'message' => ['No such class']
//          ];
//          return error_json($result);
//        }
//
//
//        //      foreach ($request->class_subject as $k => $v) {
//        //        $class_id = array_search(strtolower($v['class']['id']), $this->class);
//        //        $subject_id = array_search(strtolower($v['subject']['id']), $this->subject);
//        //
//        //
//        //        if ($class_id && $subject_id) {
//        //
//        //          //TODO Create student subject class bind to teacher
//        //
//        //        } else {
//        //          $result = [
//        //            'status' => false,
//        //            'code' => '',
//        //            'message' => ['No such class or subject']
//        //          ];
//        //          return error_json($result);
//        //        }
//        //      }
//
//      }, 2);
//    } catch (\Exception $e) {
//    } catch (\Throwable $e) {
//    }


  }

  //Done Edit student
  public function putSingleStudent(Request $request)
  {


//    print_r($request);
    
    if ($class_id = $this->getClassID($request->className)) {


      $input['id'] = $request->student_id;
      $input['realname_en'] = $request->realname_en;
      $input['realname_zh'] = $request->realname_zh;
      if (!empty($request->password))
        $input['password'] = $request->password;
      $input['school_num'] = $request->school_num;

      $access_token = json_decode(Auth::user()->session)->access_token;

      $client = new EhlaGuzzleClient();
      $res = $client->post(config('variables.updateUserInfo') . $access_token, $input);

      $debug = new Debug();
      $debug->context = 'Update Single Student '.json_encode($res);
      $debug->save();

      if ($res['success']) {
        $scs = StudentClassSubject::where('student_id', $request->student_id)->first();
        $scs->class_id = $class_id;
        $scs->save();

        $data = [
          'realname_zh' =>$request->realname_zh,
          'realname_en' =>$request->realname_en,
          'school_num' =>$request->school_num,
          'class_no' => $request->classNo,
          'username' =>$request->username,
        ];
        if (!empty($request->password))
        $data['default_password'] = $request->password;

        $this->createUserInfo($data,$request->student_id);

      }

      return return_success();

    } else {
      $result = [
        'status' => false,
        'code' => '',
        'message' => 'No such class'
      ];
      return error_json($result);
    }


//    DB::transaction(function () use ($request) {
//
//      $user = User::where('id',$request->id)->first();
//      $user->username = $request->username;
//      $user->password = $request->password;
//      $user->user_group = 3;
//      $user->save();
//
//      $user->roles()->sync($request->roles[0]['id']);
//
//      $scs = StudentClassSubject::where('student_id',$request->id)->first();
//      $scs->class_id = $request->class_id;
//      $scs->student_id = $request->id;
//      $scs->save();
//
//      $this->init();
//
//
//      StudentSubject::where('student_id',$request->id)->delete();
//
//
//      $class_id = $request->class_id;
//      $user_id = $request->id;
//
//      $tcs = TeacherClassSubject::where('class_id',$class_id)->get();
//
//
//      foreach ($tcs as $v){
//        $student_subject = New StudentSubject();
//        $student_subject->teacher_class_subject_id = $v->id;
//        $student_subject->student_id =$user_id;
//        $student_subject->save();
//      }
//
//
//
////      foreach ($request->class_subject as $k => $v) {
////        $class_id = array_search(strtolower($v['class']['id']), $this->class);
////        $subject_id = array_search(strtolower($v['subject']['id']), $this->subject);
////
////
////        if ($class_id && $subject_id) {
////
////          //TODO Create student subject class bind to teacher
////
////        } else {
////          $result = [
////            'status' => false,
////            'code' => '',
////            'message' => ['No such class or subject']
////          ];
////          return error_json($result);
////        }
////      }
//
//    },2);

    die('die in action');

    return return_success();
  }

  public function getUser(Request $request)
  {

    $user = Auth::user();

    if ($user->roles()->first() && $user->roles()->first()->id == 5) {
      $teachers = TeacherClassSubject::where('teacher_id', '=', $user->id)->pluck('class_id');
      $students = StudentClassSubject::whereIn('class_id', $teachers)->pluck('student_id');
      $users = User::whereIn('id', $students)->WhereHas('roles')->with('roles')->get();
    } else {
      $users = User::WhereHas('roles')->with('roles')->get();
    }

    $result['data'] = $users;
    return Response()->json($result, 200);

  }

  //Done Fetch students
  public function getStudents(Request $request)
  {
    if (Auth::user()->can('view_students')) {


//      $students = StudentClassSubject::get()->pluck('student_id');
//
//      $access_token = json_decode(Auth::user()->session)->access_token;
//
//      $inputs['ids'] = $students->toArray();
//
//      $client = new EhlaGuzzleClient();
//      $res = $client->post(config('variables.getUsersByIDs') . $access_token, $inputs);


      $students = StudentClassSubject::with('single_class')->with('studentDetail')->get()->toArray();

//      foreach ($students as $k => &$v) {
//        if(empty($res['data'][$v['student_id']])){
//          $debug = New Debug();
//          $debug->context = $v['student_id'];
//          $debug->save();
//        }else{
//          $v['realname_en'] = $res['data'][$v['student_id']]['realname_en'];
//          $v['realname_zh'] = $res['data'][$v['student_id']]['realname_zh'];
//          $v['username'] = $res['data'][$v['student_id']]['username'];
//          $v['school_num'] = $res['data'][$v['student_id']]['school_num'];
//        }
//      }


      $result['data'] = $students;
      return Response()->json($result, 200);
    }
  }

  //Done Get class options from DB
  public function option_class(Request $request)
  {
    $sc = SchoolClass::get()->pluck('c_name');
    return Response()->json($sc, 200);
  }

  //Done Fetch teachers
  public function getTeachers(Request $request)
  {
    if (Auth::user()->can('view_teachers')) {


//      $teachers = TeacherClassSubject::get()->pluck('teacher_id');
//
//
//      $access_token = json_decode(Auth::user()->session)->access_token;
//
//      $inputs['ids'] = $teachers->toArray();
//
////      print_r($inputs);
//
//      $client = new EhlaGuzzleClient();
//      $res = $client->post(config('variables.getUsersByIDs') . $access_token, $inputs);
//
//
//      $debug = new Debug();
//      $debug->context = 'Get_teachers' . json_encode($res);
//      $debug->save();

      $teachers = TeacherClassSubject::with('classes')->with('subjects')->with('role')->with('teacherDetail')->get()->toArray();



//      $t = [];

      foreach ($teachers as $k => $v) {
        $t[$v['teacher_id']]['teacher_id'] = $v['teacher_id'];
        $t[$v['teacher_id']]['realname_en'] = $v['teacher_detail']['realname_en'];
        $t[$v['teacher_id']]['realname_zh'] = $v['teacher_detail']['realname_zh'];
        $t[$v['teacher_id']]['username'] = $v['teacher_detail']['username'];
        $t[$v['teacher_id']]['school_num'] = $v['teacher_detail']['school_num'];
        $t[$v['teacher_id']]['role_id'] = $v['role']['role_id'];
        $t[$v['teacher_id']]['classes'][]['name'] = $v['classes']['c_name'];
      }
//print_r();


//      foreach ($teachers as $k => &$v) {
//        $v['realname'] = $res['data'][$v['teacher_id']]['realname'];
//        $v['realname'] = 'CTM';
//      }


      $result['data'] = array_values($t);
      return Response()->json($result, 200);
    }
  }


  public function getUserDetails(Request $request)
  {
    $user = User::with('roles')->with(['teacher_classes_subjects' => function ($query) {
      $query->with('classes')->with('subjects');
    }])->with(['student_subjects' => function ($query1) {
      $query1->with(['teacher_class_subjects' => function ($query) {
        $query->with('classes')->with('subjects')->with('teachers');
      }]);
    }])->where('id', $request->id)->get()->first()->toArray();

    $result['data'] = $user;
    return json($result);
  }

  //Done
  public function deleteUser(Request $request)
  {
    $input['user_id'] = $request->user_id;
    $this->_client->post(config('variables.deleteUsers') . $this->access_token, $input);
    RoleUser::where('user_id', $request->user_id)->delete();
    StudentClassSubject::where('student_id', $request->user_id)->delete();
    TeacherClassSubject::where('teacher_id', $request->user_id)->delete();
    UserInfo::where('user_id',$request->user_id)->delete();
    return return_success();
  }
}
