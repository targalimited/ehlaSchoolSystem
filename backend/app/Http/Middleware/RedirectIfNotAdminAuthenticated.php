<?php

namespace App\Http\Middleware;

use App\Debug;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RedirectIfNotAdminAuthenticated
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

    $debug = New Debug();
    $debug->context = json_encode($request->header());
    $debug->save();


    $school_id = (int)$request->header('school-id');

    // dump('school_id.'.$school_id);

    if ($school_id)
      $db_name = "school_" . $school_id;

    //dump($db_name);

    DB::purge('school_0');

//        config(['database.connections.mysql.host'=>env('DB_HOST_SCHOOL','school-system-rds.ckjfdmyszhad.ap-southeast-1.rds.amazonaws.com')]);
//        config(['database.connections.mysql.port'=>env('DB_PORT_SCHOOL','13310')]);
//        config(['database.connections.mysql.database'=>env('DB_DATABASE_SCHOOL',$db_name)]);
//        config(['database.connections.mysql.username'=>env('DB_USERNAME_SCHOOL','ehlawebusr')]);
//        config(['database.connections.mysql.password'=>env('DB_PASSWORD_SCHOOL','JS,J.0>D16GvHZt[(=DrgLk1(=70:bad')]);
//        config(['database.connections.mysql.prefix'=>'school_']);

    config(['database.connections.school_0.host' => env('DB_HOST_SCHOOL', 'school-system-rds.ckjfdmyszhad.ap-southeast-1.rds.amazonaws.com')]);
    config(['database.connections.school_0.port' => env('DB_PORT_SCHOOL', '13310')]);
    config(['database.connections.school_0.database' => $db_name]);
    config(['database.connections.school_0.username' => env('DB_USERNAME_SCHOOL', 'ehlawebusr')]);
    config(['database.connections.school_0.password' => env('DB_PASSWORD_SCHOOL', 'JS,J.0>D16GvHZt[(=DrgLk1(=70:bad')]);
    config(['database.connections.school_0.prefix' => 'school_']);
    // config(['database.default'=>'mysql']);
    DB::reconnect();

//    dump(DB::connection()->getPdo());


    if (Auth::check()) {
      //dump(Auth::check());
      //dump('auth.OK.'.DB::getDatabaseName());
      return $next($request);
    }
    // dump(DB::getDatabaseName());
    return redirect('/');
  }
}
