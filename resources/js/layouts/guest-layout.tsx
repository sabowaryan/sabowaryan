import GuestLayoutTemplate from '@/layouts/guest/guest-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: GuestLayoutProps) => (
    <GuestLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </GuestLayoutTemplate>
);