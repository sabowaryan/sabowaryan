// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { motion } from 'framer-motion';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const markAsTouched = (field: string) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
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

    return (
        <AuthLayout
            title="Confirmer votre mot de passe"
            description="Il s'agit d'une zone sécurisée de l'application. Veuillez confirmer votre mot de passe avant de continuer."
        >
            <Head title="Confirmer le mot de passe" />

            <motion.div
                className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 dark:bg-blue-950/30 dark:border-blue-900/50 dark:text-blue-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-start">
                    <Shield className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                        Pour votre sécurité, cette opération nécessite une confirmation de votre mot de passe. Cela permet de protéger vos informations sensibles.
                    </p>
                </div>
            </motion.div>

            <motion.form 
                onSubmit={submit}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="space-y-6">
                    <motion.div 
                        className="grid gap-3"
                        variants={itemVariants}
                        custom={0}
                    >
                        <Label 
                            htmlFor="password" 
                            className="flex items-center text-sm font-medium"
                        >
                            Mot de passe <span className="text-destructive ml-1">*</span>
                        </Label>
                        
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Lock className="h-4 w-4" />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Votre mot de passe"
                                autoComplete="current-password"
                                value={data.password}
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                onBlur={() => markAsTouched('password')}
                                className={cn(
                                    "pl-10 pr-10",
                                    touchedFields.password && errors.password 
                                        ? "border-destructive focus-visible:ring-destructive/30" 
                                        : ""
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

                        {errors.password && (
                            <div className="flex items-start text-sm text-destructive">
                                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{errors.password}</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.div 
                        className="flex items-center"
                        variants={itemVariants}
                        custom={1}
                    >
                        <Button 
                            className="w-full h-11"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                                    Vérification en cours...
                                </>
                            ) : (
                                <>
                                    <Shield className="h-5 w-5 mr-2" />
                                    Confirmer et continuer
                                </>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </motion.form>

            <motion.div 
                className="mt-8 text-center text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
            >
                Pour annuler cette opération, fermez cette fenêtre ou naviguez vers une autre page.
            </motion.div>
        </AuthLayout>
    );
}
