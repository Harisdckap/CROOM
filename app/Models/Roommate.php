<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roommate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title', 
        'location',
        'looking_for',
        'looking_for_gender',
        'approx_rent',
        'room_type',
        'highlighted_features',
        'post',
        'listing_type',
        'occupancy',
        'number_of_people',
        'photos',
        'amenities',
    ];

    protected $casts = [
        'photos' => 'array',
        'highlighted_features' => 'array',
        'amenities' => 'array',
        'location' => 'array',
    ];
}
