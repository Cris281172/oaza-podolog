import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ServicesLayout from '@/layouts/dashboard/services/layout';
import services from '@/routes/dashboard/services';
import servicesCategory from '@/routes/dashboard/services/services-category';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usługi',
        href: services.index().url,
    },
    {
        title: 'Tworzenie',
        href: '',
    },
];

const Create = () => {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(servicesCategory.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tworzenie kategorii usług" />
            <ServicesLayout>
                <HeadingSmall
                    title="Kategoria usługi"
                    description="Dodaj nową kategorię usług"
                />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nazwa usługi</Label>

                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Podaj nazwę usługi"
                            className="mt-1"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <Button disabled={processing} type={'submit'}>
                        Dodaj
                    </Button>
                </form>
            </ServicesLayout>
        </AppLayout>
    );
};

export default Create;
