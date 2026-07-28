import DeleteConfirmDialog from '@/components/deleteConfirmDialog';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import ServicesLayout from '@/layouts/dashboard/services/layout';
import services from '@/routes/dashboard/services';
import servicesCategory from '@/routes/dashboard/services/services-category';
import { BreadcrumbItem, ServiceCategory, ServiceItem } from '@/types';
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
import { GripVertical, Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usługi',
        href: services.index.url(),
    },
];

// --- Pojedyncza usługa (przeciągana wewnątrz kategorii) ---
const SortableServiceItem = ({ item }: { item: ServiceItem }) => {
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
                            <p>Zabieg podologiczny 0{item.order}</p>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {item.short_description}
                            </p>
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
                    <Link href={services.edit(+item.id).url}>
                        <Pencil />
                    </Link>
                </Button>
                <DeleteConfirmDialog
                    deleteFunc={() => {
                        destroy(services.destroy.url(+item.id), {
                            preserveScroll: true,
                            onSuccess: () =>
                                toast.success('Usunięcie powiodło się.'),
                        });
                    }}
                    processing={processing}
                />
            </div>
        </div>
    );
};

const SortableCategorySection = ({
    category,
    onReorderServices,
}: {
    category: ServiceCategory;
    onReorderServices: (categoryId: number, newItems: ServiceItem[]) => void;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: `category-${category.id}` });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const items = category.services;
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex).map(
            (item, index) => ({
                ...item,
                order: index + 1,
            }),
        );

        onReorderServices(category.id, newOrder);

        router.post(
            services.reorder().url,
            { ids: newOrder.map((item) => item.id) },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => toast.success('Kolejność usług zapisana'),
                onError: () => {
                    onReorderServices(category.id, items);
                    toast.error('Nie udało się zapisać kolejności usług');
                },
            },
        );
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-8">
            <div className="mb-3 flex items-center gap-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-muted-foreground active:cursor-grabbing"
                >
                    <GripVertical size={18} />
                </div>
                <h3 className="font-semibold">{category.name}</h3>
            </div>
            <Button
                asChild
                className={
                    'mb-5 w-full border-dotted bg-muted py-12 opacity-70 hover:opacity-100'
                }
                variant={'outline'}
            >
                <Link href={services.create.url(category.id)}>
                    Dodaj usługę do kategorii
                </Link>
            </Button>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={category.services}
                    strategy={verticalListSortingStrategy}
                >
                    {category.services.map((item) => (
                        <SortableServiceItem key={item.id} item={item} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

const Index = ({
    categories: initialCategories,
}: {
    categories: ServiceCategory[];
}) => {
    const [categories, setCategories] =
        useState<ServiceCategory[]>(initialCategories);

    const categorySensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleCategoryDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = categories.findIndex(
            (c) => `category-${c.id}` === active.id,
        );
        const newIndex = categories.findIndex(
            (c) => `category-${c.id}` === over.id,
        );
        const newOrder = arrayMove(categories, oldIndex, newIndex).map(
            (cat, index) => ({
                ...cat,
                order: index + 1,
            }),
        );

        setCategories(newOrder);

        router.post(
            services.reorderCategories().url,
            { ids: newOrder.map((cat) => cat.id) },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => toast.success('Kolejność kategorii zapisana'),
                onError: () => {
                    setCategories(categories);
                    toast.error('Nie udało się zapisać kolejności kategorii');
                },
            },
        );
    };

    const handleReorderServices = (
        categoryId: number,
        newItems: ServiceItem[],
    ) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === categoryId ? { ...cat, services: newItems } : cat,
            ),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usługi" />
            <ServicesLayout>
                <div className="flex items-center justify-between">
                    <HeadingSmall
                        title="Wszystkie usługi"
                        description="Zarządzaj treścią, edytuj i publikuj nowe usługi."
                    />
                    <Button asChild>
                        <Link href={servicesCategory.create.url()}>
                            Nowa pozycja
                        </Link>
                    </Button>
                </div>

                <div className="mx-auto max-w-2xl py-6">
                    <DndContext
                        sensors={categorySensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleCategoryDragEnd}
                    >
                        <SortableContext
                            items={categories.map((c) => `category-${c.id}`)}
                            strategy={verticalListSortingStrategy}
                        >
                            {categories.map((category) => (
                                <SortableCategorySection
                                    key={category.id}
                                    category={category}
                                    onReorderServices={handleReorderServices}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </ServicesLayout>
        </AppLayout>
    );
};

export default Index;
