import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { PostCard } from './PostCard';

interface Category {
    id: number;
    name: string;
    slug: string;
    url: string;
}

interface ArticleContentProps {
    post: {
        id: number;
        title: string;
        content: string;
        slug: string;
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
    relatedPosts: any[];
}

export function ArticleContent({ post, relatedPosts }: ArticleContentProps) {
    // Récupérer la première catégorie comme catégorie principale
    const mainCategory = post.categories && post.categories.length > 0 ? post.categories[0] : null;
    
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* En-tête de l'article */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="mx-auto max-w-2xl rounded-2xl bg-card/80 shadow-lg px-8 py-6 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        {mainCategory && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-all">
                                <Tag className="h-4 w-4 mr-1" />
                                <Link href={mainCategory.url || `/blog?category=${mainCategory.slug}`}>{mainCategory.name}</Link>
                            </span>
                        )}
                        <span className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {post.formatted_date}
                        </span>
                        {post.reading_time && (
                            <span className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {post.reading_time} min de lecture
                            </span>
                        )}
                        <span className="flex items-center text-muted-foreground">
                            <User className="h-4 w-4 mr-1" />
                            {post.author.name}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-2 mb-0">
                        {post.title}
                    </h1>
                </div>
            </motion.div>
            {/* Image principale */}
            {post.featured_image && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10"
                >
                    <div className="rounded-2xl overflow-hidden shadow-xl group transition-transform duration-500">
                        <img 
                            src={post.featured_image} 
                            alt={post.title} 
                            className="w-full h-auto max-h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </motion.div>
            )}
            {/* Contenu de l'article */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="prose prose-lg dark:prose-invert max-w-none mb-16 bg-card/60 rounded-xl px-6 py-8 shadow-md mx-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/* Articles connexes */}
            {relatedPosts.length > 0 && (
                <div className="border-t border-border pt-12 mt-12">
                    <h3 className="text-2xl font-bold mb-8 text-center">Articles connexes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map((relatedPost, index) => (
                            <div key={relatedPost.id} className="bg-card/80 rounded-2xl shadow-md p-2 h-full flex">
                                <PostCard 
                                    post={relatedPost}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Bouton de retour */}
            <div className="mt-12 flex justify-center">
                <Button asChild className="rounded-full px-6 py-3 text-lg bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all flex items-center gap-2">
                    <Link href={route('blog.index')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        Retour aux articles
                    </Link>
                </Button>
            </div>
        </div>
    );
} 