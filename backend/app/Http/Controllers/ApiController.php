<?php

namespace App\Http\Controllers;

use App\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ApiController extends Controller
{

    public function api(Request $request)
    {

        $access_token = '';


        if ($request->function != 'login') {
            if ($request->headers->has('access-token'))
                $access_token = $request->headers->get('access-token');
            if ($request->method() != "GET") {
                $input = $request->json('params');
                if (!$input)
                    dd('Bad format. Example: {"params":{"username":"hong@gmail.com","password":123456}}');
            } else
                $input = '';
        }else{
            $input = $request->json('params');
            $input['source'] = 'school_portal';
        }

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

        if ($request->function == 'login') {

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

        }
        return $data;

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
