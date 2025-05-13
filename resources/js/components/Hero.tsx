import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { Link } from '@inertiajs/react';

export function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    
    // Enhanced parallax effects with spring physics
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);
    
    // Parallax effect for background elements with smoother animation
    const backgroundY = useTransform(smoothProgress, [0, 1], [0, 150]);
    const backgroundScale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);
    const contentOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0.7]);
    const contentY = useTransform(smoothProgress, [0, 0.25], [0, 50]);
    
    // Rotation effect for decorative elements
    const rotation = useTransform(smoothProgress, [0, 1], [0, 10]);
    
    // Handling sequential animations
    useEffect(() => {
        const timer = setTimeout(() => {
        setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const socialLinks = [
        { 
            icon: <Github className="h-5 w-5" />, 
            href: 'https://github.com/sabowaryan', 
            label: 'GitHub',
            color: 'hover:text-[#333] dark:hover:text-white'
        },
        { 
            icon: <Linkedin className="h-5 w-5" />, 
            href: 'https://linkedin.com/in/ryan-sabowa', 
            label: 'LinkedIn',
            color: 'hover:text-[#0077b5]'
        },
        { 
            icon: <Mail className="h-5 w-5" />, 
            href: 'mailto:contact@sabowaryan.com', 
            label: 'Email',
            color: 'hover:text-[#ea4335]'
        }
    ];

    // Refined animation variants with professional easing
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.12,
                delayChildren: 0.1,
                when: "beforeChildren",
                ease: [0.25, 0.1, 0.25, 1], // Refined cubic-bezier easing
                duration: 0.6
            } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.85, 
                ease: [0.33, 1, 0.68, 1] // Professional easing curve
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 1.1, 
                ease: [0.25, 1, 0.5, 1],
                delay: 0.2
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
        visible: { 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)",
            transition: { 
                duration: 1.2, 
                ease: [0.25, 1, 0.5, 1], // Professional easing curve
                delay: 0.15
            }
        }
    };

    const decorationVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1,
            scale: 1,
            transition: { 
                duration: 1.3,
                delay: 0.4,
                ease: [0.25, 1, 0.5, 1]
            }
        }
    };
    
    // New stagger animation for text reveal
    const textRevealVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                delay: 0.3 + (custom * 0.1),
                ease: [0.25, 1, 0.5, 1]
            }
        })
    };
    
    // New floating animation for hover effects
    const floatAnimation = {
        y: [0, -8, 0],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse" as "reverse",
            ease: "easeInOut"
        }
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20">
            {/* Gradient background with enhanced animations */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90 dark:from-background dark:via-background/95 dark:to-background/80 z-0" />
            
            {/* Enhanced animated background elements with parallax and scaling */}
            <motion.div 
                style={{ 
                    y: backgroundY, 
                    scale: backgroundScale 
                }} 
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ 
                        opacity: [0, 0.6, 0.7, 0.6], 
                        scale: [0.7, 1, 1.03, 1],
                        rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                        opacity: { duration: 3, ease: "easeOut" },
                        scale: { duration: 2.5, ease: [0.34, 1.56, 0.64, 1] },
                        rotate: { duration: 20, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" 
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ 
                        opacity: [0, 0.7, 0.8, 0.7], 
                        scale: [0.7, 1, 1.05, 1],
                        rotate: [0, -3, 0, 3, 0]
                    }}
                    transition={{ 
                        opacity: { duration: 3.5, delay: 0.3, ease: "easeOut" },
                        scale: { duration: 3, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                        rotate: { duration: 25, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }
                    }}
                    className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" 
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                        opacity: [0.3, 0.6, 0.3], 
                        scale: [0.9, 1.05, 0.95],
                        rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                        opacity: { duration: 8, repeat: Infinity, repeatType: 'reverse' },
                        scale: { duration: 12, repeat: Infinity, repeatType: 'reverse' },
                        rotate: { duration: 30, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }
                    }}
                    className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
                />
                
                {/* New subtle floating particles */}
                <AnimatePresence>
                    {isLoaded && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 20, x: "25%" }}
                                animate={{ opacity: 0.4, y: [0, -30, 0], x: ["25%", "27%", "25%"] }}
                                transition={{ 
                                    opacity: { duration: 1, delay: 1 },
                                    y: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" },
                                    x: { duration: 10, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }
                                }}
                                className="absolute top-1/3 w-12 h-12 bg-primary/20 rounded-full blur-2xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20, x: "65%" }}
                                animate={{ opacity: 0.3, y: [0, -40, 0], x: ["65%", "62%", "65%"] }}
                                transition={{ 
                                    opacity: { duration: 1, delay: 1.5 },
                                    y: { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" },
                                    x: { duration: 15, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }
                                }}
                                className="absolute top-1/4 w-8 h-8 bg-primary/15 rounded-full blur-xl"
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
            
            {/* Enhanced main content with progressive reveal and scroll effects */}
            <motion.div 
                style={{ 
                    opacity: contentOpacity,
                    y: contentY
                }}
                className={cn(SITE_CONTAINER, "relative z-10")}
            >
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center relative"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                >
                    {/* Séparateur vertical décoratif avec animations avancées */}
                    <motion.div 
                        variants={decorationVariants}
                        style={{ rotate: rotation }}
                        className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 z-10"
                    >
                        <motion.div 
                            initial={{ height: "0%" }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 1.5, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
                            className="w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent h-full relative"
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: [0, 1, 0.8],
                                    scale: [0, 1.2, 1],
                                    boxShadow: [
                                        "0 0 0px rgba(var(--primary), 0)",
                                        "0 0 15px rgba(var(--primary), 0.5)",
                                        "0 0 10px rgba(var(--primary), 0.3)"
                                    ]
                                }}
                                transition={{ 
                                    duration: 1.5, 
                                    delay: 1.2,
                                    ease: [0.34, 1.56, 0.64, 1]
                                }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-glow"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: [0, 1, 0.5, 1, 0.5], 
                                    scale: [0, 1, 0.8, 1, 0.8],
                                    boxShadow: [
                                        "0 0 0px rgba(var(--primary), 0)",
                                        "0 0 10px rgba(var(--primary), 0.3)",
                                        "0 0 5px rgba(var(--primary), 0.1)",
                                        "0 0 10px rgba(var(--primary), 0.3)",
                                        "0 0 5px rgba(var(--primary), 0.1)"
                                    ]
                                }}
                                transition={{ 
                                    duration: 4, 
                                    delay: 1.7, 
                                    repeat: Infinity, 
                                    repeatType: 'reverse',
                                    ease: [0.76, 0, 0.24, 1]
                                }}
                                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary/80 shadow-glow"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: [0, 0.5, 1, 0.5], 
                                    scale: [0, 0.8, 1, 0.8],
                                    boxShadow: [
                                        "0 0 0px rgba(var(--primary), 0)",
                                        "0 0 5px rgba(var(--primary), 0.1)",
                                        "0 0 10px rgba(var(--primary), 0.3)",
                                        "0 0 5px rgba(var(--primary), 0.1)"
                                    ]
                                }}
                                transition={{ 
                                    duration: 4, 
                                    delay: 2, 
                                    repeat: Infinity, 
                                    repeatType: 'reverse',
                                    ease: [0.76, 0, 0.24, 1]
                                }}
                                className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary/80 shadow-glow"
                            />
                            
                            {/* Animated line trace effect */}
                            <motion.div
                                initial={{ height: "0%", opacity: 0 }}
                                animate={{ 
                                    height: ["0%", "100%", "0%"], 
                                    opacity: [0, 0.4, 0],
                                    top: ["0%", "0%", "100%"]
                                }}
                                transition={{ 
                                    duration: 3, 
                                    delay: 2.5,
                                    repeat: Infinity,
                                    repeatDelay: 1.5,
                                    ease: [0.76, 0, 0.24, 1]
                                }}
                                className="absolute w-px left-0 bg-primary/60 blur-[1px]"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Image à gauche avec effet avancés */}
                    <motion.div
                        className="relative max-w-xs sm:max-w-sm mx-auto md:mx-0 md:ml-auto md:mr-8"
                        variants={imageVariants}
                    >
                        <div className="relative">
                            {/* Background blur elements avec animation avancée */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                    opacity: [0, 0.6, 0.7, 0.6], 
                                    scale: [0.8, 1, 1.05, 1],
                                    rotate: [0, 1, 0, -1, 0]
                                }}
                                transition={{ 
                                    opacity: { duration: 2, delay: 0.6, ease: "easeOut" },
                                    scale: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" },
                                    rotate: { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }
                                }}
                                className="absolute -inset-4 bg-primary/3 dark:bg-primary/10 rounded-full blur-3xl" 
                            />
                            
                            {/* Image container with advanced decorative elements */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                                animate={{ 
                                    y: 0, 
                                    opacity: 1, 
                                    filter: "blur(0px)",
                                    boxShadow: [
                                        "0 10px 30px -15px rgba(0,0,0,0.2)",
                                        "0 20px 40px -20px rgba(0,0,0,0.3)",
                                        "0 10px 30px -15px rgba(0,0,0,0.2)"
                                    ]
                                }}
                                transition={{ 
                                    y: { duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                                    opacity: { duration: 1.2, delay: 0.3, ease: "easeOut" },
                                    filter: { duration: 1.5, delay: 0.3, ease: "easeOut" },
                                    boxShadow: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }
                                }}
                                className="relative rounded-2xl overflow-hidden aspect-square border border-border/20 shadow-xl"
                            >
                                {/* Animated glint effect */}
                                <motion.div
                                    initial={{ x: "-100%", opacity: 0 }}
                                    animate={{ 
                                        x: ["120%", "-120%"],
                                        opacity: [0, 0.4, 0.6, 0.4, 0]
                                    }}
                                    transition={{ 
                                        duration: 2.5, 
                                        delay: 1.2,
                                        repeat: Infinity,
                                        repeatDelay: 5,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="absolute inset-y-0 w-1/5 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] z-30"
                                />
                                
                                <img 
                                    src="/images/hero/ryan.png" 
                                    alt="Sabowa Ryan - Développeur Full Stack"
                                    className="object-cover w-full h-full z-10 relative"
                                    loading="eager"
                                />
                                
                                {/* Enhanced overlay gradient with subtle animation */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.4 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-20" 
                                />
                                
                                {/* Decorative elements with enhanced animation */}
                                <motion.div 
                                    className="absolute -top-2 -right-2 w-20 h-20 bg-primary/10 dark:bg-primary/30 rounded-full blur-xl z-0"
                                    animate={{ 
                                        scale: [1, 1.2, 1], 
                                        opacity: [0.6, 0.8, 0.6],
                                        rotate: [0, 15, 0]
                                    }}
                                    transition={{ 
                                        duration: 8, 
                                        repeat: Infinity, 
                                        repeatType: 'reverse',
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div 
                                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 dark:bg-primary/30 rounded-full blur-xl z-0"
                                    animate={{ 
                                        scale: [1, 1.3, 1], 
                                        opacity: [0.6, 0.9, 0.6],
                                        rotate: [0, -15, 0]
                                    }}
                                    transition={{ 
                                        duration: 10, 
                                        repeat: Infinity, 
                                        repeatType: 'reverse', 
                                        delay: 1,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                            
                            {/* Code brackets decoration with enhanced entry */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                animate={{ opacity: 0.7, x: 0, scale: 1 }}
                                transition={{ 
                                    duration: 1, 
                                    delay: 1,
                                    ease: [0.34, 1.56, 0.64, 1]
                                }}
                                className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-4xl font-mono text-primary/40 dark:text-primary/30"
                            >
                                {"{"}
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 0.7, x: 0, scale: 1 }}
                                transition={{ 
                                    duration: 1, 
                                    delay: 1,
                                    ease: [0.34, 1.56, 0.64, 1]
                                }}
                                className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-4xl font-mono text-primary/40 dark:text-primary/30"
                            >
                                {"}"}
                            </motion.div>
                            
                            {/* Animated dots with enhanced effects */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: [0, 1, 0], 
                                    scale: [0.5, 1, 0.5],
                                    boxShadow: [
                                        "0 0 0px rgba(var(--primary), 0)",
                                        "0 0 15px rgba(var(--primary), 0.5)",
                                        "0 0 0px rgba(var(--primary), 0)"
                                    ]
                                }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity, 
                                    repeatType: 'reverse',
                                    ease: [0.76, 0, 0.24, 1],
                                    delay: 1.5
                                }}
                                className="absolute top-6 right-2 w-3 h-3 rounded-full bg-primary shadow-glow z-30"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: [0, 1, 0], 
                                    scale: [0.5, 1, 0.5],
                                    boxShadow: [
                                        "0 0 0px rgba(var(--primary), 0)",
                                        "0 0 12px rgba(var(--primary), 0.4)",
                                        "0 0 0px rgba(var(--primary), 0)"
                                    ]
                                }}
                                transition={{ 
                                    duration: 3, 
                                    delay: 2.5, 
                                    repeat: Infinity, 
                                    repeatType: 'reverse',
                                    ease: [0.76, 0, 0.24, 1]
                                }}
                                className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-primary shadow-glow z-30"
                            />
                        </div>
                    </motion.div>
                    
                    {/* Texte et boutons à droite avec animations avancées */}
                    <motion.div
                        className="flex flex-col space-y-8 text-center md:text-left md:ml-8"
                        variants={itemVariants}
                    >
                        <div className="space-y-4">
                            <motion.div 
                                initial={{ opacity: 0, y: -25, scale: 0.9 }}
                                animate={{ 
                                    opacity: isLoaded ? 1 : 0, 
                                    y: isLoaded ? 0 : -25, 
                                    scale: isLoaded ? 1 : 0.9,
                                    boxShadow: isLoaded ? [
                                        "0 0 0 rgba(var(--primary), 0)",
                                        "0 0 20px rgba(var(--primary), 0.2)",
                                        "0 0 0 rgba(var(--primary), 0)"
                                    ] : "none"
                                }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.3, 
                                    ease: [0.25, 1, 0.5, 1],
                                    boxShadow: { 
                                        duration: 3, 
                                        repeat: Infinity, 
                                        repeatType: 'reverse',
                                        ease: "easeInOut"
                                    }
                                }}
                                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 backdrop-blur-sm mb-2"
                            >
                                <span className="text-sm font-medium text-primary">Développeur Full Stack</span>
                            </motion.div>
                            
                            <motion.h1 
                                variants={titleVariants}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                            >
                                <motion.span 
                                    initial={{ opacity: 0, y: 30, filter: "blur(3px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ 
                                        duration: 0.9, 
                                        delay: 0.4,
                                        ease: [0.25, 1, 0.5, 1]
                                    }}
                                    className="block mb-2"
                                >
                                    Sabowa Ryan
                                </motion.span>
                                <motion.span 
                                    initial={{ opacity: 0, y: 30, filter: "blur(3px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ 
                                        duration: 0.9, 
                                        delay: 0.6,
                                        ease: [0.25, 1, 0.5, 1]
                                    }}
                                    className="bg-gradient-to-r from-primary to-primary/60 dark:from-primary/90 dark:to-primary/60 bg-clip-text text-transparent"
                                >
                                    <motion.span
                                        animate={{
                                            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            backgroundSize: "200% 100%",
                                            display: "inline-block",
                                            backgroundImage: "linear-gradient(90deg, var(--primary) 0%, var(--primary-light, rgba(var(--primary), 0.6)) 50%, var(--primary) 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent"
                                        }}
                                    >
                                        Créatif & Passionné
                                    </motion.span>
                                </motion.span>
                            </motion.h1>
                        </div>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 0.8,
                                ease: [0.25, 1, 0.5, 1]
                            }}
                            className="text-base sm:text-lg text-foreground/70 dark:text-foreground/80 max-w-2xl mx-auto md:mx-0 leading-relaxed"
                        >
                            <AnimatePresence>
                                {isLoaded && (
                                    <>
                                        {["Je conçois et développe des expériences numériques modernes et performantes,",
                                          "en combinant expertise technique, design élégant et solutions innovantes",
                                          "pour donner vie à vos projets web."].map((line, index) => (
                                            <motion.span
                                                key={index}
                                                custom={index}
                                                variants={textRevealVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="block"
                                            >
                                                {line}
                                            </motion.span>
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 1.1,
                                ease: [0.25, 1, 0.5, 1]
                            }}
                            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17
                                }}
                            >
                                <Button 
                                    size="lg" 
                                    className="rounded-full shadow-md bg-primary hover:bg-primary/90 transition-all group relative overflow-hidden"
                                    asChild
                                >
                                    <Link href="/projects">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 1.3 }}
                                        >
                                    Découvrir mes projets
                                        </motion.span>
                                        <motion.span 
                                            className="ml-2 inline-block"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ 
                                                duration: 1.5, 
                                                repeat: Infinity, 
                                                repeatType: 'loop', 
                                                ease: "easeInOut" 
                                            }}
                                        >
                                            →
                                        </motion.span>
                                        
                                        {/* Button hover effect */}
                                        <motion.span 
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileHover={{ scale: 2, opacity: 0.1 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0 rounded-full bg-white pointer-events-none"
                                        />
                                    </Link>
                                </Button>
                            </motion.div>
                            
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17
                                }}
                            >
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="rounded-full border-border/50 hover:bg-primary/5 hover:border-primary/50 transition-all relative overflow-hidden"
                                    asChild
                                >
                                    <Link href="/contact">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 1.4 }}
                                        >
                                    Me contacter
                                        </motion.span>
                                        
                                        {/* Button hover effect */}
                                        <motion.span 
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileHover={{ scale: 2, opacity: 0.05 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0 rounded-full bg-primary pointer-events-none"
                                        />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                        
                        {/* Social links avec animations avancées */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 1.3,
                                ease: [0.25, 1, 0.5, 1]
                            }}
                            className="flex items-center space-x-4 justify-center md:justify-start pt-4"
                        >
                            <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.5 }}
                                className="text-sm font-medium text-foreground/70 dark:text-muted-foreground"
                            >
                                Me suivre
                            </motion.span>
                            
                            <motion.span 
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "3rem", opacity: 1 }}
                                transition={{ 
                                    width: { duration: 0.6, delay: 1.6 },
                                    opacity: { duration: 0.3, delay: 1.7 }
                                }}
                                className="h-px bg-foreground/30 dark:bg-border/50"
                            />
                            
                            <div className="flex space-x-3">
                                {socialLinks.map((link, index) => (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, scale: 0, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ 
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 1.7 + (index * 0.1) 
                                        }}
                                        whileHover={floatAnimation}
                                    >
                                        <motion.a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.label}
                                            className={cn(
                                                "p-2 rounded-full border border-border/40 dark:border-border/20 text-foreground/70 dark:text-foreground/70",
                                                "hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all",
                                                link.color
                                            )}
                                            whileHover={{ 
                                                boxShadow: "0 0 15px rgba(var(--primary), 0.2)",
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {link.icon}
                                            
                                            {/* Icon glow effect */}
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                whileHover={{ 
                                                    opacity: [0, 0.5, 0], 
                                                    scale: [1, 1.8, 1] 
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    repeatType: "loop"
                                                }}
                                                className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                                            />
                                        </motion.a>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
                
                {/* Scroll down indicator with enhanced animations */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                        opacity: isLoaded ? [0, 1] : 0, 
                        y: isLoaded ? [10, 0] : -10 
                    }}
                    transition={{ 
                        opacity: { delay: 2, duration: 0.8 },
                        y: { delay: 2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
                    }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                >
                    <motion.span 
                        animate={{ 
                            y: [0, -5, 0],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatType: 'reverse',
                            ease: "easeInOut" 
                        }}
                        className="text-sm font-medium text-foreground/70 dark:text-muted-foreground mb-2"
                    >
                        Découvrir
                    </motion.span>
                    
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        animate={{ 
                            y: [0, 8, 0], 
                            boxShadow: [
                                "0 0 0 rgba(0,0,0,0)", 
                                "0 0 15px rgba(var(--primary), 0.3)", 
                                "0 0 0 rgba(0,0,0,0)"
                            ]
                        }}
                        transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            repeatType: 'reverse',
                            ease: [0.76, 0, 0.24, 1]
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-foreground/30 dark:border-border/30 relative"
                    >
                        {/* Pulse effect */}
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0, 0.3],
                                borderWidth: ["0px", "2px", "0px"]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 rounded-full border-primary/30"
                        />
                        
                        <motion.div
                            animate={{ y: [0, 3, 0] }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                repeatType: 'reverse',
                                ease: "easeInOut" 
                            }}
                        >
                            <motion.div
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                <ChevronDown className="h-6 w-6 text-primary" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
} 