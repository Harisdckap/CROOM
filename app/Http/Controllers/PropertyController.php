<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Rooms;
use App\Models\PgListing;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->input('address', '');
        $page = $request->input('p', 1);
        $itemsPerPage = 8;
        $type = $request->input('t', 'a'); // Default to 'a' (all types)
        $gender = $request->input('gender', 'all'); // Default to 'all'
        $sortOrder = $request->input('sort', 'ASC'); // Default to 'asc'
    
        // Initialize queries for roommates, listings, and PGs
        $roommateQuery = Roommate::query()->where('location', 'LIKE', "%{$address}%");
        $listingQuery = Rooms::query()->where('location', 'LIKE', "%{$address}%");
        $pgQuery = PgListing::query()->where('location', 'LIKE', "%{$address}%")->where('listing_type', 'pg');
       

        // Apply gender filter if specified
        if ($gender !== 'all') {
            $roommateQuery->where('looking_for_gender', $gender);
            $listingQuery->where('looking_for_gender', $gender);
            $pgQuery->where('looking_for_gender', $gender);
        }
    
        // Fetch data based on type
        switch ($type) {
            case 'r':
                $listings = $listingQuery->where('listing_type', 'room')->get();
                $roommates = collect();
                $pglistings = collect();
                break;
            case 'rm':
                $roommates = $roommateQuery->where('listing_type', 'roommates')->get();
                $listings = collect();
                $pglistings = collect();
                break;
            case 'pg':
                $pglistings = $pgQuery->get();
                $roommates = collect();
                $listings = collect();
                break;
            default:
                $roommates = $roommateQuery->get();
                $listings = $listingQuery->get(); 
                $pglistings = $pgQuery->get();
                break;
        }
    
        // Combine collections
        $combinedListings = $pglistings->concat($roommates)->concat($listings);
    
        // Debug: Check combined data
        Log::info('Combined Listings:', $combinedListings->toArray());
    
        // Sort the combined collection based on the sortOrder
        $combinedListings = $combinedListings->sort(function ($a, $b) use ($sortOrder) {
            $aPrice = $a->price ?? $a->approx_rent ?? $a->occupancy_amount;
            $bPrice = $b->price ?? $b->approx_rent ?? $b->occupancy_amount;
    
            if ($aPrice === $bPrice) {
                return 0;
            }
    
            return ($sortOrder === 'ASC') ? ($aPrice < $bPrice ? -1 : 1) : ($aPrice > $bPrice ? -1 : 1);
        });
    
        // Paginate the combined collection
        $paginatedListings = $this->paginate($combinedListings, $itemsPerPage, $page,$request);
    
        // Return the response
        return response()->json([
            'roommates' => $roommates,
            'listings' => $listings,
            'pg_listings' => $pglistings,
            'data' => $paginatedListings->all(),
            'current_page' => $paginatedListings->currentPage(),
            'last_page' => $paginatedListings->lastPage(),
            'total' => $paginatedListings->total(),
        ]);
    }
    

    /**
     * Custom pagination function for a collection
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
                Log::info('PG Listing found:', ['pgListing' => $pgListing]);
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
