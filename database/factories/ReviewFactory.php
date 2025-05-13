<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\Tutorial;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'tutorial_id' => Tutorial::factory(),
            'user_id' => User::factory(),
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->paragraphs(2, true),
            'helpful_count' => $this->faker->numberBetween(0, 100),
            'is_verified' => $this->faker->boolean(80)
        ];
    }

    public function verified(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => true
            ];
        });
    }

    public function unverified(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => false
            ];
        });
    }

    public function positive(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => $this->faker->numberBetween(4, 5)
            ];
        });
    }

    public function negative(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => $this->faker->numberBetween(1, 2)
            ];
        });
    }
} 