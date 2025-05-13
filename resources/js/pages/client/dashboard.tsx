import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart3, CheckCircle, Clock, CreditCard, FileText, HelpCircle, MessageSquare, Package } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Types pour les données
interface StatCard {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: {
        value: string;
        positive: boolean;
    };
    link: string;
}

interface Project {
    id: string;
    name: string;
    progress: number;
    dueDate: string;
    status: 'in_progress' | 'waiting' | 'review';
}

interface Activity {
    id: string;
    type: 'message' | 'invoice' | 'project_update' | 'support';
    title: string;
    description: string;
    date: string;
    link: string;
}

interface PageProps {
    user: any;
    role: string;
    stats: {
        projectsInProgress: number;
        recentOrders: number;
        unreadMessages: number;
        unpaidInvoices: number;
    };
    recentProjects: Project[];
    recentActivity: Activity[];
}

export default function Dashboard({ stats, recentProjects, recentActivity }: PageProps) {
    // Données pour les cartes statistiques
    const statCards: StatCard[] = [
        {
            title: 'Projets en cours',
            value: stats.projectsInProgress,
            icon: <Package className="h-5 w-5 text-primary" />,
            change: {
                value: '+1 ce mois',
                positive: true
            },
            link: '/client/projects'
        },
        {
            title: 'Commandes récentes',
            value: stats.recentOrders,
            icon: <Clock className="h-5 w-5 text-amber-500" />,
            link: '/client/orders'
        },
        {
            title: 'Messages non lus',
            value: stats.unreadMessages,
            icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
            change: {
                value: '2 nouveaux',
                positive: true
            },
            link: '/client/messages'
        },
        {
            title: 'Factures impayées',
            value: `${stats.unpaidInvoices} €`,
            icon: <CreditCard className="h-5 w-5 text-red-500" />,
            link: '/client/billing'
        }
    ];

    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Obtenir l'icône pour le type d'activité
    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'message':
                return <MessageSquare className="h-4 w-4 text-blue-500" />;
            case 'invoice':
                return <CreditCard className="h-4 w-4 text-red-500" />;
            case 'project_update':
                return <BarChart3 className="h-4 w-4 text-primary" />;
            case 'support':
                return <HelpCircle className="h-4 w-4 text-amber-500" />;
        }
    };

    // Obtenir la couleur et l'étiquette pour le statut du projet
    const getProjectStatusInfo = (status: Project['status']) => {
        switch (status) {
            case 'in_progress':
                return {
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
                    label: 'En cours'
                };
            case 'waiting':
                return {
                    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
                    label: 'En attente'
                };
            case 'review':
                return {
                    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
                    label: 'En révision'
                };
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Section de bienvenue */}
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <h1 className="text-2xl font-semibold">Bienvenue sur votre tableau de bord</h1>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                        Gérez vos projets, commandes et factures à partir de cet espace centralisé.
                    </p>
                </div>

                {/* Cartes statistiques */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card, index) => (
                        <Link
                            key={index}
                            href={card.link}
                            className="flex flex-col rounded-xl bg-white p-5 shadow-sm transition-transform hover:translate-y-[-2px] dark:bg-neutral-900"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                                    {card.icon}
                                </span>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {card.change && (
                                        <span className={card.change.positive ? 'text-green-500' : 'text-red-500'}>
                                            {card.change.value}
                                        </span>
                                    )}
                                </span>
                            </div>
                            <h3 className="mb-1 text-lg font-medium">{card.value}</h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{card.title}</p>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Projets récents */}
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-medium">Projets récents</h2>
                            <Link 
                                href="/client/projects" 
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Voir tous
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentProjects.map((project) => {
                                const statusInfo = getProjectStatusInfo(project.status);
                                return (
                                    <Link 
                                        key={project.id} 
                                        href={`/client/projects/${project.id}`}
                                        className="flex flex-col rounded-lg border border-neutral-200 p-4 hover:border-primary dark:border-neutral-700"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="font-medium">{project.name}</h3>
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                        <div className="mb-1.5 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                                            <span>Progression</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
                                            <div 
                                                className="h-full rounded-full bg-primary" 
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                            <span>Échéance: {formatDate(project.dueDate)}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Activité récente */}
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-medium">Activité récente</h2>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <Link 
                                    key={activity.id} 
                                    href={activity.link}
                                    className="flex items-start gap-3 rounded-lg border border-transparent p-2 hover:border-neutral-200 hover:bg-neutral-50 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/50"
                                >
                                    <div className="mt-0.5 rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="mb-1 font-medium">{activity.title}</h4>
                                        <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
                                            {activity.description}
                                        </p>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-500">
                                            {formatDate(activity.date)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
