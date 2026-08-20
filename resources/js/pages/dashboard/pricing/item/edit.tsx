import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import PricingLayout from '@/layouts/dashboard/pricing/layout';
import pricingRoute from '@/routes/dashboard/pricing';
import pricingItemRoute from '@/routes/dashboard/pricing/items';
import { BreadcrumbItem, PricingItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cennik',
        href: pricingRoute.index.url(),
    },
    {
        title: 'Edytowanie',
        href: '',
    },
];
const Edit = ({ pricingItem }: { pricingItem: PricingItem }) => {
    console.log(pricingItem);
    const { data, setData, errors, processing, patch } = useForm({
        name: pricingItem.name ?? '',
        price: pricingItem.price ?? '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(pricingItemRoute.update.url(pricingItem.id), {
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
                            placeholder="Podaj cene w cenniku"
                            className="mt-1"
                        />
                        <span className="text-sm text-muted-foreground">
                            Podaj cenę w złotych, np. 250 lub od 250 (bez "zł"
                            na końcu)
                        </span>
                        <InputError className="mt-2" message={errors.price} />
                    </div>
                    <Button type={'submit'} disabled={processing}>
                        Aktualizuj
                    </Button>
                </form>
            </PricingLayout>
        </AppLayout>
    );
};

export default Edit;
