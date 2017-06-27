<?php

namespace App\Http\Controllers;

use App\SchoolClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class ClassController extends Controller
{
    public function getClasses(){
        $classes = SchoolClass::get();
        $result['data'] = $classes;
        return json($result);
    }

    public function postClasses(Request $request){
        /**
        $input = $request->all();

        $validator = Validator::make($input, [
            'classes.*.c_name' => 'required',
            'classes.*.level_id' => 'required|exists:levels,id',
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
        **/
        $input = $request->all();

        $validator = Validator::make($input, [
            'c_name' => 'required',
            'level_id' => 'required',
        ]);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result, 500);
        }

        try {
            DB::transaction(function () use ($request) {
                $school_class = New SchoolClass();
                $school_class->c_name = $request->c_name;
                $school_class->level_id = $request->level_id;
                $school_class->save();
            }, 2);
        } catch (\Exception $e) {
            $result = [
                'status' => false,
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ];

            return Response()->json($result, 500);
        }

        $result = [
            'status' => true,
            'code' => '',
            'message' => 'success'
        ];

        return Response()->json($result);
    }

    public function putClasses(Request $request){
      DB::transaction(function () use ($request){
          $school_class = SchoolClass::where('id', $request->id)->first();
          $school_class->c_name = $request->c_name;
          $school_class->level_id = $request->level_id;
          $school_class->save();
      });
    }

    public function delClasses(Request $request)
    {
        DB::transaction(function () use ($request){
            $school_class = SchoolClass::where('id', $request->id)->first();
            $school_class->delete();
        });
    }

}