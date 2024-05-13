<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserById($id)
    {
        $user = User::with('roles')->findOrFail($id);

        return response()->json($user);
    }

    public function getUsers()
    {
        $users = User::query()->orderBy('name')->get();
        return response()->json($users);
    }

    public function updateUser(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$id,
        ]);

        $user = User::findOrFail($id);

        // Update:
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];

        $user->save();

        return response()->json(['message' => 'User profile updated successfully']);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
