import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import PricingLayout from '@/layouts/dashboard/pricing/layout';
import pricingRoutes from '@/routes/dashboard/pricing';
import { BreadcrumbItem, PricingItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: '',
    },
    {
        title: 'Tworzenie',
        href: '',
    },
];

interface PropsI {
    pricing: PricingItem;
}

const Edit = ({ pricing }: PropsI) => {
    const { data, setData, errors, processing, patch } = useForm({
        title: pricing.title ?? '',
        description: pricing.description ?? '',
        pricingID: pricing.id ?? '',
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
            <Head title="FAQ" />
            <PricingLayout>
                <HeadingSmall
                    title="Profile information"
                    description="Update your name and email address"
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
                    <div className="grid gap-2">
                        <Label htmlFor="description">
                            Opis kategorii cennika
                        </Label>

                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder="Podaj opis kategorii cennika"
                            className="mt-1"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
                    </div>
                    <Button disabled={processing} type={'submit'}>
                        Dodaj
                    </Button>
                </form>
            </PricingLayout>
        </AppLayout>
    );
};

export default Edit;
