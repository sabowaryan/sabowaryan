<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TutorialProgressController extends Controller
{
    public function update(Request $request, Tutorial $tutorial)
{
    $user = auth()->user();
    
    $progress = TutorialProgress::updateOrCreate(
        [
            'user_id' => $user->id,
            'tutorial_id' => $tutorial->id
        ],
        [
            'completed_chapters' => $request->completed_chapters,
            'video_progress' => $request->video_progress,
            'current_chapter' => $request->current_chapter
        ]
    );
    
    return response()->json($progress);
}
}
