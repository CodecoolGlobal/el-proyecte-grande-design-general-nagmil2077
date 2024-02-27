<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout(): \Illuminate\Http\JsonResponse
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
