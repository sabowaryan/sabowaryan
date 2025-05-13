<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (PermissionEnum::cases() as $permissionEnum) {
            Permission::create([
                'name' => $permissionEnum->value,
                'description' => 'Permission: ' . $permissionEnum->value,
            ]);
        }
    }
} 