<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoProgress extends Model
{
    public function video_progress_details(){
        return $this->hasMany(VideoProgressDetail::class);
    }


}
