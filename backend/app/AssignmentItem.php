<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssignmentItem extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];
    protected $dates = ['deleted_at'];

    public function assignment(){
        return $this->belongsTo(Assignment::class);
    }

    public function weakness_sets(){
        return $this->hasMany(WeaknessSet::class);
    }


}
