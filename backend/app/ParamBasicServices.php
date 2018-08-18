<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

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
	
	public function getClasses($teacherId) {
		$subjectId = $this->userBasic['subject_id'];
		
		$sql  = " SELECT class_id, c_name, level ";
		//$sql .= "        (CASE WHEN `lock` = 1 THEN 1 ELSE 0 END) `lock`";
		$sql .= " FROM   ".\DB::getTablePrefix()."teacher_class_subject tcs";
		$sql .= " LEFT JOIN ".\DB::getTablePrefix()."classes c";;
		$sql .= " ON tcs.class_id = c.id";
		$sql .= " WHERE teacher_id = ".$teacherId;
		$sql .= " AND   subject_id = ".$subjectId;
		
		$result = DB::select($sql);
		$students = $result;		
		return $students;
	}
	
	public function getClassLevelById($classId) {
		$subjectId = $this->userBasic['subject_id'];
		
		$sql  = " SELECT level ";
		$sql .= " FROM   ".\DB::getTablePrefix()."classes c";;
		$sql .= " WHERE id = ".$classId;
		
		$result = DB::select($sql);
		
		return $result[0]->level;
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
			
			$students = [];
			if (isset($result[0]->student_ids)) {
				$students = explode(',', $result[0]->student_ids);
			}
			return $students;
		}
	}
	
	public function getUsersByUserIds($userIds) {
		if (empty($userIds)) {
			return [];
		}
		
		$sql  = " SELECT *";
		$sql .= " FROM ".\DB::getTablePrefix()."user_info ui";
		$sql .= " WHERE user_id IN (".implode(',', $userIds).")";
		
		$result = DB::select($sql);
		
		$result = json_decode(json_encode($result), true);
		return $result;
	}
	
	public function getUsersMapByUserIds($userIds) {
		$data = $this->getUsersByUserIds($userIds);
		
		$map = [];
		foreach($data as $value) {
			$map[$value['user_id']] = $value;
		}
		return $map;
	}
	
	public function getUserBasic() {
		return $this->userBasic;
	}
}
