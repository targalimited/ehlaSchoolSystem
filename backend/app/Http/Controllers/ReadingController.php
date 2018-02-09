<?php

namespace App\Http\Controllers;

use App\ReadingExercise;
use App\StudentSubject;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ReadingController extends Controller
{

    public function postReadingExercise(Request $request)
    {
        ReadingExercise::where('teacher_class_subject_id', $request->teacher_class_subject_id)->delete();
        ReadingExercise::insert($request->exercises);
        return return_success();
    }

    public function getReadingExercise(Request $request)
    {
        $readingExercise = ReadingExercise::where('teacher_class_subject_id', $request->teacher_class_subject_id)->get();
        $result['data'] = $readingExercise;
        return json($result);
    }

    public function deleteReadingExercise(Request $request)
    {
        ReadingExercise::where('exercise_id', $request->exercise_id)->where('teacher_class_subject_id', $request->teacher_class_subject_id)->delete();
        return return_success();
    }

    public function startReadingAssignment(Request $request)
    {
        $student_ids = StudentSubject::where('teacher_class_subject_id', $request->teacher_class_subject_id)->pluck('student_id')->toArray();

        $exercies = ReadingExercise::where('teacher_class_subject_id', $request->teacher_class_subject_id)->where('start_date', '<=', Carbon::now())->where('end_date', '>=', Carbon::now())->get();

        foreach ($exercies as $v) {

            $input['assignment_id'] = 1;
            $input["teacher_class_subject_id"] = $v->teacher_class_subject_id;
            $input["user_ids"] = $student_ids;
            $input["start_date"] = $v->start_date;
            $input["end_date"] = $v->end_date;
            $input["item_id"] = $v->item_id;
            $input["exercise_id"] = [$v->exercise_id];


            $client = New Client();

            if (env('app.env') == 'production')
                $token = $request->headers->get('access-token');
            else
                $token = '20896.fa9c61f9e8cc64f7c94022874a958e0e2e978296';

            $result = $client->request('POST', env('USERMODEL_URL').'/v1/assignmentApi/start_reading_assignment?access-token=' . $token . '&encode=1',
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


        }

        return return_success();


    }
}
