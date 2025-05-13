import { Head, usePage } from '@inertiajs/react';
import { ContactForm } from '@/components/ContactForm';
import GuestLayout from '@/layouts/guest-layout';
import type { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';

export default function Contact() {
    // Définir les breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: '/' },
        { title: 'Contact', href: '/contact' }
    ];

    return (
        <GuestLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact" />
            
            <motion.main 
                className="relative min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ContactForm />
            </motion.main>
        </GuestLayout>
    );
} 