import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import dashboard from '@/routes/dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cennik',
        href: dashboard.home.url(),
    },
];


const Pricing = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cennik" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

            </div>
        </AppLayout>
    );
}

export default Pricing;
