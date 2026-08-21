import DeleteConfirmDialog from '@/components/deleteConfirmDialog';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import PricingLayout from '@/layouts/dashboard/pricing/layout';
import faq from '@/routes/dashboard/faq';
import pricingRoutes from '@/routes/dashboard/pricing';
import pricingItemRoutes from '@/routes/dashboard/pricing/items';
import { BreadcrumbItem, PricingItem, Pricings } from '@/types';
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
import { Eye, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cennik',
        href: faq.index.url(),
    },
];

interface PropsI {
    pricing: Pricings[];
}

const SortableSubItem = ({
    subItem,
    onDelete,
    isHomeSelected,
    onHomeToggle,
}: {
    subItem: PricingItem;
    onDelete: (id: number) => void;
    isHomeSelected: boolean;
    onHomeToggle: (item: PricingItem) => void;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: `sub-${subItem.id}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="mb-1 flex items-center gap-2 rounded-md bg-secondary/50 p-2 text-sm"
        >
            <div {...attributes} {...listeners} className="cursor-grab">
                <GripVertical size={14} />
            </div>
            <div className={'flex w-full items-center justify-between'}>
                <span className="flex-1">
                    {subItem.name} - {subItem.price} zł
                </span>
                <div className={'flex gap-2'}>
                    <div className="flex items-center gap-2 px-2">
                        <Checkbox
                            id={`home-${subItem.id}`}
                            checked={isHomeSelected}
                            onCheckedChange={() => onHomeToggle(subItem)}
                        />
                        <label
                            htmlFor={`home-${subItem.id}`}
                            className="cursor-pointer text-xs text-muted-foreground"
                        >
                            Strona główna
                        </label>
                    </div>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        className={'cursor-pointer'}
                        asChild
                    >
                        <Link href={pricingItemRoutes.edit.url(subItem.id)}>
                            <Pencil />
                        </Link>
                    </Button>
                    <Button
                        onClick={() => onDelete(subItem.id)}
                        variant="outline"
                        size="icon"
                        className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const PricingSubItemsList = ({
    initialItems,
    selectedHomeIds,
    onHomeToggle,
    onHomeRemove,
}: {
    initialItems: PricingItem[];
    selectedHomeIds: Set<number>;
    onHomeToggle: (item: PricingItem) => void;
    onHomeRemove: (id: number) => void;
}) => {
    const [subItems, setSubItems] = useState(initialItems);

    const handleDelete = (id: number) => {
        router.delete(pricingItemRoutes.destroy.url(id), {
            preserveScroll: true,
            onSuccess: () => {
                setSubItems((current) =>
                    current.filter((item) => item.id !== id),
                );
                onHomeRemove(id);

                toast.success('Pozycja pricingu została usunięta.');
            },
        });
    };

    const handleSubDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = subItems.findIndex(
                (i) => `sub-${i.id}` === active.id,
            );
            const newIndex = subItems.findIndex(
                (i) => `sub-${i.id}` === over.id,
            );

            const newOrder = arrayMove(subItems, oldIndex, newIndex);
            setSubItems(newOrder);

            router.post(
                pricingItemRoutes.reorder().url,
                {
                    ids: newOrder.map((i) => i.id),
                },
                { preserveScroll: true },
            );
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleSubDragEnd}
        >
            <SortableContext
                items={subItems.map((i) => `sub-${i.id}`)}
                strategy={verticalListSortingStrategy}
            >
                <div className="mt-3 space-y-1">
                    {subItems.map((sub) => (
                        <SortableSubItem
                            key={sub.id}
                            subItem={sub}
                            onDelete={handleDelete}
                            isHomeSelected={selectedHomeIds.has(sub.id)}
                            onHomeToggle={onHomeToggle}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

const SortablePricingItem = ({
    item,
    onDelete,
    selectedHomeIds,
    onHomeToggle,
    onHomeRemove,
}: {
    item: Pricings;
    onDelete: (id: number) => void;
    selectedHomeIds: Set<number>;
    onHomeToggle: (item: PricingItem) => void;
    onHomeRemove: (id: number) => void;
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
                <CardContent className="flex flex-col p-4">
                    <div className={'flex items-center gap-4'}>
                        <div
                            {...attributes}
                            {...listeners}
                            className="cursor-grab text-muted-foreground active:cursor-grabbing"
                        >
                            <GripVertical size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                        </div>
                    </div>
                    <div className={'mt-5'}>
                        <Button
                            asChild
                            variant={'outline'}
                            className={'w-full'}
                        >
                            <Link href={pricingItemRoutes.create.url(item.id)}>
                                Dodaj nową cenę
                            </Link>
                        </Button>
                        <PricingSubItemsList
                            initialItems={item.items}
                            selectedHomeIds={selectedHomeIds}
                            onHomeToggle={onHomeToggle}
                            onHomeRemove={onHomeRemove}
                        />
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
                    <Link href={pricingRoutes.edit(+item.id).url}>
                        <Pencil />
                    </Link>
                </Button>
                <DeleteConfirmDialog
                    deleteFunc={() => {
                        destroy(pricingRoutes.destroy.url(+item.id), {
                            preserveScroll: true,
                            onSuccess: () => {
                                onDelete(item.id);
                                toast.success('Usunięcie powiodło się.');
                            },
                        });
                    }}
                    processing={processing}
                />
            </div>
        </div>
    );
};

const SortableHomeItem = ({ item }: { item: PricingItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: `home-${item.id}` });

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
                className="cursor-grab text-muted-foreground active:cursor-grabbing"
                aria-label={`Zmień kolejność: ${item.name}`}
            >
                <GripVertical size={18} />
            </button>
            <span className="flex-1 text-sm font-medium">{item.name}</span>
            <span className="text-sm font-semibold text-primary">
                {item.price} zł
            </span>
        </div>
    );
};

const Index = ({ pricing }: PropsI) => {
    const [items, setItems] = useState<Pricings[]>(pricing);
    const [homeItems, setHomeItems] = useState<PricingItem[]>(() =>
        pricing
            .flatMap((section) => section.items)
            .filter((item) => item.show_on_home)
            .sort((a, b) => (a.home_order ?? 0) - (b.home_order ?? 0)),
    );
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);

            const newOrder = arrayMove(items, oldIndex, newIndex);
            setItems(newOrder);

            router.post(
                pricingRoutes.reorder().url,
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

    const handleDelete = (id: number) => {
        const deletedItemIds = new Set(
            items
                .find((item) => item.id === id)
                ?.items.map((item) => item.id) ?? [],
        );
        setItems((current) => current.filter((item) => item.id !== id));
        if (homeItems.some((item) => deletedItemIds.has(item.id))) {
            saveHomeItems(
                homeItems.filter((item) => !deletedItemIds.has(item.id)),
            );
        }
    };

    const saveHomeItems = (nextItems: PricingItem[]) => {
        setHomeItems(nextItems);
        router.post(
            pricingItemRoutes.homePreview().url,
            { ids: nextItems.map((item) => item.id) },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () =>
                    toast.success('Podgląd strony głównej zapisany'),
            },
        );
    };

    const handleHomeToggle = (item: PricingItem) => {
        const isSelected = homeItems.some(
            (selected) => selected.id === item.id,
        );
        saveHomeItems(
            isSelected
                ? homeItems.filter((selected) => selected.id !== item.id)
                : [...homeItems, item],
        );
    };

    const handleHomeRemove = (id: number) => {
        if (homeItems.some((item) => item.id === id)) {
            saveHomeItems(homeItems.filter((item) => item.id !== id));
        }
    };

    const handleHomeDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = homeItems.findIndex(
            (item) => `home-${item.id}` === active.id,
        );
        const newIndex = homeItems.findIndex(
            (item) => `home-${item.id}` === over.id,
        );

        saveHomeItems(arrayMove(homeItems, oldIndex, newIndex));
    };

    const selectedHomeIds = new Set(homeItems.map((item) => item.id));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cennik" />
            <PricingLayout>
                <div className="flex items-center justify-between">
                    <HeadingSmall
                        title="Cennik"
                        description="Zarządzaj cennikiem produktów i usług."
                    />
                    <Button asChild>
                        <Link href={pricingRoutes.create.url()}>
                            Nowa kategoria cennika
                        </Link>
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
                                    Cennik na stronie głównej
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Zaznacz pozycje poniżej, a tutaj przeciągnij
                                    je w wybranej kolejności.
                                </p>
                            </div>
                        </div>
                        {homeItems.length > 0 ? (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleHomeDragEnd}
                            >
                                <SortableContext
                                    items={homeItems.map(
                                        (item) => `home-${item.id}`,
                                    )}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-2">
                                        {homeItems.map((item) => (
                                            <SortableHomeItem
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                                Nie wybrano jeszcze żadnej pozycji.
                            </p>
                        )}
                    </CardContent>
                </Card>
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
                            {items.map((item) => (
                                <SortablePricingItem
                                    key={item.id}
                                    item={item}
                                    onDelete={handleDelete}
                                    selectedHomeIds={selectedHomeIds}
                                    onHomeToggle={handleHomeToggle}
                                    onHomeRemove={handleHomeRemove}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </PricingLayout>
        </AppLayout>
    );
};

export default Index;
