<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Chapter;
use App\Models\Faq;
use App\Models\Resource;
use App\Models\Review;
use App\Models\Tutorial;
use App\Models\TutorialObjective;
use App\Models\TutorialPrerequisite;
use App\Models\TutorialProgress;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TutorialController extends Controller
{
    /**
     * Affiche la liste des tutoriels
     */
    public function index()
    {
        $tutorials = Tutorial::with([
            'categories',
            'author',
            'chapters',
            'resources',
            'reviews'
        ])
        ->withCount(['chapters', 'resources', 'reviews'])
        ->published()
        ->latest()
        ->paginate(9)
        ->through(function ($tutorial) {
            $tutorial->stats = [
                'chapters' => $tutorial->chapters_count,
                'resources' => $tutorial->resources_count,
                'reviews' => $tutorial->reviews_count,
                'rating' => $tutorial->rating,
                'views' => $tutorial->views_count,
                'completions' => $tutorial->completions_count
            ];
            return $tutorial;
        });

        $categories = Category::withCount(['tutorials' => function($query) {
            $query->published();
        }])
        ->where('is_active', true)
        ->get();

        $featuredTutorial = Tutorial::with([
            'categories',
            'author',
            'chapters',
            'resources',
            'reviews'
        ])
        ->withCount(['chapters', 'resources', 'reviews'])
        ->featured()
        ->published()
        ->latest()
        ->first();

        // Calculer les statistiques pour le tutoriel mis en avant
        if ($featuredTutorial) {
            $featuredTutorial->stats = [
                'chapters' => $featuredTutorial->chapters_count,
                'resources' => $featuredTutorial->resources_count,
                'reviews' => $featuredTutorial->reviews_count,
                'rating' => $featuredTutorial->rating,
                'views' => $featuredTutorial->views_count,
                'completions' => $featuredTutorial->completions_count
            ];
        }
        
        return Inertia::render('tutorials/index', [
            'tutorials' => $tutorials,
            'categories' => $categories,
            'featuredTutorial' => $featuredTutorial,
            'stats' => [
                'totalTutorials' => Tutorial::published()->count(),
                'freeTutorials' => Tutorial::published()->where('is_premium', false)->count(),
                'premiumTutorials' => Tutorial::published()->where('is_premium', true)->count(),
            ]
        ]);
    }

    /**
     * Affiche un tutoriel spécifique
     */
    public function show($slug)
    {
        $tutorial = Tutorial::with([
            'categories',
            'author',
            'chapters' => function ($query) {
                $query->published()->ordered();
            },
            'prerequisites' => function ($query) {
                $query->ordered();
            },
            'objectives' => function ($query) {
                $query->ordered();
            },
            'resources',
            'faqs' => function ($query) {
                $query->active()->ordered();
            },
            'reviews' => function ($query) {
                $query->with('user')->latest();
            }
        ])
        ->withCount(['chapters', 'resources', 'reviews', 'students'])
        ->where('slug', $slug)
        ->firstOrFail();

        // Incrémenter le compteur de vues
        $tutorial->increment('views_count');

        // Ajouter les statistiques au tutoriel
        $tutorial->stats = [
            'chapters' => $tutorial->chapters_count,
            'resources' => $tutorial->resources_count,
            'reviews' => $tutorial->reviews_count,
            'rating' => $tutorial->rating,
            'views' => $tutorial->views_count,
            'completions' => $tutorial->completions_count,
            'students' => $tutorial->students_count ?? 0,
            'reviews_count' => $tutorial->reviews_count
        ];

        // Récupérer les tutoriels similaires
        $relatedTutorials = Tutorial::with(['categories', 'author'])
            ->whereHas('categories', function($query) use ($tutorial) {
                $query->whereIn('categories.id', $tutorial->categories->pluck('id'));
            })
            ->where('id', '!=', $tutorial->id)
            ->published()
            ->take(3)
            ->get();

        return Inertia::render('tutorials/show', [
            'tutorial' => $tutorial,
            'relatedTutorials' => $relatedTutorials
        ]);
    }

    /**
     * Renvoie les données pour l'API
     */
    public function getTutorials()
    {
        $tutorials = Tutorial::with(['category', 'author'])
            ->published()
            ->latest()
            ->get();

        return response()->json($tutorials);
    }

    /**
     * Télécharge une ressource
     */
    public function downloadResource(Tutorial $tutorial, $resourceId)
    {
        // Vérifier si l'utilisateur a accès au tutoriel
        if (!$tutorial->isAccessibleBy(auth()->user())) {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        // Trouver la ressource
        $resource = $tutorial->resources()->findOrFail($resourceId);

        // Vérifier si le fichier existe
        $filePath = storage_path('app/public/tutorials/' . $tutorial->id . '/resources/' . $resource->file_path);
        if (!file_exists($filePath)) {
            return response()->json(['message' => 'Fichier non trouvé'], 404);
        }

        // Incrémenter le compteur de téléchargements
        $resource->incrementDownloadCount();

        // Retourner le fichier
        return response()->download($filePath, $resource->title);
    }

    /**
     * Récupère la progression de l'utilisateur pour un tutoriel
     */
    public function getUserProgress($tutorialId)
    {
        $progress = TutorialProgress::with('chapter')
            ->where('tutorial_id', $tutorialId)
            ->where('user_id', auth()->id())
            ->get();

        $completedChapters = $progress->where('is_completed', true)->pluck('chapter_id');
        $currentChapter = $progress->where('is_completed', false)->first();

        return response()->json([
            'completedChapters' => $completedChapters,
            'videoProgress' => $currentChapter ? [
                'chapterId' => $currentChapter->chapter_id,
                'progress' => $currentChapter->progress,
                'lastPosition' => $currentChapter->last_position
            ] : null,
            'downloadedResources' => auth()->user()->downloadedResources()
                ->where('tutorial_id', $tutorialId)
                ->pluck('id'),
            'lastAccessed' => $progress->max('updated_at')
        ]);
    }

    /**
     * Met à jour la progression de l'utilisateur pour un tutoriel
     */
    public function updateUserProgress(Request $request, $tutorialId)
    {
        $data = $request->validate([
            'chapterId' => 'required|integer',
            'progress' => 'required|integer|min:0|max:100',
            'completed' => 'boolean',
            'lastPosition' => 'integer'
        ]);

        $progress = TutorialProgress::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'tutorial_id' => $tutorialId,
                'chapter_id' => $data['chapterId']
            ],
            [
                'progress' => $data['progress'],
                'last_position' => $data['lastPosition'] ?? null,
                'is_completed' => $data['completed'] ?? false,
                'completed_at' => $data['completed'] ? now() : null
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Progression mise à jour avec succès',
            'data' => $progress
        ]);
    }

    /**
     * Marque un chapitre comme complété
     */
    public function completeChapter(Request $request, $tutorialId)
    {
        $data = $request->validate([
            'chapterId' => 'required|integer'
        ]);

        $progress = TutorialProgress::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'tutorial_id' => $tutorialId,
                'chapter_id' => $data['chapterId']
            ],
            [
                'is_completed' => true,
                'progress' => 100,
                'completed_at' => now()
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Chapitre marqué comme complété',
            'data' => $progress
        ]);
    }

    /**
     * Récupère les statistiques de progression pour un tutoriel
     */
    public function getTutorialProgressStats($tutorialId)
    {
        $tutorial = Tutorial::findOrFail($tutorialId);
        $progress = TutorialProgress::where('tutorial_id', $tutorialId)
            ->where('user_id', auth()->id())
            ->get();

        return response()->json([
            'totalChapters' => $tutorial->chapters()->count(),
            'completedChapters' => $progress->where('is_completed', true)->count(),
            'totalDuration' => $tutorial->chapters()->sum('duration'),
            'watchedDuration' => $progress->sum('progress') / 100 * $tutorial->chapters()->sum('duration'),
            'lastActivity' => $progress->max('updated_at'),
            'resourcesDownloaded' => auth()->user()->downloadedResources()
                ->where('tutorial_id', $tutorialId)
                ->count(),
            'totalResources' => $tutorial->resources()->count()
        ]);
    }

    /**
     * Marque un avis comme utile
     */
    public function markReviewAsHelpful($tutorialId, $reviewId)
    {
        $review = Review::where('tutorial_id', $tutorialId)
            ->findOrFail($reviewId);

        $review->incrementHelpfulCount();

        return response()->json([
            'success' => true,
            'message' => 'Avis marqué comme utile avec succès',
            'helpful_count' => $review->helpful_count
        ]);
    }

    /**
     * Répond à un avis
     */
    public function replyToReview(Request $request, $tutorialId, $reviewId)
    {
        $request->validate([
            'reply' => 'required|string|max:1000'
        ]);

        $review = Review::where('tutorial_id', $tutorialId)
            ->findOrFail($reviewId);

        $reply = $review->replies()->create([
            'user_id' => auth()->id(),
            'reply' => $request->reply
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réponse ajoutée avec succès',
            'reply' => $reply->load('user')
        ]);
    }
} 