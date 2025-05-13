<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // Permissions utilisateurs
    case VIEW_USERS = 'view users';
    case CREATE_USERS = 'create users';
    case EDIT_USERS = 'edit users';
    case DELETE_USERS = 'delete users';
    
    // Permissions de contenu
    case VIEW_CONTENT = 'view content';
    case CREATE_CONTENT = 'create content';
    case EDIT_CONTENT = 'edit content';
    case DELETE_CONTENT = 'delete content';
    
    // Permissions administratives
    case MANAGE_ROLES = 'manage roles';
    case MANAGE_PERMISSIONS = 'manage permissions';
    case MANAGE_SETTINGS = 'manage settings';
    
    // Permissions d'apprentissage
    case ACCESS_COURSES = 'access courses';
    case COMPLETE_COURSES = 'complete courses';
    
    // Permissions client
    case CREATE_PROJECT_REQUEST = 'create project request';
    case MANAGE_PROJECT_REQUEST = 'manage project request';
    case VIEW_PROJECT_STATUS = 'view project status';
    case UPLOAD_PROJECT_FILES = 'upload project files';
    case PROVIDE_PROJECT_FEEDBACK = 'provide project feedback';
    
    /**
     * Récupère toutes les permissions utilisateurs
     * 
     * @return array
     */
    public static function getUserPermissions(): array
    {
        return [
            self::VIEW_USERS,
            self::CREATE_USERS,
            self::EDIT_USERS,
            self::DELETE_USERS,
        ];
    }
    
    /**
     * Récupère toutes les permissions de contenu
     * 
     * @return array
     */
    public static function getContentPermissions(): array
    {
        return [
            self::VIEW_CONTENT,
            self::CREATE_CONTENT,
            self::EDIT_CONTENT,
            self::DELETE_CONTENT,
        ];
    }
    
    /**
     * Récupère toutes les permissions administratives
     * 
     * @return array
     */
    public static function getAdminPermissions(): array
    {
        return [
            self::MANAGE_ROLES,
            self::MANAGE_PERMISSIONS,
            self::MANAGE_SETTINGS,
        ];
    }
    
    /**
     * Récupère toutes les permissions d'apprentissage
     * 
     * @return array
     */
    public static function getLearningPermissions(): array
    {
        return [
            self::ACCESS_COURSES,
            self::COMPLETE_COURSES,
        ];
    }

    /**
     * Récupère toutes les permissions client
     * 
     * @return array
     */
    public static function getClientPermissions(): array
    {
        return [
            self::CREATE_PROJECT_REQUEST,
            self::MANAGE_PROJECT_REQUEST,
            self::VIEW_PROJECT_STATUS,
            self::UPLOAD_PROJECT_FILES,
            self::PROVIDE_PROJECT_FEEDBACK,
        ];
    }
    
    /**
     * Récupère la description lisible d'une permission
     * 
     * @return string
     */
    public function getDescription(): string
    {
        return match($this) {
            // Permissions utilisateurs
            self::VIEW_USERS => 'Voir les utilisateurs',
            self::CREATE_USERS => 'Créer des utilisateurs',
            self::EDIT_USERS => 'Modifier les utilisateurs',
            self::DELETE_USERS => 'Supprimer des utilisateurs',
            
            // Permissions de contenu
            self::VIEW_CONTENT => 'Voir le contenu',
            self::CREATE_CONTENT => 'Créer du contenu',
            self::EDIT_CONTENT => 'Modifier le contenu',
            self::DELETE_CONTENT => 'Supprimer du contenu',
            
            // Permissions administratives
            self::MANAGE_ROLES => 'Gérer les rôles',
            self::MANAGE_PERMISSIONS => 'Gérer les permissions',
            self::MANAGE_SETTINGS => 'Gérer les paramètres',
            
            // Permissions d'apprentissage
            self::ACCESS_COURSES => 'Accéder aux cours',
            self::COMPLETE_COURSES => 'Compléter des cours',
            
            // Permissions client
            self::CREATE_PROJECT_REQUEST => 'Créer une demande de projet',
            self::MANAGE_PROJECT_REQUEST => 'Gérer sa demande de projet',
            self::VIEW_PROJECT_STATUS => 'Voir l\'état d\'avancement du projet',
            self::UPLOAD_PROJECT_FILES => 'Télécharger des fichiers pour le projet',
            self::PROVIDE_PROJECT_FEEDBACK => 'Fournir des retours sur le projet',
        };
    }
} 