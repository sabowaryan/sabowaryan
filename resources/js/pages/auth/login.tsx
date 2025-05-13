import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Mail, Lock, AlertCircle, CheckCircle2, XCircle, Shield, HelpCircle, Sparkles } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetaTags } from '@/components/Seo/MetaTags';
import { JsonLdBreadcrumb } from '@/components/Seo/JsonLd';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import AuthLayout from '@/layouts/auth-layout';
import { Card, CardContent } from '@/components/ui/card';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const markAsTouched = (field: string) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

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
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    const socialButtonVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: { delay: 0.4 + (i * 0.1), duration: 0.3 }
        }),
        hover: { scale: 1.03, transition: { duration: 0.2 } },
        tap: { scale: 0.97, transition: { duration: 0.1 } }
    };

    return (
        <AuthLayout title="Bienvenue" description="Entrez vos identifiants pour accéder à votre compte">
            <MetaTags 
                title="Connexion | SabowaRyan"
                description="Connectez-vous à votre compte SabowaRyan pour accéder à vos tutoriels, projets et ressources personnalisées."
                canonical={window.location.href}
                type="website"
            />
            <JsonLdBreadcrumb 
                items={[
                    { name: 'Accueil', url: '/' },
                    { name: 'Connexion', url: '/login' }
                ]}
            />

            <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Effet de particules en arrière-plan */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: Math.random() * window.innerHeight,
                                    scale: 0
                                }}
                                animate={{
                                    y: [null, Math.random() * window.innerHeight],
                                    scale: [0, 1, 0],
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 3 + 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                <motion.form 
                    className="flex flex-col gap-6" 
                    onSubmit={submit}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Card className="border-none shadow-lg bg-background/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <motion.div 
                                className="flex items-center justify-center mb-6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Sparkles className="h-8 w-8 text-primary" />
                                </div>
                            </motion.div>

                            {status && (
                                <motion.div 
                                    className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/30 dark:text-emerald-400"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    role="alert"
                                >
                                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm font-medium">{status}</p>
                                </motion.div>
                            )}

                            <div className="grid gap-6">
                                <motion.div 
                                    className="grid gap-2" 
                                    variants={itemVariants}
                                    custom={0}
                                >
                                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                                        <Mail className="h-4 w-4" />
                                        Adresse email <span className="text-destructive ml-1">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            onBlur={() => markAsTouched('email')}
                                            placeholder="exemple@email.com"
                                            className={cn(
                                                "pr-10 transition-all duration-200",
                                                "group-hover:border-primary/50",
                                                touchedFields.email && (
                                                    errors.email 
                                                        ? "border-destructive focus-visible:ring-destructive/30" 
                                                        : data.email 
                                                            ? "border-emerald-500 focus-visible:ring-emerald-500/30" 
                                                            : ""
                                                )
                                            )}
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                            aria-describedby={errors.email ? 'email-error' : undefined}
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
                                    <InputError message={errors.email} id="email-error" />
                                </motion.div>

                                <motion.div 
                                    className="grid gap-2"
                                    variants={itemVariants}
                                    custom={1}
                                >
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                                            <Lock className="h-4 w-4" />
                                            Mot de passe <span className="text-destructive ml-1">*</span>
                                        </Label>
                                        {canResetPassword && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <TextLink href={route('password.request')} className="text-xs hover:text-primary transition-colors" tabIndex={5}>
                                                    Mot de passe oublié ?
                                                </TextLink>
                                            </motion.div>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            onBlur={() => markAsTouched('password')}
                                            placeholder="Votre mot de passe"
                                            className={cn(
                                                "pr-10 transition-all duration-200",
                                                "group-hover:border-primary/50",
                                                touchedFields.password && (
                                                    errors.password 
                                                        ? "border-destructive focus-visible:ring-destructive/30" 
                                                        : data.password 
                                                            ? "border-emerald-500 focus-visible:ring-emerald-500/30" 
                                                            : ""
                                                )
                                            )}
                                            aria-invalid={errors.password ? 'true' : 'false'}
                                            aria-describedby={errors.password ? 'password-error' : undefined}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">{showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}</span>
                                        </button>
                                    </div>
                                    <InputError message={errors.password} id="password-error" />
                                </motion.div>

                                <motion.div 
                                    className="flex items-center space-x-3"
                                    variants={itemVariants}
                                    custom={2}
                                >
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                        tabIndex={4}
                                    />
                                    <Label htmlFor="remember" className="text-sm">Se souvenir de moi</Label>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    custom={3}
                                >
                                    <Button 
                                        type="submit" 
                                        className="w-full h-11 relative overflow-hidden group"
                                        disabled={processing}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                                            initial={{ x: '-100%' }}
                                            animate={{ x: processing ? '100%' : '-100%' }}
                                            transition={{ duration: 1, repeat: processing ? Infinity : 0 }}
                                        />
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                Connexion en cours...
                                            </>
                                        ) : (
                                            'Se connecter'
                                        )}
                                    </Button>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>

                    <motion.div 
                        className="text-center"
                        variants={itemVariants}
                        custom={4}
                    >
                        <span className="text-sm text-muted-foreground">
                            Vous n'avez pas de compte ?{' '}
                            <TextLink href={route('register')} className="font-medium hover:text-primary transition-colors" tabIndex={6}>
                                S'inscrire
                            </TextLink>
                        </span>
                    </motion.div>
                </motion.form>
            </motion.div>
        </AuthLayout>
    );
}
