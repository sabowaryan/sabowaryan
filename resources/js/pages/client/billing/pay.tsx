import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, CreditCard, DollarSign, Lock, ShieldCheck } from 'lucide-react';

interface PageProps {
    invoiceId: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Facturation',
        href: '/client/billing',
    },
    {
        title: 'Paiement',
        href: '#',
    },
];

// Type pour la facture
interface Invoice {
    id: string;
    number: string;
    date: string;
    dueDate: string;
    amount: number;
    isPaid: boolean;
    projectId?: string;
    projectName?: string;
    items: InvoiceItem[];
}

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

// Type pour les méthodes de paiement
interface PaymentMethod {
    id: string;
    type: 'card' | 'bank';
    name: string;
    last4: string;
    expiry?: string;
    isDefault: boolean;
}

// Données d'exemple
const invoicesData: Record<string, Invoice> = {
    'inv-001': {
        id: 'inv-001',
        number: 'FACT-2024-001',
        date: '2024-04-15',
        dueDate: '2024-05-15',
        amount: 2500,
        isPaid: false,
        projectId: 'PRJ-001',
        projectName: 'Site web e-commerce',
        items: [
            {
                id: 'item-001',
                description: 'Développement frontend',
                quantity: 1,
                unitPrice: 1200,
                total: 1200,
            },
            {
                id: 'item-002',
                description: 'Intégration système de paiement',
                quantity: 1,
                unitPrice: 800,
                total: 800,
            },
            {
                id: 'item-003',
                description: 'Hébergement (1 an)',
                quantity: 1,
                unitPrice: 500,
                total: 500,
            },
        ],
    },
    'inv-003': {
        id: 'inv-003',
        number: 'FACT-2024-003',
        date: '2024-04-22',
        dueDate: '2024-05-22',
        amount: 1600,
        isPaid: false,
        projectId: 'PRJ-002',
        projectName: 'Application mobile',
        items: [
            {
                id: 'item-006',
                description: 'Acompte développement application mobile',
                quantity: 1,
                unitPrice: 1600,
                total: 1600,
            },
        ],
    }
};

// Méthodes de paiement enregistrées
const savedPaymentMethods: PaymentMethod[] = [
    {
        id: 'pm-001',
        type: 'card',
        name: 'Visa',
        last4: '4242',
        expiry: '09/25',
        isDefault: true,
    },
    {
        id: 'pm-002',
        type: 'bank',
        name: 'Prélèvement SEPA',
        last4: '5678',
        isDefault: false,
    },
];

export default function PayInvoice({ invoiceId }: PageProps) {
    // Récupérer les données de la facture
    const invoice = invoicesData[invoiceId] || {
        id: invoiceId,
        number: 'Facture inconnue',
        date: '',
        dueDate: '',
        amount: 0,
        isPaid: false,
        items: []
    };

    // Formater la date
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Paiement de facture" />
            <div className="flex h-full flex-1 flex-col p-4">
                <div className="mb-6">
                    <a 
                        href="/client/billing" 
                        className="flex w-fit items-center rounded-md text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Retour à la facturation
                    </a>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Détails de la facture */}
                    <div className="md:col-span-2">
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h1 className="mb-6 text-2xl font-semibold">Paiement de facture</h1>
                            
                            <div className="mb-8 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                <h2 className="mb-4 font-medium">Résumé de la facture</h2>
                                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-neutral-500">Numéro de facture</p>
                                        <p className="font-medium">{invoice.number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500">Date d'émission</p>
                                        <p className="font-medium">{formatDate(invoice.date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500">Date d'échéance</p>
                                        <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                                    </div>
                                    {invoice.projectName && (
                                        <div>
                                            <p className="text-sm text-neutral-500">Projet associé</p>
                                            <p className="font-medium">{invoice.projectName}</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="rounded-lg border border-neutral-200 dark:border-neutral-700">
                                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                                        <thead className="bg-neutral-50 dark:bg-neutral-800">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                    Description
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                    Quantité
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                    Prix unitaire
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                                            {invoice.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                        {item.description}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                                                        {formatAmount(item.unitPrice)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
                                                        {formatAmount(item.total)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="border-t-2 border-neutral-300 bg-neutral-50 font-medium dark:border-neutral-600 dark:bg-neutral-800">
                                            <tr>
                                                <td colSpan={3} className="px-4 py-3 text-right text-sm">
                                                    Total à payer
                                                </td>
                                                <td className="px-4 py-3 text-right text-base font-semibold">
                                                    {formatAmount(invoice.amount)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            
                            {/* Choix du mode de paiement */}
                            <h2 className="mb-4 font-medium">Méthode de paiement</h2>
                            
                            <div className="mb-6 space-y-3">
                                {savedPaymentMethods.map((method) => (
                                    <label key={method.id} className="flex cursor-pointer items-center rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            defaultChecked={method.isDefault}
                                            className="h-4 w-4 text-primary focus:ring-primary"
                                        />
                                        <div className="ml-3 flex items-center">
                                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                                {method.type === 'card' ? <CreditCard className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <div className="font-medium">{method.name}</div>
                                                <div className="text-xs text-neutral-500">
                                                    {method.type === 'card' 
                                                        ? `**** **** **** ${method.last4} • Expire le ${method.expiry}`
                                                        : `Compte se terminant par ${method.last4}`
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                                
                                <label className="flex cursor-pointer items-center rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="new-card"
                                        className="h-4 w-4 text-primary focus:ring-primary"
                                    />
                                    <div className="ml-3">
                                        <div className="font-medium">Ajouter une nouvelle carte</div>
                                    </div>
                                </label>
                            </div>
                            
                            {/* Formulaire pour nouvelle carte */}
                            <div className="mb-8 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                <h3 className="mb-4 font-medium">Informations de carte</h3>
                                <div className="grid gap-4">
                                    <div>
                                        <label htmlFor="cardName" className="mb-1 block text-sm font-medium">
                                            Nom sur la carte
                                        </label>
                                        <input
                                            type="text"
                                            id="cardName"
                                            className="w-full rounded-md border border-neutral-300 p-2.5 text-sm focus:border-primary focus:ring-primary dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                                            placeholder="Jean Dupont"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium">
                                            Numéro de carte
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            className="w-full rounded-md border border-neutral-300 p-2.5 text-sm focus:border-primary focus:ring-primary dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                                            placeholder="1234 5678 9012 3456"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiry" className="mb-1 block text-sm font-medium">
                                                Date d'expiration
                                            </label>
                                            <input
                                                type="text"
                                                id="expiry"
                                                className="w-full rounded-md border border-neutral-300 p-2.5 text-sm focus:border-primary focus:ring-primary dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                                                placeholder="MM/AA"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvc" className="mb-1 block text-sm font-medium">
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                id="cvc"
                                                className="w-full rounded-md border border-neutral-300 p-2.5 text-sm focus:border-primary focus:ring-primary dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="saveCard"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor="saveCard" className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                                            Sauvegarder cette carte pour les prochains paiements
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Récapitulatif de paiement */}
                    <div>
                        <div className="sticky top-4 rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-900">
                            <h2 className="mb-4 text-lg font-medium">Résumé du paiement</h2>
                            
                            <div className="mb-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600 dark:text-neutral-400">Sous-total</span>
                                    <span>{formatAmount(invoice.amount)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600 dark:text-neutral-400">TVA (20%)</span>
                                    <span>{formatAmount(invoice.amount * 0.2)}</span>
                                </div>
                                <div className="border-t border-neutral-200 pt-3 dark:border-neutral-700">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total à payer</span>
                                        <span>{formatAmount(invoice.amount * 1.2)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                type="button"
                                className="mb-4 flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30"
                            >
                                <Lock className="mr-2 h-4 w-4" />
                                Payer {formatAmount(invoice.amount * 1.2)}
                            </button>
                            
                            <div className="flex justify-center text-xs text-neutral-500">
                                <Lock className="mr-1 h-3.5 w-3.5" />
                                Paiement sécurisé via notre passerelle de paiement
                            </div>
                            
                            <div className="mt-6 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                                <h3 className="mb-2 flex items-center text-sm font-medium">
                                    <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" />
                                    Protection de l'acheteur
                                </h3>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                    Votre paiement est protégé. Si un problème survient avec votre commande, nous travaillerons avec vous pour le résoudre.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 