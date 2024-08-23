<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->json('location');
            $table->decimal('price', 10, 2);
            $table->string('room_type');
            $table->string('contact');
            $table->string('looking_for_gender')->nullable();
            $table->string('looking_for')->nullable();
            $table->string('occupancy')->nullable();
            $table->json('photos')->nullable();
            $table->json('highlighted_features')->nullable();
            $table->json('amenities')->nullable();
            $table->text('description')->nullable();
            $table->string('listing_type')->nullable();
            $table->boolean('is_favourite')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

      public function down()
    {
        Schema::dropIfExists('rooms');
    }
};
