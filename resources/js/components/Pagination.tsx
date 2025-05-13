import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export function Pagination({ links }: PaginationProps) {
    return (
        <nav className="flex items-center justify-center space-x-2 mt-8">
            {links.map((link, i) => {
                if (i === 0) {
                    return (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={cn(
                                'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                'h-10 px-4 py-2',
                                'bg-primary text-primary-foreground hover:bg-primary/90',
                                !link.url && 'opacity-50 cursor-not-allowed'
                            )}
                            preserveScroll
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Précédent
                        </Link>
                    );
                }

                if (i === links.length - 1) {
                    return (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={cn(
                                'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                'h-10 px-4 py-2',
                                'bg-primary text-primary-foreground hover:bg-primary/90',
                                !link.url && 'opacity-50 cursor-not-allowed'
                            )}
                            preserveScroll
                        >
                            Suivant
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                    );
                }

                return (
                    <Link
                        key={i}
                        href={link.url || '#'}
                        className={cn(
                            'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                            'h-10 w-10',
                            link.active
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-background hover:bg-accent hover:text-accent-foreground'
                        )}
                        preserveScroll
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
} 