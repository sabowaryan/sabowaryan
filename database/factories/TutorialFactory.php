<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Tutorial;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TutorialFactory extends Factory
{
    protected $model = Tutorial::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(4);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(3, true),
            'image' => '/images/tutorials/' . $this->faker->image('public/images/tutorials', 800, 600, null, false),
            'is_premium' => $this->faker->boolean(30),
            'price' => $this->faker->randomFloat(2, 0, 99.99),
            'duration' => $this->faker->numberBetween(1, 8) . ' heures ' . $this->faker->numberBetween(0, 59) . ' min',
            'level' => $this->faker->randomElement(['Débutant', 'Intermédiaire', 'Avancé']),
            'author_id' => User::factory(),
            'tags' => $this->faker->words(5),
            'views_count' => $this->faker->numberBetween(100, 50000),
            'completions_count' => $this->faker->numberBetween(10, 5000),
            'rating' => $this->faker->randomFloat(1, 3, 5),
            'reviews_count' => $this->faker->numberBetween(0, 1000),
            'is_featured' => $this->faker->boolean(10),
            'is_published' => true,
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now')
        ];
    }

    public function premium(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_premium' => true,
                'price' => $this->faker->randomFloat(2, 19.99, 99.99)
            ];
        });
    }

    public function free(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_premium' => false,
                'price' => 0
            ];
        });
    }

    public function featured(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_featured' => true
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