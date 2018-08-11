<?php

$array['mysql']['driver'] = 'mysql';
$array['mysql']['host'] = env('DB_HOST_SCHOOL');
$array['mysql']['port'] = env('DB_PORT_SCHOOL');
$array['mysql']['database'] = env('DB_DATABASE_SCHOOL');
$array['mysql']['username'] = env('DB_USERNAME_SCHOOL');
$array['mysql']['password'] = env('DB_PASSWORD_SCHOOL');
$array['mysql']['charset'] = 'utf8mb4';
$array['mysql']['collation'] = 'utf8mb4_unicode_ci';
$array['mysql']['prefix'] = env('DB_PREFIX', 'school_');
$array['mysql']['strict'] = true;
$array['mysql']['engine'] = null;

 for ($i = 3 ;  $i<=120; $i++){
   $array['school_'.$i]['driver'] = 'mysql';
   $array['school_'.$i]['host'] = env('DB_HOST_SCHOOL');
   $array['school_'.$i]['port'] = env('DB_PORT_SCHOOL');
   $array['school_'.$i]['database'] = 'school_'.$i;
   $array['school_'.$i]['username'] = env('DB_USERNAME_SCHOOL');
   $array['school_'.$i]['password'] = env('DB_PASSWORD_SCHOOL');
   $array['school_'.$i]['charset'] = 'utf8mb4';
   $array['school_'.$i]['collation'] = 'utf8mb4_unicode_ci';
   $array['school_'.$i]['prefix'] = env('DB_PREFIX', 'school_');
   $array['school_'.$i]['strict'] = true;
   $array['school_'.$i]['engine'] = null;
 }


return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => env('DB_CONNECTION', 'mysql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */


    // 'connections' => $array,
   'connections' =>

//       'sqlite' => [
//           'driver' => 'sqlite',
//           'database' => env('DB_DATABASE', database_path('database.sqlite')),
//           'prefix' => '',
//       ],

    $array,

//       'mysql' => [
//           'driver' => 'mysql',
//           'host' => env('DB_HOST_SCHOOL'),
//           'port' => env('DB_PORT_SCHOOL'),
//           'database' => env('DB_DATABASE_SCHOOL'),
//           'username' => env('DB_USERNAME_SCHOOL'),
//           'password' => env('DB_PASSWORD_SCHOOL'),
//           'charset' => 'utf8mb4',
//           'collation' => 'utf8mb4_unicode_ci',
//           'prefix' => env('DB_PREFIX', 'school_'),
//           'strict' => true,
//           'engine' => null,
//       ],

//       'school_testing' => [
//           'driver' => 'mysql',
//           'host' => env('DB_HOST_SCHOOL_TESTING', 'db-test.ckjfdmyszhad.ap-southeast-1.rds.amazonaws.com'),
//           'port' => env('DB_PORT_SCHOOL_TESTING', '13310'),
//           'database' => env('DB_DATABASE_SCHOOL_TESTING', 'ehl_user'),
//           'username' => env('DB_USERNAME_SCHOOL_TESTING', 'billchan'),
//           'password' => env('DB_PASSWORD_SCHOOL_TESTING', '4&CdMY-6a9<J934P'),
//           'charset' => 'utf8mb4',
//           'collation' => 'utf8mb4_unicode_ci',
//           'prefix' => env('DB_PREFIX', 'school_'),
//           'strict' => true,
//           'engine' => null,
//       ],
//
//       'pgsql' => [
//           'driver' => 'pgsql',
//           'host' => env('DB_HOST', '127.0.0.1'),
//           'port' => env('DB_PORT', '5432'),
//           'database' => env('DB_DATABASE', 'forge'),
//           'username' => env('DB_USERNAME', 'forge'),
//           'password' => env('DB_PASSWORD', ''),
//           'charset' => 'utf8',
//           'prefix' => '',
//           'schema' => 'public',
//           'sslmode' => 'prefer',
//       ],



    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => 'predis',

        'default' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => 0,
        ],

    ],

];
