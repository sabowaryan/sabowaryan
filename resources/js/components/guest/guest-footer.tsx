import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Code, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONTAINER, MAX_WIDTH, SITE_MARGIN } from '@/components/guest/guest-header';

export function GuestFooter() {
    const currentYear = new Date().getFullYear();
    
    const footerLinks = [
        {
            title: 'Menu principal',
            links: [
                { label: 'Accueil', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Projets', href: '/projects' },
                { label: 'Blog', href: '/blog' },
            ]
        },
        {
            title: 'Ressources',
            links: [
                { label: 'Skills', href: '/skills' },
                { label: 'Certification', href: '/certification' },
                { label: 'CV', href: '/cv' },
                { label: 'Tutoriels', href: '/tutoriels' },
                { label: 'Contact', href: '/contact' },
            ]
        },
        {
            title: 'Légal',
            links: [
                { label: 'Mentions légales', href: '/mentions-legales' },
                { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' }
            ]
        }
    ];
    
    const socialLinks = [
        { 
            icon: (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            ), 
            href: 'https://github.com/sabowaryan', 
            label: 'GitHub',
            hoverColor: 'hover:text-[#333] dark:hover:text-white'
        },
        { 
            icon: (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ), 
            href: 'https://linkedin.com/in/sabowaryan', 
            label: 'LinkedIn',
            hoverColor: 'hover:text-[#0077b5]'
        },
        { 
            icon: (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
            ), 
            href: 'mailto:contact@sabowaryan.com', 
            label: 'Email',
            hoverColor: 'hover:text-[#ea4335]'
        }
    ];

    return (
        <footer className="border-t border-border/30 dark:border-border/20 bg-card/30 dark:bg-card/5 backdrop-blur-sm">
            <div className={cn(SITE_CONTAINER, "py-12")}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Logo et brève description */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <Link href="/" className="inline-block">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent dark:from-primary/90 dark:to-primary/50">
                                SR
                            </h3>
                        </Link>
                        <p className="text-sm text-foreground/70 dark:text-muted-foreground/90 max-w-md">
                            Développeur web passionné par la création d'applications modernes et performantes, combinant design élégant et code de qualité.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.1 * i }}
                                    viewport={{ once: true }}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className={cn(
                                            "rounded-full h-9 w-9 border-border/50 transition-all",
                                            "hover:bg-background hover:shadow-md hover:scale-110 dark:border-border/20",
                                            "dark:hover:bg-background/10 dark:bg-background/5",
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
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Liens de navigation */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2"
                    >
                        {footerLinks.map((group, i) => (
                            <div key={group.title} className="space-y-4">
                                <h4 className="text-sm font-medium text-foreground/90 dark:text-gray-300">{group.title}</h4>
                                <ul className="space-y-2">
                                    {group.links.map((link, j) => (
                                        <motion.li 
                                            key={link.label}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.05 * j + 0.1 * i }}
                                            viewport={{ once: true }}
                                        >
                                            <Link 
                                                href={link.href}
                                                className="text-sm text-foreground/70 dark:text-muted-foreground/80 hover:text-primary dark:hover:text-primary/90 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Délimitation visuelle */}
                <div className="relative mt-12 pt-6">
                    <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-border/0 via-border/50 to-border/0 dark:via-border/20"></div>
                    
                    {/* Copyright */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-center text-center md:text-left"
                    >
                        <p className="text-xs text-foreground/60 dark:text-muted-foreground/70">
                            &copy; {currentYear} Sabowaryan. Tous droits réservés.
                        </p>
                        <p className="text-xs text-foreground/60 dark:text-muted-foreground/70 flex items-center mt-2 md:mt-0">
                            <span>Réalisé avec</span>
                            <Heart className="h-3 w-3 mx-1 text-red-500 dark:text-red-400 animate-pulse" />
                            <span>et</span>
                            <Code className="h-3 w-3 mx-1 text-primary dark:text-primary/80" />
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
} 