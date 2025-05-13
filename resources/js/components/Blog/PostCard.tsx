import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
    url: string;
}

interface PostCardProps {
    post: {
        id: number;
        title: string;
        content_summary: string;
        slug: string;
        url: string;
        featured_image: string | null;
        reading_time: number | null;
        published_at: string;
        formatted_date: string;
        categories: Category[];
        author: {
            id: number;
            name: string;
        };
    };
    index?: number;
    variant?: 'default' | 'featured' | 'compact';
}

export function PostCard({ post, index = 0, variant = 'default' }: PostCardProps) {
    // Récupérer la première catégorie comme catégorie principale
    const mainCategory = post.categories && post.categories.length > 0 ? post.categories[0] : null;
    
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.5,
                delay: index * 0.1 
            }
        }
    };

    if (variant === 'compact') {
        return (
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
            >
                {post.featured_image && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                            src={post.featured_image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                )}
                
                <div className="flex-1">
                    <Link href={post.url} className="block">
                        <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                            {post.title}
                        </h3>
                    </Link>
                    
                    <div className="flex items-center text-xs text-muted-foreground space-x-3">
                        <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.formatted_date}
                        </span>
                        
                        {post.reading_time && (
                            <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {post.reading_time} min
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    if (variant === 'featured') {
        return (
            <motion.article
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative rounded-2xl overflow-hidden group h-[400px] sm:h-[450px] md:h-[500px]"
            >
                {/* Image avec overlay */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div 
                    className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20",
                    )}
                />
                {post.featured_image ? (
                    <img 
                        src={post.featured_image} 
                        alt={post.title} 
                        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-0" />
                )}
                {/* Contenu */}
                <div className="absolute inset-x-0 bottom-0 z-30 p-6 sm:p-8">
                    <div className="flex items-center space-x-3 mb-3">
                        {mainCategory && (
                            <Badge 
                                variant="secondary" 
                                className="bg-primary hover:bg-primary/90 text-white"
                            >
                                <Link href={mainCategory.url || `/blog?category=${mainCategory.slug}`}>{mainCategory.name}</Link>
                            </Badge>
                        )}
                        <span className="text-sm text-white/80 flex items-center">
                            <Calendar className="h-3 w-3 mr-1.5" />
                            {post.formatted_date}
                        </span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="block group">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-primary/90 transition-colors">
                            {post.title}
                        </h3>
                    </Link>
                    <p className="text-white/80 mb-5 line-clamp-2 sm:line-clamp-3">
                        {post.content_summary}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/80 text-sm">
                            <User className="h-4 w-4 mr-2" />
                            {post.author.name}
                            {post.reading_time && (
                                <span className="flex items-center ml-4">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {post.reading_time} min de lecture
                                </span>
                            )}
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-white border-white/30 hover:bg-white/10 hover:text-white hover:border-white/50"
                            asChild
                        >
                            <Link href={`/blog/${post.slug}`} className="group">
                                Lire
                                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.article>
        );
    }

    // Carte par défaut
    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/30 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 hover:shadow-primary/20 transition-all duration-300"
        >
            {/* Image */}
            {post.featured_image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img 
                        src={post.featured_image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay dégradé */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
                    {mainCategory && (
                        <div className="absolute top-3 left-3 z-10">
                            <Badge 
                                variant="secondary" 
                                className="bg-primary text-primary-foreground rounded-full shadow-md px-3 py-1 text-xs font-semibold tracking-wide hover:bg-primary/90 transition-all"
                            >
                                <Link href={mainCategory.url || `/blog?category=${mainCategory.slug}`}
                                    className="focus:outline-none">
                                    {mainCategory.name}
                                </Link>
                            </Badge>
                        </div>
                    )}
                </div>
            )}
            {/* Contenu */}
            <div className="flex flex-col flex-grow p-6 bg-card/80 backdrop-blur-sm">
                <div className="flex items-center text-xs text-muted-foreground space-x-3 mb-3">
                    <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        {post.formatted_date}
                    </span>
                    {post.reading_time && (
                        <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {post.reading_time} min
                        </span>
                    )}
                </div>
                <Link href={`/blog/${post.slug}`} className="block group">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>
                <p className="text-muted-foreground mb-4 flex-grow line-clamp-3 text-base">
                    {post.content_summary}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-2" />
                        {post.author.name}
                    </div>
                    <Button 
                        variant="default" 
                        size="icon" 
                        className="rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all group/button"
                        asChild
                    >
                        <Link href={`/blog/${post.slug}`} className="flex items-center justify-center">
                            <ArrowRight className="h-5 w-5 transition-transform group-hover/button:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.article>
    );
} 