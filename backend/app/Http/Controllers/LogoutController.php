<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout(): \Illuminate\Http\JsonResponse
    {
//        Auth::guard('web')->logout();
        $user = Auth::user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
