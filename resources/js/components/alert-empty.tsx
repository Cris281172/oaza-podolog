import { Button } from '@/components/ui/button';
import { RouteDefinition } from '@/wayfinder';
import { Link } from '@inertiajs/react';

interface PropsI {
    info: string;
    actionHref: RouteDefinition<'get'>;
    actionText: string;
}

const AlertEmpty = ({ info, actionHref, actionText }: PropsI) => {
    return (
        <div className="rounded-xl border-2 border-dashed py-12 text-center">
            <p className="text-muted-foreground">{info}</p>
            <Button variant="link" asChild>
                <Link href={actionHref}>{actionText}</Link>
            </Button>
        </div>
    );
};

export default AlertEmpty;
