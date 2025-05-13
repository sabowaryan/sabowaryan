import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LockIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface LoginRegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginRegisterModal({ isOpen, onClose }: LoginRegisterModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div 
                        className="bg-card rounded-xl shadow-xl p-6 w-full max-w-md"
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                    >
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold">Accès réservé</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-8 w-8 hover:bg-primary/10 transition-colors"
                                onClick={onClose}
                            >
                                <span className="sr-only">Fermer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform hover:rotate-90">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </Button>
                        </div>
                        
                        <div className="text-center mb-6">
                            <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LockIcon className="h-10 w-10 text-primary" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">Connectez-vous pour continuer</h4>
                            <p className="text-foreground/70 mb-4">
                                Pour accéder à ce tutoriel gratuit, vous devez vous connecter ou créer un compte.
                            </p>
                        </div>
                        
                        <div className="space-y-3">
                            <Button 
                                variant="default" 
                                className="w-full py-6"
                                onClick={() => window.location.href = route('login')}
                            >
                                Se connecter
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                className="w-full py-6"
                                onClick={() => window.location.href = route('register')}
                            >
                                Créer un compte
                            </Button>
                            
                            <div className="text-xs text-center text-foreground/50 mt-4">
                                En vous connectant, vous acceptez nos <Link href="#" className="underline hover:text-primary">conditions d'utilisation</Link> et notre <Link href="#" className="underline hover:text-primary">politique de confidentialité</Link>.
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 