<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PgListing;
use App\Models\Rooms;
use App\Models\Roommate;

class FavouriteController extends Controller
{
    public function toggleFavourite($type, $id)
    {
        $modelClass = $this->getModelClass($type);

        if (!$modelClass) {
            return response()->json(['success' => false, 'message' => 'Invalid type']);
        }

        $item = $modelClass::find($id);

        if ($item) {
            $item->is_favourite = !$item->is_favourite;
            $item->save();

            return response()->json(['success' => true, 'is_favourite' => $item->is_favourite]);
        } else {
            return response()->json(['success' => false, 'message' => 'Item not found']);
        }
    }

    private function getModelClass($type)
    {
        switch ($type) {
            case 'room':
                return Rooms::class;
            case 'roommates':
                return Roommate::class;
            case 'pg':
                return PgListing::class;
            default:
                return null;
        }
    }

    public function getFavourites($userId, $type = null, $sortOrder = 'ASC')
    {
        $pgListings = collect();
        $rooms = collect();
        $roommates = collect();

        switch ($type) {
            case 'r':
                $rooms = Rooms::where('is_favourite', 1)->where('user_id', $userId)->get();
                break;
            case 'rm':
                $roommates = Roommate::where('is_favourite', 1)->where('user_id', $userId)->get();
                break;
            case 'pg':
                $pgListings = PgListing::where('is_favourite', 1)->where('user_id', $userId)->get();
                break;
            default:
                $pgListings = PgListing::where('is_favourite', 1)->where('user_id', $userId)->get();
                $rooms = Rooms::where('is_favourite', 1)->where('user_id', $userId)->get();
                $roommates = Roommate::where('is_favourite', 1)->where('user_id', $userId)->get();
                break;
        }

        $combinedArray = $roommates->toArray();
        $combinedArray = array_merge($combinedArray, $rooms->toArray());
        $combinedArray = array_merge($combinedArray, $pgListings->toArray());
        $combinedCollection = collect($combinedArray);

        $sortedCollection = $combinedCollection->sort(function ($a, $b) use ($sortOrder) {
            if ($sortOrder === 'NEWEST') {
                return $b['created_at'] <=> $a['created_at'];
            }
            return 0;
        });

        return response()->json(['data' => $sortedCollection->values()]);
    }
}