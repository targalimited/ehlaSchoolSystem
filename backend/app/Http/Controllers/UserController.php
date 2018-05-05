<?php

namespace App\Http\Controllers;

use App\Role;
use App\SchoolClass;
use App\StudentSubject;
use App\Subject;
use App\TeacherClassSubject;
use App\User;
use Illuminate\Http\Request;
use Excel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public $class;
    public $subject;
    public $student;
    public $teacher;
    public $teacher_subject_class;

    private function init()
    {

        foreach (Subject::all() as $v) {
            $this->subject[$v->id] = strtolower(str_replace(' ', '_', $v->s_name_en));
        }

        foreach (SchoolClass::all() as $v) {
            $this->class[$v->id] = strtolower($v->c_name);
        }

//        foreach (User::all() as $v) {
//            $this->student[$v->id] = $v->email;
//
//        }
//        foreach (User::where('user_group', 3)->get() as $v) {
//            $this->teacher[$v->id]['username'] = $v->username;
//            $this->teacher[$v->id]['email'] = $v->email;
//        }
//
//        foreach (TeacherClassSubject::all() as $k => $v) {
//            $this->teacher_subject_class[$v->id]['multiple'] = $v->multiple_teacher;
//            $this->teacher_subject_class[$v->id]['email'] = $this->teacher[$v->teacher_id]['email'];
//            $this->teacher_subject_class[$v->id]['class_id'] = $v->class_id;
//            $this->teacher_subject_class[$v->id]['subject_id'] = $v->subject_id;
//            $this->teacher_subject_class[$v->id]['class_name'] = $this->class[$v->class_id];
//            $this->teacher_subject_class[$v->id]['subject_name'] = $this->subject[$v->subject_id];
//        }


    }

    public function getTeacherExcel(Request $request)
    {

        $this->init();


        foreach (TeacherClassSubject::all() as $k => $v) {
            //$teacher_subject_class[$k]['username'] = $v->subject_id;
            $teacher_class_subject[$v['teacher_id']]['username'] = $this->teacher[$v['teacher_id']]['username'];
            $teacher_class_subject[$v['teacher_id']]['email'] = $this->teacher[$v['teacher_id']]['email'];
            $teacher_class_subject[$v['teacher_id']]['class'] = $this->class[$v['class_id']];
            $teacher_class_subject[$v['teacher_id']]['subject'] = $this->subject[$v['subject_id']];
        }

        // dd($teacher_class_subject);

        return Excel::create('teacher_list', function ($excel) use ($teacher_class_subject) {
            $excel->sheet('teacher_class_subject', function ($sheet) use ($teacher_class_subject) {
                $sheet->fromArray($teacher_class_subject);
            });
        })->export('xlsx');

    }

    public function getStudentExcel(Request $request)
    {

        $this->init();

        $student_subject = StudentSubject::get();

        foreach ($student_subject as $k => $v) {
            $new_student_list[$v->student_id]['class_id'] = $this->teacher_subject_class[$v->teacher_class_subject_id]['class_name'];
            $new_student_list[$v->student_id]['student_id'] = $v->student_id;
            $new_student_list[$v->student_id][$this->teacher_subject_class[$v->teacher_class_subject_id]['subject_name']] = ($this->teacher_subject_class[$v->teacher_class_subject_id]['multiple']) ? $this->teacher_subject_class[$v->teacher_class_subject_id]['email'] : 'Y';
        }

        return Excel::create('student_list', function ($excel) use ($new_student_list) {
            $excel->sheet('teacher_class_subject', function ($sheet) use ($new_student_list) {
                $sheet->fromArray($new_student_list);
            });
        })->export('xlsx');

    }

    public function postTeacher(Request $request)
    {
        $this->init();


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

                    if ($first_sheet_title != 'teacher_list') //for first import, creating new teacher user, if second import skip this step
                        foreach ($results[0] as $v) {
                            $user = New User();
                            $user->username = $v['username'];
                            $user->email = $v['email'];
                            $user->password = $v['password'];
                            $user->save();
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

    public function postStudent(Request $request)
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
                for ($i = 3; $i < count($subjects); $i++) {
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
                    // dd($results);

                    $new_student_list = [[]];

                    $i = 0;

                    foreach ($results as $v) {

//                        foreach ($this->subject as $v1 => $k1){
//                            if($v[$v1]=='Y'){
//                                dd($v[$v1]);
//                            }
//                        }


                        $class_id = '';

                        foreach ($v as $k => $value) {

                            if ($k == 'class')
                                $class_id = array_search($value, $this->class);
                            if ($k == 'email')
                                $user_id = array_search($value, $this->student);

                            if ($value == 'Y') {
                                $new_student_list[$i]['user_id'] = $user_id;

                                //development
                                $new_student_list[$i]['class_id'] = $class_id;
                                $new_student_list[$i]['subject_id'] = array_search($k, $this->subject);
                                //development

                                // dd($this->teacher_subject_class);

                                foreach ($this->teacher_subject_class as $key => $v) {

                                    if ($v['class_id'] == $class_id && $v['subject_id'] == array_search($k, $this->subject))
                                        $new_student_list[$i]['teacher_subject_class_id'] = $key;

                                }

                                $i++;
                            }


                        }


                        // dd(array_search($v['class'], $this->class));

                    }

                    dd($new_student_list);

                    $teacher_class_subject = TeacherClassSubject::all();
                    foreach ($teacher_class_subject as $v) {
                        foreach ($results as $v1) {

                            if ($v->class_id == '' && $v->subject_id == '') {

                            }

                        }
                    }


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

    public function postSingleTeacher(Request $request)
    {

        $rules = array('email' => 'unique:users,email');

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];
            return error_json($result);
        }

        DB::transaction(function () use($request){

            $user = New User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->save();

            //user role 3 = student
            $user->roles()->attach(2);

            $this->init();

            foreach ($request->class_subject as $k => $v) {
                $class_id = array_search(strtolower($v['class']), $this->class);
                $subject_id = array_search(strtolower($v['subject']), $this->subject);


                if ($class_id && $subject_id) {

                    $teacher_class_subject = New TeacherClassSubject();
                    $teacher_class_subject->teacher_id = $user->id;
                    $teacher_class_subject->class_id = $class_id;
                    $teacher_class_subject->subject_id=$subject_id;
                    $teacher_class_subject->save();

                } else {
                    $result = [
                        'status' => false,
                        'code' => '',
                        'message' => ['No such class or subject']
                    ];
                    return error_json($result);
                }
            }

        }, 2);

        return return_success();
    }

    public function postSingleStudent(Request $request)
    {

        $rules = array('student_id' => 'unique:users,student_id');

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];
            return error_json($result);
        }

        DB::transaction(function () use($request){

            $user = New User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->student_id = $request->student_id;
            $user->save();

            //user role 3 = student
            $user->roles()->attach(3);

            $this->init();

            foreach ($request->class_subject as $k => $v) {
                $class_id = array_search(strtolower($v['class']), $this->class);
                $subject_id = array_search(strtolower($v['subject']), $this->subject);


                if ($class_id && $subject_id) {

                    //TODO Create student subject class bind to teacher

                } else {
                    $result = [
                        'status' => false,
                        'code' => '',
                        'message' => ['No such class or subject']
                    ];
                    return error_json($result);
                }
            }

        }, 2);

        return return_success();
    }

    public function getUser(Request $request){


     // $users = User::withRole(['Student','Teacher'])->get();

      $users = Role::with('users')->get();

      $result['data'] = $users;
      return json($users);


      //$users=$user->hasRole('Teacher');
      //$users = User::hasRole('Teacher')->get();



    }
}
