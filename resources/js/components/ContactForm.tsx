import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import { 
    ArrowRight, 
    Calendar, 
    CheckCircle, 
    ChevronRight, 
    Clock, 
    Copy, 
    ExternalLink, 
    Github, 
    Globe, 
    Loader2, 
    Mail, 
    MapPin, 
    MessageSquare, 
    Phone, 
    RefreshCcw, 
    Send, 
    Sparkles, 
    User, 
    X, 
    Linkedin
} from 'lucide-react';

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

interface FormField {
    value: string;
    touched: boolean;
    focused: boolean;
}

type ProjectType = 'website' | 'app' | 'design' | 'other';

export function ContactForm() {
    // Form state with extended field properties
    const [formState, setFormState] = useState({
        name: { value: '', touched: false, focused: false },
        email: { value: '', touched: false, focused: false },
        subject: { value: '', touched: false, focused: false },
        message: { value: '', touched: false, focused: false }
    });
    
    // Project type selection
    const [projectType, setProjectType] = useState<ProjectType>('website');
    
    // Form submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [formProgress, setFormProgress] = useState(0);
    
    // Calculate form progress
    useEffect(() => {
        const fields = Object.values(formState).filter(field => field.touched && field.value.trim() !== '').length;
        const total = Object.keys(formState).length;
        setFormProgress(Math.round((fields / total) * 100));
    }, [formState]);
    
    // Validate form fields
    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'name':
                return value.trim().length < 2 
                    ? 'Le nom doit contenir au moins 2 caractères' 
                    : undefined;
            case 'email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
                    ? 'Veuillez entrer une adresse email valide' 
                    : undefined;
            case 'subject':
                return value.trim().length < 3 
                    ? 'Le sujet doit contenir au moins 3 caractères'
                    : undefined;
            case 'message':
                return value.trim().length < 10 
                    ? 'Votre message doit contenir au moins 10 caractères' 
                    : undefined;
            default:
                return undefined;
        }
    };
    
    // Handle input changes with validation
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormState(prev => ({
            ...prev,
            [name]: {
                ...prev[name as keyof typeof prev],
                value,
                touched: true
            }
        }));
        
        // Validate field and update errors
        const error = validateField(name, value);
        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };
    
    // Handle input focus state
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: {
                ...prev[name as keyof typeof prev],
                focused: true
            }
        }));
    };
    
    // Handle input blur state
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: {
                ...prev[name as keyof typeof prev],
                focused: false,
                touched: true
            }
        }));
        
        // Validate field on blur
        const error = validateField(name, value);
        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };
    
    // Full form validation
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;
        
        // Validate each field
        Object.entries(formState).forEach(([name, field]) => {
            const error = validateField(name, field.value);
            if (error) {
                newErrors[name as keyof FormErrors] = error;
                isValid = false;
            }
        });
        
        setFormErrors(newErrors);
        return isValid;
    };
    
    // Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            // Mark all fields as touched to show errors
            setFormState(prev => {
                const newState = { ...prev };
                Object.keys(newState).forEach(key => {
                    newState[key as keyof typeof newState].touched = true;
                });
                return newState;
            });
            return;
        }
        
        setIsSubmitting(true);
        
        // Préparer les données à envoyer
        const formData = {
            name: formState.name.value,
            email: formState.email.value,
            subject: formState.subject.value,
            message: formState.message.value,
            projectType: projectType
        };
        
        // Utiliser Inertia pour soumettre le formulaire
        router.post('/contact/send', formData, {
            onSuccess: () => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setShowSuccessMessage(true);
                
                // Reset form after delay
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    
                    // Reset form state after completion animation
                    setTimeout(() => {
                        setIsSubmitted(false);
                        setFormState({
                            name: { value: '', touched: false, focused: false },
                            email: { value: '', touched: false, focused: false },
                            subject: { value: '', touched: false, focused: false },
                            message: { value: '', touched: false, focused: false }
                        });
                        setProjectType('website');
                    }, 300);
                }, 4000);
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setFormErrors(errors as FormErrors);
                console.error('Form submission error:', errors);
            }
        });
    };
    
    // Reset form handler
    const resetForm = () => {
        setFormState({
            name: { value: '', touched: false, focused: false },
            email: { value: '', touched: false, focused: false },
            subject: { value: '', touched: false, focused: false },
            message: { value: '', touched: false, focused: false }
        });
        setProjectType('website');
        setFormErrors({});
    };

    return (
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>
            
            <div className={SITE_CONTAINER}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-block text-sm font-medium text-primary mb-3 px-3 py-1 bg-primary/5 backdrop-blur-sm rounded-full border border-primary/20"
                    >
                        Discutons de votre projet
                    </motion.span>
                    
                    <motion.h2 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Me Contacter
                    </motion.h2>
                    
                    <motion.p 
                        className="text-base md:text-lg text-foreground/80 dark:text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter pour discuter de vos besoins et voir comment je peux vous aider.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10 max-w-5xl mx-auto">
                    {/* Informations de contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <div className="sticky top-20 space-y-4 md:space-y-6">
                            {/* Card principale */}
                            <div className="bg-card/90 backdrop-blur-sm shadow-lg p-6 md:p-8 rounded-2xl border border-border/50 relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
                                
                                <h3 className="text-xl md:text-2xl font-semibold mb-2">Parlons de votre projet</h3>
                                <p className="text-foreground/70 dark:text-muted-foreground mb-6 md:mb-8">Contactez-moi via le formulaire ou les coordonnées ci-dessous :</p>
                                
                                <ul className="space-y-5 md:space-y-6">
                                    <li className="flex items-start transform transition-transform hover:translate-x-1 duration-200">
                                        <div className="bg-primary/10 p-2.5 md:p-3 rounded-full mr-4">
                                            <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a 
                                                href="mailto:contact@sabowaryan.dev" 
                                                className="text-foreground/70 hover:text-primary transition-colors flex items-center group dark:text-muted-foreground text-sm md:text-base"
                                            >
                                                contact@sabowaryan.dev
                                                <ChevronRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start transform transition-transform hover:translate-x-1 duration-200">
                                        <div className="bg-primary/10 p-2.5 md:p-3 rounded-full mr-4">
                                            <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Téléphone</p>
                                            <a 
                                                href="tel:+33601020304" 
                                                className="text-foreground/70 hover:text-primary transition-colors flex items-center group dark:text-muted-foreground text-sm md:text-base"
                                            >
                                                +33 6 01 02 03 04
                                                <ChevronRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </div>
                                    </li>
                                    
                                    <li className="flex items-start transform transition-transform hover:translate-x-1 duration-200">
                                        <div className="bg-primary/10 p-2.5 md:p-3 rounded-full mr-4">
                                            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Localisation</p>
                                            <p className="text-foreground/70 dark:text-muted-foreground text-sm md:text-base">Paris, France</p>
                                        </div>
                                    </li>
                                </ul>
                                
                                <div className="mt-8 pt-6 border-t border-border/50">
                                    <p className="font-medium mb-3 md:mb-4">Retrouvez-moi sur</p>
                                    <div className="flex gap-3">
                                        <a 
                                            href="https://github.com/sabowaryan" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2.5 md:p-3 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors group"
                                            aria-label="GitHub"
                                        >
                                            <Github className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </a>
                                        <a 
                                            href="https://linkedin.com/in/sabowaryan" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2.5 md:p-3 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors group"
                                            aria-label="LinkedIn"
                                        >
                                            <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </a>
                                        <a 
                                            href="https://sabowaryan.dev" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2.5 md:p-3 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors group"
                                            aria-label="Site web"
                                        >
                                            <Globe className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Disponibilité */}
                            <div className="bg-primary/5 p-5 md:p-6 rounded-xl border border-primary/10">
                                <div className="flex items-center mb-3 md:mb-4">
                                    <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
                                    <h4 className="font-medium">Disponibilité actuelle</h4>
                                </div>
                                <div className="flex items-center text-sm mb-2 text-foreground/70 dark:text-muted-foreground">
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 mr-2" />
                                    <span>Disponible pour nouveaux projets</span>
                                </div>
                                <div className="flex items-center text-sm text-foreground/70 dark:text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                                    <span>Réponse sous 24-48h</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Formulaire */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        {showSuccessMessage ? (
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="h-full flex items-center justify-center p-6 md:p-12 bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg"
                            >
                                <div className="text-center">
                                    <div className="relative mx-auto w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mb-5 md:mb-6">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
                                        <div className="relative bg-primary/10 p-4 md:p-5 rounded-full">
                                            <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Message envoyé!</h3>
                                    <p className="text-foreground/70 dark:text-muted-foreground max-w-md mb-5 md:mb-6">
                                        Merci pour votre message. Je vous répondrai dans les plus brefs délais. À très bientôt !
                                    </p>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setShowSuccessMessage(false)}
                                    >
                                        <RefreshCcw className="mr-2 h-4 w-4" />
                                        Envoyer un autre message
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg overflow-hidden">
                                {/* Progress bar */}
                                <div className="h-1 w-full bg-muted">
                                    <motion.div 
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${formProgress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                
                                {/* Form header */}
                                <div className="px-6 md:px-8 py-4 md:py-6 border-b border-border/50">
                                    <h3 className="text-lg md:text-xl font-semibold flex items-center">
                                        <MessageSquare className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary" />
                                        Envoyez-moi un message
                                    </h3>
                                    <p className="text-xs md:text-sm text-foreground/70 dark:text-muted-foreground">
                                        Tous les champs marqués d'un <span className="text-primary">*</span> sont obligatoires
                                    </p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                                    <div className="space-y-5 md:space-y-6">
                                        {/* Type de projet */}
                                        <div className="mb-6 md:mb-8">
                                            <Label className="mb-3 block text-foreground dark:text-foreground text-sm md:text-base">Type de projet</Label>
                                            <RadioGroup 
                                                value={projectType} 
                                                onValueChange={(value: string) => setProjectType(value as ProjectType)}
                                                className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3"
                                            >
                                                <div 
                                                    className={cn(
                                                        "border rounded-lg px-3 md:px-4 py-2 md:py-3 cursor-pointer transition-all duration-200",
                                                        projectType === 'website' ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"
                                                    )}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="website" id="website" />
                                                        <Label htmlFor="website" className="font-normal cursor-pointer text-sm md:text-base">
                                                            Site web
                                                        </Label>
                                                    </div>
                                                </div>
                                                <div 
                                                    className={cn(
                                                        "border rounded-lg px-3 md:px-4 py-2 md:py-3 cursor-pointer transition-all duration-200",
                                                        projectType === 'app' ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"
                                                    )}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="app" id="app" />
                                                        <Label htmlFor="app" className="font-normal cursor-pointer text-sm md:text-base">
                                                            Application
                                                        </Label>
                                                    </div>
                                                </div>
                                                <div 
                                                    className={cn(
                                                        "border rounded-lg px-3 md:px-4 py-2 md:py-3 cursor-pointer transition-all duration-200",
                                                        projectType === 'design' ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"
                                                    )}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="design" id="design" />
                                                        <Label htmlFor="design" className="font-normal cursor-pointer text-sm md:text-base">
                                                            Design
                                                        </Label>
                                                    </div>
                                                </div>
                                                <div 
                                                    className={cn(
                                                        "border rounded-lg px-3 md:px-4 py-2 md:py-3 cursor-pointer transition-all duration-200",
                                                        projectType === 'other' ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"
                                                    )}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="other" id="other" />
                                                        <Label htmlFor="other" className="font-normal cursor-pointer text-sm md:text-base">
                                                            Autre
                                                        </Label>
                                                    </div>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                                            {/* Nom */}
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="flex items-center text-foreground dark:text-foreground text-sm md:text-base">
                                                    <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                                                        <User className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                                                    </div>
                                                    Nom <span className="text-primary ml-1">*</span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        placeholder="Votre nom"
                                                        value={formState.name.value}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        required
                                                        className={cn(
                                                            "bg-background/50 pr-10 transition-all placeholder:text-foreground/40 dark:placeholder:text-muted-foreground/60 text-sm md:text-base h-10 md:h-11",
                                                            formState.name.touched && formErrors.name
                                                                ? "border-red-400 ring-red-300/30"
                                                                : formState.name.touched && formState.name.value
                                                                    ? "border-green-400 ring-green-300/20"
                                                                    : ""
                                                        )}
                                                    />
                                                    
                                                    {formState.name.touched && formState.name.value && !formErrors.name && (
                                                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                                    )}
                                                </div>
                                                {formState.name.touched && formErrors.name && (
                                                    <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                                                )}
                                            </div>
                                            
                                            {/* Email */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center text-foreground dark:text-foreground text-sm md:text-base">
                                                    <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                                                        <Mail className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                                                    </div>
                                                    Email <span className="text-primary ml-1">*</span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="votre@email.com"
                                                        value={formState.email.value}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        required
                                                        className={cn(
                                                            "bg-background/50 pr-10 transition-all placeholder:text-foreground/40 dark:placeholder:text-muted-foreground/60 text-sm md:text-base h-10 md:h-11",
                                                            formState.email.touched && formErrors.email
                                                                ? "border-red-400 ring-red-300/30"
                                                                : formState.email.touched && formState.email.value
                                                                    ? "border-green-400 ring-green-300/20"
                                                                    : ""
                                                        )}
                                                    />
                                                    
                                                    {formState.email.touched && formState.email.value && !formErrors.email && (
                                                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                                    )}
                                                </div>
                                                {formState.email.touched && formErrors.email && (
                                                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Sujet */}
                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="flex items-center text-foreground dark:text-foreground text-sm md:text-base">
                                                <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                                                    <MessageSquare className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                                                </div>
                                                Sujet <span className="text-primary ml-1">*</span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    placeholder="Sujet de votre message"
                                                    value={formState.subject.value}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    required
                                                    className={cn(
                                                        "bg-background/50 pr-10 transition-all placeholder:text-foreground/40 dark:placeholder:text-muted-foreground/60 text-sm md:text-base h-10 md:h-11",
                                                        formState.subject.touched && formErrors.subject
                                                            ? "border-red-400 ring-red-300/30"
                                                            : formState.subject.touched && formState.subject.value
                                                                ? "border-green-400 ring-green-300/20"
                                                                : ""
                                                    )}
                                                />
                                                
                                                {formState.subject.touched && formState.subject.value && !formErrors.subject && (
                                                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                                )}
                                            </div>
                                            {formState.subject.touched && formErrors.subject && (
                                                <p className="text-xs text-red-500 mt-1">{formErrors.subject}</p>
                                            )}
                                        </div>
                                        
                                        {/* Message */}
                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="flex items-center text-foreground dark:text-foreground text-sm md:text-base">
                                                <div className="bg-primary/10 p-1.5 rounded-md mr-2">
                                                    <MessageSquare className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                                                </div>
                                                Message <span className="text-primary ml-1">*</span>
                                            </Label>
                                            <div className="relative">
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    placeholder="Comment puis-je vous aider ?"
                                                    value={formState.message.value}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    required
                                                    className={cn(
                                                        "min-h-[120px] md:min-h-[150px] bg-background/50 resize-none transition-all placeholder:text-foreground/40 dark:placeholder:text-muted-foreground/60 text-sm md:text-base",
                                                        formState.message.touched && formErrors.message
                                                            ? "border-red-400 ring-red-300/30"
                                                            : formState.message.touched && formState.message.value
                                                                ? "border-green-400 ring-green-300/20"
                                                                : ""
                                                    )}
                                                />
                                                
                                                {/* Character counter */}
                                                <div className="absolute right-3 bottom-3 text-xs text-foreground/60 dark:text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded">
                                                    {formState.message.value.length} caractères
                                                </div>
                                            </div>
                                            {formState.message.touched && formErrors.message && (
                                                <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>
                                            )}
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                            <Button 
                                                type="submit" 
                                                disabled={isSubmitting} 
                                                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all h-10 md:h-11 text-sm md:text-base"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Envoi en cours...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Envoyer le message
                                                    </>
                                                )}
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={resetForm}
                                                disabled={isSubmitting}
                                                className="h-10 md:h-11 text-sm md:text-base"
                                            >
                                                <X className="mr-2 h-4 w-4" />
                                                Réinitialiser
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 