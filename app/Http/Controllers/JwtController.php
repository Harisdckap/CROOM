<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Log;

class JwtController extends Controller
{
    protected $key;

    public function __construct()
    {
        $this->key = config('app.jwt.secret');
        Log::info('JWT Key: ' . $this->key); 
    }

    public function decodeTokenQuery(Request $request)
    {
        $jwt = $request->query('token');
        return $this->decodeJwt($jwt);
    }

    private function decodeJwt($jwt)
    {
        try {
            // Ensure that the key is being passed correctly as a string
            $decoded = JWT::decode($jwt, new Key($this->key, 'HS256'));
            return response()->json($decoded);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to decode JWT', 'message' => $e->getMessage()], 400);
        }
    }
}
