<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Roommate;
use App\Models\Rooms;
use App\Models\PgListing;

class AdsController extends Controller
{
    public function getUserAds($userId)
    {
        $roommates = Roommate::where('user_id', $userId)->get();
        $pgListings = PgListing::where('user_id', $userId)->get();
        $rooms = Rooms::where('user_id', $userId)->get();

        $ads = [
            'roommates' => $roommates,
            'pg_listings' => $pgListings,
            'rooms' => $rooms
        ];

        return response()->json($ads);
    }
}
