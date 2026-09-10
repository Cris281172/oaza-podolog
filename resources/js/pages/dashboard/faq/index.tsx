import AlertEmpty from '@/components/alert-empty';
import { SortArrowButtons } from '@/components/dashboard/sort-arrow-buttons';
import DeleteConfirmDialog from '@/components/deleteConfirmDialog';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import FaqLayout from '@/layouts/dashboard/faq/layout';
import faq from '@/routes/dashboard/faq';
import { BreadcrumbItem } from '@/types';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
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
import { Eye, GripVertical, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FaqI {
    id: number;
    answer: string;
    question: string;
    order: number;
    show_on_home: boolean;
    home_order: number | null;
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

const SortableFaqItem = ({
    item,
    onMove,
    canMoveUp,
    canMoveDown,
    isHomeSelected,
    onHomeToggle,
}: {
    item: FaqI;
    onMove: (offset: -1 | 1) => void;
    canMoveUp: boolean;
    canMoveDown: boolean;
    isHomeSelected: boolean;
    onHomeToggle: () => void;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const { delete: destroy, processing } = useForm();

    return (
        <div ref={setNodeRef} style={style} className="relative mb-2">
            <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab touch-none text-muted-foreground select-none active:cursor-grabbing"
                    >
                        <GripVertical size={20} />
                    </div>
                    <SortArrowButtons
                        label={item.question}
                        onMoveUp={() => onMove(-1)}
                        onMoveDown={() => onMove(1)}
                        canMoveUp={canMoveUp}
                        canMoveDown={canMoveDown}
                    />
                    <div className="flex-1">
                        <p className="font-medium">{item.question}</p>
                        <p className="text-sm text-muted-foreground">
                            {item.answer}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <Checkbox
                                id={`faq-home-${item.id}`}
                                checked={isHomeSelected}
                                onCheckedChange={onHomeToggle}
                            />
                            <label
                                htmlFor={`faq-home-${item.id}`}
                                className="cursor-pointer text-xs text-muted-foreground"
                            >
                                Pokaż na stronie głównej
                            </label>
                        </div>
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
                <DeleteConfirmDialog
                    deleteFunc={() =>
                        destroy(faq.destroy.url(+item.id), {
                            preserveScroll: true,
                            onSuccess: () => {
                                toast.success('Usunięcie powiodło się.');
                            },
                        })
                    }
                    processing={processing}
                />
            </div>
        </div>
    );
};

const SortableHomeFaq = ({
    item,
    index,
    total,
    onMove,
}: {
    item: FaqI;
    index: number;
    total: number;
    onMove: (offset: -1 | 1) => void;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: `home-faq-${item.id}` });

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className="flex items-center gap-3 rounded-lg border bg-background p-3"
        >
            <button
                type="button"
                {...attributes}
                {...listeners}
                className="cursor-grab touch-none text-muted-foreground select-none active:cursor-grabbing"
                aria-label={`Zmień kolejność: ${item.question}`}
            >
                <GripVertical size={18} />
            </button>
            <SortArrowButtons
                label={item.question}
                onMoveUp={() => onMove(-1)}
                onMoveDown={() => onMove(1)}
                canMoveUp={index > 0}
                canMoveDown={index < total - 1}
            />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {item.question}
            </span>
        </div>
    );
};

const Index = ({ faqs }: FaqsI) => {
    const [items, setItems] = useState(faqs);
    const [homeItems, setHomeItems] = useState(() =>
        faqs
            .filter((item) => item.show_on_home)
            .sort((a, b) => (a.home_order ?? 0) - (b.home_order ?? 0)),
    );

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 5 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 200, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        setItems(faqs);
        setHomeItems(
            faqs
                .filter((item) => item.show_on_home)
                .sort((a, b) => (a.home_order ?? 0) - (b.home_order ?? 0)),
        );
    }, [faqs]);

    const saveHomeItems = (nextItems: FaqI[]) => {
        setHomeItems(nextItems);
        router.post(
            faq.homePreview().url,
            { ids: nextItems.map((item) => item.id) },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () =>
                    toast.success('FAQ na stronie głównej zapisane'),
            },
        );
    };

    const handleHomeToggle = (item: FaqI) => {
        saveHomeItems(
            homeItems.some((selected) => selected.id === item.id)
                ? homeItems.filter((selected) => selected.id !== item.id)
                : [...homeItems, item],
        );
    };

    const handleHomeDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;
        const oldIndex = homeItems.findIndex(
            (item) => `home-faq-${item.id}` === active.id,
        );
        const newIndex = homeItems.findIndex(
            (item) => `home-faq-${item.id}` === over.id,
        );
        saveHomeItems(arrayMove(homeItems, oldIndex, newIndex));
    };

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

    const moveItem = (index: number, offset: -1 | 1) => {
        const newOrder = arrayMove(items, index, index + offset);
        setItems(newOrder);
        router.post(
            faq.reorder().url,
            { ids: newOrder.map((item) => item.id) },
            { preserveScroll: true, preserveState: true },
        );
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
                        <Link href={faq.create.url()}>Nowy faq</Link>
                    </Button>
                </div>
                <Card className="mt-6 border-primary/20 bg-primary/[0.02]">
                    <CardContent className="p-5">
                        <div className="mb-4 flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <Eye size={18} />
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    FAQ na stronie głównej
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Zaznacz pytania poniżej, a tutaj ustaw ich
                                    kolejność.
                                </p>
                            </div>
                        </div>
                        {homeItems.length ? (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleHomeDragEnd}
                            >
                                <SortableContext
                                    items={homeItems.map(
                                        (item) => `home-faq-${item.id}`,
                                    )}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-2">
                                        {homeItems.map((item, index) => (
                                            <SortableHomeFaq
                                                key={item.id}
                                                item={item}
                                                index={index}
                                                total={homeItems.length}
                                                onMove={(offset) =>
                                                    saveHomeItems(
                                                        arrayMove(
                                                            homeItems,
                                                            index,
                                                            index + offset,
                                                        ),
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                                Nie wybrano jeszcze żadnego pytania.
                            </p>
                        )}
                    </CardContent>
                </Card>
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
                                {items.map((faq, index) => (
                                    <SortableFaqItem
                                        key={faq.id}
                                        item={faq}
                                        onMove={(offset) =>
                                            moveItem(index, offset)
                                        }
                                        canMoveUp={index > 0}
                                        canMoveDown={index < items.length - 1}
                                        isHomeSelected={homeItems.some(
                                            (item) => item.id === faq.id,
                                        )}
                                        onHomeToggle={() =>
                                            handleHomeToggle(faq)
                                        }
                                    />
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
