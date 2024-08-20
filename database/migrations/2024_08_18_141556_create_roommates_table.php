<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('roommates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->json('location');
            $table->string('looking_for');
            $table->string('looking_for_gender')->nullable();
            $table->decimal('approx_rent', 10, 2);
            $table->string('room_type');
            $table->json('highlighted_features')->nullable();
            $table->text('post')->nullable();
            $table->string('listing_type')->default('roommates');
            $table->integer('occupancy');
            $table->integer('number_of_people');
            $table->json('photos')->nullable();
            $table->json('amenities')->nullable(); 
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); //foreign key constraint
        });
    }

    public function down()
    {
        Schema::dropIfExists('roommates');
    }
};
