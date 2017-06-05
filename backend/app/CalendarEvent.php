<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CalendarEvent extends Model
{

    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function notifications(){
        return $this->hasMany(Notification::class);
    }

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function assignment(){
        return $this->hasOne(Assignment::class,'id','task_id');
    }

    public function classes(){
        return $this->belongsToMany(SchoolClass::class);
    }

}
