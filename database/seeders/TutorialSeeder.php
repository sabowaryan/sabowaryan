<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Chapter;
use App\Models\Faq;
use App\Models\Resource;
use App\Models\Review;
use App\Models\Tutorial;
use App\Models\TutorialObjective;
use App\Models\TutorialPrerequisite;
use App\Models\User;
use Illuminate\Database\Seeder;

class TutorialSeeder extends Seeder
{
    public function run(): void
    {
        // Créer les catégories
        $categories = Category::factory()->count(7)->create();

        // Créer les utilisateurs (auteurs)
        $authors = User::factory()->count(5)->create();

        // Créer les tutoriels
        foreach ($categories as $category) {
            for ($i = 0; $i < 3; $i++) {
                $tutorial = Tutorial::factory()->create([
                    'author_id' => $authors->random()->id,
                ]);

                // Associer la catégorie au tutoriel
                $tutorial->categories()->attach($category);

                // Créer les chapitres
                Chapter::factory()->count(5)->create([
                    'tutorial_id' => $tutorial->id
                ]);

                // Créer les ressources
                Resource::factory()->count(3)->create([
                    'tutorial_id' => $tutorial->id
                ]);

                // Créer les avis
                Review::factory()->count(5)->create([
                    'tutorial_id' => $tutorial->id
                ]);

                // Créer les FAQs
                Faq::factory()->count(3)->create([
                    'tutorial_id' => $tutorial->id
                ]);

                // Créer les prérequis
                TutorialPrerequisite::factory()->count(3)->create([
                    'tutorial_id' => $tutorial->id
                ]);

                // Créer les objectifs
                TutorialObjective::factory()->count(3)->create([
                    'tutorial_id' => $tutorial->id
                ]);
            }
        }
    }
} 