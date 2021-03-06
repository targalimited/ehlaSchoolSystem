<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;


class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, EntrustUserTrait;

    protected $guarded = ['id'];

    const CREATED_AT = 'create_ts';
    const UPDATED_AT = 'update_ts';

  protected $casts = [
    'user' => 'array',
  ];

    public function classes()
    {
        return $this->belongsToMany('App\SchoolClass','teacher_class_subject','teacher_id','class_id')->withPivot('id');
    }

    public function subjects()
    {
        return $this->belongsToMany('App\Subject','teacher_class_subject','teacher_id')->withPivot('id');
    }

    public function teacher_classes_subjects()
    {
      return $this->hasMany(TeacherClassSubject::class,'teacher_id');
       // return $this->belongsToMany('App\TeacherClassSubject','teacher_class_subject','teacher_id','teacher_class_subject_id')->withTimestamps();;
    }

    public function student_subjects(){
      return $this->hasMany(StudentSubject::class,'student_id');
    }

    public function calendar_events(){
        return $this->hasMany(CalendarEvent::class);
    }

    public function setPasswordAttribute($value) {
        $this->attributes['password'] = Hash::make($value);
    }

    public function detail(){
      return $this->hasOne(UserInfo::class,'user_id');
    }

}
