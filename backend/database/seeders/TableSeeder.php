<?php

namespace Database\Seeders;

use App\Models\Models\Machine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $position = [
            "Cashier",
            "Cook",
            "Server",
            "Manager",
            "Cleaner"
        ];
        foreach ($position as $machine){
            Machine::create(['name' => $machine],);
        }
    }
}
