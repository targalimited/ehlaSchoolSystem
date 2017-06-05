<?php

namespace App\Http\Controllers;

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

//        dd($request->getQueryString());

        if ($_SERVER['QUERY_STRING'])
            $uri = $request->path() . '?' . $_SERVER['QUERY_STRING'] . '&encode=1&access-token=' . $access_token;
        else
            $uri = $request->path() . '?encode=1&access-token=' . $access_token;

        $client = new Client();


        try {
            $result = $client->request($request->method(), 'http://ehla-usermodel-dev.aubbragqid.ap-southeast-1.elasticbeanstalk.com/' . $uri,
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



           if ($request->function == 'login') {

                $user_session = $data['data'][0]['user_session'];
//                $user_info = $data['data'][0];

//                $session = New Session();
//                $session->user_id = $user_session['user_id'];
//                $session->access_token = $user_session['access_token'];
//                $session->expiry_date = $user_session['expiry_date'];
//                $session->ip = $user_session['ip'];
//                $session->save();

//                $user = New User();
//                $user->id = $user_session['user_id'];
//                $user->email = $user_info['username'];
//                $user->save();

                Auth::loginUsingId($user_session['user_id'], true);
                //$request->session()->put('access_token',$data['data'][0]['user_session']['access_token']);

          }

            return $data;

        } catch (\Exception $e) {
            // There was another exception.
            return response()->json(\GuzzleHttp\json_decode($e->getResponse()->getBody()->getContents(), true), $e->getResponse()->getStatusCode());

        }

    }
}
