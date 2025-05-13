import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    authorName: string;
}

export default function ContactModal({ isOpen, onClose, authorName }: ContactModalProps) {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [contactSuccess, setContactSuccess] = useState<boolean>(false);

    // Gérer la soumission du formulaire de contact
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simuler un envoi de formulaire
        setTimeout(() => {
            // Dans une application réelle, une requête API serait envoyée ici
            console.log('Contact form submitted:', contactForm);
            
            setIsSubmitting(false);
            setContactSuccess(true);
            
            // Réinitialiser le formulaire après quelques secondes
            setTimeout(() => {
                setContactSuccess(false);
                onClose();
                setContactForm({
                    name: '',
                    email: '',
                    message: ''
                });
            }, 3000);
        }, 1500);
    };
    
    // Mise à jour des champs du formulaire
    const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-card rounded-xl shadow-xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-xl font-bold flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                        Contacter {authorName}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 w-8"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        <span className="sr-only">Fermer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </Button>
                </div>
                
                {contactSuccess ? (
                    <div className="text-center py-10">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Message envoyé !</h4>
                        <p className="text-foreground/70">
                            Votre message a été envoyé à {authorName}. Vous recevrez une réponse sous peu.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleContactSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Votre nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleContactInputChange}
                                className="w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md text-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Votre email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactInputChange}
                                className="w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md text-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        
                        <div className="mb-5">
                            <label htmlFor="message" className="block text-sm font-medium mb-1">Votre message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactInputChange}
                                rows={5}
                                className="w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md text-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 resize-none"
                                required
                                disabled={isSubmitting}
                            ></textarea>
                        </div>
                        
                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-foreground/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    Envoi en cours...
                                </>
                            ) : (
                                <>Envoyer le message</>
                            )}
                        </Button>
                        
                        <p className="text-xs text-foreground/60 mt-3 text-center">
                            En envoyant ce message, vous acceptez que vos coordonnées soient transmises à {authorName}.
                        </p>
                    </form>
                )}
            </div>
        </motion.div>
    );
} 