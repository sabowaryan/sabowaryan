import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft, File, MessageSquare, Upload } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Tickets',
        href: '/client/support/tickets',
    },
    {
        title: 'Nouveau ticket',
        href: '#',
    },
];

// Types pour les catégories de tickets
type TicketCategory = {
    id: string;
    name: string;
    description: string;
};

// Types pour les priorités
type TicketPriority = {
    id: 'low' | 'medium' | 'high';
    name: string;
    description: string;
};

// Données d'exemple pour les catégories
const categoriesData: TicketCategory[] = [
    {
        id: 'technical',
        name: 'Problème technique',
        description: 'Questions concernant des bugs, problèmes d\'affichage ou fonctionnalités défectueuses',
    },
    {
        id: 'billing',
        name: 'Facturation',
        description: 'Questions concernant les factures, paiements ou abonnements',
    },
    {
        id: 'account',
        name: 'Compte et accès',
        description: 'Problèmes de connexion, gestion de compte ou autorisations',
    },
    {
        id: 'feature',
        name: 'Demande de fonctionnalité',
        description: 'Suggestions pour de nouvelles fonctionnalités ou améliorations',
    },
    {
        id: 'project',
        name: 'Question sur projet',
        description: 'Questions spécifiques concernant votre projet en cours',
    },
    {
        id: 'other',
        name: 'Autre',
        description: 'Toute autre demande qui ne correspond pas aux catégories ci-dessus',
    },
];

// Données d'exemple pour les priorités
const prioritiesData: TicketPriority[] = [
    {
        id: 'low',
        name: 'Basse',
        description: 'Le problème n\'affecte pas significativement votre travail',
    },
    {
        id: 'medium',
        name: 'Moyenne',
        description: 'Le problème réduit votre efficacité mais des solutions de contournement existent',
    },
    {
        id: 'high',
        name: 'Haute',
        description: 'Le problème vous empêche de travailler normalement',
    },
];

export default function NewTicket() {
    // État du formulaire
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        priority: 'medium',
        description: '',
    });

    // État pour les fichiers
    const [files, setFiles] = useState<File[]>([]);

    // Gérer les changements du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Gérer l'ajout de fichiers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            setFiles(prev => [...prev, ...fileList]);
        }
    };

    // Supprimer un fichier
    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Soumettre le formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Ici, vous enverriez normalement les données au serveur
        console.log('Formulaire soumis:', formData, files);
        
        // Redirection vers la liste des tickets (simulée)
        window.location.href = '/client/support/tickets';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nouveau ticket de support" />
            <div className="flex h-full flex-1 flex-col p-4">
                <div className="mb-6">
                    <a 
                        href="/client/support/tickets" 
                        className="flex w-fit items-center rounded-md text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Retour aux tickets
                    </a>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Créer un nouveau ticket</h1>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Décrivez votre problème en détail pour nous permettre de vous aider plus efficacement.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Sujet */}
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-medium">
                                Sujet du ticket
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Décrivez brièvement votre problème"
                                className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                required
                            />
                        </div>

                        {/* Catégorie et Priorité */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Catégorie */}
                            <div>
                                <label htmlFor="category" className="mb-2 block text-sm font-medium">
                                    Catégorie
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    required
                                >
                                    <option value="" disabled>Sélectionnez une catégorie</option>
                                    {categoriesData.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {formData.category && (
                                    <p className="mt-1 text-xs text-neutral-500">
                                        {categoriesData.find(cat => cat.id === formData.category)?.description}
                                    </p>
                                )}
                            </div>

                            {/* Priorité */}
                            <div>
                                <label htmlFor="priority" className="mb-2 block text-sm font-medium">
                                    Priorité
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    required
                                >
                                    {prioritiesData.map(priority => (
                                        <option key={priority.id} value={priority.id}>
                                            {priority.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {prioritiesData.find(p => p.id === formData.priority)?.description}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="mb-2 block text-sm font-medium">
                                Description détaillée
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Veuillez décrire votre problème en détail. Incluez les étapes pour reproduire le problème, les messages d'erreur, et toute autre information pertinente."
                                className="w-full rounded-md border border-neutral-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                required
                            ></textarea>
                        </div>

                        {/* Pièces jointes */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Pièces jointes (facultatif)
                            </label>
                            <div className="mb-3 rounded-md border border-neutral-300 p-4 dark:border-neutral-700">
                                <div className="flex flex-col items-center justify-center">
                                    <Upload className="mb-2 h-10 w-10 text-neutral-400" />
                                    <p className="mb-1 text-sm font-medium">Glissez-déposez vos fichiers ici</p>
                                    <p className="mb-3 text-xs text-neutral-500">ou</p>
                                    <label className="flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        Parcourir les fichiers
                                    </label>
                                    <p className="mt-2 text-xs text-neutral-500">
                                        Formats acceptés: PNG, JPG, PDF, DOC, DOCX, ZIP (max 10MB)
                                    </p>
                                </div>
                            </div>

                            {/* Liste des fichiers */}
                            {files.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Fichiers ajoutés ({files.length})</p>
                                    <div className="rounded-md border border-neutral-200 dark:border-neutral-700">
                                        {files.map((file, index) => (
                                            <div 
                                                key={index} 
                                                className="flex items-center justify-between border-b border-neutral-200 p-3 last:border-0 dark:border-neutral-700"
                                            >
                                                <div className="flex items-center">
                                                    <File className="mr-2 h-5 w-5 text-neutral-500" />
                                                    <div>
                                                        <p className="text-sm font-medium">{file.name}</p>
                                                        <p className="text-xs text-neutral-500">
                                                            {(file.size / 1024).toFixed(0)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-red-500 dark:hover:bg-neutral-800"
                                                >
                                                    <span className="sr-only">Supprimer</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Boutons de soumission */}
                        <div className="flex justify-end gap-3 pt-4">
                            <a 
                                href="/client/support/tickets"
                                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
                            >
                                Annuler
                            </a>
                            <button 
                                type="submit"
                                className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Soumettre le ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
} 