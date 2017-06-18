<?php

namespace App\Http\Controllers;

use App\SchoolClass;
use Illuminate\Http\Request;
use Validator;


class ClassController extends Controller
{
    public function getClasses(){
        $classes = SchoolClass::get();
        $result['data'] = $classes;
        return json($result);
    }

    public function postClass(Request $request){

        $input = $request->all();

        $validator = Validator::make($input, [
            'classes.*.level_id' => 'exists:levels,id',
        ]);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result, 500);
        }

        SchoolClass::truncate();
        SchoolClass::insert($request->classes);
        return return_success();
    }

}