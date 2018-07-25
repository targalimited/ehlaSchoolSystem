<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class SchoolClass extends Model
{

    protected $table = 'classes';


    public function subjects()
    {
        return $this->belongsToMany('App\Subject','teacher_class_subject','class_id')->withPivot('id');
    }

//    public function teachers()
//    {
//        return $this->belongsToMany('App\User','teacher_class_subject','class_id','teacher_id')->withPivot('id');
//    }

    public function calendarEvents(){
        return $this->belongsToMany(CalendarEvent::class);
    }

    public function students()
    {
        return $this->hasMany(StudentClassSubject::class,'class_id');
    }

    public function teachers()
    {
        return $this->hasMany(TeacherClassSubject::class,'class_id');
    }

}
