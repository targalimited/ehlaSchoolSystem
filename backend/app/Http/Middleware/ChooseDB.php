<?php

namespace App\Http\Middleware;

use Closure;
use App\Extensions\Dbotf;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
    // get access token
    $token = $request->header('extoken');
    $sid = $request->header('school-id');

    if($sid && $token){

      // switch database
      $dbname = "school_".$sid;
      new Dbotf(['database' => $dbname]);

      $user = User::where('ex_token', $token)->with('roles')->first();
      if(!empty($user)){
        if(Carbon::parse($user->expiry_date)->gt(Carbon::now())) {
          Auth::login($user, true);
          return $next($request);
        } else {
          return Response()->json('Unauthorized : Token expiried', 401);
        }
      }
    }
    return Response()->json('Unauthorized : No Record', 401);
  }

}
