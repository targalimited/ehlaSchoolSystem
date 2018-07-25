<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   if (!Schema::hasTable('users'))
          Schema::create('users', function (Blueprint $table) {
              $table->integer('id')->unsigned()->primary();
              $table->json('user');
              $table->json('session');
              $table->string('ex_token')->nullable();
              $table->dateTime('expiry_date')->nullable();
              $table->integer('school_id');
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
        Schema::dropIfExists('users');
    }
}
