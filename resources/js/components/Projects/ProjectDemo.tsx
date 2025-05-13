import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
    X, 
    Maximize2, 
    Minimize2, 
    ChevronLeft, 
    ChevronRight,
    RefreshCw,
    Laptop,
    Smartphone,
    Tablet,
    AlertTriangle
} from 'lucide-react';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface ProjectDemoProps {
    projectId: string;
    title: string;
    demoUrl: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectDemo = memo(function ProjectDemo({ projectId, title, demoUrl, isOpen, onClose }: ProjectDemoProps) {
    const [loading, setLoading] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    
    // Reset state when demo is closed
    useEffect(() => {
        if (!isOpen) {
            setLoading(true);
            setFullscreen(false);
            setCurrentDevice('desktop');
            setError(null);
        }
    }, [isOpen]);
    
    // Validate URL on component mount and when URL changes
    useEffect(() => {
        setError(null);
        if (!demoUrl || demoUrl === '#') {
            setError("L'URL de démonstration n'est pas disponible pour ce projet.");
            setLoading(false);
            return;
        }
        
        // Check if URL is valid
        try {
            // If it's a relative URL, prepend origin to test it
            if (demoUrl.startsWith('/') || !demoUrl.includes('://')) {
                new URL(demoUrl, window.location.origin);
            } else {
                new URL(demoUrl);
            }
        } catch (e) {
            setError("L'URL de démonstration est invalide.");
            setLoading(false);
        }
    }, [demoUrl]);
    
    // Reset loading state when URL changes
    useEffect(() => {
        setLoading(true);
    }, [demoUrl]);
    
    // Handle iframe load event
    const handleIframeLoad = useCallback(() => {
        setLoading(false);
    }, []);
    
    // Handle iframe error
    const handleIframeError = useCallback(() => {
        setLoading(false);
        setError("Impossible de charger la démo. Le site pourrait être indisponible ou bloquer l'intégration.");
    }, []);
    
    // Toggle fullscreen
    const toggleFullscreen = useCallback(() => {
        setFullscreen(prev => !prev);
    }, []);
    
    // Change device type
    const changeDevice = useCallback((device: DeviceType) => {
        setCurrentDevice(device);
    }, []);
    
    // Get full URL for iframe src
    const getIframeSrc = useCallback(() => {
        if (!demoUrl) return '';
        
        // If it's an absolute URL, use it directly
        if (demoUrl.includes('://')) {
            return demoUrl;
        }
        
        // For relative URLs, prepend origin
        if (demoUrl.startsWith('/')) {
            return `${window.location.origin}${demoUrl}`;
        }
        
        // Add leading slash if needed
        return `${window.location.origin}/${demoUrl}`;
    }, [demoUrl]);
    
    // Handle iframe refresh
    const refreshIframe = useCallback(() => {
        if (iframeRef.current && !error) {
            setError(null);
            setLoading(true);
            iframeRef.current.src = getIframeSrc();
        }
    }, [error, getIframeSrc]);
    
    // Handle device width based on selected device
    const getDeviceWidth = useCallback(() => {
        switch (currentDevice) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            case 'desktop': return '100%';
            default: return '100%';
        }
    }, [currentDevice]);
    
    // Device icons
    const getDeviceIcon = useCallback((device: DeviceType) => {
        switch (device) {
            case 'desktop': return <Laptop className="h-4 w-4" />;
            case 'tablet': return <Tablet className="h-4 w-4" />;
            case 'mobile': return <Smartphone className="h-4 w-4" />;
        }
    }, []);
    
    // If not open, don't render anything
    if (!isOpen) return null;
    
    return (
        <AnimatePresence>
            <motion.div 
                className={cn(
                    "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
                    fullscreen ? "p-0" : "p-4 md:p-8"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div 
                    className={cn(
                        "bg-card border border-border/50 rounded-lg overflow-hidden flex flex-col",
                        "shadow-xl w-full max-w-7xl",
                        fullscreen ? "h-full rounded-none" : "h-[80vh]",
                    )}
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20">
                        <div className="flex items-center">
                            <h3 className="font-medium mr-3">Démo: {title}</h3>
                            <div className="hidden md:flex items-center gap-1 bg-muted/30 rounded-md p-1">
                                {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((device) => (
                                    <Button
                                        key={device}
                                        variant={currentDevice === device ? "default" : "ghost"}
                                        size="sm"
                                        className="h-8 px-2.5"
                                        onClick={() => changeDevice(device)}
                                    >
                                        {getDeviceIcon(device)}
                                        <span className="ml-1.5 text-xs">
                                            {device === 'desktop' ? 'Bureau' : device === 'tablet' ? 'Tablette' : 'Mobile'}
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={refreshIframe}
                                className="h-8 w-8 p-0"
                                aria-label="Rafraîchir"
                            >
                                <RefreshCw className={cn(
                                    "h-4 w-4",
                                    loading && "animate-spin"
                                )} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleFullscreen}
                                className="h-8 w-8 p-0"
                                aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"}
                            >
                                {fullscreen ? (
                                    <Minimize2 className="h-4 w-4" />
                                ) : (
                                    <Maximize2 className="h-4 w-4" />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                aria-label="Fermer"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    
                    {/* Device frame */}
                    <div className="flex-1 bg-background overflow-hidden">
                        <div className={cn(
                            "w-full h-full flex items-center justify-center",
                            "transition-all duration-300 ease-in-out",
                            currentDevice !== 'desktop' && "border-l border-r border-border/30 mx-auto"
                        )}
                        style={{ 
                            width: getDeviceWidth(), 
                            height: currentDevice === 'mobile' ? 'calc(100% - 40px)' : '100%',
                            borderRadius: currentDevice === 'mobile' ? '12px 12px 0 0' : undefined
                        }}>
                            {/* Loading overlay */}
                            {loading && !error && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                                    <div className="flex flex-col items-center">
                                        <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
                                        <p className="text-sm text-muted-foreground">Chargement de la démo...</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Error message */}
                            {error && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                                    <div className="flex flex-col items-center text-center max-w-md px-6">
                                        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                                            <AlertTriangle className="h-6 w-6 text-destructive" />
                                        </div>
                                        <h4 className="text-lg font-medium mb-2">Impossible d'afficher la démo</h4>
                                        <p className="text-sm text-muted-foreground mb-4">{error}</p>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="border-primary/20"
                                            asChild
                                        >
                                            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                                                Essayer d'ouvrir dans un nouvel onglet
                                                <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Device "notch" for mobile */}
                            {currentDevice === 'mobile' && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-muted rounded-b-lg z-20" />
                            )}
                            
                            {/* Iframe */}
                            {!error && (
                                <iframe
                                    ref={iframeRef}
                                    src={getIframeSrc()}
                                    title={`Démo de ${title}`}
                                    className="w-full h-full border-0 bg-white"
                                    onLoad={handleIframeLoad}
                                    onError={handleIframeError}
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                />
                            )}
                            
                            {/* Mobile-specific UI elements */}
                            {currentDevice === 'mobile' && (
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-muted border-t border-border/30 flex items-center justify-center">
                                    <div className="w-1/3 h-1 bg-muted-foreground/40 rounded-full"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="p-3 border-t border-border/50 bg-muted/20 flex justify-between">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={onClose}
                        >
                            <ChevronLeft className="mr-1.5 h-3.5 w-3.5" />
                            Retour
                        </Button>
                        
                        <Button asChild size="sm">
                            <a href={getIframeSrc()} target="_blank" rel="noopener noreferrer">
                                Ouvrir dans un nouvel onglet
                                <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}); 