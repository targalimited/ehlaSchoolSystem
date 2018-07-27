<?php

namespace App\Http\Controllers;

use App\SchoolClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\UsermodelApiServices;
use App\ParamBasicServices;
use App\PermissionControlServices;


class ClassController extends Controller
{
	public function get_classes_by_teacher_id(Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		$teacherId = $params['teacher_id'];
		$this->result['data'] = $PBS->getClasses($teacherId);
		
        return json($this->result,200);	
	}
	
	
	public function get_students_by_class_id(Request $request) {
		//params
		$params = $request->params;
		
		//params basic
		$PBS = new ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		
		//permission
		$PCS = new PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);
		
		$studentIds = $PBS->getStudents();
		
		//usermodel
		$UAS = New UsermodelApiServices($request);
		$feedback = $UAS->schoolApiGetSchoolUserBasic($studentIds);
		
		
		$this->result['data'] = $feedback['data'];
        return json($this->result,200);	
	}
	
	
	
    public function getClasses(){
        $classes = SchoolClass::with('students')->with('teachers')->get();
        $result['data'] = $classes;
        return json($result);
    }

    public function getSingleClass(Request $request){
        $class = SchoolClass::where('id',$request->id)->first();
        return json($class);
    }

	public function get_all_classes (Request $request) {
		//params basic
		$PBS = New ParamBasicServices($request);
		$user = $PBS->getUserBasic();
		//permission
		$PCS = New PermissionControlServices($request);
		$permission = $PCS->checkUserPermission($user);

		$classes = $PCS->getTeacherClasses($user['user_id'], null);
		$this->result['data'] = $classes;
        
        return json($this->result,200);
	}

	//Done
    public function postClasses(Request $request){
        /**
        $input = $request->all();

        $validator = Validator::make($input, [
            'classes.*.c_name' => 'required',
            'classes.*.level_id' => 'required|exists:levels,id',
        ]);

        if ($validator->fails()) {
            $result = [
                'status' => false,
                'code' => '',
                'message' => $validator->errors()
            ];

            return Response()->json($result, 500);
        }

        SchoolClass::truncate();
        SchoolClass::insert($request->classes);
        return return_success();
        **/
        $input = $request->all();

        $validator = Validator::make($input, [
            'className' => 'required',
            'classLevel' => 'required',
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
                $school_class = New SchoolClass();
                $school_class->c_name = $request->className;
                $school_class->level = $request->classLevel;
                $school_class->save();
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

        return json($result);
    }

    public function putClasses(Request $request){

//	  print_r($request->all());
      try {
        DB::transaction(function () use ($request) {
          $school_class = SchoolClass::where('id', $request->id)->first();
          if($request->name)
          $school_class->c_name = $request->name;
          if($request->level)
          $school_class->level = $request->level;
          if($request->lock)
          $school_class->lock = $request->lock;
          $school_class->save();
        });
      } catch (\Exception $e) {
        $result = [
          'status' => false,
          'code' => '',
          'message' => $e->getMessage()
        ];

        return json($result,500);

      } catch (\Throwable $e) {
      }

      return success();
    }

    public function delClasses(Request $request)
    {

            SchoolClass::where('id', $request->id)->delete();

        return success();
    }

}