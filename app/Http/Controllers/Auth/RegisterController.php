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
        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            return response()->json([
                'success' => false,
                'message' => 'User already registered. Please login.'
            ], 409);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'gender' => 'required|string',
            'mobile' => 'required|string|max:10',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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


    public function changePassword(Request $request,$userId)
    {

        // Validate input fields
        $validator = Validator::make($request->all(), [
            'existingPassword' => 'required',
            'newPassword' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'messages' => $validator->errors()], 422);
        }

        $user =User::find($userId);

        if (!$user) {
            return response()->json(['error' => ' user not found'], 400);
        }

        // Check if existing password is correct
        if (!Hash::check($request->input('existingPassword'), $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        // Update password and save user
        $user->password = Hash::make($request->input('newPassword'));
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
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
}
