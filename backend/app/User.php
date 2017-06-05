<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;


class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword,EntrustUserTrait;

    protected $table = 'user';

    const CREATED_AT = 'create_ts';
    const UPDATED_AT = 'update_ts';

    public function classes()
    {
        return $this->belongsToMany('App\SchoolClass','teacher_class_subject','user_id','class_id')->withPivot('id');
    }

    public function subjects()
    {
        return $this->belongsToMany('App\Subject','teacher_class_subject','user_id')->withPivot('id');
    }

    public function teacher_classes_subjects()
    {
        return $this->belongsToMany('App\TeacherClassSubject','student_subjects','user_id','teacher_class_subject_id')->withTimestamps();;
    }

    public function calendar_events(){
        return $this->hasMany(CalendarEvent::class);
    }

}
