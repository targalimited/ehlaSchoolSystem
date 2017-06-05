<?php

namespace App\Http\Controllers;

use App\Assignment;
use App\CalendarEvent;
use App\Notification;
use App\TeacherClassSubject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CalendarEventController extends Controller
{
    //
    public function postEvent(Request $request)
    {

//dd($request->teacher_id);

        $input = $request->all();
        $input['teacher_id'] = $request->teacher_id;

        $validator = Validator::make($input, [
            'teacher_id' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result, 500);
        }

        try {
            DB::transaction(function () use ($request) {
                $calendar_event = New CalendarEvent();
                $calendar_event->user_id = $request->teacher_id;
                $calendar_event->name = $request->name;
                $calendar_event->description = $request->description;
                $calendar_event->type = 'private';
                $calendar_event->start_time = $request->start_time;
                $calendar_event->end_time = $request->end_time;
                $calendar_event->save();

                if ($request->notification) {
                    $notification = New Notification();
                    $notification->period_type = $request->period_type;
                    $notification->period = $request->period;
                    $notification->type = $request->notificationType;
                    $calendar_event->notifications()->save($notification);
                }

                $calendar_event->classes()->sync($request->class_ids);

            }, 2);
        } catch (\Exception $e) {
            $result = [
                'status' => false,
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ];

            return Response()->json($result, 500);
        }

        $result = [
            'status' => true,
            'code' => '',
            'message' => 'success'
        ];

        return Response()->json($result);
    }

    public function putEvent(Request $request)
    {

        $calendar_event = CalendarEvent::where('id', $request->id)->first();

        $calendar_event->user_id = $request->teacher_id;
        $calendar_event->name = $request->name;
        $calendar_event->description = $request->description;
        $calendar_event->type = $request->type;
        $calendar_event->start_time = $request->start_time;
        $calendar_event->end_time = $request->end_time;
        $calendar_event->save();

        if ($request->type != 'private') {
//            $table = $request->type;
            $assignment = $calendar_event->assignment;
            $assignment->name = $request->name;
            $assignment->description = $request->description;
            $assignment->start_date = $request->start_time;
            $assignment->end_date = $request->end_time;
            $assignment->save();
        }else{
            $calendar_event->classes()->sync($request->class_ids);
        }

        if ($request->notification) {
            $notification['period_type'] = $request->period_type;
            $notification['period'] = $request->period;
            $notification['type'] = $request->notificationType;
            Notification::updateOrCreate(['calendar_event_id' => $calendar_event->id], $notification);
        } else {
            Notification::where('calendar_event_id', $calendar_event->id)->delete();
        }

        $result = [
            'status' => true,
            'code' => '',
            'message' => 'success'
        ];

        return Response()->json($result);

    }

    public function delEvent(Request $request)
    {
        DB::transaction(function () use ($request){
            $event = CalendarEvent::find($request->id)->where('type','private');
            $event->notifications()->delete();
            $event->delete();
        });

    }

    public function getEvent(Request $request)
    {
        $class_ids = TeacherClassSubject::select(DB::RAW('distinct class_id'))->where('teacher_id',$request->teacher_id)->get()->pluck('class_id');
        $teacher_class_subject_ids = TeacherClassSubject::whereIn('class_id',$class_ids)->where('teacher_id','!=',$request->teacher_id)->get()->pluck('id');
            //other teachers same classes events
        $task_ids = Assignment::whereIn('teacher_class_subject_id',$teacher_class_subject_ids)->get()->pluck('id');
        $other_teachers_events =CalendarEvent::with('notifications')->with('classes')->with('assignment.teacherClassSubject')->whereIn('task_id',$task_ids)->get();
            //teacher all classes events
        $calendar_event = CalendarEvent::with('classes')->with('notifications')->with('assignment.teacherClassSubject')->where('user_id', $request->teacher_id)->get();
        $result['data']['self'] = $calendar_event;
        $result['data']['others']=$other_teachers_events;

        return json($result);

    }
}
