<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropConstraintFromRoleUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//      Schema::table('role_user', function (Blueprint $table) {
//        $table->foreign('user_id')->references('user_id')->on('user_info')->onDelete('cascade');
//        $table->dropForeign('school_role_user_user_id_foreign');
//      });

      Schema::table('role_user', function($table) {
         $table->dropForeign('school_role_user_user_id_foreign');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
