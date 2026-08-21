import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import PricingLayout from '@/layouts/dashboard/pricing/layout';
import pricing from '@/routes/dashboard/pricing';
import pricingItems from '@/routes/dashboard/pricing/items';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import React from 'react';

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

interface PropsI {
    id: number;
}

const Create = ({ id }: PropsI) => {
    const { data, setData, errors, processing, post } = useForm({
        name: '',
        price: '',
        pricingID: id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(pricingItems.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <PricingLayout>
                <HeadingSmall
                    title="Dodaj pozycję do cennika"
                    description="Dodaj nową pozycję do cennika usług"
                />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Tytuł w cenniku</Label>

                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Podaj tytuł kategorii cennika"
                            className="mt-1"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Cena w cenniku</Label>

                        <Input
                            id="price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="Podaj cenę w cenniku"
                            className="mt-1"
                        />
                        <span className="text-sm text-muted-foreground">
                            Podaj cenę w złotych, np. 250 lub od 250 (bez "zł"
                            na końcu)
                        </span>
                        <InputError className="mt-2" message={errors.price} />
                    </div>
                    <Button type={'submit'} disabled={processing}>
                        Utwórz
                    </Button>
                </form>
            </PricingLayout>
        </AppLayout>
    );
};

export default Create;
