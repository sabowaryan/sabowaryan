import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowRight, Book, Clipboard, HelpCircle, LifeBuoy, MessageSquare, Phone, Plus, Search, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Support',
        href: '/client/support',
    },
];

// Types pour le support
interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: number;
    dateUpdated: string;
}

interface Ticket {
    id: string;
    title: string;
    status: 'new' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    category: string;
    dateCreated: string;
    lastUpdated: string;
    messages: number;
}

// Données d'exemple pour les FAQ
const faqData: FAQ[] = [
    {
        id: 'faq-001',
        question: 'Comment puis-je modifier mon mot de passe ?',
        answer: 'Pour modifier votre mot de passe, rendez-vous dans les paramètres de votre compte, puis dans la section "Sécurité". Vous pourrez alors cliquer sur "Modifier le mot de passe" et suivre les instructions.',
        category: 'Compte',
    },
    {
        id: 'faq-002',
        question: 'Comment suivre l\'avancement de mon projet ?',
        answer: 'Vous pouvez suivre l\'avancement de votre projet dans la section "Projets en cours" de votre tableau de bord. Vous y trouverez des informations détaillées sur chaque étape du projet.',
        category: 'Projets',
    },
    {
        id: 'faq-003',
        question: 'Comment puis-je télécharger mes factures ?',
        answer: 'Les factures sont disponibles dans la section "Facturation". Vous pouvez les consulter en ligne ou les télécharger au format PDF en cliquant sur l\'icône de téléchargement.',
        category: 'Facturation',
    },
];

// Données d'exemple pour les articles de la base de connaissances
const articlesData: Article[] = [
    {
        id: 'art-001',
        title: 'Guide complet du processus de développement web',
        excerpt: 'Découvrez toutes les étapes du développement de votre site web, de la conception à la mise en ligne.',
        category: 'Projets',
        readTime: 8,
        dateUpdated: '2024-03-15',
    },
    {
        id: 'art-002',
        title: 'Comprendre vos factures et options de paiement',
        excerpt: 'Tout ce que vous devez savoir sur la facturation, les modalités de paiement et les échéances.',
        category: 'Facturation',
        readTime: 5,
        dateUpdated: '2024-04-10',
    },
    {
        id: 'art-003',
        title: 'Comment communiquer efficacement avec votre équipe de développement',
        excerpt: 'Conseils pour une communication claire et productive avec les développeurs de votre projet.',
        category: 'Communication',
        readTime: 6,
        dateUpdated: '2024-04-22',
    },
];

// Données d'exemple pour les tickets de support
const ticketsData: Ticket[] = [
    {
        id: 'TKT-001',
        title: 'Problème d\'affichage sur la page d\'accueil',
        status: 'in_progress',
        priority: 'medium',
        category: 'Bug',
        dateCreated: '2024-04-20',
        lastUpdated: '2024-04-22',
        messages: 3,
    },
    {
        id: 'TKT-002',
        title: 'Question concernant la facture FACT-2024-001',
        status: 'new',
        priority: 'low',
        category: 'Facturation',
        dateCreated: '2024-04-23',
        lastUpdated: '2024-04-23',
        messages: 1,
    },
];

export default function Support() {
    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Obtenir la couleur selon le statut et la priorité du ticket
    const getStatusInfo = (status: Ticket['status']) => {
        switch (status) {
            case 'new':
                return { label: 'Nouveau', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' };
            case 'in_progress':
                return { label: 'En cours', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' };
            case 'resolved':
                return { label: 'Résolu', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' };
            case 'closed':
                return { label: 'Fermé', color: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300' };
        }
    };

    const getPriorityInfo = (priority: Ticket['priority']) => {
        switch (priority) {
            case 'low':
                return { label: 'Basse', color: 'text-green-600 dark:text-green-400' };
            case 'medium':
                return { label: 'Moyenne', color: 'text-amber-600 dark:text-amber-400' };
            case 'high':
                return { label: 'Haute', color: 'text-red-600 dark:text-red-400' };
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Support" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                {/* Bannière de support */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-dark p-6 text-white shadow-md">
                    <div className="relative z-10 flex flex-col gap-3 md:w-2/3">
                        <h1 className="text-2xl font-semibold">Centre de support</h1>
                        <p className="text-primary-50">
                            Besoin d'aide ? Consultez notre base de connaissances, parcourez les questions fréquentes ou créez un ticket pour obtenir de l'assistance personnalisée.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3">
                            <a 
                                href="/client/messages/new" 
                                className="flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-neutral-100"
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Nouveau message
                            </a>
                            <a 
                                href="tel:+33123456789" 
                                className="flex items-center rounded-md bg-primary-dark/30 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm hover:bg-primary-dark/40"
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                Nous appeler
                            </a>
                        </div>
                    </div>
                    {/* Élément décoratif */}
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary-light/20 blur-3xl"></div>
                    <div className="absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-primary-light/30 blur-3xl"></div>
                </div>
                
                {/* Recherche */}
                <div className="mx-auto w-full max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher dans le centre d'aide..."
                            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        />
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
                    </div>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                    {/* FAQ et Base de connaissances */}
                    <div className="flex flex-col gap-8">
                        {/* FAQ */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center">
                                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                                    <h2 className="text-lg font-semibold">Questions fréquentes</h2>
                                </div>
                                <a href="/client/support/faq" className="text-sm text-primary hover:underline">
                                    Voir toutes
                                </a>
                            </div>
                            
                            <div className="space-y-4">
                                {faqData.slice(0, 3).map((faq) => (
                                    <div 
                                        key={faq.id} 
                                        className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700"
                                    >
                                        <h3 className="mb-2 font-medium">{faq.question}</h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                            {faq.answer}
                                        </p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                {faq.category}
                                            </span>
                                            <a 
                                                href={`/client/support/faq/${faq.id}`} 
                                                className="flex items-center text-xs font-medium text-primary hover:underline"
                                            >
                                                En savoir plus
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Base de connaissances */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center">
                                    <Book className="mr-2 h-5 w-5 text-primary" />
                                    <h2 className="text-lg font-semibold">Base de connaissances</h2>
                                </div>
                                <a href="/client/support/articles" className="text-sm text-primary hover:underline">
                                    Explorer
                                </a>
                            </div>
                            
                            <div className="space-y-4">
                                {articlesData.map((article) => (
                                    <div 
                                        key={article.id} 
                                        className="rounded-lg border border-neutral-200 p-4 hover:border-primary/30 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-primary/30 dark:hover:bg-neutral-800/50"
                                    >
                                        <a href={`/client/support/articles/${article.id}`}>
                                            <h3 className="mb-2 font-medium hover:text-primary">{article.title}</h3>
                                            <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-neutral-500">
                                                <span>{article.category}</span>
                                                <div className="flex items-center gap-2">
                                                    <span>{article.readTime} min de lecture</span>
                                                    <span>•</span>
                                                    <span>Mis à jour le {formatDate(article.dateUpdated)}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Tickets de support et contact */}
                    <div className="flex flex-col gap-8">
                        {/* Tickets de support */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center">
                                    <Clipboard className="mr-2 h-5 w-5 text-primary" />
                                    <h2 className="text-lg font-semibold">Mes tickets</h2>
                                </div>
                                <a 
                                    href="/client/support/tickets/new"
                                    className="flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90"
                                >
                                    <Plus className="mr-1 h-4 w-4" />
                                    Nouveau ticket
                                </a>
                            </div>
                            
                            {ticketsData.length > 0 ? (
                                <div className="space-y-4">
                                    {ticketsData.map((ticket) => {
                                        const statusInfo = getStatusInfo(ticket.status);
                                        const priorityInfo = getPriorityInfo(ticket.priority);
                                        
                                        return (
                                            <div 
                                                key={ticket.id} 
                                                className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700"
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <h3 className="font-medium">{ticket.title}</h3>
                                                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.color}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </div>
                                                
                                                <div className="mb-3 flex items-center gap-4 text-sm">
                                                    <div>
                                                        <span className="mr-1 text-neutral-500">ID:</span> 
                                                        {ticket.id}
                                                    </div>
                                                    <div>
                                                        <span className="mr-1 text-neutral-500">Catégorie:</span> 
                                                        {ticket.category}
                                                    </div>
                                                    <div>
                                                        <span className="mr-1 text-neutral-500">Priorité:</span> 
                                                        <span className={priorityInfo.color}>{priorityInfo.label}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                                    <div>
                                                        Créé le {formatDate(ticket.dateCreated)}
                                                        {ticket.dateCreated !== ticket.lastUpdated && (
                                                            <span> • Mis à jour le {formatDate(ticket.lastUpdated)}</span>
                                                        )}
                                                    </div>
                                                    
                                                    <a 
                                                        href={`/client/support/tickets/${ticket.id}`} 
                                                        className="flex items-center font-medium text-primary hover:underline"
                                                    >
                                                        <MessageSquare className="mr-1 h-3.5 w-3.5" />
                                                        {ticket.messages} message{ticket.messages > 1 ? 's' : ''}
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-8 dark:border-neutral-700">
                                    <LifeBuoy className="mb-2 h-12 w-12 text-neutral-300 dark:text-neutral-600" />
                                    <p className="mb-2 text-neutral-500">Vous n'avez aucun ticket actif pour le moment</p>
                                    <button className="mt-2 text-sm font-medium text-primary hover:underline">
                                        Créer un ticket
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {/* Contactez-nous */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <h2 className="mb-5 text-lg font-semibold">Contactez-nous</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-start rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-medium">Par message</h3>
                                        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                                            Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
                                        </p>
                                        <a 
                                            href="/client/messages/new" 
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            Envoyer un message
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-medium">Par téléphone</h3>
                                        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                                            Du lundi au vendredi, de 9h à 18h
                                        </p>
                                        <a 
                                            href="tel:+33123456789" 
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            +33 1 23 45 67 89
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-medium">Contact commercial</h3>
                                        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                                            Pour toute demande concernant vos projets ou un nouveau devis.
                                        </p>
                                        <a 
                                            href="mailto:commercial@example.com" 
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            commercial@example.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 