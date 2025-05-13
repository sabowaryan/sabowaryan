<?php

namespace Database\Factories;

use App\Models\Tutorial;
use App\Models\TutorialPrerequisite;
use Illuminate\Database\Eloquent\Factories\Factory;

class TutorialPrerequisiteFactory extends Factory
{
    protected $model = TutorialPrerequisite::class;

    public function definition(): array
    {
        return [
            'tutorial_id' => Tutorial::factory(),
            'title' => $this->faker->sentence,
            'level' => $this->faker->randomElement(['Débutant', 'Intermédiaire', 'Avancé']),
            'order' => $this->faker->numberBetween(1, 10)
        ];
    }
} 