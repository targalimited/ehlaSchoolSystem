<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      if (!Schema::hasTable('user_info'))
        Schema::create('user_info', function (Blueprint $table) {
          $table->increments('id')->unsigned();
          $table->integer('user_id')->unsigned();
          $table->string('realname_en')->nullable();
          $table->string('realname_zh')->nullable();
          $table->string('school_num')->nullable();
          $table->string('class_no')->nullable();
          $table->string('default_password')->nullable();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::dropIfExists('user_info');

    }
}
