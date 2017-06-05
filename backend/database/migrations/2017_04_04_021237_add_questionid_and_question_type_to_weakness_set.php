<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddQuestionidAndQuestionTypeToWeaknessSet extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('school_weakness_sets', function (Blueprint $table) {
            //
            $table->integer('question_id')->nullable()->after('assignment_item_id');
            $table->integer('question_type')->nullable()->after('question_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('school_weakness_sets', function (Blueprint $table) {
            //
            $table->removeColumn('question_id');
            $table->removeColumn('question_type');
        });
    }
}
