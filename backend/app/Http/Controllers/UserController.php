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
    public function postTeacher(Request $request)
    {

        if ($request->hasFile('file')) {
            $path = $request->file('file')->getRealPath();
            Excel::load($path, function ($reader) use ($request) {

                $results = $reader->get()->toArray();


//                try {


                foreach ($results[0] as $v) {
                    $username[] = $v['username'];
                    $email[] = $v['email'];
                }

                foreach (Subject::all() as $v) {
                    $subject[$v->id] = $v->s_name_en;
                }

                foreach (SchoolClass::all() as $v) {
                    $class[$v->id] = $v->c_name;
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
                    if (!in_array($v['class'], $class)) {
                        $errors[$i] = 'No this class ' . $v['class'];
                        $i++;
                    }
                    if (!in_array($v['subject'], $subject)) {
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
                        $new_teacher_set[$k]['class_id'] = array_search($v['class'], $class);
                        $new_teacher_set[$k]['subject_id'] = array_search($v['subject'], $subject);
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
