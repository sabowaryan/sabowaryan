import { Breadcrumbs } from '@/components/breadcrumbs';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWindowScroll } from '@/hooks/use-window-scroll';

// Définition des marges latérales pour l'ensemble de l'application
// Ces valeurs seront réutilisées dans d'autres composants
export const SITE_MARGIN_X = {
  xs: 'px-4', // Écrans très petits
  sm: 'sm:px-6', // Écrans petit
  md: 'md:px-8', // Écrans moyens
  lg: 'lg:px-10', // Grands écrans
  xl: 'xl:px-12', // Très grands écrans
};

// Combine toutes les marges dans une seule chaîne pour faciliter l'utilisation
export const SITE_MARGIN = `${SITE_MARGIN_X.xs} ${SITE_MARGIN_X.sm} ${SITE_MARGIN_X.md} ${SITE_MARGIN_X.lg} ${SITE_MARGIN_X.xl}`;

// Largeur maximale du contenu et conteneur par défaut
export const MAX_WIDTH = {
    default: 'max-w-7xl',
    narrow: 'max-w-5xl',
    wide: 'max-w-[1440px]'
};

// Configuration du conteneur principal qui peut être réutilisée
export const SITE_CONTAINER = `${MAX_WIDTH.default} mx-auto ${SITE_MARGIN} w-full`;

const mainNavItems = [
    {
        title: 'About',
        href: '/about',
    },
    {
        title: 'Projets',
        href: '/projects',
    },
    {
        title: 'Blog',
        href: '/blog',
    },
    {
        title: 'Tutorials',
        href: '/tutorials',
    },
    {
        title: 'Contact',
        href: '/contact',
    },
];

const socialLinks = [
    { 
        icon: (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        ), 
        href: 'https://github.com/sabowaryan', 
        label: 'GitHub',
        hoverColor: 'hover:text-[#333] dark:hover:text-white'
    },
    { 
        icon: (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ), 
        href: 'https://linkedin.com/in/ryan-sabowa', 
        label: 'LinkedIn',
        hoverColor: 'hover:text-[#0077b5]'
    },
    { 
        icon: (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
            </svg>
        ), 
        href: 'mailto:contact@ryansabowa.fr', 
        label: 'Email',
        hoverColor: 'hover:text-[#ea4335]'
    }
];

interface GuestHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function GuestHeader({ breadcrumbs = [] }: GuestHeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useWindowScroll();
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { url } = usePage();
    
    // Vérifier si le thème sombre est actif au chargement
    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
    }, []);
    
    // Détecter le défilement
    useEffect(() => {
        setHasScrolled(scrollY > 10);
    }, [scrollY]);

    // Basculer entre les modes clair et sombre
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    };

    // Vérifier si un lien est actif
    const isActive = (href: string) => {
        return url === href || url.startsWith(href + '/');
    };

    // Animations
    const navbarVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.3, 
                when: "beforeChildren", 
                staggerChildren: 0.05
            } 
        },
        exit: { 
            opacity: 0, 
            y: -10, 
            transition: { 
                duration: 0.2, 
                when: "afterChildren", 
                staggerChildren: 0.03,
                staggerDirection: -1
            } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -5 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -5, transition: { duration: 0.1 } }
    };

    return (
        <>
            <motion.header 
                className={cn(
                    "sticky top-0 z-40 w-full transition-all duration-300",
                    hasScrolled 
                        ? "bg-background/85 backdrop-blur-lg border-b border-border/50 shadow-sm" 
                        : "bg-background/30 backdrop-blur-sm"
                )}
                variants={navbarVariants}
                initial="hidden"
                animate="visible"
            >
                <div className={cn(SITE_CONTAINER, "relative")}>
                    <div className="flex h-16 items-center justify-between relative">
                        {/* Délimitation visuelle gauche */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 hidden md:block"></div>
                        
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link 
                                href="/" 
                                className="group flex items-center space-x-2.5 transition-opacity hover:opacity-90"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <AppLogoIcon className="h-8 w-8 sm:h-9 sm:w-9 text-primary" />
                                </motion.div>
                                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 xs:inline-block">
                                    SR
                                </span>
                            </Link>
                        </div>

                        {/* Navigation pour desktop */}
                        <div className="hidden md:block">
                            <nav className="flex items-center space-x-1.5 lg:space-x-3">
                                {mainNavItems.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className={cn(
                                                "relative px-2 lg:px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                                                "hover:bg-primary/10 dark:hover:bg-primary/5",
                                                active 
                                                    ? "text-primary dark:text-primary" 
                                                    : "text-foreground/80 dark:text-foreground/70 hover:text-primary dark:hover:text-primary"
                                            )}
                                        >
                                            {item.title}
                                            {active && (
                                                <motion.span 
                                                    layoutId="activeNavIndicator"
                                                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full mx-3"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Actions à droite */}
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            {/* Réseaux sociaux visibles sur écrans moyens et grands */}
                            <div className="hidden md:flex lg:flex items-center space-x-1 mr-1 lg:mr-2">
                                {socialLinks.map((link) => (
                                    <Button
                                        key={link.label}
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "h-7 w-7 lg:h-8 lg:w-8 rounded-full transition-all",
                                            "hover:bg-background hover:shadow-md hover:scale-110",
                                            "dark:hover:bg-background/20",
                                            link.hoverColor
                                        )}
                                        asChild
                                    >
                                        <a 
                                            href={link.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    </Button>
                                ))}
                            </div>

                            {/* Bouton mode sombre */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleDarkMode}
                                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-primary/10 flex-shrink-0 border border-border/50"
                                aria-label={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: isDarkMode ? 180 : 0 }}
                                    transition={{ duration: 0.5, type: "spring" }}
                                    className="flex items-center justify-center relative"
                                >
                                    {isDarkMode ? (
                                        <Sun className="h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all text-yellow-500" />
                                    ) : (
                                        <Moon className="h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all text-slate-700 dark:text-primary" />
                                    )}
                                </motion.div>
                            </Button>

                            {/* Boutons d'authentification - desktop seulement */}
                            <div className="hidden sm:flex items-center space-x-2">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-xs lg:text-sm font-medium h-8" 
                                    asChild
                                >
                                    <Link href={route('login')}>Connexion</Link>
                                </Button>
                                <Button 
                                    size="sm" 
                                    className="text-xs lg:text-sm font-medium bg-primary hover:bg-primary/90 h-8"
                                    asChild
                                >
                                        <Link href={route('register')}>
                                        Inscription
                                            <ChevronRight className="ml-1 h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                        </div>

                            {/* Bouton menu mobile */}
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                                className="md:hidden h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-primary/10"
                            >
                                <AnimatePresence mode="wait">
                                    {mobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </motion.div>
                                    ) : (
                                <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                                </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                        
                        {/* Délimitation visuelle droite */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 hidden md:block"></div>
                    </div>
                </div>

                {/* Menu mobile */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="border-b border-border/30 dark:border-border/10 bg-background/95 dark:bg-background/90 backdrop-blur-md">
                                <div className={cn("space-y-1 py-3", SITE_MARGIN)}>
                                    {mainNavItems.map((item) => {
                                        const active = isActive(item.href);
                                        return (
                                        <motion.div
                                            key={item.title}
                                                variants={itemVariants}
                                        >
                                            <Link
                                                href={item.href}
                                                    className={cn(
                                                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                                        active 
                                                            ? "bg-primary/10 text-primary" 
                                                            : "hover:bg-muted/50 text-foreground/80 dark:text-foreground/70"
                                                    )}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.title}
                                                    <ChevronRight className={cn(
                                                        "h-4 w-4 transition-transform",
                                                        active ? "text-primary" : "text-muted-foreground"
                                                    )} />
                                            </Link>
                                        </motion.div>
                                        );
                                    })}
                                </div>
                                
                                <div className={cn("py-3 border-t border-border/30 dark:border-border/10", SITE_MARGIN)}>
                                    <motion.div variants={itemVariants}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                    {socialLinks.map((link) => (
                                        <Button
                                            key={link.label}
                                                        variant="ghost"
                                            size="icon"
                                                        className={cn(
                                                            "h-8 w-8 rounded-full transition-all",
                                                            "hover:bg-background hover:shadow-md hover:scale-110",
                                                            "dark:hover:bg-background/20",
                                                            link.hoverColor
                                                        )}
                                            asChild
                                        >
                                            <a 
                                                href={link.href} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                aria-label={link.label}
                                            >
                                                {link.icon}
                                            </a>
                                        </Button>
                                    ))}
                                            </div>
                                
                                            {/* Boutons d'authentification - mobile seulement */}
                                            <div className="flex items-center space-x-2 sm:hidden">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="text-xs"
                                                    asChild
                                                >
                                                    <Link href={route('login')}>Connexion</Link>
                                    </Button>
                                                <Button 
                                                    size="sm" 
                                                    className="text-xs"
                                                    asChild
                                                >
                                                    <Link href={route('register')}>Inscription</Link>
                                    </Button>
                                            </div>
                                        </div>
                                </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 1 && (
                <motion.div 
                    className="border-b border-border/30 dark:border-border/10 w-full bg-background/50 dark:bg-background/20 backdrop-blur-sm"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <div className={cn(SITE_CONTAINER, "h-10 flex items-center text-muted-foreground text-sm")}>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </motion.div>
            )}
        </>
    );
}