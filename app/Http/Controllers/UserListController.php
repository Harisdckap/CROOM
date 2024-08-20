<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserListController extends Controller
{
    public function getUserList()
    {
        //fetch all users with user_type = 3
        $users = User::where('user_type', 3)->get();

        //return the list of users
        return response()->json($users);
    }
    public function getAdminList()
    {
        //fetch all users with user_type = 2
        $users = User::where('user_type', 2)->get();

        //return the list of admins
        return response()->json($users);
    }
}