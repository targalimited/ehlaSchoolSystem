<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use GuzzleHttp\Client;
//use Illuminate\Support\Facades\DB;

class ParamBasicServices extends Model {
	private $userJson;
	private $accessToken;
	private $userBasic;
	
	public function __construct(Request $request) {
		parent::__construct();
		$this->userJson = \Auth::user()->user;
		$accessToken = \Auth::retrieveUsermodelAccessToken();
		
		$params = $request->params;
		
		$this->userBasic['user_id'] = $this->userJson['user_id'];
		$this->userBasic['class_id'] = isset($params['class_id']) ? $params['class_id'] : null;
		$this->userBasic['subject_id'] = isset($params['subject_id']) ? $params['subject_id'] : null;
		$this->userBasic['academic_id'] = isset($params['academic_id']) ? $params['academic_id'] : null;
    }
	
	public function getStudents() {
		$classId = $this->userBasic['class_id'];
		$subjectId = $this->userBasic['subject_id'];
		
		if ($classId == null || $subjectId == null ) {
			return false;
		} else {
			$sql  = " SELECT group_concat(student_id) student_ids ";
			$sql .= " FROM   ".\DB::getTablePrefix()."student_class_subject scs";
			$sql .= " WHERE  class_id = ".$classId;
			$sql .= " AND    subject_id = ".$subjectId;
			$result = DB::select($sql);
			
			$students = $result->student_ids;			
			return $students;
		}
	}
	
	public function getUserBasic() {
		return $this->userBasic;
	}
}
