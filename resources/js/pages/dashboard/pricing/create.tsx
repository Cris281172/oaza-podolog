import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import PricingLayout from '@/layouts/dashboard/pricing/layout';
import pricing from '@/routes/dashboard/pricing';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cennik',
        href: pricing.index.url(),
    },
    {
        title: 'Tworzenie',
        href: '',
    },
];

const Create = () => {
    const { data, setData, errors, post, processing } = useForm({
        title: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(pricing.store.url(), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => toast.success('Kategoria cennika dodana.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cennik" />
            <PricingLayout>
                <HeadingSmall
                    title="Dodaj kategorię cennika"
                    description="Dodaj nową kategorię do cennika usług"
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
                        Dodaj
                    </Button>
                </form>
            </PricingLayout>
        </AppLayout>
    );
};

export default Create;
