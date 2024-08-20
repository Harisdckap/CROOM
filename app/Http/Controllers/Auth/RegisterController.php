<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\OTPVerification;
use App\Mail\OTPMail;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'gender' => 'required|string',
            'mobile' => 'required|string|max:10',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'mobile' => $request->mobile,
        ]);

        // Generate OTP
        $otp = rand(100000, 999999);

        // Store OTP in database
        OTPVerification::create([
            'user_id' => $user->id,
            'otp' => $otp,
            'otp_expire_at' => now()->addMinutes(10),
        ]);

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        // Send OTP via email
        Mail::send('auth.emails.otp', ['otp' => $otp, 'auth_token' => $token], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Your OTP Code');
        });

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully. Please check your email for the OTP.',
            'access_token' => $token,
            'user_id' => $user->id,
        ], 201);
    }


    public function logout(Request $request)
    {
        try {
            $token = $request->header('Authorization');
            if ($token) {
                JWTAuth::parseToken()->invalidate();
                return response()->json([
                    'success' => true,
                    'message' => 'User logged out successfully.'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Authorization token not found.'
                ], 401);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to log out, please try again.'
            ], 500);
        }
    }

    public function update(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        'gender' => 'required|string',
        'mobile' => 'required|string|max:10',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Find the user by ID
    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found.'], 404);
    }

    // Update user details
    $user->name = $request->name;
    $user->email = $request->email;
    $user->gender = $request->gender;
    $user->mobile = $request->mobile;

    // // Check if password is being updated
    // if ($request->filled('password')) {
    //     $user->password = Hash::make($request->password);
    // }

    // Check if the image is uploaded
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);

        // Save the image path to the user record
        $user->image = $imageName;
    }

    $user->save();

    return response()->json([
        'success' => true,
        'message' => 'User updated successfully.',
        'user' => $user
    ]);
}



}
