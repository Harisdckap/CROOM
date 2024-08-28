<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PgListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pg_type',
        'looking_for_gender',
        'mobile_num',
        'pg_name',
        'location',
        'occupancy_type',
        'occupancy_amount',
        'listing_type',
        'photos',
        'pg_post_content',
        'highlighted_features',
        'amenities',
    ];

    protected $casts = [
        'photos' => 'array',
        'highlighted_features' => 'array',
        'amenities' => 'array',
        'location' => 'array',
    ];

}