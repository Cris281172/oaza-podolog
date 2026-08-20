import DashboardContentLayout from '@/layouts/dashboard/layout';
import pricing from '@/routes/dashboard/pricing';
import { type NavItem } from '@/types';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Wszystkie',
        href: pricing.index.url(),
        icon: null,
    },
];

export default function PricingLayout({ children }: PropsWithChildren) {
    return (
        <DashboardContentLayout
            title={'Cennik'}
            desc={'Zarządzaj cennikiem produktów i usług.'}
            navItems={sidebarNavItems}
        >
            {children}
        </DashboardContentLayout>
    );
}
