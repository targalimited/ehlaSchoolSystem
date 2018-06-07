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
		$this->userJson = json_decode(\Auth::user()->user, true);
		$accessToken = \Auth::retrieveUsermodelAccessToken();
		
		$params = $request->params;
		
		$this->userBasic['user_id'] = $this->userJson['user_id'];
		$this->userBasic['class_id'] = isset($params['class_id']) ? $params['class_id'] : null;
		$this->userBasic['subject_id'] = isset($params['subject_id']) ? $params['subject_id'] : null;
    }
	
	public function getStudents() {
		if ($this->userBasic['class_id'] == null ||
			$this->userBasic['subject_id'] == null ) {
			return false;
		} else {
			return [38,42,43,45,60,86];
		}
	}
	
	public function getUserBasic() {
		return $this->userBasic;
	}
}
