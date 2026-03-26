import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { TiptapEditor } from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import BlogLayout from '@/layouts/dashboard/blog/layout';
import { slugify } from '@/lib/utils';
import blog from '@/routes/dashboard/blog';
import { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: blog.index.url(),
    },
    {
        title: 'Tworzenie',
        href: '',
    },
];

const Create = () => {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            isPublished: true,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(blog.store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Dodano nowy post na bloga.');
            },
        });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;

        if (data.slug === slugify(data.title)) {
            setData({
                ...data,
                title: newTitle,
                slug: slugify(newTitle),
            });
        } else {
            setData('title', newTitle);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <BlogLayout>
                <HeadingSmall
                    title="Profile information"
                    description="Update your name and email address"
                />
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Tytuł posta</Label>

                        <Input
                            id="title"
                            value={data.title}
                            onChange={handleTitleChange}
                            placeholder="Podaj tytuł posta"
                            className="mt-1"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Slug posta</Label>

                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="Podaj slug posta"
                            className="mt-1"
                        />
                        <InputError className="mt-2" message={errors.slug} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="excerpt">Krótki opis posta</Label>

                        <Textarea
                            id="excerpt"
                            placeholder="Podaj krótki opis posta"
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            className="mt-1"
                        />
                        <InputError className="mt-2" message={errors.excerpt} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={data.isPublished}
                            onCheckedChange={(value) =>
                                setData('isPublished', !!value)
                            }
                            id={'isPublished'}
                        />
                        <Label htmlFor="isPublished">Post publiczny?</Label>
                    </div>
                    <div>
                        <Label>Treść artykułu</Label>
                        {/* Nasz nowy edytor */}
                        <TiptapEditor
                            content={data.content}
                            onChange={(json) => setData('content', json)}
                        />
                        {errors.content && (
                            <p className="text-sm text-red-500">
                                {errors.content}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            disabled={processing}
                            data-test="update-profile-button"
                        >
                            Save
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
            </BlogLayout>
        </AppLayout>
    );
};

export default Create;
