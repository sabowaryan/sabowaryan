import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, CheckCircle, Download, ExternalLink, FileText, Star, StarHalf } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projets livrés',
        href: '/client/projects/completed',
    },
];

// Types pour les projets
interface CompletedProject {
    id: string;
    name: string;
    description: string;
    completionDate: string;
    rating?: number;
    hasReview: boolean;
    hasCertificate: boolean;
    technologies: string[];
    deliverables: string[];
    thumbnailUrl?: string;
}

// Données d'exemple pour les projets terminés
const completedProjectsData: CompletedProject[] = [
    {
        id: 'PRJ-C001',
        name: 'Site vitrine entreprise',
        description: 'Site web responsive présentant l\'activité et les services de l\'entreprise avec formulaire de contact et intégration Google Maps.',
        completionDate: '2024-02-15',
        rating: 4.5,
        hasReview: true,
        hasCertificate: true,
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        deliverables: ['Code source', 'Documentation', 'Fichiers design'],
        thumbnailUrl: '/img/projects/site-vitrine.jpg',
    },
    {
        id: 'PRJ-C002',
        name: 'Application de gestion d\'inventaire',
        description: 'Application permettant de gérer les stocks, avec système de scan de codes-barres et génération de rapports.',
        completionDate: '2023-11-28',
        rating: 5,
        hasReview: true,
        hasCertificate: true,
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        deliverables: ['Application web', 'Application mobile', 'Documentation technique', 'Formation'],
        thumbnailUrl: '/img/projects/inventory-app.jpg',
    },
    {
        id: 'PRJ-C003',
        name: 'Refonte logo et identité visuelle',
        description: 'Création d\'un nouveau logo, d\'une charte graphique complète et de templates pour les documents officiels.',
        completionDate: '2024-01-10',
        hasReview: false,
        hasCertificate: true,
        technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
        deliverables: ['Fichiers sources', 'Guide d\'utilisation', 'Versions pour différents supports'],
    },
];

export default function CompletedProjects() {
    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Afficher la notation sous forme d'étoiles
    const renderRating = (rating?: number) => {
        if (!rating) return null;
        
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        return (
            <div className="flex items-center">
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Star key={`star-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                {hasHalfStar && <StarHalf className="h-4 w-4 fill-amber-400 text-amber-400" />}
                <span className="ml-1 text-sm text-neutral-600 dark:text-neutral-400">{rating.toFixed(1)}/5</span>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projets livrés" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Projets livrés</h1>
                        <select className="rounded-md border border-neutral-300 py-1.5 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                            <option value="recent">Récents d'abord</option>
                            <option value="oldest">Anciens d'abord</option>
                            <option value="name">Alphabétique</option>
                        </select>
                    </div>
                    
                    <div className="space-y-6">
                        {completedProjectsData.map((project) => (
                            <div key={project.id} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                <div className="flex flex-col md:flex-row">
                                    {/* Vignette du projet (si disponible) */}
                                    {project.thumbnailUrl && (
                                        <div className="md:w-1/4">
                                            <div className="relative h-48 w-full md:h-full">
                                                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800">
                                                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                                                </div>
                                                <img 
                                                    src={project.thumbnailUrl} 
                                                    alt={project.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Informations du projet */}
                                    <div className={`flex flex-1 flex-col p-5 ${project.thumbnailUrl ? 'md:w-3/4' : 'w-full'}`}>
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <h2 className="mb-1 text-xl font-medium">{project.name}</h2>
                                                <div className="flex items-center gap-2 text-sm text-neutral-500">
                                                    <span className="flex items-center">
                                                        <Calendar className="mr-1 h-4 w-4" />
                                                        Livré le {formatDate(project.completionDate)}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{project.id}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="flex h-6 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Terminé
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">{project.description}</p>
                                        
                                        {/* Technologies utilisées */}
                                        <div className="mb-4">
                                            <h3 className="mb-2 text-sm font-medium">Technologies utilisées</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, index) => (
                                                    <span 
                                                        key={`${project.id}-tech-${index}`}
                                                        className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Livrables */}
                                        <div className="mb-4">
                                            <h3 className="mb-2 text-sm font-medium">Livrables</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.deliverables.map((deliverable, index) => (
                                                    <span 
                                                        key={`${project.id}-deliverable-${index}`}
                                                        className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                                                    >
                                                        {deliverable}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Évaluation */}
                                        <div className="mt-auto flex items-center justify-between">
                                            <div>
                                                {project.rating ? (
                                                    <div className="flex items-center">
                                                        <div className="mr-2 text-sm font-medium">Votre évaluation:</div>
                                                        {renderRating(project.rating)}
                                                    </div>
                                                ) : (
                                                    <button className="flex items-center text-sm font-medium text-primary hover:underline">
                                                        <Star className="mr-1 h-4 w-4" />
                                                        Évaluer ce projet
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <div className="flex space-x-3">
                                                {project.hasCertificate && (
                                                    <a 
                                                        href={`/client/projects/${project.id}/certificate`}
                                                        className="flex items-center rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                                    >
                                                        <Download className="mr-1.5 h-4 w-4" />
                                                        Certificat
                                                    </a>
                                                )}
                                                
                                                <a 
                                                    href={`/client/projects/${project.id}`}
                                                    className="flex items-center rounded-md border border-primary bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90"
                                                >
                                                    <FileText className="mr-1.5 h-4 w-4" />
                                                    Détails
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 