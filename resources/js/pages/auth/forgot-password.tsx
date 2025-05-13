// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { motion } from 'framer-motion';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const markAsTouched = (field: string) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
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
            title="Mot de passe oublié" 
            description="Entrez votre adresse email pour recevoir un lien de réinitialisation"
        >
            <Head title="Mot de passe oublié" />

            {status && (
                <motion.div 
                    className="mb-6 text-center text-sm font-medium p-4 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {status}
                    </div>
                </motion.div>
            )}

            <motion.div 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.form 
                    onSubmit={submit}
                    variants={itemVariants}
                    custom={0}
                    className="space-y-6"
                >
                    <div className="grid gap-3">
                        <Label 
                            htmlFor="email" 
                            className="flex items-center text-sm font-medium"
                        >
                            Adresse email <span className="text-destructive ml-1">*</span>
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
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                onBlur={() => markAsTouched('email')}
                                placeholder="exemple@email.com"
                                className={cn(
                                    "pl-10 pr-10",
                                    touchedFields.email && (
                                        errors.email 
                                            ? "border-destructive focus-visible:ring-destructive/30" 
                                            : data.email 
                                                ? "border-emerald-500 focus-visible:ring-emerald-500/30" 
                                                : ""
                                    )
                                )}
                            />
                            {touchedFields.email && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {errors.email ? (
                                        <XCircle className="h-5 w-5 text-destructive" />
                                    ) : data.email ? (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    ) : null}
                                </div>
                            )}
                        </div>

                        {errors.email ? (
                            <div className="flex items-start text-sm text-destructive">
                                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{errors.email}</span>
                            </div>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                Nous vous enverrons un lien de réinitialisation à cette adresse
                            </p>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button 
                            className="w-full h-11" 
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : (
                                "Envoyer le lien de réinitialisation"
                            )}
                        </Button>
                    </div>
                </motion.form>

                <motion.div 
                    className="flex justify-center items-center pt-4"
                    variants={itemVariants}
                    custom={1}
                >
                    <TextLink 
                        href={route('login')} 
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour à la connexion
                    </TextLink>
                </motion.div>
                
                <motion.div 
                    className="pt-8 text-center"
                    variants={itemVariants}
                    custom={2}
                >
                    <div className="flex flex-col space-y-2 items-center rounded-lg p-4 bg-primary/5">
                        <p className="text-xs text-muted-foreground">
                            Vous n'avez pas encore de compte ?
                        </p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                            <TextLink href={route('register')}>
                                Créer un compte
                            </TextLink>
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AuthLayout>
    );
}
