import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import faq from '@/routes/dashboard/faq';
import dashboard from '@/routes/dashboard/index';
import pricing from '@/routes/dashboard/pricing';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Folder,
    LayoutGrid,
    MessageCircleQuestionIcon,
    Wallet,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Strona główna',
        href: dashboard.home.url(),
        icon: LayoutGrid,
    },
    {
        title: 'Cennik',
        href: pricing.index.url(),
        icon: Wallet,
    },
    {
        title: 'FAQ',
        href: faq.index.url(),
        icon: MessageCircleQuestionIcon,
    },
    // {
    //     title: 'Blog',
    //     href: blog.index.url(),
    //     icon: Book,
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repozytorium ',
        href: 'https://github.com/Cris281172/oaza-podolog',
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard.home.url()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
