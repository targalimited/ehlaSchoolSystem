<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use GuzzleHttp\Client;
//use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Extensions\EhlaGuzzleClient;

class UsermodelApiServices extends Model {
	//usermodel common basic
	private $request;
	private $client;
	private $accessToken;
	private $encodeField = '?encode=1';
	private $accessTokenField = '&access-token=';
	private $suffix;
	
	public function __construct(Request $request) {
		parent::__construct();
		$this->request = $request;
		$this->client = new EhlaGuzzleClient();
		
		$userSession = empty(Auth::user()->session) ? null : json_decode(Auth::user()->session);
		if(!$userSession) {
			return response()->json('', 401);
		}
		$this->accessToken = $userSession->access_token;
		$this->suffix = '?encode=1&access-token='.$userSession->access_token;
    }
	
	public function schoolApiGetSchoolUserBasic($studentIds) {
		$inputs = [
			'student_ids' => $studentIds,
		];
		
		$result = $this->client->post(config('variables.schoolApiGetSchoolUserBasicUrl').$this->suffix, $inputs);
		return $result;
	}
	
	public function resultApiGetSchoolBatchItemResultReport($academicId, $studentIds, $itemId, $subjectId, $batchId) {
		$inputs = [
			'academic_id' => $academicId,
			'student_ids' => $studentIds,
			'item_id' => $itemId,
			'subject_id' => $subjectId,
			'batch_id' => $batchId
		];
		
			
		$result = $this->client->post(config('variables.resultApiGetSchoolBatchItemResultReportUrl').$this->suffix, $inputs);
		return $result;
	}
	
	public function resultApiGetSchoolStatusReport($academicId, $studentIds, $itemId, $subjectId, $batchId) {
		$inputs = [
			'academic_id' => $academicId,
			'student_ids' => $studentIds,
			'item_id' => $itemId,
			'subject_id' => $subjectId,
			'batch_id' => $batchId
		];
					
		$result = $this->client->post(config('variables.resultApiGetSchoolStatusReportUrl').$this->suffix, $inputs);
		return $result;
	}
	
	public function resultApiGetSchoolWeaknessReport($academicId, $studentIds, $subjectId, $weaknessCode, $weaknessIds) {
		$inputs = [
			'academic_id' => $academicId,
			'student_ids' => $studentIds,
			'subject_id' => $subjectId,
			'weakness_code' => $weaknessCode,
			'weakness_ids' => $weaknessIds
		];
		$result = $this->client->post(config('variables.resultApiGetSchoolWeaknessReportUrl').$this->suffix, $inputs);
		
		return $result;
	}
	
	public function resultApiGetSchoolWeaknessList($academicId, $studentIds, $subjectId, $weaknessCode) {
		$inputs = [
			'academic_id' => $academicId,
			'student_ids' => $studentIds,
			'subject_id' => $subjectId,
			'weakness_code' => $weaknessCode
		];
		$result = $this->client->post(config('variables.resultApiGetSchoolWeaknessListUrl').$this->suffix, $inputs);
	
		return $result;
	}
	
	public function schoolApiEditSchoolAssignment($params) {
		$inputs = $params;
		
		$result = $this->client->post(config('variables.schoolApiEditSchoolAssignmentUrl').$this->suffix, $inputs);				
		return $result;
	}
	
	public function schoolApiGetCatBySubjectLevel($subjectId, $levels) {
		$inputs = [
			'subject_id' => $subjectId,
			'levels' => $levels
		];
		
		$result = $this->client->post(config('variables.schoolApiGetCatBySubjectLevelUrl').$this->suffix, $inputs);
		return $result['data'];
	}
	
	public function schoolApiGetItemsByCatGrouper($level, $catGrouper, $subjectId) {
		$inputs = [
			'level' => $level,
			'cat_grouper' => $catGrouper,
			'subject_id' => $subjectId
		];
		
		$result = $this->client->post(config('variables.schoolApiGetItemsByCatGrouperUrl').$this->suffix, $inputs);		
		return $result;
	}
	
	public function schoolApiGetItemById($level, $itemId, $subjectId) {
		$inputs = [
			'level' => $level,
			'item_id' => $itemId,
			'subject_id' => $subjectId
		];
		
		$result = $this->client->post(config('variables.schoolApiGetItemByIdUrl').$this->suffix, $inputs);
		return $result;
	}
	
	
	public function schoolApiGetSchoolAssignment($params) {
		$inputs = $params;
		$result = $this->client->post(config('variables.schoolApiGetSchoolAssignmentUrl').$this->suffix, $inputs);				
		return $result;
	}
	
	public function schoolApiSetSchoolAssignment($params) {
		$inputs = $params;
		
		$result = $this->client->post(config('variables.schoolApiSetSchoolAssignmentUrl').$this->suffix, $inputs);				
		return $result;
	}
	
	public function schoolApiLockSchoolAssignment($params) {
		$inputs = $params;
		
		$result = $this->client->post(config('variables.schoolApiLockSchoolAssignmentUrl').$this->suffix, $inputs);				
		return $result;
	}
	
	public function schoolApiGetSchoolCategory($subjectId) {		
		$result = $this->client->get(config('variables.schoolApiGetSchoolCategoryUrl').$subjectId.$this->suffix);
		return $result['data'];
	}
	
	
	
	
	
	public function schoolApiConfirmItems($params) {
		$inputs = $params;
		$result = $this->client->post(config('variables.schoolApiConfirmItemsUrl').$this->suffix, $inputs);				
		return $result;
	}
	
	public function schoolApiConfirmItemForLevel($params) {
		$inputs = $params;
		
		$result = $this->client->post(config('variables.schoolApiConfirmItemForLevelUrl').$this->suffix, $inputs);				
		return $result;
	}
	
	
	
	
	
	
	public function schoolApiGetSchoolItemSummary() {
		$url = config('variables.schoolApiGetSchoolItemSummaryUrl').$this->suffix;
		
		$result = $this->client->get($url);
		return $result['data'];	
	}
	
	public function schoolApiSetAssignments($academicId, $classId, $subjectId, $itemId, $itemType, $homeworkType, $targetIds, $startDate, $endDate, $remark) {
		$inputs = [
			'academic_id' => $academicId,
			'class_id' => $classId,
			'subject_id' => $subjectId,
			'item_id' => $itemId,
			'item_type' => $itemType,
			'homework_type' => $homeworkType,
			'target_ids' => $targetIds,
			'start_date' => $startDate,
			'end_date' => $endDate,
			'remark' => $remark
		];		
		
		$result = $this->client->post(config('variables.schoolApiSetAssignmentsUrl').$this->suffix, $inputs);
		return $result['data'];
	}
	
	public function schoolApiPublishAssignments($studentIds, $assignmentIds) {		
		$inputs = [
			'student_ids' => $studentIds,
			'assignment_ids' => $assignmentIds
		];		
		
		$result = $this->client->post(config('variables.schoolApiPublishAssignmentsUrl').$this->suffix, $inputs);
		return $result['data'];
	}
	
	public function schoolApiChooseItems($catGrouper, $addItemIds, $removeItemIds, $limit, $page) {			
		$inputs['cat_grouper'] = $catGrouper;
		$inputs['add_item_ids'] = $addItemIds;
		$inputs['remove_item_ids'] = $removeItemIds;
		$inputs['limit'] = $limit;
		$inputs['page'] = $page;
				
		$result = $this->client->post(config('variables.schoolApiChooseItemsUrl').$this->suffix, $inputs);
		return $result;
	}
		
	public function schoolApiChooseItemForLevel($itemId, $itemLv) {	
		$inputs['item_id'] = $itemId;
		$inputs['item_lv'] = $itemLv;
		
		$result = $this->client->post(config('variables.schoolApiChooseItemForLevelUrl').$this->suffix, $inputs);
		return $result;
	}
		
	public function schoolApiChooseItemsForLevel($catGrouper, $addLvItemList, $removeLvItemList, $limit, $page) {	
		$inputs['cat_grouper'] = $catGrouper;
		$inputs['add_lv_item_list'] = $addLvItemList;
		$inputs['remove_lv_item_list'] = $removeLvItemList;
		$inputs['limit'] = $limit;
		$inputs['page'] = $page;
		
		$result = $this->client->post(config('variables.schoolApiChooseItemsForLevelUrl').$this->suffix, $inputs);
		return $result;
	}
	
	public function schoolApiGetByCategory($categoryId, $catGrouper, $page, $limit, $preChosenItemIds) {		
		if(isset($categoryId)) {$inputs['id'] = $categoryId;}
		if(isset($catGrouper)) {$inputs['cat_grouper'] = $catGrouper;}
		if (isset($preChosenItemIds)) {$inputs['pre_chosen_item_ids'] = $preChosenItemIds;}
		$inputs['page'] = $page;
		$inputs['limit'] = $limit;
		$inputs['req_gen_srh'] = 1;
		$inputs['req_wks_srh'] = 1;
		$inputs['req_wd_srh'] = 0;	
		
		$result = $this->client->post(config('variables.schoolApiGetByCategoryUrl').$this->suffix, $inputs);
		return $result;
	}

	public function schoolApiGetSelectedItemByCategory($catGrouper, $page, $limit) {
		$inputs['cat_grouper'] = $catGrouper;
		$inputs['page'] = $page;
		$inputs['limit'] = $limit;
		
		$inputs['sort_by'] = 'level';
		$inputs['sort_order'] = 'asc';
		$inputs['req_gen_srh'] = 1;
		$inputs['req_wks_srh'] = 1;
		$inputs['req_wd_srh'] = 1;		

		$result = $this->client->post(config('variables.schoolApiGetSelectedItemByCategoryUrl').$this->suffix, $inputs);
		return $result;
	}

	public function schoolApiGetSelectedItem() {
		$result = $this->client->post(config('variables.schoolApiGetSelectedItemsUrl').$this->suffix, []);
		return $result;
	}
	
	public function schoolApiGetByIds($ids) {
		$inputs['ids'] = $ids;
		
		$result = $this->client->post(config('variables.schoolApiGetByIdsUrl').$this->suffix, $inputs);
		return $result;
	}
	
	public function schoolApiGetPreviewById($id) {
		$inputs['id'] = $id;
		
		$result = $this->client->post(config('variables.schoolApiGetPreviewByIdUrl').$this->suffix, $inputs);
		return $result;
	}
	
	public function schoolApiGetAssignmentByItemId($id, $itemType, $academicId, $classId, $subjectId) {
		$inputs = [
				'id' => $id,
				'item_type' => $itemType,
				'academic_id' => $academicId,
				'class_id' => $classId,
				'subject_id' => $subjectId
		];
		
		$result = $this->client->post(config('variables.schoolApiGetAssignmentByItemIdUrl').$this->suffix, $inputs);
		return $result['data'];
	}
	
	/*
	{"params": {
		"academic_id":2018,
		"student_ids":[38,43,60],
		"assessment_item_id":710
	  }
	}
	*/
	public function resultApiGetSchoolResultSummaryReport($academicId, $studentIds, $itemId) {		
		$inputs = [
				'academic_id' => $academicId,
				'student_ids' => $studentIds,
				'assessment_item_id' => $itemId
		];			
		
		$result = $this->client->post(config('variables.schoolApiGetSchoolResultSummaryReportUrl').$this->suffix, $inputs);
		return $result;
	}
	
	/*
	{"params": {
		"academic_id":2018,
		"student_ids":[38,43,60],
		"assessment_item_id":710
	  }
	}
	*/
	public function resultApiGetSchoolResultReport($academicId, $studentIds, $itemId) {		
		$inputs = [
				'academic_id' => $academicId,
				'student_ids' => $studentIds,
				'assessment_item_id' => $itemId
		];		
		
		$result = $this->client->post(config('variables.schoolApiGetSchoolResultReportUrl').$this->suffix, $inputs);
			
		foreach ($result['data'] as &$assignmentId) {
			foreach ($studentIds as $sid) {
				$assignmentId[$sid]['name'] = $sid;
			}
		}
		
		return $result;
	}
	
	
	/*
	{"params": {
		"academic_id":2018,
		"student_ids":[38,43,60],
		"assessment_item_id":710,
		"report_type":"normal",
		"_report_type":"spell",
		"_report_type":"match",
		"_report_type":"usage"
	  }
	}
	*/
	/*public function resultApiGetSchoolWeaknessReport($academicId, $studentIds, $itemId, $reportType) {			
		$inputs = [
			'academic_id' => $academicId,
			'student_ids' => $studentIds,
			'assessment_item_id' => $itemId,
			'report_type' => $reportType
		];
		
		$result = $this->client->post(config('variables.schoolApiGetSchoolWeaknessReportUrl').$this->suffix, $inputs);				
		return $result;
	}*/
	
	/*public function schoolApiGetReadingList($params) {
		$pass_params['params'] = $params;
		$uri = $version."schoolApi/get_reading_list";
		
		$umOption['body'] = json_encode($pass_params);
		
		$data = $client->get($umUrlDomain.$uri, $umOption);
		return $data;
	}*/
	
	
	/*
	public function schoolApiInsertHomework($assignmentId, 
											$itemId, 
											$homeworkType,
											$targetId,
											$startDate,
											$endDate,
											$studentIds,
											$academicId) {
		$params = $this->request->params;
		
		$uri = $this->version."schoolApi/insert_homework/".$this->umUrlSuffix;
		
		$this->umOption['form_params'] = [
			'params' => ['assignment_id' => $assignmentId,
						'item_id' => $itemId,
						'homework_type' => $homeworkType,
						'target_id' => $targetId,
						'start_date' => $startDate,
						'end_date' => $endDate,
						'student_ids' => $studentIds,
						'academic_id' => $academicId]
		];
		
		$client = new Client();
		
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		return $result['data'];
	}
	
	public function schoolApiInsertHomeworks($studentIds, 
											$batchs) {
		$params = $this->request->params;
		
		$uri = $this->version."schoolApi/insert_homeworks/".$this->umUrlSuffix;
		
		$this->umOption['form_params'] = [
			'params' => ['student_ids' => $studentIds,
						'batchs' => $batchs]
		];
		
		$client = new Client();
		
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		return $result['data'];
	}
	*/
	
	
	/*
	public function schoolApiGetReadingHomeworkByItemId($id) {
		if (isset($id) && is_numeric($id)) {
			$uri = $this->version."schoolApi/get_reading_homework_by_item_id".$this->umUrlSuffix;
			
			$this->umOption['form_params'] = [
				'params' => ['id' => $id]
			];			
			
			$client = new Client();
			
			$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
			$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
			
			return $result;
		} else {
			return null;
		}
	}
	
	public function schoolApiGetCompDiagnosisHomeworkByItemId($id) {
		if (isset($id) && is_numeric($id)) {
			$uri = $this->version."schoolApi/get_comp_diagnosis_homework_by_item_id".$this->umUrlSuffix;
			
			$this->umOption['form_params'] = [
				'params' => ['id' => $id]
			];			
			
			$client = new Client();
			
			$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
			$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
			
			return $result;
		} else {
			return null;
		}
	}
	
	public function schoolApiGetReadingCompDiagnosisHomeworkByItemId($id) {
		if (isset($id) && is_numeric($id)) {
			$uri = $this->version."schoolApi/get_reading_comp_diagnosis_homework_by_item_id".$this->umUrlSuffix;
			
			$this->umOption['form_params'] = [
				'params' => ['id' => $id]
			];			
			
			$client = new Client();
			
			$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
			$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
			
			return $result;
		} else {
			return null;
		}
	}
	*/
}
