<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'status', // draft, published
        'author_id',
        'published_at',
        'reading_time',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'is_featured',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
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

    /**
     * Relation avec l'auteur
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Accesseur pour formater la date de publication
     */
    protected function formattedDate(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->published_at) return null;
                return $this->published_at->locale('fr')->isoFormat('LL');
            },
        );
    }

    /**
     * Accesseur pour récupérer l'url de l'article
     */
    protected function url(): Attribute
    {
        return Attribute::make(
            get: function () {
                return route('blog.show', $this->slug);
            },
        );
    }

    /**
     * Accesseur pour obtenir une version tronquée du contenu
     */
    protected function contentSummary(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->excerpt ?: Str::limit(strip_tags($this->content), 150);
            },
        );
    }
    
    /**
     * Accesseur pour obtenir le titre méta (ou le titre normal s'il n'existe pas)
     */
    protected function seoTitle(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->meta_title ?: $this->title;
            },
        );
    }
    
    /**
     * Accesseur pour obtenir la description méta (ou l'extrait s'il n'existe pas)
     */
    protected function seoDescription(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->meta_description ?: $this->contentSummary;
            },
        );
    }
} 