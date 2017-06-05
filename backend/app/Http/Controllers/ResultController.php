<?php

namespace App\Http\Controllers;

use App\Assignment;
use App\AssignmentItemQuestion;
use App\TeacherClassSubject;
use App\Traits\TeacherClassSubjectTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResultController extends Controller
{


    //TODO return student info
    public function getStudentLatestAssignmentResult(Request $request)
    {
        $assignment = Assignment::where('type', $request->assignment_type)->orderby('end_date', 'desc')->first();

        $sqlresult = AssignmentItemQuestion::select('student_id', 'assignment_id', 'weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->where('assignment_id', $assignment->id)
            ->groupBy('student_id')
            ->groupBy('assignment_id')
            ->groupBy('weakness_id')->get();

        $result['data']['result'] = $sqlresult;
        $result['data']['info'] = $assignment;

        return response()->json($result);

    }

    public function getOneStudentAllAssignmentResult(Request $request)
    {
        // $assignment = Assignment::where('type',$request->assignment_type)->orderby('end_date','desc')->first();

        $sqlresult = AssignmentItemQuestion::select('student_id', 'assignment_id', 'weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->where('student_id', $request->student_id)
            ->groupBy('student_id')
            ->groupBy('assignment_id')
            ->groupBy('weakness_id')->with('assignment')->get();

        $result['data']['result'] = $sqlresult;
        // $result['data']['info'] = $assignment;

        return response()->json($result);

    }

    public function getLatestAssignmentResult(Request $request)
    {

        $assignment = Assignment::where('type', $request->assignment_type)->orderby('end_date', 'desc')->first();

        $sqlresult = AssignmentItemQuestion::select('assignment_id', 'weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->where('assignment_id', $assignment->id)
            ->groupBy('assignment_id')->groupBy('weakness_id')->get();

        $result['data']['result'] = $sqlresult;
        $result['data']['info'] = $assignment;

        return response()->json($result);

    }

    public function getLatestWeaknessResult(Request $request)
    {

        $assignments = Assignment::select('id')->where('type', $request->assignment_type)->orderby('end_date', 'desc')->get();

        $sqlresult = AssignmentItemQuestion::select('assignment_id', 'weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->where('latest', 1)->whereIn('assignment_id', $assignments)
            ->groupBy('assignment_id')->groupBy('weakness_id')->get();

        $result['data'] = $sqlresult;


        return response()->json($result);

    }

    public function getAssignmentResultListing(Request $request)
    {

        $assignments = Assignment::select('id')->where('type', $request->assignment_type)->orderby('end_date', 'desc')->get();


        $sql_result = AssignmentItemQuestion::select('assignment_id', 'weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->whereIn('assignment_id', $assignments)
            ->groupBy('assignment_id')->groupBy('weakness_id')->get();

        $result['data'] = $sql_result;

        return response()->json($result);
    }

    public function getAssignmentWeaknessResult(Request $request)
    {
        $sql_result = AssignmentItemQuestion::select('weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->with('assignment')->where('assignment_id', $request->assignment_id)
            ->groupBy('weakness_id')->get();

        $result['data'] = $sql_result;

        return response()->json($result);
    }

    public function getConsolidatedReport(Request $request)
    {

        $teacher_class_subject_id = TeacherClassSubject::select('id')->where('teacher_id', $request->teacher_id)->where('class_id', $request->class_id)->where('subject_id', $request->subject_id)->pluck('id')->first();
        $assignments = Assignment::where('teacher_class_subject_id', $teacher_class_subject_id)->orderBy('end_date', 'desc')->get();
        // return response()->json($assignments);

        if ($teacher_class_subject_id !== 8) {
            for ($i = 1; $i < 41; $i++) {
                $students[] = $i;
            }
        } else {
            for ($i = 41; $i < 101; $i++) {
                $students[] = $i;
            }
        }


        $sql_result = AssignmentItemQuestion::select('student_id', 'assignment_id', 'weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->whereIn('assignment_id', $assignments->pluck('id'))->whereIn('student_id', $students)
            ->groupBy('assignment_id')->groupBy('weakness_id')->groupBy('student_id')->get();


        $result['data']['weaknesses'] = $sql_result;
        $result['data']['assignments'] = $assignments;

        return response()->json($result);
    }

    public function getWeaknessWithAllStudent(Request $request)
    {


        $sql_result = AssignmentItemQuestion::select('student_id', 'assignment_id', 'weakness_id', DB::raw('SUM(is_correct) as correctRate'), DB::raw('count(is_correct) as total'))
            ->where('weakness_id', $request->weakness_id)->groupBy('student_id')->groupBy('assignment_id')->groupBy('weakness_id')->get()->toArray();

        $result['data'] = $sql_result;

        return response()->json($result);

    }

    public function updateLatestWeakness()
    {
        AssignmentItemQuestion::whereNull('latest')->update(['latest'=>0]);
        $assignments = Assignment::orderby('end_date', 'desc')->get()->pluck('id');
        $weakness_ids = AssignmentItemQuestion::select('weakness_id')->groupBy('weakness_id')->get()->pluck('weakness_id')->toArray();
       // dd($weakness_ids);

        foreach ($assignments as $v) {
            $weakness_id = AssignmentItemQuestion::select('weakness_id')->where('assignment_id', $v)->groupBy('weakness_id')->get()->pluck('weakness_id')->toArray();
            $result=array_intersect($weakness_id,$weakness_ids);
            AssignmentItemQuestion::whereIn('weakness_id',$result)->where('assignment_id',$v)->update(['latest'=>1]);
            $weakness_ids = array_diff($weakness_ids,$result);
           // dd($weakness_ids);
        }

        echo 'true';
    }
}
