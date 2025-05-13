<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $request): Response
    {
        // Valider le rôle dans l'URL si présent
        $role = $request->query('role');
        $allowedRoles = [RoleEnum::STUDENT->value, RoleEnum::INSTRUCTOR->value, RoleEnum::CLIENT->value];
        
        if ($role && !in_array($role, $allowedRoles)) {
            return redirect()->route('register');
        }

        return Inertia::render('auth/register', [
            'initialRole' => $role
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'string', 'in:'.implode(',', [
                RoleEnum::STUDENT->value,
                RoleEnum::INSTRUCTOR->value,
                RoleEnum::CLIENT->value
            ])],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Attribuer le rôle spécifié
        $user->assignRole($request->role);

        event(new Registered($user));

        Auth::login($user);

        // Redirection en fonction du rôle
        return match($request->role) {
            RoleEnum::STUDENT->value => to_route('student.dashboard'),
            RoleEnum::INSTRUCTOR->value => to_route('instructor.dashboard'),
            RoleEnum::CLIENT->value => to_route('client.dashboard'),
            default => to_route('dashboard'),
        };
    }
}
