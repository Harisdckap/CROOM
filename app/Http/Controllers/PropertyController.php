<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Rooms;
use App\Models\PgListing;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use SebastianBergmann\Type\TrueType;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->input('address', '');
        $page = $request->input('p', 1);
        $itemsPerPage = 20;
        $type = $request->input('t', 'a');
        $gender = $request->input('gender', 'all');
        $sortOrder = $request->input('sort', 'ASC');
        $roomType = $request->input('propertyType', 'all'); // Room type filter
    
        // Queries
        $roommateQuery = Roommate::query()
            ->whereRaw('LOWER(location) LIKE ?', ["%" . strtolower($address) . "%"]);
    
        $listingQuery = Rooms::query()
            ->whereRaw('LOWER(location) LIKE ?', ["%" . strtolower($address) . "%"]);
    
        $pgQuery = PgListing::query()
            ->whereRaw('LOWER(location) LIKE ?', ["%" . strtolower($address) . "%"])
            ->where('listing_type', 'pg');
    
        // Filter by gender
        if ($gender !== 'all') {
            $roommateQuery->where('looking_for_gender', $gender);
            $listingQuery->where('looking_for_gender', $gender);
            $pgQuery->where('looking_for_gender', $gender);
        }
    
        // Filter by room type
        if ($roomType !== 'all') {
            $listingQuery->where('room_type', $roomType); // Apply to Listings
            $pgQuery->where('pg_type', $roomType); // Apply to PG Listings
            $roommateQuery->where('room_type', $roomType);
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


    public function deleteProperty($listingType, $id)
    {
        $decodedId = $id;
        $property = null;

        // Find the property based on listing type
        switch (strtolower($listingType)) {
            case 'roommates':
                $property = Roommate::find($decodedId);
                break;
            case 'pg':
                $property = PgListing::find($decodedId);
                break;
            case 'room':
                $property = Rooms::find($decodedId);
                break;
            default:
                return response()->json(['message' => 'Invalid listing type'], 400);
        }

        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        // Delete the property
        $property->delete();

        return response()->json(['message' => 'Property deleted successfully','success'=>true]);
    }



    public function updateProperty(Request $request, $id,$listingType)
    {
        // Define validation rules based on the listing type
        // Log::info('Received Request Data:', $request->all());

        //  return $request->all();
        switch ($listingType) {
            
            case 'roommates':
                $validatedData = $request->validate([
                    'user_id' => 'required|exists:users,id',
                    'title' => 'required|string|max:255',
                    'location' => 'required|json',
                    'looking_for' => 'required|string|max:255',
                    'looking_for_gender' => 'nullable|string|max:255',
                    'approx_rent' => 'required|numeric',
                    'room_type' => 'required|string|max:255',
                    'highlighted_features' => 'nullable|json',
                    'amenities' => 'nullable|json',
                    'post' => 'nullable|string',
                    'listing_type' => 'required|string|max:255|in:roommates',
                    'occupancy' => 'required|integer',
                    'number_of_people' => 'required|integer',
                    'photos.*' => 'image|mimes:jpg,png,jpeg,gif,webp|max:2048',
                ]);

                $property = Roommate::where('id', $id)->first();
                break;

            case 'pg':
                $validatedData = $request->validate([
                    'user_id' => 'required|exists:users,id',
                    'pg_type' => 'required|string|max:255',
                    'looking_for_gender' => 'nullable|string|max:255',
                    'mobile_num' => 'required|numeric',
                    'pg_name' => 'required|string|max:255',
                    'location' => 'required|json',
                    'occupancy_type' => 'required|string|max:255',
                    'occupancy_amount' => 'required|numeric',
                    'pg_post_content' => 'required|string',
                    'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                    'highlighted_features' => 'nullable|json',
                    'amenities' => 'nullable|json',
                ]);
                $property = PgListing::where('id', $id)->first();
                break;

            case 'room':
                $validatedData = $request->validate([
                    'user_id' => 'required|exists:users,id',
                    'title' => 'required|string|max:255',
                    'location' => 'required|json',
                    'price' => 'required|numeric',
                    'room_type' => 'required|string',
                    'contact' => 'required|string|max:255',
                    'looking_for' => 'nullable|string|max:255',
                    'occupancy' => 'nullable|string|max:255',
                    'highlighted_features' => 'nullable|json',
                    'amenities' => 'nullable|json',
                    'description' => 'nullable|string',
                    'listing_type' => 'required|string|max:255',
                    'looking_for_gender' => 'nullable|string|max:255',
                    'photos.*' => 'image|mimes:jpg,png,jpeg,gif,webp|max:2048',
                ]);

                $property = Rooms::where('id', $id)->first();
                return response()->json(['request' => $request->all()]);
                break;

            default:
                return response()->json(['message' => 'Invalid listing type'], 400);
        }

        // Check if property exists
        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        // Update the property with validated data
        $property->update($validatedData);

        return response()->json(['message' => 'Property updated successfully', 'property' => $property]);
    }

    public function getNearbyProperties($listingType, $propertyId, Request $request)
{
    // Dynamically select the correct model based on listing type
    $propertyModel = $this->getModelByListingType($listingType);

    if (!$propertyModel) {
        return response()->json(['error' => 'Invalid listing type'], 400);
    }

    // Fetch the current property to get its district and city if not passed in the request
    $currentProperty = $propertyModel::find($propertyId);
    if (!$currentProperty) {
        return response()->json(['error' => 'Property not found'], 404);
    }

    // Get district and city from the request or fallback to current property's district/city
    $district = $request->query('district') ?? json_decode($currentProperty->location)->district;
    $city = $request->query('city') ?? json_decode($currentProperty->location)->city;

    if (!$district && !$city) {
        return response()->json(['error' => 'District or city is required'], 400);
    }

    // Build the query to exclude the current property
    $query = $propertyModel::where('id', '!=', $propertyId); // Excludes the current property

    // Apply filters for district and city
    $query->where(function ($q) use ($district, $city) {
        if ($district) {
            $q->whereRaw("LOWER(location) LIKE ?", ["%".strtolower($district)."%"]);
        }

        if ($city) {
            $q->orWhereRaw("LOWER(location) LIKE ?", ["%".strtolower($city)."%"]);
        }
    });

    // Execute the query
    $nearbyProperties = $query->get();

    return response()->json(['data' => $nearbyProperties]);
}

    
    
    
    
    /**
     * Get the model class based on the listing type.
     *
     * @param string $listingType
     * @return string|null
     */
    private function getModelByListingType($listingType)
    {
        switch ($listingType) {
            case 'room':
                return Rooms::class;
            case 'pg':
                return PgListing::class;
            case 'roommates':
                return Roommate::class;
            default:
                return null;
        }
    }
    
    
    
    
}
