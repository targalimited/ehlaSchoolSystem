<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::get('/user', function (Request $request) {

 // dd(DB::getDatabaseName());
//        $this->visit('/register')
//            ->type('Taylor', 'name')
//            ->check('terms')
//            ->press('Register')
//            ->seePageIs('/dashboard');
//
//    //return File::get(public_path() . '/dist/index.html');
//   // Auth::loginUsingId(53,true);
  dd(\App\User::all());
  return Auth::user();
});

Route::get('/addStudent', function (Request $request) {
  for ($i = 101; $i <= 120; $i++) {
    $student = New \App\StudentSubject();
    $student->teacher_class_subject_id = 8;
    $student->student_id = $i;
    $student->save();
  }
})->middleware('detectDB');
*/
//header('Access-Control-Allow-Credentials: true');


Route::group(['prefix' => 'v1'], function () {

  Route::group(['middleware' => ['chooseDB']], function () {

    Route::get('/authuser', function (Request $request) {
      return Auth::user();
    });

    Route::get('/user', function (Request $request) {
      return Auth::getuser();
    });

    //result controller
    /*Route::post('get_school_result_report','ResultController@get_school_result_report');
    Route::post('get_school_weakness_report','ResultController@get_school_weakness_report');
    Route::post('get_school_result_summary_report','ResultController@get_school_result_summary_report');
*/
	//basic controller
	Route::post('get_classes_by_teacher_id','ClassController@get_classes_by_teacher_id');
	Route::post('get_students_by_class_id','ClassController@get_students_by_class_id');
	
    //result controller
	//['class_id' / 'student_id', 'subject_id', 'batch_id', 'item_id']
    Route::post('get_school_batch_item_result_report','ResultController@get_school_batch_item_result_report');
    Route::post('get_status_report','ResultController@get_school_status_report');
	//['class_id' / 'student_id', 'subject_id','weakness_code']
	Route::post('get_school_weakness_report','ResultController@get_school_weakness_report');
	Route::post('get_class_weakness','ResultController@get_class_weakness');
    
    //item controller
    Route::get('get_school_item_summary','ItemController@get_school_item_summary');
    Route::post('get_preview_by_id','ItemController@get_preview_by_id');	
	Route::post('get_by_category','ItemController@get_by_category');
    Route::post('get_selected_item','ItemController@get_selected_item');
	
    Route::post('confirm_item','ItemController@confirm_item');
	
	
    Route::post('choose_items','ItemController@choose_items');
    Route::post('choose_item_for_level','ItemController@choose_item_for_level');	
    
	Route::post('get_selected_item_by_category','ItemController@get_selected_item_by_category');
    Route::post('choose_item','ItemController@choose_item');
    Route::post('choose_items_for_level','ItemController@choose_items_for_level');
    Route::post('get_pre_chosen_items_by_category','ItemController@get_pre_chosen_items_by_category');
	
	//Assignment controller
	Route::post('get_cls_cat','AssignmentController@get_cls_cat');
    Route::post('get_item_list_by_cls_sub_cat','AssignmentController@get_item_list_by_cls_sub_cat');
    Route::post('get_item_by_id','AssignmentController@get_item_by_id');
	
	Route::post('get_school_assignment','AssignmentController@get_school_assignment');
    Route::post('set_school_assignment','AssignmentController@set_school_assignment');
    Route::post('lock_school_assignment','AssignmentController@lock_school_assignment');
	
    Route::post('edit_school_assignment','AssignmentController@edit_school_assignment');
    Route::post('unpublish_school_assignment','AssignmentController@unpublish_school_assignment');
    Route::post('publish_school_assignment','AssignmentController@publish_school_assignment');
    Route::post('delete_school_assignment','AssignmentController@delete_school_assignment');
	
    /*Route::post('get_assignment_by_item_id','ItemController@get_assignment_by_item_id');
    Route::post('set_assignments','ItemController@set_assignments');
    Route::post('publish_assignments','ItemController@publish_assignments');
    Route::post('batch_set_publish_assignments','ItemController@batch_set_publish_assignments');*/
    
    //Category controller
    Route::get('get_school_category/subject_id/{subject_id?}','CategoryController@get_school_category');

	//User Controller
	Route::get('get_all_classes', 'ClassController@get_all_classes');
	
	
	
    //reading controller
    Route::post('create_reading_exercise', 'ReadingController@postReadingExercise');
    Route::post('start_reading_assignment', 'ReadingController@startReadingAssignment');
    Route::get('get_reading_exercise', 'ReadingController@getReadingExercise');
    Route::delete('delete_reading_exercise', 'ReadingController@deleteReadingExercise');

    //User controller
    Route::post('teacher_batch', 'UserController@postTeacher');
    Route::post('student_batch', 'UserController@postStudent');
    Route::get('exportExcel/{type}', 'UserController@getExcel');
//    Route::get('exportStudentExcel', 'UserController@getStudentExcel');
    Route::post('teacher_single', 'UserController@postSingleTeacher');
    Route::put('teacher_single', 'UserController@putSingleTeacher');
    Route::post('student_single', 'UserController@postSingleStudent');
    Route::put('student_single', 'UserController@putSingleStudent');
    Route::get('user_list', 'UserController@getUser');
    Route::get('user/{id}', 'UserController@getUserDetails');
    Route::get('students', 'UserController@getStudents');
    Route::get('teachers', 'UserController@getTeachers');
    Route::delete('users/{user_id}', 'UserController@deleteUser');
    Route::get('option_class', 'UserController@option_class');


    //Permission Control
    Route::post('attach_permission', 'RoleController@attachPermission');
    Route::post('attach_role', 'RoleController@attachRole');

    Route::post('create_permission', 'RoleController@postPermission');
    Route::put('update_permission', 'RoleController@putPermission');
    Route::delete('delete_permission', 'RoleController@deletePermission');
    Route::get('read_permission', 'RoleController@readPermission');

    Route::post('create_role', 'RoleController@postRole');
    Route::put('update_role', 'RoleController@putRole');
    Route::delete('delete_role', 'RoleController@deleteRole');
    Route::get('read_role', 'RoleController@readRole');

    Route::post('userApi/changepw', 'UserController@changepw');
    Route::post('userApi/logout', 'LoginController@logout');
    //Subject Controller
    Route::get('classes/teachers/{teacher_id?}', 'SubjectController@getAllClasses')->name('allClasses');
    Route::get('classes/teachers/{teacher_id?}/subjects/{subject_id?}', 'SubjectController@getClasses')->name('classes');
    Route::get('subjects/teachers/{teacher_id?}', 'SubjectController@getSubjects')->name('subjects');
    //Route::get('teachers/{teacher_id?}/classes/{class_id?}/result/history','ResultController@getHistoryWeaknessResult');
    // get all assignments taught by a teacher
    Route::get('teachers/{teacher_id?}/assignments', 'AssignmentController@getAllAssignments');

    //settings
    Route::put('academicYear/{id}/subjects/{subject_id}/curriculumSettings', 'CurriculumSettingController@putSettings');
    Route::get('academicYear/{id}/subjects/{subject_id}/curriculumSettings', 'CurriculumSettingController@getSettings');
    Route::post('academicSettings', 'AcademicSettingController@postSettings');
    Route::put('academicSettings/{id}', 'AcademicSettingController@putSettings');
    Route::get('academicSettings', 'AcademicSettingController@getSettings');
    Route::delete('academicSettings/{id}', 'AcademicSettingController@delSettings');

    //events
    Route::put('events/{id}', 'CalendarEventController@putEvent');
    Route::delete('events/{id}', 'CalendarEventController@delEvent');
    Route::post('events', 'CalendarEventController@postEvent');
    Route::get('events', 'CalendarEventController@getEvent');

    Route::get('levels', 'LevelController@getLevel');
    Route::post('levels', 'LevelController@postLevel');

    //subjects
    Route::put('subjects/{id}', 'SubjectController@putSubjects');
    Route::delete('subjects/{id}', 'SubjectController@delSubjects');
    Route::get('subjects', 'SubjectController@getAllSubjects');
    Route::post('subjects', 'SubjectController@postSubjects');

    //classes
    Route::put('classes', 'ClassController@putClasses');
    Route::delete('classes/{id}', 'ClassController@delClasses');
      Route::get('classes', 'ClassController@getClasses');
      Route::post('classes', 'ClassController@postClasses');
      Route::post('single_class', 'ClassController@getSingleClass');

    Route::group(['prefix' => 'teachers/{teacher_id?}/subjects/{subject_id?}/classes/{class_id?}'], function () {
      //update students, bind to class and subject
      Route::post('updateStudentSubject', 'TeacherController@updateStudentSubject');
      //get latest assignment record
      Route::get('latestAssignments/{assignment_type?}', 'AssignmentController@getLatestAssignment');
      // is any completed assignment
      Route::get('isAnyCompletedAssignment/{assignment_type?}', 'AssignmentController@getCompletedAssignment');
      Route::get('assignments/{assignment_type?}', 'AssignmentController@showAssignment');
      Route::put('assignments/{assignment_type?}/{id?}', 'AssignmentController@postAssignment');
      Route::post('assignments/{assignment_type?}', 'AssignmentController@postAssignment');
      Route::get('assignments/{assignment_type?}/{id?}', 'AssignmentController@getAssignment');
      // Route::put('assignments/{assignment_type?}/{id?}', 'AssignmentController@putAssignment');
      Route::delete('assignments/{assignment_type?}/{id?}', 'AssignmentController@deleteAssignment');


      //update latest weakness
      Route::get('result/updateLatestWeakness', 'ResultController@updateLatestWeakness');
      // consolidated report (weakness based)F
      Route::get('result/consolidatedReport', 'ResultController@getConsolidatedReport');
      // get error rate of a particular weakness
      Route::get('result/weakness/{weakness_id?}', 'ResultController@getWeaknessWithAllStudent');
      //get latest assignment all weakness result
      Route::get('result/{assignment_type?}/latestAssignment', 'ResultController@getLatestAssignmentResult');
      //get all weakness latest assignment result
      Route::get('result/{assignment_type?}/latestWeakness', 'ResultController@getLatestWeaknessResult');
      //get every single assignment listing with weakness result
      Route::get('result/{assignment_type?}/AssignmentResultListing', 'ResultController@getAssignmentResultListing');
      //get student latest assignment every weakness result
      Route::get('result/{assignment_type?}/StudentLatestAssignmentResult', 'ResultController@getStudentLatestAssignmentResult');
      //get one student all assignment result
      Route::get('result/{assignment_type?}/students/{student}/OneStudentAllAssignmentResult', 'ResultController@getOneStudentAllAssignmentResult');
      //get single assignment result
      Route::get('result/{assignment_type?}/{assignment_id?}', 'ResultController@getAssignmentWeaknessResult');

      //teaching progress controller
      Route::get('teacherClassSubject', 'TeachingProgressController@getTeachingProgress');
      Route::put('teacherClassSubject', 'TeachingProgressController@putTeachingProgress');

      Route::put('videoProgress', 'VideoProgressController@putVideoProgress');
      Route::get('videoProgress', 'VideoProgressController@getVideoProgress');


    });
	});

  Route::group(['middleware' => ['recUsermodel']], function () {
	Route::post('testUsermodel','ItemController@test_message');    
  });
  // Route::post('userApi/login', 'LoginController@login')->middleware('guest');
  Route::post('userApi/login', 'LoginController@login');

  Route::any('{api?}/{function?}/{params?}', 'ApiController@api')->where('params', '(.*)')->middleware('chooseDB');

});



