<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employeeNames = [
            "John Smith",
            "Emily Johnson",
            "Michael Williams",
            "Emma Jones",
            "Daniel Brown",
            "Olivia Davis",
            "William Miller",
            "Sophia Wilson",
            "James Taylor",
            "Isabella Anderson"
        ];
        foreach ($employeeNames as $person){
            $user = User::create([
                'name' =>$person,
                'email' => strtolower(str_replace(' ', '.', $person)) . "@fakemail.com",
                'password' => Hash::make('password'),
            ]);

            $user->assignRole('user');
        }
    }
}
