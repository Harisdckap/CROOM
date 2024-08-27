<?php


namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Firebase\JWT\JWT;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
            }
        

            $user = Auth::user();

            $key = env('JWT_SECRET');
            $payload = [
                'iss' => "your-issuer",  // Issuer of the token
                'sub' => $user->id,       // Subject of the token (user ID)
                'iat' => time(),          // Time when JWT was issued.
                'exp' => time() + 86400   // Expiration time: 24 hours from now
            ];
    
            $jwt = JWT::encode($payload, $key, 'HS256');
            return response()->json([
                'success' => true,
                'user' => $user,
                'access_token' => $jwt,
                'token_type' => 'Bearer'
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['success' => false, 'message' => 'Could not create token'], 500);
        }
    }


    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');
    //     $user = User::where('email', $credentials['email'])->first();

    //     if (!$user || !password_verify($credentials['password'], $user->password)) {
    //         return response()->json(['error' => 'Invalid credentials'], 401);
    //     }

    //     $key = env('JWT_SECRET');
    //     $payload = [
    //         'sub' => $user->id,
    //         'exp' => time() + 24 * 60 * 60 
    //     ];
    //     $token = JWT::encode($payload, $key, 'HS256');

    //     return response()->json([
    //                     'success' => true,
    //                     'user' => $user,
    //                     'user_id' => $user->id,
    //                     'access_token' => $token,
    //                     'token_type' => 'Bearer'
    //                 ]);
    // }
    // public function googleLogin()
    // {
    //     // Handle Google login here
    // }
}

