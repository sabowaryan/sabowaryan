import { Head } from '@inertiajs/react';

interface MetaTagsProps {
    title: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    image?: string;
    author?: string;
    published_time?: string;
    modified_time?: string;
    category?: string;
    type?: 'website' | 'article';
}

export function MetaTags({
    title,
    description,
    keywords,
    canonical,
    image,
    author,
    published_time,
    modified_time,
    category,
    type = 'website'
}: MetaTagsProps) {
    const siteName = 'Ryan Sabowa - Portfolio & Blog';
    const twitterUsername = '@sabowaryan';
    
    return (
        <Head>
            {/* Balises méta de base */}
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}
            
            {/* Balises Open Graph */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content={type} />
            {canonical && <meta property="og:url" content={canonical} />}
            {image && <meta property="og:image" content={image} />}
            {image && <meta property="og:image:alt" content={title} />}
            
            {/* Balises Twitter */}
            <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
            <meta name="twitter:site" content={twitterUsername} />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            {image && <meta name="twitter:image" content={image} />}
            {image && <meta name="twitter:image:alt" content={title} />}
            
            {/* Balises article spécifiques */}
            {type === 'article' && author && <meta property="article:author" content={author} />}
            {type === 'article' && published_time && <meta property="article:published_time" content={published_time} />}
            {type === 'article' && modified_time && <meta property="article:modified_time" content={modified_time} />}
            {type === 'article' && category && <meta property="article:section" content={category} />}
        </Head>
    );
} 