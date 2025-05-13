import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
    BookOpen,
    CheckCircle,
    Clock,
    LockIcon,
    Play,
    Gift
} from 'lucide-react';

interface Chapter {
    id: number;
    title: string;
    duration: number;
    is_free: boolean;
    videoUrl: string;
}

interface TutorialChaptersProps {
    chapters: Chapter[];
    selectedChapter: number;
    completedChapters: number[];
    videoProgress: { [key: number]: number };
    onChapterClick: (index: number) => void;
    canAccessChapter: (chapter: Chapter) => boolean;
}

export default function TutorialChapters({
    chapters,
    selectedChapter,
    completedChapters,
    videoProgress,
    onChapterClick,
    canAccessChapter
}: TutorialChaptersProps) {
    // Calculer la progression réelle
    const actualProgress = Math.round(
        ((completedChapters.length + (videoProgress[selectedChapter] >= 100 ? 1 : (videoProgress[selectedChapter] || 0) / 100)) / chapters.length) * 100
    );

    return (
        <div className="space-y-6">
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
                            {chapters.length} chapitres
                        </Badge>
                    </div>
                    
                    <div className="mb-5 sm:mb-6 md:mb-8 bg-card/40 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border/30">
                        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-2 sm:mb-3 gap-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-primary">
                                    <motion.div 
                                        animate={{ 
                                            rotate: actualProgress >= 100 ? 360 : actualProgress * 3.6
                                        }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    >
                                        {actualProgress >= 100 ? (
                                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        ) : (
                                            <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-primary"></div>
                                        )}
                                    </motion.div>
                                </div>
                                <div>
                                    <div className="text-xs sm:text-sm font-medium">Votre progression</div>
                                    <div className="text-[10px] sm:text-xs text-foreground/60">
                                        {completedChapters.length}/{chapters.length} terminés
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-primary">
                                {actualProgress}%
                            </div>
                        </div>
                        
                        <div className="h-2 sm:h-2.5 w-full bg-gradient-to-r from-border/10 via-border/20 to-border/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-primary/90 via-primary to-primary/90 rounded-full relative" 
                                initial={{ width: "0%" }}
                                animate={{ width: `${actualProgress}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {actualProgress > 0 && (
                                    <motion.div 
                                        className="absolute top-0 right-0 h-full w-1 sm:w-1.5 bg-white/40"
                                        animate={{ 
                                            opacity: [0.3, 0.8, 0.3],
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
                        
                        <div className="flex flex-wrap justify-between text-[10px] sm:text-xs text-foreground/60 mt-1.5 sm:mt-2">
                            <span className="whitespace-nowrap">Durée totale: {chapters.reduce((acc, chapter) => acc + chapter.duration, 0)} min</span>
                            {actualProgress >= 100 && (
                                <span className="text-green-500 font-medium flex items-center whitespace-nowrap">
                                    <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                    Tutoriel complété
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="mb-3 sm:mb-4">
                        <div className="text-xs sm:text-sm font-semibold text-foreground/80 flex items-center mb-2 sm:mb-3">
                            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-primary" />
                            Liste des chapitres
                        </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3 relative">
                        {/* Ligne verticale de progression avec animation */}
                        <div className="absolute left-[18px] sm:left-[22px] top-[20px] sm:top-[24px] bottom-4 w-0.5 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 rounded-full z-0" />
                        <motion.div 
                            className="absolute left-[18px] sm:left-[22px] top-[20px] sm:top-[24px] w-0.5 bg-primary/40 rounded-full z-0"
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.min(100, actualProgress)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                        
                        {/* Container avec défilement pour les chapitres sur mobile */}
                        <div className="max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30">
                            {chapters.map((chapter, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`relative overflow-hidden transition-all duration-300 mb-2 sm:mb-3 last:mb-0 ${
                                        selectedChapter === index 
                                            ? 'bg-gradient-to-r from-primary/15 to-primary/5 border-primary/50' 
                                            : 'hover:bg-card/80 border-border/40'
                                    } ${
                                        !canAccessChapter(chapter) 
                                            ? 'cursor-not-allowed opacity-80' 
                                            : 'cursor-pointer hover:border-primary/40'
                                    } p-0 rounded-lg sm:rounded-xl border shadow-sm group hover:shadow-md`}
                                    onClick={() => onChapterClick(index)}
                                >
                                    {selectedChapter === index && (
                                        <motion.div 
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary to-primary/60"
                                            layoutId="chapterSelectedIndicator"
                                            initial={{ height: 0 }}
                                            animate={{ height: '100%' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                    
                                    <div className="p-2.5 sm:p-3.5 relative z-10">
                                        <div className="flex flex-col gap-2">
                                            {/* Titre du chapitre en haut */}
                                            <div className="flex items-start gap-2.5 sm:gap-3 w-full min-w-0">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0 ${
                                                        completedChapters.includes(index)
                                                            ? 'bg-gradient-to-br from-green-400 to-green-500 text-white' 
                                                            : selectedChapter === index 
                                                                ? 'bg-gradient-to-br from-primary/90 to-primary text-white' 
                                                                : 'bg-card border border-border/60 text-primary/70 group-hover:border-primary/40'
                                                        }`}>
                                                        {completedChapters.includes(index) ? (
                                                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        ) : (
                                                            <span className="text-[10px] sm:text-xs font-semibold">{index + 1}</span>
                                                        )}
                                                    </div>
                                                    <div className="hidden sm:flex items-center mt-1">
                                                        <Clock className="h-3 w-3 text-foreground/50" />
                                                        <span className="text-[10px] text-foreground/60 ml-0.5">{chapter.duration} min</span>
                                                    </div>
                                                </div>
                                                <h4 className={`font-medium sm:font-semibold text-xs sm:text-sm md:text-base transition-colors ${
                                                    !canAccessChapter(chapter) 
                                                        ? 'text-foreground/40' 
                                                        : selectedChapter === index 
                                                            ? 'text-primary font-semibold' 
                                                            : 'group-hover:text-primary'
                                                    } flex-grow min-w-0 pt-1`}>
                                                    <span className="line-clamp-2 break-normal">{chapter.title}</span>
                                                </h4>
                                            </div>
                                            
                                            {/* Contenu supplémentaire en dessous */}
                                            <div className="flex items-center justify-between pl-8 sm:pl-11 mt-1">
                                                <div className="flex items-center sm:hidden">
                                                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5 text-foreground/50" />
                                                    <span className="text-[10px] sm:text-xs text-foreground/60">{chapter.duration} min</span>
                                                </div>
                                                
                                                <div className="ml-auto">
                                                    {!canAccessChapter(chapter) ? (
                                                        <motion.div 
                                                            className="flex items-center text-yellow-500 bg-yellow-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-yellow-500/20"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <LockIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-1.5" />
                                                            <span className="text-[10px] sm:text-xs font-medium">Premium</span>
                                                        </motion.div>
                                                    ) : completedChapters.includes(index) ? (
                                                        <motion.div 
                                                            className="flex items-center text-green-500 bg-green-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-green-500/20"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-1.5" />
                                                            <span className="text-[10px] sm:text-xs font-medium">Complété</span>
                                                        </motion.div>
                                                    ) : selectedChapter === index ? (
                                                        <motion.div 
                                                            className="flex items-center text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-primary/20"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-1.5" fill="currentColor" />
                                                            <span className="text-[10px] sm:text-xs font-medium">En cours</span>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div 
                                                            className="flex items-center text-green-500 bg-green-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-green-500/20"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Gift className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-1.5" />
                                                            <span className="text-[10px] sm:text-xs font-medium">Gratuit</span>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Effet de survol */}
                                    {selectedChapter === index && (
                                        <motion.div 
                                            className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-primary/5 rounded-full -mr-8 -mb-8 sm:-mr-10 sm:-mb-10 z-0"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 