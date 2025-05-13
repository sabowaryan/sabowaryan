<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Response;

class BlogController extends Controller
{
    /**
     * Affiche la liste des articles du blog
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        $query = Post::query()
            ->with('categories', 'author')
            ->where('status', 'published')
            ->orderBy('published_at', 'desc');
            
        if ($category) {
            $query->whereHas('categories', function($q) use ($category) {
                $q->where('slug', $category);
            });
        }
        
        // On récupère d'abord les articles mis en avant (pour la première page)
        $featuredPosts = [];
        if (!$category && $request->page === null) {
            $featuredPosts = Post::with('categories', 'author')
                ->where('status', 'published')
                ->where('is_featured', true)
                ->orderBy('published_at', 'desc')
                ->limit(1)
                ->get();
                
            // Si on a des articles mis en avant, on les exclut de la requête principale
            if ($featuredPosts->isNotEmpty()) {
                $query->whereNotIn('id', $featuredPosts->pluck('id'));
            }
        }
        
        $posts = $query->paginate(9)->withQueryString();
        
        // On ajoute les articles mis en avant au début des résultats
        if ($featuredPosts->isNotEmpty()) {
            $posts->getCollection()->prepend($featuredPosts->first());
        }
        
        // Utiliser la méthode morphedByMany pour compter les posts
        $categories = Category::withCount(['posts' => function($query) {
            $query->where('status', 'published');
        }])->orderBy('name')->get();
        
        return Inertia::render('Blog/index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => [
                'category' => $category
            ],
            'meta' => [
                'title' => $category 
                    ? 'Blog - Catégorie: ' . Category::where('slug', $category)->first()->name
                    : 'Blog - Découvrez mes derniers articles sur le développement web',
                'description' => 'Articles sur le développement web, les technologies et tutoriels pour les développeurs.',
                'keywords' => 'blog développement web, tutoriels développement, javascript, php, laravel, react',
                'canonical' => route('blog.index', $category ? ['category' => $category] : [])
            ]
        ]);
    }
    
    /**
     * Affiche un article spécifique
     */
    public function show($slug)
    {
        $post = Post::with(['categories', 'author'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
            
        // Récupérer la catégorie principale pour cet article
        $mainCategory = $post->categories->first();
        
        // Récupérer les articles connexes (même catégorie)
        $relatedPosts = [];
        if ($mainCategory) {
            $relatedPosts = Post::with('categories', 'author')
                ->where('status', 'published')
                ->where('id', '!=', $post->id)
                ->whereHas('categories', function($q) use ($mainCategory) {
                    $q->where('categories.id', $mainCategory->id);
                })
                ->limit(3)
                ->get();
        }
            
        return Inertia::render('Blog/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'meta' => [
                'title' => $post->seo_title,
                'description' => $post->seo_description,
                'keywords' => $post->meta_keywords,
                'canonical' => route('blog.show', $post->slug),
                'image' => $post->featured_image ? asset($post->featured_image) : null,
                'author' => $post->author->name,
                'published_time' => $post->published_at->toIso8601String(),
                'modified_time' => $post->updated_at->toIso8601String(),
                'category' => $mainCategory ? $mainCategory->name : null
            ]
        ]);
    }
    
    /**
     * Génère un fichier sitemap XML pour le blog
     */
    public function sitemap()
    {
        // Récupérer tous les articles publiés
        $posts = Post::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->get();
            
        // Récupérer toutes les catégories
        $categories = Category::all();
        
        // Contenu XML
        $content = view('blog.sitemap', [
            'posts' => $posts,
            'categories' => $categories
        ]);
        
        return Response::make($content, 200, [
            'Content-Type' => 'application/xml'
        ]);
    }
} 