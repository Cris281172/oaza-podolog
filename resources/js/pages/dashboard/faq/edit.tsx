import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import FaqLayout from '@/layouts/dashboard/faq/layout';
import faqRoute from '@/routes/dashboard/faq';
import { BreadcrumbItem, Faq } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: faqRoute.index.url(),
    },
    {
        title: 'Edytowanie',
        href: '',
    },
];

interface PropsI {
    faq: Faq;
}

const Edit = ({ faq }: PropsI) => {
    const { data, setData, patch, processing, recentlySuccessful, errors } =
        useForm({
            question: faq.question,
            answer: faq.answer,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(faqRoute.update.url(faq.id), {
            preserveScroll: true,
            onSuccess: () => toast.success('Edytowano FAQ.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ" />
            <FaqLayout>
                <HeadingSmall
                    title={`Edytyjesz ${faq.id}`}
                    description="Edytuj pytanie i odpowiedź FAQ."
                />

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="question">Pytanie</Label>

                        <Input
                            id="question"
                            value={data.question}
                            onChange={(e) =>
                                setData('question', e.target.value)
                            }
                            placeholder="Podaj pytanie"
                            className="mt-1"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.question}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="answer">Odpowiedź</Label>

                        <Input
                            id="answer"
                            value={data.answer}
                            onChange={(e) => setData('answer', e.target.value)}
                            placeholder="Podaj odpowiedź"
                            className="mt-1"
                        />

                        <InputError className="mt-2" message={errors.answer} />
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
            </FaqLayout>
        </AppLayout>
    );
};

export default Edit;
