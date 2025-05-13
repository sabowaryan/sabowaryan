import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, BookOpen as Book, Settings, Home, ShieldCheck, Briefcase, FileText, Mail, Code, Award, ShoppingCart, Clock, FileCheck, MessageSquare, CreditCard, HelpCircle } from 'lucide-react';
import AppLogo from './app-logo';

// Fonction qui renvoie les éléments de navigation en fonction du rôle
const getNavItemsByRole = (role: string): NavItem[] => {
    // Élément de base pour tous les utilisateurs
    const baseItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    // Éléments supplémentaires en fonction du rôle
    switch (role) {
        case 'Super Admin':
            return [
                ...baseItems,
                {
                    title: 'Utilisateurs',
                    href: '/users',
                    icon: Users,
                },
                {
                    title: 'Rôles & Permissions',
                    href: '/roles',
                    icon: ShieldCheck,
                },
                {
                    title: 'Paramètres',
                    href: '/settings',
                    icon: Settings,
                },
            ];
        case 'Admin':
            return [
                ...baseItems,
                {
                    title: 'Utilisateurs',
                    href: '/users',
                    icon: Users,
                },
                {
                    title: 'Paramètres',
                    href: '/settings',
                    icon: Settings,
                },
            ];
        case 'Apprentice':
            return [
                ...baseItems,
                {
                    title: 'Cours',
                    href: '/courses',
                    icon: Book,
                },
            ];
        case 'Client':
        default:
            return [
                ...baseItems,
                {
                    title: 'Mes commandes',
                    href: '/client/orders',
                    icon: ShoppingCart,
                },
                {
                    title: 'Projets en cours',
                    href: '/client/projects',
                    icon: Clock,
                },
                {
                    title: 'Projets livrés',
                    href: '/client/projects/completed',
                    icon: FileCheck,
                },
                {
                    title: 'Messagerie',
                    href: '/client/messages',
                    icon: MessageSquare,
                },
                {
                    title: 'Facturation',
                    href: '/client/billing',
                    icon: CreditCard,
                },
                {
                    title: 'Support',
                    href: '/client/support',
                    icon: HelpCircle,
                },
            ];
    }
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRole = auth.user?.role || 'Client';
    const navItems = getNavItemsByRole(userRole);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
