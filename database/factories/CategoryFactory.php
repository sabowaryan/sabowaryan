<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph,
            'icon' => $this->faker->randomElement(['monitor', 'server', 'settings', 'smartphone', 'bar-chart', 'check-circle', 'code']),
            'color' => $this->faker->randomElement(['blue', 'purple', 'orange', 'green', 'red', 'teal', 'indigo']),
            'is_active' => true
        ];
    }
} 