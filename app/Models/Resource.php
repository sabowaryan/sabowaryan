<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resource extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'tutorial_id',
        'chapter_id',
        'title',
        'type',
        'file_path',
        'file_size',
        'download_count',
        'is_free'
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'download_count' => 'integer'
    ];

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function scopeFree($query)
    {
        return $query->where('is_free', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }
} 