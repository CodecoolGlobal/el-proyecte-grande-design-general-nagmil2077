<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserMachineSkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void


    {
        // Assuming you have 10 users and 5 machines
        $users = range(1, 11);
        $machines = range(1, 5);

        foreach ($users as $user) {
            foreach ($machines as $machine) {
                if (rand(0, 1)) {
                    DB::table('user_machine_skills')->insert([
                        'user_id' => $user,
                        'machine_id' => $machine,
                    ]);
                }
            }
        }
    }
}
