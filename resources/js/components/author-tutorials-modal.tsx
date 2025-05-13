import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    BookOpen,
    Star,
    Play,
    Clock,
    CheckCircle,
    LockIcon,
    Gift
} from 'lucide-react';

interface AuthorTutorialsModalProps {
    isOpen: boolean;
    onClose: () => void;
    authorName: string;
    authorAvatar: string;
    authorTitle: string;
    authorRating: number;
    tutorialsCount: number;
    tutorials: Array<{
        id: number;
        title: string;
        image: string;
        level: string;
        duration: string;
        is_premium: boolean;
        rating: number;
    }>;
}

export default function AuthorTutorialsModal({ 
    isOpen, 
    onClose,
    authorName,
    authorAvatar,
    authorTitle,
    authorRating,
    tutorialsCount,
    tutorials
}: AuthorTutorialsModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div 
                        className="bg-card rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                    >
                        <div className="flex justify-between items-center mb-5 border-b border-border/30 pb-5">
                            <h3 className="text-xl font-bold flex items-center">
                                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                Tous les tutoriels de {authorName}
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-8 w-8 hover:bg-primary/10 transition-colors"
                                onClick={onClose}
                            >
                                <span className="sr-only">Fermer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform hover:rotate-90">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </Button>
                        </div>
                        
                        <div className="overflow-y-auto pr-2 pb-2">
                            <div className="flex gap-4 items-center mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                    <img 
                                        src={authorAvatar} 
                                        alt={authorName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-lg">{authorName}</div>
                                    <div className="text-foreground/70 text-sm">{authorTitle}</div>
                                </div>
                                
                                <div className="ml-auto flex items-center gap-1 text-sm bg-primary/10 px-3 py-1 rounded-full text-primary">
                                    <Star className="h-4 w-4 text-primary" fill="currentColor" />
                                    <span className="font-medium">{authorRating}</span>
                                    <span className="text-xs text-primary/70">({tutorialsCount} tutoriels)</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {tutorials.map((tutorial, index) => (
                                    <motion.div
                                        key={tutorial.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="bg-card/50 border border-border/30 rounded-lg overflow-hidden hover:shadow-md transition-all hover:border-primary/30 group"
                                    >
                                        <div className="h-24 bg-primary/5 relative">
                                            <div className="absolute top-2 right-2 z-10 flex gap-1.5">
                                                {tutorial.is_premium && (
                                                    <Badge className="bg-yellow-500 text-white border-none">
                                                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                                        Premium
                                                    </Badge>
                                                )}
                                                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                                                    {tutorial.level}
                                                </Badge>
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className="h-8 w-8 text-primary opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                                {tutorial.title}
                                            </h4>
                                            <div className="flex justify-between items-center text-xs text-foreground/70">
                                                <div className="flex items-center">
                                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                                    {tutorial.duration}
                                                </div>
                                                <div className="flex items-center">
                                                    <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" fill="currentColor" />
                                                    {tutorial.rating}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="text-center mt-6 border-t border-border/30 pt-6">
                                <p className="text-foreground/70 mb-3">Découvrez tous les tutoriels de {authorName}</p>
                                <Button className="gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    Voir tous les tutoriels ({tutorialsCount})
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 