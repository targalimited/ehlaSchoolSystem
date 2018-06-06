<?php

namespace App\Http\Middleware;

use Closure;
use App\Extensions\Dbotf;
use App\User;

class ChooseDB
{
  /**
   * Handle an incoming request and switch to right database.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   * @param  string|null $guard
   * @return mixed
   */

  public function handle($request, Closure $next)
  {
    // get access token if have
    // $authKey = isset($configuration['authKey']) ? $configuration['authKey'] : 'extoken';
    $token = $request->header('extoken');
    $sid = $request->header('school-id');

    if($sid && $token){
      $dbname = "school_".$sid;
      $otf = new Dbotf(['database' => $dbname]);
      $user = User::where('ex_token', $token)->first();
      if(!empty($user)){
        return $next($request);
      }
    }
    return Response()->json('Unauthorized', 401);
  }

}
