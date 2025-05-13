<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tutorial extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'is_premium',
        'price',
        'duration',
        'level',
        'author_id',
        'tags',
        'views_count',
        'completions_count',
        'rating',
        'reviews_count',
        'is_featured',
        'is_published',
        'published_at'
    ];

    protected $casts = [
        'is_premium' => 'boolean',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'price' => 'decimal:2',
        'rating' => 'decimal:2',
        'tags' => 'array',
        'published_at' => 'datetime'
    ];

    /**
     * Relation polymorphique avec les catégories
     */
    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }

    /**
     * Relation avec la catégorie principale
     * Cette méthode est maintenue pour la rétrocompatibilité
     */
    public function category()
    {
        return $this->categories()->first();
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function faqs()
    {
        return $this->hasMany(Faq::class);
    }

    public function prerequisites()
    {
        return $this->hasMany(TutorialPrerequisite::class);
    }

    public function objectives()
    {
        return $this->hasMany(TutorialObjective::class);
    }

    public function progress()
    {
        return $this->hasMany(TutorialProgress::class);
    }

    /**
     * Relation avec les étudiants qui suivent le tutoriel
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'tutorial_progress', 'tutorial_id', 'user_id')
            ->withPivot(['progress', 'is_completed', 'completed_at'])
            ->withTimestamps();
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopePremium($query)
    {
        return $query->where('is_premium', true);
    }

    public function scopeFree($query)
    {
        return $query->where('is_premium', false);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }
} 