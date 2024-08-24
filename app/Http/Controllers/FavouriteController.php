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


    public function getFavourites($userId)
    {

        $pgListings = PgListing::where('is_favourite', 1)->where('id', $userId)->get();
        $rooms = Rooms::where('is_favourite', 1)->where('id', $userId)->get();
        $roommates = Roommate::where('is_favourite', 1)->where('id', $userId)->get();
        $favourites = $pgListings->merge($rooms)->merge($roommates);
        return response()->json(['data' => $favourites]);
    }

}
