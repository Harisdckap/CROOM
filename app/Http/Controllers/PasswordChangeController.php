<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PasswordChangeController extends Controller
{
    public function changePassword(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $validator = Validator::make($request->all(), [
            'existingPassword' => 'required|string|min:8',
            'newPassword' => 'required|string|min:8|confirmed',
        ], [
            'existingPassword.required' => 'The existing password is required.',
            'newPassword.required' => 'The new password is required.',
            'newPassword.confirmed' => 'The new password confirmation does not match.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        if (Hash::check($request->existingPassword, $user->password)) {
            return response()->json(['errors' => ['existingPassword' => 'The existing password is incorrect.']], 400);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['message' => 'Password changed successfully.'], 200);
    }
}
