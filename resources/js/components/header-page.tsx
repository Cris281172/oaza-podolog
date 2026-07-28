import { Breadcrumbs } from '@/components/breadcrumbs';
import { motion } from 'framer-motion';

interface BreadcrumbItemI {
    title: string;
    href: string;
}

interface PropsI {
    overline?: string;
    title: string;
    titleSecondary?: string;
    text?: string;
    breadcrumbs?: BreadcrumbItemI[];
}

const HeaderPage = ({
    overline,
    title,
    titleSecondary,
    text,
    breadcrumbs,
}: PropsI) => {
    return (
        <section className="border-b border-slate-100 bg-muted/50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                {breadcrumbs && breadcrumbs.length !== 0 && (
                    <div className="mb-8">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl"
                >
                    {overline && (
                        <span className="text-xs font-bold tracking-widest text-primary uppercase">
                            {overline}
                        </span>
                    )}

                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        {title}{' '}
                        {titleSecondary && (
                            <span className="text-primary">
                                {titleSecondary}
                            </span>
                        )}
                    </h1>

                    {text && (
                        <p className="mt-4 text-base leading-relaxed font-light text-muted-foreground md:text-lg">
                            {text}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HeaderPage;
