<?php

namespace App\Http\Controllers;

use App\Assignment;
use App\AssignmentItem;
use App\AssignmentItemQuestion;
use App\UsermodelApiServices;
use App\PermissionControlServices;
use App\ParamBasicServices;
use App\CalendarEvent;
use App\CurriculumSetting;
use App\Level;
use App\Notification;
use App\SchoolClass;
use App\StudentSubject;
use App\Traits\TeacherClassSubjectTrait;
use App\TeacherClassSubject;
use App\WeaknessSet;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AssignmentController extends Controller
{

    protected $wk_set;

	public function get_cls_cat(Request $request) {
		//params
		$params = $request->params;		
		$subjectId = $params['subject_id'];
		
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//get class/subject/level
		$classLevel = $PCS->getTeacherClasses($user['user_id'], $subjectId);
		
		$levels = [];
		if (isset($classLevel)) {
			foreach ($classLevel as $value) {
				if (!in_array($value['level'], $levels)) {
					array_push($levels, $value['level']);
				}
			}
		
			if (!empty($levels)) {
				//usermodel
				$UAS = new UsermodelApiServices($request);
				$levelMapCat = $UAS->schoolApiGetCatBySubjectLevel($subjectId, $levels);
		
				foreach ($classLevel as &$class) {
					if (isset($levelMapCat[$class['level']])) {
						$class['categories'] = $levelMapCat[$class['level']];
					} else {
						$class['categories'] = [];
					}
				}
				
				$this->result['data'] = $classLevel;
			} else {
				$this->result['data'] = [];
			}
		} else {
			$this->result['data'] = [];
		}
		
		
		
        return Response()->json($this->result,200);
	}
	
	public function get_item_list_by_cls_sub_cat(Request $request) {
		//params
		$params = $request->params;
		$classId    = $params['class_id'];
		$subjectId  = $params['subject_id'];
		$catGrouper = $params['cat_grouper'];
		
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//get class level
		$levelArray = $PCS->getTeacherClassLevel($user['user_id'], $classId, $subjectId);
		
		if (isset($levelArray)) {
			//usermodel
			$UAS = new UsermodelApiServices($request);
			$feedback = $UAS->schoolApiGetItemsByCatGrouper($levelArray, $catGrouper, $subjectId);
			
			$this->result['data'] = $feedback['data'];
			$this->result['metadata'] = $feedback['metadata'];
			return Response()->json($this->result,200);
		}
        $this->result['data'] = [];
        return Response()->json($this->result,200);
	}
	
	public function get_item_by_id(Request $request) {
		//params
		$params = $request->params;
		$classId   = $params['class_id'];
		$subjectId = $params['subject_id'];
		$itemId    = $params['item_id'];
		
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		//get class level
		$level = $PCS->getTeacherClassLevel($user['user_id'], $classId, $subjectId);

		if (isset($level)) {			
			//usermodel
			$UAS = new UsermodelApiServices($request);
			$feedback = $UAS->schoolApiGetItemById($level, $itemId, $subjectId);
			
			$this->result['data'] = $feedback['data'];
			return Response()->json($this->result,200);
		}
        $this->result['data'] = [];
        return Response()->json($this->result,200);
	}
	
	public function get_school_assignment(Request $request) {
		//params
		$params = $request->params;
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//usermodel
		$UAS = new UsermodelApiServices($request);
		$feedback = $UAS->schoolApiGetSchoolAssignment($params);
		
        $this->result['data'] = $feedback['data'];
        return Response()->json($this->result,200);
	}
	
	public function set_school_assignment(Request $request) {
		//params
		$params = $request->params;
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//usermodel
		$UAS = new UsermodelApiServices($request);
		$feedback = $UAS->schoolApiSetSchoolAssignment($params);
		
        $this->result['data'] = $feedback['data'];
        return Response()->json($this->result,200);
	}
	
	public function lock_school_assignment(Request $request) {
		//params
		$params = $request->params;
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		//usermodel
		$UAS = new UsermodelApiServices($request);
		$feedback = $UAS->schoolApiLockSchoolAssignment($params);
		
        $this->result['data'] = $feedback['data'];
        return Response()->json($this->result,200);
	}
	
	
	
	
	
	
	
    private function teacherClassSubjectId(Request $request)
    {
        return TeacherClassSubjectTrait::teacherClassSubjectID($request);

    }

    public function getAllAssignments(Request $request)
    {
        $teacher_class_subject_id = TeacherClassSubject::select('id')->where('teacher_id', $request->teacher_id)->get();
        $assignments = Assignment::whereIn('teacher_class_subject_id', $teacher_class_subject_id)->get();

        return response()->json($assignments);
    }

    public function getLatestAssignment(Request $request)
    {

        $assignment = Assignment::with('assignment_items')
            ->where('teacher_class_subject_id', $this->teacherClassSubjectId($request))
            ->where('end_date', '>', Carbon::now())
            ->where('type', $request->assignment_type)
            ->orderBy('end_date', 'desc')
            ->first();

        //  echo 'getLatestAssignment';
        return response()->json($assignment);
    }

    public function getCompletedAssignment(Request $request)
    {

        $assignment = Assignment::where('teacher_class_subject_id', $this->teacherClassSubjectId($request))
            ->where('end_date', '<', Carbon::now())
            ->where('type', $request->assignment_type)
            ->first();


        return response()->json($assignment);
    }

    public function showAssignment(Request $request)
    {
        $assignments = Assignment::where('type', $request->assignment_type)
            ->whereHas('academic',function ($q){
                $q->where('current_sem',1);
            })
            ->where('teacher_class_subject_id', $this->teacherClassSubjectId($request))
            ->orderBy('end_date', 'desc')
            ->get();


        return response()->json($assignments);

    }

    public function getAssignment(Request $request)
    {

        $assignment = Assignment::with(['assignment_items' => function ($q) {
            $q->with('weakness_sets');
        }])
            ->where('id', $request->id)
            ->first();
        $event = CalendarEvent::with('notifications')->where('task_id', $assignment->id)->where('type','assignment')->first();

        if (isset($event->notifications{0})) {
            $assignment['period_type'] = $event->notifications{0}->period_type;
            $assignment['period'] = $event->notifications{0}->period;
            $assignment['notificationType'] = $event->notifications{0}->type;
        }

        if(isset($_SERVER['HTTP_POSTMAN_TOKEN']))
            dump($assignment);

        return response()->json($assignment);

    }

//    public function putAssignment(Request $request)
//    {
//
//        $assignment = Assignment::find($request->id);
//        $assignment->teacher_class_subject_id = $this->teacher_class_subject_id;
//        $assignment->name = $request->name;
//        $assignment->type = $request->type;
//        $assignment->description = $request->description;
//        $assignment->start_date = $request->start_date;
//        $assignment->end_date = $request->end_date;
//        $assignment->compulsory = $request->compulsory;
//        $assignment->question_type = $request->question_type;
//        $assignment->save();
//
//        $assignment->assignment_items()->delete();
//        $assignment->assignment_items()->createMany($request->weaknesses);
//
//    }

    public function deleteAssignment(Request $request)
    {
        $assignment = Assignment::find($request->id);
        $assignment->assignment_items()->delete();
        $assignment->weakness_sets()->delete();
        $assignment->delete();
    }

    public function postAssignment(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'weaknesses.0' => 'required',
            'weaknesses.*.question_qty' => 'required|min:1|max:7',
            'compulsory' => 'required|integer',
            'end_date' => 'required|date',
            'start_date' => 'required|date',
            'name' => 'required|string',
            'question_type'=>[
                'required',
                Rule::in(['random', 'preset'])
            ],
            'type' => [
                'required',
                Rule::in(['assessment', 'exercise','examination'])
            ]
        ]);


        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result,400);
        }

        $class_level = SchoolClass::where('id',$request->class_id)->pluck('level_id')->first();


        DB::transaction(function () use ($request) {
            $student = StudentSubject::where('teacher_class_subject_id', $this->teacherClassSubjectId($request))->get()->pluck('student_id')->toArray();

            if (count($student)==0) {
                $result = [
                    'status' => false,
                    'code' => '',
                    'message' => 'teacher student setting empty'
                ];

                return Response()->json($result,400);
            }

            //end of demo only

            $action = '';
            if ($request->id) {
                $action = 'update';
                $assignment = Assignment::find($request->id);
            } else {
                $assignment = new Assignment();
            }

            $assignment->teacher_class_subject_id = $this->teacherClassSubjectId($request);
            $assignment->academic_id = $request->academic_id;
            $assignment->name = $request->name;
            $assignment->type = $request->type;
            $assignment->description = $request->description;
            $assignment->start_date = $request->start_date;
            $assignment->end_date = $request->end_date;
            $assignment->compulsory = $request->compulsory;
            $assignment->question_type = $request->question_type;
            $assignment->save();

            if ($action == 'update')
                $calendar_event = CalendarEvent::where('type', 'assignment')->where('task_id', $request->id)->first();
            else
                $calendar_event = New CalendarEvent();

            $calendar_event->name = $request->name;
            $calendar_event->description = $request->description;
            $calendar_event->type = 'assignment';
            $calendar_event->task_id = $assignment->id;
            $calendar_event->user_id = $request->teacher_id;
            $calendar_event->start_time = $request->start_date;
            $calendar_event->end_time = $request->end_date;
            $calendar_event->save();

            $notification['period_type'] = $request->period_type;
            $notification['period'] = $request->period;
            $notification['type'] = $request->notificationType;
            Notification::updateOrCreate(['calendar_event_id' => $calendar_event->id], $notification);

            //$weaknesses = json_decode(json_encode($request->json()->get('weaknesses')), true );


            if ($request->question_type == 'preset') {

                $input['type'] = $request->type;
                $input['wk'] = [];

//        {"weakness_id":356,
//		"question_qty":2,
//			"weakness_set":[
//				{
//                    "marks":20,
//					"difficulty":2,
//					"question_type": 107
//				},
//				{
//                    "marks":30,
//					"difficulty":3,
//					"question_type": 101
//				}
//				]
//		}

                $i = 0;
                foreach ($request->weaknesses as $w) {
                    $curriculumsetting = CurriculumSetting::where('weakness_id',$w['weakness_id'])->pluck('level')->first();

                    $levels = Level::whereIn('id',$curriculumsetting)->get()->pluck('level')->toArray();

                    foreach ($w['weakness_set'] as $ws) {
                        $input['wk'][$i]['id'] = $w['weakness_id'];
                        $input['wk'][$i]['difficulty'] = $ws['difficulty'];
                        $input['wk'][$i]['qc_type'] = $ws['question_type'];
                        $input['wk'][$i]['level']=$levels;
                        $i++;
                    }

                }



                $client = New Client();

                if (env('app.env') == 'production')
                    $token = $request->headers->get('access-token');
                else
                    $token = '20896.ee30caefa8fc37a02d8993a93daa3a5cf9dfa31f';

                $result = $client->request('POST', env('USERMODEL_URL').'/v1/assignmentApi/get_preset_assignment?access-token=' . $token . '&encode=1',
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

                //dd($result);

//        0 => array:5 [
//        "id" => "457"
//      "num" => "1"
//      "difficulty" => "1"
//      "qc_type" => "1"
//      "q_ids" => array:1 [
//        0 => "1955"
//    ]
//    ]
//    1 => array:5 [
//        "id" => "475"
//      "num" => "1"
//      "difficulty" => "2"
//      "qc_type" => "107"
//      "q_ids" => array:1 [
//        0 => "2415"
//    ]
//    ]

            }

            if ($action == 'update') {
                $assignment->assignment_items()->delete();
            }

            $i = 0;
            foreach ($request->weaknesses as $k => $weakness) {


                $assignment_item = New AssignmentItem();
                $assignment_item->assignment_id = $assignment->id;
                $assignment_item->weakness_id = $weakness['weakness_id'];
                $assignment_item->question_qty = $weakness['question_qty'];
                $assignment_item->save();


                if ($request->question_type == 'preset') {
                    //one weakness has many questions
                    foreach ($weakness['weakness_set'] as &$v) {
                        //match return result and assign the question id to the current weakness set
                        foreach ($result['data'] as $k => $d) {
                            if ($weakness['weakness_id'] == $d['id'] && $v['difficulty'] == $d['difficulty'] && $v['question_type'] == $d['qc_type']) {
                                $v['question_id'] = $d['q_ids'][0];
                                unset($result['data'][$k]);
                                break;
                            }
                        }
                    }
                }



                if ($action == 'update')
                    $assignment_item->weakness_sets()->delete();

                if (empty($weakness['weakness_set'])) {
                    $weakness['weakness_set'] = [];
                    for ($z = 0; $z < $weakness['question_qty']; $z++) {
                        $weakness['weakness_set'][$z] = [];
                        $weakness_set_query = New WeaknessSet();
                        $weakness_set_query->assignment_item_id = $assignment_item->id;
                        $weakness_set_query->save();
                    }
                } else {
                    $assignment_item->weakness_sets()->createMany($weakness['weakness_set']);
                }


// TODO for demo only
            if ($request->question_type == 'random') {
                $j = rand(100, 900);
                foreach ($weakness['weakness_set'] as &$v) {
                    $v['question_id'] = $j++;
                }
            }
                //end of demo

                //run all of those code for random type for demo , change preset to true
                if ($request->question_type == true) {
                    //foreach ($student as $vv){
                    foreach ($weakness['weakness_set'] as $v1) {
                        //$new[$i]['student_id']=$vv;
                        $new[$i]['assignment_id'] = $assignment->id;
                        $new[$i]['weakness_id'] = $weakness['weakness_id'];
                        $new[$i]['question_id'] = $v1['question_id'];
                        $i++;
                    }
                    // }


                    $x = 0;
                    foreach ($student as $vv3) {
                        foreach ($new as $v2) {
                            $result_set[$x] = $v2;
                            $result_set[$x]['student_id'] = $vv3;

                            $x++;
                        }
                    }

                }

                $this->wk_set[$k]['weakness_id']= $weakness['weakness_id'];
                $this->wk_set[$k]['question_qty']= $weakness['question_qty'];
                $this->wk_set[$k]['weakness_set'] = $weakness['weakness_set'];
            }


            if ($request->question_type == true) {
                if ($action == 'update')
                    AssignmentItemQuestion::where('assignment_id', $request->id)->delete();
                AssignmentItemQuestion::insert($result_set);
            }

            //end of run all of those code for random type for demo

        }, 2);

        //call start_assignment api


//    "level":"p6",

        //TODO start_assignment
        $assignment = [];
        $assignment['teacher_class_subject_id'] = $this->teacherClassSubjectId($request);
        $assignment['level']=$class_level;
        $assignment['name'] = $request->name;
        $assignment['type'] = $request->type;
        $assignment['description'] = $request->description;
        $assignment['start_date'] = $request->start_date;
        $assignment['end_date'] = $request->end_date;
        $assignment['compulsory'] = $request->compulsory;
        $assignment['mode'] = $request->question_type;
        $assignment['wk'] = $this->wk_set;
        //End of TODO

       // dd($assignment);
        return return_success();
    }
}
