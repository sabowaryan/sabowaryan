import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { 
    Award, 
    Briefcase, 
    Calendar, 
    ChevronRight,
    Code2, 
    Download, 
    ExternalLink, 
    FileText, 
    GraduationCap, 
    Lightbulb, 
    Mail, 
    MapPin, 
    Sparkles, 
    User 
} from 'lucide-react';

type TabType = 'resume' | 'skills' | 'personal';

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    technologies?: string[];
    link?: string;
}

interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    period: string;
    description: string;
    achievements?: string[];
}

interface Skill {
    name: string;
    level: number; // 1-5
    category: 'frontend' | 'backend' | 'other';
}

const experiences: Experience[] = [
    {
        id: 'exp-1',
        title: 'Développeur Full Stack Senior',
        company: 'TechInnovate',
        location: 'Paris, France',
        period: '2020 - Présent',
        description: [
            'Développement d\'applications web avec React, TypeScript et Laravel',
            'Conception d\'architectures frontend modernes et performantes',
            'Mise en place de pipelines CI/CD et optimisation des performances',
            'Gestion d\'équipe et mentoring de développeurs juniors'
        ],
        technologies: ['React', 'TypeScript', 'Laravel', 'AWS', 'Docker', 'CI/CD'],
        link: 'https://techinnovate.fr'
    },
    {
        id: 'exp-2',
        title: 'Développeur Frontend',
        company: 'WebSolutions',
        location: 'Lyon, France',
        period: '2018 - 2020',
        description: [
            'Création d\'interfaces utilisateur réactives avec React et Vue.js',
            'Intégration d\'API RESTful et GraphQL',
            'Optimisation UX/UI et accessibilité',
            'Migration de projets legacy vers des frameworks modernes'
        ],
        technologies: ['React', 'Vue.js', 'GraphQL', 'SASS', 'Webpack'],
        link: 'https://websolutions.fr'
    },
    {
        id: 'exp-3',
        title: 'Développeur Web Junior',
        company: 'DigitalCraft',
        location: 'Bordeaux, France',
        period: '2016 - 2018',
        description: [
            'Développement de sites web responsives avec HTML, CSS et JavaScript',
            'Intégration CMS (WordPress, Drupal)',
            'Collaboration avec des designers pour l\'implémentation de maquettes',
            'Maintenance et amélioration de sites existants'
        ],
        technologies: ['JavaScript', 'HTML/CSS', 'WordPress', 'Drupal', 'PHP'],
        link: 'https://digitalcraft.fr'
    }
];

const education: Education[] = [
    {
        id: 'edu-1',
        degree: 'Master en Ingénierie Informatique',
        institution: 'École Supérieure d\'Informatique',
        location: 'Paris, France',
        period: '2015 - 2017',
        description: 'Spécialisation en développement web et applications mobiles.',
        achievements: [
            'Projet de fin d\'études sur l\'optimisation des performances dans les applications React',
            'Participation à des hackathons internationaux',
            'Membre de l\'association des étudiants en informatique'
        ]
    },
    {
        id: 'edu-2',
        degree: 'Licence en Informatique',
        institution: 'Université de Lyon',
        location: 'Lyon, France',
        period: '2012 - 2015',
        description: 'Formation généraliste en informatique',
        achievements: [
            'Focus sur les algorithmes, les structures de données et la programmation web',
            'Projets en équipe sur des applications mobiles',
            'Stage de fin d\'études dans une startup lyonnaise'
        ]
    }
];

const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 5, category: 'frontend' },
    { name: 'TypeScript', level: 4, category: 'frontend' },
    { name: 'Vue.js', level: 4, category: 'frontend' },
    { name: 'HTML/CSS', level: 5, category: 'frontend' },
    { name: 'Tailwind CSS', level: 5, category: 'frontend' },
    { name: 'Next.js', level: 4, category: 'frontend' },
    { name: 'GraphQL', level: 3, category: 'frontend' },
    { name: 'GSAP', level: 3, category: 'frontend' },
    
    // Backend
    { name: 'Laravel', level: 5, category: 'backend' },
    { name: 'Node.js', level: 4, category: 'backend' },
    { name: 'PHP', level: 4, category: 'backend' },
    { name: 'SQL', level: 4, category: 'backend' },
    { name: 'MongoDB', level: 3, category: 'backend' },
    { name: 'Express', level: 4, category: 'backend' },
    { name: 'Docker', level: 3, category: 'backend' },
    { name: 'AWS', level: 3, category: 'backend' },
    
    // Other
    { name: 'Git', level: 5, category: 'other' },
    { name: 'UI/UX Design', level: 4, category: 'other' },
    { name: 'Agile/Scrum', level: 4, category: 'other' },
    { name: 'CI/CD', level: 3, category: 'other' },
    { name: 'Testing', level: 4, category: 'other' },
    { name: 'Responsive Design', level: 5, category: 'other' }
];

export function About() {
    const [activeTab, setActiveTab] = useState<TabType>('personal');
    const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);
    const [hoveredEducation, setHoveredEducation] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<'frontend' | 'backend' | 'other'>('frontend');
    const [resumeTab, setResumeTab] = useState<'experience' | 'education'>('experience');
    const tabsRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    
    // Animation pour le déplacement de l'indicateur sous les onglets
    useEffect(() => {
        if (tabsRef.current) {
            const activeEl = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`);
            if (activeEl) {
                const { offsetLeft, offsetWidth } = activeEl as HTMLElement;
                setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
            }
        }
    }, [activeTab]);

    // Rendu dynamique des barres de compétences
    const renderSkillBar = (level: number, hovered: boolean) => {
        return (
            <div className="h-2.5 bg-muted/50 rounded-full w-full overflow-hidden backdrop-blur-sm relative">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level * 20}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                        "h-full rounded-full relative z-10",
                        hovered ? "bg-gradient-to-r from-primary via-primary/80 to-primary/60" : "bg-gradient-to-r from-primary/80 to-primary/60"
                    )}
                />
                {hovered && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-md"
                    />
                )}
            </div>
        );
    };

    // Ajout des styles personnalisés de scrollbar en CSS
    const scrollbarStyles = `
        .scrollbar-thin::-webkit-scrollbar {
            width: 4px;
        }
        
        .scrollbar-thumb-primary\\/40::-webkit-scrollbar-thumb {
            background-color: rgba(var(--color-primary), 0.4);
            border-radius: 9999px;
        }
        
        .scrollbar-thumb-primary\\/60::-webkit-scrollbar-thumb {
            background-color: rgba(var(--color-primary), 0.6);
        }
        
        .scrollbar-thumb-primary\\/30::-webkit-scrollbar-thumb {
            background-color: rgba(var(--color-primary), 0.3);
        }
        
        .scrollbar-thumb-primary\\/50::-webkit-scrollbar-thumb {
            background-color: rgba(var(--color-primary), 0.5);
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
            background-color: transparent;
        }
        
        .scrollbar-thumb-rounded-full::-webkit-scrollbar-thumb {
            border-radius: 9999px;
        }
        
        /* Effet de glow sur hover */
        .hover\\:scrollbar-thumb-primary\\/60:hover::-webkit-scrollbar-thumb {
            background-color: rgba(var(--color-primary), 0.6);
            box-shadow: 0 0 6px rgba(var(--color-primary), 0.3);
        }
        
        .dark .dark\\:hover\\:scrollbar-thumb-primary\\/50:hover::-webkit-scrollbar-thumb {
            background-color: rgba(var(--color-primary), 0.5);
            box-shadow: 0 0 6px rgba(var(--color-primary), 0.3);
        }
        
        /* Masquer la scrollbar quand on ne défile pas, mais garder la fonctionnalité */
        .scrollbar-thin {
            scrollbar-width: thin;
        }
        
        .scrollbar-thin:not(:hover)::-webkit-scrollbar-thumb {
            opacity: 0.5;
        }
        
        /* Animation de transition */
        .transition-colors {
            transition-property: background-color, box-shadow, opacity;
            transition-duration: 150ms;
        }
        
        /* Effet de scroll doux */
        .scroll-smooth {
            scroll-behavior: smooth;
        }
    `;
    
    // Injecter les styles une fois au chargement du composant
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = scrollbarStyles;
        document.head.appendChild(styleElement);
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // Fonction pour télécharger le CV
    const handleDownloadCV = () => {
        // Création d'un lien vers le CV
        const link = document.createElement('a');
        link.href = '/downloads/cv-ryan-sabowa.pdf';
        link.setAttribute('download', 'cv-ryan-sabowa.pdf');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="relative py-16 sm:py-20 overflow-hidden">
            {/* Fond décoratif avec effets avancés */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[5%] -right-[5%] w-[50%] h-[40%] bg-primary/3 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/3 rounded-full blur-[100px]" />
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/1 rounded-full blur-[120px]"
                    animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.03, 0.05, 0.03] 
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                />
                {/* Grille subtile pour ajout de texture */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.02] light:opacity-[0.05]" />
                {/* Particules flottantes subtiles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-primary/20 dark:bg-primary/20 light:bg-primary/30"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 30 - 15],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>
            
            <div className={SITE_CONTAINER}>
                {/* En-tête de section avec animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-block text-sm font-medium text-primary mb-3 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full shadow-sm border border-primary/20"
                    >
                        Découvrez mon parcours
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        À Propos de Moi
                    </h2>
                    <p className="text-foreground/90 dark:text-muted-foreground max-w-2xl mx-auto font-medium dark:font-normal">
                        Développeur passionné avec plusieurs années d'expérience dans la création d'applications web 
                        performantes et d'interfaces utilisateur modernes.
                    </p>
                </motion.div>

                {/* Carte principale avec effet 3D et glassmorphisme */}
                    <motion.div
                    className="max-w-5xl mx-auto bg-card/80 backdrop-blur-md border border-border/30 dark:border-border/30 light:border-border/50 rounded-2xl shadow-xl overflow-hidden mb-10 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:z-0"
                    initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.1), 0 0 20px rgba(var(--color-primary), 0.05)", y: -5 }}
                >
                    {/* Points décoratifs */}
                    <div className="absolute top-3 left-4 flex space-x-1.5 z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px] relative z-10">
                        {/* Photo et information personnelle (toujours visible) */}
                        <div className="md:col-span-5 lg:col-span-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 relative overflow-hidden border-r border-border/20 dark:border-border/20 light:border-border/40">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                            
                            {/* Photo de profil avec effet de survol */}
                            <div className="relative mb-6 sm:mb-8 mx-auto max-w-[220px]">
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl transform -rotate-6 scale-105"
                                    animate={{ 
                                        rotate: ['-6deg', '2deg', '-6deg'],
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div 
                                    className="relative overflow-hidden rounded-full border-2 border-primary/30 aspect-square shadow-lg"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img 
                                        src="/images/profile.jpg" 
                                        alt="Sabowa Ryan" 
                                        className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                                        loading="lazy"
                                    />
                                    {/* Overlay au survol */}
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </motion.div>
                                
                                <motion.div 
                                    className="absolute -right-3 -bottom-3 bg-gradient-to-br from-primary to-primary/80 text-white p-3 rounded-full shadow-lg border border-white/10"
                                    animate={{ rotate: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Sparkles className="h-5 w-5" />
                                </motion.div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                                Sabowa Ryan
                            </h3>
                            
                            {/* Informations personnelles avec effet glassmorphique */}
                            <div className="space-y-4 relative bg-card/40 dark:bg-card/40 light:bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-inner">
                                        <div className="flex items-center">
                                    <div className="p-2 bg-primary/10 dark:bg-primary/10 light:bg-primary/15 rounded-full mr-3 flex-shrink-0 backdrop-blur-sm border border-primary/20 shadow-sm">
                                        <Briefcase className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                        <p className="text-sm font-medium text-foreground">Développeur Full Stack</p>
                                        <p className="text-xs font-medium dark:text-muted-foreground light:text-foreground/90 dark:font-normal">6+ années d'expérience</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                    <div className="p-2 bg-primary/10 dark:bg-primary/10 light:bg-primary/15 rounded-full mr-3 flex-shrink-0 backdrop-blur-sm border border-primary/20 shadow-sm">
                                        <MapPin className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                        <p className="text-sm font-medium text-foreground">Localisation</p>
                                        <p className="text-xs font-medium dark:text-muted-foreground light:text-foreground/90 dark:font-normal">Paris, France</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                    <div className="p-2 bg-primary/10 dark:bg-primary/10 light:bg-primary/15 rounded-full mr-3 flex-shrink-0 backdrop-blur-sm border border-primary/20 shadow-sm">
                                                <Mail className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                        <p className="text-sm font-medium text-foreground">Email</p>
                                                <a 
                                                    href="mailto:contact@sabowaryan.dev"
                                            className="text-xs font-medium dark:text-muted-foreground light:text-foreground/90 dark:font-normal hover:text-primary transition-colors"
                                                >
                                                    contact@sabowaryan.dev
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                    <div className="p-2 bg-primary/10 dark:bg-primary/10 light:bg-primary/15 rounded-full mr-3 flex-shrink-0 backdrop-blur-sm border border-primary/20 shadow-sm">
                                        <Calendar className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                        <p className="text-sm font-medium text-foreground">Disponibilité</p>
                                        <p className="text-xs font-medium dark:text-muted-foreground light:text-foreground/90 dark:font-normal">Projets freelance & contrats</p>
                                    </div>
                                            </div>
                                        </div>
                                    
                            {/* Bouton télécharger CV avec animation et effet néon */}
                            <div className="mt-8">
                                    <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Button 
                                        className="w-full group relative overflow-hidden rounded-xl h-11 shadow-md border border-primary/30 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm text-foreground dark:text-foreground light:text-foreground/90 font-medium" 
                                        aria-label="Télécharger mon CV complet"
                                        onClick={handleDownloadCV}
                                    >
                                        <span className="relative z-10 flex items-center text-sm">
                                            <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                            Télécharger CV
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
                                    </Button>
                                </motion.div>
                            </div>
                                            </div>
                        
                        {/* Contenu des onglets */}
                        <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 relative">
                            {/* Système d'onglets innovant avec effet glassmorphique */}
                            <div className="relative mb-8">
                                <div className="flex justify-between border-b border-border/30 dark:border-border/30 light:border-border/50 bg-card/30 dark:bg-card/30 light:bg-card/50 backdrop-blur-sm rounded-t-lg px-2" ref={tabsRef}>
                                    {['personal', 'resume', 'skills'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab as TabType)}
                                            data-tab={tab}
                                            data-active={activeTab === tab}
                                            className={cn(
                                                "relative px-4 py-3 text-sm font-medium transition-colors",
                                                activeTab === tab 
                                                    ? "text-primary" 
                                                    : "dark:text-muted-foreground light:text-foreground/80 hover:text-foreground"
                                            )}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {tab === 'personal' && <User className="h-4 w-4" />}
                                                {tab === 'resume' && <Briefcase className="h-4 w-4" />}
                                                {tab === 'skills' && <Code2 className="h-4 w-4" />}
                                                <span>
                                                    {tab === 'personal' && 'À Propos'}
                                                    {tab === 'resume' && 'Parcours'}
                                                    {tab === 'skills' && 'Compétences'}
                                                </span>
                                            </div>
                                            
                                            {/* Effet de brillance au survol */}
                                            <motion.span 
                                                className="absolute inset-0 bg-primary/5 opacity-0 rounded-t-lg"
                                                whileHover={{ opacity: activeTab !== tab ? 1 : 0 }}
                                            />
                                        </button>
                                    ))}
                                    
                                    {/* Indicateur animé avec glow effect */}
                                    <motion.div
                                        className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary/80 via-primary to-primary/80"
                                        style={{ filter: 'drop-shadow(0 0 2px var(--color-primary))' }}
                                        animate={{ 
                                            left: indicatorStyle.left, 
                                            width: indicatorStyle.width 
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    />
                                </div>
                            </div>
                            
                            {/* Contenu dynamique des onglets avec transitions */}
                            <div className="min-h-[350px]">
                                <AnimatePresence mode="wait">
                                    {/* 1. Onglet À Propos */}
                                    {activeTab === 'personal' && (
                                        <motion.div
                                            key="personal"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2 text-foreground">Mon Approche</h3>
                                                    <p className="text-sm text-foreground/80 dark:text-muted-foreground light:text-foreground/80 leading-relaxed">
                                                        Passionné par le développement web et les interfaces utilisateur modernes, 
                                                        je combine créativité et expertise technique pour créer des expériences 
                                                        numériques innovantes et performantes. Mon approche est centrée sur l'utilisateur, 
                                                        avec une attention particulière à l'accessibilité et aux performances.
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2 text-foreground">Ce Qui Me Motive</h3>
                                                    <p className="text-sm text-foreground/80 dark:text-muted-foreground light:text-foreground/80 leading-relaxed">
                                                        Je suis constamment motivé par les défis techniques et la possibilité de créer 
                                                        des solutions qui améliorent l'expérience utilisateur. L'innovation technologique, 
                                                        l'optimisation des performances et le travail en équipe sur des projets ambitieux 
                                                        sont ce qui me donne le plus de satisfaction dans mon métier.
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2 text-foreground">Mes Valeurs</h3>
                                                    <ul className="space-y-2">
                                                        {[
                                                            "Qualité et excellence technique",
                                                            "Collaboration et partage de connaissances",
                                                            "Apprentissage continu et veille technologique",
                                                            "Communication transparente et efficace",
                                                            "Approche centrée sur l'utilisateur"
                                                        ].map((value, index) => (
                                                            <motion.li 
                                                                key={index}
                                                                initial={{ opacity: 0, x: -5 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                                                className="flex items-start text-sm text-foreground/80 dark:text-muted-foreground light:text-foreground/80"
                                                            >
                                                                <ChevronRight className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                                                {value}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                        </div>
                    </motion.div>
                                    )}
                    
                                    {/* 2. Onglet Parcours */}
                                    {activeTab === 'resume' && (
                    <motion.div
                                            key="resume"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <div className="flex space-x-4 mb-6">
                                                <button 
                                                    onClick={() => setResumeTab('experience')}
                                                    data-active={resumeTab === 'experience'}
                                                    className={cn(
                                                        "px-3 py-1.5 text-xs font-medium rounded-full",
                                                        "border border-border/50 transition-colors shadow-sm",
                                                        resumeTab === 'experience' 
                                                            ? "bg-primary/10 dark:bg-primary/10 light:bg-primary/15 text-primary border-primary/30" 
                                                            : "bg-transparent dark:text-muted-foreground light:text-foreground/80 hover:bg-muted/50"
                                                    )}
                                                >
                                                    Expérience
                                                </button>
                                                <button 
                                                    onClick={() => setResumeTab('education')}
                                                    data-active={resumeTab === 'education'}
                                                    className={cn(
                                                        "px-3 py-1.5 text-xs font-medium rounded-full",
                                                        "border border-border/50 transition-colors shadow-sm",
                                                        resumeTab === 'education' 
                                                            ? "bg-primary/10 dark:bg-primary/10 light:bg-primary/15 text-primary border-primary/30" 
                                                            : "bg-transparent dark:text-muted-foreground light:text-foreground/80 hover:bg-muted/50"
                                                    )}
                                                >
                                                    Formation
                                                </button>
                            </div>
                            
                                            <div className="space-y-6 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent hover:scrollbar-thumb-primary/60 dark:scrollbar-thumb-primary/30 dark:hover:scrollbar-thumb-primary/50 scrollbar-thumb-rounded-full transition-colors duration-150 scroll-smooth">
                                                <AnimatePresence mode="wait">
                                                    {resumeTab === 'experience' && (
                                                        <motion.div
                                                            key="experience-content"
                                                            initial={{ opacity: 0, x: -5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 5 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                {experiences.map((experience, index) => (
                                    <motion.div
                                        key={experience.id}
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                        onMouseEnter={() => setHoveredExperience(experience.id)}
                                        onMouseLeave={() => setHoveredExperience(null)}
                                        className={cn(
                                                                        "relative pl-6 rounded-lg transition-all duration-200 mb-6 last:mb-0",
                                                                        hoveredExperience === experience.id ? "bg-primary/5" : ""
                                        )}
                                    >
                                        <motion.div 
                                                                        className={cn(
                                                                            "absolute -left-1 top-1 w-3 h-3 rounded-full flex items-center justify-center",
                                                                            hoveredExperience === experience.id ? "bg-primary/30" : "bg-primary/20" 
                                                                        )}
                                            animate={{
                                                scale: hoveredExperience === experience.id ? 1.2 : 1
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                                                        <div className={cn(
                                                                            "w-1.5 h-1.5 rounded-full",
                                                                            hoveredExperience === experience.id ? "bg-primary" : "bg-primary/80"
                                                                        )} />
                                        </motion.div>
                                        
                                                                    <div className="mb-2">
                                                                        <div className="flex items-start justify-between">
                                                                            <h4 className="text-base font-semibold text-foreground">{experience.title}</h4>
                                                {experience.link && (
                                                    <a 
                                                        href={experience.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                                                    className="text-foreground/70 hover:text-primary transition-colors"
                                                    >
                                                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                                                        <div className="text-sm text-foreground/90 dark:text-muted-foreground flex flex-wrap items-center mb-1">
                                                                            <span className="font-medium text-primary/90">{experience.company}</span>
                                                                            <span className="mx-2 text-foreground/80">•</span>
                                                                            <span className="flex items-center text-xs font-medium text-foreground/90 dark:text-muted-foreground">
                                                                                <MapPin className="inline h-3 w-3 mr-1 text-primary/80" />
                                                    {experience.location}
                                                </span>
                                                                            <span className="mx-2 text-foreground/80">•</span>
                                                                            <span className="flex items-center text-xs font-medium text-foreground/90 dark:text-muted-foreground">
                                                                                <Calendar className="inline h-3 w-3 mr-1 text-primary/80" />
                                                    {experience.period}
                                                </span>
                                            </div>
                                        </div>
                                        
                                                                    <ul className="space-y-1 mb-2">
                                            {experience.description.map((item, i) => (
                                                <motion.li 
                                                    key={i} 
                                                                                className="flex items-start text-xs text-foreground/80 dark:text-muted-foreground light:text-foreground/80"
                                                                                initial={{ opacity: 0, x: -5 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                                                                            >
                                                                                <span className="inline-block w-1 h-1 rounded-full bg-primary/70 mt-1.5 mr-1.5 flex-shrink-0" />
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>
                                        
                                        {experience.technologies && (
                                                                        <div className="flex flex-wrap gap-1 py-1">
                                                {experience.technologies.map(tech => (
                                                    <span 
                                                        key={tech} 
                                                                                    className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                                        </motion.div>
                                                    )}
                                                    
                                                    {resumeTab === 'education' && (
                                                        <motion.div
                                                            key="education-content"
                                                            initial={{ opacity: 0, x: -5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 5 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={edu.id}
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                                                    onMouseEnter={() => setHoveredEducation(edu.id)}
                                                                    onMouseLeave={() => setHoveredEducation(null)}
                                                                    className={cn(
                                                                        "relative pl-6 rounded-lg transition-all duration-200 mb-6 last:mb-0",
                                                                        hoveredEducation === edu.id ? "bg-primary/5" : ""
                                                                    )}
                                                                >
                                                                    <motion.div 
                                                                        className={cn(
                                                                            "absolute -left-1 top-1 w-3 h-3 rounded-full flex items-center justify-center",
                                                                            hoveredEducation === edu.id ? "bg-primary/30" : "bg-primary/20" 
                                                                        )}
                                                                        animate={{
                                                                            scale: hoveredEducation === edu.id ? 1.2 : 1
                                                                        }}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        <div className={cn(
                                                                            "w-1.5 h-1.5 rounded-full",
                                                                            hoveredEducation === edu.id ? "bg-primary" : "bg-primary/80"
                                                                        )} />
                                                                    </motion.div>
                                        
                                        <div className="mb-3">
                                                                        <h4 className="text-base font-semibold text-foreground flex items-center flex-wrap gap-y-1 mb-1">
                                                {edu.degree}
                                                <span className="ml-2 inline-flex">
                                                    <Award className="h-4 w-4 text-primary" />
                                                </span>
                                            </h4>
                                                                        <div className="text-sm text-foreground/90 dark:text-muted-foreground flex flex-wrap items-center mb-1">
                                                                            <span className="font-medium text-primary/90">{edu.institution}</span>
                                                                            <span className="mx-2 text-foreground/80">•</span>
                                                                            <span className="flex items-center text-xs font-medium text-foreground/90 dark:text-muted-foreground">
                                                                                <MapPin className="inline h-3 w-3 mr-1 text-primary/80" />
                                                    {edu.location}
                                                </span>
                                                                            <span className="mx-2 text-foreground/80">•</span>
                                                                            <span className="flex items-center text-xs font-medium text-foreground/90 dark:text-muted-foreground">
                                                                                <Calendar className="inline h-3 w-3 mr-1 text-primary/80" />
                                                    {edu.period}
                                                </span>
                                            </div>
                                        </div>
                                        
                                                                    <p className="text-xs text-foreground/80 dark:text-muted-foreground light:text-foreground/80 mb-3">
                                            {edu.description}
                                        </p>
                                        
                                        {edu.achievements && (
                                            <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                                                                            <h5 className="text-xs font-medium mb-2 flex items-center text-foreground">
                                                                                <Award className="h-3.5 w-3.5 mr-1.5 text-primary" />
                                                    Réalisations
                                                </h5>
                                                                            <ul className="space-y-1.5">
                                                    {edu.achievements.map((item, i) => (
                                                        <motion.li 
                                                            key={i} 
                                                                                        className="flex items-start text-xs text-foreground/80 dark:text-muted-foreground light:text-foreground/80"
                                                            initial={{ opacity: 0, x: -5 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        transition={{ delay: 0.2 + (i * 0.05), duration: 0.3 }}
                                                        >
                                                                                        <span className="inline-block w-1 h-1 rounded-full bg-primary/70 mt-1.5 mr-1.5 flex-shrink-0" />
                                                            {item}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                    
                                    {/* 3. Onglet Compétences */}
                                    {activeTab === 'skills' && (
                                        <motion.div
                                            key="skills"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <div className="flex space-x-4 mb-6">
                                                {(['frontend', 'backend', 'other'] as const).map((category) => (
                                                    <button 
                                                        key={category}
                                                        onClick={() => setActiveCategory(category)}
                                                        data-active={activeCategory === category}
                                                        className={cn(
                                                            "px-3 py-1.5 text-xs font-medium rounded-full",
                                                            "border border-border/50 transition-colors shadow-sm",
                                                            activeCategory === category 
                                                                ? "bg-primary/10 dark:bg-primary/10 light:bg-primary/15 text-primary border-primary/30" 
                                                                : "bg-transparent dark:text-muted-foreground light:text-foreground/80 hover:bg-muted/50"
                                                        )}
                                                    >
                                                        {category === 'frontend' && 'Frontend'}
                                                        {category === 'backend' && 'Backend'}
                                                        {category === 'other' && 'Autres'}
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent hover:scrollbar-thumb-primary/60 dark:scrollbar-thumb-primary/30 dark:hover:scrollbar-thumb-primary/50 scrollbar-thumb-rounded-full transition-colors duration-150 scroll-smooth">
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={activeCategory}
                                                        initial={{ opacity: 0, x: -5 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 5 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="grid grid-cols-1 gap-5">
                                                            {skills
                                                                .filter(skill => skill.category === activeCategory)
                                                                .map((skill, index) => (
                                                                    <motion.div 
                                                                        key={skill.name}
                                                                        initial={{ opacity: 0, y: 5 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                                                        onMouseLeave={() => setHoveredSkill(null)}
                                                                        className="space-y-1.5 group"
                                                                    >
                                                                        <div className="flex justify-between items-center">
                                                                            <div className="flex items-center">
                                                                                <span className={cn(
                                                                                    "w-2 h-2 rounded-full mr-2",
                                                                                    hoveredSkill === skill.name ? "bg-primary" : "bg-primary/60"
                                                                                )} />
                                                                                <span className="font-medium text-sm text-foreground">{skill.name}</span>
                                                                            </div>
                                                                            <span className={cn(
                                                                                "text-xs",
                                                                                hoveredSkill === skill.name 
                                                                                    ? "text-primary font-medium" 
                                                                                    : "dark:text-muted-foreground light:text-foreground/90 font-medium dark:font-normal"
                                                                            )}>
                                                                                {skill.level * 20}%
                                                                            </span>
                                                                        </div>
                                                                        {renderSkillBar(skill.level, hoveredSkill === skill.name)}
                                                                    </motion.div>
                                                                ))
                                                            }
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            </div>
                        </div>
                    </motion.div>
            </div>
        </section>
    );
} 