<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assignment extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    //
    public function assignment_items(){
        return $this->hasMany(AssignmentItem::class);
    }

    public function assignment_item_questions(){
        return $this->hasMany(AssignmentItemQuestion::class);
    }

    public function weakness_sets()
    {
        return $this->hasManyThrough(WeaknessSet::class,AssignmentItem::class);
    }

    public function teacherClassSubject(){
        return $this->belongsTo('App\TeacherClassSubject', 'teacher_class_subject_id');
    }

    public function academic(){
        return $this->belongsTo(Academic::class);
    }
}
