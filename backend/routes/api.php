<?php

use App\Http\Controllers\ScheduleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MachineController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users/{id}', [UserController::class, 'getUserById']);
    Route::post('/logout', [LogoutController::class, 'logout']);
    Route::get('/available-users', [ScheduleController::class, 'availableUsers']);
    Route::post('/assign-user', [ScheduleController::class, 'assignUser']);
});

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/machinenames', [MachineController::class, 'getNames']);
