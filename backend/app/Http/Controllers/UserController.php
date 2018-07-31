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

  public function __construct()
  {

    $this->middleware(function ($request, $next) {
      $this->access_token = json_decode(Auth::user()->session)->access_token;
      return $next($request);
    });

    $this->_client = new EhlaGuzzleClient();

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
  }

  private function init_()
  {

    foreach (Subject::all() as $v) {
      $this->subject[$v->id] = strtolower(str_replace(' ', '_', $v->s_name_en));
    }

    foreach (SchoolClass::all() as $v) {
      $this->class[$v->id] = strtolower($v->c_name);
    }

    foreach (User::where('user_group', 3)->get() as $v) {
      $this->teacher[$v->id]['username'] = $v->username;
      $this->teacher[$v->id]['email'] = $v->email;
    }


    foreach (TeacherClassSubject::all() as $k => $v) {
      $this->teacher_subject_class[$v->id]['multiple'] = $v->multiple_teacher;
      $this->teacher_subject_class[$v->id]['email'] = $this->teacher[$v->teacher_id]['email'];
      $this->teacher_subject_class[$v->id]['class_id'] = $v->class_id;
      $this->teacher_subject_class[$v->id]['subject_id'] = $v->subject_id;
      $this->teacher_subject_class[$v->id]['class_name'] = $this->class[$v->class_id];
      $this->teacher_subject_class[$v->id]['subject_name'] = $this->subject[$v->subject_id];
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


  public function getTeacherExcel(Request $request)
  {

    $this->init();


    foreach (TeacherClassSubject::all() as $k => $v) {
      //$teacher_subject_class[$k]['username'] = $v->subject_id;
      $teacher_class_subject[$k]['username'] = $this->teacher[$v['teacher_id']]['username'];
      $teacher_class_subject[$k]['email'] = $this->teacher[$v['teacher_id']]['email'];
      $teacher_class_subject[$k]['class'] = $this->class[$v['class_id']];
      $teacher_class_subject[$k]['subject'] = $this->subject[$v['subject_id']];
    }


    return Excel::create('teacher_list', function ($excel) use ($teacher_class_subject) {
      $excel->sheet('teacher_class_subject', function ($sheet) use ($teacher_class_subject) {
        $sheet->fromArray($teacher_class_subject);
      });
    })->export('xlsx');

  }

  //TODO student_id to student name and student email
  public function getStudentExcel(Request $request)
  {

    $this->init();

    $student_subject = StudentSubject::get();


    foreach ($student_subject as $k => $v) {
      $new_student_list[$v->student_id]['class_id'] = $this->teacher_subject_class[$v->teacher_class_subject_id]['class_name'];
      $new_student_list[$v->student_id]['student_id'] = $v->student_id;
      $new_student_list[$v->student_id][$this->teacher_subject_class[$v->teacher_class_subject_id]['subject_name']] = ($this->teacher_subject_class[$v->teacher_class_subject_id]['multiple']) ? $this->teacher_subject_class[$v->teacher_class_subject_id]['email'] : 'Y';
    }
    sort($new_student_list);

    return Excel::create('student_list', function ($excel) use ($new_student_list) {
      $excel->sheet('teacher_class_subject', function ($sheet) use ($new_student_list) {
        $sheet->fromArray($new_student_list);
      });
    })->export('xlsx');

  }

  //Done Import teacher
  public function postTeacher(Request $request)
  {
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
              $teacher_num_id[$value['school_num']] = $value['user_id'];
              $teacher_role[$key]['role_id'] = array_search('teacher', $this->role);
              $teacher_role[$key]['user_id'] = $value['user_id'];
            }
          }


          foreach ($teacher_sheet as $k => $v) {
            $new_teacher_set[$k]['teacher_id'] = $teacher_num_id[$v['teacher_no']];
            $new_teacher_set[$k]['class_id'] = array_search(strtolower($v['class']), $this->class);
            $new_teacher_set[$k]['subject_id'] = array_search(strtolower($v['subject']), $this->subject);
          }

          TeacherClassSubject::insert($new_teacher_set);
          RoleUser::insert($teacher_role);
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

    if ($request->hasFile('file')) {
      $path = $request->file('file')->getRealPath();
      Excel::load($path, function ($reader) use ($request) {
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

        for ($j = 4; $j < count($subjects_from_excel); $j++) {
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

          $input['userGroup'] = 'student';
          $input['accType'] = "";
          $input['users'] = $students;

          $access_token = json_decode(Auth::user()->session)->access_token;
          $client = new EhlaGuzzleClient();
          $res = $client->post(config('variables.createAccount') . $access_token, $input);

          if ($res['success']) {
            foreach ($res['data'] as $key => $value) {
              $student_num_id[$value['school_num']] = $value['user_id'];
//              $teacher_role[$key]['role_id'] = array_search('student', $this->role);
//              $teacher_role[$key]['user_id'] = $value['user_id'];
            }
          }

          foreach ($student_sheet as $k => $v) {
            if($v['english']==='Y'){
              $new_student_set[$k]['student_id'] = $student_num_id[$v['student_no']];
              $new_student_set[$k]['class_id'] = array_search(strtolower($v['class']), $this->class);
              $new_student_set[$k]['subject_id'] = array_search('english', $this->subject);
              $new_student_set[$k]['created_at'] = Carbon::now();
              $new_student_set[$k]['updated_at'] = Carbon::now();
            }
          }

          StudentClassSubject::insert($new_student_set);
//          RoleUser::insert($teacher_role);
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

  public function postTeacher_backup(Request $request)
  {
//    $this->init();

    if ($request->hasFile('file')) {
      $path = $request->file('file')->getRealPath();
      Excel::load($path, function ($reader) use ($request) {


        foreach ($reader->get() as $v) {
          $first_sheet_title = $v->getTitle();
          break;
        }

        //result[0]->sheet1, result[1]->sheet2
        $results = $reader->get()->toArray();

        //sheet 1 for creating new teacher
        //sheet 2 for binding teacher with class and subject

        //second time import , the teacher list already existed named teacher_list (sheet1)
        if ($first_sheet_title == 'teacher_list') {
          $teacher_sheet = $results[0];
          foreach (User::where('user_group', 3)->get() as $v) {
            $username[] = $v->username;
            $email[] = $v->email;
          }
        } else {
          $teacher_sheet = $results[1];
          foreach ($results[0] as $v) {
            $username[] = $v['username'];
            $email[] = $v['email'];
          }
        }

        // print_r(array_count_values($teacher_sheet));
        //dd($teacher_sheet);


//                try {


        $i = 0;
        $errors = [];

        foreach ($teacher_sheet as $v) {

          //sheet 1 username and email must match sheet 2
          if (!in_array($v['username'], $username)) {
            $errors[$i] = 'No this username ' . $v['username'];
            $i++;
          }
          if (!in_array($v['email'], $email)) {
            $errors[$i] = 'No this email ' . $v['email'];
            $i++;
          }
          if (!in_array(strtolower($v['class']), $this->class)) {
            $errors[$i] = 'No this class ' . $v['class'];
            $i++;
          }
          if (!in_array(strtolower($v['subject']), $this->subject)) {
            $errors[$i] = 'No this subject ' . $v['subject'];
            $i++;
          }
        }

        if ($errors) {
          $result = [
            'status' => false,
            'code' => '',
            'message' => $errors
          ];
          return error_json($result);
        } else {


          if ($first_sheet_title != 'teacher_list') {
            //for first import, creating new teacher user, if second import skip this step
            foreach ($results[0] as $k => $v) {
              $user = New User();
              $user->username = $v['username'];
              $user->email = $v['email'];
              $user->password = '12345678';
              $user->user_group = 3;
              $user->save();

              $user_list[$k]['username'] = $v['email'];
              $user_list[$k]['nickname'] = $v['username'];
              $user_list[$k]['account'] = "";

              $user->roles()->attach(5);

            }


            try {
              $client = New Client();

              if (config('app.env') == 'production')
                $token = $request->headers->get('access-token');
              else
                $token = config('app.account_crud_token');

              $input['userGroup'] = '3';
              $input['accType'] = '';
              $input['users'] = $user_list;

              $result = $client->request('POST', env('USERMODEL_URL') . 'v1/userApi/account_batch_creator?access-token=' . $token . '&encode=1',
                [
                  'auth' => ['ehl_api', '27150900'],
                  'headers' => [
                    'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
                  ],
                  'form_params' => [
                    'params' => $input
                  ]

                ]
              )->getBody()->getContents();


              //$return = (json_decode('{"success":true,"data":[{"status":true,"username":"ctm@student.com","account":null,"password":"dVzLOREq","type":"new account"},{"status":true,"username":"lwk@student.com","account":null,"password":"wpcyYGAl","type":"new account"},{"status":true,"username":"lwm@student.com","account":null,"password":"ziUFYuXj","type":"new account"}],"params":{"userGroup":"5","accType":"","users":[{"username":"ctm@student.com","nickname":"Chan Tai Ming"},{"username":"lwk@student.com","nickname":"Lau Wing Ki"},{"username":"lwm@student.com","nickname":"Leung wai Ming"}]},"metadata":false,"debug":{"query_time":0.031157970428466797}}'));
              // $return = json_decode($result);

              $return = \GuzzleHttp\json_decode($result, true);

            } catch (\Exception $e) {
              // There was another exception.
              $return = response()->json(\GuzzleHttp\json_decode($e->getResponse()->getBody()->getContents(), true), 200);

            }

            if ($return['success']) {
              foreach ($return['data'] as $k => $v) {

                $user = User::where('email', $v['username'])->first();
                $user->password = $v['password'];
                //$user->usermodel_user_id = $v['id'];
                $user->save();

              }
            }

          }
          $users = User::whereIn('email', $email)->get();
          foreach ($users as $v) {
            $teacher_email[$v->id] = $v->email;
          }

          foreach ($teacher_sheet as $k => $v) {
            $new_teacher_set[$k]['teacher_id'] = array_search($v['email'], $teacher_email);
            $new_teacher_set[$k]['class_id'] = array_search(strtolower($v['class']), $this->class);
            $new_teacher_set[$k]['subject_id'] = array_search(strtolower($v['subject']), $this->subject);
            $new_teacher_set[$k]['comment'] = $v['email'] . "," . $v['class'] . "," . $v['subject'];
          }


          TeacherClassSubject::truncate();
          TeacherClassSubject::insert($new_teacher_set);

          //TODO update duplicate class and subject filed


//                    $query = DB::select('SELECT class_id, subject_id FROM school_teacher_class_subject GROUP BY class_id, subject_id HAVING count(*) > 1');
//
//                    foreach ($query as $k => $v) {
//                        $tea = TeacherClassSubject::where('class_id', $v->class_id)->where('subject_id', $v->subject_id)->get();
//                        foreach ($tea as $v1) {
//                            $v1->multiple_teacher = 1;
//                            $v1->save();
//                        }
//                    }


        }


//                    $validator = Validator::make($results[1], [
//                        '*.username' => 'required|exists:user,username',
//                    ]);
//
//                    if ($validator->fails()) {
//                        $result = [
//                            'status' => false,
//                            'code' => '',
//                            'message' => $validator->errors()
//                        ];
//                        DB::rollBack();
//                        return error_json($result);
//                    }


//                    DB::transaction(function () use ($results) {
//
//
//                        $validator = Validator::make($results[1], [
//                            '*.username' => 'required|exists:user,username',
//                        ]);
//
//                        if ($validator->fails()) {
//                            $result = [
//                                'status' => false,
//                                'code' => '',
//                                'message' => $validator->errors()
//                            ];
//
//                            return error_json($result);
//                        }
//
//                    }, 2);

//                } catch (\Exception $e) {
//
//                    dd('ex');
//
//                    $result = [
//                        'status' => false,
//                        'code' => $e->getCode(),
//                        'message' => $e->getMessage()
//                    ];
//                    return Response()->json($result, 500);
//                }

        return return_success();
      });


    } else {

      $result = [
        'status' => false,
        'code' => '',
        'message' => ['please select excel file to update']
      ];
      return error_json($result);
    }


  }

  public function postStudent_backup(Request $request)
  {
    $this->init();

    if ($request->hasFile('file')) {

      $path = $request->file('file')->getRealPath();
      Excel::load($path, function ($reader) use ($request) {


        $results = $reader->get()->toArray();


        if ($results[0]) {
          foreach (array_keys($results[0]) as $v) {
            $subjects[] = $v;
          }
        }

        $subjects_db = Subject::all();

        foreach ($subjects_db as $v) {
          $new_subject_db[] = strtolower(str_replace(' ', '_', $v->s_name_en));
        }
        $errors = [];
        for ($i = 4; $i < count($subjects); $i++) {
          if (!in_array(strtolower($subjects[$i]), $new_subject_db)) {
            $errors[] = 'no this subject ' . $subjects[$i];
          }
        }

        if ($errors) {
          $result = [
            'status' => false,
            'code' => '',
            'message' => $errors
          ];
          return error_json($result);
        } else {

          //dd($this->subject);
//                  dd($results[0]);

          $new_student_list = [[]];


          //  foreach ($results as $v) {

//                        foreach ($this->subject as $v1 => $k1){
//                            if($v[$v1]=='Y'){
//                                dd($v[$v1]);
//                            }
//                        }


          DB::transaction(function () use ($results, $new_student_list, $request) {
            foreach ($results[0] as $k => $v) {

              $user = New User();
              $user->username = $v['username'];
              $user->email = $v['email'];
              $user->password = '12345678';
              $user->user_group = 3;
              $user->save();

              $user_list[$k]['username'] = $v['email'];
              $user_list[$k]['nickname'] = $v['username'];
              $user_list[$k]['account'] = "";


              $user->roles()->attach(3);

              $scs = New StudentClassSubject();
              $scs->class_id = array_search(strtolower($v['class']), $this->class);
              $scs->student_id = $user->id;
              $scs->save();

            }

            try {
              $client = New Client();

              if (config('app.env') == 'production')
                $token = $request->headers->get('access-token');
              else
                $token = config('app.account_crud_token');

              $input['userGroup'] = '5';
              $input['accType'] = '';
              $input['users'] = $user_list;

              $result = $client->request('POST', env('USERMODEL_URL') . 'v1/userApi/account_batch_creator?access-token=' . $token . '&encode=1',
                [
                  'auth' => ['ehl_api', '27150900'],
                  'headers' => [
                    'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
                  ],
                  'form_params' => [
                    'params' => $input
                  ]

                ]
              )->getBody()->getContents();


              //$return = (json_decode('{"success":true,"data":[{"status":true,"username":"ctm@student.com","account":null,"password":"dVzLOREq","type":"new account"},{"status":true,"username":"lwk@student.com","account":null,"password":"wpcyYGAl","type":"new account"},{"status":true,"username":"lwm@student.com","account":null,"password":"ziUFYuXj","type":"new account"}],"params":{"userGroup":"5","accType":"","users":[{"username":"ctm@student.com","nickname":"Chan Tai Ming"},{"username":"lwk@student.com","nickname":"Lau Wing Ki"},{"username":"lwm@student.com","nickname":"Leung wai Ming"}]},"metadata":false,"debug":{"query_time":0.031157970428466797}}'));
              // $return = json_decode($result);

              $return = \GuzzleHttp\json_decode($result, true);
            } catch (\Exception $e) {
              // There was another exception.
              $return = response()->json(\GuzzleHttp\json_decode($e->getResponse()->getBody()->getContents(), true), 200);

            }

            if ($return['success']) {
              foreach ($return['data'] as $k => $v) {

                $user = User::where('email', $v['username'])->first();
                $user->password = $v['password'];
                //$user->usermodel_user_id = $v['id'];
                $user->save();

              }
            }

            foreach (User::all() as $v) {
              $this->student[$v->id] = $v->email;
            }

            $i = 0;
            $class_id = '';
            $user_id = '';

            foreach ($results[0] as $k1 => $value1) {
              foreach ($value1 as $k => $value) {
                if ($k == 'class')
                  $class_id = array_search(strtolower($value), $this->class);
                if ($k == 'email')
                  $user_id = array_search(strtolower($value), $this->student);

                $new_student_list[$i]['student_id'] = $user_id;
                $subject_id = array_search(strtolower($k), $this->subject);

                //development
                // $new_student_list[$i]['class_id'] = $class_id;
                // $new_student_list[$i]['subject'] = $k;
                //development

                if ($value == 'Y') {
                  foreach ($this->teacher_subject_class as $key => $v) {

                    if ($v['class_id'] == $class_id && $v['subject_id'] == $subject_id)
                      $new_student_list[$i]['teacher_class_subject_id'] = $key;

                  }

                  $i++;
                } else if ($value === null) {
                  //if don't know which teacher, leave it!
//                                $new_student_list[$i]['teacher_class_subject_id'] = null;
//                                $i++;
                }
              }
            }


            StudentSubject::truncate();
            StudentSubject::insert($new_student_list);

          }, 2);

          return return_success();

//                    $teacher_class_subject = TeacherClassSubject::all();
//                    foreach ($teacher_class_subject as $v) {
//                        foreach ($results as $v1) {
//
//                            if ($v->class_id == '' && $v->subject_id == '') {
//
//                            }
//
//                        }
//                    }


        }


      });


    } else {

      $result = [
        'status' => false,
        'code' => '',
        'message' => ['please select excel file to update']
      ];
      return error_json($result);
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
    }

    return success();


//    if ($class_id = $this->getClassID($request->className)) {
//
//
//      $input['id'] = $request->id;
//      $input['realname'] = $request->fullname;
//
//      $access_token = json_decode(Auth::user()->session)->access_token;
//
//
//      $client = new EhlaGuzzleClient();
//      $res = $client->post(config('variables.updateUserInfo') . $access_token, $input);
//
//
//      if ($res) {
//        $scs = StudentClassSubject::where('student_id', $request->id)->first();
//        $scs->class_id = $class_id;
//        $scs->save();
//      }
//
//      return return_success();
//
//    } else {
//      $result = [
//        'status' => false,
//        'code' => '',
//        'message' => 'No such class'
//      ];
//      return error_json($result);
//    }


    $rules = array('email' => 'unique:users,email,' . $request->id);

    $validator = Validator::make($request->all(), $rules);

    if ($validator->fails()) {
      $result = [
        'status' => false,
        'code' => '',
        'message' => $validator->errors()
      ];
      return error_json($result);
    }

//    DB::transaction(function () use ($request) {
//
//      $user = User::where('id', $request->id)->first();
//      $user->username = $request->username;
//      $user->password = $request->password;
//      $user->save();
//
//      $user->roles()->sync($request->roles[0]['id']);
//
//      $this->init();
//
//      $tcs = TeacherClassSubject::where('teacher_id', $request->id)->get()->pluck('id');
//
//      StudentSubject::whereIn('teacher_class_subject_id', $tcs)->delete();
//      TeacherClassSubject::where('teacher_id', $request->id)->delete();
//
//      $count = 0;
//      foreach ($request->class_subject as $k => $v) {
//
//        $class_id = $v['class']['id'];
//        $subject_id = $v['subject']['id'];
//
//
//        if ($class_id && $subject_id) {
//          $teacher_class_subject = New TeacherClassSubject();
//          $teacher_class_subject->teacher_id = $user->id;
//          $teacher_class_subject->class_id = $class_id;
//          $teacher_class_subject->subject_id = $subject_id;
//          $teacher_class_subject->save();
//
//
//          $scs = StudentClassSubject::where('class_id', $class_id)->get()->pluck('student_id');
//          foreach ($scs as $k => $v) {
//            $new_scs[$count]['student_id'] = $v;
//            $new_scs[$count]['teacher_class_subject_id'] = $teacher_class_subject->id;
//            $count++;
//          }
//
//        } else {
//          $result = [
//            'status' => false,
//            'code' => '',
//            'message' => ['No such class or subject']
//          ];
//          return error_json($result);
//        }
//      }
//      StudentSubject::insert($new_scs);
//    }, 2);
//
//    return return_success();
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


    if ($class_id = $this->getClassID($request->className)) {


      $input['id'] = $request->id;
      $input['realname_en'] = $request->realname_en;
      $input['realname_zh'] = $request->realname_zh;
      if (!empty($request->password))
        $input['password'] = $request->password;
      $input['school_num'] = $request->student_num;

      $access_token = json_decode(Auth::user()->session)->access_token;

      $client = new EhlaGuzzleClient();
      $res = $client->post(config('variables.updateUserInfo') . $access_token, $input);

      $debug = new Debug();
      $debug->context = 'Update Single Student '.json_encode($res);
      $debug->save();

      if ($res['success']) {
        $scs = StudentClassSubject::where('student_id', $request->id)->first();
        $scs->class_id = $class_id;
        $scs->save();
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


      $students = StudentClassSubject::with('single_class')->get()->pluck('student_id');

      $access_token = json_decode(Auth::user()->session)->access_token;

      $inputs['ids'] = $students->toArray();

      $client = new EhlaGuzzleClient();
      $res = $client->post(config('variables.getUsersByIDs') . $access_token, $inputs);


//      print_r($res);die();

      $students = StudentClassSubject::with('single_class')->get()->toArray();

//      print_r($students);
//      die();
      foreach ($students as $k => &$v) {
        if(empty($res['data'][$v['student_id']])){
          $debug = New Debug();
          $debug->context = $v['student_id'];
          $debug->save();
        }else{
          $v['realname_en'] = $res['data'][$v['student_id']]['realname_en'];
          $v['realname_zh'] = $res['data'][$v['student_id']]['realname_zh'];
          $v['username'] = $res['data'][$v['student_id']]['username'];
          $v['school_num'] = $res['data'][$v['student_id']]['school_num'];
        }
      }
//      print_r($students);
//      die();

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


      $teachers = TeacherClassSubject::get()->pluck('teacher_id');


      $access_token = json_decode(Auth::user()->session)->access_token;

      $inputs['ids'] = $teachers->toArray();

//      print_r($inputs);

      $client = new EhlaGuzzleClient();
      $res = $client->post(config('variables.getUsersByIDs') . $access_token, $inputs);


      $debug = new Debug();
      $debug->context = 'Get_teachers' . json_encode($res);
      $debug->save();

      $teachers = TeacherClassSubject::with('classes')->with('subjects')->with('role')->get()->toArray();

      $t = [];

      foreach ($teachers as $k => $v) {
        $t[$v['teacher_id']]['teacher_id'] = $v['teacher_id'];
        $t[$v['teacher_id']]['realname_en'] = $res['data'][$v['teacher_id']]['realname_en'];
        $t[$v['teacher_id']]['realname_zh'] = $res['data'][$v['teacher_id']]['realname_zh'];
        $t[$v['teacher_id']]['username'] = $res['data'][$v['teacher_id']]['username'];
        $t[$v['teacher_id']]['school_num'] = $res['data'][$v['teacher_id']]['school_num'];
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
    return return_success();
  }
}
