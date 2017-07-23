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

Route::get('/user', function (Request $request) {

//        $this->visit('/register')
//            ->type('Taylor', 'name')
//            ->check('terms')
//            ->press('Register')
//            ->seePageIs('/dashboard');
//
//    //return File::get(public_path() . '/dist/index.html');
//   // Auth::loginUsingId(53,true);
    dump(Auth::user());
});

Route::get('/addStudent',function (Request $request){
    for($i=101 ; $i<=120; $i++){
        $student = New \App\StudentSubject();
        $student->teacher_class_subject_id = 8;
        $student->student_id = $i;
        $student->save();
    }
})->middleware('detectDB');

//header('Access-Control-Allow-Credentials: true');


Route::group(['prefix' => 'v1'], function () {
    Route::group(['middleware' => 'detectDB'], function () {

        Route::get('/user', function (Request $request) {
            dump(Auth::user());
        });

        //reading controller
        Route::post('start_reading_assignment','ReadingController@startReadingAssignment');

        //User controller
        Route::post('account_teacher','UserController@postTeacher');
        Route::post('account_student','UserController@postStudent');
        Route::get('exportTeacherExcel','UserController@getTeacherExcel');
        Route::get('exportStudentExcel','UserController@getStudentExcel');
        Route::post('teacher_single','UserController@postSingleTeacher');
        Route::post('student_single','UserController@postSingleStudent');

        //Permission Control
        Route::post('attach_permission','RoleController@attachPermission');
        Route::post('attach_role','RoleController@attachRole');

        Route::post('create_permission','RoleController@postPermission');
        Route::put('update_permission','RoleController@putPermission');
        Route::delete('delete_permission','RoleController@deletePermission');
        Route::get('read_permission','RoleController@readPermission');

        Route::post('create_role','RoleController@postRole');
        Route::put('update_role','RoleController@putRole');
        Route::delete('delete_role','RoleController@deleteRole');
        Route::get('read_role','RoleController@readRole');


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
        Route::put('classes/{id}','ClassController@putClasses');
        Route::delete('classes/{id}', 'ClassController@delClasses');
        Route::get('classes', 'ClassController@getClasses');
        Route::post('classes','ClassController@postClasses');

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
            Route::get('videoProgress','VideoProgressController@getVideoProgress');




        });


    });

    Route::any('{api?}/{function?}/{params?}', 'ApiController@api')->where('params', '(.*)')->middleware('detectDB');

});



