import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { cn } from '@/lib/utils';
import { Code2, Cpu, Palette, Smartphone, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { type LucideIcon } from 'lucide-react';

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    darkColor: string;
    details?: string[];
    slug: string;
}

// Même structure de données que dans la page de détail
const features: Feature[] = [
    {
        id: 'design',
        title: 'Design Créatif',
        description: "Interfaces modernes et épurées avec une attention particulière aux détails et à l'expérience utilisateur",
        icon: Palette,
        color: 'from-pink-500 to-rose-600',
        darkColor: 'from-pink-400 to-rose-500',
        details: [
            'Prototypage et maquettes UI/UX',
            'Design systems cohérents',
            'Animations subtiles et significatives',
            'Accessibilité et inclusivité'
        ],
        slug: 'design-creatif'
    },
    {
        id: 'performance',
        title: 'Performance Optimale',
        description: 'Applications rapides et réactives grâce à des optimisations poussées et des best practices',
        icon: Zap,
        color: 'from-amber-500 to-orange-600',
        darkColor: 'from-amber-400 to-orange-500',
        details: [
            'Optimisation des assets et du bundle',
            'Rendu côté serveur (SSR)',
            'Mise en cache stratégique',
            'Lazy loading et code splitting'
        ],
        slug: 'performance-optimale'
    },
    {
        id: 'fullstack',
        title: 'Full Stack',
        description: 'Expertise complète du frontend au backend, pour des solutions bout en bout cohérentes',
        icon: Code2,
        color: 'from-blue-500 to-indigo-600',
        darkColor: 'from-blue-400 to-indigo-500',
        details: [
            'Frontend: React, Vue, Angular',
            'Backend: Laravel, Node.js, Django',
            'APIs RESTful et GraphQL',
            'Bases de données SQL et NoSQL'
        ],
        slug: 'fullstack-development'
    },
    {
        id: 'architecture',
        title: 'Architecture Moderne',
        description: 'Utilisation des dernières technologies et patterns pour une base de code maintenable',
        icon: Cpu,
        color: 'from-emerald-500 to-teal-600',
        darkColor: 'from-emerald-400 to-teal-500',
        details: [
            'Architectures micro-frontend',
            'Clean code et principes SOLID',
            'CI/CD et tests automatisés',
            'Conteneurisation avec Docker'
        ],
        slug: 'architecture-moderne'
    },
    {
        id: 'responsive',
        title: 'Responsive Design',
        description: 'Expérience fluide sur tous les appareils grâce à une approche mobile-first',
        icon: Smartphone,
        color: 'from-violet-500 to-purple-600',
        darkColor: 'from-violet-400 to-purple-500',
        details: [
            'Approche mobile-first',
            'Design adaptatif multi-écrans',
            'Interfaces progressives',
            'Tests sur différents appareils'
        ],
        slug: 'responsive-design'
    }
];

// Catégories de compétences
const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'design', name: 'Design' },
    { id: 'devops', name: 'DevOps' }
];

export default function Skills() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            } 
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5, 
                ease: "easeOut" 
            }
        }
    };

    return (
        <GuestLayout>
            <Head title="Mes Compétences" />
            
            <div className="relative overflow-hidden py-16 md:py-24">
                {/* Formes décoratives de fond */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/3 dark:bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/3 dark:bg-primary/5 rounded-full blur-3xl" />
                    <motion.div 
                        animate={{ opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute top-3/4 left-1/4 w-64 h-64 bg-primary/3 dark:bg-primary/5 rounded-full blur-3xl"
                    />
                </div>
                
                <div className={cn(SITE_CONTAINER)}>
                    {/* En-tête de la page */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <span className="inline-block text-sm font-medium text-primary mb-3 px-3 py-1 bg-primary/5 dark:bg-primary/10 rounded-full">
                            Expertise
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 dark:from-primary/90 dark:to-primary/60 bg-clip-text text-transparent">
                            Mes Compétences
                        </h1>
                        <p className="text-base md:text-lg text-foreground/70 dark:text-foreground/80 mx-auto">
                            Un ensemble de compétences techniques et créatives pour donner vie à vos projets
                            digitaux, de la conception à la mise en production.
                        </p>
                    </motion.div>
                    
                    {/* Filtre par catégorie */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "rounded-full border-border/50",
                                    category.id === 'all' 
                                        ? "bg-primary/10 text-primary border-primary/30"
                                        : "hover:bg-primary/5 hover:border-primary/30"
                                )}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </motion.div>

                    {/* Grille des compétences */}
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        aria-label="Liste des compétences"
                    >
                        {features.map((feature) => (
                            <motion.article
                                key={feature.id}
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className={cn(
                                    "p-6 sm:p-8 rounded-2xl overflow-hidden relative group flex flex-col h-full",
                                    "backdrop-blur-sm border transition-all duration-300 ease-out",
                                    "hover:shadow-xl hover:shadow-primary/5 focus-within:ring-2 focus-within:ring-primary/50",
                                    "border-border/40 bg-card/30 dark:bg-card/10 dark:border-border/20 hover:border-primary/20"
                                )}
                                aria-labelledby={`skill-title-${feature.id}`}
                            >
                                {/* Effet de fond au survol */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                                
                                {/* Icône avec fond dégradé - amélioré pour l'accessibilité */}
                                <div className="mb-6 relative" aria-hidden="true">
                                    <div className={cn(
                                        "absolute inset-0 rounded-full opacity-20 blur-sm",
                                        `bg-gradient-to-br ${feature.color} dark:${feature.darkColor}`
                                    )} />
                                    <div className={cn(
                                        "relative flex items-center justify-center w-14 h-14 rounded-full",
                                        `bg-gradient-to-br ${feature.color} dark:${feature.darkColor}`,
                                        "shadow-lg"
                                    )}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                
                                {/* Titre et description - avec structure sémantique améliorée */}
                                <h3 
                                    id={`skill-title-${feature.id}`} 
                                    className="text-xl font-semibold mb-3"
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-foreground/80 dark:text-foreground/90 mb-5 leading-relaxed">
                                    {feature.description}
                                </p>
                                
                                {/* Aperçu des compétences - avec meilleur contraste et aria-labels */}
                                <div className="mb-5">
                                    <h4 className="sr-only">Compétences clés</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {feature.details && feature.details.slice(0, 2).map((detail, i) => (
                                            <span 
                                                key={i}
                                                className={cn(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    "bg-primary/15 dark:bg-primary/25 text-primary-700 dark:text-primary-200"
                                                )}
                                            >
                                                {detail}
                                            </span>
                                        ))}
                                        {feature.details && feature.details.length > 2 && (
                                            <span 
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                                                title={feature.details.slice(2).join(', ')}
                                                aria-label={`${feature.details.length - 2} compétences supplémentaires`}
                                            >
                                                +{feature.details.length - 2}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Bouton détaillé - avec focus visible et aria renforcés */}
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="font-medium text-sm text-foreground/80">En savoir plus</span>
                                    
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "h-10 w-10 rounded-full shrink-0",
                                            "border border-border/40 dark:border-border/20",
                                            "hover:bg-primary/5 dark:hover:bg-primary/10",
                                            "hover:border-primary/30 dark:hover:border-primary/20",
                                            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                                            "transition-all duration-200",
                                            `hover:bg-gradient-to-br hover:${feature.color} dark:hover:${feature.darkColor} hover:text-white`
                                        )}
                                        asChild
                                    >
                                        <Link 
                                            href={`/skills/${feature.slug}`}
                                            aria-label={`En savoir plus sur ${feature.title}`}
                                            className="group/btn"
                                        >
                                            <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover/btn:translate-x-0.5" />
                                        </Link>
                                    </Button>
                            </div>
                            </motion.article>
                        ))}
                    </motion.div>

                    {/* Autres options (portfolio, CV, etc.) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-20 text-center"
                    >
                        <h3 className="text-xl font-semibold mb-6">Découvrez plus de mon travail</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="rounded-full border-border/50 hover:bg-primary/5 hover:border-primary/50 transition-all"
                                asChild
                            >
                                <Link href="/projects">
                                    Voir mes projets
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="rounded-full border-border/50 hover:bg-primary/5 hover:border-primary/50 transition-all"
                                asChild
                            >
                                <Link href="/cv">
                                    Consulter mon CV
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
} 