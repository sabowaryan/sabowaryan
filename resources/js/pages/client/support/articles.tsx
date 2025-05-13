import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Book, Calendar, Clock, Search, Tag } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Support',
        href: '/client/support',
    },
    {
        title: 'Articles',
        href: '#',
    },
];

// Types pour les articles
interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    readTime: number;
    dateUpdated: string;
    featured?: boolean;
}

// Données d'exemple pour les articles
const articlesData: Article[] = [
    {
        id: 'art-001',
        title: 'Guide complet du processus de développement web',
        excerpt: 'Découvrez toutes les étapes du développement de votre site web, de la conception à la mise en ligne.',
        category: 'Projets',
        tags: ['Développement web', 'Processus', 'Méthodologie', 'Frontend', 'Backend'],
        readTime: 8,
        dateUpdated: '2024-03-15',
        featured: true
    },
    {
        id: 'art-002',
        title: 'Comprendre vos factures et options de paiement',
        excerpt: 'Tout ce que vous devez savoir sur la facturation, les modalités de paiement et les échéances.',
        category: 'Facturation',
        tags: ['Facturation', 'Paiement', 'Comptabilité', 'Factures'],
        readTime: 5,
        dateUpdated: '2024-04-10',
    },
    {
        id: 'art-003',
        title: 'Comment communiquer efficacement avec votre équipe de développement',
        excerpt: 'Conseils pour une communication claire et productive avec les développeurs de votre projet.',
        category: 'Communication',
        tags: ['Communication', 'Gestion de projet', 'Équipe', 'Collaboration', 'Développement'],
        readTime: 6,
        dateUpdated: '2024-04-22',
        featured: true
    },
    {
        id: 'art-004',
        title: 'Sécuriser votre site web : bonnes pratiques et conseils',
        excerpt: 'Protégez votre site web contre les menaces courantes avec ces recommandations de sécurité essentielles.',
        category: 'Sécurité',
        tags: ['Sécurité', 'HTTPS', 'Authentification', 'Protection des données'],
        readTime: 7,
        dateUpdated: '2024-04-05',
    },
    {
        id: 'art-005',
        title: 'Optimiser les performances de votre site web',
        excerpt: 'Techniques pour améliorer la vitesse de chargement et l\'expérience utilisateur de votre site.',
        category: 'Performance',
        tags: ['Performance', 'SEO', 'Optimisation', 'Vitesse'],
        readTime: 9,
        dateUpdated: '2024-03-28',
    },
    {
        id: 'art-006',
        title: 'Guide du référencement naturel (SEO) pour les débutants',
        excerpt: 'Les bases du SEO pour améliorer la visibilité de votre site dans les moteurs de recherche.',
        category: 'Marketing',
        tags: ['SEO', 'Référencement', 'Google', 'Marketing digital'],
        readTime: 10,
        dateUpdated: '2024-04-18',
        featured: true
    },
    {
        id: 'art-007',
        title: 'Créer une stratégie de contenu efficace pour votre site',
        excerpt: 'Comment planifier et créer du contenu qui engage votre audience et atteint vos objectifs.',
        category: 'Marketing',
        tags: ['Contenu', 'Stratégie', 'Rédaction', 'Marketing'],
        readTime: 8,
        dateUpdated: '2024-03-20',
    },
    {
        id: 'art-008',
        title: 'Accessibilité web : rendre votre site accessible à tous',
        excerpt: 'Guide pratique pour améliorer l\'accessibilité de votre site web pour les personnes handicapées.',
        category: 'Accessibilité',
        tags: ['Accessibilité', 'Inclusion', 'WCAG', 'Design'],
        readTime: 7,
        dateUpdated: '2024-04-12',
    }
];

// Types pour les catégories
type CategoryCount = {
    name: string;
    count: number;
};

// Toutes les catégories avec le nombre d'articles
const categories: CategoryCount[] = Array.from(
    articlesData.reduce((acc, article) => {
        const name = article.category;
        acc.set(name, (acc.get(name) || 0) + 1);
        return acc;
    }, new Map<string, number>())
).map(([name, count]) => ({ name, count }));

// Tous les tags uniques
const allTags = Array.from(
    new Set(articlesData.flatMap(article => article.tags))
).sort();

export default function Articles() {
    // État pour la recherche
    const [searchQuery, setSearchQuery] = useState('');
    
    // État pour le filtre de catégorie
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    
    // État pour le filtre de tags
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Filtrer les articles en fonction des critères de recherche et des filtres
    const filteredArticles = articlesData.filter(article => {
        // Filtre de recherche
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!article.title.toLowerCase().includes(query) && 
                !article.excerpt.toLowerCase().includes(query) &&
                !article.tags.some(tag => tag.toLowerCase().includes(query))) {
                return false;
            }
        }
        
        // Filtre de catégorie
        if (selectedCategory && article.category !== selectedCategory) {
            return false;
        }
        
        // Filtre de tags
        if (selectedTags.length > 0 && !selectedTags.some(tag => article.tags.includes(tag))) {
            return false;
        }
        
        return true;
    });

    // Gérer le changement de recherche
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Gérer le clic sur une catégorie
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(prev => prev === category ? null : category);
    };

    // Gérer le clic sur un tag
    const handleTagClick = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag) 
                : [...prev, tag]
        );
    };

    // Articles mis en avant
    const featuredArticles = articlesData.filter(article => article.featured);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Base de connaissances" />
            <div className="flex h-full flex-1 flex-col p-4">
                <div className="mb-6">
                    <a 
                        href="/client/support" 
                        className="flex w-fit items-center rounded-md text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Retour au support
                    </a>
                </div>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Base de connaissances</h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Explorez notre collection d'articles pour trouver des réponses à vos questions.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Sidebar avec filtres */}
                    <div className="space-y-6 md:col-span-1">
                        {/* Recherche */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher des articles..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full rounded-md border border-neutral-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                            </div>
                        </div>

                        {/* Catégories */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <h2 className="mb-3 flex items-center text-lg font-medium">
                                <Book className="mr-2 h-5 w-5 text-primary" />
                                Catégories
                            </h2>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() => handleCategoryClick(category.name)}
                                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${
                                            selectedCategory === category.name
                                                ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                        }`}
                                    >
                                        <span>{category.name}</span>
                                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs dark:bg-neutral-800">
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags populaires */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <h2 className="mb-3 flex items-center text-lg font-medium">
                                <Tag className="mr-2 h-5 w-5 text-primary" />
                                Tags populaires
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className={`rounded-full px-3 py-1 text-xs ${
                                            selectedTags.includes(tag)
                                                ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Articles mis en avant */}
                        {featuredArticles.length > 0 && !searchQuery && !selectedCategory && selectedTags.length === 0 && (
                            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                                <h2 className="mb-4 text-lg font-medium">Articles recommandés</h2>
                                <div className="space-y-4">
                                    {featuredArticles.map((article) => (
                                        <a 
                                            key={article.id}
                                            href={`/client/support/articles/${article.id}`}
                                            className="block rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-all hover:border-primary hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-primary"
                                        >
                                            <div className="mb-2 flex items-center">
                                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary dark:bg-primary/20">
                                                    {article.category}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-lg font-medium">{article.title}</h3>
                                            <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-neutral-500">
                                                <div className="flex items-center">
                                                    <Clock className="mr-1 h-3.5 w-3.5" />
                                                    <span>{article.readTime} min de lecture</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="mr-1 h-3.5 w-3.5" />
                                                    <span>Mis à jour le {formatDate(article.dateUpdated)}</span>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Liste des articles */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium">
                                    {searchQuery || selectedCategory || selectedTags.length > 0
                                        ? `Résultats (${filteredArticles.length})`
                                        : 'Tous les articles'}
                                </h2>
                                {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                                    <button 
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory(null);
                                            setSelectedTags([]);
                                        }}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Réinitialiser les filtres
                                    </button>
                                )}
                            </div>

                            {filteredArticles.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredArticles.map((article) => (
                                        <a 
                                            key={article.id}
                                            href={`/client/support/articles/${article.id}`}
                                            className="block rounded-lg border border-neutral-200 p-4 transition-all hover:border-primary hover:shadow-sm dark:border-neutral-700 dark:hover:border-primary"
                                        >
                                            <div className="mb-2 flex items-center">
                                                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                    {article.category}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-lg font-medium">{article.title}</h3>
                                            <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {article.tags.slice(0, 3).map((tag, index) => (
                                                    <span 
                                                        key={index}
                                                        className="rounded-full bg-neutral-50 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {article.tags.length > 3 && (
                                                    <span className="rounded-full bg-neutral-50 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                        +{article.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-neutral-500">
                                                <div className="flex items-center">
                                                    <Clock className="mr-1 h-3.5 w-3.5" />
                                                    <span>{article.readTime} min de lecture</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>Lire l'article</span>
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-8 dark:border-neutral-700">
                                    <Book className="mb-2 h-12 w-12 text-neutral-300 dark:text-neutral-600" />
                                    <p className="mb-2 text-neutral-500">Aucun article ne correspond à vos critères de recherche</p>
                                    <button 
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory(null);
                                            setSelectedTags([]);
                                        }}
                                        className="mt-2 text-sm font-medium text-primary hover:underline"
                                    >
                                        Réinitialiser les filtres
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 