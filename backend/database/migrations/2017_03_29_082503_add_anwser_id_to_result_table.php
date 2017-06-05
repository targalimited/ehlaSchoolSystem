<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAnwserIdToResultTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('school_assignment_item_questions', function (Blueprint $table) {
            //
            $table->integer('answer_id')->nullable()->after('answer');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('school_assignment_item_questions', function (Blueprint $table) {
            //
            $table->removeColumn('answer_id');
        });
    }
}
