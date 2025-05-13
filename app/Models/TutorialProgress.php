<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorialProgress extends Model
{
    use HasFactory;

    protected $table = 'tutorial_progress';

    protected $fillable = [
        'user_id',
        'tutorial_id',
        'chapter_id',
        'progress',
        'last_position',
        'is_completed',
        'completed_at'
    ];

    protected $casts = [
        'progress' => 'integer',
        'last_position' => 'integer',
        'is_completed' => 'boolean',
        'completed_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }

    public function scopeInProgress($query)
    {
        return $query->where('is_completed', false)
                    ->where('progress', '>', 0);
    }

    public function markAsCompleted()
    {
        $this->update([
            'is_completed' => true,
            'progress' => 100,
            'completed_at' => now()
        ]);
    }
} 