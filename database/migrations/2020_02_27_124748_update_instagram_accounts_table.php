<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateInstagramAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('instagram_accounts', function (Blueprint $table) {
            $table->bigInteger('fb_ig_id')->nullable();
            $table->bigInteger('fb_id')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('instagram_accounts', function (Blueprint $table) {
            $table->dropColumn('fb_ig_id');
            $table->dropColumn('fb_id');

        });
    }
}
