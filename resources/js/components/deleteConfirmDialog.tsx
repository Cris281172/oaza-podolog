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
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PropsI {
    deleteFunc: () => void;
    processing: boolean;
}

const DeleteConfirmDialog = ({ deleteFunc, processing }: PropsI) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        deleteFunc();
        setIsOpen(false);
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

export default DeleteConfirmDialog;
