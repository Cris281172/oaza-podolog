import InputError from '@/components/input-error';
import { TiptapEditor } from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { slugify } from '@/lib/utils';
import services from '@/routes/dashboard/services';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import type { JSONContent } from '@tiptap/core';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usługi', href: services.index.url() },
    { title: 'Nowa usługa', href: '' },
];

const Create = ({
    categoryID,
    defaultContent,
}: {
    categoryID: number;
    defaultContent: JSONContent;
}) => {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        slug: '',
        shortDesc: '',
        pageIntro: '',
        descriptionHeading: 'Na czym polega usługa?',
        pageContent: defaultContent,
        seoTitle: '',
        seoDescription: '',
        categoryID,
    });

    const changeName = (name: string) => {
        const previousSlug = slugify(data.name);
        const nextSlug = data.slug === previousSlug ? slugify(name) : data.slug;
        const previousSeoTitle = data.name
            ? `${data.name} Kielce | Gabinet Podologiczna Oaza`
            : '';

        setData({
            ...data,
            name,
            slug: nextSlug,
            seoTitle:
                data.seoTitle === previousSeoTitle
                    ? `${name} Kielce | Gabinet Podologiczna Oaza`
                    : data.seoTitle,
        });
    };

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        post(services.store.url(), {
            preserveScroll: true,
            onSuccess: () => toast.success('Dodano usługę.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nowa usługa" />
            <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Nowa usługa
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Uzupełnij kafelek, pełną podstronę oraz dane SEO.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    <section className="grid gap-6 rounded-2xl border bg-card p-5 md:p-7">
                        <Field label="Nazwa usługi" error={errors.name}>
                            <Input
                                value={data.name}
                                onChange={(event) =>
                                    changeName(event.target.value)
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
                    </section>

                    <Button size="lg" disabled={processing} type="submit">
                        {processing ? 'Dodawanie…' : 'Dodaj usługę'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

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

export default Create;
