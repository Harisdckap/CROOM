<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserRemoved;
use App\Mail\RoleChanged;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class UserListController extends Controller
{
    public function getUserList($auth_userID)
    {
        // Find the authenticated user by ID
        $authUser = User::find($auth_userID);

        if (!$authUser) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the user_type is 1 (super admin) or 2 (admin)
        if ($authUser->user_type == 1 || $authUser->user_type == 2) {
            // Fetch all users with user_type = 3
            $users = User::where('user_type', 3)->get();

            return response()->json($users);
        } else {
            // Return unauthorized response - user type is not 1 or 2
            return response()->json(['message' => 'Unauthorized access'], 401);
        }
    }

    public function getAdminList($auth_userID)
    {
        // Retrieve the authenticated user
        $authUser = User::find($auth_userID);

        if (!$authUser) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($authUser->user_type == 2) {
            // If the user is an admin, fetch only admins
            $admins = User::where('user_type', 2)
                ->where('id', '!=', $authUser->id) // Exclude the current user
                ->get();

            return response()->json($admins);
        } elseif ($authUser->user_type == 1) {
            // If the user is a super admin, fetch both super admins and admins
            $adminsAndSuperAdmins = User::whereIn('user_type', [1, 2])
                ->where('id', '!=', $authUser->id) // Exclude the current user
                ->get();

            return response()->json($adminsAndSuperAdmins);
        } else {
            // Return unauthorized response if user type is not 1 or 2
            return response()->json(['message' => 'Unauthorized access'], 401);
        }
    }

    public function removeUser(Request $request)
    {
        $userId = $request->query('user_id');
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // // Decode the token to get the authenticated user
        // $authUser = JWTAuth::parseToken()->authenticate();

        // if (!$authUser) {
        //     return response()->json(['message' => 'Unauthorized'], 401);
        // }

        // Find the user to be removed by ID
        $userToRemove = User::find($userId);

        if ($userToRemove) {
            try {
                $userToRemove->delete();
                Mail::to($userToRemove->email)->send(new UserRemoved($userToRemove));
                return response()->json(['message' => 'User removed and notified successfully']);

            } catch (\Exception $e) {
                Log::error('Error removing user: ' . $e->getMessage());
                return response()->json(['message' => 'Error removing user'], 500);
            }
            // try {
            //     switch ($authUser->user_type) {
            //         case 1: // Super Admin
            //             $userToRemove->delete();
            //             Mail::to($userToRemove->email)->send(new UserRemoved($userToRemove));
            //             return response()->json(['message' => 'User removed and notified successfully']);

            //         case 2: // Admin
            //             if ($userToRemove->user_type == 3) {
            //                 $userToRemove->delete();
            //                 Mail::to($userToRemove->email)->send(new UserRemoved($userToRemove));
            //                 return response()->json(['message' => 'User removed and notified successfully']);
            //             } else {
            //                 return response()->json(['message' => 'Unauthorized to remove this user'], 403);
            //             }

            //         default:
            //             return response()->json(['message' => 'Unauthorized'], 403);
            //     }
            // } catch (\Exception $e) {
            //     Log::error('Error removing user: ' . $e->getMessage());
            //     return response()->json(['message' => 'Error removing user'], 500);
            // }

        }

        return response()->json(['message' => 'User not found'], 404);
    }



    public function changeRole(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|integer|in:1,2,3' // Ensure 'role' is valid
        ]);

        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Save the new role
        $newRole = $request->role;
        $user->user_type = $newRole;
        $user->save();

        // Send confirmation email
        Mail::to($user->email)->send(new RoleChanged($user, $newRole));

        return response()->json(['message' => 'User role updated and confirmation email sent']);
    }

}
