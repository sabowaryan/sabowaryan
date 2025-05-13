// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, CheckCircle2, Mail, AlertTriangle, MailCheck, LogOut, RefreshCw } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { motion } from 'framer-motion';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});
    const [countdown, setCountdown] = useState<number | null>(null);
    const [emailSent, setEmailSent] = useState(status === 'verification-link-sent');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Start countdown after sending verification email
        setCountdown(60);
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev === null || prev <= 1) {
                    clearInterval(timer);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        setEmailSent(true);
        post(route('verification.send'));
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 }
        })
    };

    const pulseAnimation = {
        pulse: {
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AuthLayout 
            title="Vérifiez votre adresse email" 
            description="Pour finaliser votre inscription, veuillez vérifier votre adresse email en cliquant sur le lien que nous venons de vous envoyer."
        >
            <Head title="Vérification d'email" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col items-center"
            >
                {/* Email Icon */}
                <motion.div
                    className="relative mb-8"
                    variants={itemVariants}
                    custom={0}
                >
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <motion.div
                            animate="pulse"
                            variants={pulseAnimation}
                        >
                            <MailCheck className="h-12 w-12 text-primary" />
                        </motion.div>
                    </div>
                    {emailSent && (
                        <motion.div 
                            className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                            <CheckCircle2 className="h-5 w-5 text-white" />
                        </motion.div>
                    )}
                </motion.div>

                {/* Status message */}
                {status === 'verification-link-sent' && (
                    <motion.div 
                        className="mb-6 p-4 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 w-full"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0" />
                            <p className="text-sm">
                                Un nouveau lien de vérification a été envoyé à l'adresse email que vous avez fournie lors de votre inscription.
                            </p>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    variants={itemVariants}
                    custom={1}
                    className="text-center space-y-2 mb-8 max-w-md"
                >
                    <p className="text-sm text-muted-foreground">
                        Avant de commencer, veuillez vérifier votre boîte de réception pour le lien de vérification.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Si vous n'avez pas reçu l'email, cliquez sur le bouton ci-dessous pour en recevoir un nouveau.
                    </p>
                </motion.div>

                <motion.form 
                    onSubmit={submit} 
                    className="space-y-6 text-center w-full max-w-xs"
                    variants={itemVariants}
                    custom={2}
                >
                    <Button 
                        type="submit"
                        disabled={processing || countdown !== null}
                        variant="default"
                        className="w-full h-11"
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : countdown !== null ? (
                            <>
                                <RefreshCw className="h-5 w-5 mr-2" />
                                Réessayer dans {countdown}s
                            </>
                        ) : (
                            <>
                                <Mail className="h-5 w-5 mr-2" />
                                Renvoyer l'email de vérification
                            </>
                        )}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">ou</span>
                        </div>
                    </div>
                    
                    <Button 
                        variant="outline"
                        className="w-full"
                        asChild
                    >
                        <TextLink href={route('logout')} method="post" className="flex items-center justify-center">
                            <LogOut className="h-4 w-4 mr-2" />
                            Se déconnecter
                        </TextLink>
                    </Button>
                </motion.form>

                <motion.div
                    variants={itemVariants}
                    custom={3}
                    className="mt-8 p-4 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 max-w-md"
                >
                    <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                            <p className="font-medium mb-1">Vous ne trouvez pas l'email ?</p>
                            <ul className="list-disc list-inside pl-1 space-y-1">
                                <li>Vérifiez votre dossier spam ou courrier indésirable</li>
                                <li>Assurez-vous que l'adresse email saisie est correcte</li>
                                <li>Attendez quelques minutes, la livraison peut parfois prendre du temps</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AuthLayout>
    );
}
