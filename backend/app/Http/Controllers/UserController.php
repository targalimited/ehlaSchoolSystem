<?php

namespace App\Http\Controllers;

use App\SchoolClass;
use App\Subject;
use App\TeacherClassSubject;
use App\User;
use Illuminate\Http\Request;
use Excel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public $class;
    public $subject;
    public $student;
    public $teacher_subject_class;

    private function init()
    {

        foreach (Subject::all() as $v) {
            $this->subject[$v->id] = strtolower(str_replace(' ', '_', $v->s_name_en));
        }

        foreach (SchoolClass::all() as $v) {
            $this->class[$v->id] = $v->c_name;
        }

        foreach (User::all() as $v) {
            $this->student[$v->id] = $v->email;
        }

        foreach (TeacherClassSubject::all() as $k => $v) {
            $this->teacher_subject_class[$v->id]['class_id'] = $v->class_id;
            $this->teacher_subject_class[$v->id]['subject_id'] = $v->subject_id;
        }


    }

    public function postTeacher(Request $request)
    {
        $this->init();

        if ($request->hasFile('file')) {
            $path = $request->file('file')->getRealPath();
            Excel::load($path, function ($reader) use ($request) {

                $results = $reader->get()->toArray();


//                try {


                foreach ($results[0] as $v) {
                    $username[] = $v['username'];
                    $email[] = $v['email'];
                }


                $i = 0;
                $errors = [];

                foreach ($results[1] as $v) {

                    if (!in_array($v['username'], $username)) {
                        $errors[$i] = 'No this username ' . $v['username'];
                        $i++;
                    }
                    if (!in_array($v['email'], $email)) {
                        $errors[$i] = 'No this email ' . $v['email'];
                        $i++;
                    }
                    if (!in_array($v['class'], $this->class)) {
                        $errors[$i] = 'No this class ' . $v['class'];
                        $i++;
                    }
                    if (!in_array($v['subject'], $this->subject)) {
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
                    foreach ($results[0] as $v) {
                        $user = New User();
                        $user->username = $v['username'];
                        $user->email = $v['email'];
                        $user->password = $v['password'];
                        $user->save();
                    }
                    $users = User::whereIn('email', $email)->get();
                    foreach ($users as $v) {
                        $user_email[$v->id] = $v->email;
                    }

                    foreach ($results[1] as $k => $v) {
                        $new_teacher_set[$k]['teacher_id'] = array_search($v['email'], $user_email);
                        $new_teacher_set[$k]['class_id'] = array_search($v['class'], $this->class);
                        $new_teacher_set[$k]['subject_id'] = array_search($v['subject'], $this->subject);
                        $new_teacher_set[$k]['comment'] = $v['email'] . "," . $v['class'] . "," . $v['subject'];
                    }

                    TeacherClassSubject::insert($new_teacher_set);

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
}
