<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $guarded = ['id'];

    public function videos(){
        return $this->hasMany(VideoSetting::class);
    }
}
