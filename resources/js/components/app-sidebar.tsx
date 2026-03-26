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
import blog from '@/routes/dashboard/blog';
import faq from '@/routes/dashboard/faq';
import dashboard from '@/routes/dashboard/index';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Book,
    BookOpen,
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
        href: dashboard.pricing.url(),
        icon: Wallet,
    },
    {
        title: 'FAQ',
        href: faq.index.url(),
        icon: MessageCircleQuestionIcon,
    },
    {
        title: 'Blog',
        href: blog.index.url(),
        icon: Book,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
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
