<?php

namespace App\Http\Controllers;

use App\Assignment;
use App\AssignmentItemQuestion;
use App\TeacherClassSubject;
use App\Traits\TeacherClassSubjectTrait;
use App\UsermodelApiServices;
use App\ParamBasicServices;
use App\PermissionControlServices;
use App\Homework;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResultController extends Controller
{
	
	//['class_id' / 'student_id', 'subject_id', 'batch_id', 'item_id']
	public function get_school_status_report(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$studentIds = $PBS->getStudents();		
		
		if (empty($studentIds) && isset($params['student_id'])) {
			$studentIds[0] = $params['student_id'];
		}
		
		$itemId    = $params['item_id'];
		$subjectId = $params['subject_id'];
		$batchId   = $params['batch_id'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolStatusReport($academicId, $studentIds, $itemId, $subjectId, $batchId);	
				
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
		
		return json($output);
	}
	
	//['class_id' / 'student_id', 'weakness_code', 'weakness_ids']
	public function get_school_weakness_report(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$studentIds = $PBS->getStudents();		
		
		if (empty($studentIds) && isset($params['student_id'])) {
			$studentIds[0] = $params['student_id'];
		}
		
		$subjectId = $params['subject_id'];
		$weaknessCode = $params['weakness_code'];
		$weaknessIds = $params['weakness_ids'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolWeaknessReport($academicId, $studentIds, $subjectId, $weaknessCode, $weaknessIds);	
				
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
		
		return json($output);
	}
	
	
	//['class_id' / 'student_id', 'subject_id', 'batch_id', 'item_id']
	public function get_school_batch_item_result_report(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$studentIds = $PBS->getStudents();		
		
		if (empty($studentIds) && isset($params['student_id'])) {
			$studentIds[0] = $params['student_id'];
		}
		
		$itemId    = $params['item_id'];
		$subjectId = $params['subject_id'];
		$batchId   = $params['batch_id'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolBatchItemResultReport($academicId, $studentIds, $itemId, $subjectId, $batchId);	
				
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
		
		return json($output);
	}
	
	//['class_id' / 'student_id', 'subject_id','weakness_code']
	/*public function get_school_weakness_report(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$studentIds = $PBS->getStudents();
		
		if (empty($studentIds) && $params['student_id']) {
			$studentIds[0] = $params['student_id'];
		}
		
		$subjectId    = $params['subject_id'];
		$weaknessCode = $params['weakness_code'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolWeaknessReport($academicId, $studentIds, $subjectId, $weaknessCode);	
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);
	}*/
	
	//['class_id' / 'student_id', 'subject_id','weakness_code']
	public function get_class_weakness(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$studentIds = $PBS->getStudents();
		
		$subjectId    = $params['subject_id'];
		$weaknessCode = $params['weakness_code'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolWeaknessList($academicId, $studentIds, $subjectId, $weaknessCode);	
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);
	}
	
	// ------------------------------ below deprecated ----------------------------------------------------------------------
    
	public function get_school_result_report(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$studentIds = $PBS->getStudents();		
		$itemId = $params['item_id'];
		$itemType = $params['item_type'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolResultReport($academicId, $studentIds, $itemId);	
		$resultReport = $result["data"];
		
		if ($itemType == 2) {
			$data = $UAS->schoolApiGetReadingHomeworkByItemId($itemId);
			$exercise = $data["data"];
		}
		
		
		
		
		$output['result'] = $resultReport;
		$output['exercise'] = $exercise;
		return json($output);
	}
	public function get_school_result_summary_report(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
		$studentIds = $PBS->getStudents();		
		$itemId = $params['item_id'];
		$itemType = $params['item_type'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolResultSummaryReport($academicId, $studentIds, $itemId);	
		$exeDetail = $result["data"]["exercise"];
		$userResult = $result["data"]["user_result"];
				
		$homework = New Homework();
		$homework->decorateHomeworkListDetail($exeDetail, $itemId, $academicId, $classId, $subjectId);
		
		$exeDetailMapper = [];
		$userResultMapper = [];
		$userList = [];
		
		//loop exercise
		foreach ($exeDetail as $value) {
			unset($value['title_en'], $value['title_zh'], $value['description_en'], $value['description_zh']);
			$exeDetailMapper[$value['id']] = $value;
		}
		//loop user result
		foreach ($userResult as $value) {
			if (!isset($userResultMapper[$value['user_id']])) {
				$userResultMapper[$value['user_id']] = [];
			}
			$value['result_json'] = json_decode($value['result_json'], true);
			array_push($userResultMapper[$value['user_id']], $value);
		}
		//loop user
		foreach ($studentIds as $id) {
			$userObj = [];
			$userObj['user_id'] = $id;
			$userObj['exercises'] = $exeDetailMapper;
			
			if (isset($userResultMapper[$id])) {
				foreach ($userResultMapper[$id] as &$userResult) {
					if (isset($userObj['exercises'][$userResult['optional_id']])) {
						if (!isset($userObj['exercises'][$userResult['optional_id']]['result_detail'])) {
							$userObj['exercises'][$userResult['optional_id']]['result_detail'] = [];
							$userObj['exercises'][$userResult['optional_id']]['completed_date'] = $userResult['create_ts'];
							
							$userObj['exercises'][$userResult['optional_id']]['redo_count'] = 0;
							$userObj['exercises'][$userResult['optional_id']]['num_of_qtns'] = intval($userResult["result_json"]['num_of_qtns']);
							$userObj['exercises'][$userResult['optional_id']]['correct_cnt'] = intval($userResult["result_json"]['correct_cnt']);
						} else {
							$userObj['exercises'][$userResult['optional_id']]['redo_count'] += $userResult['is_redo'];
							$userObj['exercises'][$userResult['optional_id']]['num_of_qtns'] = intval(max($userResult["result_json"]['num_of_qtns'], $userObj['exercises'][$userResult['optional_id']]['num_of_qtns']));
							
							if ($userObj['exercises'][$userResult['optional_id']]['correct_cnt'] < 0) {$userObj['exercises'][$userResult['optional_id']]['correct_cnt'] = 0;}
							
							$userObj['exercises'][$userResult['optional_id']]['correct_cnt'] += $userResult["result_json"]['correct_cnt'];
							if ($userObj['exercises'][$userResult['optional_id']]['correct_cnt'] > $userObj['exercises'][$userResult['optional_id']]['num_of_qtns']) {
								$userObj['exercises'][$userResult['optional_id']]['correct_cnt'] = $userObj['exercises'][$userResult['optional_id']]['num_of_qtns'];
							}
						}
						$result_detail = [];
						$result_detail['assignment_id'] = $userResult['assignment_id'];
						$result_detail['qtn_ids'] = (isset($userResult['qtn_ids'])) ? explode(',', $userResult['qtn_ids']) : [];
						$result_detail['complete_qtn_ids'] = (isset($userResult['complete_qtn_ids'])) ? explode(',', $userResult['complete_qtn_ids']) : [];
						
						array_push($userObj['exercises'][$userResult['optional_id']]['result_detail'], $result_detail);
					}
				}
				
			}
			$userObj['format_exercises'] = [];
			foreach ($userObj['exercises'] as $exe) {
				$userObj['format_exercises'][$exe['type']] = $exe;
			}
			unset($userObj['exercises']);
			
			array_push($userList, $userObj);
		}
		
		return json(['data' => $userList]);
	}

	public function get_school_weakness_report_delete(Request $request) {	
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//gather data
		$academicId = $user['academic_id'];
		$studentIds = $PBS->getStudents();
		$itemId = $params['item_id'];
		$reportType = $params['report_type'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$result = $UAS->resultApiGetSchoolWeaknessReport($academicId, $studentIds, $itemId, $reportType);	
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);
	}

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
