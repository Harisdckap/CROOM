<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserRemoved;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class UserListController extends Controller
{
    public function getUserList($auth_userID)
    {
        $auth_user_id = $auth_userID;

        //check user type is 1 (super admin) or 2 (admin)
        if ($auth_user_id == 1 || $auth_user_id == 2) {
            //fetch all users with user_type = 3
            $users = User::where('user_type', 3)->get();

            return response()->json($users);
        } else {
            //return unauthorized response - user type is not 1 or 2
            return response()->json(['message' => 'Unauthorized access'], 401);
        }
    }

    public function getAdminList($auth_userID)
    {
        $auth_user_id = $auth_userID;

        if ($auth_user_id == 1 || $auth_user_id == 2) {
            //fetch all users with user_type = 2 (admin)
            $admins = User::where('user_type', 2)->get();

            //return the list of admins
            return response()->json($admins);
        } else {
            //return unauthorized response if user type is not 1 or 2
            return response()->json(['message' => 'Unauthorized access'], 401);
        }
    }

    public function removeUser(Request $request)
    {

        $token = request()->bearerToken();
        Log::info('Token received: ' . $token);

        // Validate the request
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        //decode the token to get the authenticated user
        $authUser = JWTAuth::parseToken()->authenticate();

        //find the user to be removed by ID
        $userToRemove = User::find($request->input('user_id'));

        if ($userToRemove) {
            switch ($authUser->user_type) {
                case 1: //super Admin
                    //super admin can remove anyone, including admins and regular users
                    $userToRemove->delete();

                    //send email notification
                    Mail::to($userToRemove->email)->send(new UserRemoved($userToRemove));

                    return response()->json(['message' => 'User removed and notified successfully']);

                case 2: //admin
                    //admins can only remove regular users (user_type = 3)
                    if ($userToRemove->user_type == 3) {
                        $userToRemove->delete();

                        //send email notification
                        Mail::to($userToRemove->email)->send(new UserRemoved($userToRemove));

                        return response()->json(['message' => 'User removed and notified successfully']);
                    } else {
                        return response()->json(['message' => 'Unauthorized to remove this user'], 403);
                    }

                default:
                    //if the user_type doesn't match any case, return unauthorized response
                    return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        //return error response if user not found
        return response()->json(['message' => 'User not found'], 404);
    }

    public function changeRole(Request $request)
    {
        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Assuming 'role' is a column in your users table
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'User role updated successfully']);
    }

}
