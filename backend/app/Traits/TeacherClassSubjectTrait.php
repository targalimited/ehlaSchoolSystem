<?php
namespace App\Traits;


use App\TeacherClassSubject;

trait TeacherClassSubjectTrait
{
    public static function teacherClassSubjectID($request)
    {
        return TeacherClassSubject::select('id')->where('teacher_id',$request->teacher_id)->where('class_id',$request->class_id)->where('subject_id',$request->subject_id)->pluck('id')->first();

    }

}