<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoommateController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->query('address');
        $page = $request->query('p', 1); // Default to page 1 if not provided
        $perPage = 6; // Number of listings per page

        $query = Roommate::query();

        if ($address) {
            $query->where('location', 'LIKE', "%$address%");
        }

        $roommates = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json($roommates);
    }

    public function store(Request $request)
    {
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

        // Handle file upload
        $imagePaths = [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $file) {
                // Generate a unique file name and store the file
                $path = $file->store('photos', 'public');
                $imagePaths[] = $path;
            }
        }
        // Decode JSON strings back to arrays
        $validatedData['highlighted_features'] = isset($validatedData['highlighted_features'])
            ? json_decode($validatedData['highlighted_features'], true)
            : [];
        $validatedData['amenities'] = isset($validatedData['amenities'])
            ? json_decode($validatedData['amenities'], true)
            : [];

        // Convert image paths to JSON for storage
        $validatedData['photos'] = json_encode($imagePaths);
        $validatedData['location'] = json_encode($validatedData['location']);
    
        Log::info('Uploaded files:', $imagePaths);

        // Create a new Roommate record
        $roommate = Roommate::create($validatedData);

        return response()->json($roommate, 201);
    }



    public function show($id)
    {
        $roommate = Roommate::findOrFail($id);
        return response()->json($roommate);
    }

    public function update(Request $request, $id)
    {
        $roommate = Roommate::findOrFail($id);

        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'location' => 'sometimes|required|string|max:255',
            'looking_for' => 'sometimes|required|string|max:255',
            'looking_for_gender' => 'nullable|string|max:255',
            'approx_rent' => 'sometimes|required|numeric',
            'room_type' => 'sometimes|required|string|max:255',
            'highlights' => 'nullable|string|max:255',
            'post' => 'nullable|string',
            'listing_type' => 'sometimes|required|string|max:255|in:roommates',
            'occupancy' => 'sometimes|required|integer',
            'number_of_people' => 'sometimes|required|integer',
            'house_images.*' => 'image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        // Handle file upload
        $imagePaths = [];

        if ($request->hasFile('house_images')) {
            foreach ($request->file('house_images') as $file) {
                // Generate a unique file name
                $path = $file->store('house_images', 'public');
                $imagePaths[] = $path;
            }
        }

        $validatedData['house_images'] = json_encode($imagePaths);


        $roommate->update($validatedData);
        return response()->json($roommate);
    }

    public function destroy($id)
    {
        $roommate = Roommate::findOrFail($id);
        $roommate->delete();
        return response()->json(null, 204);
    }
}
