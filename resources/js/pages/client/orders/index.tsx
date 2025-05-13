import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarIcon, CheckCircle, Clock, DollarSign, ExternalLink, Package, ShoppingCart, Truck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Mes commandes',
        href: '/client/orders',
    },
];

// Types pour les commandes
interface Order {
    id: string;
    name: string;
    description: string;
    amount: number;
    status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'canceled';
    date: string;
}

// Données d'exemple pour les commandes
const ordersData: Order[] = [
    {
        id: 'CMD-001',
        name: 'Site web e-commerce',
        description: 'Création d\'un site e-commerce complet avec Laravel et React',
        amount: 2500,
        status: 'processing',
        date: '2024-04-15',
    },
    {
        id: 'CMD-002',
        name: 'Application mobile',
        description: 'Développement d\'une application mobile pour iOS et Android',
        amount: 4000,
        status: 'pending',
        date: '2024-04-22',
    },
    {
        id: 'CMD-003',
        name: 'Logo et identité visuelle',
        description: 'Création d\'un logo et d\'une charte graphique complète',
        amount: 800,
        status: 'delivered',
        date: '2024-03-10',
    },
];

export default function Orders() {
    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }).format(date);
    };

    // Formater le montant en euros
    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', { 
            style: 'currency', 
            currency: 'EUR' 
        }).format(amount);
    };

    // Obtenir l'icône et la couleur selon le statut de la commande
    const getStatusInfo = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return { 
                    icon: <ShoppingCart className="h-5 w-5" />, 
                    color: 'text-amber-500',
                    label: 'En attente' 
                };
            case 'processing':
                return { 
                    icon: <Clock className="h-5 w-5" />, 
                    color: 'text-blue-500',
                    label: 'En cours' 
                };
            case 'shipping':
                return { 
                    icon: <Truck className="h-5 w-5" />, 
                    color: 'text-indigo-500',
                    label: 'En livraison' 
                };
            case 'delivered':
                return { 
                    icon: <CheckCircle className="h-5 w-5" />, 
                    color: 'text-green-500',
                    label: 'Livré' 
                };
            case 'canceled':
                return { 
                    icon: <Package className="h-5 w-5" />, 
                    color: 'text-red-500',
                    label: 'Annulé' 
                };
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes commandes" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Mes commandes</h1>
                        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                            Nouvelle commande
                        </button>
                    </div>
                    
                    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                            <thead className="bg-neutral-50 dark:bg-neutral-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Commande
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Montant
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Statut
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                                {ordersData.map((order) => {
                                    const statusInfo = getStatusInfo(order.status);
                                    return (
                                        <tr key={order.id}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="font-medium">{order.name}</div>
                                                <div className="text-xs text-neutral-500">{order.id}</div>
                                            </td>
                                            <td className="max-w-xs truncate px-6 py-4">
                                                <span className="text-sm">{order.description}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                {formatDate(order.date)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <span className="font-medium">{formatAmount(order.amount)}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <div className={`flex items-center ${statusInfo.color}`}>
                                                    {statusInfo.icon}
                                                    <span className="ml-2">{statusInfo.label}</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                <a href={`/client/orders/${order.id}`} className="mr-3 font-medium text-primary hover:underline">
                                                    Détails
                                                </a>
                                                <a href={`/client/orders/${order.id}/invoice`} className="font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
                                                    Facture
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 