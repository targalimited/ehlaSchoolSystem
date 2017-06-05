<?php

namespace App\Http\Controllers;

use App\Academic;
use App\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AcademicSettingController extends Controller
{


    public function getSettings(Request $request){

        $academic = Academic::get();

        $result['data']=$academic;
        $result['debug']='';

        if(isset($_SERVER['HTTP_POSTMAN_TOKEN']))
            var_dump($result);

        return response()->json($result);


    }

    public function putSettings(Request $request){

        $validator = Validator::make($request->all(), [
            'year_start' => 'required|integer',
            'year_end' => 'required|integer',
            'semester' =>'required',
            'display_name' => 'required'

        ]);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result);
        }

        if ($request->current_sem) {
            Academic::where('current_sem',1)->update(['current_sem' => 0]);
        }

        $academic = Academic::find($request->id);
        $academic->display_name = $request->display_name;
        $academic->year_start = $request->year_start;
        $academic->year_end = $request->year_end;
        $academic->semester = $request->semester;
        $academic->current_sem = $request->current_sem;
        $academic->save();

        return response()->json($academic);
    }

    public function postSettings(Request $request){



        $validator = Validator::make($request->all(), [
            'year_start' => 'required|integer',
            'year_end' => 'required|integer',
            'semester' =>'required',
            'display_name' => 'required'
        ]);


        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result);
        }


        if ($request->current_sem) {
            Academic::where('current_sem',1)->update(['current_sem' => 0]);
        }

        $academic = New Academic();
        $academic->display_name = $request->display_name;
        $academic->year_start = $request->year_start;
        $academic->year_end = $request->year_end;
        $academic->semester = $request->semester;
        $academic->current_sem = $request->current_sem;
        $academic->save();

    }


    public function delSettings(Request $request){

        Academic::find($request->id)->delete();

    }
}
