import DashboardContentLayout from '@/layouts/dashboard/layout';
import { index } from '@/routes/dashboard/services';
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
        href: '',
        icon: null,
    },
];

export default function ServicesLayout({ children }: PropsWithChildren) {
    return (
        <DashboardContentLayout
            title={'test'}
            desc={'test'}
            navItems={sidebarNavItems}
        >
            {children}
        </DashboardContentLayout>
    );
}
