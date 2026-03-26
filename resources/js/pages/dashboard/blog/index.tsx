import AlertEmpty from '@/components/alert-empty';
import DialogDestroyConfirmation from '@/components/dialog-destroy-confirmation';
import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import BlogLayout from '@/layouts/dashboard/blog/layout';
import blogRoute from '@/routes/dashboard/blog';
import { Blog, BreadcrumbItem, PaginatedResponse } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: blogRoute.index.url(),
    },
];

interface PropsI {
    blogs: PaginatedResponse<Blog>;
}

const Index = ({ blogs }: PropsI) => {
    const performDelete = (id: number) => {
        router.delete(blogRoute.destroy.url(id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Wpis na bloga został usunięty.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <BlogLayout>
                <div className="flex items-center justify-between">
                    <HeadingSmall
                        title="Wpisy na blogu"
                        description="Zarządzaj treścią, edytuj i publikuj nowe artykuły."
                    />
                    <Button asChild>
                        <Link href={blogRoute.create.url()}>Nowy wpis</Link>
                    </Button>
                </div>

                <div className="grid gap-4">
                    {blogs.data.map((blog) => (
                        <Card
                            key={blog.id}
                            className="overflow-hidden transition-all hover:shadow-md"
                        >
                            <CardContent className="flex items-center justify-between p-4 sm:p-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg leading-none font-semibold tracking-tight">
                                            {blog.title}
                                        </h3>
                                        {blog.isPublished ? (
                                            <Badge
                                                variant="default"
                                                className="border-emerald-200 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                                            >
                                                Opublikowano
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Szkic
                                            </Badge>
                                        )}
                                    </div>

                                    <p className="line-clamp-1 max-w-md text-sm text-muted-foreground">
                                        {blog.excerpt ||
                                            'Brak krótkiego opisu...'}
                                    </p>

                                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {blog.createdAt}
                                        </div>
                                        <div className="text-xs italic">
                                            slug: /{blog.slug}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Podgląd - otwiera publiczną stronę posta */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        asChild
                                        title="Podgląd"
                                    >
                                        <a
                                            href={`/blog/${blog.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Eye size={16} />
                                        </a>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        asChild
                                        title="Edytuj"
                                    >
                                        <Link href={blogRoute.edit(blog.id)}>
                                            <Pencil size={16} />
                                        </Link>
                                    </Button>
                                    <DialogDestroyConfirmation
                                        handleDelete={() =>
                                            performDelete(blog.id)
                                        }
                                    >
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            // onClick={() =>
                                            //     handleDelete(blog.id)
                                            // }
                                            title="Usuń"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </DialogDestroyConfirmation>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {blogs.data.length === 0 && (
                        <AlertEmpty
                            info={'Nie znaleziono żadnych wpisów.'}
                            actionHref={blogRoute.create()}
                            actionText={'Stwórz swój pierwszy post'}
                        />
                    )}
                </div>
            </BlogLayout>
        </AppLayout>
    );
};

export default Index;
