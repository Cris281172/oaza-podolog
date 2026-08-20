import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import PricingLayout from '@/layouts/dashboard/pricing/layout';
import pricingRoutes from '@/routes/dashboard/pricing';
import { BreadcrumbItem, Pricings } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cennik',
        href: pricingRoutes.index.url(),
    },
    {
        title: 'Edytowanie',
        href: '',
    },
];

interface PropsI {
    pricing: Pricings;
}

const Edit = ({ pricing }: PropsI) => {
    const { data, setData, errors, processing, patch } = useForm({
        title: pricing.title ?? '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(pricingRoutes.update.url(pricing.id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Edytowano pozycje w cenniku.'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edytuj pozycje w cenniku" />
            <PricingLayout>
                <HeadingSmall
                    title="Edytuj pozycje w cenniku"
                    description="Edytuj pozycje w cenniku usług."
                />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Tytuł kategorii cennika</Label>

                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Podaj tytuł kategorii cennika"
                            className="mt-1"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <Button disabled={processing} type={'submit'}>
                        Aktualizuj
                    </Button>
                </form>
            </PricingLayout>
        </AppLayout>
    );
};

export default Edit;
