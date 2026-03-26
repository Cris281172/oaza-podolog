import DashboardContentLayout from '@/layouts/dashboard/layout';
import { create, index } from '@/routes/dashboard/blog';
import { type NavItem } from '@/types';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Wszystkie',
        href: index(),
        icon: null,
    },
    {
        title: 'Tworzenie',
        href: create(),
        icon: null,
    },
];

export default function BlogLayout({ children }: PropsWithChildren) {
    return (
        <DashboardContentLayout
            navItems={sidebarNavItems}
            title={'tdwa'}
            desc={'daw'}
        >
            {children}
        </DashboardContentLayout>
    );
}
