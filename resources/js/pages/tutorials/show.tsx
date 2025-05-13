import React, { useState, useEffect, ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import GuestLayout from '@/layouts/guest-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import type { BreadcrumbItem } from '@/types';
import { 
    ArrowLeft,
    BookOpen,
    CheckCircle,
    ChevronRight,
    Clock,
    Code,
    Download,
    ExternalLink,
    FileText,
    HelpCircle,
    LockIcon,
    Monitor,
    Play,
    Server,
    Settings,
    Share2,
    Smartphone,
    Star,
    BarChart,
    Users,
    MessageSquare,
    LinkIcon,
    Copy,
    Check,
    AlertCircle,
    Trophy,
    GraduationCap,
    Gift,
    Award,
    Calendar,
    Briefcase,
    Pause,
    ThumbsUp,
    ReplyIcon
} from 'lucide-react';
import { useToast } from '@chakra-ui/toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import ContactModal from '@/components/contact-modal';
import QRCodeModal from '@/components/qr-code-modal';
import LoginRegisterModal from '@/components/login-register-modal';
import AuthorTutorialsModal from '@/components/author-tutorials-modal';
import ReviewModal from '@/components/review-modal';
import axios from 'axios';
import TutorialReviews from '@/components/tutorials/tutorial-reviews';
import TutorialChapters from '@/components/tutorials/tutorial-chapters';
import TutorialContent from '@/components/tutorials/tutorial-content';

// Types
interface Author {
    name: string;
    avatar: string;
    title: string;
    bio: string;
    rating: number;
    tutorials_count: number;
    students_count: number;
    years_experience: number;
    languages_count: number;
    projects_count: number;
}

interface Stats {
    views: number;
    completions: number;
    rating: number;
    reviews_count: number;
    students: number;
}

interface Chapter {
    id: number;
    title: string;
    duration: number;
    is_free: boolean;
    videoUrl: string;
}

interface Review {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    rating: number;
    content: string;
    created_at: string;
    helpful_count: number;
    is_helpful?: boolean;
    replies?: {
        id: number;
        user: {
            name: string;
            avatar: string;
        };
        content: string;
        created_at: string;
    }[];
}

interface Resource {
    id: number;
    title: string;
    url: string;
    type: string;
    size: string;
    download_count: number;
}

interface FAQ {
    question: string;
    answer: string;
}

interface CodeExample {
    id: number;
    title: string;
    description: string;
    code: string;
    language: string;
}

interface Tutorial {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    is_premium: boolean;
    price: number;
    duration: string;
    level: string;
    category: string;
    category_slug: string;
    created_at: string;
    updated_at: string;
    author: Author;
    progress: number | null;
    stats: Stats;
    tags: string[];
    content: string;
    chapters: Chapter[];
    prerequisites: { title: string; level: string };
    objectives: string;
    resources: Resource[];
    faqs: FAQ[];
    reviews: Review[];
    codeExamples?: CodeExample[];
}

interface TutorialShowProps {
    tutorial: Tutorial;
    relatedTutorials: Tutorial[];
}

// Type pour les onglets
type TabType = 'content' | 'overview' | 'resources' | 'faq' | 'reviews';

// Interface pour les données de la page, y compris l'authentification
interface SharedData {
    auth: {
        user: null | {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
        }
    };
    [key: string]: any; // Index signature pour permettre d'autres propriétés
}

// Types
interface UserProgress {
    completedChapters: number[];
    videoProgress: { [key: number]: number };
}

interface ReviewsState {
    reviews: Review[];
}

// Fonction pour obtenir l'icône de catégorie
const getCategoryIcon = (category: string) => {
    switch(category) {
        case 'frontend': return <Monitor className="h-5 w-5" />;
        case 'backend': return <Server className="h-5 w-5" />;
        case 'devops': return <Settings className="h-5 w-5" />;
        case 'mobile': return <Smartphone className="h-5 w-5" />;
        case 'data': return <BarChart className="h-5 w-5" />;
        case 'testing': return <CheckCircle className="h-5 w-5" />;
        case 'languages': return <Code className="h-5 w-5" />;
        default: return <BookOpen className="h-5 w-5" />;
    }
};

// Fonction pour obtenir la couleur de catégorie
const getCategoryColor = (category: string): string => {
    switch(category) {
        case 'frontend': return 'from-blue-500 to-blue-600';
        case 'backend': return 'from-purple-500 to-purple-600';
        case 'devops': return 'from-orange-500 to-orange-600';
        case 'mobile': return 'from-green-500 to-green-600';
        case 'data': return 'from-red-500 to-red-600';
        case 'testing': return 'from-teal-500 to-teal-600';
        case 'languages': return 'from-indigo-500 to-indigo-600';
        default: return 'from-gray-500 to-gray-600';
    }
};

// Fonction pour formater le nombre d'étudiants
const formatStudentCount = (count: number | undefined): string => {
    if (count === undefined || count === null) return '0';
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
};

// Ajouter cette fonction pour calculer le pourcentage de progression du chapitre
const getChapterProgressStyle = (index: number, total: number) => {
    const step = 100 / total;
    const percent = (index / total) * 100;
    return {
        background: `linear-gradient(90deg, var(--color-primary) ${percent}%, var(--color-primary-light) ${percent + step}%, var(--color-background) ${percent + step}%)`,
        opacity: 0.2,
        height: '3px',
        width: '100%',
        borderRadius: '2px',
        marginTop: '8px'
    };
};

// Définir les plateformes sociales disponibles
const socialPlatforms = [
    { id: 'twitter', name: 'Twitter / X', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
        </svg>
    ), color: '#1DA1F2', hoverBg: 'hover:bg-[#1DA1F2]/10', hoverText: 'hover:text-[#1DA1F2]', activeBg: 'bg-[#1DA1F2]' },
    { id: 'facebook', name: 'Facebook', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        </svg>
    ), color: '#4267B2', hoverBg: 'hover:bg-[#4267B2]/10', hoverText: 'hover:text-[#4267B2]', activeBg: 'bg-[#4267B2]' },
    { id: 'linkedin', name: 'LinkedIn', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
        </svg>
    ), color: '#0A66C2', hoverBg: 'hover:bg-[#0A66C2]/10', hoverText: 'hover:text-[#0A66C2]', activeBg: 'bg-[#0A66C2]' },
    { id: 'whatsapp', name: 'WhatsApp', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
    ), color: '#25D366', hoverBg: 'hover:bg-[#25D366]/10', hoverText: 'hover:text-[#25D366]', activeBg: 'bg-[#25D366]' },
    { id: 'email', name: 'Email', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
    ), color: '#EA4335', hoverBg: 'hover:bg-[#EA4335]/10', hoverText: 'hover:text-[#EA4335]', activeBg: 'bg-[#EA4335]' },
];

export default function TutorialShow({ tutorial, relatedTutorials }: TutorialShowProps) {
    const page = usePage();
    const auth = page.props.auth as {
        user: null | {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
        }
    };
    const isAuthenticated = !!auth?.user;
    const [selectedChapter, setSelectedChapter] = useState(0);
    const [activeTab, setActiveTab] = useState<TabType>('content');
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [showQRModal, setShowQRModal] = useState<boolean>(false);
    const [isSharing, setIsSharing] = useState<boolean>(false);
    const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);
    const [showAuthorTutorials, setShowAuthorTutorials] = useState<boolean>(false);
    const [showContactModal, setShowContactModal] = useState<boolean>(false);
    const [qrCodeWithLogo, setQrCodeWithLogo] = useState<boolean>(false);
    const [isHoveringAuthorCard, setIsHoveringAuthorCard] = useState<boolean>(false);
    const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
    const [completedChapters, setCompletedChapters] = useState<number[]>([]);
    const [activeSocialButton, setActiveSocialButton] = useState<string | null>(null);
    const [showShareFeedback, setShowShareFeedback] = useState<boolean>(false);
    const [shareCount, setShareCount] = useState<number>(Math.floor(Math.random() * 120) + 30);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const toast = useToast();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviews, setReviews] = useState<ReviewsState>({ reviews: [] });
    const [averageRating, setAverageRating] = useState<number>(0);
    const [videoProgress, setVideoProgress] = useState<{ [key: number]: number }>({});
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [downloadingResources, setDownloadingResources] = useState<{ [key: number]: number }>({});
    const [downloadedResources, setDownloadedResources] = useState<number[]>([]);
    const [copyCodeStatus, setCopyCodeStatus] = useState<'idle' | 'copied' | 'error'>('idle');
    const [hasUserReviewed, setHasUserReviewed] = useState<boolean>(false);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState('');
    
    // Définir les breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: '/' },
        { title: 'Tutoriels', href: '/tutorials' },
        { title: tutorial.title, href: `/tutorials/${tutorial.slug}` }
    ];
    
    // Log des données reçues
    useEffect(() => {
        console.log('Tutoriel reçu:', tutorial);
        console.log('Chapitres reçus:', tutorial.chapters);
    }, [tutorial]);

    // Vérifier si le chapitre sélectionné est valide
    useEffect(() => {
        if (tutorial.chapters && tutorial.chapters.length > 0 && selectedChapter >= tutorial.chapters.length) {
            setSelectedChapter(0);
        }
    }, [tutorial.chapters, selectedChapter]);

    const handleChapterClick = (index: number) => {
        // Vérifier si l'index est valide
        if (index < 0 || index >= tutorial.chapters.length) {
            return;
        }

        // Si l'utilisateur n'est pas authentifié, afficher la modal de connexion
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        
        // Si le chapitre est premium mais non accessible, l'achat serait requis
        if (tutorial.is_premium && !tutorial.chapters[index].is_free) {
            // Logique pour inciter à l'achat (déjà présente dans l'interface)
            return;
        }
        
        // Sinon, accéder au chapitre
        setSelectedChapter(index);
        setVideoProgress(prev => ({ ...prev, [index]: 0 }));
        setIsVideoPlaying(false);
    };

    // Vérifier si l'utilisateur peut accéder au chapitre
    const canAccessChapter = (chapter: Chapter) => {
        if (!chapter) return false;
        return chapter.is_free || isAuthenticated;
    };

    // Fonction pour copier le lien
    const copyLinkToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        } catch (err) {
            console.error('Erreur lors de la copie du lien:', err);
            setCopyStatus('error');
            setTimeout(() => setCopyStatus('idle'), 2000);
        }
    };

    // Fonction pour télécharger le programme
    const downloadProgram = async () => {
        setIsDownloading(true);
        
        try {
            const docDefinition: TDocumentDefinitions = {
                content: [
                    { text: tutorial.title, style: 'header' },
                    { text: tutorial.description },
                    { text: `Auteur: ${tutorial.author.name}` },
                    { text: `Durée: ${tutorial.duration}` },
                    { text: `Niveau: ${tutorial.level}` }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10] as [number, number, number, number]
                    }
                }
            };

            pdfMake.createPdf(docDefinition).download(`programme-${tutorial.slug}.pdf`);
            
            toast({
                title: "Téléchargement réussi",
                description: "Le programme a été téléchargé avec succès.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            
            toast({
                title: "Erreur de téléchargement",
                description: "Une erreur est survenue lors du téléchargement du programme.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsDownloading(false);
        }
    };

    // Générer un QR code pour le partage
    useEffect(() => {
        // Ceci est une simulation - dans une application réelle, nous utiliserions une bibliothèque comme qrcode.js
        // pour générer dynamiquement le QR code basé sur l'URL actuelle
        console.log('QR code should be generated for URL:', window.location.href);
    }, []);

    // Fonction pour partager sur les réseaux sociaux
    const shareOnSocial = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(`${tutorial.title} - Tutoriel en ligne`);
        const text = encodeURIComponent(`Je suis en train d'apprendre ${tutorial.title}. Rejoins-moi sur ce tutoriel !`);
        
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=${text}%20${url}`;
                break;
            default:
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Fonction pour partager le QR code
    const shareQRCode = async () => {
        setIsSharing(true);
        
        try {
            // Vérifier si l'API Web Share est disponible
            if (navigator.share) {
                try {
                    // Créer une image à partir du QR code
                    const svg = document.querySelector('.bg-white.p-4.rounded-lg svg');
                    if (svg) {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const data = new XMLSerializer().serializeToString(svg);
                        const img = new Image();
                        
                        img.onload = async function() {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx?.drawImage(img, 0, 0);
                            
                            // Convertir le canvas en blob
                            canvas.toBlob(async (blob) => {
                                if (blob) {
                                    const file = new File([blob], `qrcode-${tutorial.slug}.png`, { type: 'image/png' });
                                    
                                    // Partager via l'API Web Share
                                    await navigator.share({
                                        title: `QR Code pour ${tutorial.title}`,
                                        text: `Scannez ce QR code pour accéder au tutoriel "${tutorial.title}"`,
                                        url: window.location.href,
                                        files: [file]
                                    });
                                }
                                setIsSharing(false);
                            }, 'image/png');
                        };
                        
                        img.src = 'data:image/svg+xml;base64,' + btoa(data);
                    } else {
                        // Si le SVG n'est pas trouvé, partager juste l'URL
                        await navigator.share({
                            title: `Tutoriel: ${tutorial.title}`,
                            text: `Découvrez ce tutoriel: ${tutorial.title}`,
                            url: window.location.href
                        });
                        setIsSharing(false);
                    }
                } catch (error) {
                    console.error('Erreur lors du partage:', error);
                    setShareMenuOpen(true);
                    setIsSharing(false);
                }
            } else {
                // Si l'API Web Share n'est pas disponible, afficher les options de partage alternatives
                setShareMenuOpen(true);
                setIsSharing(false);
            }
        } catch (error) {
            console.error('Erreur lors du partage:', error);
            setIsSharing(false);
        }
    };

    // Simuler un array de tutoriels du formateur
    const getAuthorTutorials = () => {
        // Dans une application réelle, ces données proviendraient d'une API
        return Array.from({ length: tutorial.author.tutorials_count }, (_, i) => ({
            id: i + 1,
            title: `${i % 2 === 0 ? 'Maîtriser' : 'Apprendre'} ${['JavaScript', 'React', 'Vue.js', 'TypeScript', 'Node.js', 'PHP', 'Laravel', 'CSS', 'HTML'][i % 9]} ${i > 8 ? 'Avancé' : 'pour débutants'}`,
            image: `/images/tutorials/${['javascript', 'react', 'vuejs', 'typescript', 'nodejs', 'php', 'laravel', 'css', 'html'][i % 9]}.jpg`,
            level: i % 3 === 0 ? 'Débutant' : i % 3 === 1 ? 'Intermédiaire' : 'Avancé',
            duration: `${Math.floor(Math.random() * 5) + 1} heures ${Math.floor(Math.random() * 45) + 15} min`,
            is_premium: i % 3 === 0,
            rating: Number((4 + Math.random()).toFixed(1))
        }));
    };
    
    // Calculer la progression réelle
    const actualProgress = Math.round(
        ((completedChapters.length + (videoProgress[selectedChapter] >= 100 ? 1 : (videoProgress[selectedChapter] || 0) / 100)) / tutorial.chapters.length) * 100
    );

    // Fonction étendue pour partager sur les réseaux sociaux
    const enhancedShareOnSocial = (platform: string) => {
        setActiveSocialButton(platform);
        
        // Simuler un délai de partage
        setTimeout(() => {
            shareOnSocial(platform);
            setShareCount(prev => prev + 1);
            setShowShareFeedback(true);
            setActiveSocialButton(null);
            
            // Masquer le feedback après 3 secondes
            setTimeout(() => {
                setShowShareFeedback(false);
            }, 3000);
        }, 600);
    };

    const handleReviewSubmit = async (reviewData: { rating: number; content: string }) => {
        try {
            const response = await axios.post(`/api/tutorials/${tutorial.id}/reviews`, reviewData);
            
            // Mettre à jour la liste des avis
            setReviews((prevReviews: ReviewsState) => ({
                reviews: [response.data, ...prevReviews.reviews]
            }));
            
            // Mettre à jour la note moyenne
            const newReviews = [response.data, ...reviews.reviews];
            const newAverage = newReviews.reduce((acc, review) => acc + review.rating, 0) / newReviews.length;
            setAverageRating(newAverage);
            
            setShowReviewModal(false);
            setHasUserReviewed(true);
            
            toast({
                title: 'Succès',
                description: 'Votre avis a été publié avec succès',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la publication de votre avis',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Correction de fetchUserProgress
    const fetchUserProgress = async () => {
        if (!isAuthenticated) return;
        
        try {
            const response = await axios.get(`/api/tutorials/${tutorial.id}/user-progress`);
            const data = response.data;
            
            setCompletedChapters(data.completedChapters || []);
            setVideoProgress(data.videoProgress?.progress || 0);
            setDownloadedResources(data.downloadedResources || []);
        } catch (err: unknown) {
            console.error('Erreur lors de la récupération de la progression:', err);
        }
    };

    // Ajout d'un useEffect pour fetchUserProgress
    useEffect(() => {
        if (isAuthenticated) {
            fetchUserProgress();
        }
    }, [isAuthenticated, tutorial.id]);

    const updateProgress = async (chapterId: number, progress: number, completed: boolean = false) => {
        try {
            const chapter = tutorial.chapters[chapterId];
            if (!chapter) return;

            await axios.post(`/api/tutorials/${tutorial.id}/progress`, {
                chapterId,
                progress,
                completed,
                lastPosition: Math.floor(progress * chapter.duration / 100)
            });
        } catch (err: unknown) {
            console.error('Erreur lors de la mise à jour de la progression:', err);
        }
    };

    const markChapterAsCompleted = async (chapterId: number) => {
        try {
            await axios.post(`/api/tutorials/${tutorial.id}/chapters/${chapterId}/complete`);
            setCompletedChapters(prev => [...prev, chapterId]);
        } catch (err: unknown) {
            console.error('Erreur lors du marquage du chapitre comme complété:', err);
        }
    };

    // Mettre à jour la progression de la vidéo
    const handleVideoProgress = (progress: number) => {
        const chapterId = tutorial.chapters[selectedChapter].id;
        setVideoProgress(prev => ({
            ...prev,
            [chapterId]: progress
        }));
        
        if (progress >= 90 && !completedChapters.includes(chapterId)) {
            markChapterAsCompleted(chapterId);
        }
    };

    // Charger la progression sauvegardée au démarrage
    useEffect(() => {
        if (isAuthenticated) {
            // Charger depuis le localStorage
            const savedProgress = localStorage.getItem(`tutorial_progress_${tutorial.id}`);
            if (savedProgress) {
                const progress: UserProgress = JSON.parse(savedProgress);
                setCompletedChapters(progress.completedChapters);
                // Charger la progression de la vidéo du chapitre actuel
                if (progress.videoProgress[selectedChapter] !== undefined) {
                    setVideoProgress(progress.videoProgress);
                }
            }
        }
    }, [tutorial.id, isAuthenticated]);

    // Sauvegarder la progression
    const saveProgress = async () => {
        if (!isAuthenticated) return;

        setIsSaving(true);
        try {
            // Sauvegarder dans le localStorage
            const progress: UserProgress = {
                completedChapters,
                videoProgress: {
                    ...JSON.parse(localStorage.getItem(`tutorial_progress_${tutorial.id}`) || '{"videoProgress":{}}').videoProgress,
                    [selectedChapter]: videoProgress
                }
            };
            localStorage.setItem(`tutorial_progress_${tutorial.id}`, JSON.stringify(progress));

            // Synchroniser avec le backend
            await axios.post(`/api/tutorials/${tutorial.id}/progress`, {
                completed_chapters: completedChapters,
                video_progress: videoProgress,
                current_chapter: selectedChapter
            });

            toast({
                title: "Progression sauvegardée",
                description: "Votre progression a été sauvegardée avec succès.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la progression:', error);
            toast({
                title: "Erreur de sauvegarde",
                description: "Une erreur est survenue lors de la sauvegarde de votre progression.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Effet pour sauvegarder la progression
    useEffect(() => {
        if (isAuthenticated && (completedChapters.length > 0 || Object.values(videoProgress).some(progress => progress > 0))) {
            const saveTimeout = setTimeout(saveProgress, 2000);
            return () => clearTimeout(saveTimeout);
        }
    }, [completedChapters, videoProgress]);

    // Effet pour simuler la progression de la vidéo
    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (isVideoPlaying && videoProgress[selectedChapter] < 100) {
            interval = setInterval(() => {
                setVideoProgress(prev => ({
                    ...prev,
                    [selectedChapter]: (prev[selectedChapter] || 0) + 1
                }));
                
                if ((videoProgress[selectedChapter] || 0) >= 100) {
                    setIsVideoPlaying(false);
                    // Marquer le chapitre comme complété lorsque la vidéo est terminée
                    if (!completedChapters.includes(selectedChapter)) {
                        setCompletedChapters(prev => [...prev, selectedChapter]);
                    }
                }
            }, 1000);
        }
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isVideoPlaying, videoProgress, selectedChapter, completedChapters]);

    // Fonction pour télécharger une ressource
    const downloadResource = async (resource: Resource) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        setDownloadingResources(prev => ({ ...prev, [resource.id]: 0 }));

        try {
            // Simuler le téléchargement avec une progression
            const interval = setInterval(() => {
                setDownloadingResources(prev => {
                    const currentProgress = prev[resource.id] || 0;
                    if (currentProgress >= 100) {
                        clearInterval(interval);
                        return prev;
                    }
                    return { ...prev, [resource.id]: currentProgress + 10 };
                });
            }, 500);

            // Faire la requête de téléchargement
            const response = await axios.get(`/api/tutorials/${tutorial.id}/resources/${resource.id}/download`, {
                responseType: 'blob'
            });

            // Créer un lien de téléchargement
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resource.title);
            document.body.appendChild(link);
            link.click();
            link.remove();

            // Marquer la ressource comme téléchargée
            setDownloadedResources(prev => [...prev, resource.id]);
            
            // Mettre à jour le compteur de téléchargements
            const updatedResources = tutorial.resources.map(r => 
                r.id === resource.id 
                    ? { ...r, download_count: (r.download_count || 0) + 1 }
                    : r
            );
            tutorial.resources = updatedResources;

            toast({
                title: "Téléchargement réussi",
                description: `${resource.title} a été téléchargé avec succès.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            toast({
                title: "Erreur de téléchargement",
                description: "Une erreur est survenue lors du téléchargement de la ressource.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setDownloadingResources(prev => {
                const newState = { ...prev };
                delete newState[resource.id];
                return newState;
            });
        }
    };

    const handleMarkHelpful = async (reviewId: number) => {
        try {
            const response = await axios.post(`/api/tutorials/${tutorial.id}/reviews/${reviewId}/helpful`);
            if (response.data.success) {
                setReviews((prev: ReviewsState) => ({
                    reviews: prev.reviews.map((review: Review) => 
                        review.id === reviewId 
                            ? { ...review, helpful_count: response.data.helpful_count, is_helpful: true }
                            : review
                    )
                }));
                toast({
                    title: 'Succès',
                    description: 'Merci pour votre retour !',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleReplySubmit = async (reviewId: number) => {
        try {
            const response = await axios.post(`/api/tutorials/${tutorial.id}/reviews/${reviewId}/reply`, {
                reply: replyContent
            });
            if (response.data.success) {
                setReviews((prev: ReviewsState) => ({
                    reviews: prev.reviews.map((review: Review) => 
                        review.id === reviewId 
                            ? { 
                                ...review, 
                                replies: [...(review.replies || []), response.data.reply]
                            }
                            : review
                    )
                }));
                setReplyingTo(null);
                setReplyContent('');
                toast({
                    title: 'Succès',
                    description: 'Réponse ajoutée avec succès',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <GuestLayout breadcrumbs={breadcrumbs}>
            <Head title={tutorial.title} />
            
            {/* Login/Register Modal */}
            <LoginRegisterModal 
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
            
            {/* QR Code Modal */}
            <QRCodeModal 
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
                tutorialSlug={tutorial.slug}
                tutorialTitle={tutorial.title}
            />
            
            {/* Contact Modal */}
            <ContactModal 
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
                authorName={tutorial.author.name}
            />
            
            {/* Author Tutorials Modal */}
            <AuthorTutorialsModal 
                isOpen={showAuthorTutorials}
                onClose={() => setShowAuthorTutorials(false)}
                authorName={tutorial.author.name}
                authorAvatar={tutorial.author.avatar}
                authorTitle={tutorial.author.title}
                authorRating={tutorial.author.rating}
                tutorialsCount={tutorial.author.tutorials_count}
                tutorials={getAuthorTutorials()}
            />
            
            <main className="relative min-h-screen">
                {/* Hero header */}
                <div className="relative bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
                    {/* Background patterns */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-noise-pattern opacity-[0.08] pointer-events-none"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-1/4 left-1/5 w-20 h-20 rounded-full bg-primary/20 blur-3xl animate-float-slow"></div>
                    <div className="absolute bottom-1/4 right-1/5 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float-medium"></div>
                    
                    <div className={`${SITE_CONTAINER} py-16`}>
                        <div className="mb-6">
                            <Link 
                                href={route('tutorials.index')} 
                                className="text-foreground/70 hover:text-primary transition-colors flex items-center group"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                                Retour aux tutoriels
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <Badge 
                                            className={`px-3 py-1 text-white bg-gradient-to-r ${getCategoryColor(tutorial.category)}`}
                                        >
                                            {getCategoryIcon(tutorial.category)}
                                            <span className="ml-1.5 capitalize">{tutorial.category}</span>
                                        </Badge>
                                        
                                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                                            <Clock className="mr-1.5 h-4 w-4" />
                                            {tutorial.duration}
                                        </Badge>
                                        
                                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                                            <Users className="mr-1.5 h-4 w-4" />
                                            Niveau: {tutorial.level}
                                        </Badge>
                                    </div>
                                    
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{tutorial.title}</h1>
                                    
                                    <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                                        {tutorial.description}
                                    </p>
                                    
                                    <div className="flex items-center mb-8">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
                                                <img 
                                                    src={tutorial.author.avatar} 
                                                    alt={tutorial.author.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium">{tutorial.author.name}</div>
                                                <div className="text-foreground/70 text-sm">{tutorial.author.title}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="ml-auto flex items-center">
                                            <div className="flex items-center mr-4">
                                                <Star className="h-5 w-5 mr-1 text-yellow-500" fill="currentColor" />
                                                <span className="font-medium">{tutorial.stats.rating}</span>
                                                <span className="text-foreground/70 ml-1">({tutorial.stats.reviews_count})</span>
                                            </div>
                                            
                                            <div className="text-foreground/70">
                                                <span className="font-medium">{tutorial.stats.views.toLocaleString()}</span> vues
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lg:row-start-1 lg:col-start-3"
                            >
                                <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                                    <img 
                                        src={tutorial.image} 
                                        alt={tutorial.title}
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button 
                                            size="lg" 
                                            className="rounded-full w-16 h-16 bg-primary/90 hover:bg-primary text-white shadow-lg"
                                        >
                                            <Play className="h-6 w-6 ml-1" fill="currentColor" />
                                        </Button>
                                    </div>
                                </div>
                                
                                {tutorial.is_premium && (
                                    <div className="mt-6 bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-lg">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-2xl font-bold">{tutorial.price} €</h3>
                                            <Badge className="bg-yellow-500 text-white border-none">
                                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                                Premium
                                            </Badge>
                                        </div>
                                        
                                        <Button className="w-full mb-4 bg-primary hover:bg-primary/90">
                                            Acheter ce tutoriel
                                        </Button>
                                        
                                        <ul className="space-y-2 text-foreground/80">
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                                Accès à vie
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                                {tutorial.chapters.length} chapitres complets
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                                Ressources téléchargeables
                                            </li>
                                            <li className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                                Certificat d'achèvement
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                {/* Content tabs */}
                <div className="bg-gradient-to-b from-card/90 to-card/60 border-y border-border/40 backdrop-blur-md sticky top-16 z-10 shadow-md">
                    <div className={`${SITE_CONTAINER}`}>
                        <Tabs 
                            value={activeTab} 
                            onValueChange={(value) => setActiveTab(value as TabType)} 
                            className="w-full"
                        >
                            <div className="flex flex-col">
                                <div className="relative">
                                    <TabsList className="bg-transparent w-full justify-between md:justify-start rounded-none h-16 px-0 gap-1 md:gap-2 overflow-x-auto scrollbar-hide flex-nowrap">
                                <motion.div 
                                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent"
                                    layoutId="tabBackgroundLine"
                                />
                                {["content", "overview", "resources", "faq", "reviews"].map((tab) => {
                                    // Déterminer les indicateurs et badges pour chaque onglet
                                    let badge = null;
                                    let indicator = null;
                                    
                                    if (tab === "reviews") {
                                        badge = (
                                                    <span className="ml-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                                                {tutorial.reviews.length}
                                            </span>
                                        );
                                    }
                                    
                                    if (tab === "content") {
                                        indicator = (
                                                    <span className="absolute -top-1 -right-1">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                                </span>
                                            </span>
                                        );
                                    }
                                    
                                    // Déterminer les icônes pour chaque onglet
                                    const tabIcons: Record<string, ReactNode> = {
                                                content: <BookOpen className="h-4 w-4 transition-all group-hover:scale-110" />,
                                                overview: <FileText className="h-4 w-4 transition-all group-hover:scale-110" />,
                                                resources: <Download className="h-4 w-4 transition-all group-hover:scale-110" />,
                                                faq: <HelpCircle className="h-4 w-4 transition-all group-hover:scale-110" />,
                                                reviews: <MessageSquare className="h-4 w-4 transition-all group-hover:scale-110" />
                                    };
                                    
                                    // Déterminer les noms pour chaque onglet
                                    const tabNames: Record<string, string> = {
                                        content: "Contenu",
                                        overview: "Aperçu",
                                        resources: "Ressources",
                                        faq: "FAQ",
                                        reviews: "Avis"
                                    };
                                    
                                    return (
                                        <TabsTrigger 
                                            key={tab}
                                            value={tab} 
                                                    className="relative group flex items-center gap-2 min-w-max rounded-none h-full px-4 md:px-6 transition-all hover:bg-primary/5 font-medium overflow-hidden"
                                        >
                                            {activeTab === tab && (
                                                <motion.div 
                                                            className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5"
                                                    layoutId="tabBackground"
                                                    initial={false}
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                                />
                                            )}
                                            
                                            <div className="relative flex items-center">
                                                <motion.div 
                                                    className="flex items-center"
                                                    initial={{ y: activeTab === tab ? 0 : 10, opacity: activeTab === tab ? 1 : 0.7 }}
                                                    animate={{ 
                                                        y: activeTab === tab ? 0 : 0,
                                                        opacity: activeTab === tab ? 1 : 0.7
                                                    }}
                                                    whileHover={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div 
                                                                className={`mr-2 ${activeTab === tab ? 'text-primary' : 'text-foreground/60'}`}
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {tabIcons[tab]}
                                                    </motion.div>
                                                    
                                                    <motion.span 
                                                                className={`text-sm md:text-base ${activeTab === tab ? 'text-primary font-semibold' : 'text-foreground/80'}`}
                                                    >
                                                        {tabNames[tab]}
                                                    </motion.span>
                                                    
                                                    {badge}
                                                    {indicator}
                                                </motion.div>
                                            </div>
                                            
                                            {activeTab === tab && (
                                                <motion.div 
                                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                                                    layoutId="tabIndicator"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                                </div>
                                
                                <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-3 px-1">
                                    {/* Indicateur de progression générale avec étiquette */}
                                    <div className="w-full md:w-2/3 relative">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-xs font-medium text-foreground/70">Progression du tutoriel</span>
                                            <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                {actualProgress}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gradient-to-r from-border/5 via-border/20 to-border/5 rounded-full overflow-hidden">
                                <motion.div 
                                                className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 backdrop-blur-sm"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${actualProgress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                            >
                                                {actualProgress > 0 && (
                                                    <motion.div 
                                                        className="absolute top-0 right-0 h-full w-1.5 bg-white/30"
                                                        animate={{ 
                                                            opacity: [0.3, 0.7, 0.3],
                                                        }}
                                                        transition={{ 
                                                            duration: 1.5, 
                                                            repeat: Infinity,
                                                            repeatType: "reverse"
                                                        }}
                                                    />
                                                )}
                                            </motion.div>
                                        </div>
                            </div>
                            
                            {/* Statistiques du tutoriel en petites pastilles */}
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                                        <motion.div 
                                            className="flex items-center bg-card/80 px-2.5 py-1.5 rounded-full text-xs border border-border/30 shadow-sm hover:border-yellow-400/30 hover:bg-yellow-500/5 transition-colors group"
                                            whileHover={{ y: -2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1.5 group-hover:scale-110 transition-transform" />
                                            <span className="font-medium">{tutorial.stats.rating}</span>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center bg-card/80 px-2.5 py-1.5 rounded-full text-xs border border-border/30 shadow-sm hover:border-blue-400/30 hover:bg-blue-500/5 transition-colors group"
                                            whileHover={{ y: -2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <Users className="h-3.5 w-3.5 text-blue-500 mr-1.5 group-hover:scale-110 transition-transform" />
                                            <span className="font-medium">{formatStudentCount(tutorial.stats.views)}</span>
                                            <span className="text-foreground/60 ml-1">vues</span>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center bg-card/80 px-2.5 py-1.5 rounded-full text-xs border border-border/30 shadow-sm hover:border-green-400/30 hover:bg-green-500/5 transition-colors group"
                                            whileHover={{ y: -2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <Clock className="h-3.5 w-3.5 text-green-500 mr-1.5 group-hover:scale-110 transition-transform" />
                                            <span className="font-medium">{tutorial.duration}</span>
                                        </motion.div>
                                </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
                
                {/* Main content */}
                <div className={`${SITE_CONTAINER} py-8 md:py-12`}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Left column - Chapters list */}
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <div className="sticky top-44 md:top-40">
                                <div className="bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-border/40 shadow-lg sm:shadow-xl mb-6 md:mb-8 relative overflow-hidden">
                                    {/* Éléments décoratifs d'arrière-plan */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
                                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-4 sm:mb-6 gap-2">
                                            <h3 className="text-lg sm:text-xl font-bold flex items-center">
                                                <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 text-primary">
                                                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </div>
                                                <span className="truncate">Contenu du tutoriel</span>
                                            </h3>
                                            
                                            <Badge variant="outline" className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium bg-card/50 border-border/50 whitespace-nowrap">
                                                {tutorial.chapters.length} chapitres
                                            </Badge>
                                        </div>
                                        
                                        <TutorialChapters
                                            chapters={tutorial.chapters}
                                            selectedChapter={selectedChapter}
                                            completedChapters={completedChapters}
                                            videoProgress={videoProgress}
                                            onChapterClick={handleChapterClick}
                                            canAccessChapter={canAccessChapter}
                                        />
                                    </div>
                                </div>
                                
                                {/* Tutor information card - Responsive */}
                                <div 
                                    className="bg-gradient-to-b from-card/80 to-card/60 backdrop-blur-md rounded-xl sm:rounded-2xl border border-border/30 overflow-hidden mb-6 md:mb-8 group hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
                                    onMouseEnter={() => setIsHoveringAuthorCard(true)}
                                    onMouseLeave={() => setIsHoveringAuthorCard(false)}
                                >
                                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-3 sm:p-5 border-b border-border/20 relative overflow-hidden">
                                        <motion.div 
                                            className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
                                            animate={{ 
                                                scale: isHoveringAuthorCard ? 1.2 : 1,
                                                opacity: isHoveringAuthorCard ? 0.8 : 0.5
                                            }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                        />
                                        <h4 className="font-semibold flex items-center text-base sm:text-lg relative z-10">
                                            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-primary" />
                                            À propos du formateur
                                        </h4>
                                    </div>
                                    
                                    {/* Le reste du contenu de la carte du formateur reste inchangé */}
                                    <div className="p-3 sm:p-5">
                                        <div className="flex items-start mb-4">
                                            <div className="relative">
                                                <motion.div 
                                                    className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary/20 shadow-md"
                                                    animate={{ borderColor: isHoveringAuthorCard ? 'rgba(var(--color-primary), 0.4)' : 'rgba(var(--color-primary), 0.2)' }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.img 
                                                        src={tutorial.author.avatar} 
                                                        alt={tutorial.author.name}
                                                        className="w-full h-full object-cover"
                                                        animate={{ scale: isHoveringAuthorCard ? 1.05 : 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </motion.div>
                                                <motion.div 
                                                    className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 shadow-md"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ 
                                                        opacity: isHoveringAuthorCard ? 1 : 0,
                                                        scale: isHoveringAuthorCard ? 1 : 0
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <CheckCircle className="h-3.5 w-3.5" fill="currentColor" />
                                                </motion.div>
                                            </div>
                                            <div>
                                                <motion.div 
                                                    className="font-medium text-lg"
                                                    animate={{ color: isHoveringAuthorCard ? 'var(--color-primary)' : 'var(--color-foreground)' }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {tutorial.author.name}
                                                </motion.div>
                                                <div className="text-foreground/70">{tutorial.author.title}</div>
                                                <div className="flex items-center mt-1.5 text-xs">
                                                    <Badge variant="outline" className="gap-1 px-1.5 py-0 text-[10px] bg-card/50">
                                                        <Star className="h-2.5 w-2.5 text-yellow-500" fill="currentColor" />
                                                        {tutorial.author.rating}
                                                    </Badge>
                                                    <span className="mx-2 text-foreground/50">•</span>
                                                    <span className="text-foreground/70">
                                                        <span className="font-medium">{tutorial.author.tutorials_count}</span> tutoriels
                                                    </span>
                                                    <span className="mx-2 text-foreground/50">•</span>
                                                    <span className="text-foreground/70">
                                                        <span className="font-medium">{formatStudentCount(tutorial.author.students_count)}</span> élèves
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="rounded-lg border border-border/30 p-3 bg-card/30 mb-4 relative">
                                            <div className="absolute -top-2 left-3 bg-background px-2 text-xs font-medium text-foreground/70">Bio</div>
                                            <p className="text-sm text-foreground/80">
                                                {tutorial.author.bio}
                                            </p>
                                            
                                            <motion.div 
                                                className="mt-3 pt-3 border-t border-border/20 text-xs text-foreground/60 flex justify-between"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ 
                                                    opacity: isHoveringAuthorCard ? 1 : 0,
                                                    height: isHoveringAuthorCard ? 'auto' : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="flex items-center">
                                                    <Calendar className="h-3 w-3 mr-1 text-primary/70" />
                                                    <span>Membre depuis {new Date().getFullYear() - tutorial.author.years_experience} ans</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-3 w-3 mr-1 text-primary/70" />
                                                    <span>Dernière mise à jour: {tutorial.updated_at.split(' ')[0]}</span>
                                                </div>
                                            </motion.div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                className="flex-1 gap-2 hover:bg-primary/5 group"
                                                onClick={() => setShowContactModal(true)}
                                            >
                                                <MessageSquare className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                                                Contacter
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="flex-1 gap-2 hover:bg-primary/5 group"
                                                onClick={() => setShowAuthorTutorials(true)}
                                            >
                                                <BookOpen className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                                                Ses tutoriels
                                            </Button>
                                        </div>
                                        
                                        <div className="mt-4 grid grid-cols-3 gap-2">
                                            <div className="flex flex-col items-center justify-center py-2 bg-card/30 rounded-lg border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-all group">
                                                <Briefcase className="h-4 w-4 mb-1 text-primary/70 group-hover:scale-110 transition-transform" />
                                                <span className="text-lg font-bold">{tutorial.author.years_experience}</span>
                                                <span className="text-xs text-foreground/60">années d'exp.</span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center py-2 bg-card/30 rounded-lg border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-all group">
                                                <Code className="h-4 w-4 mb-1 text-primary/70 group-hover:scale-110 transition-transform" />
                                                <span className="text-lg font-bold">{tutorial.author.languages_count}</span>
                                                <span className="text-xs text-foreground/60">langages</span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center py-2 bg-card/30 rounded-lg border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-all group">
                                                <Award className="h-4 w-4 mb-1 text-primary/70 group-hover:scale-110 transition-transform" />
                                                <span className="text-lg font-bold">{tutorial.author.projects_count}</span>
                                                <span className="text-xs text-foreground/60">projets</span>
                                            </div>
                                        </div>
                                        
                                        <motion.div 
                                            className="mt-4 p-3 rounded-lg border border-border/20 bg-primary/5"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ 
                                                opacity: isHoveringAuthorCard ? 1 : 0,
                                                height: isHoveringAuthorCard ? 'auto' : 0
                                            }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <h5 className="text-sm font-medium mb-2 flex items-center">
                                                <Trophy className="h-4 w-4 mr-1.5 text-yellow-500" />
                                                Réalisations
                                            </h5>
                                            <ul className="text-xs text-foreground/80 space-y-1.5">
                                                <li className="flex items-center">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mr-2"></div>
                                                    <span>{formatStudentCount(tutorial.author.students_count)} étudiants formés</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mr-2"></div>
                                                    <span>Note moyenne de {tutorial.author.rating}/5</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mr-2"></div>
                                                    <span>{tutorial.author.tutorials_count} tutoriels créés</span>
                                                </li>
                                            </ul>
                                        </motion.div>
                                    </div>
                                </div>
                                
                                {/* Share and social links */}
                                <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/30 overflow-hidden mb-8 group hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-5 border-b border-border/20 relative overflow-hidden">
                                        <motion.div 
                                            className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
                                            animate={{ 
                                                scale: shareMenuOpen ? 1.2 : 1,
                                                opacity: shareMenuOpen ? 0.8 : 0.5
                                            }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                        />
                                        <h4 className="font-semibold flex items-center text-lg relative z-10">
                                            <Share2 className="h-5 w-5 mr-2 text-primary" />
                                            Partager ce tutoriel
                                        </h4>
                                    </div>
                                    
                                    <div className="p-5">
                                        {/* Share Statistics */}
                                        <div className="flex items-center justify-between mb-4 p-3 bg-card/30 rounded-lg border border-border/20">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                                    <Share2 className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-foreground/70">Ce tutoriel a été partagé</p>
                                                    <p className="font-bold text-lg">{shareCount} fois</p>
                                                </div>
                                            </div>
                                            
                                            <AnimatePresence>
                                                {showShareFeedback && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        className="bg-green-500/20 text-green-600 py-1 px-3 rounded-full text-xs font-medium flex items-center"
                                                    >
                                                        <Check className="h-3 w-3 mr-1" />
                                                        Partagé !
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        
                                        {/* Share Options */}
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="text-sm font-medium flex items-center text-foreground/70">
                                                    <div className="bg-primary/10 p-1.5 rounded-full mr-2 text-primary">
                                                        <Share2 className="h-3.5 w-3.5" />
                                                    </div>
                                                Partager sur les réseaux sociaux
                                            </h5>
                                                <motion.span 
                                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                                    animate={{ 
                                                        scale: showShareFeedback ? [1, 1.05, 1] : 1,
                                                    }}
                                                    transition={{ 
                                                        duration: 0.5, 
                                                        repeat: showShareFeedback ? 1 : 0
                                                    }}
                                                >
                                                    {shareCount} partages
                                                </motion.span>
                                            </div>
                                            
                                            <div className="relative">
                                                {/* Effet de fond décoratif */}
                                                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-70"></div>
                                                
                                                {/* Grille responsive des boutons de partage */}
                                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm">
                                                {socialPlatforms.slice(0, 5).map((platform) => (
                                                    <motion.button
                                                        key={platform.id}
                                                        onClick={() => enhancedShareOnSocial(platform.id)}
                                                            className={`relative flex items-center justify-center rounded-full ${
                                                                activeSocialButton === platform.id 
                                                                    ? `${platform.activeBg} text-white border-transparent` 
                                                                    : 'bg-card/70 border border-border/30'
                                                            } ${platform.hoverBg} ${platform.hoverText} transition-all duration-300 hover:shadow-md hover:border-border/50 focus:outline-none overflow-hidden group aspect-square`}
                                                            whileHover={{ 
                                                                scale: 1.1, 
                                                                transition: { type: "spring", stiffness: 300, damping: 10 } 
                                                            }}
                                                        whileTap={{ scale: 0.95 }}
                                                        disabled={activeSocialButton !== null}
                                                            title={platform.name}
                                                            aria-label={`Partager sur ${platform.name}`}
                                                        >
                                                            {/* Effet de fond au survol */}
                                                            <motion.div 
                                                                className={`absolute inset-0 opacity-0 ${platform.activeBg} group-hover:opacity-10 transition-opacity duration-300`}
                                                                initial={false}
                                                            />
                                                            
                                                            {/* Icône avec animation */}
                                                            <motion.div 
                                                                className="relative z-10 flex items-center justify-center w-full h-full"
                                                                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                                                                transition={{ duration: 0.5 }}
                                                            >
                                                                <motion.div
                                                                    className="text-lg sm:text-xl"
                                                                    animate={activeSocialButton === platform.id ? {
                                                                        scale: [1, 1.2, 1],
                                                                        rotate: [0, -10, 10, -10, 0],
                                                                    } : {}}
                                                                    transition={{ duration: 0.8, repeat: activeSocialButton === platform.id ? Infinity : 0 }}
                                                                >
                                                            {platform.icon}
                                                                </motion.div>
                                                            </motion.div>
                                                        
                                                            {/* Indicateur d'activité */}
                                                        {activeSocialButton === platform.id && (
                                                            <motion.div 
                                                                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                >
                                                                    <motion.div 
                                                                        className="h-1 w-1 bg-white rounded-full"
                                                                animate={{ 
                                                                            y: [0, -3, 0],
                                                                            opacity: [0.5, 1, 0.5]
                                                                }}
                                                                transition={{ 
                                                                    repeat: Infinity,
                                                                            duration: 0.8,
                                                                            delay: 0
                                                                        }}
                                                                    />
                                                                    <motion.div 
                                                                        className="h-1 w-1 bg-white rounded-full"
                                                                        animate={{ 
                                                                            y: [0, -3, 0],
                                                                            opacity: [0.5, 1, 0.5]
                                                                        }}
                                                                        transition={{ 
                                                                            repeat: Infinity,
                                                                            duration: 0.8,
                                                                            delay: 0.2
                                                                        }}
                                                                    />
                                                                    <motion.div 
                                                                        className="h-1 w-1 bg-white rounded-full"
                                                                        animate={{ 
                                                                            y: [0, -3, 0],
                                                                            opacity: [0.5, 1, 0.5]
                                                                        }}
                                                                        transition={{ 
                                                                            repeat: Infinity,
                                                                            duration: 0.8,
                                                                            delay: 0.4
                                                                        }}
                                                                    />
                                                                </motion.div>
                                                            )}
                                                            
                                                            {/* Effet de lueur au survol */}
                                                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </motion.button>
                                                ))}
                                                </div>
                                                
                                                {/* Notification de partage réussi */}
                                                <AnimatePresence>
                                                    {showShareFeedback && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-green-500 text-white py-1.5 px-4 rounded-full text-xs font-medium flex items-center shadow-lg"
                                                        >
                                                            <Check className="h-3.5 w-3.5 mr-1.5" />
                                                            Partagé avec succès !
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        
                                        {/* Direct link sharing */}
                                        <div className="relative">
                                            <div className="flex items-center mb-1.5">
                                                <LinkIcon className="h-3.5 w-3.5 mr-1.5 text-primary" />
                                                <span className="text-xs font-medium text-foreground/70">Lien direct</span>
                                            </div>
                                            <div className="relative flex">
                                                <input 
                                                    type="text" 
                                                    readOnly 
                                                    value={window.location.href} 
                                                    className="w-full py-2 px-3 bg-card/50 border border-border/50 rounded-l-md text-sm text-foreground/70 focus:outline-none"
                                                />
                                                <Button 
                                                    className={`rounded-l-none text-xs gap-1 ${
                                                        copyStatus === 'copied' 
                                                        ? 'bg-green-600 hover:bg-green-700' 
                                                        : copyStatus === 'error' 
                                                        ? 'bg-red-600 hover:bg-red-700' 
                                                        : ''
                                                    }`}
                                                    onClick={copyLinkToClipboard}
                                                    disabled={copyStatus !== 'idle'}
                                                >
                                                    {copyStatus === 'idle' && (
                                                        <>
                                                            <Copy className="h-3.5 w-3.5" />
                                                            Copier
                                                        </>
                                                    )}
                                                    {copyStatus === 'copied' && (
                                                        <>
                                                            <Check className="h-3.5 w-3.5" />
                                                            Copié!
                                                        </>
                                                    )}
                                                    {copyStatus === 'error' && (
                                                        <>
                                                            <AlertCircle className="h-3.5 w-3.5" />
                                                            Erreur
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        {/* QR Code */}
                                        <motion.div 
                                            className="mt-5 flex items-center gap-3 p-3 border border-border/30 rounded-lg bg-card/30 cursor-pointer hover:bg-card/50 transition-colors group"
                                            onClick={() => setShowQRModal(true)}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <div className="bg-white p-1.5 rounded group-hover:shadow-md transition-all">
                                                <QRCode 
                                                    value={window.location.href} 
                                                    size={64}
                                                    level="M"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">Scannez le code QR</h5>
                                                <p className="text-xs text-foreground/70">Cliquez pour agrandir et partager le code QR</p>
                                            </div>
                                            <div className="ml-auto">
                                                <ChevronRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </motion.div>
                                        
                                        {/* Download program button */}
                                        <Button 
                                            className="w-full mt-5 gap-2 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 text-white"
                                            onClick={downloadProgram}
                                            disabled={isDownloading}
                                        >
                                            {!isDownloading ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <motion.div
                                                        animate={{ y: [0, -3, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </motion.div>
                                                    <span>Télécharger le programme</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin"></div>
                                                    Téléchargement...
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right column - Content area */}
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-lg">
                                {activeTab === 'content' && (
                                    <TutorialContent
                                        chapters={tutorial.chapters}
                                        selectedChapter={selectedChapter}
                                        completedChapters={completedChapters}
                                        videoProgress={videoProgress}
                                        onChapterClick={handleChapterClick}
                                        canAccessChapter={canAccessChapter}
                                    />
                                )}
                                
                                {activeTab === 'overview' && (
                                    <div>
                                        <div className="max-w-4xl mx-auto">
                                            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                                À propos de ce tutoriel
                                            </h2>
                                            
                                            {!isAuthenticated ? (
                                                <div className="text-center py-16 bg-card/20 rounded-xl border border-border/30">
                                                    <LockIcon className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                                                    <h3 className="text-xl font-medium mb-2">Connexion requise</h3>
                                                    <p className="text-foreground/60 max-w-md mx-auto mb-6">
                                                        Pour accéder à l'aperçu détaillé de ce tutoriel, veuillez vous connecter ou créer un compte.
                                                    </p>
                                                    <div className="flex gap-3 justify-center">
                                                        <Button 
                                                            className="gap-2"
                                                            onClick={() => window.location.href = route('login')}
                                                        >
                                                            <LockIcon className="h-4 w-4" />
                                                            Se connecter
                                                        </Button>
                                                        <Button 
                                                            variant="outline" 
                                                            className="gap-2"
                                                            onClick={() => window.location.href = route('register')}
                                                        >
                                                            <Users className="h-4 w-4" />
                                                            Créer un compte
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="prose prose-lg max-w-none mb-12 prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-primary prose-strong:font-semibold prose-ul:marker:text-primary prose-ol:marker:text-primary prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black prose-pre:text-white prose-pre:border prose-pre:border-border/50" 
                                                            dangerouslySetInnerHTML={{ __html: tutorial.content }} 
                                                        />
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                                            {tutorial.prerequisites && (
                                                                <div className="bg-gradient-to-br from-card/80 to-card/60 p-6 rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 group">
                                                                    <div className="flex items-center gap-3 mb-4">
                                                                        <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform">
                                                                            <FileText className="h-6 w-6" />
                                                                        </div>
                                                                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                                                            Prérequis
                                                                        </h3>
                                                                    </div>
                                                                    <div className="space-y-3">
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="font-medium text-lg">{tutorial.prerequisites.title}</div>
                                                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                                                                {tutorial.prerequisites.level}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="text-foreground/70">
                                                                            Ces prérequis vous permettront de suivre ce tutoriel dans les meilleures conditions.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            
                                                            {tutorial.objectives && (
                                                                <div className="bg-gradient-to-br from-card/80 to-card/60 p-6 rounded-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 group">
                                                                    <div className="flex items-center gap-3 mb-4">
                                                                        <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform">
                                                                            <CheckCircle className="h-6 w-6" />
                                                                        </div>
                                                                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                                                            Objectifs
                                                                        </h3>
                                                                    </div>
                                                                    <div className="space-y-3">
                                                                        <p className="text-foreground/70 leading-relaxed">
                                                                            {tutorial.objectives}
                                                                        </p>
                                                                        <div className="flex items-center text-sm text-foreground/60">
                                                                            <Clock className="h-4 w-4 mr-2" />
                                                                            Durée estimée : {tutorial.duration}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="bg-gradient-to-br from-primary/5 to-transparent p-8 rounded-xl border border-primary/20">
                                                            <h3 className="text-2xl font-bold mb-6 text-center">Ce que vous allez apprendre</h3>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {tutorial.chapters.map((chapter, index) => (
                                                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
                                                                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                                                            <CheckCircle className="h-5 w-5" />
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-medium mb-1">{chapter.title}</h4>
                                                                            <div className="flex items-center text-sm text-foreground/60">
                                                                                <Clock className="h-4 w-4 mr-1" />
                                                                                {chapter.duration}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'resources' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                                            <Download className="h-6 w-6 mr-3 text-primary" />
                                            Ressources supplémentaires
                                        </h2>
                                        
                                        {!isAuthenticated ? (
                                            <div className="text-center py-16 bg-card/20 rounded-xl border border-border/30">
                                                <LockIcon className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                                                <h3 className="text-xl font-medium mb-2">Connexion requise</h3>
                                                <p className="text-foreground/60 max-w-md mx-auto mb-6">
                                                    Pour accéder aux ressources de ce tutoriel, veuillez vous connecter ou créer un compte.
                                                </p>
                                                <div className="flex gap-3 justify-center">
                                                    <Button 
                                                        className="gap-2"
                                                        onClick={() => setShowLoginModal(true)}
                                                    >
                                                        <LockIcon className="h-4 w-4" />
                                                        Se connecter
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        className="gap-2"
                                                        onClick={() => setShowLoginModal(true)}
                                                    >
                                                        <Users className="h-4 w-4" />
                                                        Créer un compte
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : tutorial.resources && tutorial.resources.length > 0 ? (
                                            <div className="space-y-4 max-w-3xl">
                                                {tutorial.resources.map((resource) => (
                                                    <div 
                                                        key={resource.id} 
                                                        className="p-5 border border-border/50 rounded-xl bg-card/30 hover:bg-card/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="bg-primary/10 p-3 rounded-lg mr-4 text-primary group-hover:bg-primary/20 transition-colors">
                                                                    <Download className="h-5 w-5" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-lg group-hover:text-primary transition-colors">
                                                                        {resource.title}
                                                                    </div>
                                                                    <div className="flex items-center text-foreground/60 text-sm gap-3">
                                                                        <span>{resource.type}</span>
                                                                        <span>•</span>
                                                                        <span>{resource.size}</span>
                                                                        <span>•</span>
                                                                        <span>{resource.download_count || 0} téléchargements</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                {downloadingResources[resource.id] !== undefined ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                                                        <span className="text-sm text-foreground/60">
                                                                            {downloadingResources[resource.id]}%
                                                                        </span>
                                                                    </div>
                                                                ) : downloadedResources.includes(resource.id) ? (
                                                                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                                                        <Check className="h-3.5 w-3.5 mr-1" />
                                                                        Téléchargé
                                                                    </Badge>
                                                                ) : (
                                                                    <Button
                                                                        variant="outline"
                                                                        className="gap-2 hover:bg-primary/5"
                                                                        onClick={() => downloadResource(resource)}
                                                                    >
                                                                        <Download className="h-4 w-4" />
                                                                        Télécharger
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {downloadingResources[resource.id] !== undefined && (
                                                            <div className="mt-3">
                                                                <div className="h-1 w-full bg-border/20 rounded-full overflow-hidden">
                                                                    <div 
                                                                        className="h-full bg-primary rounded-full transition-all duration-300"
                                                                        style={{ width: `${downloadingResources[resource.id]}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-card/20 rounded-xl border border-border/30">
                                                <Download className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
                                                <h3 className="text-xl font-medium mb-2">Aucune ressource disponible</h3>
                                                <p className="text-foreground/60 max-w-md mx-auto">Ce tutoriel ne contient pas encore de ressources supplémentaires.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                {activeTab === 'faq' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                                            <HelpCircle className="h-6 w-6 mr-3 text-primary" />
                                            Questions fréquentes
                                        </h2>
                                        
                                        {!isAuthenticated ? (
                                            <div className="text-center py-16 bg-card/20 rounded-xl border border-border/30">
                                                <LockIcon className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                                                <h3 className="text-xl font-medium mb-2">Connexion requise</h3>
                                                <p className="text-foreground/60 max-w-md mx-auto mb-6">
                                                    Pour accéder aux questions fréquentes de ce tutoriel, veuillez vous connecter ou créer un compte.
                                                </p>
                                                <div className="flex gap-3 justify-center">
                                                    <Button 
                                                        className="gap-2"
                                                        onClick={() => window.location.href = route('login')}
                                                    >
                                                        <LockIcon className="h-4 w-4" />
                                                        Se connecter
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        className="gap-2"
                                                        onClick={() => window.location.href = route('register')}
                                                    >
                                                        <Users className="h-4 w-4" />
                                                        Créer un compte
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : tutorial.faqs && tutorial.faqs.length > 0 ? (
                                            <div className="space-y-5 max-w-3xl">
                                                {tutorial.faqs.map((faq, index) => (
                                                    <div 
                                                        key={index} 
                                                        className="p-5 border border-border/50 rounded-xl bg-card/30 hover:bg-card/50 hover:shadow-md transition-all duration-300 hover:border-primary/20"
                                                    >
                                                        <h3 className="text-lg font-medium mb-3 flex items-start group">
                                                            <div className="bg-primary/10 p-2 rounded-lg mr-3 text-primary flex-shrink-0">
                                                                <HelpCircle className="h-5 w-5" />
                                                            </div>
                                                            <span className="group-hover:text-primary transition-colors">{faq.question}</span>
                                                        </h3>
                                                        <div className="ml-12 text-foreground/80 bg-card/50 p-4 rounded-lg border border-border/30">
                                                            {faq.answer}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-card/20 rounded-xl border border-border/30">
                                                <HelpCircle className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
                                                <h3 className="text-xl font-medium mb-2">Aucune question fréquente</h3>
                                                <p className="text-foreground/60 max-w-md mx-auto">Ce tutoriel ne contient pas encore de questions fréquentes.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                {activeTab === 'reviews' && (
                                    <div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                            <h2 className="text-2xl font-bold flex items-center">
                                                <MessageSquare className="h-6 w-6 mr-3 text-primary" />
                                                Avis des utilisateurs
                                            </h2>
                                            
                                            <div className="flex flex-wrap gap-4">
                                                <motion.div 
                                                    className="flex items-center bg-card/50 px-4 py-2 rounded-lg border border-border/30"
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    <div className="font-medium text-2xl mr-2">{tutorial.stats.rating}</div>
                                                    <div className="flex items-center">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star 
                                                                key={star} 
                                                                className={`h-4 w-4 ${star <= Math.floor(tutorial.stats.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-foreground/20'} mr-0.5`} 
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="text-foreground/60 ml-2 text-sm">({tutorial.stats.reviews_count} avis)</div>
                                                </motion.div>

                                                <motion.div 
                                                    className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-border/30"
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1.5 text-primary" />
                                                        <span className="text-sm text-foreground/70">Vus par</span>
                                                    </div>
                                                    <span className="font-medium">{formatStudentCount(tutorial.stats.views)} personnes</span>
                                                </motion.div>
                                            </div>
                                        </div>
                                        
                                        {!isAuthenticated ? (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center py-16 bg-card/20 rounded-xl border border-border/30"
                                            >
                                                <LockIcon className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                                                <h3 className="text-xl font-medium mb-2">Connexion requise</h3>
                                                <p className="text-foreground/60 max-w-md mx-auto mb-6">
                                                    Pour accéder aux avis sur ce tutoriel, veuillez vous connecter ou créer un compte.
                                                </p>
                                                <div className="flex gap-3 justify-center">
                                                    <Button 
                                                        className="gap-2"
                                                        onClick={() => setShowLoginModal(true)}
                                                    >
                                                        <LockIcon className="h-4 w-4" />
                                                        Se connecter
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        className="gap-2"
                                                        onClick={() => setShowLoginModal(true)}
                                                    >
                                                        <Users className="h-4 w-4" />
                                                        Créer un compte
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ) : tutorial.reviews && tutorial.reviews.length > 0 ? (
                                            <div className="space-y-6">
                                                {!hasUserReviewed && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="flex justify-end mb-6"
                                                    >
                                                        <Button 
                                                            onClick={() => setShowReviewModal(true)}
                                                            className="gap-2 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
                                                        >
                                                            <Star className="h-4 w-4" />
                                                            Laisser un avis
                                                        </Button>
                                                    </motion.div>
                                                )}
                                                
                                                <TutorialReviews
                                                    tutorialId={tutorial.id}
                                                    reviews={tutorial.reviews}
                                                    averageRating={averageRating}
                                                    hasUserReviewed={hasUserReviewed}
                                                    onReviewAdded={(newReview) => {
                                                        setReviews(prev => ({
                                                            reviews: [newReview, ...prev.reviews]
                                                        }));
                                                        const newReviews = [newReview, ...reviews.reviews];
                                                        const newAverage = newReviews.reduce((acc, review) => acc + review.rating, 0) / newReviews.length;
                                                        setAverageRating(newAverage);
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center py-16 bg-card/20 rounded-xl border border-border/30"
                                            >
                                                <MessageSquare className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                                                <h3 className="text-2xl font-medium mb-3">Aucun avis pour le moment</h3>
                                                <p className="text-foreground/60 max-w-md mx-auto mb-8">
                                                    Soyez le premier à partager votre expérience avec ce tutoriel. Votre avis aidera d'autres apprenants à faire leur choix.
                                                </p>
                                                <Button 
                                                    onClick={() => setShowReviewModal(true)}
                                                    className="gap-2 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
                                                    size="lg"
                                                >
                                                    <Star className="h-5 w-5" />
                                                    Laisser un avis
                                                </Button>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Related tutorials section */}
                {relatedTutorials && relatedTutorials.length > 0 && (
                    <div>
                        <div className="bg-card/30 border-t border-border/30 py-12">
                            <div className={`${SITE_CONTAINER}`}>
                                <h2 className="text-2xl font-bold mb-8">Tutoriels similaires</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedTutorials.map((relatedTutorial) => (
                                        <motion.div
                                            key={relatedTutorial.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="group relative rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                        >
                                            <Link href={route('tutorials.show', relatedTutorial.slug)} className="block h-full">
                                                <div className="h-40 overflow-hidden relative">
                                                    <div className="absolute top-3 right-3 z-10 flex gap-2">
                                                        <Badge 
                                                            className={`bg-gradient-to-r ${getCategoryColor(relatedTutorial.category)} text-white border-none`}
                                                        >
                                                            {getCategoryIcon(relatedTutorial.category)}
                                                            <span className="ml-1">{relatedTutorial.category}</span>
                                                        </Badge>
                                                        
                                                        {relatedTutorial.is_premium && (
                                                            <Badge className="bg-yellow-500 text-white border-none">
                                                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                                                Premium
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    
                                                    <img 
                                                        src={relatedTutorial.image}
                                                        alt={relatedTutorial.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                                
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                        {relatedTutorial.title}
                                                    </h3>
                                                    
                                                    <div className="flex justify-between items-center text-sm text-foreground/70 mb-2">
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            <span>{relatedTutorial.duration}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" />
                                                            <span>{relatedTutorial.stats.rating}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center mt-2">
                                                        {relatedTutorial.is_premium ? (
                                                            <span className="font-bold">{relatedTutorial.price} €</span>
                                                        ) : (
                                                            <span className="text-green-600 font-bold">Gratuit</span>
                                                        )}
                                                        
                                                        <div className="flex items-center text-primary text-sm">
                                                            <span className="font-medium">Voir le tutoriel</span>
                                                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                onSubmit={handleReviewSubmit}
            />
        </GuestLayout>
    );
}
