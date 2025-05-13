import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CvPreview } from '@/components/CV/CvPreview';
import { CvEditor } from '@/components/CV/CvEditor';
import { CvSidebar } from '@/components/CV/CvSidebar';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import type { BreadcrumbItem, CvOptions, Education, Experience, Skill, Certificate, Language } from '@/types';
import { DownloadIcon, Share2Icon, FileText } from 'lucide-react';
import axios from 'axios';

interface CVProps {
    cvData: {
        lastUpdated: string;
        downloadCount: number;
        defaultOptions: CvOptions;
    };
}

export default function CV({ cvData }: CVProps) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<string>('preview');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    
    // Options for the CV
    const [options, setOptions] = useState<CvOptions>(cvData.defaultOptions);
    
    // Mettre à jour les options sur le serveur
    useEffect(() => {
        const updateOptions = async () => {
            // Éviter d'envoyer une requête lors de l'initialisation
            if (JSON.stringify(options) === JSON.stringify(cvData.defaultOptions)) {
                return;
            }
            
            setIsSaving(true);
            
            try {
                const response = await axios.post(route('cv.updateOptions'), options);
                
                if (response.data.success) {
                    toast({
                        title: "Modifications enregistrées",
                        description: "Les options ont été mises à jour avec succès",
                        variant: "default"
                    });
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour des options:', error);
                toast({
                    title: "Erreur",
                    description: "Impossible de mettre à jour les options",
                    variant: "destructive"
                });
            } finally {
                setIsSaving(false);
            }
        };

        // Utiliser un délai pour éviter d'envoyer trop de requêtes
        const timeoutId = setTimeout(() => {
            updateOptions();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [options]);
    
    // CV data
    const [personalInfo, setPersonalInfo] = useState({
        name: 'Sabowa Ryan',
        title: 'Développeur Full Stack',
        email: 'contact@sabowaryan.com',
        phone: '+33 6 12 34 56 78',
        location: 'Paris, France',
        website: 'www.sabowaryan.com',
        github: 'sabowaryan',
        linkedin: 'sabowaryan',
        photo: '/images/profile.jpg',
        bio: "Développeur passionné avec plus de 5 ans d'expérience dans la création d'applications web et mobiles innovantes. Spécialisé dans React, TypeScript et Laravel."
    });
    
    // Experiences data
    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: '1',
            company: 'Agence Web Premium',
            position: 'Développeur Full Stack Senior',
            startDate: '2021-03',
            current: true,
            description: 'Développement d\'applications web complexes pour des clients grands comptes. Lead developer sur plusieurs projets stratégiques.',
            achievements: [
                'Migration d\'une application legacy vers une architecture moderne React/TypeScript/Laravel',
                'Réduction de 40% du temps de chargement sur l\'application principale',
                'Mise en place d\'une CI/CD avec GitHub Actions'
            ],
            technologies: ['React', 'TypeScript', 'Laravel', 'AWS', 'Docker'],
            location: 'Paris, France',
            logo: '/images/companies/company1.svg'
        },
        {
            id: '2',
            company: 'Digital Solutions',
            position: 'Développeur Frontend',
            startDate: '2019-06',
            endDate: '2021-02',
            description: 'Conception et développement d\'interfaces utilisateur modernes et responsives pour des applications web et mobiles.',
            technologies: ['React', 'Vue.js', 'JavaScript', 'SCSS', 'Webpack'],
            location: 'Lyon, France',
            logo: '/images/companies/company2.svg'
        }
    ]);
    
    // Education data
    const [education, setEducation] = useState<Education[]>([
        {
            id: '1',
            institution: 'Université Polytechnique',
            degree: 'Master',
            field: 'Informatique - Spécialité Génie Logiciel',
            startDate: '2017-09',
            endDate: '2019-06',
            location: 'Paris, France',
            logo: '/images/education/univ1.svg'
        },
        {
            id: '2',
            institution: 'IUT Informatique',
            degree: 'DUT',
            field: 'Informatique',
            startDate: '2015-09',
            endDate: '2017-06',
            location: 'Bordeaux, France',
            logo: '/images/education/univ2.svg'
        }
    ]);
    
    // Skills data
    const [skills, setSkills] = useState<Skill[]>([
        { id: '1', name: 'React', level: 5, category: 'frontend' },
        { id: '2', name: 'TypeScript', level: 4, category: 'frontend' },
        { id: '3', name: 'Laravel', level: 5, category: 'backend' },
        { id: '4', name: 'Node.js', level: 4, category: 'backend' },
        { id: '5', name: 'PostgreSQL', level: 4, category: 'database' },
        { id: '6', name: 'Docker', level: 3, category: 'devops' },
        { id: '7', name: 'AWS', level: 3, category: 'devops' },
        { id: '8', name: 'Git', level: 5, category: 'devops' }
    ]);
    
    // Languages data
    const [languages, setLanguages] = useState<Language[]>([
        { id: '1', name: 'Français', level: 'native', code: 'FR' },
        { id: '2', name: 'Anglais', level: 'fluent', code: 'EN' },
        { id: '3', name: 'Espagnol', level: 'intermediate', code: 'ES' }
    ]);
    
    // Breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: '/' },
        { title: 'CV', href: '/cv' }
    ];
    
    // Handle download CV
    const handleDownload = (format: 'pdf' | 'docx' | 'json') => {
        setIsLoading(true);
        
        // Rediriger vers l'URL de téléchargement avec les options comme paramètre de requête
        window.location.href = route('cv.download', { 
            format, 
            options: JSON.stringify(options)
        });
        
        // Simuler un délai pour montrer l'indicateur de chargement
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };
    
    // Handle share CV
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'CV de Sabowa Ryan',
                text: 'Découvrez mon CV interactif',
                url: window.location.href,
            });
        } else {
            // Fallback - copy link to clipboard
            navigator.clipboard.writeText(window.location.href);
            // Afficher une notification
            toast({
                title: "Lien copié",
                description: "Le lien a été copié dans le presse-papier"
            });
        }
    };
    
    return (
        <GuestLayout breadcrumbs={breadcrumbs}>
            <Head title="CV - Sabowa Ryan" />
            <Toaster />
            
            <main className="py-12 px-4 sm:px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <motion.h1 
                                    className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Curriculum Vitae
                                </motion.h1>
                                <motion.p 
                                    className="text-muted-foreground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    Personnalisez et téléchargez mon CV dans plusieurs formats
                                </motion.p>
                                {isSaving && (
                                    <motion.p
                                        className="text-xs text-primary mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        Enregistrement des modifications...
                                    </motion.p>
                                )}
                            </div>
                            
                            <motion.div 
                                className="flex flex-wrap gap-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownload('pdf')}
                                    disabled={isLoading || isSaving}
                                >
                                    <DownloadIcon className="mr-2 h-4 w-4" />
                                    PDF
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownload('docx')}
                                    disabled={isLoading || isSaving}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    DOCX
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShare}
                                    disabled={isSaving}
                                >
                                    <Share2Icon className="mr-2 h-4 w-4" />
                                    Partager
                                </Button>
                            </motion.div>
                        </div>
                        
                        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="bg-muted/50 mb-6">
                                <TabsTrigger value="preview">
                                    Aperçu
                                </TabsTrigger>
                                <TabsTrigger value="edit">
                                    Personnaliser
                                </TabsTrigger>
                            </TabsList>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                {/* Sidebar with options */}
                                <div className="lg:col-span-1">
                                    <CvSidebar 
                                        options={options} 
                                        setOptions={setOptions} 
                                        isEditing={activeTab === 'edit'}
                                    />
                                </div>
                                
                                {/* Main content */}
                                <div className="lg:col-span-3">
                                    <TabsContent value="preview" className="m-0">
                                        <CvPreview 
                                            personalInfo={personalInfo}
                                            experiences={experiences}
                                            education={education}
                                            skills={skills}
                                            languages={languages}
                                            options={options} 
                                        />
                                    </TabsContent>
                                    
                                    <TabsContent value="edit" className="m-0">
                                        <CvEditor 
                                            personalInfo={personalInfo} 
                                            setPersonalInfo={setPersonalInfo}
                                            experiences={experiences}
                                            setExperiences={setExperiences}
                                            education={education}
                                            setEducation={setEducation}
                                            skills={skills}
                                            setSkills={setSkills}
                                            languages={languages}
                                            setLanguages={setLanguages}
                                            options={options}
                                        />
                                    </TabsContent>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </main>
        </GuestLayout>
    );
}