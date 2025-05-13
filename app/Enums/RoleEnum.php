<?php

namespace App\Enums;

enum RoleEnum: string
{
    case STUDENT = 'student';
    case INSTRUCTOR = 'instructor';
    case CLIENT = 'client';
    case ADMIN = 'admin';
    case SUPER_ADMIN = 'super_admin';
    
    /**
     * Récupère la description française du rôle
     * 
     * @return string
     */
    public function getDescription(): string
    {
        return match($this) {
            self::STUDENT => 'Étudiant',
            self::INSTRUCTOR => 'Instructeur',
            self::CLIENT => 'Client',
            self::ADMIN => 'Administrateur',
            self::SUPER_ADMIN => 'Super Administrateur',
        };
    }
    
    /**
     * Récupère toutes les permissions par défaut associées à ce rôle
     * 
     * @return array
     */
    public function getDefaultPermissions(): array
    {
        return match($this) {
            self::STUDENT => [
                // Permissions de base
                PermissionEnum::VIEW_CONTENT,
                // Permissions d'apprentissage
                PermissionEnum::ACCESS_COURSES,
                PermissionEnum::COMPLETE_COURSES,
            ],
            self::INSTRUCTOR => [
                // Permissions de base
                PermissionEnum::VIEW_CONTENT,
                // Permissions de contenu
                PermissionEnum::CREATE_CONTENT,
                PermissionEnum::EDIT_CONTENT,
                // Permissions d'apprentissage
                PermissionEnum::ACCESS_COURSES,
                PermissionEnum::COMPLETE_COURSES,
            ],
            self::CLIENT => [
                // Permissions de base
                PermissionEnum::VIEW_CONTENT,
                // Permissions client
                ...PermissionEnum::getClientPermissions(),
            ],
            self::ADMIN => [
                // Permissions utilisateurs
                ...PermissionEnum::getUserPermissions(),
                // Permissions de contenu
                ...PermissionEnum::getContentPermissions(),
                // Permissions d'apprentissage
                ...PermissionEnum::getLearningPermissions(),
                // Permissions administratives
                PermissionEnum::MANAGE_SETTINGS,
            ],
            self::SUPER_ADMIN => [
                // Toutes les permissions
                ...PermissionEnum::getUserPermissions(),
                ...PermissionEnum::getContentPermissions(),
                ...PermissionEnum::getAdminPermissions(),
                ...PermissionEnum::getLearningPermissions(),
                ...PermissionEnum::getClientPermissions(),
            ],
        };
    }
    
    /**
     * Vérifie si le rôle est un rôle administratif
     * 
     * @return bool
     */
    public function isAdmin(): bool
    {
        return in_array($this, [self::ADMIN, self::SUPER_ADMIN]);
    }
    
    /**
     * Récupère les rôles disponibles pour l'inscription
     * 
     * @return array
     */
    public static function getRegistrationRoles(): array
    {
        return [
            self::STUDENT,
            self::INSTRUCTOR,
            self::CLIENT,
        ];
    }
    
    /**
     * Récupère tous les rôles triés par niveau de privilège
     * 
     * @return array
     */
    public static function getAllSorted(): array
    {
        return [
            self::STUDENT,
            self::INSTRUCTOR,
            self::CLIENT,
            self::ADMIN,
            self::SUPER_ADMIN,
        ];
    }
} 