import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { service } from '@/routes';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';

const serviceGroups = [
    {
        category: 'Konsultacja podologiczna',
        items: [
            {
                title: 'Bezpłatna konsultacja z ulotką',
                description:
                    'Wstępna ocena stanu stóp po okazaniu materiałów promocyjnych gabinetu.',
                url: 'bezplatna-konsultacja-z-ulotka',
            },
            {
                title: 'Konsultacja w ramach zabiegu',
                description:
                    'Pełna diagnostyka i planowanie terapii wliczone w cenę wykonywanego zabiegu.',
                url: 'bezplatna-konsultacja-w-ramach-zabiegu',
            },
            {
                title: 'Konsultacja w gabinecie',
                description:
                    'Szczegółowy wywiad medyczny, badanie przedmiotowe i profesjonalna porada specjalisty.',
                url: 'konsultacja-podologiczna-w-gabinecie',
            },
        ],
    },
    {
        category: 'Stopy zdrowe',
        items: [
            {
                title: 'Pedicure dla zdrowych stóp',
                description:
                    'Kompleksowe opracowanie paznokci, wałów i podeszwy stóp wraz z profesjonalną pielęgnacją.',
                url: 'pedicure-dla-zdrowych-stop',
            },
        ],
    },
    {
        category: 'Stopy zmienione chorobowo',
        items: [
            {
                title: 'Stopa cukrzycowa i łuszczycowa',
                description:
                    'Specjalistyczne opracowanie podeszwy stopy dotkniętej zmianami chorobowymi (cukrzyca, łuszczyca).',
                url: 'stopa-cukrzycowa-i-luszczycowa',
            },
            {
                title: 'Terapia pękających pięt',
                description:
                    'Opracowanie bolesnych rozpadlin i głębokich pęknięć pięt z odpowiednim doborem preparatów.',
                url: 'terapia-pekajacych-piet',
            },
            {
                title: 'Terapia brodawki wirusowej',
                description:
                    'Skuteczne usuwanie kurzajek przy użyciu sprawdzonych metod terapeutycznych.',
                url: 'terapia-brodawki-wirusowej',
            },
            {
                title: 'Usuwanie modzeli i odcisków',
                description:
                    'Likwidacja bolesnych nagniotków, odcisków i modzeli przywracająca pełny komfort chodzenia.',
                url: 'usuwanie-modzeli-i-odcisków',
            },
        ],
    },
    {
        category: 'Paznokcie zdrowe',
        items: [
            {
                title: 'Obcięcie paznokci zdrowych',
                description:
                    'Prawidłowe skrócenie płytki paznokciowej zapobiegające wrastaniu i deformacjom.',
                url: 'obciecie-paznokci-zdrowych',
            },
            {
                title: 'Opracowanie paznokci i wałów',
                description:
                    'Profesjonalne oczyszczenie okolicy paznokcia, wałów i nadanie płytce właściwego kształtu.',
                url: 'opracowanie-paznokci-i-walow',
            },
        ],
    },
    {
        category: 'Paznokcie chorobowe / po urazach',
        items: [
            {
                title: 'Paznokcie dystroficzne',
                description:
                    'Specjalistyczne opracowanie paznokci o zmienionej strukturze, kolorze i grubości.',
                url: 'paznokcie-dystroficzne',
            },
            {
                title: 'Odbarczanie krwiaka',
                description:
                    'Doraźna pomoc w przypadku krwiaków podpaznokciowych powstałych w wyniku urazu mechanicznego.',
                url: 'odbarczanie-krwiaka',
            },
            {
                title: 'Terapia onycholizy i infekcji',
                description:
                    'Leczenie zmian grzybiczych, łuszczycowych oraz infekcji bakteryjnych (Pseudomonas).',
                url: 'terapia-onycholizy-i-infekcji',
            },
            {
                title: 'Pielęgnacja po onkologii',
                description:
                    'Bezpieczne opracowanie paznokci szponowatych i zmienionych w trakcie lub po leczeniu onkologicznym.',
                url: 'pielegnacja-po-onkologii',
            },
        ],
    },
    {
        category: 'Zabiegi kompleksowe',
        items: [
            {
                title: 'Podstawowy zabieg podologiczny',
                description:
                    'Usunięcie mniejszych fizjologicznych zrogowaceń oraz pełne opracowanie paznokci i wałów.',
                url: 'podstawowy-zabieg-podologiczny',
            },
            {
                title: 'Rozszerzony zabieg podologiczny',
                description:
                    'Usunięcie średnich fizjologicznych zrogowaceń oraz zaawansowane oczyszczanie podeszwy i paznokci.',
                url: 'rozszerzony-zabieg-podologiczny',
            },
        ],
    },
    {
        category: 'Diagnostyka i badania',
        items: [
            {
                title: 'Badania mykologiczne',
                description:
                    'Pobranie materiału w celu identyfikacji gatunku grzyba (hodowla oraz badanie bezpośrednie).',
                url: 'badania-mykologiczne',
            },
            {
                title: 'Badanie mikrobiologiczne',
                description:
                    'Wymaz z antybiogramem (np. przy stanie zapalnym) oraz badania genetyczne w kierunku łuszczycy.',
                url: 'badanie-mikrobiologiczne',
            },
            {
                title: 'Pomiar poziomu cukru',
                description:
                    'Szybkie badanie glikemii u pacjentów z grupy ryzyka stopy cukrzycowej.',
                url: 'pomiar-poziomu-cukru',
            },
        ],
    },
    {
        category: 'Terapia wrastających paznokci',
        items: [
            {
                title: 'Klamry ortonyksyjne',
                description:
                    'Zakładanie, przekładanie i usuwanie profesjonalnych klamer korygujących tor wzrostu paznokcia.',
                url: 'klamry-ortonyksyjne',
            },
            {
                title: 'Tamponada i opatrunki',
                description:
                    'Zabezpieczenie bolesnych miejsc, taping, odciążenia oraz opatrunki ze specjalistycznym preparatem.',
                url: 'tamponada-i-opatrunki',
            },
        ],
    },
];

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

const Services = () => {
    const isMobile = useIsMobile();
    // Licznik globalny dla numeracji usług
    let globalIndex = 0;

    return (
        <PageLayout>
            <main className="flex-1 bg-white">
                <HeaderPage
                    overline={'Oaza Kielce'}
                    title="Oferta"
                    titleSecondary="zabiegów"
                    text="Specjalistyczna pomoc w schorzeniach stóp i paznokci. Poznaj zakres naszych usług i znajdź rozwiązanie dopasowane do Twoich potrzeb."
                />

                <div className="pb-24">
                    {serviceGroups.map((group, gIdx) => (
                        <section
                            key={gIdx}
                            className="border-t border-slate-50 py-12 first:border-none"
                        >
                            <div className="container mx-auto px-4">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                                        {group.category}
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
                                    {group.items.map((item, iIdx) => {
                                        globalIndex++;
                                        const serviceUrl = item.url
                                            ? service.url(item.url)
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
                                                                Zabieg{' '}
                                                                {globalIndex <
                                                                10
                                                                    ? `0${globalIndex}`
                                                                    : globalIndex}
                                                            </span>
                                                            <h3 className="mt-4 text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-primary">
                                                                {item.title}
                                                            </h3>
                                                            <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">
                                                                {
                                                                    item.description
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
                <CTASection />
            </main>
        </PageLayout>
    );
};

export default Services;
