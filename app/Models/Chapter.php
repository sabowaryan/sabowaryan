<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chapter extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'tutorial_id',
        'title',
        'description',
        'duration',
        'is_free',
        'video_url',
        'difficulty',
        'skills',
        'order',
        'is_published',
        'published_at'
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'is_published' => 'boolean',
        'skills' => 'array',
        'duration' => 'integer',
        'order' => 'integer',
        'published_at' => 'datetime'
    ];

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }

    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function progress()
    {
        return $this->hasMany(TutorialProgress::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeFree($query)
    {
        return $query->where('is_free', true);
    }

    public function scopeByDifficulty($query, $difficulty)
    {
        return $query->where('difficulty', $difficulty);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
} 