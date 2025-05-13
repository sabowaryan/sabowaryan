<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Liste des projets (simulation)
     * Dans une version réelle, ces données viendraient de la base de données
     */
    private $projects = [
        [
            'id' => 'portfolio-site',
            'slug' => 'portfolio-personnel',
            'title' => 'Portfolio Personnel',
            'description' => 'Site vitrine moderne développé avec React, TypeScript et Laravel, intégrant des animations GSAP et des composants interactifs.',
            'technologies' => ['React', 'TypeScript', 'Laravel', 'Tailwind CSS', 'GSAP'],
            'image' => '/images/projects/portfolio.jpg',
            'demoUrl' => 'https://ryan-portfolio-demo.vercel.app',
            'githubUrl' => 'https://github.com/sabowaryan/portfolio',
            'category' => 'web',
            'featured' => true,
            'year' => '2023',
            'duration' => '3 mois',
            'teamSize' => 1,
            'role' => 'Développeur Full Stack',
            'client' => [
                'name' => 'Projet personnel',
                'industry' => 'Développement web',
                'location' => 'Paris, France'
            ],
            'descriptionSections' => [
                [
                    'type' => 'main',
                    'content' => 'Ce portfolio a été créé pour présenter mes compétences et réalisations en développement web. J\'ai utilisé les technologies les plus récentes pour créer une expérience utilisateur fluide et interactive.'
                ],
                [
                    'type' => 'details',
                    'content' => 'Ce projet a été développé pour répondre à des besoins spécifiques dans le domaine de la visualisation de données interactives. L\'objectif était de créer une interface intuitive permettant aux utilisateurs d\'analyser efficacement des données complexes.'
                ],
                [
                    'type' => 'conclusion',
                    'content' => 'La solution mise en place combine des technologies modernes du web avec des principes de conception centrés sur l\'utilisateur, offrant ainsi une expérience fluide et agréable, tout en garantissant des performances optimales.'
                ]
            ],
            'challenges' => [
                'Optimisation des performances avec des animations complexes',
                'Conception d\'une interface responsive et accessible',
                'Intégration de transitions fluides entre les pages'
            ],
            'solutions' => [
                'Utilisation de GSAP pour des animations performantes',
                'Architecture de composants modulaires avec React et TypeScript',
                'Tests rigoureux sur différents appareils et navigateurs'
            ],
            'gallery' => [
                '/images/projects/portfolio.jpg',
                '/images/projects/portfolio-detail1.jpg',
                '/images/projects/portfolio-detail2.jpg',
                '/images/projects/portfolio-detail3.jpg',
                '/images/projects/portfolio-detail4.jpg'
            ]
        ],
        [
            'id' => 'dashboard-app',
            'slug' => 'dashboard-analytics',
            'title' => 'Dashboard Analytics',
            'description' => 'Application de visualisation de données avec graphiques interactifs et analyses en temps réel pour le monitoring de performances et KPIs business.',
            'technologies' => ['React', 'D3.js', 'Node.js', 'Express', 'MongoDB'],
            'image' => '/images/projects/dashboard.jpg',
            'demoUrl' => 'https://dashboard-analytics-demo.vercel.app',
            'githubUrl' => 'https://github.com/sabowaryan/dashboard',
            'category' => 'web',
            'featured' => true,
            'year' => '2022',
            'duration' => '6 mois',
            'teamSize' => 3,
            'role' => 'Lead Frontend Developer',
            'client' => [
                'name' => 'DataViz Tech',
                'industry' => 'Business Intelligence',
                'location' => 'Lyon, France'
            ],
            'descriptionSections' => [
                [
                    'type' => 'main',
                    'content' => 'Cette application dashboard offre une visualisation complète des performances business et des KPIs essentiels. Elle permet aux équipes de prendre des décisions basées sur des données en temps réel.'
                ],
                [
                    'type' => 'details',
                    'content' => 'Cette application de tableau de bord a été conçue pour visualiser des données complexes de manière intuitive. L\'objectif était de permettre aux utilisateurs de prendre des décisions éclairées basées sur des analyses en temps réel et des indicateurs de performance clés.'
                ],
                [
                    'type' => 'conclusion',
                    'content' => 'Grâce à une architecture optimisée et des visualisations interactives, les utilisateurs peuvent facilement explorer leurs données, identifier des tendances et prendre des décisions stratégiques basées sur des informations précises et actualisées.'
                ]
            ],
            'challenges' => [
                'Optimisation des performances avec de grandes quantités de données',
                'Création de visualisations complexes et interactives',
                'Synchronisation des données en temps réel entre plusieurs clients'
            ],
            'solutions' => [
                'Utilisation de D3.js avec une architecture optimisée pour le rendu de graphiques',
                'Mise en place d\'un système de mise en cache intelligent',
                'Implémentation de WebSockets pour les mises à jour en temps réel'
            ],
            'gallery' => [
                '/images/projects/dashboard.jpg',
                '/images/projects/dashboard-detail1.jpg',
                '/images/projects/dashboard-detail2.jpg',
                '/images/projects/dashboard-detail3.jpg'
            ]
        ],
        [
            'id' => 'mobile-app',
            'slug' => 'application-mobile',
            'title' => 'Application Mobile',
            'description' => 'Application mobile cross-platform avec fonctionnalités de géolocalisation et notifications push pour le e-commerce.',
            'technologies' => ['React Native', 'Redux', 'Firebase', 'Expo'],
            'image' => '/images/projects/mobile.jpg',
            'demoUrl' => 'https://expo.dev/@sabowaryan/mobile-app-demo',
            'githubUrl' => 'https://github.com/sabowaryan/mobile-app',
            'category' => 'mobile',
            'year' => '2022',
            'duration' => '4 mois',
            'teamSize' => 2,
            'role' => 'Développeur Mobile Lead',
            'client' => [
                'name' => 'ShopNow',
                'industry' => 'E-commerce',
                'location' => 'Marseille, France'
            ],
            'descriptionSections' => [
                [
                    'type' => 'main',
                    'content' => 'Cette application mobile innovante offre une expérience d\'achat fluide avec des fonctionnalités de géolocalisation pour trouver des produits à proximité et des notifications push pour les offres spéciales.'
                ],
                [
                    'type' => 'details',
                    'content' => 'Cette application mobile a été développée avec une approche centrée sur l\'utilisateur, en tenant compte des contraintes des appareils mobiles. L\'objectif était de créer une expérience fluide et réactive qui fonctionne sur différentes tailles d\'écran et systèmes d\'exploitation.'
                ],
                [
                    'type' => 'conclusion',
                    'content' => 'Le résultat est une application performante et intuitive qui permet aux utilisateurs d\'accéder rapidement aux fonctionnalités essentielles, même dans des conditions de connectivité limitée, tout en offrant une interface utilisateur moderne et agréable.'
                ]
            ],
            'challenges' => [
                'Optimisation des performances sur différents appareils',
                'Gestion efficace de la géolocalisation en arrière-plan',
                'Intégration sécurisée des paiements mobiles'
            ],
            'solutions' => [
                'Architecture React Native optimisée avec code natif pour les fonctionnalités critiques',
                'Système de mise en cache des données pour une utilisation hors ligne',
                'Tests rigoureux sur différents appareils et tailles d\'écran'
            ],
            'gallery' => [
                '/images/projects/mobile.jpg',
                '/images/projects/mobile-detail1.jpg',
                '/images/projects/mobile-detail2.jpg',
                '/images/projects/mobile-detail3.jpg'
            ]
        ],
        [
            'id' => 'api-service',
            'slug' => 'api-restful-service',
            'title' => 'API RESTful Service',
            'description' => 'Backend robuste pour la gestion de contenus et l\'authentification sécurisée avec documentation OpenAPI et tests automatisés.',
            'technologies' => ['Laravel', 'PostgreSQL', 'Redis', 'Docker', 'Swagger'],
            'image' => '/images/projects/api.jpg',
            'githubUrl' => 'https://github.com/sabowaryan/api-service',
            'category' => 'backend',
            'year' => '2021',
            'duration' => '5 mois',
            'teamSize' => 2,
            'role' => 'Architecte Backend',
            'client' => [
                'name' => 'MediaPlus',
                'industry' => 'Médias & Publications',
                'location' => 'Bordeaux, France'
            ],
            'descriptionSections' => [
                [
                    'type' => 'main',
                    'content' => 'Ce service API RESTful fournit une interface robuste et sécurisée pour la gestion de contenu, l\'authentification et l\'autorisation. Il est conçu pour être hautement évolutif et maintenable.'
                ],
                [
                    'type' => 'details',
                    'content' => 'Ce service API a été conçu avec une architecture évolutive et maintenable. L\'objectif était de fournir un accès sécurisé et performant aux données, tout en garantissant une documentation complète et des tests rigoureux pour assurer la qualité du code.'
                ],
                [
                    'type' => 'conclusion',
                    'content' => 'L\'architecture mise en place permet une grande flexibilité pour les développeurs qui consomment l\'API, tout en garantissant des performances élevées et une sécurité robuste. La documentation interactive facilite l\'intégration et l\'adoption par de nouveaux utilisateurs.'
                ]
            ],
            'challenges' => [
                'Conception d\'une architecture évolutive pour gérer des charges importantes',
                'Mise en place d\'un système d\'authentification sécurisé',
                'Documentation exhaustive et maintenance de versions d\'API'
            ],
            'solutions' => [
                'Architecture en microservices avec Docker pour une meilleure isolation',
                'Utilisation de JWT avec rotation des tokens et liste de révocation',
                'Documentation automatisée avec Swagger et tests d\'intégration complets'
            ],
            'gallery' => [
                '/images/projects/api.jpg',
                '/images/projects/api-detail1.jpg',
                '/images/projects/api-detail2.jpg'
            ]
        ],
        [
            'id' => 'e-commerce',
            'slug' => 'plateforme-e-commerce',
            'title' => 'Plateforme E-commerce',
            'description' => 'Solution e-commerce complète avec panier, paiement et gestion des commandes intégrée à des services tiers.',
            'technologies' => ['Vue.js', 'Nuxt.js', 'Stripe', 'Node.js', 'MySQL'],
            'image' => '/images/projects/ecommerce.jpg',
            'demoUrl' => 'https://e-commerce-platform-demo.vercel.app',
            'githubUrl' => 'https://github.com/sabowaryan/ecommerce',
            'category' => 'web',
            'year' => '2021',
            'duration' => '8 mois',
            'teamSize' => 4,
            'role' => 'Développeur Full Stack & Architecte Solution',
            'client' => [
                'name' => 'LuxuryGoods',
                'industry' => 'Commerce de luxe',
                'location' => 'Paris, France'
            ],
            'descriptionSections' => [
                [
                    'type' => 'main',
                    'content' => 'Cette plateforme e-commerce complète offre une expérience d\'achat fluide, du navigateur jusqu\'à la livraison. Elle intègre un système de paiement sécurisé, une gestion des stocks et une interface administrateur complète.'
                ],
                [
                    'type' => 'details',
                    'content' => 'Cette plateforme e-commerce a été développée pour offrir une expérience d\'achat agréable et sécurisée. L\'accent a été mis sur la simplicité du processus d\'achat, la performance des pages produits et l\'intégration transparente des méthodes de paiement.'
                ],
                [
                    'type' => 'conclusion',
                    'content' => 'La plateforme offre une expérience utilisateur optimale, avec des temps de chargement rapides et un processus de paiement fluide. Les marchands bénéficient d\'une interface d\'administration complète pour gérer leurs produits, commandes et clients en toute simplicité.'
                ]
            ],
            'challenges' => [
                'Intégration de plusieurs passerelles de paiement et services de livraison',
                'Optimisation des performances pour un grand catalogue de produits',
                'Conception d\'un panier persistant synchronisé entre appareils'
            ],
            'solutions' => [
                'Architecture modulaire permettant d\'ajouter facilement de nouveaux services',
                'Système de mise en cache avancé et chargement à la demande des produits',
                'Utilisation de localStorage avec synchronisation en base de données'
            ],
            'gallery' => [
                '/images/projects/ecommerce.jpg',
                '/images/projects/ecommerce-detail1.jpg',
                '/images/projects/ecommerce-detail2.jpg',
                '/images/projects/ecommerce-detail3.jpg',
                '/images/projects/ecommerce-detail4.jpg'
            ]
        ]
    ];

    /**
     * Display the projects page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Projects/index', [
            'projects' => $this->projects
        ]);
    }

    /**
     * Display the specified project.
     *
     * @param  string  $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        // Debugging: Log le slug reçu
        \Log::info('Project slug received: ' . $slug);
        
        // Recherche du projet par slug
        $project = collect($this->projects)->firstWhere('slug', $slug);
        
        // Si le projet n'existe pas avec le slug, essayer avec l'ID pour la rétrocompatibilité
        if (!$project) {
            $project = collect($this->projects)->firstWhere('id', $slug);
        }
        
        // Si le projet n'existe toujours pas
        if (!$project) {
            \Log::warning('Project not found with slug: ' . $slug);
            
            // Rediriger vers la liste des projets
            return redirect()->route('projects.index')->with('error', 'Projet non trouvé');
        }
        
        // Log le projet trouvé
        \Log::info('Project found:', ['id' => $project['id'], 'slug' => $project['slug'], 'title' => $project['title']]);
        
        // Projets similaires (dans une application réelle, on pourrait filtrer par catégorie)
        $relatedProjects = collect($this->projects)
            ->where('id', '!=', $project['id'])
            ->where('category', $project['category'])
            ->take(3)
            ->values()
            ->all();
            
        // Débugger les projets similaires
        \Log::info('Related projects:', ['count' => count($relatedProjects), 'projects' => array_column($relatedProjects, 'title')]);

        return Inertia::render('Projects/show', [
            'project' => $project,
            'relatedProjects' => $relatedProjects
        ]);
    }

    /**
     * Return projects as JSON for API
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProjects()
    {
        return response()->json($this->projects);
    }
} 