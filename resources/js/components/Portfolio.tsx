import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Code, Github, Globe, Layers, Smartphone, Database, ExternalLink, ArrowRight, Monitor, Sparkles, Play, Filter } from 'lucide-react';
import { ProjectDemo } from '@/components/Projects/ProjectDemo';
import { SITE_CONTAINER, SITE_MARGIN } from '@/components/guest/guest-header';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

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

type CategoryFilter = 'all' | 'web' | 'mobile' | 'backend' | 'other';

export function Portfolio() {
    const [filter, setFilter] = useState<CategoryFilter>('all');
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [isGridView, setIsGridView] = useState(true);
    const [demoProject, setDemoProject] = useState<Project | null>(null);
    const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Charger les projets depuis l'API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/projects');
                setProjects(response.data);
                console.log('Projets chargés:', response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des projets:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProjects();
    }, []);
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
        
    const featuredProjects = projects.filter(project => project.featured);
    
    // Scroll to project when clicking on a featured project
    const scrollToProject = (projectId: string) => {
        setActiveProject(projectId);
        setFilter('all');
        setIsGridView(true);
        
        setTimeout(() => {
            if (projectRefs.current[projectId]) {
                projectRefs.current[projectId]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 300);
    };
    
    // Reset active project when changing filter
    useEffect(() => {
        setActiveProject(null);
    }, [filter]);

    // Category icon mapping
    const getCategoryIcon = (category: string) => {
        switch(category) {
            case 'web': return <Monitor className="h-4 w-4" />;
            case 'mobile': return <Smartphone className="h-4 w-4" />;
            case 'backend': return <Database className="h-4 w-4" />;
            default: return <Code className="h-4 w-4" />;
        }
    };

    // Demo handlers
    const openDemo = (project: Project, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Ajouter un effet de transition sur le corps de la page
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            setDemoProject(project);
        }, 10);
    };

    const closeDemo = () => {
        setDemoProject(null);
        // Restaurer le défilement normal
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    };

    // Afficher un message de chargement si les projets sont en cours de chargement
    if (loading) {
        return (
            <section className="py-24 relative overflow-hidden">
                <div className={cn(SITE_CONTAINER)}>
                    <div className="text-center">
                        <p className="text-lg text-foreground/70 dark:text-muted-foreground">
                            Chargement des projets...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Demo Modal */}
            {demoProject && demoProject.demoUrl && (
                <ProjectDemo
                    projectId={demoProject.id}
                    title={demoProject.title}
                    demoUrl={demoProject.demoUrl}
                    isOpen={!!demoProject}
                    onClose={closeDemo}
                />
            )}

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl" />
            </div>
            
            <div className={cn(SITE_CONTAINER)}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-block text-sm font-medium text-primary mb-3 px-3 py-1 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20"
                    >
                        Réalisations
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent">
                        Mes Projets
                    </h2>
                    <p className="text-lg text-foreground/70 dark:text-muted-foreground max-w-2xl mx-auto">
                        Découvrez une sélection de mes réalisations récentes, illustrant mes compétences techniques 
                        et ma passion pour le développement de solutions innovantes.
                    </p>
                </motion.div>

                {/* Featured Projects Slider */}
                {featuredProjects.length > 0 && (
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-semibold flex items-center">
                                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                                Projets à la une
                            </h3>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-sm font-medium border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10"
                                asChild
                            >
                                <Link href="/projects">
                                Voir tous les projets 
                                <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredProjects.map((project, index) => {
                                console.log(`Featured project ${index}: ID=${project.id}, Link=/projects/${project.slug}`);
                                return (
                                <motion.div
                                    key={`featured-${project.id}`}
                                    variants={fadeInUp}
                                    transition={{ delay: index * 0.15 }}
                                    className="group relative overflow-hidden rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-500 border border-border/30 dark:border-border/20"
                                >
                                        <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20">
                                            <span className="sr-only">Voir les détails de {project.title}</span>
                                        </Link>
                                        
                                    {/* Overlay with gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                                    
                                    {/* Project Image */}
                                    <motion.div 
                                        className="h-80 w-full"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    
                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-white backdrop-blur-md border border-primary/30">
                                                {project.year}
                                            </span>
                                            <span className="text-xs text-white/90 font-medium flex items-center px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md">
                                                {getCategoryIcon(project.category)}
                                                <span className="ml-1 capitalize">{project.category}</span>
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {project.description.length > 100 
                                                ? `${project.description.substring(0, 100)}...` 
                                                : project.description
                                            }
                                        </p>
                                        <div className="flex gap-3">
                                            <Button 
                                                size="sm" 
                                                variant="default" 
                                                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/20"
                                                    asChild
                                            >
                                                    <Link href={`/projects/${project.slug}`} className="z-30 relative">
                                                En savoir plus
                                                <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                                    </Link>
                                            </Button>
                                            
                                            {project.demoUrl && (
                                                <Button 
                                                    size="sm" 
                                                    variant="default" 
                                                        className="bg-primary/80 hover:bg-primary backdrop-blur-md text-white border border-primary/50 relative z-30"
                                                        onClick={(e) => {
                                                            console.log(`Opening demo for project ${project.id}, Demo URL: ${project.demoUrl}`);
                                                            openDemo(project, e);
                                                        }}
                                                >
                                                    <Play className="mr-1.5 h-3.5 w-3.5" />
                                                    Démo
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-t border-border/30 dark:border-border/20 pt-10 mb-10"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                        {/* Filter Buttons */}
                        <motion.div 
                            variants={fadeInUp}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap gap-2"
                        >
                            <span className="flex items-center mr-2 text-sm text-foreground/70 dark:text-muted-foreground">
                                <Filter className="mr-1.5 h-3.5 w-3.5" />
                                Filtrer par:
                            </span>
                            <Button 
                                variant={filter === 'all' ? 'default' : 'outline'}
                                onClick={() => setFilter('all')}
                                className={cn(
                                    "rounded-full",
                                    filter !== 'all' && "border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10"
                                )}
                                size="sm"
                            >
                                <Layers className="mr-1.5 h-3.5 w-3.5" />
                                Tous
                            </Button>
                            <Button 
                                variant={filter === 'web' ? 'default' : 'outline'}
                                onClick={() => setFilter('web')}
                                className={cn(
                                    "rounded-full",
                                    filter !== 'web' && "border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10"
                                )}
                                size="sm"
                            >
                                <Monitor className="mr-1.5 h-3.5 w-3.5" />
                                Web
                            </Button>
                            <Button 
                                variant={filter === 'mobile' ? 'default' : 'outline'}
                                onClick={() => setFilter('mobile')}
                                className={cn(
                                    "rounded-full",
                                    filter !== 'mobile' && "border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10"
                                )}
                                size="sm"
                            >
                                <Smartphone className="mr-1.5 h-3.5 w-3.5" />
                                Mobile
                            </Button>
                            <Button 
                                variant={filter === 'backend' ? 'default' : 'outline'}
                                onClick={() => setFilter('backend')}
                                className={cn(
                                    "rounded-full",
                                    filter !== 'backend' && "border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10"
                                )}
                                size="sm"
                            >
                                <Database className="mr-1.5 h-3.5 w-3.5" />
                                Backend
                            </Button>
                        </motion.div>
                        
                        {/* View toggle */}
                        <div className="flex items-center gap-2 border border-border/50 dark:border-border/30 rounded-lg p-1 self-start">
                            <button
                                aria-label="Vue grille"
                                className={cn(
                                    "p-1.5 rounded transition-colors",
                                    isGridView ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                                onClick={() => setIsGridView(true)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="7" height="7" x="3" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="14" rx="1" />
                                    <rect width="7" height="7" x="3" y="14" rx="1" />
                                </svg>
                            </button>
                            <button
                                aria-label="Vue liste"
                                className={cn(
                                    "p-1.5 rounded transition-colors",
                                    !isGridView ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                                onClick={() => setIsGridView(false)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" x2="21" y1="6" y2="6" />
                                    <line x1="3" x2="21" y1="12" y2="12" />
                                    <line x1="3" x2="21" y1="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Projects Display - Grid or List View */}
                    {isGridView ? (
                        /* Grid View */
                        <motion.div 
                            variants={fadeInUp}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    ref={(el) => { projectRefs.current[project.id] = el; }}
                                    variants={fadeInUp}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "group overflow-hidden rounded-xl",
                                        "bg-card/90 dark:bg-card/80 backdrop-blur-sm shadow-sm",
                                        "border",
                                        activeProject === project.id 
                                            ? "border-primary/40 ring-1 ring-primary/20" 
                                            : "border-border/50 dark:border-border/30 hover:border-primary/20 dark:hover:border-primary/30",
                                        "transition-all duration-300"
                                    )}
                                >
                                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20">
                                        <span className="sr-only">Voir les détails de {project.title}</span>
                                    </Link>
                                    
                                    <div className="relative h-52 overflow-hidden">
                                        {/* Category badge */}
                                        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs bg-black/40 text-white backdrop-blur-sm flex items-center border border-white/10">
                                            {getCategoryIcon(project.category)}
                                            <span className="ml-1 capitalize">{project.category}</span>
                                        </div>
                                        
                                        {/* Image with hover effect */}
                                        <motion.div 
                                            className="w-full h-full"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div 
                                                className="w-full h-full bg-cover bg-center transition-transform duration-300"
                                                style={{ backgroundImage: `url(${project.image})` }}
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </motion.div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-foreground dark:text-foreground/90">{project.title}</h3>
                                            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted dark:bg-muted/70">
                                                {project.year}
                                            </span>
                                        </div>
                                        
                                        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{project.description}</p>
                                        
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.technologies.slice(0, 3).map(tech => (
                                                <span 
                                                    key={tech} 
                                                    className="text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/90 px-2 py-0.5 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="text-xs bg-muted dark:bg-muted/70 text-muted-foreground px-2 py-0.5 rounded-full">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Button 
                                                variant="secondary" 
                                                size="sm" 
                                                asChild
                                                className="relative z-30"
                                            >
                                                <Link href={`/projects/${project.slug}`}>
                                                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                                    Détails
                                                </Link>
                                            </Button>
                                            {project.demoUrl && (
                                                <Button 
                                                    variant="secondary" 
                                                    size="sm" 
                                                    onClick={(e) => {
                                                        console.log(`Opening demo for project ${project.id}, Demo URL: ${project.demoUrl}`);
                                                        openDemo(project, e);
                                                    }}
                                                    className="flex items-center relative z-30"
                                                >
                                                    <Play className="mr-1.5 h-3.5 w-3.5" />
                                                    Démo
                                                </Button>
                                            )}
                                            {project.githubUrl && (
                                                <Button variant="outline" size="sm" asChild className="border-border/50 dark:border-border/30 relative z-30">
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                        <Github className="mr-1.5 h-3.5 w-3.5" />
                                                        GitHub
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        /* List View */
                        <motion.div 
                            variants={fadeInUp}
                            className="space-y-4"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    variants={fadeInUp}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "flex flex-col md:flex-row gap-4 p-4 md:p-5 rounded-xl",
                                        "bg-card/90 dark:bg-card/80 backdrop-blur-sm border",
                                        activeProject === project.id 
                                            ? "border-primary/40 ring-1 ring-primary/20" 
                                            : "border-border/50 dark:border-border/30 hover:border-primary/20 dark:hover:border-primary/30",
                                        "transition-all duration-300"
                                    )}
                                >
                                    {/* Image thumbnail for list view */}
                                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 border border-border/30 dark:border-border/20">
                                        <div 
                                            className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
                                            style={{ backgroundImage: `url(${project.image})` }}
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground/90">{project.title}</h3>
                                                    <span className="text-xs bg-muted dark:bg-muted/70 text-muted-foreground px-2 py-0.5 rounded-full">
                                                        {project.year}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground flex items-center bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary/90 px-2 py-0.5 rounded-full">
                                                        {getCategoryIcon(project.category)}
                                                        <span className="ml-1 capitalize">{project.category}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-muted-foreground mb-3 text-sm">{project.description}</p>
                                        
                                        <div className="flex items-center justify-between flex-wrap gap-y-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.technologies.slice(0, 4).map(tech => (
                                                    <span 
                                                        key={tech} 
                                                        className="text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/90 px-2 py-0.5 rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <span className="text-xs bg-muted dark:bg-muted/70 text-muted-foreground px-2 py-0.5 rounded-full">
                                                        +{project.technologies.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    asChild
                                                    className="relative z-30"
                                                >
                                                    <Link href={`/projects/${project.slug}`}>
                                                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                                        Détails
                                                    </Link>
                                                </Button>
                                                {project.demoUrl && (
                                                    <Button 
                                                        variant="default" 
                                                        size="sm" 
                                                        onClick={(e) => openDemo(project, e)}
                                                        className="relative z-30"
                                                    >
                                                        <Play className="mr-1.5 h-3.5 w-3.5" />
                                                        Démo
                                                    </Button>
                                                )}
                                                {project.githubUrl && (
                                                    <Button variant="ghost" size="sm" asChild className="relative z-30">
                                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                            <Github className="mr-1.5 h-3.5 w-3.5" />
                                                            GitHub
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                    
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-xl p-12 border border-border/50 dark:border-border/30"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted dark:bg-muted/70 mb-4">
                                <Code className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-foreground/90">Aucun projet trouvé</h3>
                            <p className="text-muted-foreground">Aucun projet ne correspond à ce filtre actuellement.</p>
                            <Button 
                                variant="outline" 
                                className="mt-4 border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10"
                                onClick={() => setFilter('all')}
                            >
                                Voir tous les projets
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
} 