<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordChangeController extends Controller
{
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'messages' => $validator->errors()], 422);
        }

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

            if (!Hash::check($request->input('current_password'), $user->password)) {
                return response()->json(['error' => 'Current password is incorrect'], 400);
            }
            $user->password = Hash::make($request->input('new_password'));
            $user->save();

            return response()->json(['message' => 'Password changed successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to decode JWT', 'message' => $e->getMessage()], 400);
        }
    }
}
