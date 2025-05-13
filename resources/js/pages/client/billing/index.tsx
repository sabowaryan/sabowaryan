import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowDownToLine, Calendar, CreditCard, DollarSign, File, FileText, Receipt, ShoppingCart, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Facturation',
        href: '/client/billing',
    },
];

// Types pour la facturation
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

interface PaymentMethod {
    id: string;
    type: 'card' | 'bank';
    name: string;
    last4: string;
    expiry?: string;
    isDefault: boolean;
}

// Données d'exemple pour les factures
const invoicesData: Invoice[] = [
    {
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
    {
        id: 'inv-002',
        number: 'FACT-2024-002',
        date: '2024-03-10',
        dueDate: '2024-04-10',
        amount: 800,
        isPaid: true,
        projectId: 'PRJ-003',
        projectName: 'Refonte graphique',
        items: [
            {
                id: 'item-004',
                description: 'Création logo',
                quantity: 1,
                unitPrice: 400,
                total: 400,
            },
            {
                id: 'item-005',
                description: 'Charte graphique',
                quantity: 1,
                unitPrice: 400,
                total: 400,
            },
        ],
    },
    {
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
    },
];

// Données d'exemple pour les moyens de paiement
const paymentMethodsData: PaymentMethod[] = [
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

export default function Billing() {
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

    // Calculer le montant total des factures impayées
    const totalUnpaid = invoicesData
        .filter(invoice => !invoice.isPaid)
        .reduce((total, invoice) => total + invoice.amount, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Facturation" />
            <div className="flex h-full flex-1 flex-col gap-8 p-4">
                {/* En-tête avec résumé */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="mb-3 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-medium">Montant total à payer</h3>
                        </div>
                        <div className="text-2xl font-semibold">{formatAmount(totalUnpaid)}</div>
                        <div className="mt-2 text-xs text-neutral-500">
                            {invoicesData.filter(invoice => !invoice.isPaid).length} factures en attente
                        </div>
                    </div>
                    
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="mb-3 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                <Receipt className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-medium">Factures payées (2024)</h3>
                        </div>
                        <div className="text-2xl font-semibold">
                            {formatAmount(invoicesData.filter(invoice => invoice.isPaid).reduce((total, invoice) => total + invoice.amount, 0))}
                        </div>
                        <div className="mt-2 text-xs text-neutral-500">
                            {invoicesData.filter(invoice => invoice.isPaid).length} factures
                        </div>
                    </div>
                    
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-medium">Moyen de paiement par défaut</h3>
                            <button className="text-xs text-primary hover:underline">Gérer</button>
                        </div>
                        {paymentMethodsData.filter(pm => pm.isDefault).map((pm) => (
                            <div key={pm.id} className="flex items-center rounded-lg border border-neutral-200 p-3 dark:border-neutral-700">
                                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                    {pm.type === 'card' ? <CreditCard className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                                </div>
                                <div>
                                    <div className="font-medium">{pm.name}</div>
                                    <div className="text-xs text-neutral-500">
                                        {pm.type === 'card' 
                                            ? `**** **** **** ${pm.last4} • Expire le ${pm.expiry}`
                                            : `Compte se terminant par ${pm.last4}`
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Liste des factures */}
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Factures</h2>
                        <div className="flex gap-2">
                            <select className="rounded-md border border-neutral-300 py-1.5 pl-3 pr-8 text-sm focus:border-primary focus:outline-none focus:ring focus:ring-primary/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                                <option value="all">Toutes les factures</option>
                                <option value="paid">Payées</option>
                                <option value="unpaid">Non payées</option>
                            </select>
                            <button className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary/90">
                                Exporter
                            </button>
                        </div>
                    </div>
                    
                    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                            <thead className="bg-neutral-50 dark:bg-neutral-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Facture
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                        Échéance
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
                                {invoicesData.map((invoice) => (
                                    <tr key={invoice.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="font-medium">{invoice.number}</div>
                                            {invoice.projectName && (
                                                <div className="text-xs text-neutral-500">
                                                    {invoice.projectName}
                                                </div>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            {formatDate(invoice.date)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            {formatDate(invoice.dueDate)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                            {formatAmount(invoice.amount)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <span 
                                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    invoice.isPaid 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                                }`}
                                            >
                                                {invoice.isPaid ? 'Payée' : 'En attente'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <a 
                                                    href={`/client/billing/invoices/${invoice.id}`}
                                                    className="rounded-md border border-neutral-300 p-1.5 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                                                    title="Voir les détails"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                </a>
                                                <a 
                                                    href={`/client/billing/invoices/${invoice.id}/download`}
                                                    className="rounded-md border border-neutral-300 p-1.5 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                                                    title="Télécharger"
                                                >
                                                    <ArrowDownToLine className="h-4 w-4" />
                                                </a>
                                                {!invoice.isPaid && (
                                                    <a 
                                                        href={`/client/billing/invoices/${invoice.id}/pay`}
                                                        className="rounded-md border border-primary bg-primary p-1.5 text-white hover:bg-primary/90"
                                                        title="Payer la facture"
                                                    >
                                                        <DollarSign className="h-4 w-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 