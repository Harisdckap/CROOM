<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'location',
        'price',
        'room_type',
        'contact',
        'looking_for_gender',
        'looking_for',
        'occupancy',
        'photos',
        'highlighted_features',
        'amenities',
        'description',
        'listing_type',
    ];

    protected $casts = [
        'photos' => 'array',
        'highlighted_features' => 'array',
        'amenities' => 'array',
    ];
}
