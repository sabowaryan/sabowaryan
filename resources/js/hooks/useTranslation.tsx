import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { __, getLocale } from '@/helpers/translations';
import { SharedData } from '@/types';

/**
 * Hook pour utiliser les traductions dans les composants React
 */
export function useTranslation() {
    const { locale } = usePage<SharedData>().props;
    const [currentLocale, setCurrentLocale] = useState(locale || getLocale());
    
    // Mettre à jour l'état local si la locale change dans les props
    useEffect(() => {
        if (locale && locale !== currentLocale) {
            setCurrentLocale(locale);
        }
    }, [locale, currentLocale]);

    /**
     * Fonction de traduction
     */
    const t = (key: string, replacements?: Record<string, string | number>, count?: number) => {
        return __(key, replacements, count);
    };

    return {
        t,
        locale: currentLocale,
    };
}

export default useTranslation; 