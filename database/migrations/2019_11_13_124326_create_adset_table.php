<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdsetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adset', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('ad_account')->unsigned();
            $table->bigInteger('adset_id');
            $table->foreign('ad_account')->references('id')->on('adaccounts')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('adset');
    }
}
