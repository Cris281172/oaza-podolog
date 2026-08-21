import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import SEO from '@/components/seo';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { Pricings } from '@/types';
import { motion } from 'framer-motion';

interface PropsI {
    pricingList: Pricings[];
}

const PriceList = ({ pricingList }: PropsI) => {
    const isMobile = useIsMobile();
    return (
        <PageLayout>
            <SEO
                title="Cennik usług podologicznych Kielce"
                desc="Sprawdź cennik usług podologicznych w gabinecie OAZA w Kielcach. Konsultacje, pedicure podologiczny, terapia wrastających paznokci, odcisków i brodawek."
                canonicalUrl="https://gabinetpodologicznaoaza.pl/cennik"
            />
            <main className="bg-background">
                <HeaderPage
                    overline="Oaza Kielce"
                    title="Cennik"
                    titleSecondary="usług"
                    text="Przejrzyste zasady i profesjonalna opieka. Podane ceny są kwotami orientacyjnymi i mogą ulec zmianie w zależności od stopnia zaawansowania problemu."
                />

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl space-y-16">
                            {pricingList.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={
                                        isMobile ? false : { opacity: 0, y: 20 }
                                    }
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.05,
                                    }}
                                >
                                    <h2 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                                        <span className="h-6 w-1 rounded-full bg-primary" />
                                        {section.title}
                                    </h2>

                                    <div className="divide-y divide-slate-100 rounded-3xl border border-slate-100 bg-slate-50/30 px-6 py-2">
                                        {section.items.map((item, itemIdx) => (
                                            <div
                                                key={itemIdx}
                                                className="group flex items-center justify-between py-4 transition-colors hover:bg-slate-50/50"
                                            >
                                                <span className="font-light text-slate-700 transition-colors group-hover:text-primary">
                                                    {item.name}
                                                </span>
                                                <div className="flex items-center gap-4">
                                                    <div className="hidden h-[1px] w-12 bg-slate-100 md:block" />
                                                    <span className="font-bold whitespace-nowrap text-slate-900">
                                                        {item.price} zł
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border-l-4 border-primary/30 bg-slate-50 p-6 text-sm leading-relaxed font-light text-muted-foreground">
                            Powyższy cennik ma charakter informacyjny i nie
                            stanowi oferty handlowej w rozumieniu Kodeksu
                            Cywilnego. Ostateczna cena zabiegu jest ustalana z
                            podologiem po przeprowadzeniu konsultacji i ocenie
                            stanu faktycznego stóp i paznokci.
                        </div>
                    </div>
                </section>
                <CTASection
                    title="Dobierz odpowiedni zabieg."
                    subtitle="Umów konsultację."
                    description="Nie wiesz, która usługa będzie najlepsza? Podolog oceni problem i zaproponuje terapię dopasowaną do Twoich potrzeb."
                />
            </main>
        </PageLayout>
    );
};

export default PriceList;
