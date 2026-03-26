import DashboardContentLayout from '@/layouts/dashboard/layout';
import { create, index } from '@/routes/dashboard/faq';
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

export default function FaqLayout({ children }: PropsWithChildren) {
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
