import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, LockIcon, Play, Clock, Download, Code, BookOpen, GraduationCap, AlertCircle } from 'lucide-react';
import { Chapter } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface TutorialContentProps {
    chapters: Chapter[];
    selectedChapter: number;
    completedChapters: number[];
    videoProgress: { [key: number]: number };
    onChapterClick: (index: number) => void;
    canAccessChapter: (chapter: Chapter) => boolean;
}

export default function TutorialContent({
    chapters,
    selectedChapter,
    completedChapters,
    videoProgress,
    onChapterClick,
    canAccessChapter
}: TutorialContentProps) {
    // Vérifier si le chapitre sélectionné existe
    const currentChapter = chapters[selectedChapter];
    
    // Log pour déboguer
    console.log('Chapitres disponibles:', chapters);
    console.log('Chapitre sélectionné:', selectedChapter);
    console.log('Chapitre actuel:', currentChapter);

    if (!currentChapter) {
        return (
            <div className="text-center py-12">
                <div className="bg-card/20 rounded-xl border border-border/30 p-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Chapitre non trouvé</h3>
                    <p className="text-foreground/60">
                        Le chapitre que vous recherchez n'existe pas.
                    </p>
                    {chapters.length > 0 && (
                        <Button 
                            className="mt-4"
                            onClick={() => onChapterClick(0)}
                        >
                            Retour au premier chapitre
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    const progress = videoProgress[selectedChapter] || 0;

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'débutant':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'intermédiaire':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'avancé':
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'expert':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            default:
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-8">
            {/* Video player placeholder */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-video rounded-xl overflow-hidden bg-black/5 border border-border/30"
            >
                {canAccessChapter(currentChapter) ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button 
                            size="lg" 
                            className="rounded-full w-16 h-16 bg-primary/90 hover:bg-primary text-white shadow-lg"
                        >
                            <Play className="h-6 w-6 ml-1" fill="currentColor" />
                        </Button>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center">
                            <LockIcon className="h-12 w-12 mx-auto text-white/80 mb-4" />
                            <p className="text-white/80">Ce chapitre est verrouillé</p>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Progress bar */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
            >
                <div className="flex justify-between text-sm">
                    <span>Progression du chapitre</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </motion.div>

            {/* Chapter navigation */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between items-center"
            >
                <Button
                    variant="outline"
                    onClick={() => onChapterClick(selectedChapter - 1)}
                    disabled={selectedChapter === 0}
                    className="gap-2"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Chapitre précédent
                </Button>
                <Button
                    variant="outline"
                    onClick={() => onChapterClick(selectedChapter + 1)}
                    disabled={selectedChapter === chapters.length - 1}
                    className="gap-2"
                >
                    Chapitre suivant
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </motion.div>

            {/* Chapter content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
            >
                <div className="bg-card/50 rounded-xl p-6 border border-border/30">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">{currentChapter.title}</h2>
                        <div className="flex items-center gap-3">
                            {currentChapter.difficulty && (
                                <Badge variant="outline" className={getDifficultyColor(currentChapter.difficulty)}>
                                    <GraduationCap className="h-4 w-4 mr-1" />
                                    {currentChapter.difficulty}
                                </Badge>
                            )}
                            <div className="flex items-center text-sm text-foreground/60">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{currentChapter.duration} min</span>
                            </div>
                        </div>
                    </div>
                    {currentChapter.description && (
                        <div className="prose prose-lg max-w-none">
                            <p className="text-foreground/80 leading-relaxed">{currentChapter.description}</p>
                        </div>
                    )}
                </div>

                {/* Skills section */}
                {currentChapter.skills && currentChapter.skills.length > 0 && (
                    <div className="bg-card/50 rounded-xl p-6 border border-border/30">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Code className="h-5 w-5 mr-2 text-primary" />
                            Compétences acquises
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {currentChapter.skills.map((skill, index) => (
                                <Badge 
                                    key={index}
                                    variant="secondary"
                                    className="bg-primary/5 text-primary hover:bg-primary/10"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Resources section */}
                {currentChapter.resources && Object.keys(currentChapter.resources).length > 0 && (
                    <div className="bg-card/50 rounded-xl p-6 border border-border/30">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-primary" />
                            Ressources complémentaires
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(currentChapter.resources).map(([key, value]) => (
                                <Card 
                                    key={key}
                                    className="p-4 hover:border-primary/30 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                            <Download className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium capitalize">{key}</h4>
                                            <a 
                                                href={value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:underline"
                                            >
                                                Accéder à la ressource
                                            </a>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
} 