import InputError from '@/components/input-error';
import { TiptapEditor } from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import services from '@/routes/dashboard/services';
import type { BreadcrumbItem, ServiceItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import type { JSONContent } from '@tiptap/core';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usługi', href: services.index.url() },
    { title: 'Edycja pełnej treści usługi', href: '' },
];

interface ServicePageData {
    pageIntro: string;
    descriptionHeading: string;
    pageContent: JSONContent;
    seoTitle: string;
    seoDescription: string;
}

const Edit = ({
    service,
    page,
}: {
    service: ServiceItem;
    page: ServicePageData;
}) => {
    const { data, setData, errors, patch, processing } = useForm({
        name: service.name,
        slug: service.slug,
        shortDesc: service.short_description,
        pageIntro: page.pageIntro,
        descriptionHeading: page.descriptionHeading,
        pageContent: page.pageContent,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        patch(services.update.url(service.id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Zapisano całą treść usługi.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edycja: ${service.name}`} />
            <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Edycja usługi
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Zmień zawartość kafelka, podstrony usługi oraz dane SEO.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <FormSection
                        title="Podstawowe informacje"
                        description="Nazwa, adres podstrony i opis widoczny na liście wszystkich usług."
                    >
                        <Field label="Nazwa usługi" error={errors.name}>
                            <Input
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                            />
                        </Field>
                        <Field label="Adres URL (slug)" error={errors.slug}>
                            <Input
                                value={data.slug}
                                onChange={(event) =>
                                    setData('slug', event.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Krótki opis na kafelku"
                            error={errors.shortDesc}
                        >
                            <Textarea
                                rows={3}
                                value={data.shortDesc}
                                onChange={(event) =>
                                    setData('shortDesc', event.target.value)
                                }
                            />
                        </Field>
                    </FormSection>

                    <FormSection
                        title="Podstrona usługi"
                        description="Treści wyświetlane po wejściu w konkretną usługę."
                    >
                        <Field
                            label="Tekst pod głównym tytułem"
                            error={errors.pageIntro}
                        >
                            <Textarea
                                rows={4}
                                value={data.pageIntro}
                                onChange={(event) =>
                                    setData('pageIntro', event.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Nagłówek rozbudowanego opisu"
                            error={errors.descriptionHeading}
                        >
                            <Input
                                value={data.descriptionHeading}
                                onChange={(event) =>
                                    setData(
                                        'descriptionHeading',
                                        event.target.value,
                                    )
                                }
                            />
                        </Field>
                        <Field
                            label="Pełny opis usługi"
                            error={errors.pageContent}
                        >
                            <div className="overflow-hidden rounded-xl border bg-background">
                                <TiptapEditor
                                    content={data.pageContent}
                                    onChange={(content) =>
                                        setData('pageContent', content)
                                    }
                                />
                            </div>
                        </Field>
                    </FormSection>

                    <FormSection
                        title="SEO"
                        description="Tytuł i opis prezentowane przez wyszukiwarki."
                    >
                        <Field label="Tytuł SEO" error={errors.seoTitle}>
                            <Input
                                value={data.seoTitle}
                                onChange={(event) =>
                                    setData('seoTitle', event.target.value)
                                }
                            />
                        </Field>
                        <Field label="Opis SEO" error={errors.seoDescription}>
                            <Textarea
                                rows={4}
                                value={data.seoDescription}
                                onChange={(event) =>
                                    setData(
                                        'seoDescription',
                                        event.target.value,
                                    )
                                }
                            />
                        </Field>
                    </FormSection>

                    <Button size="lg" disabled={processing} type="submit">
                        {processing ? 'Zapisywanie…' : 'Zapisz usługę'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

const FormSection = ({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) => (
    <section className="space-y-6 rounded-2xl border bg-card p-5 md:p-7">
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
    </section>
);

const Field = ({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) => (
    <div className="grid gap-2">
        <Label>{label}</Label>
        {children}
        <InputError message={error} />
    </div>
);

export default Edit;
