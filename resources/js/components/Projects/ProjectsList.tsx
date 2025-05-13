import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { 
    Code, 
    Github, 
    Globe, 
    Layers, 
    Smartphone, 
    Database, 
    ExternalLink, 
    ArrowRight, 
    Monitor, 
    Sparkles,
    Search,
    Filter,
    Play,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { ProjectDemo } from '@/components/Projects/ProjectDemo';

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
type SortOption = 'newest' | 'oldest' | 'alphabetical';

interface ProjectsListProps {
    projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
    const [filter, setFilter] = useState<CategoryFilter>('all');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [isGridView, setIsGridView] = useState(true);
    const [demoProject, setDemoProject] = useState<Project | null>(null);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const featuredSliderRef = useRef<HTMLDivElement>(null);
    const projectsGridRef = useRef<HTMLDivElement>(null);
    
    // Fonction pour faire défiler vers la section des projets
    const scrollToProjects = () => {
        if (projectsGridRef.current) {
            projectsGridRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Filtre et tri combinés
    const filteredAndSortedProjects = projects
        .filter(project => {
            // Filtre par catégorie
            const categoryMatch = filter === 'all' || project.category === filter;
            
            // Filtre par recherche
            const searchMatch = searchQuery === '' || 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.technologies.some(tech => 
                    tech.toLowerCase().includes(searchQuery.toLowerCase())
                );
                
            return categoryMatch && searchMatch;
        })
        .sort((a, b) => {
            // Tri des projets
            switch (sortBy) {
                case 'newest':
                    return parseInt(b.year) - parseInt(a.year);
                case 'oldest':
                    return parseInt(a.year) - parseInt(b.year);
                case 'alphabetical':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
        
    const featuredProjects = projects.filter(project => project.featured);
    
    // Navigation dans le slider des projets à la une
    const nextFeatured = () => {
        setFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
    };
    
    const prevFeatured = () => {
        setFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (!demoProject) { // Ne pas avancer automatiquement si une démo est ouverte
                nextFeatured();
            }
        }, 6000);
        
        return () => clearInterval(interval);
    }, [demoProject]);
    
    // Reset active project when changing filter or sort options
    useEffect(() => {
        setActiveProject(null);
    }, [filter, sortBy, searchQuery]);

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
        setDemoProject(project);
    };

    const closeDemo = () => setDemoProject(null);

    return (
        <section className="relative overflow-hidden">
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

            {/* Hero Section with Dynamic Background */}
            <div className="relative bg-gradient-to-br from-background via-background to-background overflow-hidden">
                {/* Animated background patterns */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl transform -translate-x-1/4 -translate-y-1/2 opacity-80" />
                    <div className="absolute bottom-0 left-0 w-[70vw] h-[70vh] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/2 opacity-80" />
                    <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vh] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl mix-blend-normal opacity-70" />
                    
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
                </div>
                
                <div className="py-20 md:py-28 flex flex-col items-center relative">
                    {/* Animated shape decoration */}
                    <motion.div 
                        className="absolute -right-20 top-1/3 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-70 dark:opacity-30"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            x: [0, 10, 0],
                            y: [0, -10, 0]
                        }}
                        transition={{ 
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    <motion.div 
                        className="absolute -left-10 bottom-10 w-40 h-40 bg-secondary/10 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-70 dark:opacity-30"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, -15, 0],
                            y: [0, 15, 0]
                        }}
                        transition={{ 
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl text-center relative z-10 px-4"
                    >
                        <motion.div
                            className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm mb-6 text-sm text-primary font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                            Portfolio de Projets
                        </motion.div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                            Découvrez Mes Créations
                        </h1>
                        
                        <p className="text-lg md:text-xl text-foreground/70 dark:text-muted-foreground max-w-2xl mx-auto mb-10">
                            Un aperçu de mon parcours à travers une collection de projets innovants, 
                            du développement web aux applications mobiles et backend.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button 
                                size="lg" 
                                className="rounded-full px-6 shadow-lg shadow-primary/20 dark:shadow-primary/10"
                                onClick={scrollToProjects}
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                Voir les réalisations
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="rounded-full px-6 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                                asChild
                            >
                                <Link href="/cv">
                                    Consulter mon CV
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Featured Projects Slider - Redesigné */}
            {featuredProjects.length > 0 && (
                <div className="py-24 relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] border-y border-border/20 backdrop-blur-sm">
                    {/* Background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-noise-pattern opacity-20 mix-blend-overlay"></div>
                    </div>
                    
                    <div className={cn(SITE_CONTAINER, "relative")}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <motion.span 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="inline-block text-sm font-medium text-primary mb-3 px-3 py-1 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20"
                            >
                                <Sparkles className="inline-block mr-1.5 h-3.5 w-3.5" />
                                Projets à la une
                            </motion.span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent">
                                Mes Travaux Récents
                            </h2>
                            <p className="text-lg text-foreground/70 dark:text-muted-foreground max-w-2xl mx-auto">
                                Des projets sélectionnés qui mettent en valeur mes compétences et ma créativité.
                            </p>
                        </motion.div>
                        
                        <div className="relative" ref={featuredSliderRef}>
                            {/* Navigation arrows */}
                            <div className="absolute top-1/2 left-4 z-20 -translate-y-1/2">
                                <Button 
                                    size="icon" 
                                    variant="secondary" 
                                    className="h-10 w-10 rounded-full opacity-80 hover:opacity-100 shadow-lg"
                                    onClick={prevFeatured}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="absolute top-1/2 right-4 z-20 -translate-y-1/2">
                                <Button 
                                    size="icon" 
                                    variant="secondary" 
                                    className="h-10 w-10 rounded-full opacity-80 hover:opacity-100 shadow-lg"
                                    onClick={nextFeatured}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                            
                            <div className="overflow-hidden rounded-2xl mx-auto max-w-5xl shadow-2xl relative group">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={featuredIndex}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative aspect-[16/9] md:aspect-[21/9]"
                                    >
                                        {/* Overlay with gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                                        
                                        {/* Project Image */}
                                        <img 
                                            src={featuredProjects[featuredIndex].image} 
                                            alt={featuredProjects[featuredIndex].title}
                                            className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                                        />
                                        
                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-xs md:text-sm font-medium px-3 py-1 rounded-full bg-primary/30 text-white backdrop-blur-md border border-primary/40">
                                                    {featuredProjects[featuredIndex].year}
                                                </span>
                                                <span className="text-xs md:text-sm text-white/90 font-medium flex items-center px-3 py-1 rounded-full bg-black/60 backdrop-blur-md">
                                                    {getCategoryIcon(featuredProjects[featuredIndex].category)}
                                                    <span className="ml-1.5 capitalize">{featuredProjects[featuredIndex].category}</span>
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">{featuredProjects[featuredIndex].title}</h3>
                                            <p className="text-white/90 text-sm md:text-base mb-6 max-w-3xl">
                                                {featuredProjects[featuredIndex].description}
                                            </p>
                                            <div className="flex gap-3 items-center">
                                                <Button 
                                                    size="lg" 
                                                    variant="default" 
                                                    className="bg-white text-black hover:bg-white/90 backdrop-blur-md border-none shadow-lg"
                                                    asChild
                                                >
                                                    <Link href={`/projects/${featuredProjects[featuredIndex].slug}`}>
                                                        Voir le projet
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                
                                                {featuredProjects[featuredIndex].demoUrl && (
                                                    <Button 
                                                        size="lg" 
                                                        variant="secondary"
                                                        className="bg-primary/80 text-white hover:bg-primary/90 backdrop-blur-md shadow-lg border-none"
                                                        onClick={(e) => openDemo(featuredProjects[featuredIndex], e)}
                                                    >
                                                        <Play className="mr-2 h-4 w-4" />
                                                        Démo en direct
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                                
                                {/* Navigation dots */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                                    {featuredProjects.map((_, index) => (
                                        <button
                                            key={index}
                                            className={cn(
                                                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                                index === featuredIndex 
                                                    ? "bg-white scale-125" 
                                                    : "bg-white/50 hover:bg-white/70"
                                            )}
                                            onClick={() => setFeaturedIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Featured Projects Thumbnails */}
                            <div className="hidden lg:flex mt-6 gap-4 justify-center">
                                {featuredProjects.map((project, index) => (
                                    <button
                                        key={`thumb-${project.id}`}
                                        className={cn(
                                            "relative rounded-lg overflow-hidden h-16 w-32 transition-all duration-300",
                                            index === featuredIndex 
                                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                                                : "opacity-50 hover:opacity-80"
                                        )}
                                        onClick={() => setFeaturedIndex(index)}
                                    >
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rest of the projects section */}
            <div className={cn(SITE_CONTAINER, "relative")}>
                {/* Background elements */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-primary/3 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
                    <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-secondary/3 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
                </div>
                
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filters - keep existing code */}
                    <div className="mb-8 bg-card/90 backdrop-blur-md p-5 rounded-xl border border-border/60 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-foreground/50 dark:text-muted-foreground">
                                    <Search className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher par titre, description ou technologie..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-background/95 border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors shadow-sm"
                                />
                            </div>

                            {/* Sort Options */}
                            <div className="flex gap-2 items-center">
                                <span className="text-sm text-foreground/70 dark:text-muted-foreground font-medium">Trier par:</span>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="bg-background/95 border border-border/60 rounded-lg text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors shadow-sm text-foreground/80 dark:text-muted-foreground"
                                >
                                    <option value="newest">Plus récents</option>
                                    <option value="oldest">Plus anciens</option>
                                    <option value="alphabetical">Alphabétique</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                        {/* Filter Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-wrap gap-2"
                        >
                            <Button 
                                variant={filter === 'all' ? 'default' : 'outline'}
                                onClick={() => setFilter('all')}
                                className={cn(
                                    "rounded-full",
                                    filter !== 'all' && "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
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
                                    filter !== 'web' && "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
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
                                    filter !== 'mobile' && "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
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
                                    filter !== 'backend' && "border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                                )}
                                size="sm"
                            >
                                <Database className="mr-1.5 h-3.5 w-3.5" />
                                Backend
                            </Button>
                        </motion.div>
                        
                        {/* View toggle */}
                        <div className="flex items-center gap-2 border border-border/60 rounded-lg p-1 self-start shadow-sm">
                            <button
                                className={cn(
                                    "p-1.5 rounded transition-colors",
                                    isGridView 
                                        ? "bg-primary/15 text-primary" 
                                        : "text-foreground/60 hover:text-foreground hover:bg-muted/70"
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
                                className={cn(
                                    "p-1.5 rounded transition-colors",
                                    !isGridView 
                                        ? "bg-primary/15 text-primary" 
                                        : "text-foreground/60 hover:text-foreground hover:bg-muted/70"
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

                    {/* Results Summary */}
                    <div className="mb-6 text-sm text-foreground/70 dark:text-muted-foreground font-medium">
                        <p>{filteredAndSortedProjects.length} projet{filteredAndSortedProjects.length !== 1 ? 's' : ''} trouvé{filteredAndSortedProjects.length !== 1 ? 's' : ''}</p>
                    </div>

                    {/* Projects Display - Grid or List View */}
                    {isGridView ? (
                        /* Grid View - Redesigné */
                        <motion.div 
                            ref={projectsGridRef}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { 
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                        >
                            {filteredAndSortedProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    ref={(el) => { projectRefs.current[project.id] = el; }}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                    }}
                                    className={cn(
                                        "group overflow-hidden rounded-xl relative flex flex-col h-full",
                                        "bg-card/90 backdrop-blur-md shadow-md",
                                        "border transform transition-all duration-500",
                                        activeProject === project.id 
                                            ? "border-primary/50 ring-1 ring-primary/30 scale-[1.02] shadow-xl" 
                                            : "border-border/60 hover:border-primary/30 hover:scale-[1.01] hover:shadow-lg",
                                    )}
                                >
                                    {/* Background glow effect on hover */}
                                    <div 
                                        className={cn(
                                            "absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                                            "bg-gradient-radial from-primary/10 via-transparent to-transparent"
                                        )}
                                    />
                                    
                                    <div className="relative h-52 md:h-60 overflow-hidden">
                                        {/* Category badge */}
                                        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs bg-black/60 text-white backdrop-blur-md flex items-center border border-white/20">
                                            {getCategoryIcon(project.category)}
                                            <span className="ml-1.5 capitalize">{project.category}</span>
                                        </div>

                                        {/* Year badge */}
                                        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs bg-primary/50 text-white backdrop-blur-md border border-primary/30">
                                            {project.year}
                                        </div>
                                        
                                        {/* Image with hover effect */}
                                        <div className="w-full h-full overflow-hidden">
                                            <div 
                                                className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                                                style={{ backgroundImage: `url(${project.image})` }}
                                            />
                                            
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                            
                                            {/* Quick action button that appears on hover */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Button 
                                                    variant="default" 
                                                    size="sm" 
                                                    className="rounded-full bg-white text-black shadow-lg border-none hover:bg-white/90"
                                                    asChild
                                                >
                                                    <Link href={`/projects/${project.slug}`}>
                                                        Voir les détails
                                                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/* Title that appears at the bottom of the image */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{project.title}</h3>
                                            <p className="text-white/90 text-sm line-clamp-1 drop-shadow-md">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 flex-grow flex flex-col justify-between">
                                        <div className="space-y-4">
                                            {/* Description */}
                                            <p className="text-foreground/80 dark:text-muted-foreground text-sm line-clamp-3">{project.description}</p>
                                            
                                            {/* Technologies with visual indicator */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                                    <span 
                                                        key={tech} 
                                                        className={cn(
                                                            "text-xs px-2 py-0.5 rounded-full",
                                                            techIndex === 0
                                                                ? "bg-primary/20 text-primary font-medium" 
                                                                : "bg-primary/15 text-primary"
                                                        )}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <span className="text-xs bg-muted/90 text-foreground/70 px-2 py-0.5 rounded-full">
                                                        +{project.technologies.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Action buttons */}
                                        <div className="flex gap-2 mt-5 pt-4 border-t border-border/30">
                                            <Button 
                                                variant="secondary" 
                                                size="sm" 
                                                asChild
                                                className="rounded-full flex-1 justify-center shadow-sm"
                                            >
                                                <Link href={`/projects/${project.slug}`} className="flex items-center">
                                                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                                    Détails
                                                </Link>
                                            </Button>
                                            
                                            <div className="flex gap-2">
                                                {project.demoUrl && (
                                                    <Button 
                                                        variant="default" 
                                                        size="sm"
                                                        onClick={(e) => openDemo(project, e)}
                                                        className="rounded-full bg-primary/90 hover:bg-primary text-white shadow-sm"
                                                    >
                                                        <Play className="mr-1.5 h-3.5 w-3.5" />
                                                        Démo
                                                    </Button>
                                                )}
                                                
                                                {project.githubUrl && (
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        asChild
                                                        className="rounded-full border-border/50 hover:border-border/80 shadow-sm"
                                                    >
                                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        /* List View - Redesigné */
                        <motion.div 
                            ref={projectsGridRef}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { 
                                    opacity: 1,
                                    transition: { staggerChildren: 0.05 }
                                }
                            }}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {filteredAndSortedProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                    }}
                                    className={cn(
                                        "group rounded-xl relative overflow-hidden",
                                        "bg-card/90 backdrop-blur-md border",
                                        "transition-all duration-500 transform",
                                        activeProject === project.id 
                                            ? "border-primary/50 ring-1 ring-primary/30 scale-[1.01]" 
                                            : "border-border/60 hover:border-primary/30 hover:scale-[1.005]",
                                    )}
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Image container avec overlay d'informations au survol */}
                                        <div className="relative w-full md:w-72 h-60 md:h-auto overflow-hidden flex-shrink-0">
                                            {/* Category badge */}
                                            <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs bg-black/60 text-white backdrop-blur-md flex items-center border border-white/20">
                                                {getCategoryIcon(project.category)}
                                                <span className="ml-1.5 capitalize">{project.category}</span>
                                            </div>
                                            
                                            {/* Image */}
                                            <div 
                                                className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                                                style={{ backgroundImage: `url(${project.image})` }}
                                            >
                                                {/* Overlay gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                    {/* Contenu qui apparaît au survol */}
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        whileHover={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="mb-2"
                                                    >
                                                        <span className="text-xs text-white/90 bg-primary/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-primary/30">
                                                            {project.year}
                                                        </span>
                                                    </motion.div>
                                                    <motion.h4 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        whileHover={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.2, delay: 0.05 }}
                                                        className="text-xl font-semibold text-white"
                                                    >
                                                        {project.title}
                                                    </motion.h4>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                                            <div className="mb-4">
                                                <div className="flex items-center flex-wrap gap-2 mb-2">
                                                    <h3 className="text-xl font-semibold">{project.title}</h3>
                                                    
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-full">
                                                            {project.year}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-foreground/80 dark:text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>
                                                
                                                {/* Progress bar visuel représentant les technologies utilisées */}
                                                <div className="space-y-4 mb-6">
                                                    <h4 className="text-sm font-medium text-foreground/80">Technologies</h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {project.technologies.map((tech, techIndex) => (
                                                            <span 
                                                                key={tech} 
                                                                className={cn(
                                                                    "text-xs px-2 py-0.5 rounded-full",
                                                                    techIndex === 0 
                                                                        ? "bg-primary/20 text-primary font-medium" 
                                                                        : "bg-primary/15 text-primary"
                                                                )}
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="default" 
                                                        size="sm" 
                                                        asChild
                                                        className="rounded-full bg-primary/90 hover:bg-primary text-white shadow-sm hover:shadow-md transition-all duration-300"
                                                    >
                                                        <Link href={`/projects/${project.slug}`}>
                                                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                                            Voir les détails
                                                        </Link>
                                                    </Button>
                                                    
                                                    {project.demoUrl && (
                                                        <Button 
                                                            variant="secondary" 
                                                            size="sm" 
                                                            onClick={(e) => openDemo(project, e)}
                                                            className="rounded-full shadow-sm hover:shadow-md transition-shadow"
                                                        >
                                                            <Play className="mr-1.5 h-3.5 w-3.5" />
                                                            Démo live
                                                        </Button>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    {project.githubUrl && (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            asChild
                                                            className="rounded-full hover:bg-muted/70"
                                                        >
                                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                                <Github className="mr-1.5 h-4 w-4" />
                                                                Code source
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                    
                    {filteredAndSortedProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center bg-card/90 backdrop-blur-md rounded-xl p-14 border border-border/60 shadow-md"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/90 mb-6 shadow-inner">
                                <Search className="h-8 w-8 text-foreground/40 dark:text-muted-foreground/70" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-foreground dark:text-foreground/90">Aucun projet trouvé</h3>
                            <p className="text-foreground/70 dark:text-muted-foreground max-w-md mx-auto mb-6">
                                Aucun projet ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou votre requête.
                            </p>
                            <Button 
                                variant="outline" 
                                className="px-6 border-primary/30 hover:border-primary/50 hover:bg-primary/5 shadow-sm"
                                onClick={() => {
                                    setFilter('all');
                                    setSearchQuery('');
                                    setSortBy('newest');
                                }}
                            >
                                <Layers className="mr-2 h-4 w-4" />
                                Réinitialiser les filtres
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
            
            {/* Section finale avec CTA */}
            <div className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-grid-pattern opacity-[0.02] dark:opacity-[0.03] rotate-3" />
                    <motion.div 
                        className="absolute top-1/3 right-0 w-[40vw] h-[40vw] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
                        animate={{ 
                            y: [0, 30, 0],
                            x: [0, -20, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"
                        animate={{ 
                            y: [0, -40, 0],
                            x: [0, 30, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
                
                <div className={cn(SITE_CONTAINER, "relative")}>
                    <motion.div 
                        className="text-center max-w-3xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.span 
                            className="inline-block text-sm font-medium text-primary mb-4 px-3 py-1 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Et ce n'est pas tout !
                        </motion.span>
                        
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent">
                            Intéressé par une collaboration ?
                        </h2>
                        
                        <p className="text-lg text-foreground/70 dark:text-muted-foreground mb-10 max-w-2xl mx-auto">
                            Vous souhaitez en savoir plus sur mes compétences ou discuter d'un projet potentiel ? 
                            N'hésitez pas à me contacter pour échanger sur vos idées.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button 
                                size="lg" 
                                className="rounded-full px-7 shadow-lg shadow-primary/20 dark:shadow-primary/10"
                                asChild
                            >
                                <Link href="/contact">
                                    Me contacter
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="rounded-full px-7 border-primary/20 hover:bg-primary/5"
                                asChild
                            >
                                <Link href="/cv">
                                    Voir mon CV
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 