<?php

namespace App\Traits;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasRole
{
    /**
     * Les rôles qui appartiennent à l'utilisateur.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Vérifie si l'utilisateur a un rôle spécifique.
     */
    public function hasRole(string $role): bool
    {
        return $this->roles()->where('name', $role)->exists();
    }

    /**
     * Vérifie si l'utilisateur a l'un des rôles donnés.
     */
    public function hasAnyRole(array $roles): bool
    {
        return $this->roles()->whereIn('name', $roles)->exists();
    }

    /**
     * Vérifie si l'utilisateur a tous les rôles donnés.
     */
    public function hasAllRoles(array $roles): bool
    {
        return $this->roles()->whereIn('name', $roles)->count() === count($roles);
    }

    /**
     * Attribue un ou plusieurs rôles à l'utilisateur.
     */
    public function assignRole(string|array $roles): self
    {
        $roles = is_string($roles) ? [$roles] : $roles;
        
        $roleIds = Role::whereIn('name', $roles)->pluck('id')->toArray();
        $this->roles()->syncWithoutDetaching($roleIds);
        
        return $this;
    }

    /**
     * Retire un ou plusieurs rôles à l'utilisateur.
     */
    public function removeRole(string|array $roles): self
    {
        $roles = is_string($roles) ? [$roles] : $roles;
        
        $roleIds = Role::whereIn('name', $roles)->pluck('id')->toArray();
        $this->roles()->detach($roleIds);
        
        return $this;
    }

    /**
     * Synchronise les rôles de l'utilisateur.
     */
    public function syncRoles(array $roles): self
    {
        $roleIds = Role::whereIn('name', $roles)->pluck('id')->toArray();
        $this->roles()->sync($roleIds);
        
        return $this;
    }

    /**
     * Vérifie si l'utilisateur a une permission spécifique via ses rôles.
     */
    public function hasPermission(string $permission): bool
    {
        return $this->roles()
            ->whereHas('permissions', function ($query) use ($permission) {
                $query->where('name', $permission);
            })
            ->exists();
    }

    /**
     * Vérifie si l'utilisateur a l'une des permissions données.
     */
    public function hasAnyPermission(array $permissions): bool
    {
        return $this->roles()
            ->whereHas('permissions', function ($query) use ($permissions) {
                $query->whereIn('name', $permissions);
            })
            ->exists();
    }

    /**
     * Vérifie si l'utilisateur a toutes les permissions données.
     */
    public function hasAllPermissions(array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if (!$this->hasPermission($permission)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Obtient toutes les permissions que l'utilisateur a via ses rôles.
     */
    public function getAllPermissions(): array
    {
        return $this->roles()
            ->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->pluck('name')
            ->unique()
            ->toArray();
    }

    /**
     * Vérifie si l'utilisateur a accès en fonction d'une permission donnée.
     */
    public function hasAccess(string $permission): bool
    {
        // Un super admin a toujours accès
        if ($this->hasRole('Super Admin')) {
            return true;
        }

        return $this->hasPermission($permission);
    }

    /**
     * Vérifie si l'utilisateur a accès en fonction d'un tableau de permissions.
     */
    public function hasAccessToAny(array $permissions): bool
    {
        // Un super admin a toujours accès
        if ($this->hasRole('Super Admin')) {
            return true;
        }

        return $this->hasAnyPermission($permissions);
    }

    /**
     * Cache les rôles et permissions pour réduire les requêtes à la base de données.
     */
    public function loadRolesAndPermissions(): self
    {
        if (!$this->relationLoaded('roles')) {
            $this->load('roles.permissions');
        }
        
        return $this;
    }
} 