<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\User;

class UserController extends Controller
{
    public function decodeToken(Request $request)
    {
        $jwt = $request->header('Authorization');
        $key = env('JWT_SECRET');

        //removing 'Bearer ' from the token string
        if (strpos($jwt, 'Bearer ') === 0) {
            $jwt = substr($jwt, 7);
        }

        try {
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));

            //fetching user by ID from decoded token
            $user = User::find($decoded->sub);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to decode JWT', 'message' => $e->getMessage()], 400);
        }
    }
}