<?php

namespace App\Http\Controllers;

//use App\StudentSubject;
use App\TeacherClassSubject;
//use App\Traits\TeacherClassSubjectTrait;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    //
//    use TeacherClassSubjectTrait;


    public function updateStudentSubject(Request $request){
        $teacher_class_subject_id = TeacherClassSubject::find(TeacherClassSubjectTrait::teacherClassSubjectID($request));
//
//        for ($i = 1; $i < 41; $i++) {
//            $student[] = $i;
//        }

        $teacher_class_subject_id->students()->sync($request->student);

    }
}
