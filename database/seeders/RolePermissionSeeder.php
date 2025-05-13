<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer tous les rôles
        $clientRole = Role::where('name', RoleEnum::CLIENT->value)->first();
        $apprenticeRole = Role::where('name', RoleEnum::APPRENTICE->value)->first();
        $adminRole = Role::where('name', RoleEnum::ADMIN->value)->first();
        $superAdminRole = Role::where('name', RoleEnum::SUPER_ADMIN->value)->first();

        // Permissions pour les clients
        $clientPermissions = [
            PermissionEnum::VIEW_CONTENT->value,
        ];

        // Permissions pour les apprenants
        $apprenticePermissions = [
            PermissionEnum::VIEW_CONTENT->value,
            PermissionEnum::ACCESS_COURSES->value,
            PermissionEnum::COMPLETE_COURSES->value,
        ];

        // Permissions pour les admins
        $adminPermissions = [
            PermissionEnum::VIEW_USERS->value,
            PermissionEnum::CREATE_USERS->value,
            PermissionEnum::EDIT_USERS->value,
            PermissionEnum::VIEW_CONTENT->value,
            PermissionEnum::CREATE_CONTENT->value,
            PermissionEnum::EDIT_CONTENT->value,
            PermissionEnum::DELETE_CONTENT->value,
            PermissionEnum::ACCESS_COURSES->value,
            PermissionEnum::COMPLETE_COURSES->value,
        ];

        // Super Admin a toutes les permissions
        $allPermissions = Permission::all()->pluck('name')->toArray();

        // Attribuer les permissions aux rôles
        $this->attachPermissionsToRole($clientRole, $clientPermissions);
        $this->attachPermissionsToRole($apprenticeRole, $apprenticePermissions);
        $this->attachPermissionsToRole($adminRole, $adminPermissions);
        $this->attachPermissionsToRole($superAdminRole, $allPermissions);
    }

    /**
     * Attribuer des permissions à un rôle.
     */
    private function attachPermissionsToRole(Role $role, array $permissionNames): void
    {
        $permissions = Permission::whereIn('name', $permissionNames)->get();
        $role->permissions()->attach($permissions);
    }
} 