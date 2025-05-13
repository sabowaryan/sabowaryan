<?php

namespace Database\Factories;

use App\Models\Tutorial;
use App\Models\TutorialObjective;
use Illuminate\Database\Eloquent\Factories\Factory;

class TutorialObjectiveFactory extends Factory
{
    protected $model = TutorialObjective::class;

    public function definition(): array
    {
        return [
            'tutorial_id' => Tutorial::factory(),
            'objective' => $this->faker->sentence,
            'order' => $this->faker->numberBetween(1, 10)
        ];
    }
} 