<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OTPVerification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class OTPController extends Controller
{
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        $otpVerification = OTPVerification::where('otp', $request->otp)
                                            ->where('otp_expire_at', '>', now())
                                            ->first();

        if (!$otpVerification) {
            return response()->json(['error' => 'Invalid or expired OTP.'], 422);
        }

        $user = User::find($otpVerification->user_id);
        $user->email_verified_at = now();
        $user->save();

        $otpVerification->delete();

        return response()->json(['success' => true, 'message' => 'Email verified successfully.']);
    }

    public function getOTP(Request $request)
    {
        $user_id = $request->user_id;

        Log::info('Fetching OTP for user_id: ' . $user_id); 

        $otpRecord = OTPVerification::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->first();

        if ($otpRecord) {
            Log::info('OTP found: ' . $otpRecord->otp); // Add this line
            return response()->json(['success' => true, 'otp' => $otpRecord->otp]);
        } else {
            Log::info('No OTP found for user_id: ' . $user_id); // Add this line
            return response()->json(['success' => false, 'message' => 'No OTP found'], 404);
        }
    }
}
