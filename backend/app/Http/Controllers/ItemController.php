<?php

namespace App\Http\Controllers;

use App\ReadingExercise;
use App\StudentSubject;
use App\UsermodelApiServices;
use App\PermissionControlServices;
use App\ParamBasicServices;
use App\Homework;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ItemController extends Controller {
	
	public function get_by_category (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//data
		if (isset($params['category_id'])) {
			$categoryId = $params['category_id'];
			$catGrouper = null;
		} else {
			$categoryId = null;
			$catGrouper = $params['cat_grouper'];
		}
		$page = $params['page'];
		$limit = $params['limit'];

		//usermodel
		$UAS = new UsermodelApiServices($request);
		$result = $UAS->schoolApiGetByCategory($categoryId, $catGrouper, $page, $limit, null);	
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);
	}
	
	public function get_selected_item_by_category (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//get class level mapper
		
		
		//data
		$catGrouper = $params['cat_grouper'];		
		$page = $params['page'];
		$limit = $params['limit'];

		//usermodel
		$UAS = new UsermodelApiServices($request);
		$result = $UAS->schoolApiGetSelectedItemByCategory($catGrouper, $page, $limit);	
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);
	}
	
	public function get_school_item_summary(Request $request) {
		
		//params
		$params = $request->params;
		
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
	
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//usermodel
		$UAS = new UsermodelApiServices($request);

		$result = $UAS->schoolApiGetSchoolItemSummary();	
		return json($result);		
	}
	
	public function get_pre_chosen_items_by_category (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//data
		$categoryId = $params['category_id'];
		$page = $params['page'];
		$limit = $params['limit'];
		//TODO search school db relationship
		//$preChosenItemIds = search in db;

		//usermodel
		$UAS = new UsermodelApiServices($request);
		$result = $UAS->schoolApiGetByCategory($categoryId, $page, $limit);	
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);
	}
	
	public function choose_item (Request $request) {
		//params
		$params = $request->params;
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//data
		
		$catGrouper = $params['cat_grouper'];
		$addItemIds = $params['add_item_ids'];
		$removeItemIds = $params['remove_item_ids'];		
		$page = $params['page'];
		$limit = $params['limit'];

		//usermodel
		$UAS = new UsermodelApiServices($request);
		
		$result = $UAS->schoolApiChooseItems($catGrouper, $addItemIds, $removeItemIds, $limit, $page);
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);		
	}
	
	public function choose_item_for_level (Request $request) {
		//params
		$params = $request->params;
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//data		
		$catGrouper = $params['cat_grouper'];
		$addLvItemList = $params['add_lv_item_list'];
		$removeLvItemList = $params['remove_lv_item_list'];
		$page = $params['page'];
		$limit = $params['limit'];

		//usermodel
		$UAS = new UsermodelApiServices($request);
		
		$result = $UAS->schoolApiChooseItemsForLevel($catGrouper, $addLvItemList, $removeLvItemList, $limit, $page);
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);		
	}
	
	
	
	public function get_by_ids (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$itemId = $params['item_id'];

		//usermodel
		$UAS = new UsermodelApiServices($request);
		$result = $UAS->schoolApiGetByIds($itemId);
		$output["data"] = $result["data"];
		$output["metadata"] = $result["metadata"];
	
		return json($output);
	}	
	
	public function get_assignment_by_item_id (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$itemId = $params['id'];
		$itemType = $params['item_type'];
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
		
		//usermodel
		$UAS = new UsermodelApiServices($request);		
		$data = $UAS->schoolApiGetAssignmentByItemId($itemId, $itemType, $academicId, $classId, $subjectId);
		$output["data"] = $data["data"];
		
		return json($output);
	}
	
	public function batch_set_publish_assignments (Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$itemId = $params['item_id'];
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
				
		$itemType = $params['item_type'];
		$homeworkType = $params['homework_type'];
		$targetIds = $params['target_ids'];
		$startDate = (isset($params['start_date'])) ? date('Y-m-d H:i:s',strtotime($params['start_date'])) : null;
		$endDate = (isset($params['end_date'])) ? date('Y-m-d H:i:s',strtotime($params['end_date'])) : null;
		$remark = (isset($params['remark'])) ? $params['remark'] : null;
		
		//usermodel
		$UAS = new UsermodelApiServices($request);
		$data = $UAS->schoolApiSetAssignments($academicId, $classId, $subjectId, $itemId, $itemType, $homeworkType, $targetIds, $startDate, $endDate, $remark);
		
		if ($params['is_published'] == '1') {
			$assignmentIds = [];
			foreach ($data as $value) {
				if (in_array($value['id'],$targetIds)) {
					array_push($assignmentIds, $value['assignment_id']);
				}
			}
			
			$studentIds = $PBS->getStudents();
			$data = $UAS->schoolApiPublishAssignments($studentIds, $assignmentIds);
		}
		
		return json($data);		
	}
	public function set_assignments (Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$itemId = $params['item_id'];
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
				
		$itemType = $params['item_type'];
		$homeworkType = $params['homework_type'];
		$targetIds = $params['target_ids'];
		$startDate = (isset($params['start_date'])) ? date('Y-m-d H:i:s',strtotime($params['start_date'])) : null;
		$endDate = (isset($params['end_date'])) ? date('Y-m-d H:i:s',strtotime($params['end_date'])) : null;
		$remark = (isset($params['remark'])) ? $params['remark'] : null;
		
		//usermodel
		$UAS = new UsermodelApiServices($request);
		$data = $UAS->schoolApiSetAssignments($academicId, $classId, $subjectId, $itemId, $itemType, $homeworkType, $targetIds, $startDate, $endDate, $remark);
				
		return json($data);		
	}
	public function publish_assignments (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$studentIds = $PBS->getStudents();
		$assignmentIds = $params['assignment_ids'];
		
		//usermodel
		$UAS = new UsermodelApiServices($request);
		$data = $UAS->schoolApiPublishAssignments($studentIds, $assignmentIds);
				
		return json($data);		
	}
	
	/*
	public function get_reading_homework_by_item_id (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$itemId = $params['item_id'];
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$data = $UAS->schoolApiGetReadingHomeworkByItemId($itemId);
				
		$homework = New Homework();
		$homework->decorateHomeworkListDetail($data["data"], $itemId, $academicId, $classId, $subjectId);
		
		$output["data"] = $data["data"];
		
		return json($output);
	}
	
	public function get_comp_diagnosis_homework_by_item_id (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$itemId = $params['item_id'];
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$data = $UAS->schoolApiGetCompDiagnosisHomeworkByItemId($itemId);
		
		$homework = New Homework();
		$homework->decorateHomeworkListDetail($data["data"], $itemId, $academicId, $classId, $subjectId);
		
		$output["data"] = $data["data"];
		
		return json($output);
	}
	
	public function get_reading_comp_diagnosis_homework_by_item_id (Request $request) {
		//params
		$params = $request->params;
	
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//TODO check valid item for class
		//data
		$itemId = $params['item_id'];
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$data = $UAS->schoolApiGetReadingCompDiagnosisHomeworkByItemId($itemId);
		
		$homework = New Homework();
		$homework->decorateHomeworkListDetail($data["data"], $itemId, $academicId, $classId, $subjectId);
		
		$output["data"] = $data["data"];
		
		return json($output);
	}
	*/
	public function batch_set_exercises(Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		$studentIds = $PBS->getStudents();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);	
		
		$params['teacher_id'] = $user['user_id'];
		$params['item_type'] = $params['item_type'];
				
        $validator = Validator::make($params, [
            'academic_id' => 'required|integer',
			'class_id' => 'required|integer',
			'subject_id' => 'required|integer',
			'item_id' => 'required|integer',
			'remark' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
			'homework_type'=>['required',Rule::in(['READFOLLOW', 'EXERCISE', 'VIDEO'])],
			'target_ids'=> 'required|array',
			'target_ids.*'=> 'integer',
			'is_published' => 'required|integer',
        ]);
		
        if ($validator->fails()) {
            $output = ['status' => false,'code' => '','message' => $validator->errors()];
            return Response()->json($output,400);
        }
		
		if ($params["is_published"] == '1' && (!isset($params["start_date"]) || !isset($params["end_date"]))) {
			$output = ['status' => false,'code'=>201, 'message' => "Missing start date/end date"];
			return response()->json($output);
		}
					
		(new Homework())->batch_insert(
							$params['target_ids'], $params['academic_id'], $params['teacher_id'], $params['class_id'], $params['subject_id'], $params['item_type'],
							$params['item_id'], $params['homework_type'], (isset($params['remark'])) ? $params['remark'] : null, (isset($params['start_date'])) ? $params['start_date'] : null, (isset($params['end_date'])) ? $params['end_date'] : null, $params["is_published"]);
		
		if ($params["is_published"] == '1' && isset($params["start_date"]) && isset($params["end_date"])) {
			$assignments = (new Homework())->get_assignment($params['target_ids'], 
															$params['academic_id'], 
															$params['teacher_id'], 
															$params['class_id'], 
															$params['subject_id'], 
															$params['item_type'], 
															$params['item_id'], 
															$params['homework_type']);
			
			$batch = [];
			foreach ($assignments as $assignment) {
				$obj = [];
				$obj['assignment_id'] = $assignment->id;
				$obj['item_id'] = $assignment->item_id;
				$obj['target_id'] = $assignment->target_id;
				$obj['homework_type'] = $assignment->homework_type;
				$obj['start_date'] = $assignment->start_date;
				$obj['end_date'] = $assignment->end_date;
				$obj['academic_id'] = $assignment->academic_id;
				
				array_push($batch, $obj);
			}
			
			//insert record in usermodel
			$UAS = new UsermodelApiServices($request);
			$data = $UAS->schoolApiInsertHomeworks($studentIds, $batch);
		}
		
		//refresh exercise
		$itemId = $params['item_id'];
		$academicId = $user['academic_id'];
		$classId = $user['class_id'];
		$subjectId = $user['subject_id'];
		
		//usermodel
		$UAS = new UsermodelApiServices($request);
		$data = $UAS->schoolApiGetReadingHomeworkByItemId($itemId);
				
		$homework = new Homework();
		$homework->decorateHomeworkListDetail($data["data"], $itemId, $academicId, $classId, $subjectId);
		
		$output["data"] = $data["data"];
		
		return json($output);

	}
	/*
	public function save_exercise(Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);	
		
		$params['teacher_id'] = $user['user_id'];
		$params['item_type'] = $params['item_type'];
				
        $validator = Validator::make($params, [
            'assignment_id' => 'integer',
            'academic_id' => 'required|integer',
			'class_id' => 'required|integer',
			'subject_id' => 'required|integer',
			'item_id' => 'required|integer',
			'remark' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
			'homework_type'=>['required',Rule::in(['READFOLLOW', 'EXERCISE', 'VIDEO'])],
			'target_id'=> 'required|integer'
        ]);
		
        if ($validator->fails()) {
            $output = ['status' => false,'code' => '','message' => $validator->errors()];
            return Response()->json($output,400);
        }
		if (empty($params['assignment_id'])) {			
			$obj = New Homework();
			$obj->insertHomework($params);
		} else {
			$obj = Homework::find($params['assignment_id']);			
			$obj->updateHomework($params);	
		}
		return response()->json($obj);
	}
	
	public function publish_exercise(Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		$studentIds = $PBS->getStudents();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);	
		
		if ($studentIds === false) {
			$output = ['status' => false,'code'=>201, 'message' => "No students found"];
			return response()->json($output);
		}
		
		$obj = Homework::find($params['assignment_id']);		
		$assignmentId = $params['assignment_id'];
		$itemId = $obj['item_id'];
		$homeworkType = $obj['homework_type'];
		$targetId = $obj['target_id'];
		$startDate = $obj['start_date'];
		$endDate = $obj['end_date'];
		$academicId = $user['academic_id'];
		
		//insert record in usermodel
		$UAS = New UsermodelApiServices($request);
		$data = $UAS->schoolApiInsertHomework($assignmentId, 
											$itemId, 
											$homeworkType,
											$targetId,
											$startDate,
											$endDate,
											$studentIds,
											$academicId);
		
		if (isset($data['status']) && $data['status'] == "failure") {
			$output = ['status' => false,'code'=>202, 'message' => "Network error"];
			return response()->json($output);
		} else {
			$obj->is_published = 1;	
			$obj->save();
			$obj['start_date_display'] = $obj['start_date'];
			$obj['end_date_display'] = $obj['end_date'];
			return response()->json($obj);
		}
	}
	
	public function republish_exercise(Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		$studentIds = $PBS->getStudents();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);	
		
		if ($studentIds === false) {
			$output = ['status' => false,'code'=>201, 'message' => "No students found"];
			return response()->json($output);
		}
		
		$params['teacher_id'] = $user['user_id'];
		$params['item_type'] = $params['item_type'];
				
        $validator = Validator::make($params, [
            'assignment_id' => 'integer',
            'academic_id' => 'required|integer',
			'class_id' => 'required|integer',
			'subject_id' => 'required|integer',
			'item_id' => 'required|integer',
			'remark' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
			'homework_type'=>['required',Rule::in(['READFOLLOW', 'EXERCISE', 'VIDEO'])],
			'target_id'=> 'required|integer'
        ]);
		
        if ($validator->fails()) {
            $output = ['status' => false,'code' => '','message' => $validator->errors()];
            return Response()->json($output,400);
        }
		
		$obj = Homework::find($params['assignment_id']);			
		$obj->updateHomework($params);			
				
		$assignmentId = $params['assignment_id'];
		$itemId = $obj['item_id'];
		$homeworkType = $obj['homework_type'];
		$targetId = $obj['target_id'];
		$startDate = $obj['start_date'];
		$endDate = $obj['end_date'];
		$academicId = $user['academic_id'];
		
		//insert record in usermodel
		$UAS = New UsermodelApiServices($request);
		$data = $UAS->schoolApiInsertHomework($assignmentId, 
											$itemId, 
											$homeworkType,
											$targetId,
											$startDate,
											$endDate,
											$studentIds,
											$academicId);
		
		if (isset($data['status']) && $data['status'] == "failure") {
			$output = ['status' => false,'code'=>202, 'message' => "Network error"];
			return response()->json($output);
		} else {
			$obj->is_published = 1;	
			$obj->save();
			$obj['start_date_display'] = $obj['start_date'];
			$obj['end_date_display'] = $obj['end_date'];
			return response()->json($obj);
		}
	}*/
	
	
}