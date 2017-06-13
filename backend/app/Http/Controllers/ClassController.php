<?php

namespace App\Http\Controllers;

use App\SchoolClass;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function getClasses(){
        $classes = SchoolClass::get();
        $result['data'] = $classes;
        return json($result);
    }

    public function postClass(Request $request){
        SchoolClass::truncate();
        SchoolClass::insert($request->classes);
        return return_success();
    }

}