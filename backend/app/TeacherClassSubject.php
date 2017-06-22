<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeacherClassSubject extends Model
{
    //
    protected $table = 'teacher_class_subject';
    protected $guarded = ['id'];

    public function students()
    {
        return $this->belongsToMany('App\User','student_subjects','teacher_class_subject_id','student_id')->withPivot('student_id')->withTimestamps();
    }
}
