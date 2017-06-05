<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoSetting extends Model
{

    protected $casts = [
        'level' => 'array',
    ];

    public function level(){
        return $this->belongsTo(Level::class);
    }
}
