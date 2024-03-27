<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUserById($id)
    {
        $user = User::with('roles')->findOrFail($id);

        return response()->json($user);
    }
}
