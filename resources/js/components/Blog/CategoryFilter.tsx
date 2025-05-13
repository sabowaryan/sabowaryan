import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tag, ChevronRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    url: string;
    posts_count: number;
}

interface CategoryFilterProps {
    categories: Category[];
    activeCategory?: string | null;
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
    return (
        <div className="mb-8 p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-border/60 dark:border-border/20 shadow-sm">
            <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 dark:bg-primary/20 mr-3">
                    <Tag className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium text-lg text-foreground">
                    Catégories
                </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link
                        href={route('blog.index')}
                        className={cn(
                            "group inline-flex items-center px-4 py-2 text-sm rounded-md transition-all duration-200",
                            "border border-transparent",
                            !activeCategory 
                                ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                                : "bg-muted/80 hover:bg-muted text-foreground/80 hover:text-foreground"
                        )}
                    >
                        <span>Tous</span>
                        <ChevronRight className={cn(
                            "h-4 w-4 ml-1 transition-transform duration-200",
                            !activeCategory ? "text-primary-foreground" : "text-foreground/80 group-hover:text-foreground",
                            "group-hover:translate-x-0.5"
                        )} />
                    </Link>
                </motion.div>
                
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (index + 1) * 0.05 }}
                    >
                        <Link
                            href={category.url}
                            className={cn(
                                "group inline-flex items-center px-4 py-2 text-sm rounded-md transition-all duration-200",
                                "border border-transparent",
                                activeCategory === category.slug
                                    ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                                    : "bg-muted/80 hover:bg-muted text-foreground/80 hover:text-foreground"
                            )}
                        >
                            <span>{category.name}</span>
                            <span className={cn(
                                "ml-2 px-1.5 py-0.5 text-xs rounded-full transition-colors duration-200",
                                activeCategory === category.slug
                                    ? "bg-primary-foreground/20 text-primary-foreground"
                                    : "bg-muted/90 text-foreground/80 group-hover:bg-muted group-hover:text-foreground"
                            )}>
                                {category.posts_count}
                            </span>
                            <ChevronRight className={cn(
                                "h-4 w-4 ml-1 transition-transform duration-200",
                                activeCategory === category.slug ? "text-primary-foreground" : "text-foreground/80 group-hover:text-foreground",
                                "group-hover:translate-x-0.5"
                            )} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 