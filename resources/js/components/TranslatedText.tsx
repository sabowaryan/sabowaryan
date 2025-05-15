import React from 'react';
import { __ } from '@/helpers/translations';

type ElementType = keyof React.JSX.IntrinsicElements | React.ComponentType<any>;

interface TranslatedTextProps {
    translationKey: string;
    replacements?: Record<string, string | number>;
    count?: number;
    className?: string;
    as?: ElementType;
}

/**
 * Composant pour afficher du texte traduit
 */
export const TranslatedText = ({
    translationKey,
    replacements,
    count,
    className,
    as: Component = 'span',
}: TranslatedTextProps) => {
    const translatedText = __(translationKey, replacements, count);
    
    return React.createElement(
        Component, 
        { className }, 
        translatedText
    );
};

/**
 * Fonction d'aide pour utiliser les traductions dans les JSX sans composant
 */
export const trans = (key: string, replacements?: Record<string, string | number>, count?: number): string => {
    return __(key, replacements, count);
};

export default TranslatedText; 