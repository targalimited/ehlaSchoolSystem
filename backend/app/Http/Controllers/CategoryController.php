<?php

namespace App\Http\Controllers;

use App\Homework;
use App\UsermodelApiServices;
use App\ParamBasicServices;
use App\PermissionControlServices;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller {
	
	public function get_school_category (Request $request) {
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//data
		$subjectId = $request->subject_id;

		//get class info
		$classes = $PCS->getTeacherClasses($user['user_id'], $subjectId);
		
		$output = [];
		if (!empty($classes)) {
			//usermodel
			$UAS = New UsermodelApiServices($request);
			$category = $UAS->schoolApiGetSchoolCategory($subjectId);
						
			foreach($category as $value) {
				if ($value['type'] == 'assignItem') {	
					if ($permission['chooseItems']) {
						$value['deadline_en'] = 'No right';
						$value['deadline_zh'] = '沒有權限';
					} else {
						$value['deadline_en'] = '-';
						$value['deadline_zh'] = '-';
					}
					$value['questions_en'] = '-';
					$value['questions_zh'] = '-';
					$value['remark_en'] = '-';
					$value['remark_zh'] = '-';	
					array_push($output, $value);
				
					continue;
				}
				
				if ($value['status'] == 'disabled') {
					continue;
				} else if ($value['status'] == 'view-only') {
					$value['deadline_en'] = 'disabled';
					$value['deadline_zh'] = '未開放';
				} else {
					$value['deadline_en'] = '-';
					$value['deadline_zh'] = '-';
				}
				$value['questions_en'] = '-';
				$value['questions_zh'] = '-';
				$value['remark_en'] = '-';
				$value['remark_zh'] = '-';
				array_push($output, $value);
			}
		}
		
		return json(["data"=>$output, "metadata"=>["classes"=>$classes]]);
	}
	
}
