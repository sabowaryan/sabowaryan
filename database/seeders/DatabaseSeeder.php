<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer l'utilisateur test
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        $this->call([
            PostSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            TutorialSeeder::class,
        ]);
    }
}
