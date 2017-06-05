<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssignmentItemQuestion extends Model
{
    //

    public function assignment(){
        return $this->belongsTo(Assignment::class,'assignment_id');
    }

}
