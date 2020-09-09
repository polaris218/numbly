<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserHasHashtagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_has_hashtag', function (Blueprint $table) {

            $table->unsignedBigInteger('hashtag_id');
            $table->unsignedBigInteger('ig_user_id');

            $table->foreign('hashtag_id')->references('id')->on('hashtags')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('ig_user_id')->references('id')->on('instagram_accounts')->onUpdate('cascade')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_has_hashtag');
    }
}
