import AlertEmpty from '@/components/alert-empty';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import FaqLayout from '@/layouts/dashboard/faq/layout';
import blogRoute from '@/routes/dashboard/blog';
import faq from '@/routes/dashboard/faq';
import { BreadcrumbItem } from '@/types';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FaqI {
    id: string | number;
    answer: string;
    question: string;
    order: number;
}

interface FaqsI {
    faqs: FaqI[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: faq.index.url(),
    },
];

const DeleteFaqDialog = ({ faqID }: { faqID: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { delete: destroy, processing } = useForm();

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(faq.destroy.url(faqID), {
            preserveScroll: true,
            onSuccess: () => {
                setIsOpen(false);
                toast.success('Usunięcie powiodło się.');
            },
        });
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Czy na pewno chcesz usunąć to faq?</DialogTitle>
                <DialogDescription>
                    Po potwierdzeniu nie będzie możliwości przywrócenia faq.
                </DialogDescription>

                <form onSubmit={handleDelete} className="space-y-6">
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary">Anuluj</Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                        >
                            {processing ? 'Usuwanie...' : 'Potwierdzam, usuń'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const SortableFaqItem = ({ item }: { item: FaqI }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative mb-2">
            <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab text-muted-foreground active:cursor-grabbing"
                    >
                        <GripVertical size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{item.question}</p>
                        <p className="text-sm text-muted-foreground">
                            {item.answer}
                        </p>
                    </div>
                </CardContent>
            </Card>
            <div className={'absolute top-2 right-2 flex gap-2'}>
                <Button
                    size={'icon'}
                    variant={'outline'}
                    className={'cursor-pointer'}
                    asChild
                >
                    <Link href={faq.edit(+item.id).url}>
                        <Pencil />
                    </Link>
                </Button>
                <DeleteFaqDialog faqID={+item.id} />
            </div>
        </div>
    );
};

const Index = ({ faqs }: FaqsI) => {
    const [items, setItems] = useState(faqs);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        setItems(faqs);
    }, [faqs]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);

            const newOrder = arrayMove(items, oldIndex, newIndex);
            setItems(newOrder);

            router.post(
                faq.reorder().url,
                {
                    ids: newOrder.map((item) => item.id),
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => toast.success('Kolejność zapisana'),
                },
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <FaqLayout>
                <div className="flex items-center justify-between">
                    <HeadingSmall
                        title="Wszystkie faq"
                        description="Zarządzaj treścią, edytuj i publikuj nowe faq."
                    />
                    <Button asChild>
                        <Link href={blogRoute.create.url()}>Nowy faq</Link>
                    </Button>
                </div>
                {!items || items.length === 0 ? (
                    <AlertEmpty
                        info={'Nie znaleziono żadnych faq.'}
                        actionHref={faq.create()}
                        actionText={'Stwórz swój pierwszy faq'}
                    />
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="mx-auto max-w-2xl py-6">
                                {items.map((faq) => (
                                    <SortableFaqItem key={faq.id} item={faq} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </FaqLayout>
        </AppLayout>
    );
};

export default Index;
