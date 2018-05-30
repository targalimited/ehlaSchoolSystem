<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class PermissionControlServices extends Model {
	
	public function __construct(Request $request) {
		parent::__construct();
    }
	
	public function checkUserPermission($user) {
		$permission = [];
		$permission['chooseItems'] = false;
		$permission['readhomework'] = false;
		$permission['assignhomework'] = false;
		
		$permission['chooseItems'] = true;
		if (isset($user['class_id']) && isset($user['subject_id'])) {
			$permission['readhomework'] = true;
			$permission['assignhomework'] = true;
		}
		
		return $permission;
	}
	
	public function getTeacherClasses($teacherId, $subjectId) {
		$sql  = " SELECT    DISTINCT class_id id, cs.c_name ";
		$sql .= " FROM      ".\DB::getTablePrefix()."teacher_class_subject tcs";
		$sql .= " LEFT JOIN ".\DB::getTablePrefix()."classes cs";
		$sql .= " ON        tcs.class_id = cs.id ";
		$sql .= " WHERE     tcs.teacher_id = ".$teacherId;
		$sql .= " AND       tcs.subject_id = ".$subjectId;
		$classes = DB::select($sql);
		
		return $classes;
	}
}
