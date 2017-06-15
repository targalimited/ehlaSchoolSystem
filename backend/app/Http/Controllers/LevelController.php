<?php

namespace App\Http\Controllers;


use App\Level;
use Illuminate\Http\Request;
use Illuminate\Validation\Validator;

class LevelController extends Controller
{
    public function getLevel(){
        $levels = Level::get();
        $result['data'] = $levels;
        return json($result);
    }

    public function postLevel(Request $request){



        Level::truncate();
        Level::insert($request->levels);
        return return_success();
    }

}