import { SortArrowButtons } from '@/components/dashboard/sort-arrow-buttons';
import DeleteConfirmDialog from '@/components/deleteConfirmDialog';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import certificateRoutes from '@/routes/dashboard/certificates';
import { BreadcrumbItem, Certificate } from '@/types';
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
import { Head, router, useForm } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Certyfikaty', href: certificateRoutes.index.url() },
];

function SortableCertificate({
    certificate,
    index,
    total,
    onMove,
    onDelete,
}: {
    certificate: Certificate;
    index: number;
    total: number;
    onMove: (offset: -1 | 1) => void;
    onDelete: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: certificate.id });

    return (
        <Card
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
        >
            <CardContent className="flex items-center gap-3 p-3">
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="cursor-grab touch-none text-muted-foreground select-none active:cursor-grabbing"
                    aria-label={`Przeciągnij: ${certificate.title}`}
                >
                    <GripVertical />
                </button>
                <img
                    src={certificate.thumbnail_path}
                    alt={certificate.title}
                    className="h-20 w-24 rounded-md bg-muted object-cover"
                />
                <p className="min-w-0 flex-1 truncate font-medium">
                    {certificate.title}
                </p>
                <SortArrowButtons
                    label={certificate.title}
                    onMoveUp={() => onMove(-1)}
                    onMoveDown={() => onMove(1)}
                    canMoveUp={index > 0}
                    canMoveDown={index < total - 1}
                />
                <DeleteConfirmDialog deleteFunc={onDelete} processing={false} />
            </CardContent>
        </Card>
    );
}

export default function Index({
    certificates,
}: {
    certificates: Certificate[];
}) {
    const [items, setItems] = useState(certificates);
    const form = useForm<{ title: string; image: File | null }>({
        title: '',
        image: null,
    });
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 200, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => setItems(certificates), [certificates]);

    const saveOrder = (nextItems: Certificate[]) => {
        setItems(nextItems);
        router.post(
            certificateRoutes.reorder().url,
            { ids: nextItems.map((item) => item.id) },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => toast.success('Kolejność zapisana'),
            },
        );
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        saveOrder(arrayMove(items, oldIndex, newIndex));
    };

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        form.post(certificateRoutes.store().url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                toast.success('Certyfikat dodany i zoptymalizowany');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Certyfikaty" />
            <div className="space-y-8 p-4 md:p-6">
                <HeadingSmall
                    title="Certyfikaty"
                    description="Dodawaj certyfikaty i ustawiaj kolejność wyświetlania na stronie głównej."
                />

                <Card className="max-w-2xl">
                    <CardContent className="p-5">
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Nazwa certyfikatu</Label>
                                <Input
                                    id="title"
                                    value={form.data.title}
                                    onChange={(event) =>
                                        form.setData(
                                            'title',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Np. Podologia kliniczna"
                                />
                                <InputError message={form.errors.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">
                                    Zdjęcie certyfikatu
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(event) =>
                                        form.setData(
                                            'image',
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    JPG, PNG lub WebP, maksymalnie 15 MB. Plik
                                    zostanie automatycznie zmniejszony i
                                    skompresowany.
                                </p>
                                <InputError message={form.errors.image} />
                            </div>
                            <Button disabled={form.processing}>
                                {form.processing
                                    ? 'Optymalizowanie…'
                                    : 'Dodaj certyfikat'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="max-w-2xl space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Zmień kolejność przeciągając element lub używając
                        strzałek.
                    </p>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {items.map((certificate, index) => (
                                <SortableCertificate
                                    key={certificate.id}
                                    certificate={certificate}
                                    index={index}
                                    total={items.length}
                                    onMove={(offset) =>
                                        saveOrder(
                                            arrayMove(
                                                items,
                                                index,
                                                index + offset,
                                            ),
                                        )
                                    }
                                    onDelete={() =>
                                        router.delete(
                                            certificateRoutes.destroy(
                                                certificate.id,
                                            ).url,
                                            {
                                                preserveScroll: true,
                                                onSuccess: () =>
                                                    toast.success(
                                                        'Certyfikat usunięty',
                                                    ),
                                            },
                                        )
                                    }
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </AppLayout>
    );
}
