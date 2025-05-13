import { Head, usePage } from '@inertiajs/react';
import { ProjectsList } from '@/components/Projects/ProjectsList';
import GuestLayout from '@/layouts/guest-layout';
import type { BreadcrumbItem } from '@/types';

// Définir l'interface Project localement
interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    demoUrl?: string;
    githubUrl?: string;
    category: 'web' | 'mobile' | 'backend' | 'other';
    featured?: boolean;
    year: string;
    slug: string;
}

export default function Projects() {
    const { props } = usePage();
    const projects = (props.projects as Project[]) || [];
    
    // Définir les breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: '/' },
        { title: 'Projets', href: '/projects' }
    ];

    return (
        <GuestLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes Projets" />
            
            <main className="relative min-h-screen">
                {/* Projects List Component */}
                <ProjectsList projects={projects} />
            </main>
        </GuestLayout>
    );
} 