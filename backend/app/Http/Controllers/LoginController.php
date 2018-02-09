<?php

namespace App\Http\Controllers;

use App\Session;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class LoginController extends Controller
{


    public function logout(Request $request)
    {
        $access_token = $request->headers->get('access-token');

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
}
