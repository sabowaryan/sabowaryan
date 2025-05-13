import { usePage } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { ArticleContent } from '@/components/Blog/ArticleContent';
import type { BreadcrumbItem } from '@/types';
import { MetaTags } from '@/components/Seo/MetaTags';
import { JsonLdArticle, JsonLdBreadcrumb } from '@/components/Seo/JsonLd';

interface Category {
    id: number;
    name: string;
    slug: string;
    url: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
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
}

interface BlogShowProps {
    post: Post;
    relatedPosts: Post[];
    meta: {
        title: string;
        description: string;
        keywords: string;
        canonical: string;
        image: string | null;
        author: string;
        published_time: string;
        modified_time: string;
        category: string | null;
    };
}

export default function BlogShow() {
    const { post, relatedPosts, meta } = usePage().props as unknown as BlogShowProps;
    
    // Récupérer la première catégorie comme catégorie principale
    const mainCategory = post.categories && post.categories.length > 0 ? post.categories[0] : null;
    
    // Définir les breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: '/' },
        { title: 'Blog', href: '/blog' }
    ];
    
    // Ajouter la catégorie principale aux breadcrumbs si elle existe
    if (mainCategory) {
        breadcrumbs.push({ 
            title: mainCategory.name, 
            href: mainCategory.url || `/blog?category=${mainCategory.slug}` 
        });
    }
    
    // Ajouter le titre de l'article aux breadcrumbs
    breadcrumbs.push({ title: post.title, href: post.url });
    
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
                image={meta.image || undefined}
                author={meta.author}
                published_time={meta.published_time}
                modified_time={meta.modified_time}
                category={meta.category || undefined}
                type="article"
            />
            
            {/* JSON-LD pour l'article */}
            <JsonLdArticle
                title={meta.title}
                description={meta.description}
                url={meta.canonical}
                imageUrl={meta.image || undefined}
                author={{
                    name: meta.author,
                }}
                publishedTime={meta.published_time}
                modifiedTime={meta.modified_time}
                category={meta.category || undefined}
            />
            
            {/* JSON-LD pour les breadcrumbs */}
            <JsonLdBreadcrumb items={jsonLdBreadcrumbs} />
            
            <main className="relative min-h-screen">
                <ArticleContent post={post} relatedPosts={relatedPosts} />
            </main>
        </GuestLayout>
    );
} 