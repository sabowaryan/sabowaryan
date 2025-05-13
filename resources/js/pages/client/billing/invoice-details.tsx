import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowDownToLine, ArrowLeft, Building, Calendar, CreditCard, DollarSign, FileText, Mail, MapPin, Phone, Printer, Receipt, ShieldCheck, User } from 'lucide-react';

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
        title: 'Détails de la facture',
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
    paymentDate?: string;
    paymentMethod?: string;
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
    'inv-002': {
        id: 'inv-002',
        number: 'FACT-2024-002',
        date: '2024-03-10',
        dueDate: '2024-04-10',
        amount: 800,
        isPaid: true,
        paymentDate: '2024-03-28',
        paymentMethod: 'Carte Visa se terminant par 4242',
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

// Informations sur l'entreprise
const companyInfo = {
    name: 'Herd Digital',
    address: '15 rue de l\'Innovation',
    city: '75001 Paris',
    country: 'France',
    email: 'contact@herddigital.fr',
    phone: '+33 1 23 45 67 89',
    website: 'www.herddigital.fr',
    siret: '123 456 789 00012',
    tva: 'FR 12 345 678 901'
};

// Informations sur le client
const clientInfo = {
    name: 'Jean Dupont',
    company: 'Entreprise Dupont',
    address: '25 avenue du Commerce',
    city: '69002 Lyon',
    country: 'France',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78'
};

export default function InvoiceDetails({ invoiceId }: PageProps) {
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

    // Calculer les sous-totaux
    const subtotal = invoice.amount;
    const taxRate = 0.20; // 20% TVA
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Facture ${invoice.number}`} />
            <div className="flex h-full flex-1 flex-col p-4">
                <div className="mb-6 flex items-center justify-between">
                    <a 
                        href="/client/billing" 
                        className="flex w-fit items-center rounded-md text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-300"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Retour à la facturation
                    </a>
                    <div className="flex gap-2">
                        <button 
                            className="flex items-center rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <Printer className="mr-1.5 h-4 w-4" />
                            Imprimer
                        </button>
                        <a 
                            href={`/client/billing/invoices/${invoice.id}/download`}
                            className="flex items-center rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <ArrowDownToLine className="mr-1.5 h-4 w-4" />
                            Télécharger
                        </a>
                        {!invoice.isPaid && (
                            <a 
                                href={`/client/billing/invoices/${invoice.id}/pay`}
                                className="flex items-center rounded-md border border-primary bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90"
                            >
                                <DollarSign className="mr-1.5 h-4 w-4" />
                                Payer maintenant
                            </a>
                        )}
                    </div>
                </div>

                <div className="rounded-xl bg-white p-8 shadow-sm dark:bg-neutral-900">
                    {/* Entête de la facture */}
                    <div className="mb-8 flex flex-col gap-8 border-b border-neutral-200 pb-8 dark:border-neutral-700 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div className="mb-1 text-3xl font-bold text-primary">Herd Digital</div>
                            <div className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">Agence web & développement</div>
                            
                            <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex items-center">
                                    <Building className="mr-2 h-4 w-4" />
                                    <span>{companyInfo.name}</span>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="mr-2 h-4 w-4 shrink-0" />
                                    <div>
                                        <div>{companyInfo.address}</div>
                                        <div>{companyInfo.city}, {companyInfo.country}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>{companyInfo.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4" />
                                    <span>{companyInfo.phone}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-right">
                            <div className="mb-2 inline-block rounded-lg bg-primary/10 px-3 py-1 text-lg font-semibold text-primary">
                                {invoice.isPaid ? 'PAYÉE' : 'EN ATTENTE'}
                            </div>
                            <div className="mb-4 text-2xl font-bold">{invoice.number}</div>
                            <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex items-center justify-end">
                                    <span className="mr-2">Date d'émission:</span>
                                    <span className="font-medium">{formatDate(invoice.date)}</span>
                                </div>
                                <div className="flex items-center justify-end">
                                    <span className="mr-2">Date d'échéance:</span>
                                    <span className="font-medium">{formatDate(invoice.dueDate)}</span>
                                </div>
                                {invoice.isPaid && invoice.paymentDate && (
                                    <div className="flex items-center justify-end">
                                        <span className="mr-2">Date de paiement:</span>
                                        <span className="font-medium">{formatDate(invoice.paymentDate)}</span>
                                    </div>
                                )}
                                {invoice.projectName && (
                                    <div className="flex items-center justify-end">
                                        <span className="mr-2">Projet:</span>
                                        <span className="font-medium">{invoice.projectName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Informations client */}
                    <div className="mb-8">
                        <h2 className="mb-4 text-lg font-medium">Facturé à</h2>
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="mb-2 text-base font-medium">{clientInfo.name}</div>
                            {clientInfo.company && (
                                <div className="mb-2 text-sm">{clientInfo.company}</div>
                            )}
                            <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex items-start">
                                    <MapPin className="mr-2 h-4 w-4 shrink-0" />
                                    <div>
                                        <div>{clientInfo.address}</div>
                                        <div>{clientInfo.city}, {clientInfo.country}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>{clientInfo.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4" />
                                    <span>{clientInfo.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tableau des éléments facturés */}
                    <div className="mb-8">
                        <h2 className="mb-4 text-lg font-medium">Détails de la facture</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-neutral-200 rounded-lg border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700">
                                <thead className="bg-neutral-50 dark:bg-neutral-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                            Quantité
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                            Prix unitaire
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                                    {invoice.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                {item.description}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                {item.quantity}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                {formatAmount(item.unitPrice)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                {formatAmount(item.total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Résumé des montants */}
                    <div className="mb-8 flex justify-end">
                        <div className="w-full max-w-md space-y-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                            <div className="flex justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Sous-total</span>
                                <span>{formatAmount(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">TVA (20%)</span>
                                <span>{formatAmount(taxAmount)}</span>
                            </div>
                            <div className="border-t border-neutral-200 pt-3 dark:border-neutral-700">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>{formatAmount(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Informations de paiement */}
                    <div className="mb-8 grid gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="mb-4 text-lg font-medium">Informations de paiement</h2>
                            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                <div className="mb-3 flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5 text-primary" />
                                    <span className="font-medium">Méthodes de paiement acceptées</span>
                                </div>
                                <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                                    Carte bancaire, virement bancaire, PayPal
                                </p>
                                
                                <div className="mb-3 flex items-center">
                                    <Receipt className="mr-2 h-5 w-5 text-primary" />
                                    <span className="font-medium">Coordonnées bancaires</span>
                                </div>
                                <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <div>IBAN: FR76 1234 5678 9012 3456 7890 123</div>
                                    <div>BIC: EXAMPLEBANK</div>
                                    <div>Banque: Banque Exemple</div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="mb-4 text-lg font-medium">Statut de paiement</h2>
                            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                                {invoice.isPaid ? (
                                    <div>
                                        <div className="mb-3 flex items-center text-green-600 dark:text-green-400">
                                            <ShieldCheck className="mr-2 h-5 w-5" />
                                            <span className="font-medium">Payée le {formatDate(invoice.paymentDate || '')}</span>
                                        </div>
                                        {invoice.paymentMethod && (
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                Méthode de paiement: {invoice.paymentMethod}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-3 flex items-center text-amber-600 dark:text-amber-400">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            <span className="font-medium">
                                                En attente de paiement - Échéance le {formatDate(invoice.dueDate)}
                                            </span>
                                        </div>
                                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                                            Veuillez effectuer votre paiement avant la date d'échéance.
                                        </p>
                                        <a 
                                            href={`/client/billing/invoices/${invoice.id}/pay`}
                                            className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                                        >
                                            <DollarSign className="mr-1.5 h-4 w-4" />
                                            Payer maintenant
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Note et conditions */}
                    <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                        <h2 className="mb-2 text-base font-medium">Notes et conditions</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Merci pour votre confiance. Le paiement est dû dans les 30 jours suivant la réception de la facture.
                            Un intérêt de retard pourra être appliqué aux paiements effectués après la date d'échéance.
                            Pour toute question concernant cette facture, veuillez contacter notre service client.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 