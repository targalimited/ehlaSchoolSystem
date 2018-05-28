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



            if ($request->headers->has('access-token'))
                $access_token = $request->headers->get('access-token');
            if ($request->method() != "GET") {
                $input = $request->json('params');
                if (!$input)
                    dd('Bad format. Example: {"params":{"username":"hong@gmail.com","password":123456}}');
            } else
                $input = '';


        if (isset($_SERVER['QUERY_STRING']))
            $uri = $request->path() . '?' . $_SERVER['QUERY_STRING'] . '&encode=1&access-token=' . $access_token;
        else
            $uri = $request->path() . '?encode=1&access-token=' . $access_token;


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
            'code' => '500',
            'message' => 'Something went wrong',
            'data' => $data['debug']
          ];
          return Response()->json($result,500);
        }
        return $data;


    }
}
