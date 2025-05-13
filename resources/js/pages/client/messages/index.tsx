import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, Paperclip, Search, Send, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Messagerie',
        href: '/client/messages',
    },
];

// Types pour les conversations et messages
interface Message {
    id: string;
    content: string;
    sender: string;
    senderType: 'client' | 'support' | 'developer';
    timestamp: string;
    isRead: boolean;
}

interface Conversation {
    id: string;
    title: string;
    projectId?: string;
    projectName?: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    messages: Message[];
}

// Données d'exemple pour les conversations
const conversationsData: Conversation[] = [
    {
        id: 'conv-001',
        title: 'Développement e-commerce',
        projectId: 'PRJ-001',
        projectName: 'Site web e-commerce',
        lastMessage: 'Nous avons terminé l\'intégration du système de paiement. Pouvez-vous le tester ?',
        timestamp: '2024-04-28T15:45:00',
        unreadCount: 2,
        messages: [
            {
                id: 'msg-001',
                content: 'Bonjour, où en est le développement du panier d\'achat ?',
                sender: 'Vous',
                senderType: 'client',
                timestamp: '2024-04-27T10:30:00',
                isRead: true,
            },
            {
                id: 'msg-002',
                content: 'Bonjour, nous travaillons actuellement sur l\'intégration du panier et du système de paiement. Nous devrions avoir terminé demain.',
                sender: 'Marie Laurent',
                senderType: 'developer',
                timestamp: '2024-04-27T14:20:00',
                isRead: true,
            },
            {
                id: 'msg-003',
                content: 'Merci pour l\'information. J\'attends votre retour.',
                sender: 'Vous',
                senderType: 'client',
                timestamp: '2024-04-27T15:45:00',
                isRead: true,
            },
            {
                id: 'msg-004',
                content: 'Nous avons terminé l\'intégration du système de paiement. Pouvez-vous le tester ?',
                sender: 'Marie Laurent',
                senderType: 'developer',
                timestamp: '2024-04-28T15:45:00',
                isRead: false,
            },
        ],
    },
    {
        id: 'conv-002',
        title: 'Application Mobile',
        projectId: 'PRJ-002',
        projectName: 'Application mobile',
        lastMessage: 'Pouvez-vous nous fournir les identifiants pour accéder à votre API ?',
        timestamp: '2024-04-28T10:15:00',
        unreadCount: 1,
        messages: [
            {
                id: 'msg-005',
                content: 'Bonjour, nous allons commencer le développement de l\'application. Avez-vous des préférences concernant le design ?',
                sender: 'Thomas Dubois',
                senderType: 'developer',
                timestamp: '2024-04-26T09:45:00',
                isRead: true,
            },
            {
                id: 'msg-006',
                content: 'Pouvez-vous nous fournir les identifiants pour accéder à votre API ?',
                sender: 'Thomas Dubois',
                senderType: 'developer',
                timestamp: '2024-04-28T10:15:00',
                isRead: false,
            },
        ],
    },
    {
        id: 'conv-003',
        title: 'Support Technique',
        lastMessage: 'Votre problème a été résolu. N\'hésitez pas si vous avez d\'autres questions.',
        timestamp: '2024-04-25T14:30:00',
        unreadCount: 0,
        messages: [
            {
                id: 'msg-007',
                content: 'Bonjour, j\'ai un problème pour me connecter à mon compte administrateur.',
                sender: 'Vous',
                senderType: 'client',
                timestamp: '2024-04-25T11:20:00',
                isRead: true,
            },
            {
                id: 'msg-008',
                content: 'Bonjour, pouvez-vous me donner plus de détails sur l\'erreur que vous rencontrez ?',
                sender: 'Support Technique',
                senderType: 'support',
                timestamp: '2024-04-25T11:35:00',
                isRead: true,
            },
            {
                id: 'msg-009',
                content: 'J\'ai réinitialisé votre mot de passe. Vous devriez recevoir un email dans quelques minutes.',
                sender: 'Support Technique',
                senderType: 'support',
                timestamp: '2024-04-25T13:40:00',
                isRead: true,
            },
            {
                id: 'msg-010',
                content: 'Votre problème a été résolu. N\'hésitez pas si vous avez d\'autres questions.',
                sender: 'Support Technique',
                senderType: 'support',
                timestamp: '2024-04-25T14:30:00',
                isRead: true,
            },
        ],
    },
];

export default function Messages() {
    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Si c'est aujourd'hui, afficher l'heure
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        }
        
        // Si c'est hier, afficher "Hier"
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Hier';
        }
        
        // Sinon afficher la date
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    };

    // Conversation active (la première par défaut)
    const activeConversation = conversationsData[0];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messagerie" />
            <div className="flex h-full flex-1 flex-col">
                <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                    {/* Liste des conversations */}
                    <div className="w-1/3 border-r border-neutral-200 dark:border-neutral-700">
                        <div className="border-b border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher une conversation..."
                                    className="w-full rounded-md border border-neutral-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                            </div>
                        </div>
                        <div className="h-[calc(100%-4rem)] overflow-y-auto">
                            {conversationsData.map((conversation) => (
                                <div 
                                    key={conversation.id}
                                    className={`flex cursor-pointer border-b border-neutral-200 p-4 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 ${
                                        conversation.id === activeConversation.id ? 'bg-neutral-100 dark:bg-neutral-800' : ''
                                    }`}
                                >
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center justify-between">
                                            <h3 className="font-medium">{conversation.title}</h3>
                                            <span className="text-xs text-neutral-500">{formatDate(conversation.timestamp)}</span>
                                        </div>
                                        {conversation.projectName && (
                                            <div className="mb-1 text-xs text-neutral-500">
                                                Projet: {conversation.projectName}
                                            </div>
                                        )}
                                        <p className="text-sm text-neutral-600 line-clamp-1 dark:text-neutral-400">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                    {conversation.unreadCount > 0 && (
                                        <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                                            {conversation.unreadCount}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Conversation active */}
                    <div className="flex flex-1 flex-col">
                        <div className="border-b border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-medium">{activeConversation.title}</h2>
                                    {activeConversation.projectName && (
                                        <div className="text-xs text-neutral-500">
                                            Projet: {activeConversation.projectName}
                                        </div>
                                    )}
                                </div>
                                <button className="rounded-md bg-neutral-100 px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                                    Fermer
                                </button>
                            </div>
                        </div>
                        
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {activeConversation.messages.map((message) => (
                                <div 
                                    key={message.id}
                                    className={`mb-4 flex ${message.senderType === 'client' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.senderType !== 'client' && (
                                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                                            <User className="h-5 w-5" />
                                        </div>
                                    )}
                                    <div 
                                        className={`max-w-[70%] rounded-lg p-3 ${
                                            message.senderType === 'client' 
                                                ? 'bg-primary text-white' 
                                                : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                                        }`}
                                    >
                                        {message.senderType !== 'client' && (
                                            <div className="mb-1 text-xs font-medium">{message.sender}</div>
                                        )}
                                        <div className="text-sm">{message.content}</div>
                                        <div className="mt-1 text-right text-xs opacity-70">
                                            {new Date(message.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Input pour écrire un message */}
                        <div className="border-t border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="flex items-end gap-2">
                                <div className="relative flex-1">
                                    <textarea 
                                        placeholder="Écrivez votre message..." 
                                        className="w-full resize-none rounded-lg border border-neutral-300 p-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                                        rows={2}
                                    ></textarea>
                                    <button className="absolute bottom-3 right-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                                        <Paperclip className="h-5 w-5" />
                                    </button>
                                </div>
                                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90">
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 