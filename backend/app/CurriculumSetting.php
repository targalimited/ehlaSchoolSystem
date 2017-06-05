<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CurriculumSetting extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'level' => 'array',
    ];

    public function videos(){
        return $this->hasMany(VideoSetting::class,'weakness_id','weakness_id');
    }

}
