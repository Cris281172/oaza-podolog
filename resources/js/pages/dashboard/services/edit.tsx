import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ServicesLayout from '@/layouts/dashboard/services/layout';
import services from '@/routes/dashboard/services';
import { BreadcrumbItem, ServiceItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usługi',
        href: services.index.url(),
    },
    {
        title: 'Edytowanie usług',
        href: '',
    },
];

interface PropsI {
    service: ServiceItem;
}

const Edit = ({ service }: PropsI) => {
    const { data, setData, errors, patch, processing } = useForm({
        name: service.name,
        slug: service.slug,
        shortDesc: service.short_description,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(services.update.url(service.id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Edytowano pozycje w usługach.'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edytowanie usług" />
            <ServicesLayout>
                <HeadingSmall
                    title="Edytowanie usług"
                    description="Edytuj usługę"
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
                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>

                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="Podaj slug"
                            className="mt-1"
                        />
                        <InputError className="mt-2" message={errors.slug} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="shortDesc">Krótki opis</Label>

                        <Input
                            id="shortDesc"
                            value={data.shortDesc}
                            onChange={(e) =>
                                setData('shortDesc', e.target.value)
                            }
                            placeholder="Podaj krótki opis"
                            className="mt-1"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.shortDesc}
                        />
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
