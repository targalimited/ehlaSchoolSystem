<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Excel;

class UserController extends Controller
{
    public function postTeacher(Request $request){

        if($request->hasFile('file')){
            $path = $request->file('file')->getRealPath();
            Excel::load($path, function($reader) {

                $results = $reader->get()->toArray();



                User::insert($results[0]);

                dd($results);

            });



//            if(!empty($data) && $data->count()){
//                foreach ($data as $key => $value) {
//                    $insert[] = ['title' => $value->Sheet1];
//                }
//                if(!empty($insert)){
//                    DB::table('items')->insert($insert);
//                    dd('Insert Record successfully.');
//                }
//
//            }

        }else{
            dd('hi');
        }





    }

    public function postStudent(Request $request){

    }
}
