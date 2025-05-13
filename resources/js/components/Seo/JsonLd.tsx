import React from 'react';
import { Head } from '@inertiajs/react';

export interface JsonLdArticleProps {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
    author: {
        name: string;
        url?: string;
    };
    publishedTime: string;
    modifiedTime: string;
    category?: string;
}

export interface JsonLdBreadcrumbProps {
    items: Array<{
        name: string;
        url: string;
    }>;
}

export function JsonLdArticle({
    title,
    description,
    url,
    imageUrl,
    author,
    publishedTime,
    modifiedTime,
    category
}: JsonLdArticleProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title,
        'description': description,
        'image': imageUrl,
        'author': {
            '@type': 'Person',
            'name': author.name,
            'url': author.url
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Ryan Sabowa',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://sabowaryan.com/images/logo.png'
            }
        },
        'datePublished': publishedTime,
        'dateModified': modifiedTime,
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': url
        },
        ...(category && { 'articleSection': category })
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Head>
    );
}

export function JsonLdBreadcrumb({ items }: JsonLdBreadcrumbProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.name,
            'item': item.url
        }))
    };

    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Head>
    );
} 