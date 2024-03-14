<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $user = Role::create(['name' => 'user']);

        $create_users_permission = Permission::create(['name' => 'create users']);
        $manage_users_permission = Permission::create(['name' => 'manage users']);
        $assign_schedule_permission = Permission::create(['name' => 'assign schedule']);
        $update_profile_permission = Permission::create(['name' => 'update profile']);

        $adminPermissions = [
            $create_users_permission,
            $manage_users_permission,
            $assign_schedule_permission,
            $update_profile_permission
        ];

        $user->givePermissionTo($update_profile_permission);
        $admin->syncPermissions($adminPermissions);
    }
}
