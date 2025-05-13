import { Head, useForm, router } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, LockKeyhole, User, Mail, GraduationCap, Briefcase, UserPlus, ArrowRight, ArrowLeft, ShieldAlert, HelpCircle, FileText, Shield, Cookie, Lock } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { MetaTags } from '@/components/Seo/MetaTags';
import { JsonLdBreadcrumb } from '@/components/Seo/JsonLd';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import AuthLayout from '@/layouts/auth-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
};

type Step = {
    id: number;
    title: string;
    description: string;
};

interface PasswordRequirement {
    label: string;
    isMet: (password: string) => boolean;
}

export default function Register() {
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '');
    const roleParam = searchParams.get('role');
    const [securityWarning, setSecurityWarning] = useState<string | null>(null);

    // Définition stricte des rôles autorisés
    const allowedRoles = ['student', 'instructor', 'client'] as const;
    type AllowedRole = typeof allowedRoles[number];

    const roleRestrictions = {
        instructor: {
            requiresVerification: false,
            message: ""
        },
        client: {
            requiresVerification: false,
            message: ""
        }
    } as const;

    // Validation stricte du rôle
    const isValidRole = (role: string | null): role is AllowedRole => {
        if (!role) return false;
        return allowedRoles.includes(role as AllowedRole);
    };

    // Redirection si le rôle n'est pas valide
    useEffect(() => {
        if (roleParam && !isValidRole(roleParam)) {
            setSecurityWarning("Rôle non autorisé détecté. Redirection vers le formulaire standard.");
            // Redirection vers le formulaire standard après un court délai
            const timer = setTimeout(() => {
                router.visit('/register', { preserveState: false });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [roleParam]);

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: isValidRole(roleParam) ? roleParam : 'student',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const [activeTab, setActiveTab] = useState<AllowedRole>(
        isValidRole(roleParam) ? roleParam : 'student'
    );

    const steps: Step[] = [
        {
            id: 1,
            title: "Choisissez votre profil",
            description: "Sélectionnez le type de compte qui correspond le mieux à vos besoins"
        },
        {
            id: 2,
            title: "Informations personnelles",
            description: "Entrez vos informations de base pour créer votre compte"
        },
        {
            id: 3,
            title: "Sécurité du compte",
            description: "Créez un mot de passe sécurisé pour protéger votre compte"
        }
    ];

    // Définition des exigences pour le mot de passe
    const passwordRequirements: PasswordRequirement[] = [
        { label: '8 caractères minimum', isMet: (pw) => pw.length >= 8 },
        { label: 'Au moins une lettre majuscule', isMet: (pw) => /[A-Z]/.test(pw) },
        { label: 'Au moins une lettre minuscule', isMet: (pw) => /[a-z]/.test(pw) },
        { label: 'Au moins un chiffre', isMet: (pw) => /[0-9]/.test(pw) },
        { label: 'Au moins un caractère spécial (@$!%*?&)', isMet: (pw) => /[@$!%*?&]/.test(pw) },
    ];

    // Calcul de la force du mot de passe
    useEffect(() => {
        if (!data.password) {
            setPasswordStrength(0);
            return;
        }

        const metRequirements = passwordRequirements.filter(req => req.isMet(data.password)).length;
        const strength = Math.round((metRequirements / passwordRequirements.length) * 100);
        setPasswordStrength(strength);
    }, [data.password]);

    const getStrengthColor = () => {
        if (passwordStrength < 30) return 'bg-destructive';
        if (passwordStrength < 70) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    const getStrengthText = () => {
        if (passwordStrength < 30) return 'Faible';
        if (passwordStrength < 70) return 'Moyen';
        return 'Fort';
    };

    const markAsTouched = (field: string) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    };

    const isPasswordValid = () => {
        return passwordRequirements.every(req => req.isMet(data.password));
    };

    const isPasswordMatching = () => {
        return data.password === data.password_confirmation && data.password_confirmation !== '';
    };

    const handleRoleChange = (value: string) => {
        if (isValidRole(value)) {
            setData('role', value);
            setActiveTab(value);
            setSecurityWarning(null);
        }
    };

    const roleDescriptions = {
        student: {
            title: "Étudiant",
            description: "Accédez à des tutoriels de qualité pour développer vos compétences",
            icon: GraduationCap,
            features: [
                "Tutoriels gratuits et premium",
                "Exercices pratiques guidés",
                "Suivi de progression",
                "Certificats de complétion",
                "Accès à la communauté"
            ]
        },
        instructor: {
            title: "Instructeur",
            description: "Partagez vos connaissances et créez du contenu",
            icon: UserPlus,
            features: [
                "Création de tutoriels",
                "Gestion des étudiants",
                "Statistiques détaillées",
                "Monétisation possible"
            ]
        },
        client: {
            title: "Client",
            description: "Commandez vos projets digitaux avec paiement et livraison sécurisés",
            icon: Briefcase,
            features: [
                "Projets digitaux sur mesure",
                "Paiement sécurisé",
                "Livraison garantie",
                "Suivi en temps réel",
                "Support prioritaire"
            ]
        }
    } as const;

    const RoleIcon = ({ role }: { role: keyof typeof roleDescriptions }) => {
        const Icon = roleDescriptions[role].icon;
        return <Icon className="h-8 w-8 text-primary" />;
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({ 
            opacity: 1, 
            y: 0, 
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    const isStepValid = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!data.role;
            case 2:
                return !!data.name && !!data.email && !errors.name && !errors.email;
            case 3:
                return isPasswordValid() && isPasswordMatching();
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isStepValid(currentStep)) {
            if (currentStep < steps.length) {
                handleNext();
            } else {
                post(route('register'), {
                    onFinish: () => reset('password', 'password_confirmation'),
                });
            }
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <Tabs value={activeTab} onValueChange={handleRoleChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50 rounded-xl">
                                {Object.entries(roleDescriptions).map(([key, role]) => (
                                    <TabsTrigger
                                        key={key}
                                        value={key}
                                        className={cn(
                                            "flex flex-col items-center gap-2 py-4 px-2 rounded-lg transition-all duration-200",
                                            "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                                            "hover:bg-muted/80"
                                        )}
                                    >
                                        <role.icon className={cn(
                                            "h-6 w-6 transition-colors duration-200",
                                            "data-[state=active]:text-primary"
                                        )} />
                                        <span className="text-sm font-medium">{role.title}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <AnimatePresence mode="wait">
                                <TabsContent value={activeTab} className="mt-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-start gap-4 p-6 rounded-xl bg-muted/50">
                                            <div className="p-3 rounded-lg bg-primary/10">
                                                <RoleIcon role={activeTab as keyof typeof roleDescriptions} />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-semibold">
                                                    {roleDescriptions[activeTab as keyof typeof roleDescriptions].title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {roleDescriptions[activeTab as keyof typeof roleDescriptions].description}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid gap-3">
                                            <h4 className="text-sm font-medium text-muted-foreground">Fonctionnalités incluses :</h4>
                                            <div className="grid gap-2">
                                                {roleDescriptions[activeTab as keyof typeof roleDescriptions].features.map((feature, index) => (
                                                    <motion.div
                                                        key={feature}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-center gap-2 text-sm"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                                        <span>{feature}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <motion.div 
                            className="grid gap-2" 
                            variants={itemVariants}
                            custom={0}
                        >
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Nom complet <span className="text-destructive ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    onBlur={() => markAsTouched('name')}
                                    disabled={processing}
                                    placeholder="Votre nom complet"
                                    className={cn(
                                        "pr-10",
                                        touchedFields.name && (
                                            errors.name 
                                                ? "border-destructive focus-visible:ring-destructive/30" 
                                                : data.name 
                                                    ? "border-emerald-500 focus-visible:ring-emerald-500/30" 
                                                    : ""
                                        )
                                    )}
                                />
                                <AnimatePresence>
                                    {touchedFields.name && (
                                        <motion.div 
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                        >
                                            {errors.name ? (
                                                <XCircle className="h-5 w-5 text-destructive" />
                                            ) : data.name ? (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                            ) : null}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <InputError message={errors.name} className="mt-2" />
                        </motion.div>

                        <motion.div 
                            className="grid gap-2"
                            variants={itemVariants}
                            custom={1}
                        >
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Adresse email <span className="text-destructive ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    onBlur={() => markAsTouched('email')}
                                    disabled={processing}
                                    placeholder="exemple@email.com"
                                    className={cn(
                                        "pr-10",
                                        touchedFields.email && (
                                            errors.email 
                                                ? "border-destructive focus-visible:ring-destructive/30" 
                                                : data.email 
                                                    ? "border-emerald-500 focus-visible:ring-emerald-500/30" 
                                                    : ""
                                        )
                                    )}
                                />
                                <AnimatePresence>
                                    {touchedFields.email && (
                                        <motion.div 
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                        >
                                            {errors.email ? (
                                                <XCircle className="h-5 w-5 text-destructive" />
                                            ) : data.email ? (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                            ) : null}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <InputError message={errors.email} />
                        </motion.div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <motion.div 
                            className="grid gap-2"
                            variants={itemVariants}
                            custom={0}
                        >
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <LockKeyhole className="h-4 w-4" />
                                Mot de passe <span className="text-destructive ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    onBlur={() => markAsTouched('password')}
                                    disabled={processing}
                                    placeholder="Votre mot de passe"
                                    className={cn(
                                        "pr-10",
                                        touchedFields.password && (
                                            errors.password 
                                                ? "border-destructive focus-visible:ring-destructive/30" 
                                                : isPasswordValid() 
                                                    ? "border-emerald-500 focus-visible:ring-emerald-500/30" 
                                                    : ""
                                        )
                                    )}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            
                            {data.password && (
                                <motion.div 
                                    className="mt-2 space-y-2"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className="flex items-center justify-between text-xs">
                                        <span>Force du mot de passe:</span>
                                        <span className={cn(
                                            passwordStrength < 30 ? "text-destructive" : 
                                            passwordStrength < 70 ? "text-amber-500" : 
                                            "text-emerald-500"
                                        )}>
                                            {getStrengthText()}
                                        </span>
                                    </div>
                                    <Progress value={passwordStrength} className={cn("h-1", getStrengthColor())} />
                                    
                                    <div className="pt-2 space-y-1.5">
                                        {passwordRequirements.map((req, i) => (
                                            <motion.div 
                                                key={i} 
                                                className="flex items-center text-xs"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                {req.isMet(data.password) ? (
                                                    <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                                                ) : (
                                                    <AlertCircle className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                                )}
                                                <span className={cn(
                                                    req.isMet(data.password) 
                                                        ? "text-emerald-500" 
                                                        : "text-muted-foreground"
                                                )}>
                                                    {req.label}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            
                            <InputError message={errors.password} />
                        </motion.div>

                        <motion.div 
                            className="grid gap-2"
                            variants={itemVariants}
                            custom={1}
                        >
                            <Label htmlFor="password_confirmation" className="flex items-center gap-2">
                                <LockKeyhole className="h-4 w-4" />
                                Confirmation du mot de passe <span className="text-destructive ml-1">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    onBlur={() => markAsTouched('password_confirmation')}
                                    disabled={processing}
                                    placeholder="Confirmez votre mot de passe"
                                    className={cn(
                                        "pr-10",
                                        touchedFields.password_confirmation && data.password_confirmation && (
                                            isPasswordMatching()
                                                ? "border-emerald-500 focus-visible:ring-emerald-500/30"
                                                : "border-destructive focus-visible:ring-destructive/30"
                                        )
                                    )}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <AnimatePresence>
                                {touchedFields.password_confirmation && data.password_confirmation && (
                                    <motion.div 
                                        className="flex items-center mt-1 text-xs"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        {isPasswordMatching() ? (
                                            <>
                                                <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                                                <span className="text-emerald-500">Les mots de passe correspondent</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-3.5 w-3.5 mr-2 text-destructive" />
                                                <span className="text-destructive">Les mots de passe ne correspondent pas</span>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <InputError message={errors.password_confirmation} />
                        </motion.div>
                    </motion.div>
                );
        }
    };

    return (
        <AuthLayout title="Créez votre compte" description="Entrez vos informations pour créer votre compte et commencer votre expérience">
            <MetaTags 
                title="Inscription "
                description="Créez votre compte sur SabowaRyan pour accéder à des tutoriels de qualité, des projets digitaux et une communauté d'apprenants passionnés."
                canonical={window.location.href}
                type="website"
            />
            <JsonLdBreadcrumb 
                items={[
                    { name: 'Accueil', url: '/' },
                    { name: 'Inscription', url: '/register' }
                ]}
            />
            <motion.form 
                className="flex flex-col gap-6" 
                onSubmit={submit}
                initial="hidden"
                animate="visible"
            >
                {securityWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800"
                    >
                        <ShieldAlert className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{securityWarning}</p>
                    </motion.div>
                )}

                <Card className="border-none shadow-none">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold">{steps[currentStep - 1].title}</CardTitle>
                                <CardDescription>{steps[currentStep - 1].description}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {steps.map((step) => (
                                    <div
                                        key={step.id}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-colors duration-200",
                                            currentStep === step.id ? "bg-primary" : "bg-muted"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <AnimatePresence mode="wait">
                            {renderStepContent()}
                        </AnimatePresence>

                        <div className="flex items-center justify-between mt-8">
                            {currentStep > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevious}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Précédent
                                </Button>
                            )}
                            <Button 
                                type="submit" 
                                className={cn(
                                    "gap-2",
                                    currentStep === steps.length ? "ml-auto" : ""
                                )}
                                disabled={processing || !isStepValid(currentStep)}
                            >
                                {processing ? (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                ) : currentStep === steps.length ? (
                                    "Créer mon compte"
                                ) : (
                                    <>
                                        Suivant
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <motion.div 
                    className="space-y-6 text-center"
                    variants={itemVariants}
                    custom={5}
                >
                    {/* Section principale */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <motion.div 
                            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="p-2 rounded-full bg-primary/10">
                                <UserPlus className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-sm font-medium">Déjà membre ?</p>
                            <TextLink 
                                href={route('login')} 
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                Se connecter
                                <ArrowRight className="h-4 w-4" />
                            </TextLink>
                        </motion.div>

                        <motion.div 
                            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="p-2 rounded-full bg-primary/10">
                                <HelpCircle className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-sm font-medium">Besoin d'aide ?</p>
                            <TextLink 
                                href={route('contact.index')} 
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                Contactez-nous
                                <ArrowRight className="h-4 w-4" />
                            </TextLink>
                        </motion.div>
                    </div>

                    {/* Séparateur avec animation */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <motion.span 
                                className="w-full border-t"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div className="relative flex justify-center">
                            <motion.span 
                                className="bg-background px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                En créant un compte, vous acceptez
                            </motion.span>
                        </div>
                    </div>

                    {/* Liens légaux avec animation */}
                    <motion.div 
                        className="flex flex-wrap justify-center gap-4 text-xs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {[
                            { href: '/terms', label: 'Conditions d\'utilisation', icon: FileText },
                            { href: '/privacy', label: 'Confidentialité', icon: Shield },
                            { href: '/cookies', label: 'Cookies', icon: Cookie },
                            { href: '/gdpr', label: 'Protection des données', icon: Lock }
                        ].map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <TextLink 
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <link.icon className="h-3.5 w-3.5" />
                                    {link.label}
                                </TextLink>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Copyright avec animation */}
                    <motion.p 
                        className="text-xs text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        © {new Date().getFullYear()} SabowaRyan. Tous droits réservés.
                    </motion.p>
                </motion.div>
            </motion.form>
        </AuthLayout>
    );
}
