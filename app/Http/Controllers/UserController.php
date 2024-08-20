<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function decodeToken(Request $request)
    {
        $jwt = $request->header('Authorization');
        $key = env('JWT_SECRET');

        // Removing 'Bearer ' from the token string
        if (strpos($jwt, 'Bearer ') === 0) {
            $jwt = substr($jwt, 7);
        }

        try {
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));

            // Fetching user by ID from decoded token
            $user = User::find($decoded->sub);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to decode JWT', 'message' => $e->getMessage()], 400);
        }
    }
    public function updateProfile(Request $request)
    {
        $jwt = $request->header('Authorization');
        $key = env('JWT_SECRET');

        if (strpos($jwt, 'Bearer ') === 0) {
            $jwt = substr($jwt, 7);
        }

        try {
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
            $user = User::find($decoded->sub);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'password' => 'nullable|string|min:8|confirmed',
                'gender' => 'required|string',
                'mobile' => 'required|string|digits:10', 
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user->name = $request->name;
            $user->email = $request->email;
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }
            $user->gender = $request->gender;
            $user->mobile = $request->mobile;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('profile_images', 'public');
                $user->image = $imagePath;
            }

            $user->save();

            return response()->json(['success' => true, 'message' => 'Profile updated successfully', 'user' => $user], 200);

        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Failed to decode JWT', 'message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }

}

