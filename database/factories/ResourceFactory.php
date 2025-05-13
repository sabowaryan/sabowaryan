<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Resource;
use App\Models\Tutorial;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResourceFactory extends Factory
{
    protected $model = Resource::class;

    public function definition(): array
    {
        $type = $this->faker->randomElement(['pdf', 'zip', 'code']);
        return [
            'tutorial_id' => Tutorial::factory(),
            'chapter_id' => Chapter::factory(),
            'title' => $this->faker->sentence(3),
            'type' => $type,
            'file_path' => 'resources/' . $this->faker->uuid . '.' . $type,
            'file_size' => $this->faker->numberBetween(100, 10000) . ' KB',
            'download_count' => $this->faker->numberBetween(0, 1000),
            'is_free' => $this->faker->boolean(30)
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

    public function pdf(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'pdf',
                'file_path' => 'resources/' . $this->faker->uuid . '.pdf'
            ];
        });
    }

    public function zip(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'zip',
                'file_path' => 'resources/' . $this->faker->uuid . '.zip'
            ];
        });
    }

    public function code(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'code',
                'file_path' => 'resources/' . $this->faker->uuid . '.zip'
            ];
        });
    }
} 