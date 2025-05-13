import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Certificate } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarIcon, ExternalLink } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Certifications',
        href: '/certifications',
    },
];

// Exemple de certifications (à remplacer par des données réelles depuis le backend)
const certificationsData: Certificate[] = [
    {
        id: '1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-06-15',
        credentialId: 'AWS-123456',
        credentialUrl: 'https://www.credly.com/badges/aws-certified-solutions-architect',
        logo: '/icons/aws.svg',
    },
    {
        id: '2',
        name: 'Laravel Certification',
        issuer: 'Laravel',
        date: '2022-11-10',
        credentialId: 'LC-789012',
        credentialUrl: 'https://certification.laravel.com/',
        logo: '/icons/laravel.svg',
    },
    {
        id: '3',
        name: 'Professional Scrum Master I',
        issuer: 'Scrum.org',
        date: '2022-03-22',
        credentialId: 'PSM-345678',
        credentialUrl: 'https://www.scrum.org/certificates/',
        logo: '/icons/scrum.svg',
    },
];

export default function Certifications() {
    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Certifications" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <h1 className="mb-6 text-2xl font-semibold">Mes certifications</h1>
                    
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {certificationsData.map((cert) => (
                            <div key={cert.id} className="flex flex-col rounded-lg border p-5 shadow-sm dark:border-neutral-700">
                                <div className="mb-4 flex items-center">
                                    {cert.logo && (
                                        <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
                                            <img src={cert.logo} alt={cert.issuer} className="h-8 w-8" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-medium">{cert.name}</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{cert.issuer}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-2 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>{formatDate(cert.date)}</span>
                                </div>
                                
                                {cert.credentialId && (
                                    <div className="mt-2 text-sm">
                                        <span className="font-medium">ID: </span>
                                        <span>{cert.credentialId}</span>
                                    </div>
                                )}
                                
                                {cert.credentialUrl && (
                                    <a 
                                        href={cert.credentialUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="mt-4 flex items-center text-sm font-medium text-primary hover:underline"
                                    >
                                        Voir le certificat
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 