<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Tableau associatif des rôles et leurs routes correspondantes
        $roleRoutes = [
            RoleEnum::SUPER_ADMIN->value => 'super-admin.dashboard',
            RoleEnum::ADMIN->value => 'admin.dashboard',
            RoleEnum::APPRENTICE->value => 'apprentice.dashboard',
        ];
        
        // Trouver le premier rôle correspondant
        foreach ($roleRoutes as $role => $routeName) {
            if ($user->hasRole($role)) {
                return redirect()->intended(route($routeName, absolute: false));
            }
        }
        
        // Par défaut, on considère que c'est un client
        return redirect()->intended(route('client.dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
