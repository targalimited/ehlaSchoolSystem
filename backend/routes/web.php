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

        $this->visit('/register')
            ->type('Taylor', 'name')
            ->check('terms')
            ->press('Register')
            ->seePageIs('/dashboard');

    //return File::get(public_path() . '/dist/index.html');
   // Auth::loginUsingId(53,true);
   // dump(Auth::user());
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



        Route::post('userApi/logout', 'LoginController@logout');
        //Subject Controller
        Route::get('classes/teachers/{teacher_id?}', 'SubjectController@getAllClasses')->name('allClasses');
        Route::get('classes/teachers/{teacher_id?}/subjects/{subject_id?}', 'SubjectController@getClasses')->name('classes');
        Route::get('subjects/teachers/{teacher_id?}', 'SubjectController@getSubjects')->name('subjects');
        //Route::get('teachers/{teacher_id?}/classes/{class_id?}/result/history','ResultController@getHistoryWeaknessResult');
        // get all assignments taught by a teacher
        Route::get('teachers/{teacher_id?}/assignments', 'AssignmentController@getAllAssignments');


        //subjects
        Route::get('subjects', 'SubjectController@getAllSubjects');
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

        Route::post('subjects', 'SubjectController@postSubjects');
        Route::post('classes','ClassController@postClass');

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

    Route::any('{api?}/{function?}/{params?}', 'ApiController@api')->where('params', '(.*)');

});



