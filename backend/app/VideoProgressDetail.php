<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoProgressDetail extends Model
{
    protected $guarded = ['id'];

    public function video_progress(){
        return $this->belongsTo(VideoProgress::class);
    }
}
