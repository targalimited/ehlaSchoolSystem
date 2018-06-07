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
	
	public function __construct(Request $request) {
		parent::__construct();
		$this->request = $request;
		$this->client = new EhlaGuzzleClient();
    }
	
	public function schoolApiGetSchoolCategory($subjectId) {
		if (isset($subjectId) && is_numeric($subjectId)) {
			$uri = $this->version."schoolApi/get_school_category/subject_id/".$subjectId.$this->umUrlSuffix;
			$client = new Client();
			
			$data = $client->get($this->umUrlDomain.$uri, $this->umOption);
			$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
			return $result['data'];
		} else {
			return null;
		}
	}
	
	public function schoolApiGetSchoolItemSummary() {

		$userSession = empty(Auth::user()->session) ? null : json_decode(Auth::user()->session);
		if(!$userSession) {
			return response()->json('', 401);
		}
		$access_token = $userSession->access_token;
		$result = $this->client->get(config('variables.schItemSummaryUrl').$access_token);
		return $result['data'];
	
	}
	
	public function schoolApiSetAssignments($academicId, $classId, $subjectId, $itemId, $itemType, $homeworkType, $targetIds, $startDate, $endDate, $remark) {
		$uri = $this->version."schoolApi/set_assignments/".$this->umUrlSuffix;
		
		$this->umOption['form_params'] = [
			'params' => ['academic_id' => $academicId,
						'class_id' => $classId,
						'subject_id' => $subjectId,
						'item_id' => $itemId,
						'item_type' => $itemType,
						'homework_type' => $homeworkType,
						'target_ids' => $targetIds,
						'start_date' => $startDate,
						'end_date' => $endDate,
						'remark' => $remark]
		];		
		
		$client = new Client();
		
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		$exerciseDetails = $result['data'];
		return $exerciseDetails;
	}
	
	public function schoolApiPublishAssignments($studentIds, $assignmentIds) {
		$uri = $this->version."schoolApi/publish_assignments/".$this->umUrlSuffix;
		
		$this->umOption['form_params'] = [
			'params' => ['student_ids' => $studentIds,
						'assignment_ids' => $assignmentIds]
		];		
		$client = new Client();
		
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		$exerciseDetails = $result['data'];
		return $exerciseDetails;
	}
	
	public function schoolApiChooseItems($catGrouper, $addItemIds, $removeItemIds, $limit, $page) {		
		$uri = $this->version."schoolApi/choose_items".$this->umUrlSuffix;
		
		$params['cat_grouper'] = $catGrouper;
		$params['add_item_ids'] = $addItemIds;
		$params['remove_item_ids'] = $removeItemIds;
		$params['limit'] = $limit;
		$params['page'] = $page;
		
		$this->umOption['form_params'] = [
			'params' => $params
		];
		
		$client = new Client();
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		
		return $result;
	}
		
	public function schoolApiChooseItemsForLevel($catGrouper, $addLvItemList, $removeLvItemList, $limit, $page) {	
		$uri = $this->version."schoolApi/choose_items_for_level".$this->umUrlSuffix;
		
		$params['cat_grouper'] = $catGrouper;
		$params['add_lv_item_list'] = $addLvItemList;
		$params['remove_lv_item_list'] = $removeLvItemList;
		$params['limit'] = $limit;
		$params['page'] = $page;
		
		$this->umOption['form_params'] = [
			'params' => $params
		];
		
		$client = new Client();
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		
		return $result;
	}
	
	public function schoolApiGetByCategory($categoryId, $catGrouper, $page, $limit, $preChosenItemIds) {		
		
		$uri = $this->version."schoolApi/get_by_category".$this->umUrlSuffix;
		
		if(isset($categoryId)) {$params['id'] = $categoryId;}
		if(isset($catGrouper)) {$params['cat_grouper'] = $catGrouper;}
		$params['page'] = $page;
		$params['limit'] = $limit;
		
		if (isset($preChosenItemIds)) {
			$params['pre_chosen_item_ids'] = $preChosenItemIds;
		}
		
		$this->umOption['form_params'] = [
			'params' => $params
		];			
		
		$client = new Client();
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		
		return $result;
	}

	public function schoolApiGetSelectedItemByCategory($catGrouper, $page, $limit) {
		$uri = $this->version."schoolApi/get_selected_item_by_category".$this->umUrlSuffix;
		
		$params['cat_grouper'] = $catGrouper;
		$params['page'] = $page;
		$params['limit'] = $limit;

		$this->umOption['form_params'] = [
			'params' => $params
		];
		
		$client = new Client();
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		
		return $result;
	}
	
	public function schoolApiGetByIds($id) {
		if (isset($id) && is_numeric($id)) {
			$uri = $this->version."schoolApi/get_by_ids".$this->umUrlSuffix;
			
			$this->umOption['form_params'] = [
				'params' => ['ids' => [$id]]
			];			
			
			$client = new Client();
			
			$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
			$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
			
			return $result;
		} else {
			return null;
		}
	}
	
	public function schoolApiGetAssignmentByItemId($id, $itemType, $academicId, $classId, $subjectId) {
		if (isset($id) && is_numeric($id)) {
			$uri = $this->version."schoolApi/get_assignment_by_item_id".$this->umUrlSuffix;
			
			$this->umOption['form_params'] = [
				'params' => [
					'id' => $id,
					'item_type' => $itemType,
					'academic_id' => $academicId,
					'class_id' => $classId,
					'subject_id' => $subjectId,
				]
			];			
			
			$client = new Client();
			
			$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
			$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
			
			return $result;
		} else {
			return null;
		}
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
		$uri = $this->version."resultApi/get_school_result_summary_report".$this->umUrlSuffix;
		
		$this->umOption['form_params'] = [
			'params' => [
				'academic_id' => $academicId,
				'student_ids' => $studentIds,
				'assessment_item_id' => $itemId
			]
		];			
		$client = new Client();
		
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		
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
		$uri = $this->version."resultApi/get_school_result_report".$this->umUrlSuffix;
		
		$this->umOption['form_params'] = [
			'params' => [
				'academic_id' => $academicId,
				'student_ids' => $studentIds,
				'assessment_item_id' => $itemId
			]
		];			
		$client = new Client();
		
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		
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
	public function resultApiGetSchoolWeaknessReport($academicId, $studentIds, $itemId, $reportType) {	
		$uri = $this->version."resultApi/get_school_weakness_report".$this->umUrlSuffix;
		
		$this->umOption['form_params'] = [
			'params' => [
				'academic_id' => $academicId,
				'student_ids' => $studentIds,
				'assessment_item_id' => $itemId,
				'report_type' => $reportType
			]
		];			
		
		$client = new Client();
		
		$data = $client->post($this->umUrlDomain.$uri, $this->umOption);
		$result = \GuzzleHttp\json_decode($data->getBody()->getContents(), true);
		
		return $result;
	}
	
	
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
