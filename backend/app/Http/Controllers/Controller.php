<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Extensions\Dbotf;
use App\User;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct() {
		// get access token if have
		// $token = $this->request->header($this->authKey);
		// print_r($token);exit();

		// $otf = new Dbotf(['database' => 'school_1']);
		// $school_db = $otf->getTable('users');
		// $school = $school_db->first();
		// $user = User::where('id', '2')->first();
		// print_r(
		// 	DB::connection('school_2')->getQueryLog()
		// );
		// print_r($user);exit();
    }

}
