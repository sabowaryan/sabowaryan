import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostCard } from './PostCard';
import { CategoryFilter } from './CategoryFilter';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X, Loader2, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface BlogGridProps {
    posts: any;
    categories: any[];
    filters: {
        category: string | null;
    };
}

export function BlogGrid({ posts, categories, filters }: BlogGridProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    
    // Effet de délai pour la recherche
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);
    
    // Fonction pour filtrer les posts localement
    const filteredPosts = posts.data.filter((post: any) => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content_summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div className="w-full">
            {/* Barre de recherche et filtres */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 dark:border-border/20 py-4 mb-8"
            >
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <Input
                                type="search"
                                placeholder="Rechercher un article..."
                                className={cn(
                                    "pl-10 transition-all duration-200",
                                    "focus:ring-2 focus:ring-primary/20",
                                    "dark:focus:ring-primary/30"
                                )}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsSearching(true);
                                }}
                            />
                            {isSearching && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
                            )}
                        </div>
                        <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn(
                                "relative transition-all duration-200",
                                "hover:bg-primary/10 dark:hover:bg-primary/20",
                                showFilters && "bg-primary/10 dark:bg-primary/20"
                            )}
                        >
                            {showFilters ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Filter className="h-4 w-4" />
                            )}
                            
                            {filters.category && !showFilters && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
            
            {/* Filtres par catégorie */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto mb-8"
                    >
                        <CategoryFilter 
                            categories={categories} 
                            activeCategory={filters.category}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Filtre actif */}
            {filters.category && !showFilters && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium shadow-sm">
                        <span>Catégorie: {categories.find(c => c.slug === filters.category)?.name}</span>
                        <Link 
                            href={route('blog.index')} 
                            className="ml-2 p-1 hover:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-colors"
                        >
                            <X className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </motion.div>
            )}
            
            {/* Message aucun résultat */}
            {searchQuery && filteredPosts.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <p className="text-lg text-muted-foreground mb-4">
                        Aucun article trouvé pour "{searchQuery}"
                    </p>
                    <Button 
                        onClick={() => setSearchQuery('')} 
                        variant="outline"
                        className="hover:bg-primary/10 dark:hover:bg-primary/20"
                    >
                        Effacer la recherche
                    </Button>
                </motion.div>
            )}
            
            {/* Grille d'articles */}
            {filteredPosts.length > 0 && (
                <div className="space-y-12">
                    {/* Article mis en avant */}
                    {!searchQuery && !filters.category && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <PostCard post={filteredPosts[0]} variant="featured" />
                        </motion.div>
                    )}
                    
                    {/* Grille des autres articles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.slice(
                            !searchQuery && !filters.category ? 1 : 0
                        ).map((post: any, index: number) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <PostCard 
                                    post={post}
                                    index={index}
                                />
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    {posts.links && !searchQuery && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-16"
                        >
                            <div className="flex items-center justify-center gap-4">
                                {/* Flèche gauche */}
                                {posts.links[0]?.url && (
                                    <Link
                                        href={posts.links[0].url}
                                        className={cn(
                                            "flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md border border-border/30 text-primary hover:bg-primary/10 transition-all duration-200",
                                            !posts.links[0].url && "opacity-50 cursor-not-allowed"
                                        )}
                                        aria-label="Page précédente"
                                    >
                                        <span className="text-xl">&lt;</span>
                                    </Link>
                                )}
                                {/* Conteneur pagination */}
                                <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-card shadow-lg border border-border/20">
                                    {posts.links.slice(1, posts.links.length-1).map((link: any, i: number) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={cn(
                                                "flex items-center justify-center w-10 h-10 rounded-full font-medium transition-all duration-200",
                                                link.active
                                                    ? "bg-primary text-primary-foreground shadow"
                                                    : link.url
                                                        ? "bg-card text-foreground/80 hover:bg-primary/10 hover:text-primary"
                                                        : "bg-card text-muted-foreground/40 cursor-not-allowed"
                                            )}
                                            aria-current={link.active ? 'page' : undefined}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Link>
                                    ))}
                                </div>
                                {/* Flèche droite */}
                                {posts.links[posts.links.length-1]?.url && (
                                    <Link
                                        href={posts.links[posts.links.length-1].url}
                                        className={cn(
                                            "flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md border border-border/30 text-primary hover:bg-primary/10 transition-all duration-200",
                                            !posts.links[posts.links.length-1].url && "opacity-50 cursor-not-allowed"
                                        )}
                                        aria-label="Page suivante"
                                    >
                                        <span className="text-xl">&gt;</span>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
} 