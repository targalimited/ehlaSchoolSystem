<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ReadingController extends Controller
{
    //
    public function startReadingAssignment(Request $request)
    {


        $input['assignment_id'] = 1;
        $input["teacher_class_subject_id"] = "1";
        $input["user_ids"] = ["37", "71"];
        $input["start_date"] = "2017-04-01 12:00:00";
        $input["end_date"] = "2018-04-10 23:59:59";
        $input["item_id"] = "487";
        $input["exercise_id"] = ["8", "10"];

        $client = New Client();

        if (env('app.env') == 'production')
            $token = $request->headers->get('access-token');
        else
            $token = '20896.fa9c61f9e8cc64f7c94022874a958e0e2e978296';

        $result = $client->request('POST', 'http://ehla-usermodel-dev.aubbragqid.ap-southeast-1.elasticbeanstalk.com/v1/assignmentApi/start_reading_assignment?access-token=' . $token . '&encode=1',
            [
                'auth' => ['ehl_api', '27150900'],
                'headers' => [
                    'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
                ],
                'form_params' => [
                    'params' => $input
//           "params": {
//                "type":"exercise",
//                "wk":[{"id":"457","num":"1","difficulty":"1", "qc_type":"1"},{"id":"475","num":"2","difficulty":"2", "qc_type":"107"}]
//              }
                ]

            ]
        );

        $result = \GuzzleHttp\json_decode($result->getBody()->getContents(), true);

        dd($result);


    }
}
