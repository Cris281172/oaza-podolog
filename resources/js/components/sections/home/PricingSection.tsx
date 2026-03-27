import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const pricingPreview = [
    { name: 'Usunięcie odcisku', price: 'od 80 zł' },
    { name: 'Opracowanie paznokci', price: 'od 70 zł' },
    { name: 'Wrastający paznokieć', price: 'od 100 zł' },
    { name: 'Rekonstrukcja paznokcia', price: 'od 120 zł' },
];

const PricingSection = () => {
    const isMobile = useIsMobile();
    return (
        <section className="overflow-hidden bg-white py-12 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-8 max-w-xl text-center md:mb-12">
                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                        CENNIK
                    </span>
                    <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Przykładowe <span className="text-primary">ceny</span>
                    </h2>
                    <p className="text-base font-light text-muted-foreground">
                        Transparentne ceny najpopularniejszych zabiegów.
                    </p>
                </div>

                <motion.div
                    initial={isMobile ? false : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mx-auto max-w-3xl space-y-3"
                >
                    {pricingPreview.map((item, index) => (
                        <div
                            key={index}
                            className="group flex cursor-default items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-primary/20 hover:bg-white hover:shadow-lg md:p-6"
                        >
                            <span className="text-base font-medium text-slate-800 transition-colors group-hover:text-primary">
                                {item.name}
                            </span>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-bold text-primary">
                                    {item.price}
                                </span>
                            </div>
                        </div>
                    ))}

                    <Link
                        href="/pricing"
                        className="group flex items-center justify-between rounded-2xl border-2 border-dashed border-slate-200 p-6 transition-all hover:border-primary/50 hover:bg-primary/[0.02]"
                    >
                        <span className="text-base font-semibold text-slate-500 transition-colors group-hover:text-primary">
                            Zobacz pełny cennik
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-all group-hover:bg-primary group-hover:text-white">
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;
