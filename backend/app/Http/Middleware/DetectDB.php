<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class DetectDB
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   * @param  string|null $guard
   * @return mixed
   */

  public function handle($request, Closure $next)
  {

    $school_id = (int)$request->header('school-id');

    if ($school_id)
      $db_name = "school_" . $school_id;
    else
      $db_name = "school_0";
    //$db_name = "school_1";

    dd('hi');

    DB::purge($db_name);

//        config(['database.connections.mysql.host'=>env('DB_HOST_SCHOOL','school-system-rds.ckjfdmyszhad.ap-southeast-1.rds.amazonaws.com')]);
//        config(['database.connections.mysql.port'=>env('DB_PORT_SCHOOL','13310')]);
//        config(['database.connections.mysql.database'=>env('DB_DATABASE_SCHOOL',$db_name)]);
//        config(['database.connections.mysql.username'=>env('DB_USERNAME_SCHOOL','ehlawebusr')]);
//        config(['database.connections.mysql.password'=>env('DB_PASSWORD_SCHOOL','JS,J.0>D16GvHZt[(=DrgLk1(=70:bad')]);
//        config(['database.connections.mysql.prefix'=>'school_']);

    config(['database.connections.school_0.host' => env('DB_HOST_SCHOOL')]);
    config(['database.connections.school_0.port' => env('DB_PORT_SCHOOL')]);
    config(['database.connections.school_0.database' => $db_name]);
    config(['database.connections.school_0.username' => env('DB_USERNAME_SCHOOL')]);
    config(['database.connections.school_0.password' => env('DB_PASSWORD_SCHOOL')]);
    config(['database.connections.school_0.prefix' => 'school_']);
    // config(['database.default'=>'mysql']);
    DB::reconnect();

    dd(DB::getDatabaseName());

    return $next($request);
  }
}
