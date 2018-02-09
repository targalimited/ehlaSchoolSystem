<?php

namespace App\Http\Controllers;

use App\Academic;
use App\CurriculumSetting;
use App\UserInfo;
use App\VideoSetting;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class CurriculumSettingController extends Controller
{


    public function putSettings(Request $request)
    {

//        $request->year_start = '2017';
//        $request->year_end = '2018';
//        $request->semester = 1;
//
//        // $user = UserInfo::where('user_id', $request->teacher_id)->first();
//
//        $academic = Academic::where('year_start', $request->year_start)->where('year_end', $request->year_end)->where('semester', $request->semester)->orderby('created_at', 'desc')->first();


//        foreach ($academic as $item) {
//            $a_array[$item->semester] = $item->id;
//        }


        foreach ($request->weaknesses as $k => $weakness) {

            $weaknesses[$k]['level'] = json_encode($weakness['level']);
            $weaknesses[$k]['weakness_id'] = $weakness['weakness_id'];
            $weaknesses[$k]['subject_id'] = $request->subject_id;

            if(!empty($weakness['video'])){
                foreach ($weakness['video'] as $k1 => $video) {
                    $videos[$k1]['level'] = json_encode($video['level']);
                    $videos[$k1]['weakness_id'] = $weakness['weakness_id'];
                    $videos[$k1]['video_id'] = $video['video_id'];
                }
                VideoSetting::where('weakness_id',$weakness['weakness_id'])->delete();
                VideoSetting::insert($videos);
            }
        }

        CurriculumSetting::where('subject_id',$request->subject_id)->delete();
        CurriculumSetting::insert($weaknesses);

//        foreach ($request->weaknesses as $k => $weakness) {
//            $curriculum = New CurriculumSetting();
//            $curriculum->level = $weakness['level'];
//            $curriculum->weakness_id = $weakness['weakness_id'];
//            $curriculum->academic_id = $a_array[$weakness['semester']];
//            $curriculum->save();
//        }

        return return_success();

    }

    public function getSettings(Request $request)
    {
        //  $user = UserInfo::where('user_id', $request->teacher_id)->first();

//        $request->year_start = '2017';
//        $request->year_end = '2018';
//        $request->semester = 1;
//        $request->subject_id = 1;
//
//        $academic = Academic::with('curriculums')->where('year_start', $request->year_start)->where('year_end', $request->year_end)->where('semester', $request->semester)->first();
//


        $curriculum = CurriculumSetting::with('videos')->where('subject_id',$request->subject_id)->get();



        $result = $this->getAllWeaknessList($request);

        $weakness = Array();
        foreach ($curriculum as $k => $c) {
            $weakness[$c->weakness_id]['level'] = $c['level'];
            $weakness[$c->weakness_id]['video'] = $c['videos']->toArray();
        }


//dd($result['data']);

        function appendToChild(&$data, $weakness)
        {
            foreach ($data as &$d) {
                if (isset($weakness[$d['id']])) {
                    $d['custom_level'] = $weakness[$d['id']]['level'];
                    $d['custom_video'] = $weakness[$d['id']]['video'];
                }
                if (!empty($d['child'])) {
                    appendToChild($d['child'], $weakness);
                }
            }
        }

        appendToChild($result['data'], $weakness);


//        foreach ($result['data'] as &$v) {
//
//            if (!empty($v['child'])) {
//                foreach ($v['child'] as &$v1) {
//                    if (!empty($v['child'])) {
//
//                        foreach ($v1['child'] as &$v2) {
//
//                            if (!empty($v2['child'])) {
//                                foreach ($v2['child'] as &$v3) {
//                                    if (!empty($v3['child'])) {
//                                        foreach ($v3['child'] as &$v4) {
//                                            $v4['custom_level'] = $weakness[$v4['id']];
//                                        }
//                                    } else {
//
//                                        if (isset($weakness[$v3['id']])) {
//                                            $v3['custom_level'] = $weakness[$v3['id']];
//                                        }
//                                    }
//                                }
//                            } else {
//
//                                if (isset($weakness[$v2['id']])) {
//                                    $v2['custom_level'] = $weakness[$v2['id']];
//                                }
//                            }
//
//                        }
//                    } else {
//                        if (isset($weakness[$v1['id']])) {
//                            $v1['custom_level'] = $weakness[$v1['id']];
//                        }
//                    }
//                }
//            } else {
//                if (isset($weakness[$v['id']])) $v['custom_level'] = $weakness[$v['id']];
//            }
//        }


        return json($result);
    }

    public static function getAllWeaknessList(Request $request,$level='all')
    {

        $input = Array();
        if ($level !== 'all') {
            $input['level'] = $level;
        }
        $input['subject_id'] = $request->subject_id;


        //dd($input['level']);
        try {
            $client = New Client();

            if (env('app.env') == 'production')
                $token = $request->headers->get('access-token');
            else
                $token = '2337.9beb2db40bd24394318ad5f240e5ede4559a915b';


            $result = $client->request('POST', env('USERMODEL_URL').'v1/weaknessApi/list_all?access-token=' . $token . '&encode=1',
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

            return \GuzzleHttp\json_decode($result->getBody()->getContents(), true);
        } catch (\Exception $e) {
            // There was another exception.
            return response()->json(\GuzzleHttp\json_decode($e->getResponse()->getBody()->getContents(), true), 200);

        }
    }
}
