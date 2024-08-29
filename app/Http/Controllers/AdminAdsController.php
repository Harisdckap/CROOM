<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Rooms;
use App\Models\PgListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\AdRemovedMail; // Import the mail class

class AdminAdsController extends Controller
{
    public function getAllAds()
    {
        // Fetch all types of ads
        $roommates = Roommate::all();
        $rooms = Rooms::all();
        $pgListings = PgListing::all();

        // Map the data to include ad ID, location, user ID, ad name, and price
        $formattedAds = $roommates->map(function ($ad) {
            return [
                'id' => $ad->id,
                'location' => $ad->location,
                'user_id' => $ad->user_id,
                'ad_name' => $ad->title,
                'price' => $ad->approx_rent,
                'listing_type' => 'roommates'
            ];
        })->merge(
            $rooms->map(function ($ad) {
                return [
                    'id' => $ad->id,
                    'location' => $ad->location,
                    'user_id' => $ad->user_id,
                    'ad_name' => $ad->title,
                    'price' => $ad->price,
                    'listing_type' => 'room'
                ];
            })
        )->merge(
            $pgListings->map(function ($ad) {
                return [
                    'id' => $ad->id,
                    'location' => $ad->location,
                    'user_id' => $ad->user_id,
                    'ad_name' => $ad->pg_name,
                    'price' => $ad->occupancy_amount,
                    'listing_type' => 'pg'
                ];
            })
        );

        return response()->json([
            'ads' => $formattedAds
        ]);
    }

    public function removeAd(Request $request)
    {
        $validated = $request->validate([
            'ad_id' => 'required|integer',
            'listing_type' => 'required|string|in:roommates,pg,room'
        ]);

        $adId = $validated['ad_id'];
        $listingType = $validated['listing_type'];
        $ad = null;

        // Find the ad based on listing type
        switch ($listingType) {
            case 'roommates':
                $ad = Roommate::find($adId);
                break;
            case 'pg':
                $ad = PgListing::find($adId);
                break;
            case 'room':
                $ad = Rooms::find($adId);
                break;
            default:
                return response()->json(['message' => 'Invalid listing type'], 400);
        }

        if (!$ad) {
            return response()->json(['message' => 'Ad not found'], 404);
        }

        // Get the user email
        $user = $ad->user; // Assuming each ad has a user relationship
        $userEmail = $user->email;

        // Delete the ad
        $ad->delete();

        // Send an email notification
        Mail::to($userEmail)->send(new AdRemovedMail($ad));

        return response()->json(['message' => 'Ad removed successfully']);
    }
}
