import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Download, Share2, Check, ChevronRight } from 'lucide-react';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    tutorialSlug: string;
    tutorialTitle: string;
}

export default function QRCodeModal({ isOpen, onClose, tutorialSlug, tutorialTitle }: QRCodeModalProps) {
    const [qrCodeWithLogo, setQrCodeWithLogo] = useState<boolean>(false);
    const [isSharing, setIsSharing] = useState<boolean>(false);
    const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);
    const [showShareFeedback, setShowShareFeedback] = useState<boolean>(false);

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
                                    const file = new File([blob], `qrcode-${tutorialSlug}.png`, { type: 'image/png' });
                                    
                                    // Partager via l'API Web Share
                                    await navigator.share({
                                        title: `QR Code pour ${tutorialTitle}`,
                                        text: `Scannez ce QR code pour accéder au tutoriel "${tutorialTitle}"`,
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
                            title: `Tutoriel: ${tutorialTitle}`,
                            text: `Découvrez ce tutoriel: ${tutorialTitle}`,
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

    const shareOnSocial = (platform: string) => {
        const url = `${window.location.origin}/tutorials/${tutorialSlug}`;
        const text = `Découvrez ce tutoriel : ${tutorialTitle}`;

        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`, '_blank');
                break;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div 
                        className="bg-card rounded-xl shadow-xl p-6 w-full max-w-sm"
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                    >
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold">QR Code du tutoriel</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-8 w-8 hover:bg-primary/10 transition-colors"
                                onClick={() => {
                                    onClose();
                                    setShareMenuOpen(false);
                                }}
                            >
                                <span className="sr-only">Fermer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform hover:rotate-90">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </Button>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <div className="bg-white p-4 rounded-lg mb-4 relative">
                                <QRCode 
                                    value={window.location.href} 
                                    size={200}
                                    level={qrCodeWithLogo ? "H" : "M"}
                                />
                                {qrCodeWithLogo && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                            <img 
                                                src="/images/logo.png" 
                                                alt="Logo" 
                                                className="w-12 h-12 object-contain rounded-full"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="qrLogoToggle"
                                    checked={qrCodeWithLogo}
                                    onChange={() => setQrCodeWithLogo(!qrCodeWithLogo)}
                                    className="mr-2 h-4 w-4"
                                />
                                <label htmlFor="qrLogoToggle" className="text-sm text-foreground/80">
                                    Afficher le logo
                                </label>
                            </div>
                            <p className="text-foreground/80 text-sm mb-4 text-center">
                                Scannez ce code QR avec votre appareil mobile pour accéder directement à ce tutoriel ou pour le partager.
                            </p>
                            <div className="flex gap-2 mb-4">
                                <Button 
                                    variant="outline" 
                                    className="flex-1 text-sm group"
                                    onClick={() => {
                                        // Créer un canvas à partir du QR Code et le télécharger
                                        const svg = document.querySelector('.bg-white.p-4.rounded-lg svg');
                                        if (svg) {
                                            const canvas = document.createElement('canvas');
                                            const ctx = canvas.getContext('2d');
                                            const data = new XMLSerializer().serializeToString(svg);
                                            const img = new Image();
                                            
                                            img.onload = function() {
                                                canvas.width = img.width;
                                                canvas.height = img.height;
                                                ctx?.drawImage(img, 0, 0);
                                                
                                                const a = document.createElement('a');
                                                a.download = `qrcode-${tutorialSlug}.png`;
                                                a.href = canvas.toDataURL('image/png');
                                                a.click();
                                            };
                                            
                                            img.src = 'data:image/svg+xml;base64,' + btoa(data);
                                        }
                                    }}
                                >
                                    <Download className="h-4 w-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                                    Télécharger
                                </Button>
                                <Button 
                                    className="flex-1 text-sm relative group"
                                    onClick={shareQRCode}
                                    disabled={isSharing}
                                >
                                    {isSharing ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-foreground/30 border-t-white rounded-full animate-spin mr-2"></div>
                                            Partage...
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                            Partager
                                        </>
                                    )}
                                </Button>
                            </div>
                            
                            {/* Menu de partage alternatif */}
                            <AnimatePresence>
                                {shareMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full bg-card/70 rounded-lg border border-border/50 p-3 mb-2 overflow-hidden"
                                    >
                                        <h4 className="text-sm font-medium mb-2">Partager via</h4>
                                        <div className="grid grid-cols-5 gap-2">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-full hover:bg-blue-500/10 hover:text-blue-500"
                                                onClick={() => shareOnSocial('twitter')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                                </svg>
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-full hover:bg-blue-700/10 hover:text-blue-700"
                                                onClick={() => shareOnSocial('facebook')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                </svg>
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-full hover:bg-blue-900/10 hover:text-blue-900"
                                                onClick={() => shareOnSocial('linkedin')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                                </svg>
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-full hover:bg-green-500/10 hover:text-green-500"
                                                onClick={() => shareOnSocial('whatsapp')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                                </svg>
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-10 w-10 rounded-full hover:bg-red-500/10 hover:text-red-500"
                                                onClick={() => shareOnSocial('email')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                                </svg>
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 