<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'color',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    /**
     * Relation polymorphique avec les tutoriels
     */
    public function tutorials(): MorphToMany
    {
        return $this->morphedByMany(Tutorial::class, 'categorizable');
    }

    /**
     * Accesseur pour obtenir le nombre de tutoriels
     */
    public function getTutorialsCountAttribute()
    {
        return $this->tutorials()->count();
    }

    /**
     * Relation polymorphique avec les posts
     */
    public function posts(): MorphToMany
    {
        return $this->morphedByMany(Post::class, 'categorizable');
    }

    /**
     * Relation polymorphique avec les utilisateurs (exemple)
     */
    public function users(): MorphToMany
    {
        return $this->morphedByMany(User::class, 'categorizable');
    }

    /**
     * Relation générique pour tous les modèles catégorisables
     */
    public function categorizables(string $type): MorphToMany
    {
        return $this->morphedByMany($type, 'categorizable');
    }

    /**
     * Accesseur pour récupérer l'url de la catégorie
     */
    protected function url(): Attribute
    {
        return Attribute::make(
            get: function () {
                return route('blog.index', ['category' => $this->slug]);
            },
        );
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
} 