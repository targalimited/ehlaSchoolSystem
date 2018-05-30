<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGenQuestionsTypeToSchoolAssignmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('school_assignments', function (Blueprint $table) {
            //

            $table->string('question_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('school_assignments', function (Blueprint $table) {
            //

            $table->removeColumn('question_type');
        });
    }
}
