<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Support\Facades\App;

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

        // Exemple d'utilisation du helper lang() pour partager des traductions JSON
        $translations = [
            'subscribed' => lang('Subscribed!'),
            'error' => lang('An error occurred. Please try again.'),
        ];

        return [
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
            'locale' => App::getLocale(),
            'translations' => $translations,
        ];
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
