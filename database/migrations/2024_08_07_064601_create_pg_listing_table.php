<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pg_listings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); 
            $table->string('pg_type')->default('Both');
            $table->string('mobile_num');
            $table->string('looking_for_gender')->nullable();
            $table->string('pg_name');
            $table->json('location');
            $table->string('occupancy_type');
            $table->integer('occupancy_amount');
            $table->string('listing_type')->default('pg');
            $table->json('highlighted_features')->nullable();  
            $table->json('amenities')->nullable();
            $table->json('photos')->nullable();
            $table->text('pg_post_content');
            $table->boolean('is_favourite')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); //foreign key constraint
        });
    }

    public function down()
    {
        Schema::dropIfExists('pg_listings');
    }
};
