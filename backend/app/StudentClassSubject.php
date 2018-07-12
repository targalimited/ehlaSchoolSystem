<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentClassSubject extends Model
{
    //
    protected $table = 'student_class_subject';
    protected $guarded = ['id'];

    public function details(){
      return $this->hasOne(User::class,'id','student_id');
    }
}
