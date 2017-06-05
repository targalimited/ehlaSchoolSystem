<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class SchoolClass extends Model
{

    protected $table = 'classes';
    const CREATED_AT = 'create_ts';
    const UPDATED_AT = 'update_ts';

    public function subjects()
    {
        return $this->belongsToMany('App\Subject','teacher_class_subject','class_id')->withPivot('id');
    }

    public function teachers()
    {
        return $this->belongsToMany('App\User','teacher_class_subject','class_id','teacher_id')->withPivot('id');
    }

    public function calendarEvents(){
        return $this->belongsToMany(CalendarEvent::class);
    }

}
