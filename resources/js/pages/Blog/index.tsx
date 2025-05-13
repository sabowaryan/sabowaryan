import { Head, usePage } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import type { BreadcrumbItem } from '@/types';
import { BlogGrid } from '@/components/Blog/BlogGrid';
import { MetaTags } from '@/components/Seo/MetaTags';
import { JsonLdBreadcrumb } from '@/components/Seo/JsonLd';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    published_at: string;
    reading_time: number | null;
    is_featured: boolean;
    categories: Category[];
    author: {
        id: number;
        name: string;
    };
}

interface BlogProps {
    posts: {
        data: Post[];
        links: Array<any>;
        [key: string]: any;
    };
    categories: Category[];
    filters: {
        category: string | null;
    };
    meta: {
        title: string;
        description: string;
        keywords: string;
        canonical: string;
    };
}

export default function Blog() {
    const { posts, categories, filters, meta } = usePage().props as unknown as BlogProps;
    
    // Définir les breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: '/' },
        { title: 'Blog', href: '/blog' }
    ];
    
    // Ajouter la catégorie actuelle aux breadcrumbs si elle existe
    if (filters.category) {
        const categoryName = categories.find(cat => cat.slug === filters.category)?.name;
        if (categoryName) {
            breadcrumbs.push({
                title: categoryName,
                href: `/blog?category=${filters.category}`
            });
        }
    }
    
    // Préparer les données pour le JSON-LD Breadcrumb
    const jsonLdBreadcrumbs = breadcrumbs.map(item => ({
        name: item.title,
        url: `${window.location.origin}${item.href}`
    }));

    return (
        <GuestLayout breadcrumbs={breadcrumbs}>
            {/* SEO Meta Tags */}
            <MetaTags
                title={meta.title}
                description={meta.description}
                keywords={meta.keywords}
                canonical={meta.canonical}
            />
            
            {/* JSON-LD pour les breadcrumbs */}
            <JsonLdBreadcrumb items={jsonLdBreadcrumbs} />
            
            <main className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 py-16">
                {/* Effets de fond décoratifs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-[60%] -left-[10%] w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>
                </div>

                <div className={SITE_CONTAINER}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-12"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center mb-16"
                        >
                            <motion.span 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className={cn(
                                    "inline-block text-sm font-medium mb-4 px-4 py-1.5 rounded-full",
                                    "bg-primary/10 dark:bg-primary/20 backdrop-blur-sm shadow-sm",
                                    "border border-primary/20 dark:border-primary/30",
                                    "text-primary dark:text-primary-foreground"
                                )}
                            >
                                Explorez nos articles
                            </motion.span>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className={cn(
                                    "text-4xl md:text-5xl font-bold mb-6",
                                    "bg-gradient-to-r from-foreground to-foreground/80 dark:from-foreground/90 dark:to-foreground/70",
                                    "bg-clip-text text-transparent"
                                )}
                            >
                                Notre Blog
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                            >
                                Découvrez nos derniers articles et actualités sur le développement web, 
                                les nouvelles technologies et les meilleures pratiques.
                            </motion.p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="relative"
                        >
                <BlogGrid 
                    posts={posts} 
                    categories={categories}
                    filters={filters}
                />
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </GuestLayout>
    );
} 