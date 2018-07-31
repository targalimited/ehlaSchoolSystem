<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeacherClassSubject extends Model
{
  //
//  protected $timestamps = true;
  protected $table = 'teacher_class_subject';
  protected $guarded = ['id'];

  public function students()
  {
    return $this->belongsToMany('App\User', 'student_subjects', 'teacher_class_subject_id', 'student_id')->withPivot('student_id')->withTimestamps();
  }

  public function classes()
  {
    return $this->belongsTo(SchoolClass::class, 'class_id');
  }

  public function subjects()
  {
    return $this->belongsTo(Subject::class, 'subject_id');
  }

  public function teachers()
  {
    return $this->belongsTo(User::class, 'teacher_id');
  }

  public function roles()
  {
    return $this->hasMany(RoleUser::class,'user_id','teacher_id');
  }

  public function role()
  {
    return $this->hasOne(RoleUser::class,'user_id','teacher_id');
  }

  public function teacherDetail(){
    return $this->hasOne(UserInfo::class,'user_id');
  }
}
