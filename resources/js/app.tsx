import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as HotToaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Déclarer les types pour étendre l'interface Window
declare global {
    interface Window {
        locale: string;
        translations: Record<string, any>;
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        console.log('Initialisation Inertia - props complètes:', props);
        
        // Initialiser les variables globales avec les données partagées directement depuis props
        try {
            if (props && typeof props === 'object') {
                // Les données partagées sont directement sur l'objet props
                const sharedProps = props as any; // Cast pour accéder aux propriétés dynamiquement

                if (sharedProps.locale) {
                    window.locale = sharedProps.locale as string;
                }

                if (sharedProps.translations) {
                    window.translations = sharedProps.translations as Record<string, any>;
                }
            } else {
                console.warn('props n\'est pas un objet valide ou est nul.', props); // Log d'avertissement (peut être conservé si utile)
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données partagées dans setup:', error);
        }
        
        const root = createRoot(el);
        root.render(
            <>
                <App {...props} />
                <Toaster />
                <HotToaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                    }}
                />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

