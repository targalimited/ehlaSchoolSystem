<?php
# File: app\Http\Middleware\CORS.php
# Create file with below code in above location. And at the end of the file there are other instructions also.
# Please check.

namespace App\Http\Middleware;

use Closure;

class CORS {

  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next) {

    // ALLOW OPTIONS METHOD
    $headers = [
      'Access-Control-Allow-Origin' => 'http://localhost:3000',
      'Access-Control-Allow-Credentials'=> true,
      'Access-Control-Allow-Methods' => '*',
      'Access-Control-Allow-Headers' => '*'
    ];

    if ($request->getMethod() == "OPTIONS") {
      // The client-side application can set only headers allowed in Access-Control-Allow-Headers
      return \Response::make('OK', 200, $headers);
    }

    $response = $next($request);
    foreach ($headers as $key => $value)
      $response->header($key, $value);
    return $response;
  }
}

# File::  app\Http\Kernel.php
# Add following line in `protected $middleware` Array.
# \App\Http\Middleware\CORS::class

# And following in `protected $routeMiddleware` Array
# 'cors' => \App\Http\Middleware\CORS::class

