import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, KeyRound } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface PasswordRequirement {
    label: string;
    isMet: (password: string) => boolean;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
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

    return (
        <AuthLayout title="Réinitialisation du mot de passe" description="Veuillez entrer votre nouveau mot de passe ci-dessous">
            <Head title="Réinitialisation du mot de passe" />

            <motion.div
                className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 dark:bg-blue-950/30 dark:border-blue-900/50 dark:text-blue-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-start">
                    <KeyRound className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                        Vous êtes sur le point de créer un nouveau mot de passe pour le compte associé à <strong>{data.email}</strong>. Assurez-vous de choisir un mot de passe fort et sécurisé.
                    </p>
                </div>
            </motion.div>

            <motion.form 
                onSubmit={submit}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6"
            >
                <div className="grid gap-6">
                    <motion.div 
                        className="grid gap-2"
                        variants={itemVariants}
                        custom={0}
                    >
                        <Label 
                            htmlFor="email"
                            className="flex items-center text-sm font-medium"
                        >
                            Adresse email
                        </Label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={data.email}
                                className="pl-10 bg-muted/50"
                                readOnly
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </motion.div>

                    <motion.div 
                        className="grid gap-2"
                        variants={itemVariants}
                        custom={1}
                    >
                        <Label 
                            htmlFor="password"
                            className="flex items-center text-sm font-medium"
                        >
                            Nouveau mot de passe <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Lock className="h-4 w-4" />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="new-password"
                                value={data.password}
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                onBlur={() => markAsTouched('password')}
                                placeholder="Nouveau mot de passe"
                                className={cn(
                                    "pl-10 pr-10",
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                        
                        {data.password && (
                            <div className="mt-2 space-y-2">
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
                                        <div 
                                            key={i} 
                                            className="flex items-center text-xs"
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {errors.password && (
                            <div className="flex items-start text-sm text-destructive">
                                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{errors.password}</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.div 
                        className="grid gap-2"
                        variants={itemVariants}
                        custom={2}
                    >
                        <Label 
                            htmlFor="password_confirmation"
                            className="flex items-center text-sm font-medium"
                        >
                            Confirmer le mot de passe <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Lock className="h-4 w-4" />
                            </div>
                            <Input
                                id="password_confirmation"
                                type={showConfirmPassword ? "text" : "password"}
                                name="password_confirmation"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                onBlur={() => markAsTouched('password_confirmation')}
                                placeholder="Confirmez votre mot de passe"
                                className={cn(
                                    "pl-10 pr-10",
                                    touchedFields.password_confirmation && data.password_confirmation && (
                                        isPasswordMatching()
                                            ? "border-emerald-500 focus-visible:ring-emerald-500/30"
                                            : "border-destructive focus-visible:ring-destructive/30"
                                    )
                                )}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">{showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}</span>
                            </button>
                        </div>
                        {touchedFields.password_confirmation && data.password_confirmation && (
                            <div className="flex items-center mt-1 text-xs">
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
                            </div>
                        )}
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        custom={3}
                    >
                        <Button 
                            type="submit" 
                            className="mt-4 w-full h-11" 
                            disabled={processing || !isPasswordValid() || !isPasswordMatching()}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                                    Réinitialisation en cours...
                                </>
                            ) : (
                                <>
                                    <KeyRound className="h-5 w-5 mr-2" />
                                    Réinitialiser le mot de passe
                                </>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </motion.form>
        </AuthLayout>
    );
}
