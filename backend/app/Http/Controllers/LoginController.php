<?php

namespace App\Http\Controllers;

use App\Session;
use App\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Extensions\Dbotf;
use App\Extensions\EhlaGuzzleClient;
use Illuminate\Support\Str;

class LoginController extends Controller
{

  public function login(Request $request) {

    // set params to call usermodel
    $input = $request->json('params');
    $input['source'] = 'school_portal';

    // call usermodel
    $client = new EhlaGuzzleClient();
    $data = $client->post(config('variables.loginUrl'), $input);

    if($data['success']){

      $userData = $data['data'][0];
      $userSession = $data['data'][0]['user_session'];
      unset($userData['user_session']);

      if($userData['school']['id']){
        // switch db
        $db_name = "school_".$userData['school']['id'];
        new Dbotf(['database' => $db_name]);
      } else {
        // user do not have school id, reject login.
        $result = [
          'success' => false,
          'data' => false,
          'message' => 'Not school user',
        ];
        return Response()->json($result,406);
      }

      if($userData['userGroup']['id'] == 1 || $userData['userGroup']['id'] == 2 || $userData['userGroup']['id'] == 3){

        $user = User::where('id', $userData['user_id'])->with('roles')->first();

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
                  'school_id' => $userData['school']['id'],
                  'updated_at' => date('Y-m-d H:i:s')
                ]);
            }, 5);
          } catch (\Exception $e) {
            dd($e);
          }
          $user = User::where('id', $userData['user_id'])->with('roles')->first();
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
                'school_id' => $userData['school']['id'],
                'updated_at' => date('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s')
              ]);

            }, 5);
          } catch (\Exception $e) {
            return $e;
          }

          $user = User::where('id', $userData['user_id'])->with('roles')->first();
          Auth::login($user, true);

        }

        $user = $user->toArray();

        // print_r($user);exit();
        // attach roles into user object
        $userInfo = $user['user'];
        $userInfo['roles'] = $user['roles'];

        $data = array(
          "user_id" => $user['id'],
          "user" => $userInfo,
          "ex_token" => $user['ex_token'],
          "school_id" => $user['school_id'],
          "roles" => $user['roles'],
        );

        $result = [
          'success' => true,
          'data' => $data,
          'message' => '',
        ];
        
        return Response()->json($result,200);

      }else{

        $result = [
          'success' => false,
          'data' => [],
          'message' => 'Login is not allowed',
        ];
        return Response()->json($result,401);

      }

    } else {
      $result = [
        'status' => false,
        'code' => '401',
        'message' => 'Unauthorized',
        'data' => $data['debug']
      ];
      return Response()->json($result,401);
    }
  }


  public function logout(Request $request) {

      $userSession = empty(Auth::user()->session) ? null : json_decode(Auth::user()->session);
      if(!$userSession) {
        return response()->json('', 200);
      }

      $access_token = $userSession->access_token;

      $client = new EhlaGuzzleClient();
      $data = $client->post(config('variables.logoutUrl').$access_token, null);
      Auth::logout();
      return $data;
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
