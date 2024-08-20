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
use Laravel\Socialite\Facades\Socialite;
use Exception;


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
            'user_type' => 'nullable|string',
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

        //generate OTP
        $otp = rand(100000, 999999);

        //store OTP in database
        OTPVerification::create([
            'user_id' => $user->id,
            'otp' => $otp,
            'otp_expire_at' => now()->addMinutes(10),
        ]);

        //generate JWT token
        $token = JWTAuth::fromUser($user);

        //send OTP via email
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


    public function redirectToGoogle()
    {

        return Socialite::driver('google')->redirect();
    }
    public function handleGoogleCallback()
    {
        try {

            //create a user using socialite driver google
            $user = Socialite::driver('google')->user();

            $profile = $user->getAvatar();
            // if the user exits, use that user and login
            $finduser = User::where('google_id', $user->getId())->first();

            if ($finduser) {
                //if the user exists, login and show dashboard
                Auth::login($finduser);
                return response()->json([
                    'success' => true,
                    'message' => 'User logged in successfully.'
                ]);
            } else {
                //user is not yet created, so create first
                $newUser = User::create([
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'google_id' => $user->getId(),
                    'user_type' => 3,
                ]);


                //generate JWT token
                $token = JWTAuth::fromUser($newUser);

                Auth::login($newUser);
                //go to the dashboard
                return response()->json([
                    'success' => true,
                    'message' => 'User registered successfully.',
                    'access_token' => $token,
                    'user_id' => $newUser->id,
                ], 201);
            }
            //catch exceptions
        } catch (Exception $e) {
            dd($e->getMessage());
        }

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
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to log out, please try again.'
            ], 500);
        }
    }

}