import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import Seo from '@/components/seo';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { service } from '@/routes';
import { ServiceCategory } from '@/types';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
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

const Services = ({ categories }: { categories: ServiceCategory[] }) => {
    console.log(categories);
    const isMobile = useIsMobile();
    let globalIndex = 0;

    return (
        <PageLayout>
            <Seo
                title={'Usługi podologiczne Kielce'}
                desc={
                    'Poznaj usługi podologiczne w gabinecie OAZA w Kielcach. Leczenie wrastających paznokci, odcisków, modzeli, brodawek oraz kompleksowa pielęgnacja stóp.'
                }
            />
            <main className="flex-1 bg-background">
                <HeaderPage
                    overline={'Oaza Kielce'}
                    title="Oferta"
                    titleSecondary="zabiegów"
                    text="Specjalistyczna pomoc w schorzeniach stóp i paznokci. Poznaj zakres naszych usług i znajdź rozwiązanie dopasowane do Twoich potrzeb."
                />

                <div className="pb-24">
                    {categories.map((cateogry, gIdx) => (
                        <section
                            key={gIdx}
                            className="border-t border-slate-50 py-12 first:border-none"
                        >
                            <div className="container mx-auto px-4">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                                        {cateogry.name}
                                    </h2>
                                    <div className="mt-2 h-1 w-12 rounded-full bg-primary/20" />
                                </div>

                                <motion.div
                                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                                    initial={isMobile ? 'visible' : 'hidden'}
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={isMobile ? {} : containerVariants}
                                >
                                    {cateogry.services.map((item, iIdx) => {
                                        globalIndex++;
                                        const serviceUrl = item.slug
                                            ? service.url(item.slug)
                                            : '#';
                                        return (
                                            <motion.div
                                                key={iIdx}
                                                variants={itemVariants}
                                            >
                                                <div className="group block h-full">
                                                    <Link
                                                        href={serviceUrl}
                                                        className="flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
                                                    >
                                                        <div>
                                                            <span className="text-xs font-bold tracking-widest text-primary/40 uppercase">
                                                                Zabieg
                                                                {globalIndex <
                                                                10
                                                                    ? ` 0${globalIndex}`
                                                                    : ` ${globalIndex}`}
                                                            </span>
                                                            <h3 className="mt-4 text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-primary">
                                                                {item.name}
                                                            </h3>
                                                            <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">
                                                                {
                                                                    item.short_description
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="mt-6 flex items-center text-xs font-black tracking-tighter text-primary uppercase opacity-100 transition-all group-hover:opacity-100 md:opacity-0">
                                                            Dowiedz się więcej →
                                                        </div>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </section>
                    ))}
                </div>
                <CTASection
                    title="Nie wiesz, który zabieg wybrać?"
                    subtitle="Pomożemy Ci podjąć decyzję."
                    description="Skontaktuj się z nami i opowiedz o swoim problemie — dobierzemy odpowiednią terapię."
                />
            </main>
        </PageLayout>
    );
};

export default Services;
