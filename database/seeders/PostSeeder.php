<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer l'utilisateur ou en créer un nouveau si nécessaire
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ]);
        }

        // Créer quelques catégories
        $categories = [
            [
                'name' => 'Développement Web',
                'slug' => 'developpement-web',
                'description' => 'Articles sur le développement web, frameworks et bonnes pratiques',
            ],
            [
                'name' => 'Design UI/UX',
                'slug' => 'design-ui-ux',
                'description' => 'Articles sur le design d\'interfaces et l\'expérience utilisateur',
            ],
            [
                'name' => 'Technologies Mobiles',
                'slug' => 'technologies-mobiles',
                'description' => 'Tout sur le développement d\'applications mobiles',
            ],
        ];

        $categoryModels = [];
        foreach ($categories as $index => $categoryData) {
            // Vérifier si la catégorie existe déjà par son slug
            $category = Category::where('slug', $categoryData['slug'])->first();
            
            if (!$category) {
                // Créer une nouvelle catégorie si elle n'existe pas
                $category = Category::create($categoryData);
            }
            
            // Stocker l'objet catégorie pour l'utiliser plus tard
            $categoryModels[$index + 1] = $category;
        }
        
        // Créer quelques articles
        $posts = [
            [
                'title' => 'Introduction à Laravel 10',
                'slug' => 'introduction-a-laravel-10',
                'excerpt' => 'Découvrez les nouvelles fonctionnalités de Laravel 10',
                'content' => '<p>Laravel 10 apporte de nombreuses améliorations et nouvelles fonctionnalités. Dans cet article, nous allons explorer les principales nouveautés et comment les utiliser dans vos projets.</p>
                <h2>Les nouveautés</h2>
                <ul>
                    <li>Support de PHP 8.1 minimum</li>
                    <li>Améliorations des performances</li>
                    <li>Nouvelles fonctionnalités pour l\'ORM Eloquent</li>
                </ul>
                <p>Laravel continue d\'évoluer pour offrir aux développeurs une expérience toujours plus agréable et productive.</p>',
                'featured_image' => 'posts/laravel-10.jpg',
                'status' => 'published',
                'author_id' => $user->id,
                'published_at' => now()->subDays(5),
                'reading_time' => 8,
                'meta_title' => 'Guide complet sur Laravel 10 - Nouveautés et améliorations',
                'meta_description' => 'Découvrez toutes les nouveautés et améliorations de Laravel 10 dans ce guide complet pour les développeurs PHP.',
                'meta_keywords' => 'Laravel 10, PHP, Framework, Web Development',
                'is_featured' => true,
                'categories' => [1], // IDs des catégories à associer
            ],
            [
                'title' => 'Les principes du design UX en 2023',
                'slug' => 'principes-design-ux-2023',
                'excerpt' => 'Les tendances et bonnes pratiques du design UX cette année',
                'content' => '<p>Le design UX évolue constamment pour répondre aux attentes des utilisateurs et aux avancées technologiques.</p>
                <h2>Tendances UX en 2023</h2>
                <p>Parmi les tendances marquantes, on note:</p>
                <ul>
                    <li>Le design minimaliste</li>
                    <li>L\'accessibilité comme priorité</li>
                    <li>Les micro-interactions</li>
                    <li>Les interfaces conversationnelles</li>
                </ul>
                <p>Ces tendances reflètent une volonté de créer des expériences plus inclusives et engageantes.</p>',
                'featured_image' => 'posts/ux-design.jpg',
                'status' => 'published',
                'author_id' => $user->id,
                'published_at' => now()->subDays(2),
                'reading_time' => 6,
                'meta_title' => 'Tendances UX Design 2023 - Guide complet',
                'meta_description' => 'Explorez les dernières tendances en matière de design UX pour 2023 et apprenez à créer des interfaces utilisateur exceptionnelles.',
                'meta_keywords' => 'UX Design, UI, User Experience, Design Trends',
                'is_featured' => true,
                'categories' => [2],
            ],
            [
                'title' => 'Développement d\'applications avec Flutter',
                'slug' => 'developpement-applications-flutter',
                'excerpt' => 'Comment créer des applications mobiles performantes avec Flutter',
                'content' => '<p>Flutter est un framework de développement d\'applications mobiles créé par Google qui permet de développer rapidement des applications de haute qualité pour iOS et Android à partir d\'une base de code unique.</p>
                <h2>Avantages de Flutter</h2>
                <ul>
                    <li>Un seul code pour iOS et Android</li>
                    <li>Performance native grâce à Dart</li>
                    <li>Hot Reload pour un développement rapide</li>
                    <li>Widgets personnalisables</li>
                </ul>
                <p>Flutter représente une excellente option pour les développeurs souhaitant créer des applications multiplateformes sans compromis sur la qualité.</p>',
                'featured_image' => 'posts/flutter-dev.jpg',
                'status' => 'published',
                'author_id' => $user->id,
                'published_at' => now()->subDays(7),
                'reading_time' => 10,
                'meta_title' => 'Guide complet du développement Flutter en 2023',
                'meta_description' => 'Apprenez à développer des applications mobiles multiplateformes performantes avec Flutter, le framework de Google.',
                'meta_keywords' => 'Flutter, Dart, Mobile Development, iOS, Android',
                'is_featured' => false,
                'categories' => [3],
            ],
            [
                'title' => 'Optimisation des performances des sites web',
                'slug' => 'optimisation-performances-sites-web',
                'excerpt' => 'Techniques et outils pour améliorer la vitesse de chargement de votre site',
                'content' => '<p>La performance d\'un site web est cruciale pour l\'expérience utilisateur et le référencement. Dans cet article, nous allons voir comment optimiser votre site pour des temps de chargement rapides.</p>
                <h2>Techniques d\'optimisation</h2>
                <ul>
                    <li>Optimisation des images</li>
                    <li>Minification des ressources (CSS, JS)</li>
                    <li>Mise en cache efficace</li>
                    <li>Utilisation de CDN</li>
                    <li>Lazy loading</li>
                </ul>
                <p>En appliquant ces techniques, vous pouvez considérablement améliorer la vitesse de votre site, ce qui se traduit par une meilleure expérience utilisateur et un meilleur classement dans les moteurs de recherche.</p>',
                'featured_image' => 'posts/web-performance.jpg',
                'status' => 'draft',
                'author_id' => $user->id,
                'published_at' => null,
                'reading_time' => 12,
                'meta_title' => 'Guide d\'optimisation des performances web - Techniques avancées',
                'meta_description' => 'Découvrez les meilleures techniques pour optimiser les performances de votre site web et améliorer l\'expérience utilisateur.',
                'meta_keywords' => 'Web Performance, Optimization, Page Speed, SEO',
                'is_featured' => false,
                'categories' => [1],
            ],
        ];

        foreach ($posts as $postData) {
            // Extraire les IDs des catégories
            $categoryIds = $postData['categories'] ?? [];
            unset($postData['categories']);
            
            // Vérifier si l'article existe déjà par son slug
            $post = Post::where('slug', $postData['slug'])->first();
            
            if (!$post) {
                // Créer un nouvel article s'il n'existe pas
                $post = Post::create($postData);
                
                // Associer les catégories à l'article
                foreach ($categoryIds as $index) {
                    if (isset($categoryModels[$index])) {
                        $post->categories()->attach($categoryModels[$index]);
                    }
                }
            }
        }
    }
} 