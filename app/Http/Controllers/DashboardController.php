<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Redirige l'utilisateur vers le dashboard approprié selon son rôle.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        // Tableau associatif des rôles par priorité (du plus élevé au plus bas)
        $roleHandlers = [
            RoleEnum::SUPER_ADMIN->value => 'superAdminDashboard',
            RoleEnum::ADMIN->value => 'adminDashboard',
            RoleEnum::APPRENTICE->value => 'apprenticeDashboard',
        ];
        
        // Trouver le premier rôle correspondant
        foreach ($roleHandlers as $role => $handler) {
            if ($user->hasRole($role)) {
                return $this->$handler($request);
            }
        }
        
        // Par défaut, on considère que c'est un client
        return $this->clientDashboard($request);
    }

    /**
     * Affiche le dashboard pour les clients.
     */
    public function clientDashboard(Request $request): Response
    {
        // Données d'exemple pour les projets récents
        $recentProjects = [
            [
                'id' => 'PRJ-2024-001',
                'name' => 'Site e-commerce',
                'progress' => 75,
                'dueDate' => '2024-07-15',
                'status' => 'in_progress'
            ],
            [
                'id' => 'PRJ-2024-002',
                'name' => 'Application mobile',
                'progress' => 40,
                'dueDate' => '2024-08-30',
                'status' => 'in_progress'
            ],
            [
                'id' => 'PRJ-2024-003',
                'name' => 'Campagne marketing',
                'progress' => 90,
                'dueDate' => '2024-06-05',
                'status' => 'review'
            ]
        ];
        
        // Données d'exemple pour les statistiques
        $stats = [
            'projectsInProgress' => 3,
            'recentOrders' => 2,
            'unreadMessages' => 4,
            'unpaidInvoices' => 1250 // en euros
        ];
        
        // Données d'exemple pour l'activité récente
        $recentActivity = [
            [
                'id' => 'ACT-001',
                'type' => 'project_update',
                'title' => 'Mise à jour du projet',
                'description' => 'Le projet "Site e-commerce" est passé à 75% de progression',
                'date' => '2024-05-28',
                'link' => '/client/projects/PRJ-2024-001'
            ],
            [
                'id' => 'ACT-002',
                'type' => 'message',
                'title' => 'Nouveau message',
                'description' => 'Vous avez reçu un message de votre chef de projet',
                'date' => '2024-05-27',
                'link' => '/client/messages'
            ],
            [
                'id' => 'ACT-003',
                'type' => 'invoice',
                'title' => 'Nouvelle facture',
                'description' => 'Une facture de 750€ a été émise pour le projet "Application mobile"',
                'date' => '2024-05-26',
                'link' => '/client/billing/invoices/INV-2024-002'
            ],
            [
                'id' => 'ACT-004',
                'type' => 'support',
                'title' => 'Ticket de support résolu',
                'description' => 'Votre ticket concernant l\'accès au serveur de test a été résolu',
                'date' => '2024-05-25',
                'link' => '/client/support/tickets/TIK-001'
            ]
        ];
        
        return Inertia::render('client/dashboard', [
            'user' => $request->user(),
            'role' => 'Client',
            'stats' => $stats,
            'recentProjects' => $recentProjects,
            'recentActivity' => $recentActivity
        ]);
    }

    /**
     * Affiche le dashboard pour les apprenants.
     */
    public function apprenticeDashboard(Request $request): Response
    {
        return Inertia::render('apprentice/dashboard', [
            'user' => $request->user(),
            'role' => 'Apprentice',
            'courses' => [], // Vous pouvez ajouter les cours disponibles ici
        ]);
    }

    /**
     * Affiche le dashboard pour les administrateurs.
     */
    public function adminDashboard(Request $request): Response
    {
        return Inertia::render('admin/dashboard', [
            'user' => $request->user(),
            'role' => 'Admin',
            'stats' => [
                'users' => 0, // Nombre d'utilisateurs
                'apprentices' => 0, // Nombre d'apprenants
                'courses' => 0, // Nombre de cours
            ],
        ]);
    }

    /**
     * Affiche le dashboard pour les super administrateurs.
     */
    public function superAdminDashboard(Request $request): Response
    {
        return Inertia::render('super-admin/dashboard', [
            'user' => $request->user(),
            'role' => 'Super Admin',
            'stats' => [
                'users' => 0, // Nombre d'utilisateurs
                'roles' => 0, // Nombre de rôles
                'permissions' => 0, // Nombre de permissions
            ],
        ]);
    }
} 