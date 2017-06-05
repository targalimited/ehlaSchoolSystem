<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Subject extends Model
{

    const CREATED_AT = 'create_ts';
    const UPDATED_AT = 'update_ts';

    public function school_classes()
    {
        return $this->belongsToMany('App\SchoolClass','teacher_class_subject','subject_id')->withPivot('id');
    }

    public function teachers()
    {
        return $this->belongsToMany('App\User','teacher_class_subject','subject_id','teacher_id')->withPivot('id');
    }
}
