<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentClassSubject extends Model
{
    //
//    protected $timestamps = true;
    protected $table = 'student_class_subject';
    protected $guarded = ['id'];

    public function details(){
      return $this->hasOne(User::class,'id','student_id');
    }

    public function single_class(){
      return $this->hasOne(SchoolClass::class,'id','class_id');
    }

  public function studentDetail(){
    return $this->hasOne(UserInfo::class,'user_id','student_id');
  }
}
