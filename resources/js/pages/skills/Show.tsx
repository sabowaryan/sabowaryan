import { Head } from '@inertiajs/react';
import  GuestLayout  from '@/layouts/guest-layout';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { cn } from '@/lib/utils';
import { Code2, Cpu, Palette, Smartphone, Zap, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

// Les données des compétences - dans un projet réel, elles viendraient d'une API ou d'une base de données
const skillsData = {
    'design-creatif': {
        id: 'design',
        title: 'Design Créatif',
        description: "Interfaces modernes et épurées avec une attention particulière aux détails et à l'expérience utilisateur",
        icon: Palette,
        color: 'from-pink-500 to-rose-600',
        darkColor: 'from-pink-400 to-rose-500',
        longDescription: `
            Je combine principes de design et créativité pour concevoir des interfaces qui ne sont pas seulement
            esthétiquement plaisantes, mais également intuitives et fonctionnelles. Mon approche est centrée sur l'utilisateur,
            en veillant à ce que chaque élément ait un objectif précis et contribue à une expérience cohérente.
        `,
        keyFeatures: [
            'Prototypage et maquettes UI/UX',
            'Design systems cohérents',
            'Animations subtiles et significatives',
            'Accessibilité et inclusivité',
            'Guides de style et documentation',
            'Tests utilisateurs et itérations',
            'Design responsive et adaptatif',
            'Optimisation des interfaces pour les performances'
        ],
        tools: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Photoshop', 'Illustrator'],
        experience: [
            {
                title: 'Refonte complète de l\'interface utilisateur',
                description: 'Création d\'un design system complet pour unifier l\'expérience utilisateur à travers toutes les plateformes',
                client: 'E-commerce national'
            },
            {
                title: 'Conception d\'applications mobiles natives',
                description: 'Design d\'interfaces respectant les guidelines iOS et Android tout en maintenant une identité visuelle cohérente',
                client: 'Startup fintech'
            }
        ]
    },
    'performance-optimale': {
        id: 'performance',
        title: 'Performance Optimale',
        description: 'Applications rapides et réactives grâce à des optimisations poussées et des best practices',
        icon: Zap,
        color: 'from-amber-500 to-orange-600',
        darkColor: 'from-amber-400 to-orange-500',
        longDescription: `
            La performance est un aspect crucial de l'expérience utilisateur. Je m'assure que les applications
            que je développe sont optimisées pour être rapides et réactives, même sur des connexions lentes ou
            des appareils moins puissants. Cela implique des optimisations tant au niveau du frontend que du backend.
        `,
        keyFeatures: [
            'Optimisation des assets et du bundle',
            'Rendu côté serveur (SSR)',
            'Mise en cache stratégique',
            'Lazy loading et code splitting',
            'Compression et minification des ressources',
            'Optimisation des requêtes base de données',
            'Monitoring et analyse des performances',
            'Progressive Web Apps (PWA)'
        ],
        tools: ['Webpack', 'Vite', 'Lighthouse', 'WebPageTest', 'Chrome DevTools', 'Redis', 'Memcached'],
        experience: [
            {
                title: 'Optimisation de plateforme e-commerce',
                description: 'Amélioration des temps de chargement de 67% et du taux de conversion de 23%',
                client: 'Boutique en ligne nationale'
            },
            {
                title: 'Refactorisation d\'application critique',
                description: 'Réduction de la consommation mémoire de 40% et amélioration des temps de réponse de 35%',
                client: 'Institution financière'
            }
        ]
    },
    'fullstack-development': {
        id: 'fullstack',
        title: 'Full Stack',
        description: 'Expertise complète du frontend au backend, pour des solutions bout en bout cohérentes',
        icon: Code2,
        color: 'from-blue-500 to-indigo-600',
        darkColor: 'from-blue-400 to-indigo-500',
        longDescription: `
            Mon expertise full stack me permet de développer des applications complètes, du frontend 
            au backend, en passant par les bases de données et l'infrastructure. Cette vision globale
            assure une cohérence technique et une meilleure communication entre les différentes parties
            du système.
        `,
        keyFeatures: [
            'Frontend: React, Vue, Angular',
            'Backend: Laravel, Node.js, Django',
            'APIs RESTful et GraphQL',
            'Bases de données SQL et NoSQL',
            'Architecture microservices',
            'Sécurité et authentification',
            'Intégration de services tiers',
            'Déploiement et DevOps'
        ],
        tools: ['React', 'Vue.js', 'Laravel', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
        experience: [
            {
                title: 'Plateforme SaaS complète',
                description: 'Conception et développement d\'une solution clé en main avec tableau de bord, API et système de paiement',
                client: 'Startup en croissance'
            },
            {
                title: 'Application de gestion interne',
                description: 'Développement d\'un système complet de gestion des ressources et de suivi des projets',
                client: 'Agence de communication'
            }
        ]
    },
    'architecture-moderne': {
        id: 'architecture',
        title: 'Architecture Moderne',
        description: 'Utilisation des dernières technologies et patterns pour une base de code maintenable',
        icon: Cpu,
        color: 'from-emerald-500 to-teal-600',
        darkColor: 'from-emerald-400 to-teal-500',
        longDescription: `
            Une bonne architecture est la fondation d'une application évolutive et maintenable. Je conçois des
            systèmes qui peuvent s'adapter aux changements, faciles à comprendre et à faire évoluer. Mon approche
            s'appuie sur des principes de clean code, des patterns éprouvés et les meilleures pratiques du secteur.
        `,
        keyFeatures: [
            'Architectures micro-frontend',
            'Clean code et principes SOLID',
            'CI/CD et tests automatisés',
            'Conteneurisation avec Docker',
            'Architecture hexagonale / en oignon',
            'Domain-Driven Design (DDD)',
            'Infrastructure as Code (IaC)',
            'Systèmes event-driven'
        ],
        tools: ['Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'Terraform', 'Jest', 'Cypress', 'SonarQube'],
        experience: [
            {
                title: 'Refonte d\'architecture monolithique',
                description: 'Migration vers une architecture microservices avec déploiement continu',
                client: 'Plateforme logistique nationale'
            },
            {
                title: 'Mise en place d\'infrastructure cloud',
                description: 'Déploiement d\'une architecture scalable, résiliente et sécurisée sur AWS',
                client: 'Entreprise de médias digitaux'
            }
        ]
    },
    'responsive-design': {
        id: 'responsive',
        title: 'Responsive Design',
        description: 'Expérience fluide sur tous les appareils grâce à une approche mobile-first',
        icon: Smartphone,
        color: 'from-violet-500 to-purple-600',
        darkColor: 'from-violet-400 to-purple-500',
        longDescription: `
            Avec la diversité des appareils utilisés aujourd'hui, un design responsive est essentiel. 
            J'adopte une approche mobile-first pour créer des interfaces qui s'adaptent parfaitement 
            à toutes les tailles d'écran, des smartphones aux grands moniteurs, tout en conservant 
            une expérience utilisateur optimale.
        `,
        keyFeatures: [
            'Approche mobile-first',
            'Design adaptatif multi-écrans',
            'Interfaces progressives',
            'Tests sur différents appareils',
            'Optimisation des images et médias',
            'Breakpoints stratégiques',
            'Grilles flexibles et fluides',
            'Performance sur réseaux mobiles'
        ],
        tools: ['CSS Grid', 'Flexbox', 'Tailwind CSS', 'Bootstrap', 'SASS/SCSS', 'BrowserStack', 'Responsive Viewer'],
        experience: [
            {
                title: 'Refonte responsive complète',
                description: 'Transformation d\'un site desktop en une expérience complètement responsive et mobile-friendly',
                client: 'Magazine en ligne'
            },
            {
                title: 'Dashboard analytique multi-device',
                description: 'Conception d\'une interface de visualisation de données adaptée à tous les formats d\'écran',
                client: 'Entreprise data analytics'
            }
        ]
    }
};

// Composant pour une page de compétence spécifique
export default function SkillPage({ slug }: { slug: string }) {
    // Récupérer les données de la compétence basée sur le slug
    const skill = skillsData[slug as keyof typeof skillsData];
    
    // Si la compétence n'existe pas, afficher un message d'erreur
    if (!skill) {
        return (
            <GuestLayout>
                <Head title="Compétence non trouvée" />
                <div className={cn(SITE_CONTAINER, "py-20 text-center")}>
                    <h1 className="text-2xl font-bold mb-4">Compétence non trouvée</h1>
                    <p className="mb-8 text-foreground/70">La compétence que vous recherchez n'existe pas ou a été déplacée.</p>
                    <Button asChild>
                        <Link href="/skills">Voir toutes les compétences</Link>
                    </Button>
                </div>
            </GuestLayout>
        );
    }
    
    // Déterminer l'icône à afficher
    const IconComponent = skill.icon;

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };
    
    const slideIn = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };
    
    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };
    
    return (
        <GuestLayout>
            <Head title={`${skill.title} | Compétences`} />
            
            <div className="relative overflow-hidden py-12 md:py-16 lg:py-24">
                {/* Formes décoratives de fond améliorées */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className={cn(
                            "absolute top-0 right-0 w-[50%] sm:w-[70%] h-[40%] sm:h-[60%] rounded-full blur-3xl", 
                            `bg-gradient-to-br ${skill.color} dark:${skill.darkColor}`
                        )} 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className={cn(
                            "absolute bottom-0 left-0 w-[40%] sm:w-[50%] h-[30%] sm:h-[40%] rounded-full blur-3xl", 
                            `bg-gradient-to-tr ${skill.color} dark:${skill.darkColor}`
                        )} 
                    />
                    <motion.div 
                        animate={{ 
                            opacity: [0.05, 0.1, 0.05],
                            scale: [1, 1.05, 1] 
                        }}
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            repeatType: 'reverse' 
                        }}
                        className={cn(
                            "absolute top-1/3 left-1/4 w-[25%] sm:w-[30%] h-[25%] sm:h-[30%] rounded-full blur-3xl", 
                            `bg-gradient-to-r ${skill.color} dark:${skill.darkColor}`
                        )}
                    />
                </div>
                
                <div className={cn(SITE_CONTAINER, "px-4 sm:px-6 md:px-8")}>
                    {/* Navbar avec breadcrumbs */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-3"
                    >
                        <nav aria-label="Fil d'Ariane" className="w-full sm:w-auto">
                            <ol className="flex items-center flex-wrap space-x-2 text-sm">
                                <li>
                                    <Link 
                                        href="/" 
                                        className="text-foreground/60 hover:text-primary transition-colors"
                                    >
                                        Accueil
                                    </Link>
                                </li>
                                <li className="text-foreground/40">/</li>
                                <li>
                                    <Link 
                                        href="/skills" 
                                        className="text-foreground/60 hover:text-primary transition-colors"
                                    >
                                        Compétences
                                    </Link>
                                </li>
                                <li className="text-foreground/40">/</li>
                                <li className="text-foreground/90 font-medium truncate max-w-[150px] sm:max-w-none">{skill.title}</li>
                            </ol>
                        </nav>
                        
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="group flex items-center space-x-1 text-foreground/70 hover:text-foreground mt-2 sm:mt-0 w-full sm:w-auto justify-center"
                            asChild
                        >
                            <Link href="/skills">
                                <ArrowLeft className="h-4 w-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
                                <span>Retour aux compétences</span>
                            </Link>
                        </Button>
                    </motion.div>
                    
                    {/* En-tête de la page */}
                    <motion.div 
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-20"
                    >
                        {/* Icône animée */}
                        <div className="mb-4 md:mb-0 relative flex-shrink-0">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    opacity: [0.7, 1, 0.7] 
                                }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity, 
                                    repeatType: 'reverse' 
                                }}
                                className={cn(
                                    "absolute inset-0 rounded-full opacity-20 blur-md",
                                    `bg-gradient-to-br ${skill.color} dark:${skill.darkColor}`
                                )} 
                            />
                            <div className={cn(
                                "relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full",
                                `bg-gradient-to-br ${skill.color} dark:${skill.darkColor}`,
                                "shadow-lg"
                            )}>
                                <IconComponent className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                            </div>
                        </div>
                        
                        <div className="text-center md:text-left flex-1 max-w-full">
                            <div className="inline-block mb-3">
                                <motion.span 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className={cn(
                                        "inline-block text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full",
                                        `bg-${skill.id}/10 text-${skill.id}-600 dark:text-${skill.id}-400`
                                    )}
                                >
                                    Expertise
                                </motion.span>
                            </div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className={cn(
                                    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent",
                                    `bg-gradient-to-r ${skill.color} dark:${skill.darkColor}`
                                )}
                            >
                                {skill.title}
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-base sm:text-lg md:text-xl text-foreground/80 dark:text-foreground/90 max-w-2xl md:ml-0 md:mr-auto mx-auto"
                            >
                                {skill.description}
                            </motion.p>
                        </div>
                    </motion.div>
                    
                    {/* Contenu principal */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
                        {/* Description détaillée - 2/3 de l'espace */}
                        <motion.div 
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="lg:col-span-2 space-y-10 md:space-y-12"
                        >
                            {/* À propos de cette compétence - avec style amélioré */}
                            <motion.div
                                variants={fadeIn}
                                className="relative"
                            >
                                <div className="hidden sm:block absolute -left-2 md:-left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center">
                                    <span className={cn(
                                        "inline-flex shrink-0 items-center justify-center mr-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full",
                                        `bg-gradient-to-br ${skill.color} dark:${skill.darkColor}`,
                                        "text-white text-sm"
                                    )}>
                                        1
                                    </span>
                                    <span className="inline-block">À propos</span>
                                </h2>
                                <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none pl-0 sm:pl-2 md:pl-4">
                                    <p className="text-foreground/80 leading-relaxed">
                                        {skill.longDescription}
                                    </p>
                                </div>
                            </motion.div>
                            
                            {/* Projets associés / Expérience - avec style amélioré */}
                            <motion.div
                                variants={fadeIn}
                                className="relative"
                            >
                                <div className="hidden sm:block absolute -left-2 md:-left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center">
                                    <span className={cn(
                                        "inline-flex shrink-0 items-center justify-center mr-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full",
                                        `bg-gradient-to-br ${skill.color} dark:${skill.darkColor}`,
                                        "text-white text-sm"
                                    )}>
                                        2
                                    </span>
                                    <span className="inline-block">Expérience</span>
                                </h2>
                                
                                <motion.div 
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="grid grid-cols-1 gap-4 sm:gap-6 pl-0 sm:pl-2 md:pl-4 md:grid-cols-2"
                                >
                                    {skill.experience.map((exp: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            variants={scaleIn}
                                            className={cn(
                                                "bg-card/40 dark:bg-card/20 backdrop-blur-sm border relative",
                                                "border-border/40 dark:border-border/20 rounded-xl p-4 sm:p-5 md:p-6",
                                                "transition-all duration-300 hover:shadow-md",
                                                "hover:border-primary/30 dark:hover:border-primary/20",
                                                "group"
                                            )}
                                        >
                                            {/* Accent coloré en haut de la carte */}
                                            <div className={cn(
                                                "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                                                `bg-gradient-to-r ${skill.color} dark:${skill.darkColor}`,
                                                "opacity-60 group-hover:opacity-100 transition-opacity"
                                            )} />
                                            
                                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{exp.title}</h3>
                                            <p className="text-sm sm:text-base text-foreground/70 dark:text-foreground/80 mb-3 sm:mb-4 leading-relaxed">
                                                {exp.description}
                                            </p>
                                            <div className="flex items-center text-xs sm:text-sm text-foreground/60 dark:text-foreground/60">
                                                <span className="font-medium mr-2">Client:</span> 
                                                <span className={cn(
                                                    "px-2 sm:px-3 py-0.5 sm:py-1 rounded-full",
                                                    "bg-primary/5 dark:bg-primary/10"
                                                )}>
                                                    {exp.client}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        
                        {/* Sidebar avec infos complémentaires - 1/3 de l'espace */}
                        <motion.div 
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6 sm:space-y-8 md:mt-8 lg:mt-0 lg:sticky lg:top-24 self-start"
                        >
                            {/* Carte d'expertise avec effet glassmorphisme */}
                            <motion.div 
                                variants={fadeIn}
                                className={cn(
                                    "relative border rounded-xl overflow-hidden",
                                    "bg-card/30 dark:bg-card/10 backdrop-blur-sm",
                                    "border-border/40 dark:border-border/20"
                                )}
                            >
                                {/* Accent en haut de la carte */}
                                <div className={cn(
                                    "h-1.5 w-full",
                                    `bg-gradient-to-r ${skill.color} dark:${skill.darkColor}`
                                )} />
                                
                                <div className="p-4 sm:p-5 md:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 flex items-center">
                                        <span className={cn(
                                            "inline-flex shrink-0 items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3",
                                            `bg-gradient-to-br ${skill.color} dark:${skill.darkColor}`,
                                            "text-white text-xs sm:text-sm"
                                        )}>
                                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </span>
                                        Compétences clés
                                    </h3>
                                    
                                    <motion.ul 
                                        variants={staggerContainer}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="space-y-2 sm:space-y-3"
                                    >
                                        {skill.keyFeatures.map((feature: string, index: number) => (
                                            <motion.li 
                                                key={index}
                                                variants={slideIn}
                                                className="flex items-start group"
                                            >
                                                <CheckCircle className={cn(
                                                    "h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0 transition-colors duration-300",
                                                    `text-${skill.id}/70 group-hover:text-${skill.id}`
                                                )} />
                                                <span className="text-sm sm:text-base text-foreground/80 dark:text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                                                    {feature}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>
                            </motion.div>
                            
                            {/* Outils et technologies - avec design amélioré */}
                            <motion.div 
                                variants={fadeIn}
                                className={cn(
                                    "relative border rounded-xl overflow-hidden",
                                    "bg-card/30 dark:bg-card/10 backdrop-blur-sm",
                                    "border-border/40 dark:border-border/20"
                                )}
                            >
                                {/* Accent en haut de la carte */}
                                <div className={cn(
                                    "h-1.5 w-full",
                                    `bg-gradient-to-r ${skill.color} dark:${skill.darkColor}`
                                )} />
                                
                                <div className="p-4 sm:p-5 md:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Outils & Technologies</h3>
                                    
                                    <motion.div 
                                        variants={staggerContainer}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="flex flex-wrap gap-1.5 sm:gap-2"
                                    >
                                        {skill.tools.map((tool: string, index: number) => (
                                            <motion.span 
                                                key={index}
                                                variants={scaleIn}
                                                whileHover={{ scale: 1.05 }}
                                                className={cn(
                                                    "inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium",
                                                    "border border-border/40 dark:border-border/20",
                                                    "bg-card/50 dark:bg-card/30 backdrop-blur-sm",
                                                    "hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors",
                                                    "hover:border-primary/30 dark:hover:border-primary/20"
                                                )}
                                            >
                                                {tool}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                            
                            {/* Appel à l'action - avec style et animations améliorés */}
                            <motion.div 
                                variants={scaleIn}
                                whileHover={{ scale: 1.02 }}
                                className={cn(
                                    "relative border rounded-xl overflow-hidden",
                                    "bg-gradient-to-b from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20",
                                    "backdrop-blur-sm border-primary/20 dark:border-primary/30",
                                    "shadow-sm hover:shadow-md transition-all duration-300"
                                )}
                            >
                                <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 opacity-10">
                                    <motion.div 
                                        animate={{ 
                                            y: [0, 8, 0],
                                            opacity: [0.1, 0.3, 0.1] 
                                        }}
                                        transition={{ 
                                            duration: 4,
                                            repeat: Infinity,
                                            repeatType: 'reverse'
                                        }}
                                        className={cn(
                                            "h-full w-full",
                                            `bg-gradient-to-r ${skill.color} dark:${skill.darkColor}`
                                        )}
                                    />
                                </div>
                                
                                <div className="p-4 sm:p-5 md:p-6 relative">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Intéressé par mes compétences?</h3>
                                    <p className="text-sm sm:text-base text-foreground/70 dark:text-foreground/80 mb-4 sm:mb-5 leading-relaxed">
                                        N'hésitez pas à me contacter pour discuter de votre projet ou obtenir plus d'informations sur mon approche.
                                    </p>
                                    <Button 
                                        className={cn(
                                            "w-full flex items-center justify-center group",
                                            `bg-gradient-to-r ${skill.color} dark:${skill.darkColor} hover:opacity-90`
                                        )}
                                        asChild
                                    >
                                        <Link href="/contact">
                                            Me contacter
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    
                    {/* Autres compétences - avec style moderne */}
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="mt-16 sm:mt-20 md:mt-24 lg:mt-32"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-center">
                            Découvrez mes autres compétences
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                            {Object.entries(skillsData)
                                .filter(([key]) => key !== slug)
                                .slice(0, 4)
                                .map(([key, otherSkill], index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link 
                                            href={`/skills/${key}`}
                                            className={cn(
                                                "group flex flex-col items-center justify-center p-4 sm:p-6 h-full",
                                                "bg-card/30 dark:bg-card/10 backdrop-blur-sm border rounded-xl",
                                                "border-border/40 dark:border-border/20",
                                                "hover:border-primary/30 dark:hover:border-primary/20",
                                                "hover:shadow-md transition-all duration-300"
                                            )}
                                        >
                                            <div className={cn(
                                                "mb-3 sm:mb-4 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                                                `bg-gradient-to-br ${otherSkill.color} dark:${otherSkill.darkColor}`,
                                                "group-hover:scale-110 transition-transform duration-300"
                                            )}>
                                                <otherSkill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                            </div>
                                            
                                            <h3 className="text-base sm:text-lg font-semibold text-center mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                                                {otherSkill.title}
                                            </h3>
                                            
                                            <div className="flex items-center mt-1 sm:mt-2 text-primary/80 group-hover:text-primary transition-colors">
                                                <span className="text-xs sm:text-sm mr-1">Découvrir</span>
                                                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
} 