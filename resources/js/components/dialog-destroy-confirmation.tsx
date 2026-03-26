import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FormEvent, ReactNode, useState } from 'react';

interface PropsI {
    children: ReactNode;
    title?: string;
    desc?: string;
    handleDelete: () => void;
}

const DialogDestroyConfirmation = ({
    children,
    title,
    desc,
    handleDelete,
}: PropsI) => {
    const [open, setOpen] = useState(false);
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleDelete();
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    {title ?? 'Czy na pewno chcesz to usunąć?'}
                </DialogTitle>
                <DialogDescription>
                    {desc ??
                        'Po potwierdzeniu nie będzie możliwości przywrócenia.'}
                </DialogDescription>
                <form onSubmit={submit} className="space-y-6">
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary">Anuluj</Button>
                        </DialogClose>

                        <Button type="submit" variant="destructive">
                            Potwierdzam
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogDestroyConfirmation;
