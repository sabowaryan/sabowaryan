import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Book, Calendar, Clock, Copy, HelpCircle, Mail, MessageSquare, Phone, Share2, ThumbsUp, User } from 'lucide-react';

interface PageProps {
    articleId: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Support',
        href: '/client/support',
    },
    {
        title: 'Articles',
        href: '/client/support/articles',
    },
    {
        title: 'Détail de l\'article',
        href: '#',
    },
];

interface Article {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    author: {
        name: string;
        title: string;
        avatar?: string;
    };
    datePublished: string;
    dateUpdated: string;
    readTime: number;
    helpfulCount: number;
    relatedArticles: RelatedArticle[];
    relatedFaqs: RelatedFaq[];
}

interface RelatedArticle {
    id: string;
    title: string;
    excerpt: string;
    category: string;
}

interface RelatedFaq {
    id: string;
    question: string;
}

// Données d'exemple pour les articles
const articlesData: Record<string, Article> = {
    'art-001': {
        id: 'art-001',
        title: 'Guide complet du processus de développement web',
        excerpt: 'Découvrez toutes les étapes du développement de votre site web, de la conception à la mise en ligne.',
        content: `
# Guide complet du processus de développement web

Le développement d'un site web est un processus complexe qui demande une planification minutieuse et une exécution rigoureuse. Cet article vous présente les différentes étapes nécessaires pour mener à bien votre projet web.

## 1. Analyse des besoins et planification

Avant de commencer le développement proprement dit, il est essentiel de bien définir vos besoins et objectifs. Cette phase initiale comprend :

- La définition des objectifs du site
- L'identification du public cible
- L'analyse des sites concurrents
- L'élaboration d'un plan de site
- La définition du budget et du calendrier

## 2. Conception et wireframing

Une fois les besoins identifiés, l'étape suivante consiste à élaborer la structure et le design du site :

- Création de wireframes (maquettes filaires)
- Conception de l'architecture de l'information
- Élaboration de maquettes graphiques
- Validation de l'expérience utilisateur (UX)

## 3. Développement frontend

Cette phase consiste à transformer les maquettes en pages web fonctionnelles :

- Intégration HTML/CSS
- Développement JavaScript pour les interactions
- Optimisation pour différents appareils (responsive design)
- Tests de compatibilité navigateurs

## 4. Développement backend

Le développement backend concerne toute la partie invisible pour l'utilisateur, mais essentielle au fonctionnement du site :

- Mise en place de la base de données
- Développement des fonctionnalités serveur
- Création du système de gestion de contenu
- Implémentation des API nécessaires

## 5. Tests et assurance qualité

Avant de mettre en ligne le site, une phase rigoureuse de tests est indispensable :

- Tests fonctionnels
- Tests de performance
- Tests de sécurité
- Tests d'accessibilité
- Correction des bugs identifiés

## 6. Mise en ligne et maintenance

Enfin, le site est prêt à être publié, mais le travail ne s'arrête pas là :

- Configuration du serveur
- Déploiement du site
- Mise en place du monitoring
- Maintenance régulière et mises à jour
- Améliorations continues basées sur les retours utilisateurs

En suivant ces étapes méthodiquement, vous maximisez les chances de réussite de votre projet web. N'hésitez pas à contacter notre équipe pour vous accompagner dans ce processus.
        `,
        category: 'Projets',
        tags: ['Développement web', 'Processus', 'Méthodologie', 'Frontend', 'Backend'],
        author: {
            name: 'Sophie Martin',
            title: 'Chef de projet digital',
            avatar: '/img/avatars/avatar-1.jpg',
        },
        datePublished: '2024-03-10',
        dateUpdated: '2024-03-15',
        readTime: 8,
        helpfulCount: 42,
        relatedArticles: [
            {
                id: 'art-003',
                title: 'Comment communiquer efficacement avec votre équipe de développement',
                excerpt: 'Conseils pour une communication claire et productive avec les développeurs de votre projet.',
                category: 'Communication',
            },
            {
                id: 'art-002',
                title: 'Comprendre vos factures et options de paiement',
                excerpt: 'Tout ce que vous devez savoir sur la facturation, les modalités de paiement et les échéances.',
                category: 'Facturation',
            }
        ],
        relatedFaqs: [
            {
                id: 'faq-002',
                question: 'Comment suivre l\'avancement de mon projet ?',
            },
            {
                id: 'faq-005',
                question: 'Quelles sont les différentes étapes d\'un projet web ?',
            }
        ]
    },
    'art-002': {
        id: 'art-002',
        title: 'Comprendre vos factures et options de paiement',
        excerpt: 'Tout ce que vous devez savoir sur la facturation, les modalités de paiement et les échéances.',
        content: `
# Comprendre vos factures et options de paiement

Chez Herd Digital, nous nous efforçons de rendre notre processus de facturation aussi transparent et simple que possible. Cet article vous aide à comprendre comment fonctionne notre système de facturation et quelles sont vos options de paiement.

## Structure de nos factures

Nos factures comprennent les éléments suivants :

- **Informations de l'entreprise** : Nos coordonnées complètes
- **Informations client** : Vos coordonnées et numéro client
- **Numéro de facture** : Référence unique pour chaque facture
- **Date d'émission** : Date à laquelle la facture a été créée
- **Date d'échéance** : Date limite de paiement
- **Détail des prestations** : Description des services facturés
- **Montants** : Prix unitaires, sous-total, TVA et montant total

## Modalités de paiement

Nous offrons plusieurs méthodes de paiement pour vous faciliter la vie :

### Carte bancaire
Paiement sécurisé en ligne via notre interface client. Nous acceptons Visa, Mastercard et American Express.

### Virement bancaire
Nos coordonnées bancaires sont indiquées sur chaque facture. Merci de mentionner le numéro de facture dans le libellé de votre virement.

### Prélèvement automatique
Pour les contrats récurrents, nous proposons la mise en place de prélèvements automatiques mensuels ou trimestriels.

## Échéances de paiement

Nos factures sont généralement payables à 30 jours date de facture. Pour certains projets, nous pouvons proposer les modalités suivantes :

- **Acompte** : 30% à la commande
- **Paiement intermédiaire** : 30% à mi-projet
- **Solde** : 40% à la livraison

## Questions fréquentes

### Que faire si je trouve une erreur sur ma facture ?
Contactez immédiatement notre service comptabilité à l'adresse comptabilite@example.com ou par téléphone.

### Puis-je obtenir un échéancier de paiement ?
Pour les projets importants, nous pouvons étudier la mise en place d'un échéancier personnalisé. Contactez votre chargé de compte pour en discuter.

### Comment obtenir un duplicata de facture ?
Vous pouvez télécharger tous vos documents depuis votre espace client ou en faire la demande par email.

## Besoin d'aide supplémentaire ?

Si vous avez des questions concernant votre facture ou si vous rencontrez des difficultés pour effectuer un paiement, n'hésitez pas à contacter notre service client. Nous sommes là pour vous aider.
        `,
        category: 'Facturation',
        tags: ['Facturation', 'Paiement', 'Comptabilité', 'Factures'],
        author: {
            name: 'Marc Dubois',
            title: 'Responsable comptabilité',
            avatar: '/img/avatars/avatar-4.jpg',
        },
        datePublished: '2024-04-05',
        dateUpdated: '2024-04-10',
        readTime: 5,
        helpfulCount: 28,
        relatedArticles: [
            {
                id: 'art-001',
                title: 'Guide complet du processus de développement web',
                excerpt: 'Découvrez toutes les étapes du développement de votre site web, de la conception à la mise en ligne.',
                category: 'Projets',
            }
        ],
        relatedFaqs: [
            {
                id: 'faq-003',
                question: 'Comment puis-je télécharger mes factures ?',
            },
            {
                id: 'faq-006',
                question: 'Quels sont les moyens de paiement acceptés ?',
            }
        ]
    },
    'art-003': {
        id: 'art-003',
        title: 'Comment communiquer efficacement avec votre équipe de développement',
        excerpt: 'Conseils pour une communication claire et productive avec les développeurs de votre projet.',
        content: `
# Comment communiquer efficacement avec votre équipe de développement

Une communication claire et efficace est l'un des facteurs clés de réussite d'un projet digital. Cet article vous propose des conseils pratiques pour optimiser vos échanges avec l'équipe de développement et garantir le succès de votre projet.

## L'importance d'une communication efficace

Un projet digital implique souvent des concepts techniques complexes. Une bonne communication permet de :

- Éviter les malentendus et les erreurs d'interprétation
- Réduire les délais et les coûts supplémentaires
- Maintenir une vision commune des objectifs
- Créer une relation de confiance et de collaboration

## Préparer vos échanges

### Structurez vos demandes

Avant de contacter votre équipe de développement, prenez le temps de structurer votre pensée :

- **Contexte** : Expliquez pourquoi vous faites cette demande
- **Description** : Détaillez précisément ce que vous souhaitez
- **Objectif** : Clarifiez le résultat attendu
- **Priorité** : Indiquez l'urgence relative de votre demande

### Utilisez les outils appropriés

Choisissez le bon canal de communication selon la nature de votre message :

- **Messagerie instantanée** : Pour les questions rapides et simples
- **Email** : Pour les informations détaillées qui nécessitent une trace écrite
- **Visioconférence** : Pour les discussions complexes nécessitant des explications visuelles
- **Outil de gestion de projet** : Pour le suivi des tâches et des tickets

## Pendant vos échanges

### Soyez précis et concret

Les développeurs apprécient la précision. Évitez les demandes vagues comme "Je n'aime pas le design" ou "Ça ne fonctionne pas". Préférez des formulations comme :

- "Le bouton de contact n'est pas visible sur un écran mobile de 375px de large"
- "Quand je clique sur 'Enregistrer', j'obtiens un message d'erreur qui indique : [message exact]"

### Utilisez des captures d'écran et des vidéos

Une image vaut mille mots. Pour signaler un problème :

- Faites une capture d'écran et annotez-la pour indiquer l'élément concerné
- Enregistrez une courte vidéo qui reproduit le problème
- Précisez votre environnement (navigateur, système d'exploitation, appareil)

### Évitez le jargon non technique

Si vous n'êtes pas sûr d'utiliser correctement un terme technique, préférez une explication simple. Cela évitera les confusions et les mauvaises interprétations.

## Après vos échanges

### Validez votre compréhension

Après une discussion importante, prenez l'habitude de résumer les points clés et les prochaines étapes. Cela permet de s'assurer que tout le monde partage la même compréhension.

### Donnez des retours constructifs

Quand vous testez une fonctionnalité, structurez vos retours de manière constructive :

- Ce qui fonctionne bien
- Ce qui doit être amélioré
- Des suggestions concrètes d'amélioration

## Les réunions de projet

### Préparez un agenda

Pour des réunions efficaces avec votre équipe de développement :

- Envoyez un agenda précis à l'avance
- Respectez le temps imparti
- Prenez des notes et partagez-les après la réunion
- Définissez clairement les actions à entreprendre et leurs responsables

### Les réunions régulières

Nous recommandons d'établir un rythme de réunions régulières :

- **Sprint planning** : Pour définir les priorités de la période à venir
- **Stand-up quotidien** : Court point d'avancement (15 minutes maximum)
- **Démo/review** : Pour présenter et valider les fonctionnalités développées
- **Rétrospective** : Pour améliorer continuellement la collaboration

## Conclusion

Une communication efficace avec votre équipe de développement repose sur la clarté, la précision et la régularité. En suivant ces conseils, vous contribuerez activement à la réussite de votre projet digital.

N'hésitez pas à discuter avec votre chef de projet pour adapter ces recommandations à votre contexte spécifique.
        `,
        category: 'Communication',
        tags: ['Communication', 'Gestion de projet', 'Équipe', 'Collaboration', 'Développement'],
        author: {
            name: 'Julie Lefèvre',
            title: 'Responsable Relation Client',
            avatar: '/img/avatars/avatar-3.jpg',
        },
        datePublished: '2024-04-18',
        dateUpdated: '2024-04-22',
        readTime: 6,
        helpfulCount: 35,
        relatedArticles: [
            {
                id: 'art-001',
                title: 'Guide complet du processus de développement web',
                excerpt: 'Découvrez toutes les étapes du développement de votre site web, de la conception à la mise en ligne.',
                category: 'Projets',
            }
        ],
        relatedFaqs: [
            {
                id: 'faq-007',
                question: 'Comment signaler un bug ou un problème technique ?',
            },
            {
                id: 'faq-008',
                question: 'Quels sont les canaux de communication disponibles ?',
            }
        ]
    }
};

export default function ArticleDetail({ articleId }: PageProps) {
    // Récupérer les données de l'article
    const article = articlesData[articleId] || {
        id: articleId,
        title: 'Article introuvable',
        content: 'Cet article n\'existe pas ou a été supprimé.',
        excerpt: '',
        category: '',
        tags: [],
        author: {
            name: 'Inconnu',
            title: '',
        },
        datePublished: '',
        dateUpdated: '',
        readTime: 0,
        helpfulCount: 0,
        relatedArticles: [],
        relatedFaqs: []
    };

    // Formater la date
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Convertir le contenu Markdown en HTML
    // Dans une application réelle, utilisez une bibliothèque comme marked ou react-markdown
    const renderContent = () => {
        // Simple mise en forme basique pour l'exemple
        const contentWithHeadings = article.content
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-5">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2 mt-4">$1</h3>')
            .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
            .replace(/<\/li>\n<li/g, '</li><li')
            .split('\n\n').join('<br><br>');
        
        return (
            <div 
                className="prose prose-neutral max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: contentWithHeadings }}
            />
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={article.title} />
            <div className="flex h-full flex-1 flex-col p-4">
                <div className="mb-6">
                    <a 
                        href="/client/support/articles" 
                        className="flex w-fit items-center rounded-md text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Retour aux articles
                    </a>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                        {/* Article principal */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-sm text-neutral-500">
                                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary dark:bg-primary/20">
                                        {article.category}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center">
                                        <Clock className="mr-1 h-3.5 w-3.5" />
                                        {article.readTime} min de lecture
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center">
                                        <Calendar className="mr-1 h-3.5 w-3.5" />
                                        Mis à jour le {formatDate(article.dateUpdated)}
                                    </span>
                                </div>

                                <h1 className="mb-4 mt-2 text-2xl font-bold">{article.title}</h1>
                                <p className="text-neutral-600 dark:text-neutral-300">{article.excerpt}</p>
                            </div>

                            {/* Contenu de l'article */}
                            <div className="mb-8 border-b border-neutral-200 pb-8 dark:border-neutral-700">
                                {renderContent()}
                            </div>

                            {/* Tags */}
                            <div className="mb-6">
                                <h2 className="mb-3 text-sm font-medium">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center text-sm text-neutral-600 hover:text-primary dark:text-neutral-400">
                                        <ThumbsUp className="mr-1.5 h-4 w-4" />
                                        Utile ({article.helpfulCount})
                                    </button>
                                    <button className="flex items-center text-sm text-neutral-600 hover:text-primary dark:text-neutral-400">
                                        <Copy className="mr-1.5 h-4 w-4" />
                                        Copier le lien
                                    </button>
                                </div>
                                <button className="flex items-center rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800">
                                    <Share2 className="mr-1.5 h-4 w-4" />
                                    Partager
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Auteur */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Auteur</h2>
                            <div className="flex items-center">
                                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                                    {article.author.avatar ? (
                                        <img 
                                            src={article.author.avatar} 
                                            alt={article.author.name} 
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-500 dark:bg-neutral-700">
                                            <User className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">{article.author.name}</div>
                                    <div className="text-sm text-neutral-500">{article.author.title}</div>
                                </div>
                            </div>
                        </div>

                        {/* Articles liés */}
                        {article.relatedArticles.length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                                <h2 className="mb-4 text-lg font-medium">Articles liés</h2>
                                <div className="space-y-4">
                                    {article.relatedArticles.map((related) => (
                                        <a 
                                            key={related.id} 
                                            href={`/client/support/articles/${related.id}`}
                                            className="block rounded-lg border border-neutral-200 p-4 hover:border-primary dark:border-neutral-700 dark:hover:border-primary"
                                        >
                                            <div className="mb-1 font-medium">{related.title}</div>
                                            <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                                {related.excerpt}
                                            </p>
                                            <span className="text-xs text-neutral-500">{related.category}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQ liées */}
                        {article.relatedFaqs.length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                                <h2 className="mb-4 text-lg font-medium">Questions liées</h2>
                                <div className="space-y-3">
                                    {article.relatedFaqs.map((faq) => (
                                        <a 
                                            key={faq.id} 
                                            href={`/client/support/faq/${faq.id}`}
                                            className="flex items-start rounded-lg border border-neutral-200 p-3 hover:border-primary dark:border-neutral-700 dark:hover:border-primary"
                                        >
                                            <HelpCircle className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                                            <span className="font-medium">{faq.question}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Besoin d'aide ? */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Besoin d'aide supplémentaire ?</h2>
                            <div className="space-y-4">
                                <a 
                                    href="/client/support/tickets/new" 
                                    className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Créer un ticket de support
                                </a>
                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                    <Phone className="mr-2 h-4 w-4 text-primary" />
                                    <span>Appelez-nous : +33 1 23 45 67 89</span>
                                </div>
                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                    <Mail className="mr-2 h-4 w-4 text-primary" />
                                    <span>support@herddigital.fr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 