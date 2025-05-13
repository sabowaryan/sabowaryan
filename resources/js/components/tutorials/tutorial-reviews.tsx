import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, ReplyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';

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

interface TutorialReviewsProps {
    tutorialId: number;
    reviews: Review[];
    averageRating: number;
    hasUserReviewed: boolean;
    onReviewAdded: (newReview: Review) => void;
}

export default function TutorialReviews({ 
    tutorialId, 
    reviews, 
    averageRating, 
    hasUserReviewed,
    onReviewAdded 
}: TutorialReviewsProps) {
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const toast = useToast();

    const handleMarkHelpful = async (reviewId: number) => {
        try {
            const response = await axios.post(`/api/tutorials/${tutorialId}/reviews/${reviewId}/helpful`);
            if (response.data.success) {
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
            const response = await axios.post(`/api/tutorials/${tutorialId}/reviews/${reviewId}/reply`, {
                reply: replyContent
            });
            if (response.data.success) {
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
        <div className="space-y-6">
            {/* En-tête des avis */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 ${
                                        star <= averageRating
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-foreground/20'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="text-sm text-foreground/50">
                            {reviews.length} avis
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste des avis */}
            <div className="space-y-6">
                {reviews?.map((review, index) => (
                    <motion.div 
                        key={review.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card/30 p-6 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300"
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-4">
                                {review.user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div>
                                <div className="font-medium text-lg">{review.user?.name || 'Anonyme'}</div>
                                <div className="text-foreground/50 text-sm">il y a 2 jours</div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                            star <= review.rating
                                                ? 'text-yellow-500 fill-yellow-500'
                                                : 'text-foreground/20'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-foreground/80">{review.content}</p>
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <button
                                onClick={() => handleMarkHelpful(review.id)}
                                className={`flex items-center gap-1 text-sm ${
                                    review.is_helpful
                                        ? 'text-primary'
                                        : 'text-foreground/50 hover:text-primary'
                                }`}
                            >
                                <ThumbsUp className="h-4 w-4" />
                                <span>Utile ({review.helpful_count})</span>
                            </button>
                            <button
                                onClick={() => setReplyingTo(review.id)}
                                className="flex items-center gap-1 text-sm text-foreground/50 hover:text-primary"
                            >
                                <ReplyIcon className="h-4 w-4" />
                                <span>Répondre</span>
                            </button>
                        </div>

                        {replyingTo === review.id && (
                            <div className="mt-4">
                                <Textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Écrivez votre réponse..."
                                    className="mb-2"
                                />
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setReplyingTo(null);
                                            setReplyContent('');
                                        }}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        onClick={() => handleReplySubmit(review.id)}
                                        disabled={!replyContent.trim()}
                                    >
                                        Envoyer
                                    </Button>
                                </div>
                            </div>
                        )}

                        {review.replies && review.replies.length > 0 && (
                            <div className="mt-4 space-y-4 pl-12">
                                {review.replies.map((reply) => (
                                    <div key={reply.id} className="bg-card/20 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                                                {reply.user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="font-medium">{reply.user.name}</div>
                                        </div>
                                        <p className="text-foreground/80">{reply.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 