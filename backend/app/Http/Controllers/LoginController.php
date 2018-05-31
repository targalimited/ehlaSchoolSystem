<?php

namespace App\Http\Controllers;

use App\Session;
use App\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LoginController extends Controller
{


    public function logout(Request $request)
    {
        $access_token = $request->headers->get('access-token');

        if(!isset($_SERVER['QUERY_STRING']))
          $_SERVER['QUERY_STRING'] = '';

        $uri = $request->path() . '?' . $_SERVER['QUERY_STRING'] . '&encode=1&access-token=' . $access_token;

        $input = '';


        $client = new Client();


        try {
            $result = $client->request($request->method(), env('USERMODEL_URL') . $uri,
                [
                    'auth' => ['ehl_api', '27150900'],
                    'headers' => [
                        'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
                    ],
                    'form_params' => [
                        'params' => $input
                    ]

                ]
            );

            $data = \GuzzleHttp\json_decode($result->getBody()->getContents(), true);

            return $data;

        } catch (\Exception $e) {
            // There was another exception.
            return response()->json(\GuzzleHttp\json_decode($e->getResponse()->getBody()->getContents(), true), 200);

        }

    }


  public function login(Request $request){

    // set params to call usermodel
    $input = $request->json('params');
    $input['source'] = 'school_portal';

    // call usermodel
    $client = new Client();
    $result = $client->request($request->method(), env('USERMODEL_URL') . config('variables.loginUrl'),
      [
        'auth' => ['ehl_api', '27150900'],
        'headers' => [
          'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
        ],
        'form_params' => [
          'params' => $input
        ]
      ]
    );
    $data = \GuzzleHttp\json_decode($result->getBody()->getContents(), true);


    if($data['success']){
      $userData = $data['data'][0];
      $userSession = $data['data'][0]['user_session'];
      unset($userData['user_session']);


      if($userData['school']['id']){
        $db_name = "school_".$userData['school']['id'];
        //$db_name = "school_1";
        DB::purge('mysql');

        config(['database.connections.mysql.host'=>env('DB_HOST_SCHOOL')]);
        config(['database.connections.mysql.port'=>env('DB_PORT_SCHOOL')]);
        config(['database.connections.mysql.database'=>$db_name]);
        config(['database.connections.mysql.username'=>env('DB_USERNAME_SCHOOL')]);
        config(['database.connections.mysql.password'=>env('DB_PASSWORD_SCHOOL')]);
        config(['database.connections.mysql.prefix'=>'school_']);
        // config(['database.default'=>'mysql']);
        DB::reconnect();
      }

      $user = User::where('id', $userData['user_id'])->first();


      if($userData['userGroup']['id'] == 2 || $userData['userGroup']['id'] == 3){
        if(!empty($user)){

          // user exist, update user info and do local auth
          try{
            DB::transaction(function () use ($userData, $userSession) {
              DB::table('users')
                ->where('id', $userData['user_id'])
                ->update([
                  'user' => json_encode($userData),
                  'session' => json_encode($userSession),
                  'ex_token' => Str::random(32),
                  'expiry_date' => Carbon::now()->addDay(14)->format('Y-m-j'),
                  'school_id' => $userData['school']['id']
                ]);
            }, 5);
          } catch (\Exception $e) {
            dd($e);
          }
          Auth::login($user, true);


        } else {
          // user not exist, insert new user and do local auth
          // retry 5 times if db deadlock
          try{
            DB::transaction(function () use ($userData, $userSession) {
              DB::table('users')->insert([
                'id' =>  $userData['user_id'],
                'user' => json_encode($userData),
                'session' => json_encode($userSession),
                'ex_token' => Str::random(32),
                'expiry_date' => Carbon::now()->addDay(14)->format('Y-m-j'),
                'school_id' => $userData['school']['id']
              ]);

            }, 5);
          } catch (\Exception $e) {
            return $e;
          }

          $user = User::where('id', $userData['user_id'])->first();
          Auth::login($user, true);

        }

        $user = User::where('id',Auth::user()->id)->with('roles')->first()->toArray();
        return $user;
      }else{
        $result = [
          'status' => false,
          'code' => '401',
          'message' => 'User not exists or wrong password',
          'data' => $data['debug']
        ];
        return Response()->json($result,401);
      }
//      $res = [
//        'success' => true,
//        'user' => $userData,
//        'token' => $user->ex_token
//      ];



    } else {
      $result = [
        'status' => false,
        'code' => '401',
        'message' => 'User not exists or wrong password',
        'data' => $data['debug']
      ];
      return Response()->json($result,401);
    }


  }


  public function login_backup(Request $request){


        $access_token = '';



          $input = $request->json('params');
          $input['source'] = 'school_portal';


        if (isset($_SERVER['QUERY_STRING']))
          $uri = $request->path() . '?' . $_SERVER['QUERY_STRING'] . '&encode=1&access-token=' . $access_token;
        else
          $uri = $request->path() . '?encode=1&access-token=' . $access_token;



        $login_user = User::where('email',$input['username'])->first();

        if($login_user && $login_user->can('login')){

          $client = new Client();

          $result = $client->request($request->method(), env('USERMODEL_URL') . $uri,
            [
              'auth' => ['ehl_api', '27150900'],
              'headers' => [
                'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
              ],
              'form_params' => [
                'params' => $input
              ]
            ]
          );

          $data = \GuzzleHttp\json_decode($result->getBody()->getContents(), true);


          if(!$data['success']){
            $result = [
              'status' => false,
              'code' => '401',
              'message' => 'User not exists or wrong password',
              'data' => $data['debug']
            ];
            return Response()->json($result,401);
          }

            $user = User::where('email',$data['data'][0]['username'])->first();

            if(!$user){
              $result = [
                'status' => false,
                'code' => '',
                'message' => 'user not found in school database'
              ];
              return $result;
            }
            Auth::loginUsingId($user->id, true);

            $user = Auth::user()->with('roles')->first();

          return $user;

        }else{
          $result = [
            'status' => false,
            'code' => '',
            'message' => 'You dont have permission to login'
          ];

          return Response()->json($result,401);
        }


    }
}
