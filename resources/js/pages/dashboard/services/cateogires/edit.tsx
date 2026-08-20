import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ServicesLayout from '@/layouts/dashboard/services/layout';
import services from '@/routes/dashboard/services';
import servicesCategory from '@/routes/dashboard/services/services-category';
import { BreadcrumbItem, ServiceCategory } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usługi',
        href: services.index.url(),
    },
    {
        title: 'Edytowanie kategorii usług',
        href: '',
    },
];

const Edit = ({ serviceCategory }: { serviceCategory: ServiceCategory }) => {
    const { data, setData, errors, patch, processing } = useForm({
        name: serviceCategory.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(servicesCategory.update.url(serviceCategory.id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Edytowano pozycje w usługach.'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edytowanie kategorii usług" />
            <ServicesLayout>
                <HeadingSmall
                    title="Edytowanie kategorii usług"
                    description="Edytuj kategorię usług"
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
                        Aktualizuj
                    </Button>
                </form>
            </ServicesLayout>
        </AppLayout>
    );
};

export default Edit;
