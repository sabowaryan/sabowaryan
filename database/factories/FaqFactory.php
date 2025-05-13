<?php

namespace Database\Factories;

use App\Models\Faq;
use App\Models\Tutorial;
use Illuminate\Database\Eloquent\Factories\Factory;

class FaqFactory extends Factory
{
    protected $model = Faq::class;

    public function definition(): array
    {
        return [
            'tutorial_id' => Tutorial::factory(),
            'question' => $this->faker->sentence,
            'answer' => $this->faker->paragraph,
            'order' => $this->faker->numberBetween(1, 100),
            'is_active' => true
        ];
    }

    public function inactive(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false
            ];
        });
    }
} 