import InputError from '@/components/input-error';
import { TiptapEditor } from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import type { JSONContent } from '@tiptap/core';
import { ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Polityka prywatności', href: '/dashboard/privacy-policy' },
];

interface Policy {
    title: string;
    intro: string;
    content: JSONContent;
}

const PrivacyPolicyEdit = ({ policy }: { policy: Policy }) => {
    const { data, setData, patch, processing, errors } = useForm<Policy>({
        title: policy.title,
        intro: policy.intro ?? '',
        content: policy.content,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        patch('/dashboard/privacy-policy', {
            preserveScroll: true,
            onSuccess: () => toast.success('Zapisano politykę prywatności.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Polityka prywatności" />
            <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Polityka prywatności
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Edytuj nagłówek i całą treść widoczną na stronie.
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <a
                            href="/polityka-prywatnosci"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Zobacz stronę
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                </div>

                <form onSubmit={submit} className="space-y-7">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Tytuł strony</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(event) =>
                                setData('title', event.target.value)
                            }
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="intro">Tekst pod tytułem</Label>
                        <Textarea
                            id="intro"
                            rows={3}
                            value={data.intro}
                            onChange={(event) =>
                                setData('intro', event.target.value)
                            }
                        />
                        <InputError message={errors.intro} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Treść polityki</Label>
                        <div className="overflow-hidden rounded-xl border bg-background">
                            <TiptapEditor
                                content={data.content}
                                onChange={(content) =>
                                    setData('content', content)
                                }
                            />
                        </div>
                        <InputError message={errors.content} />
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Zapisywanie…' : 'Zapisz zmiany'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default PrivacyPolicyEdit;
