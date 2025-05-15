import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
    avatar?: string;
    role?: string;
    [key: string]: unknown; // Permet des propriétés additionnelles
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
    current?: boolean;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

// Type pour les données partagées globalement dans l'application
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    locale: string;
    translations: Record<string, Record<string, any>>;
    [key: string]: unknown; // Index signature pour satisfaire la contrainte PageProps
}

// CV Interfaces
export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    description?: string;
    location?: string;
    logo?: string;
    website?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
    achievements?: string[];
    technologies?: string[];
    location?: string;
    logo?: string;
    website?: string;
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 1-5 or percentage
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
    icon?: string;
}

export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expires?: string;
    credentialId?: string;
    credentialUrl?: string;
    logo?: string;
}

export interface Language {
    id: string;
    name: string;
    level: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
    code?: string;
}

export interface CvOptions {
    showPhoto: boolean;
    showContact: boolean;
    selectedSections: string[];
    theme: 'classic' | 'modern' | 'minimal' | 'creative';
    accentColor?: string;
    paperSize: 'a4' | 'letter' | 'legal';
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    spacing?: 'compact' | 'normal' | 'spacious';
    headerStyle?: 'standard' | 'centered' | 'sidebar';
    sectionStyle?: 'standard' | 'boxed' | 'underlined' | 'sideline';
    skillStyle?: 'bars' | 'dots' | 'circles' | 'percentage' | 'tags';
}

export interface Chapter {
    id: number;
    title: string;
    duration: number;
    is_free: boolean;
    videoUrl: string;
    description?: string;
    difficulty?: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
    skills?: string[];
    resources?: {
        [key: string]: string;
    };
} 
