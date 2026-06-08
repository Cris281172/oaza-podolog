import DashboardContentLayout from '@/layouts/dashboard/layout';
import { type NavItem } from '@/types';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Wszystkie',
        href: '',
        icon: null,
    },
    {
        title: 'Tworzenie',
        href: '',
        icon: null,
    },
];

export default function PricingLayout({ children }: PropsWithChildren) {
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
