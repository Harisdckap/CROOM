<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Create a token for password reset
        $token = Password::createToken($user);

        // Send custom reset link via email
        Mail::send('auth.emails.password_reset', ['token' => $token, 'email' => $user->email], function($message) use ($user) {
            $message->to($user->email);
            $message->subject('Password Reset Request');
        });

        return response()->json([
            'success' => true,
            'message' => 'Reset link sent to your email address',
        ], 200);
    }
}