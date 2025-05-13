import { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProjectDemo } from '@/components/Projects/ProjectDemo';
import type { BreadcrumbItem } from '@/types';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { 
    Github, 
    ExternalLink, 
    Calendar, 
    ArrowLeft, 
    Code,
    Globe, 
    Monitor, 
    Smartphone, 
    Database,
    Image as ImageIcon,
    Play,
    CheckCircle,
    Lightbulb,
    Share2,
    ChevronRight,
    Clock,
    Quote,
    Star,
    Building2,
    MapPin,
    Briefcase,
    Users,
    Link2
} from 'lucide-react';

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
    gallery?: string[];
    challenges?: string[];
    solutions?: string[];
    teamSize?: number;
    duration?: string;
    role?: string;
    slug: string;
    client?: {
        name: string;
        industry: string;
        location: string;
    };
    descriptionSections?: {
        type: 'main' | 'details' | 'conclusion';
        content: string;
    }[];
}

export default function ProjectShow() {
    const { props } = usePage();
    const project = props.project as Project;
    const relatedProjects = (props.relatedProjects || []) as Project[];
    const [activeImage, setActiveImage] = useState(project?.image || '');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const headerImageRef = useRef<HTMLDivElement>(null);
    const headerContentRef = useRef<HTMLDivElement>(null);
    
    // Utiliser useScroll pour des animations basées sur le défilement plus fluides
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.15]);
    
    // Définir les breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: '/' },
        { title: 'Projets', href: '/projects' },
        { title: project?.title || 'Détail du projet', href: `/projects/${project?.slug}` }
    ];
    
    // Simulating gallery images for demonstration (would come from backend)
    const galleryImages = project?.gallery || [
        project?.image || '/images/projects/default.jpg',
        '/images/projects/gallery1.jpg',
        '/images/projects/gallery2.jpg'
    ];

    useEffect(() => {
        // Reset image loaded state when active image changes
        setImageLoaded(false);
    }, [activeImage]);

    useEffect(() => {
        // Parallax scroll effect for header
        const handleScroll = () => {
            if (headerRef.current) {
                const scrollTop = window.scrollY;
                headerRef.current.style.transform = `translateY(${scrollTop * 0.4}px)`;
                headerRef.current.style.opacity = `${1 - scrollTop / 500}`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigate through gallery images
    const navigateGallery = (direction: 'next' | 'prev') => {
        const newIndex = direction === 'next' 
            ? (currentImageIndex + 1) % galleryImages.length
            : (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        
        setCurrentImageIndex(newIndex);
        setActiveImage(galleryImages[newIndex]);
    };

    // Category icon mapping
    const getCategoryIcon = (category: string) => {
        switch(category) {
            case 'web': return <Monitor className="h-5 w-5" />;
            case 'mobile': return <Smartphone className="h-5 w-5" />;
            case 'backend': return <Database className="h-5 w-5" />;
            default: return <Code className="h-5 w-5" />;
        }
    };

    // Category color mapping
    const getCategoryColor = (category: string): string => {
        switch(category) {
            case 'web': return 'from-blue-500 to-indigo-600';
            case 'mobile': return 'from-emerald-500 to-teal-600';
            case 'backend': return 'from-purple-500 to-violet-600';
            default: return 'from-amber-500 to-orange-600';
        }
    };

    if (!project) {
        return (
            <GuestLayout>
                <Head title="Projet non trouvé" />
                <div className="py-24 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl font-bold mb-4">Projet non trouvé</h1>
                        <p className="text-lg text-muted-foreground mb-8">Ce projet n'existe pas ou a été supprimé.</p>
                        <Button asChild>
                            <Link href="/projects">Retour aux projets</Link>
                        </Button>
                    </div>
                </div>
            </GuestLayout>
        );
    }

    return (
        <GuestLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.title} | Projet`} />
            
            {project.demoUrl && (
                <ProjectDemo
                    projectId={project.id}
                    title={project.title}
                    demoUrl={project.demoUrl}
                    isOpen={isDemoOpen}
                    onClose={() => setIsDemoOpen(false)}
                />
            )}
            
            <main className="relative pb-32">
                {/* Hero header with enhanced parallax effect */}
                <div className="relative h-[70vh] overflow-hidden">
                    {/* Floating particles background */}
                    <div className="absolute inset-0 z-0 opacity-25">
                        <div className="absolute top-1/4 left-1/5 w-20 h-20 rounded-full bg-primary/30 blur-3xl animate-float-slow"></div>
                        <div className="absolute top-2/3 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-float-medium"></div>
                        <div className="absolute top-1/3 right-1/4 w-28 h-28 rounded-full bg-blue-500/20 blur-3xl animate-float-fast"></div>
                        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-indigo-500/20 blur-3xl animate-float-medium"></div>
                    </div>
                    
                    {/* Using predefined patterns from app.css */}
                    <div className="absolute inset-0 bg-grid-pattern z-0 opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-noise-pattern z-0 opacity-15 pointer-events-none"></div>
                    
                    {/* Parallax background image with enhanced effects */}
                    <motion.div 
                        ref={headerImageRef}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                            backgroundImage: `url(${project.image})`,
                            y: backgroundY,
                            scale: scale
                        }}
                    />
                    
                    {/* Enhanced gradient overlay with noise texture */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background/95">
                        {/* SVG Filter pour la texture de bruit au lieu d'une image */}
                        <svg className="hidden">
                            <filter id="noise">
                                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                                <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" />
                            </filter>
                        </svg>
                        <div className="absolute inset-0 opacity-15" 
                            style={{ 
                                filter: 'url(#noise)',
                                background: 'transparent',
                                mixBlendMode: 'overlay'
                            }}></div>
                    </div>
                    
                    {/* Decorative geometric elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                        
                        {/* Diagonal lines */}
                        <svg className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
                            <line x1="20" y1="100" x2="100" y2="20" stroke="white" strokeWidth="0.3" />
                            <line x1="40" y1="100" x2="100" y2="40" stroke="white" strokeWidth="0.2" />
                        </svg>
                        
                        <svg className="absolute top-0 left-0 w-1/3 h-1/3 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
                            <line x1="0" y1="20" x2="80" y2="100" stroke="white" strokeWidth="0.3" />
                            <line x1="0" y1="40" x2="60" y2="100" stroke="white" strokeWidth="0.2" />
                        </svg>
                    </div>
                    
                    {/* Content with enhanced animations */}
                    <motion.div 
                        ref={headerContentRef}
                        className="absolute inset-0 flex flex-col justify-center pb-20"
                        style={{ opacity }}
                    >
                        <div className={SITE_CONTAINER}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="relative z-10"
                            >
                                <motion.div 
                                    className="flex flex-wrap items-center gap-2 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Badge 
                                        className={`px-3 py-1.5 text-white bg-gradient-to-r ${getCategoryColor(project.category)} shadow-lg shadow-primary/20`}
                                    >
                                        {getCategoryIcon(project.category)}
                                        <span className="ml-1.5 capitalize">{project.category}</span>
                                    </Badge>
                                    
                                    <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-white/10 shadow-md">
                                        <Calendar className="mr-1.5 h-4 w-4" />
                                        {project.year}
                                    </Badge>
                                    
                                    {project.duration && (
                                        <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-white/10 shadow-md">
                                            <Clock className="mr-1.5 h-4 w-4" />
                                            {project.duration}
                                        </Badge>
                                    )}
                                </motion.div>
                                
                                <motion.h1 
                                    className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <span className="relative">
                                        {project.title}
                                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-full"></span>
                                    </span>
                                </motion.h1>
                                
                                <motion.p 
                                    className="text-xl text-white/90 max-w-3xl mb-3 drop-shadow-sm font-light leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    {project.description}
                                </motion.p>
                                
                                <motion.div 
                                    className="flex flex-wrap gap-4 -mt-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                >
                                    {project.demoUrl && (
                                        <Button 
                                            size="lg" 
                                            onClick={() => setIsDemoOpen(true)}
                                            className={`gap-2 text-base font-medium bg-gradient-to-r ${getCategoryColor(project.category)} hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 relative overflow-hidden group`}
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></span>
                                            <Play className="h-5 w-5" />
                                            Voir la démo
                                        </Button>
                                    )}
                                    
                                    {project.githubUrl && (
                                        <Button variant="outline" size="lg" className="gap-2 backdrop-blur-sm bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-lg relative overflow-hidden group" asChild>
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></span>
                                                <Github className="h-5 w-5" />
                                                Code source
                                            </a>
                                        </Button>
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                    
                    {/* Scroll indicator */}
                    <motion.div 
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
                            <motion.div 
                                className="w-1.5 h-1.5 bg-white rounded-full"
                                animate={{ 
                                    y: [0, 12, 0],
                                }}
                                transition={{ 
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut" 
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
                
                {/* Main content with glass morphism */}
                <div className={SITE_CONTAINER}>
                    {/* Background patterns from app.css */}
                    <div className="absolute inset-0 bg-grid-pattern -z-10 opacity-20 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-noise-pattern -z-10 opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
                        <div className="absolute top-[60%] -left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="-mt-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Gallery and content */}
                        <motion.div 
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl border border-border/30 overflow-hidden p-6 md:p-8">
                                {/* Interactive Gallery */}
                                <div className="mb-8">
                                    <div className="rounded-xl overflow-hidden aspect-video bg-muted/50 relative">
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="animate-pulse flex space-x-2">
                                                    <div className="h-3 w-3 bg-muted-foreground/30 rounded-full"></div>
                                                    <div className="h-3 w-3 bg-muted-foreground/30 rounded-full"></div>
                                                    <div className="h-3 w-3 bg-muted-foreground/30 rounded-full"></div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <AnimatePresence mode="wait">
                                            <motion.img 
                                                key={activeImage}
                                                src={activeImage} 
                                                alt={project.title}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: imageLoaded ? 1 : 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-full h-full object-cover"
                                                onLoad={() => setImageLoaded(true)}
                                            />
                                        </AnimatePresence>
                                        
                                        {/* Gallery navigation buttons */}
                                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                                            <Button 
                                                variant="secondary" 
                                                size="icon" 
                                                className="rounded-full bg-background/50 backdrop-blur-sm"
                                                onClick={() => navigateGallery('prev')}
                                            >
                                                <ChevronRight className="h-5 w-5 rotate-180" />
                                            </Button>
                                            <Button 
                                                variant="secondary" 
                                                size="icon" 
                                                className="rounded-full bg-background/50 backdrop-blur-sm"
                                                onClick={() => navigateGallery('next')}
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    {/* Thumbnails */}
                                    <div className="mt-4 grid grid-cols-5 gap-2">
                                        {galleryImages.map((image, index) => (
                                            <button
                                                key={index}
                                                className={cn(
                                                    "aspect-video rounded-lg overflow-hidden border-2 transition-all",
                                                    activeImage === image 
                                                        ? `border-2 ring-2 ring-offset-2 ring-primary ring-offset-background shadow-lg scale-[1.05] z-10` 
                                                        : "border-transparent hover:border-primary/50 opacity-70 hover:opacity-100"
                                                )}
                                                onClick={() => {
                                                    setActiveImage(image);
                                                    setCurrentImageIndex(index);
                                                }}
                                            >
                                                <img 
                                                    src={image} 
                                                    alt={`${project.title} - image ${index + 1}`} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Project Technologies Tags - moved from sidebar */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                                        <Code className="h-5 w-5 mr-2 text-primary" />
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span 
                                                key={index} 
                                                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium transition-transform hover:scale-105"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            
                                {/* Project Description */}
                                <div className="prose prose-lg max-w-none">
                                    <h2 className="text-2xl font-semibold mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                        <Globe className="h-6 w-6 text-primary" />
                                        Présentation du projet
                                    </h2>
                                    
                                    {/* Première partie de la description */}
                                    <p className="leading-relaxed text-foreground/90 mb-6">{project.description}</p>
                                    
                                    {/* Sections de description */}
                                    {project.descriptionSections?.map((section, index) => (
                                        section.type === 'details' ? (
                                            <div key={index} className="my-8 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
                                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -z-10" />
                                                
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                            <Quote className="h-4 w-4 text-primary" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <motion.p 
                                                            className="text-lg text-foreground/90 leading-relaxed"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                        >
                                                            {section.content}
                                                        </motion.p>
                                                        
                                                        <div className="mt-4 flex justify-end">
                                                            <div className="flex items-center text-primary/80 text-sm">
                                                                <Star className="h-3 w-3 mr-1 inline" fill="currentColor" />
                                                                <span>Point clé du projet</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : section.type === 'conclusion' ? (
                                            <div key={index} className="mt-6 mb-2 border-l-4 border-primary/30 pl-4">
                                                <p className="leading-relaxed text-foreground/90 italic">
                                                    {section.content}
                                                </p>
                                            </div>
                                        ) : (
                                            <p key={index} className="leading-relaxed text-foreground/90 mb-6">
                                                {section.content}
                                            </p>
                                        )
                                    ))}
                                </div>
                                
                                {/* Challenges & Solutions - redesigned with cards */}
                                <div className="mt-12 space-y-12">
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h2 className="text-2xl font-semibold mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                            <Lightbulb className="h-6 w-6 text-primary" />
                                            Défis et solutions
                                        </h2>
                                        
                                        <div className="grid grid-cols-1 gap-10">
                                            {(project.challenges || [
                                                "Optimisation des performances avec de grandes quantités de données",
                                                "Conception d'une interface intuitive pour des fonctionnalités complexes",
                                                "Compatibilité avec différents navigateurs et appareils"
                                            ]).map((challenge, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="rounded-xl overflow-hidden"
                                                >
                                                    <div className="relative">
                                                        {/* Connector line between challenge and solution */}
                                                        <div className="absolute left-6 top-[100px] w-0.5 h-16 bg-gradient-to-b from-primary/50 to-emerald-500/50"></div>
                                                        
                                                        {/* Challenge Card */}
                                                        <div className="bg-card/80 backdrop-blur-sm p-6 pt-8 border border-border/30 rounded-xl shadow-sm mb-6 relative hover:shadow-md transition-shadow mt-4">
                                                            {/* Pattern background for challenge card using app.css classes */}
                                                            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none bg-grid-pattern opacity-5"></div>
                                                            
                                                            <div className="absolute -top-4 left-6 z-20">
                                                                <span className="px-3 py-1.5 bg-primary text-white font-medium text-xs rounded-full shadow-md inline-flex items-center">
                                                                    <span className="mr-1 font-bold">{index + 1}</span>
                                                                    <span>Défi</span>
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex gap-4 items-start">
                                                                <div className="flex-shrink-0">
                                                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center relative">
                                                                        <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse"></div>
                                                                        <Lightbulb className="h-6 w-6 text-primary relative z-10" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-foreground/90 leading-relaxed">{challenge}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Solution Card */}
                                                        <div className="bg-card/80 backdrop-blur-sm p-6 pt-8 border border-border/30 rounded-xl shadow-sm ml-10 hover:shadow-md transition-shadow relative mt-4">
                                                            {/* Pattern background for solution card using app.css classes */}
                                                            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none bg-noise-pattern opacity-10"></div>
                                                            
                                                            <div className="absolute -top-4 left-6 z-20">
                                                                <span className="px-3 py-1.5 bg-emerald-500 text-white font-medium text-xs rounded-full shadow-md">
                                                                    Solution
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex gap-4 items-start">
                                                                <div className="flex-shrink-0">
                                                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center relative">
                                                                        <div className="absolute inset-0 bg-emerald-500/5 rounded-lg animate-pulse"></div>
                                                                        <CheckCircle className="h-6 w-6 text-emerald-500 relative z-10" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-foreground/90 leading-relaxed">
                                                                        {(project.solutions || [
                                                                            "Implémentation de techniques de virtualisation pour le rendu des listes",
                                                                            "Approche de conception itérative avec tests utilisateurs fréquents",
                                                                            "Architecture responsive avec tests automatisés cross-browser"
                                                                        ])[index]}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Project Info Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="lg:mt-0 mt-8"
                        >
                            <div className="sticky top-24 space-y-6">
                                {/* Back button */}
                                <div className="hidden lg:block mb-8">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        asChild
                                        className="group"
                                    >
                                        <Link href="/projects" className="flex items-center">
                                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                            Retour aux projets
                                        </Link>
                                    </Button>
                                </div>
                                
                                {/* Actions */}
                                <div className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/30 shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
                                    
                                    <h3 className="text-xl font-semibold mb-5 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center">
                                        <Link2 className="h-5 w-5 mr-2 text-primary" />
                                        Liens du projet
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        {project.demoUrl && (
                                            <div className="group">
                                                <Button 
                                                    className="w-full justify-between font-medium text-white bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity group-hover:shadow-md"
                                                    onClick={() => setIsDemoOpen(true)}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                                                            <Play className="h-4 w-4" />
                                                        </div>
                                                        <span>Voir la démo interactive</span>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </div>
                                        )}
                                        
                                        {project.demoUrl && (
                                            <div className="bg-card/50 rounded-xl p-1 backdrop-blur-sm border border-border/20 hover:bg-card/80 transition-colors hover:border-primary/20 hover:shadow-sm group">
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                                            <ExternalLink className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <span className="text-foreground/80 group-hover:text-foreground transition-colors">Ouvrir le site</span>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                                </a>
                                            </div>
                                        )}
                                        
                                        {project.githubUrl && (
                                            <div className="bg-card/50 rounded-xl p-1 backdrop-blur-sm border border-border/20 hover:bg-card/80 transition-colors hover:border-primary/20 hover:shadow-sm group">
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                                            <Github className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <span className="text-foreground/80 group-hover:text-foreground transition-colors">Voir le code source</span>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                                </a>
                                            </div>
                                        )}
                                        
                                        <div className="bg-primary/5 rounded-xl p-4 backdrop-blur-sm border border-primary/10 mt-4">
                                            <div className="flex items-center text-center justify-center">
                                                <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                                                <span className="text-sm text-foreground/80">Réalisé en <span className="font-semibold">{project.year}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* My Role */}
                                <div className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/30 shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
                                    
                                    <h3 className="text-xl font-semibold mb-5 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center">
                                        <Users className="h-5 w-5 mr-2 text-primary" />
                                        Mon rôle
                                    </h3>
                                    
                                    <div className="bg-primary/5 p-4 rounded-xl mb-4 backdrop-blur-sm border border-primary/10">
                                        <div className="text-foreground/90 leading-relaxed">
                                            {project.role ? (
                                                <span>{project.role}</span>
                                            ) : (
                                                <span>
                                                    En tant que développeur principal sur ce projet, j'ai été responsable de la conception 
                                                    de l'architecture, du développement frontend et backend, ainsi que de la coordination 
                                                    avec les autres membres de l'équipe.
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-card/70 p-3 rounded-xl border border-border/20 flex flex-col items-center">
                                            <span className="text-sm text-foreground/70 mb-1">Durée</span>
                                            <div className="font-semibold flex items-center">
                                                <Clock className="h-4 w-4 mr-1 text-primary/70" />
                                                {project.duration || 'N/A'}
                                            </div>
                                        </div>
                                        
                                        {project.teamSize && (
                                            <div className="flex-1 bg-card/70 p-3 rounded-xl border border-border/20 flex flex-col items-center">
                                                <span className="text-sm text-foreground/70 mb-1">Équipe</span>
                                                <div className="font-semibold flex items-center">
                                                    <Users className="h-4 w-4 mr-1 text-primary/70" />
                                                    {project.teamSize} {project.teamSize > 1 ? 'personnes' : 'personne'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Client Information */}
                                {project.client && (
                                    <div className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/30 shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
                                        
                                        <h3 className="text-xl font-semibold mb-5 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center">
                                            <Building2 className="h-5 w-5 mr-2 text-primary" />
                                            Client
                                        </h3>
                                        
                                        <div className="mb-4 mt-6 flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-3 shadow-sm border border-border/30">
                                                <span className="text-xl font-bold text-primary">{project.client.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-lg">{project.client.name}</div>
                                                <div className="text-foreground/70 text-sm">{project.client.industry}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-5 pt-5 border-t border-border/20">
                                            <div className="flex items-center text-foreground/80 mb-3">
                                                <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                                                <span>{project.client.location}</span>
                                            </div>
                                            
                                            <div className="flex items-center text-foreground/80">
                                                <Briefcase className="h-4 w-4 mr-2 text-primary/70" />
                                                <span>{project.duration || 'Durée non spécifiée'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-5 pt-3">
                                            <Badge variant="outline" className="w-full justify-center py-1.5 border-primary/20 hover:border-primary/40 transition-colors">
                                                {project.year}
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Related Projects - with modern card design */}
                    <div className="mt-24 relative">
                        {/* Pattern background for related projects section from app.css */}
                        <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.08] pointer-events-none"></div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold mb-2">Projets similaires</h2>
                            <p className="text-foreground/80 mb-8">Découvrez d'autres projets dans le même domaine</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedProjects.length > 0 ? (
                                    relatedProjects.map((relatedProject: Project, i: number) => (
                                        <motion.div
                                            key={relatedProject.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group relative rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                        >
                                            {/* Pattern background for individual project cards */}
                                            <div className="absolute inset-0 -z-10 bg-noise-pattern opacity-10 pointer-events-none"></div>
                                            
                                            <Link href={`/projects/${relatedProject.slug}`} className="block h-full">
                                                <div className="h-48 overflow-hidden">
                                                    <div className="absolute top-3 right-3 z-10">
                                                        <Badge 
                                                            className="bg-black/40 backdrop-blur-md text-white border-none"
                                                        >
                                                            {getCategoryIcon(relatedProject.category)}
                                                            <span className="ml-1">{relatedProject.category}</span>
                                                        </Badge>
                                                    </div>
                                                    <img 
                                                        src={relatedProject.image}
                                                        alt={relatedProject.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                                
                                                <div className="p-5">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{relatedProject.title}</h3>
                                                        <Badge variant="outline" className="text-xs">{relatedProject.year}</Badge>
                                                    </div>
                                                    
                                                    <p className="text-foreground/80 text-sm mb-4 line-clamp-2">
                                                        {relatedProject.description}
                                                    </p>
                                                    
                                                    <div className="flex items-center text-primary">
                                                        <span className="text-sm font-medium">Voir les détails</span>
                                                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-12">
                                        <p className="text-foreground/70">Aucun projet similaire trouvé</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </GuestLayout>
    );
} 