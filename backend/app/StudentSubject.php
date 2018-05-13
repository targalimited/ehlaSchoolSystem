<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentSubject extends Model
{
  //
  public function teacher_class_subjects()
  {
    return $this->hasOne(TeacherClassSubject::class,'id','teacher_class_subject_id');
  }
}
