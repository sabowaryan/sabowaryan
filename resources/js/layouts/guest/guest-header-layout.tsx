import { GuestContent } from '@/components/guest/guest-content';
import { GuestHeader } from '@/components/guest/guest-header';
import { GuestFooter } from '@/components/guest/guest-footer';
import { GuestShell } from '@/components/guest/guest-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function GuestHeaderLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <GuestShell>
            <GuestHeader breadcrumbs={breadcrumbs} />
            <GuestContent>{children}</GuestContent>
            <GuestFooter />
        </GuestShell>
    );
}