<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $userWithRole = $user ? [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $this->getUserHighestRole($user),
        ] : null;

        // Récupérer la locale actuelle
        // Utiliser la locale de l'application si aucune autre n'est définie
        $locale = app()->getLocale() ?: config('app.fallback_locale');
        
        // Utiliser la fonction lang() pour charger les traductions
        // La fonction va automatiquement gérer le cache et les erreurs
        $translations = lang($locale);
        
      

        // Préparer le tableau de données partagées
        $shared = [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $userWithRole,
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'translations' => [
                $locale => $translations
            ],
            'locale' => $locale,
        ];
        
      
        return $shared;
    }

    /**
     * Récupère le rôle le plus élevé de l'utilisateur.
     * 
     * @param \App\Models\User $user
     * @return string|null
     */
    protected function getUserHighestRole($user): ?string
    {
        if (!$user) {
            return null;
        }

        $roles = [
            'Super Admin',
            'Admin',
            'Apprentice',
            'Client',
        ];

        foreach ($roles as $role) {
            if ($user->hasRole($role)) {
                return $role;
            }
        }

        return 'Client'; // Rôle par défaut
    }
}
