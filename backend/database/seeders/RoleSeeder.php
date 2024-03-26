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

        $createUsersPermission = Permission::create(['name' => 'create users']);
        $manageUsersPermission = Permission::create(['name' => 'manage users']);
        $assignSchedulePermission = Permission::create(['name' => 'assign schedule']);
        $updateProfilePermission = Permission::create(['name' => 'update profile']);

        $adminPermissions = [
            $createUsersPermission,
            $manageUsersPermission,
            $assignSchedulePermission,
            $updateProfilePermission
        ];

        $user->givePermissionTo($updateProfilePermission);
        $admin->syncPermissions($adminPermissions);
    }
}
