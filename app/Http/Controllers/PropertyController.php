<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Rooms;
use App\Models\PgListing;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class PropertyController extends Controller
{


    public function index(Request $request)
    {
        // Retrieve parameters
        $address = $request->input('address', '');
        $type = $request->input('t', 'a');
        $gender = $request->input('gender', 'all');
    
        // Build queries
        $roommateQuery = Roommate::query()->where('location', 'LIKE', "%{$address}%");
        $listingQuery = Rooms::query()->where('location', 'LIKE', "%{$address}%");
        $pgQuery = PgListing::query()->where('location', 'LIKE', "%{$address}%")->where('listing_type', 'pg');
    
        if ($gender !== 'all') {
            $roommateQuery->where('looking_for_gender', $gender);
            $listingQuery->where('looking_for_gender', $gender);
            $pgQuery->where('looking_for_gender', $gender);
        }
    
        // Initialize collections
        $roommates = collect();
        $listings = collect();
        $pglistings = collect();
    
        // Determine the type of listing to return
        switch ($type) {
            case 'r':
                $listings = $listingQuery->where('listing_type', 'room')->get();
                break;
            case 'rm':
                $roommates = $roommateQuery->where('listing_type', 'roommates')->get();
                break;
            case 'pg':
                $pglistings = $pgQuery->get();
                break;
            default:
                $roommates = $roommateQuery->get();
                $listings = $listingQuery->where('listing_type', '!=', 'pg')->get();
                $pglistings = $pgQuery->get();
                break;
        }
    
        // Merge all the listings together
        $combinedListings = $listings->concat($roommates)->concat($pglistings);

    
        // Limit the combinedListings to 8 items (or fewer if less than 8 available)
        $limitedListings = $combinedListings;
    
        Log::info('Before Merging:', [
            'listings' => $listings->toArray(),
            'roommates' => $roommates->toArray(),
            'pgListings' => $pglistings->toArray(),
        ]);
        
        Log::info('After Merging:', ['limitedListings' => $limitedListings->toArray()]);
    
        // Return the listings with the limited number of items
        return response()->json([
            'roomates' => $roommates,
            'listings' => $listings,
            'pg_listings' => $pglistings,
            'data' => $limitedListings,
            'total' => $limitedListings->count(),
        ]);
    }
    


    



    /**
     * Paginate a given collection.
     *
     * @param \Illuminate\Support\Collection $items
     * @param int $perPage
     * @param int $page
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    protected function paginate($items, $perPage, $page, $request)
    {
        $offset = ($page - 1) * $perPage;
        $paginatedItems = $items->slice($offset, $perPage)->values();

        return new \Illuminate\Pagination\LengthAwarePaginator(
            $paginatedItems,
            $items->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );
    }





    public function show($id, $location, $listing_type)
    {
        // Decode the base64 encoded id
        $decodedId = base64_decode($id);

        // Log the decoded ID, location, and listing type for debugging
        // Log::info('Decoded ID:', ['id' => $decodedId]);
        // Log::info('Location:', ['location' => $location]);
        // Log::info('Listing Type:', ['listing_type' => $listing_type]);

        // Query the appropriate table based on the listing type
        if ($listing_type === 'roommates') {
            $roommate = Roommate::find($decodedId);
            if ($roommate) {
                // Log::info('Roommate found:', ['roommate' => $roommate]);
                // Return the roommate data with location
                return response()->json(['data' => $roommate, 'location' => $location]);
            }
        } elseif ($listing_type === 'pg') {
            $pgListing = PgListing::find($decodedId);
            if ($pgListing) {
                // Log::info('PG Listing found:', ['pgListing' => $pgListing]);
                // Return the PG listing data with location
                return response()->json(['data' => $pgListing, 'location' => $location]);
            }
        } else {
            // Assuming 'listing' type
            $listing = Rooms::find($decodedId);
            if ($listing) {
                // Log::info('Listing found:', ['listing' => $listing]);
                // Return the listing data with location
                return response()->json(['data' => $listing, 'location' => $location]);
            }
        }

        // If no property is found, return a 404 error
        // Log::error('Property not found:', ['id' => $decodedId]);
        return response()->json(['error' => 'Property not found'], 404);
    }
}
