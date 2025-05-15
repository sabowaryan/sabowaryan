// translates.ts
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

// Cache des traductions
const translationsCache: Record<string, Record<string, string>> = {};

// Initialiser le cache avec des traductions par défaut pour les messages critiques
const initializeDefaultTranslations = () => {
  if (!translationsCache['fr']) {
    translationsCache['fr'] = {
      'email_required': "L'adresse e-mail est requise.",
      'email_invalid': "L'adresse e-mail n'est pas valide.",
      'email_already_subscribed': "Cette adresse e-mail est déjà inscrite.",
      'subscribed': "Inscription réussie !",
      'error': "Une erreur s'est produite. Veuillez réessayer.",
      'email_placeholder': "Entrez votre adresse e-mail",
      'subscribe': "S'inscrire",
      'privacy_notice': "Nous respectons votre vie privée. Vos informations ne seront pas partagées."
    };
  }
  
  if (!translationsCache['en']) {
    translationsCache['en'] = {
      'email_required': "Email address is required.",
      'email_invalid': "Email address is not valid.",
      'email_already_subscribed': "This email address is already subscribed.",
      'subscribed': "Subscribed successfully!",
      'error': "An error occurred. Please try again.",
      'email_placeholder': "Enter your email address",
      'subscribe': "Subscribe",
      'privacy_notice': "We respect your privacy. Your information will not be shared."
    };
  }
};

// Initialiser les traductions par défaut
initializeDefaultTranslations();

const getSharedData = (): SharedData => {
  try {
    const pageProps = usePage<SharedData>().props;
    
    // Mettre à jour le cache avec les traductions de la page
    if (pageProps.translations) {
      Object.entries(pageProps.translations).forEach(([locale, translations]) => {
        translationsCache[locale] = { ...translationsCache[locale], ...translations };
      });
    }
    
    return pageProps;
  } catch (e) {
    if (typeof window !== 'undefined') {
      // Si window.translations existe, mettre à jour le cache
      if (window.translations) {
        Object.entries(window.translations).forEach(([locale, translations]) => {
          translationsCache[locale] = { ...translationsCache[locale], ...translations as Record<string, string> };
        });
      }
      
      return {
        locale: window.locale || 'en',
        translations: window.translations || {},
      } as SharedData;
    }
    return { locale: 'en', translations: {} } as SharedData;
  }
};

export const getLocale = (): string => getSharedData().locale || 'fr';

export const getTranslations = () => {
  // Utiliser le cache des traductions en priorité, puis les traductions de la page
  const pageTranslations = getSharedData().translations || {};
  
  // Fusionner les traductions du cache avec celles de la page
  const mergedTranslations: Record<string, Record<string, string>> = { ...translationsCache };
  
  Object.entries(pageTranslations).forEach(([locale, translations]) => {
    if (!mergedTranslations[locale]) {
      mergedTranslations[locale] = {};
    }
    mergedTranslations[locale] = { ...mergedTranslations[locale], ...translations as Record<string, string> };
  });
  
  return mergedTranslations;
};

export const __ = (key: string, replace?: Record<string, string | number>, count?: number): string => {
  const locale = getLocale();
  const translations = getTranslations();
  
  // Essayer d'abord la traduction dans la langue actuelle
  let translation = translations[locale]?.[key];
  
  // Si la traduction n'existe pas dans la langue actuelle, essayer en anglais (langue par défaut)
  if (!translation && locale !== 'en' && translations['en']?.[key]) {
    translation = translations['en'][key];
  }
  
  // Si toujours pas de traduction, essayer en français
  if (!translation && locale !== 'fr' && translations['fr']?.[key]) {
    translation = translations['fr'][key];
  }
  
  // Si aucune traduction n'est trouvée, utiliser la clé
  if (!translation) {
    translation = key;
  }

  if (count !== undefined && translation.includes('|')) {
    const [singular, plural] = translation.split('|');
    translation = count === 1 ? singular.trim() : plural?.trim() || singular.trim();
  }

  if (replace) {
    Object.entries(replace).forEach(([k, v]) => {
      translation = translation.replace(new RegExp(`:${k}`, 'g'), String(v));
    });
  }

  return translation;
};

export const trans_choice = (key: string, count: number, replace?: Record<string, string | number>) => 
  __(key, { ...replace, count }, count);

export const hasTranslation = (key: string): boolean => {
  const locale = getLocale();
  const translations = getTranslations();
  return !!translations[locale]?.[key] || !!translations['en']?.[key] || !!translations['fr']?.[key];
};

if (typeof window !== 'undefined') {
  (window as any).__ = __;
  (window as any).trans_choice = trans_choice;
  (window as any).getLocale = getLocale;
}