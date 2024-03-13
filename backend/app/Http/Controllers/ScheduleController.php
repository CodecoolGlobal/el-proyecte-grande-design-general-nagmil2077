<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller
{
    public function availableUsers(Request $request)
    {
        $machineId = $request->query('machineId');
        $selectedHour = $request->query('hour');
        $dateAndHour = Carbon::parse($selectedHour);

        $availableUsers = User::whereHas('userMachineSkills', function ($query) use ($machineId) {
            $query->where('machine_id', $machineId);
        })
            ->whereDoesntHave('schedules', function ($query) use ($dateAndHour) {
                $query->where('dateAndHour', $dateAndHour)->where('user', '!=', null);
            })
            ->get(['id', 'name']);

        return response()->json($availableUsers);
    }
    public function assignUser(Request $request)
    {
        $validated = $request->validate([
            'userId' => 'required|string',
            'machineId' => 'required|integer',
            'hour' => 'required|string',
        ]);

        $dateAndHour = Carbon::parse($validated['hour']);

        $schedule = Schedule::query()->create([
            'dateAndHour' => $dateAndHour,
            'user' => $validated['userId'],
            'machine' => $validated['machineId'],
        ]);
        Log::debug('User ID: ' . $validated['userId']);
        Log::debug('Machine ID: ' . $validated['machineId']);
        Log::debug('Hour: ' . $validated['hour']);
        Log::debug('Date and Hour: ' . $dateAndHour);

        return response()->json($schedule, 201);
    }
}
