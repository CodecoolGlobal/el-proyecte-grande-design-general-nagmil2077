<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Machine;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    public function getNames(){
        $machines = Machine::all();
        return response()->json($machines);
    }
}
