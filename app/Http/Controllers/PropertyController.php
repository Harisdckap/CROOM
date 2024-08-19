<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Rooms;
use App\Models\PgListing;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->input('address', '');
        $page = $request->input('p', 1);
        $itemsPerPage = 9;
        $type = $request->input('t', 'a'); 
        $gender = $request->input('gender', 'all'); 
        $sortOrder = $request->input('sort', 'ASC'); 
    
        // Queries
        $roommateQuery = Roommate::query()
            ->whereRaw('LOWER(location) LIKE ?', ["%".strtolower($address)."%"]);
    
        $listingQuery = Rooms::query()
            ->whereRaw('LOWER(location) LIKE ?', ["%".strtolower($address)."%"]);
    
        $pgQuery = PgListing::query()
            ->whereRaw('LOWER(location) LIKE ?', ["%".strtolower($address)."%"])
            ->where('listing_type', 'pg');
    
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
    
        // Combine arrays
        $combinedArray = $roommates->toArray();
        $combinedArray = array_merge($combinedArray, $listings->toArray());
        $combinedArray = array_merge($combinedArray, $pglistings->toArray());
    
        $combinedCollection = collect($combinedArray);
    
        // Sorting
        $sortedCollection = $combinedCollection->sort(function ($a, $b) use ($sortOrder) {
            $aPrice = $a['price'] ?? $a['approx_rent'] ?? $a['occupancy_amount'];
            $bPrice = $b['price'] ?? $b['approx_rent'] ?? $b['occupancy_amount'];
    
            if ($sortOrder === 'NEWEST') {
                return $b['created_at'] <=> $a['created_at']; 
            }
    
            if ($aPrice === $bPrice) {
                return 0;
            }
    
            return ($sortOrder === 'ASC') ? ($aPrice < $bPrice ? -1 : 1) : ($aPrice > $bPrice ? -1 : 1);
        });
    
        // Paginate the sorted collection
        $paginatedListings = $this->paginate($sortedCollection, $itemsPerPage, $page, $request);
    
        // Return the response
        return response()->json([
            'roommates' => $roommates,
            'listings' => $listings,
            'pg_listings' => $pglistings,
            'data' => $paginatedListings->items(),
            'current_page' => $paginatedListings->currentPage(),
            'last_page' => $paginatedListings->lastPage(),
            'total' => $paginatedListings->total(),
        ]);
    }
    
    /**
     * Custom pagination function for a collection.
     *
     * @param \Illuminate\Support\Collection $items
     * @param int $perPage
     * @param int $page
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    protected function paginate(Collection $items, $perPage, $page, $request)
    {
        $offset = ($page - 1) * $perPage;
        $paginatedItems = $items->slice($offset, $perPage)->values();

        return new LengthAwarePaginator(
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
    
                // Return the PG listing data with location
                return response()->json(['data' => $pgListing, 'location' => $location]);
            }
        } else {
        
            $listing = Rooms::find($decodedId);
            if ($listing) {
              
                return response()->json(['data' => $listing, 'location' => $location]);
            }
        }

     
        return response()->json(['error' => 'Property not found'], 404);
    }
}
