import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, Code, Download, ExternalLink, FileText, Link2, MessageSquare, Users, CheckCircle, Activity, Briefcase, Map, Paperclip } from 'lucide-react';

interface PageProps {
    projectId: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projets',
        href: '/client/projects',
    },
    {
        title: 'Détails du projet',
        href: '#',
    },
];

// Types pour le projet
interface ProjectDetail {
    id: string;
    name: string;
    description: string;
    status: 'planning' | 'in_progress' | 'review' | 'testing';
    progress: number;
    startDate: string;
    endDate: string;
    budget: string;
    teamMembers: TeamMember[];
    milestones: Milestone[];
    technologies: string[];
    manager: {
        name: string;
        role: string;
        avatar?: string;
    };
    attachments: Attachment[];
}

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

interface Milestone {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
}

interface Attachment {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    url: string;
}

// Données d'exemple pour le projet
const projectData: Record<string, ProjectDetail> = {
    'PRJ-001': {
        id: 'PRJ-001',
        name: 'Site web e-commerce',
        description: 'Création d\'une boutique en ligne complète avec système de paiement intégré, gestion des stocks et interface d\'administration. Le site inclut également un blog, des fiches produits détaillées et un système de recommandation personnalisée.',
        status: 'in_progress',
        progress: 65,
        startDate: '2024-03-15',
        endDate: '2024-06-15',
        budget: '8 500 €',
        teamMembers: [
            { id: 'TM1', name: 'Sophie Martin', role: 'Chef de projet', avatar: '/img/avatars/avatar-1.jpg' },
            { id: 'TM2', name: 'Thomas Dubois', role: 'Développeur frontend', avatar: '/img/avatars/avatar-2.jpg' },
            { id: 'TM3', name: 'Julie Lefèvre', role: 'Designer UI/UX', avatar: '/img/avatars/avatar-3.jpg' },
        ],
        milestones: [
            { id: 'MS1', title: 'Maquettes et wireframes', dueDate: '2024-03-30', completed: true },
            { id: 'MS2', title: 'Développement frontend', dueDate: '2024-04-30', completed: true },
            { id: 'MS3', title: 'Intégration backend', dueDate: '2024-05-20', completed: false },
            { id: 'MS4', title: 'Tests et déploiement', dueDate: '2024-06-10', completed: false },
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
        manager: {
            name: 'Sophie Martin',
            role: 'Chef de projet',
            avatar: '/img/avatars/avatar-1.jpg',
        },
        attachments: [
            { id: 'ATT1', name: 'Cahier des charges', type: 'PDF', size: '1.2 MB', uploadDate: '2024-03-10', url: '#' },
            { id: 'ATT2', name: 'Wireframes', type: 'ZIP', size: '8.5 MB', uploadDate: '2024-03-25', url: '#' },
            { id: 'ATT3', name: 'Maquettes', type: 'ZIP', size: '15.7 MB', uploadDate: '2024-03-28', url: '#' },
        ]
    },
    'PRJ-002': {
        id: 'PRJ-002',
        name: 'Application mobile',
        description: 'Développement d\'une application iOS et Android pour la gestion des stocks, avec système de scan de codes-barres et génération de rapports détaillés. L\'application permet également de suivre les mouvements de stock en temps réel.',
        status: 'planning',
        progress: 25,
        startDate: '2024-04-10',
        endDate: '2024-07-20',
        budget: '12 000 €',
        teamMembers: [
            { id: 'TM4', name: 'Marc Dupont', role: 'Chef de projet', avatar: '/img/avatars/avatar-4.jpg' },
            { id: 'TM5', name: 'Émilie Rousseau', role: 'Développeuse mobile', avatar: '/img/avatars/avatar-5.jpg' },
            { id: 'TM6', name: 'Antoine Bernard', role: 'Designer UI/UX', avatar: '/img/avatars/avatar-6.jpg' },
            { id: 'TM7', name: 'Camille Leroy', role: 'Expert backend', avatar: '/img/avatars/avatar-7.jpg' },
        ],
        milestones: [
            { id: 'MS5', title: 'Définition des besoins', dueDate: '2024-04-20', completed: true },
            { id: 'MS6', title: 'Maquettes', dueDate: '2024-05-10', completed: true },
            { id: 'MS7', title: 'Développement iOS', dueDate: '2024-06-15', completed: false },
            { id: 'MS8', title: 'Développement Android', dueDate: '2024-07-10', completed: false },
            { id: 'MS9', title: 'Tests et déploiement', dueDate: '2024-07-18', completed: false },
        ],
        technologies: ['React Native', 'Firebase', 'Swift', 'Kotlin', 'PostgreSQL'],
        manager: {
            name: 'Marc Dupont',
            role: 'Chef de projet',
            avatar: '/img/avatars/avatar-4.jpg',
        },
        attachments: [
            { id: 'ATT4', name: 'Spécifications fonctionnelles', type: 'PDF', size: '2.1 MB', uploadDate: '2024-04-05', url: '#' },
            { id: 'ATT5', name: 'Planning prévisionnel', type: 'PDF', size: '0.8 MB', uploadDate: '2024-04-08', url: '#' },
        ]
    },
    'PRJ-003': {
        id: 'PRJ-003',
        name: 'Refonte graphique',
        description: 'Mise à jour de l\'identité visuelle et des supports de communication incluant logo, charte graphique, templates pour documents officiels, cartes de visite et supports marketing digital.',
        status: 'review',
        progress: 85,
        startDate: '2024-02-20',
        endDate: '2024-05-10',
        budget: '4 200 €',
        teamMembers: [
            { id: 'TM8', name: 'Clara Moreau', role: 'Directrice artistique', avatar: '/img/avatars/avatar-8.jpg' },
            { id: 'TM9', name: 'Lucas Petit', role: 'Graphiste', avatar: '/img/avatars/avatar-9.jpg' },
        ],
        milestones: [
            { id: 'MS10', title: 'Audit de l\'existant', dueDate: '2024-02-28', completed: true },
            { id: 'MS11', title: 'Propositions logo', dueDate: '2024-03-15', completed: true },
            { id: 'MS12', title: 'Charte graphique', dueDate: '2024-04-05', completed: true },
            { id: 'MS13', title: 'Templates et supports', dueDate: '2024-04-25', completed: true },
            { id: 'MS14', title: 'Validation finale', dueDate: '2024-05-05', completed: false },
        ],
        technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign'],
        manager: {
            name: 'Clara Moreau',
            role: 'Directrice artistique',
            avatar: '/img/avatars/avatar-8.jpg',
        },
        attachments: [
            { id: 'ATT6', name: 'Brief créatif', type: 'PDF', size: '1.0 MB', uploadDate: '2024-02-18', url: '#' },
            { id: 'ATT7', name: 'Propositions logos V1', type: 'PDF', size: '5.2 MB', uploadDate: '2024-03-10', url: '#' },
            { id: 'ATT8', name: 'Propositions logos V2', type: 'PDF', size: '4.8 MB', uploadDate: '2024-03-20', url: '#' },
            { id: 'ATT9', name: 'Charte graphique', type: 'PDF', size: '12.4 MB', uploadDate: '2024-04-02', url: '#' },
        ]
    },
};

export default function ProjectDetails({ projectId }: PageProps) {
    // Récupérer les données du projet
    const project = projectData[projectId] || {
        id: projectId,
        name: 'Projet inconnu',
        description: 'Aucune information disponible pour ce projet.',
        status: 'in_progress' as const,
        progress: 0,
        startDate: '',
        endDate: '',
        budget: 'N/A',
        teamMembers: [],
        milestones: [],
        technologies: [],
        manager: {
            name: 'Non assigné',
            role: '',
        },
        attachments: []
    };

    // Formater la date
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Date non définie';
        
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Obtenir le libellé et la couleur selon le statut du projet
    const getStatusInfo = (status: ProjectDetail['status']) => {
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

    const statusInfo = getStatusInfo(project.status);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Projet : ${project.name}`} />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                {/* Entête du projet */}
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-semibold">{project.name}</h1>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusInfo.color}`}>
                                    {statusInfo.label}
                                </span>
                            </div>
                            <p className="mt-1.5 text-sm text-neutral-500">{project.id}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a 
                                href={`/client/projects/${project.id}/files`}
                                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                            >
                                <FileText className="mr-2 inline-block h-4 w-4" />
                                Fichiers
                            </a>
                            <a 
                                href={`/client/messages?project=${project.id}`}
                                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                            >
                                <MessageSquare className="mr-2 inline-block h-4 w-4" />
                                Messages
                            </a>
                            <a 
                                href="#"
                                className="rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                            >
                                <Activity className="mr-2 inline-block h-4 w-4" />
                                Activité
                            </a>
                        </div>
                    </div>

                    {/* Progression du projet */}
                    <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Progression globale</span>
                            <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                            <div 
                                className="h-full rounded-full bg-primary" 
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Description du projet */}
                    <div className="mb-6">
                        <h2 className="mb-3 text-lg font-medium">Description du projet</h2>
                        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                            <p className="text-neutral-700 dark:text-neutral-300">{project.description}</p>
                        </div>
                    </div>

                    {/* Informations clés */}
                    <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="mb-2 text-sm font-medium text-neutral-500">Date de début</div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5 text-primary" />
                                <span className="font-medium">{formatDate(project.startDate)}</span>
                            </div>
                        </div>
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="mb-2 text-sm font-medium text-neutral-500">Date de fin prévue</div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5 text-primary" />
                                <span className="font-medium">{formatDate(project.endDate)}</span>
                            </div>
                        </div>
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="mb-2 text-sm font-medium text-neutral-500">Budget</div>
                            <div className="flex items-center">
                                <Briefcase className="mr-2 h-5 w-5 text-primary" />
                                <span className="font-medium">{project.budget}</span>
                            </div>
                        </div>
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="mb-2 text-sm font-medium text-neutral-500">Équipe</div>
                            <div className="flex items-center">
                                <Users className="mr-2 h-5 w-5 text-primary" />
                                <span className="font-medium">{project.teamMembers.length} membres</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenu principal en 2 colonnes */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Colonne de gauche */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Jalons */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Jalons du projet</h2>
                            <div className="space-y-4">
                                {project.milestones.map((milestone) => (
                                    <div key={milestone.id} className="flex items-start rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                        <div className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${milestone.completed ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                            {milestone.completed ? (
                                                <CheckCircle className="h-4 w-4" />
                                            ) : (
                                                <Clock className="h-3.5 w-3.5" />
                                            )}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium">{milestone.title}</h3>
                                                <span className={`text-sm ${milestone.completed ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                                    {milestone.completed ? 'Terminé' : 'En attente'}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-neutral-500">
                                                Date prévue: {formatDate(milestone.dueDate)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies utilisées */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Technologies utilisées</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span 
                                        key={`tech-${index}`}
                                        className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Pièces jointes */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Documents du projet</h2>
                            <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700">
                                {project.attachments.map((attachment) => (
                                    <div key={attachment.id} className="flex items-center justify-between p-4">
                                        <div className="flex items-center">
                                            <Paperclip className="h-5 w-5 text-neutral-400" />
                                            <div className="ml-3">
                                                <p className="font-medium">{attachment.name}</p>
                                                <p className="text-sm text-neutral-500">
                                                    {attachment.type} • {attachment.size} • Ajouté le {formatDate(attachment.uploadDate)}
                                                </p>
                                            </div>
                                        </div>
                                        <a 
                                            href={attachment.url}
                                            className="flex items-center rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                        >
                                            <Download className="mr-1.5 h-4 w-4" />
                                            Télécharger
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Colonne de droite */}
                    <div className="space-y-6">
                        {/* Chef de projet */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Chef de projet</h2>
                            <div className="flex items-center rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                <div className="h-12 w-12 overflow-hidden rounded-full">
                                    {project.manager.avatar ? (
                                        <img 
                                            src={project.manager.avatar} 
                                            alt={project.manager.name} 
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-500 dark:bg-neutral-700">
                                            {project.manager.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium">{project.manager.name}</h3>
                                    <p className="text-sm text-neutral-500">{project.manager.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Équipe */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Équipe du projet</h2>
                            <div className="space-y-3">
                                {project.teamMembers.map((member) => (
                                    <div key={member.id} className="flex items-center rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
                                        <div className="h-10 w-10 overflow-hidden rounded-full">
                                            {member.avatar ? (
                                                <img 
                                                    src={member.avatar} 
                                                    alt={member.name} 
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-500 dark:bg-neutral-700">
                                                    {member.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium">{member.name}</h3>
                                            <p className="text-xs text-neutral-500">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions rapides */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Actions rapides</h2>
                            <div className="grid gap-3">
                                <a 
                                    href="#"
                                    className="flex items-center rounded-md border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                >
                                    <Map className="mr-2 h-4 w-4" />
                                    Voir le planning
                                </a>
                                <a 
                                    href="#"
                                    className="flex items-center rounded-md border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                >
                                    <Link2 className="mr-2 h-4 w-4" />
                                    Partager le projet
                                </a>
                                <a 
                                    href="#"
                                    className="flex items-center rounded-md border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Accéder à la démo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 