import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import PricingLayout from '@/layouts/dashboard/pricing/layout';
import faq from '@/routes/dashboard/faq';
import pricingRoutes from '@/routes/dashboard/pricing';
import pricingItemRoutes from '@/routes/dashboard/pricing/items';
import { BreadcrumbItem, PaginatedResponse, PricingItem } from '@/types';
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
import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: faq.index.url(),
    },
];

interface PropsI {
    pricing: PaginatedResponse<PricingItem>;
}

const SortableSubItem = ({ subItem }: { subItem: any }) => {
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
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        className={'cursor-pointer'}
                        asChild
                    >
                        <Link href={''}>
                            <Pencil />
                        </Link>
                    </Button>
                    <Button
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
    categoryID,
    initialItems,
}: {
    categoryID: number;
    initialItems: any[];
}) => {
    const [subItems, setSubItems] = useState(initialItems);

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

            // API Call dla konkretnej kategorii
            // router.post(
            //     pricingItemRoutes.reorder(categoryId).url,
            //     {
            //         ids: newOrder.map((i) => i.id),
            //     },
            //     { preserveScroll: true },
            // );
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
                        <SortableSubItem key={sub.id} subItem={sub} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

const SortablePricingItem = ({ item }: { item: PricingItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    console.log(item.items);

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
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    </div>
                    <div className={'mt-5'}>
                        <Button
                            asChild
                            variant={'outline'}
                            className={'w-full'}
                        >
                            <Link href={pricingItemRoutes.create.url(item.id)}>
                                Dodaj nowa cene
                            </Link>
                        </Button>
                        <PricingSubItemsList
                            categoryID={item.id}
                            initialItems={item.items}
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
                {/*<DeleteFaqDialog faqID={+item.id} />*/}
            </div>
        </div>
    );
};

const Index = ({ pricing }: PropsI) => {
    const [items, setItems] = useState<PricingItem[]>(pricing.data);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <PricingLayout>
                <div className="flex items-center justify-between">
                    <HeadingSmall
                        title="Wszystkie faq"
                        description="Zarządzaj treścią, edytuj i publikuj nowe faq."
                    />
                    <Button asChild>
                        <Link href={pricingRoutes.create.url()}>
                            Nowa kategoria cennika
                        </Link>
                    </Button>
                </div>
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
                                <SortablePricingItem item={item} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </PricingLayout>
        </AppLayout>
    );
};

export default Index;
