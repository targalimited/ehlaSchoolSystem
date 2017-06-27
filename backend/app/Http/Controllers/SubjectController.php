<?php

namespace App\Http\Controllers;

use App\SchoolClass;
use App\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SubjectController extends Controller
{
    public function postSubjects(Request $request){
        /**
        $input = $request->all();

        $validator = Validator::make($input, [
            'subjects.*.s_name_zh' => 'required',
            'subjects.*.s_name_en' => 'required',
        ]);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result, 500);
        }


       // Subject::insert($request->subjects);


        return return_success();
        **/
        $input = $request->all();

        $validator = Validator::make($input, [
            's_name_en' => 'required',
            's_name_zh' => 'required',
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
                $subject = New Subject();
                $subject->s_name_en = $request->s_name_en;
                $subject->s_name_zh = $request->s_name_zh;
                $subject->save();
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

    public function putSubjects(Request $request){
      DB::transaction(function () use ($request){
          $subject = Subject::where('id', $request->id)->first();
          $subject->s_name_en = $request->s_name_en;
          $subject->s_name_zh = $request->s_name_zh;
          $subject->save();
      });
    }

    public function delSubjects(Request $request){
      DB::transaction(function () use ($request){
          $subject = Subject::where('id', $request->id)->first();
          $subject->delete();
      });
    }

    public function getSubjects(Request $request){

        $teacher_id = $request->teacher_id;
        $subjects = Subject::with(['teachers'=>function($q3) use($teacher_id) {
            $q3->where('teacher_id',$teacher_id);
        }])->whereHas('teachers',function ($q) use($teacher_id){
            $q->where('teacher_id',$teacher_id);
        })->get();

        $result['data']=$subjects;
        $result['debug']='';


        return response()->json($result);
    }

    public function getAllSubjects(Request $request){
        $subjects = Subject::get();

        $result['data']=$subjects;
        $result['debug']='';

        return response()->json($result);
    }

    public function getAllClasses(Request $request){

        $teacher_id = $request->teacher_id;

//        $class_ids = TeacherClassSubject::select('class_id')->where('teacher_id',$teacher_id)->get();
//        $classes = SchoolClass::whereIn('id',$class_ids)->get();

        $classes = SchoolClass::whereHas('teachers',function ($q) use($teacher_id){
            $q->where('teacher_id',$teacher_id);
        })->get();

        $result['data']=$classes;
        $result['debug']='';



        return response()->json($result);
    }


    public function getClasses(Request $request){


        $subject_id= $request->subject_id;
        $teacher_id = $request->teacher_id;

        $classes = SchoolClass::with(['subjects'=>function($q3) use($subject_id,$teacher_id) {
            $q3->where('subject_id',$subject_id)->where('teacher_id',$teacher_id);
        }])->with(['teachers'=>function($q3) use($subject_id,$teacher_id) {
            $q3->where('teacher_id',$teacher_id)->where('subject_id',$subject_id);
        }])->whereHas('subjects',function($q1) use($subject_id,$teacher_id) {
            $q1->where('teacher_id','=',$teacher_id)->where('subject_id','=',$subject_id);;
        })->get();

        $result['data']=$classes;
        $result['debug']='';

        return response()->json($result);

    }
}
