<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserInfo extends Model
{
    protected $table = 'user_info';
    use SoftDeletes;
}
