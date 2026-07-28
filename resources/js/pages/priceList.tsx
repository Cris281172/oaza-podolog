import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { motion } from 'framer-motion';

const priceData = [
    {
        category: 'Konsultacja podologiczna',
        items: [
            { name: 'Bezpłatna konsultacja z ulotką', price: '0 zł' },
            { name: 'Bezpłatna konsultacja w ramach zabiegu', price: '0 zł' },
            { name: 'Konsultacja podologiczna w gabinecie', price: '100 zł' },
        ],
    },
    {
        category: 'Zabiegi na stopy zdrowe',
        items: [
            {
                name: 'Pedicure podologiczny (zdrowe stopy i paznokcie)',
                price: '170 zł',
            },
        ],
    },
    {
        category: 'Zabiegi na stopy zmienione chorobowo',
        items: [
            {
                name: 'Opracowanie podeszwy (cukrzyca, łuszczyca)',
                price: '150 zł',
            },
            { name: 'Opracowanie pięt (rozpadliny)', price: '180 zł' },
            { name: 'Terapia brodawki wirusowej (pierwsza)', price: '150 zł' },
            { name: 'Terapia brodawki wirusowej (kolejna)', price: '30 zł' },
            { name: 'Usuwanie modzeli / odcisków (pierwszy)', price: '100 zł' },
            { name: 'Usuwanie modzeli / odcisków (kolejny)', price: '30 zł' },
        ],
    },
    {
        category: 'Zabiegi na paznokcie zdrowe',
        items: [
            { name: 'Obcięcie paznokci zdrowych', price: '100 zł' },
            {
                name: 'Obcięcie i opracowanie paznokci oraz wałów',
                price: '150 zł',
            },
        ],
    },
    {
        category: 'Paznokcie chorobowe / po urazach',
        items: [
            { name: 'Opracowanie paznokci dystroficznych', price: '200 zł' },
            { name: 'Odbarczanie krwiaka podpaznokciowego', price: '150 zł' },
            {
                name: 'Paznokcie (grzybica, łuszczyca, onycholiza)',
                price: '200 zł',
            },
        ],
    },
    {
        category: 'Zabiegi kompleksowe',
        items: [
            { name: 'Podstawowy zabieg podologiczny', price: '200 zł' },
            { name: 'Rozszerzony zabieg podologiczny', price: '300 zł' },
        ],
    },
    {
        category: 'Diagnostyka i badania',
        items: [
            { name: 'Pomiar poziomu cukru', price: '50 zł' },
            { name: 'Badanie mykologiczne (nici grzyba)', price: '300 zł' },
            { name: 'Badanie mykologiczne (hodowla)', price: '300 zł' },
            {
                name: 'Badanie mykologiczne bezpośrednie + hodowla',
                price: '350 zł',
            },
            {
                name: 'Badanie mikrobiologiczne z antybiogramem',
                price: '350 zł',
            },
        ],
    },
    {
        category: 'Terapia wrastających paznokci',
        items: [
            { name: 'Założenie klamry (1 paznokieć)', price: '200 zł' },
            { name: 'Przełożenie klamry', price: '150 zł' },
            { name: 'Zdjęcie klamry / Wizyta kontrolna', price: '100 zł' },
            { name: 'Tamponada / Taping', price: '50 zł' },
            { name: 'Opatrunek z odciążeniem / preparatem', price: '100 zł' },
        ],
    },
];

const PriceList = () => {
    const isMobile = useIsMobile();

    return (
        <PageLayout>
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
                            {priceData.map((section, idx) => (
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
                                        {section.category}
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
                                                        {item.price}
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
                    description="Nie wiesz, która usługa będzie najlepsza? Podolog oceni problem i zaproponuje skuteczną terapię."
                />
            </main>
        </PageLayout>
    );
};

export default PriceList;
