import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, Code, ExternalLink, FileText, MessageSquare, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projets en cours',
        href: '/client/projects',
    },
];

// Types pour les projets
interface Project {
    id: string;
    name: string;
    description: string;
    status: 'planning' | 'in_progress' | 'review' | 'testing';
    progress: number;
    startDate: string;
    endDate: string;
    teamMembers: number;
    messages: number;
}

// Données d'exemple pour les projets
const projectsData: Project[] = [
    {
        id: 'PRJ-001',
        name: 'Site web e-commerce',
        description: 'Création d\'une boutique en ligne avec système de paiement intégré',
        status: 'in_progress',
        progress: 65,
        startDate: '2024-03-15',
        endDate: '2024-06-15',
        teamMembers: 3,
        messages: 12,
    },
    {
        id: 'PRJ-002',
        name: 'Application mobile',
        description: 'Développement d\'une application iOS et Android pour la gestion des stocks',
        status: 'planning',
        progress: 25,
        startDate: '2024-04-10',
        endDate: '2024-07-20',
        teamMembers: 4,
        messages: 8,
    },
    {
        id: 'PRJ-003',
        name: 'Refonte graphique',
        description: 'Mise à jour de l\'identité visuelle et des supports de communication',
        status: 'review',
        progress: 85,
        startDate: '2024-02-20',
        endDate: '2024-05-10',
        teamMembers: 2,
        messages: 24,
    },
];

export default function Projects() {
    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Obtenir le libellé et la couleur selon le statut du projet
    const getStatusInfo = (status: Project['status']) => {
        switch (status) {
            case 'planning':
                return { 
                    label: 'Planification', 
                    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' 
                };
            case 'in_progress':
                return { 
                    label: 'En développement', 
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                };
            case 'review':
                return { 
                    label: 'En révision', 
                    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' 
                };
            case 'testing':
                return { 
                    label: 'En test', 
                    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                };
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projets en cours" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <h1 className="mb-6 text-2xl font-semibold">Projets en cours</h1>
                    
                    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                        {projectsData.map((project) => {
                            const statusInfo = getStatusInfo(project.status);
                            return (
                                <div key={project.id} className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                    <div className="border-b border-neutral-200 p-4 dark:border-neutral-700">
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="font-medium">{project.name}</h3>
                                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">{project.description}</p>
                                        
                                        <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
                                            <span>Progression</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                                            <div 
                                                className="h-full rounded-full bg-primary" 
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 p-4 text-sm">
                                        <div className="flex items-center text-neutral-600 dark:text-neutral-300">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>Du {formatDate(project.startDate)} au {formatDate(project.endDate)}</span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-neutral-600 dark:text-neutral-300">
                                                <Users className="mr-2 h-4 w-4" />
                                                <span>{project.teamMembers} membres</span>
                                            </div>
                                            
                                            <div className="flex items-center text-neutral-600 dark:text-neutral-300">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                <span>{project.messages} messages</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto flex border-t border-neutral-200 dark:border-neutral-700">
                                        <a 
                                            href={`/client/projects/${project.id}`} 
                                            className="flex flex-1 items-center justify-center border-r border-neutral-200 py-3 text-sm font-medium text-primary hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-700"
                                        >
                                            <Code className="mr-2 h-4 w-4" />
                                            Détails
                                        </a>
                                        <a 
                                            href={`/client/projects/${project.id}/files`} 
                                            className="flex flex-1 items-center justify-center border-r border-neutral-200 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                        >
                                            <FileText className="mr-2 h-4 w-4" />
                                            Fichiers
                                        </a>
                                        <a 
                                            href={`/client/messages?project=${project.id}`} 
                                            className="flex flex-1 items-center justify-center py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                        >
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            Messages
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 