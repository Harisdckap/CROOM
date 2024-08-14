<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PgListing;
use Illuminate\Support\Facades\Log;

class PgListingController extends Controller
{
    public function index()
    {
        $pgListings = PgListing::paginate(10);
        return response()->json($pgListings);
    }

    public function show($id)
    {
        $pgListing = PgListing::findOrFail($id);
        return response()->json($pgListing);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
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
        // Handle file upload
        $imagePaths = [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $file) {
                // Generate a unique file name and store the file
                $path = $file->store('photos', 'public');
                $imagePaths[] = $path;
            }
        }

        // Convert image paths to JSON for storage
        $validated['photos'] = json_encode($imagePaths);
      
        Log::info('Uploaded files:', $imagePaths);

        $validated['highlighted_features'] = isset($validated['highlighted_features'])
        ? json_decode($validated['highlighted_features'], true)
        : [];
    $validated['amenities'] = isset($validated['amenities'])
        ? json_decode($validated['amenities'], true)
        : [];

        // Create a new Roommate record
        $pgListing = PgListing::create($validated);

        try {
            $pgListing->save();
            return response()->json(['message' => 'PG Listing added successfully', 'data' => $pgListing], 201);
        } catch (\Exception $e) {
            Log::error('Failed to save PG Listing: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to add PG Listing', 'error' => $e->getMessage()], 500);
        }
    }
}
