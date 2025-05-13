<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorialPrerequisite extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutorial_id',
        'title',
        'level',
        'order'
    ];

    protected $casts = [
        'order' => 'integer'
    ];

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
} 