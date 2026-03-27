import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { Plus } from 'lucide-react';

const services = [
    {
        title: 'Usuwanie odcisków',
        description: 'Profesjonalne usuwanie odcisków i modzeli',
        link: '/services/usuwanie-odciskow',
    },
    {
        title: 'Leczenie wrastających paznokci',
        description: 'Skuteczne leczenie wrastających paznokci',
        link: '/services/wrastajace-paznokcie',
    },
    {
        title: 'Rekonstrukcja paznokci',
        description: 'Odbudowa uszkodzonych płytek paznokciowych',
        link: '/services/rekonstrukcja-paznokci',
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const ServicesSection = () => {
    const isMobile = useIsMobile();
    return (
        <section className="overflow-hidden bg-white py-12 md:py-24">
            <motion.div
                className="container mx-auto px-4"
                initial={isMobile ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={isMobile ? {} : containerVariants}
            >
                <div className="mb-8 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
                    <motion.div variants={itemVariants} className="max-w-xl">
                        <span className="text-xs font-bold tracking-widest text-primary uppercase">
                            Oferta
                        </span>
                        <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            Specjalistyczna{' '}
                            <span className="text-primary">oferta</span>
                        </h2>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            W OAZIE skupiamy się na rozwiązaniach, które
                            przywracają stopom zdrowie i estetyczny wygląd. Oto
                            nasze kluczowe zabiegi:
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link
                            href="/services"
                            className="hidden font-semibold text-primary underline-offset-8 hover:underline md:block"
                        >
                            Zobacz wszystkie usługi (12+)
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Link
                                href={service.link}
                                className="group block h-full"
                            >
                                <div className="flex h-full min-h-[200px] flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 md:min-h-[280px]">
                                    <div>
                                        <span className="text-xs font-bold tracking-widest text-primary/40 uppercase">
                                            Zabieg 0{index + 1}
                                        </span>
                                        <h3 className="mt-4 text-xl leading-tight font-bold transition-colors group-hover:text-primary md:text-2xl">
                                            {service.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex translate-y-2 items-center text-xs font-black tracking-tighter text-primary uppercase opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100 md:opacity-0">
                                        Czytaj więcej →
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    <motion.div variants={itemVariants}>
                        <Link href="/services" className="group block h-full">
                            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/20 bg-primary/[0.02] p-8 text-center transition-all hover:border-primary hover:bg-primary">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-white">
                                    <Plus className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold transition-colors group-hover:text-white">
                                    Poznaj pełną <br /> ofertę zabiegów
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground transition-colors group-hover:text-white/80">
                                    Ponad 15 specjalistycznych usług
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 text-center md:hidden"
                >
                    <Button
                        asChild
                        variant="outline"
                        className="w-full rounded-2xl py-6"
                    >
                        <Link href="/services">Wszystkie usługi</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ServicesSection;
