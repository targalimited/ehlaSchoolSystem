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
		$sql  = " SELECT    DISTINCT class_id id, cs.c_name, cs.level, s.s_name_en, s.s_name_zh ";
		$sql .= " FROM      ".\DB::getTablePrefix()."teacher_class_subject tcs";
		$sql .= " LEFT JOIN ".\DB::getTablePrefix()."classes cs";
		$sql .= " ON        tcs.class_id = cs.id ";
		$sql .= " LEFT JOIN ".\DB::getTablePrefix()."subjects s";
		$sql .= " ON        tcs.subject_id = s.id ";
		$sql .= " WHERE     tcs.teacher_id = ".$teacherId;
		$sql .= " AND       cs.is_deleted = 0 ";
		$sql .= " AND       tcs.is_deleted = 0 ";
		if (isset($subjectId)) {
			$sql .= " AND       tcs.subject_id = ".$subjectId;
		}
		$classes = DB::select($sql);
		
		$classes = json_decode(json_encode($classes), true);
		
		return $classes;
	}
	
	public function getTeacherClassLevel($teacherId, $classId, $subjectId) {
		$sql  = " SELECT DISTINCT cs.level ";
		$sql .= " FROM      ".\DB::getTablePrefix()."teacher_class_subject tcs";
		$sql .= " LEFT JOIN ".\DB::getTablePrefix()."classes cs";
		$sql .= " ON        tcs.class_id = cs.id ";
		$sql .= " LEFT JOIN ".\DB::getTablePrefix()."subjects s";
		$sql .= " ON        tcs.subject_id = s.id ";
		$sql .= " WHERE     tcs.teacher_id = ".$teacherId;
		$sql .= " AND       cs.is_deleted = 0 ";
		$sql .= " AND       tcs.is_deleted = 0 ";
		if (isset($subjectId)) {
			$sql .= " AND       tcs.subject_id = ".$subjectId;
		}
		$classes = DB::select($sql);
		
		return $classes;
	}
	
}
