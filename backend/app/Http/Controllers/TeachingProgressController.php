<?php

namespace App\Http\Controllers;

use App\Academic;
use App\CurriculumSetting;
use App\SchoolClass;
use App\TeacherClassSubject;
use App\TeachingProgress;
use Illuminate\Http\Request;

class TeachingProgressController extends Controller
{
    //

    private function teacherClassSubjectID(Request $request)
    {
        return TeacherClassSubject::select('id')->where('teacher_id', $request->teacher_id)->where('class_id', $request->class_id)->where('subject_id', $request->subject_id)->pluck('id')->first();

    }

    public function getTeachingProgress(Request $request)
    {

        //TODO pass the $curriculums to bill and get the right weakness list
        $level = SchoolClass::where('id',$request->class_id)->pluck('level_id')->first();
        $curriculum = CurriculumSetting::whereRaw("JSON_CONTAINS(level, '[".$level."]' )")->where('subject_id', $request->subject_id)->get()->pluck('level', 'weakness_id');
        //override the result variable
        //now use the default p form
        $lists = CurriculumSettingController::getAllWeaknessList($request);
        //TODO

        $results = TeachingProgress::where('teacher_class_subject_id', $this->teacherClassSubjectID($request))->get();

        $result['data'] = $results;
        $result['weakness_list'] = $lists['data'];
        $result['curriculum'] = $curriculum;


        return response()->json($result);
    }

    public function putTeachingProgress(Request $request)
    {

        TeachingProgress::where('teacher_class_subject_id', $this->teacherClassSubjectID($request))->delete();

        foreach ($request->data as $k => $v) {
            $teachingProgress = new TeachingProgress();
            $teachingProgress->teacher_class_subject_id = $this->teacherClassSubjectID($request);
            $teachingProgress->weakness_id = $v;
            $teachingProgress->save();
        }

    }


}
