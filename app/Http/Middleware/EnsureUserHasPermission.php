<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(403, 'Accès non autorisé.');
        }

        // Utilisation de la méthode du trait HasRole
        if (!$user->hasPermission($permission)) {
            abort(403, 'Vous n\'avez pas la permission nécessaire pour accéder à cette ressource.');
        }

        return $next($request);
    }
} 