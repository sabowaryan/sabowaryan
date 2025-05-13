<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Tutorial;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChapterFactory extends Factory
{
    protected $model = Chapter::class;

    public function definition(): array
    {
        return [
            'tutorial_id' => Tutorial::factory(),
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'duration' => $this->faker->numberBetween(5, 60),
            'is_free' => $this->faker->boolean(30),
            'video_url' => $this->faker->url,
            'difficulty' => $this->faker->randomElement(['Débutant', 'Intermédiaire', 'Avancé']),
            'skills' => $this->faker->words(3),
            'order' => $this->faker->numberBetween(1, 100),
            'is_published' => true,
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now')
        ];
    }

    public function free(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_free' => true
            ];
        });
    }

    public function premium(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_free' => false
            ];
        });
    }

    public function draft(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_published' => false,
                'published_at' => null
            ];
        });
    }
} 