import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import type { BreadcrumbItem } from '@/types';
import { 
    Monitor, 
    Server, 
    Settings, 
    Smartphone, 
    BarChart, 
    CheckCircle, 
    Code,
    Search,
    Star,
    Clock,
    BookOpen,
    Users,
    TrendingUp,
    X,
    Filter,
    ChevronRight
} from 'lucide-react';
import { Pagination } from '@/components/Pagination';

// Types
interface Author {
    name: string;
    avatar: string;
    title: string;
    bio: string;
}

interface Stats {
    views: number;
    completions: number;
    rating: number;
    reviews_count: number;
}

interface Tutorial {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    is_premium: boolean;
    price: number;
    duration: string;
    level: string;
    category: string;
    category_slug: string;
    created_at: string;
    updated_at: string;
    author: Author;
    progress: number | null;
    stats: Stats;
    tags: string[];
    featured_description?: string;
    featured_cta?: string;
    featured_badge?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    count: number;
}

interface StatsData {
    totalTutorials: number;
    freeTutorials: number;
    premiumTutorials: number;
}

interface PaginatedData {
    data: Tutorial[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface TutorialsIndexProps {
    tutorials: PaginatedData;
    categories: Category[];
    featuredTutorial: Tutorial;
    stats: StatsData;
}

// Définir les breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Accueil', href: '/' },
    { title: 'Tutoriels', href: '/tutorials' }
];

// Fonction pour obtenir l'icône de catégorie
const getCategoryIcon = (category: string) => {
    switch(category) {
        case 'frontend': return <Monitor className="h-5 w-5" />;
        case 'backend': return <Server className="h-5 w-5" />;
        case 'devops': return <Settings className="h-5 w-5" />;
        case 'mobile': return <Smartphone className="h-5 w-5" />;
        case 'data': return <BarChart className="h-5 w-5" />;
        case 'testing': return <CheckCircle className="h-5 w-5" />;
        case 'languages': return <Code className="h-5 w-5" />;
        default: return <BookOpen className="h-5 w-5" />;
    }
};

// Fonction pour obtenir la couleur de catégorie
const getCategoryColor = (category: string): string => {
    switch(category) {
        case 'frontend': return 'from-blue-500 to-blue-600';
        case 'backend': return 'from-purple-500 to-purple-600';
        case 'devops': return 'from-orange-500 to-orange-600';
        case 'mobile': return 'from-green-500 to-green-600';
        case 'data': return 'from-red-500 to-red-600';
        case 'testing': return 'from-teal-500 to-teal-600';
        case 'languages': return 'from-indigo-500 to-indigo-600';
        default: return 'from-gray-500 to-gray-600';
    }
};

export default function TutorialsIndex({ tutorials, categories, featuredTutorial, stats }: TutorialsIndexProps) {
    const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    
    // Filtrer les tutoriels
    const filteredTutorials = tutorials.data.filter(tutorial => {
        // Filtre par type (gratuit/premium)
        if (filter === 'free' && tutorial.is_premium) return false;
        if (filter === 'premium' && !tutorial.is_premium) return false;
        
        // Filtre par catégorie
        if (selectedCategory !== 'all' && tutorial.category_slug !== selectedCategory) return false;
        
        // Filtre par recherche
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return tutorial.title.toLowerCase().includes(query) || 
                   tutorial.description.toLowerCase().includes(query) ||
                   tutorial.tags.some(tag => tag.toLowerCase().includes(query));
        }
        
        return true;
    });

    return (
        <GuestLayout breadcrumbs={breadcrumbs}>
            <Head title="Tutoriels" />
            
            <main className="relative min-h-screen">
                {/* Hero section avec tutoriel en vedette */}
                {featuredTutorial && (
                    <div className="relative bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
                        {/* Background patterns */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
                        <div className="absolute inset-0 bg-noise-pattern opacity-[0.08] pointer-events-none"></div>
                        
                        {/* Floating particles */}
                        <div className="absolute top-1/4 left-1/5 w-20 h-20 rounded-full bg-primary/20 blur-3xl animate-float-slow"></div>
                        <div className="absolute bottom-1/4 right-1/5 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float-medium"></div>
                        
                        <div className={`${SITE_CONTAINER} py-16 md:py-24`}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="flex flex-col"
                                >
                                    <div className="flex items-center mb-4">
                                        <Badge className="bg-primary/20 text-primary border-none px-3 py-1">
                                            {featuredTutorial.featured_badge || "Recommandé"}
                                        </Badge>
                                    </div>
                                    
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                        {featuredTutorial.title}
                                    </h1>
                                    
                                    <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                                        {featuredTutorial.featured_description || featuredTutorial.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <div className="flex items-center text-foreground/70">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{featuredTutorial.duration}</span>
                                        </div>
                                        <div className="flex items-center text-foreground/70">
                                            <Users className="h-4 w-4 mr-2" />
                                            <span>Niveau: {featuredTutorial.level}</span>
                                        </div>
                                        <div className="flex items-center text-foreground/70">
                                            <Star className="h-4 w-4 mr-2 text-yellow-500" fill="currentColor" />
                                            <span>{featuredTutorial.stats.rating} ({featuredTutorial.stats.reviews_count} avis)</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <Button 
                                            size="lg" 
                                            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 relative overflow-hidden group"
                                            asChild
                                        >
                                            <a href={`/tutorials/${featuredTutorial.slug}`}>
                                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></span>
                                                <BookOpen className="h-5 w-5" />
                                                {featuredTutorial.featured_cta || "Commencer le tutoriel"}
                                            </a>
                                        </Button>
                                        
                                        {featuredTutorial.is_premium && (
                                            <div className="flex items-center bg-primary/10 px-4 py-2 rounded-lg">
                                                <span className="font-semibold">{featuredTutorial.price} €</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                                
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
                                        <img 
                                            src={featuredTutorial.image} 
                                            alt={featuredTutorial.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-white/70">
                                                    <img 
                                                        src={featuredTutorial.author.avatar} 
                                                        alt={featuredTutorial.author.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{featuredTutorial.author.name}</div>
                                                    <div className="text-white/70 text-sm">{featuredTutorial.author.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Category badge */}
                                        <div className="absolute top-4 left-4">
                                            <Badge 
                                                className={`px-3 py-1.5 text-white bg-gradient-to-r ${getCategoryColor(featuredTutorial.category)} shadow-lg`}
                                            >
                                                {getCategoryIcon(featuredTutorial.category)}
                                                <span className="ml-1.5 capitalize">{featuredTutorial.category}</span>
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    {/* Decorative elements */}
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10"></div>
                                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-xl -z-10"></div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Stats section */}
                <div className="bg-card/30 border-y border-border/30 backdrop-blur-sm">
                    <div className={`${SITE_CONTAINER} py-8`}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-4xl font-bold text-primary mb-2">{stats.totalTutorials}</div>
                                <div className="text-foreground/70">Tutoriels disponibles</div>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-4xl font-bold text-green-500 mb-2">{stats.freeTutorials}</div>
                                <div className="text-foreground/70">Tutoriels gratuits</div>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-4xl font-bold text-yellow-500 mb-2">{stats.premiumTutorials}</div>
                                <div className="text-foreground/70">Tutoriels premium</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                {/* Main content */}
                <div className={`${SITE_CONTAINER} py-12`}>
                    {/* Search and filters */}
                    <div className="mb-10">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                            <div className="w-full lg:w-1/3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Rechercher un tutoriel..."
                                        className="pl-10 bg-card/50 border-border/50"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                <Button 
                                    variant={filter === 'all' ? 'default' : 'outline'}
                                    onClick={() => setFilter('all')}
                                    className="gap-2"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    Tous
                                </Button>
                                <Button 
                                    variant={filter === 'free' ? 'default' : 'outline'}
                                    onClick={() => setFilter('free')}
                                    className="gap-2"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    Gratuits
                                </Button>
                                <Button 
                                    variant={filter === 'premium' ? 'default' : 'outline'}
                                    onClick={() => setFilter('premium')}
                                    className="gap-2"
                                >
                                    <Star className="h-4 w-4" />
                                    Premium
                                </Button>
                                <Button 
                                    variant="outline"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="gap-2"
                                >
                                    <Filter className="h-4 w-4" />
                                    Catégories
                                </Button>
                            </div>
                        </div>
                        
                        {/* Category filters */}
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        <Button 
                                            variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                            onClick={() => setSelectedCategory('all')}
                                            className="justify-start gap-2"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                            Toutes les catégories
                                        </Button>
                                        
                                        {categories.map(category => (
                                            <Button 
                                                key={category.id}
                                                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                                                onClick={() => setSelectedCategory(category.slug)}
                                                className="justify-start gap-2"
                                            >
                                                {getCategoryIcon(category.slug)}
                                                {category.name} ({category.count})
                                            </Button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    
                    {/* Tutorials grid */}
                    {filteredTutorials.length === 0 ? (
                        <div className="text-center py-16 bg-card/30 rounded-xl border border-border/30">
                            <div className="mb-4">
                                <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Aucun tutoriel trouvé</h3>
                            <p className="text-muted-foreground">Essayez de modifier vos critères de recherche</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTutorials.map((tutorial, i) => (
                                <motion.div
                                    key={tutorial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="group relative rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    {/* Pattern background */}
                                    <div className="absolute inset-0 -z-10 bg-noise-pattern opacity-10 pointer-events-none"></div>
                                    
                                    <a href={`/tutorials/${tutorial.slug}`} className="block h-full">
                                        <div className="h-48 overflow-hidden relative">
                                            <div className="absolute top-3 right-3 z-10 flex gap-2">
                                                <Badge 
                                                    className={`bg-gradient-to-r ${getCategoryColor(tutorial.category)} text-white border-none`}
                                                >
                                                    {getCategoryIcon(tutorial.category)}
                                                    <span className="ml-1">{tutorial.category}</span>
                                                </Badge>
                                                
                                                {tutorial.is_premium && (
                                                    <Badge className="bg-yellow-500 text-white border-none">
                                                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                                        Premium
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                            <img 
                                                src={tutorial.image}
                                                alt={tutorial.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        
                                        <div className="p-5">
                                            <div className="flex items-center mb-2">
                                                <div className="w-6 h-6 rounded-full overflow-hidden mr-2 border border-border/50">
                                                    <img 
                                                        src={tutorial.author.avatar} 
                                                        alt={tutorial.author.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm text-foreground/70">{tutorial.author.name}</span>
                                            </div>
                                            
                                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                {tutorial.title}
                                            </h3>
                                            
                                            <p className="text-foreground/80 text-sm mb-4 line-clamp-2">
                                                {tutorial.description}
                                            </p>
                                            
                                            <div className="flex justify-between items-center text-sm text-foreground/70 mb-4">
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    <span>{tutorial.duration}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" />
                                                    <span>{tutorial.stats.rating}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                {tutorial.is_premium ? (
                                                    <span className="font-bold">{tutorial.price} €</span>
                                                ) : (
                                                    <span className="text-green-600 font-bold">Gratuit</span>
                                                )}
                                                
                                                <div className="flex items-center text-primary">
                                                    <span className="text-sm font-medium">Voir le tutoriel</span>
                                                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <Pagination links={tutorials.links} />
            </main>
        </GuestLayout>
    );
}
