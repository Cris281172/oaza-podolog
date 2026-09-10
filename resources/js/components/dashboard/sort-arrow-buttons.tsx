import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

type SortArrowButtonsProps = {
    label: string;
    onMoveUp: () => void;
    onMoveDown: () => void;
    canMoveUp: boolean;
    canMoveDown: boolean;
};

export function SortArrowButtons({
    label,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown,
}: SortArrowButtonsProps) {
    return (
        <div className="flex shrink-0 gap-1">
            <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onMoveUp}
                disabled={!canMoveUp}
                aria-label={`Przesuń w górę: ${label}`}
                title="Przesuń w górę"
            >
                <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onMoveDown}
                disabled={!canMoveDown}
                aria-label={`Przesuń w dół: ${label}`}
                title="Przesuń w dół"
            >
                <ChevronDown className="h-4 w-4" />
            </Button>
        </div>
    );
}
