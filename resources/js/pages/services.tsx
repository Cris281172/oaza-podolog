import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { service } from '@/routes';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';

const serviceGroups = [
    {
        category: 'Najczęściej wybierane zabiegi',
        items: [
            {
                badge: 'Zabieg podologiczny 01',
                title: 'Terapia brodawki',
                description:
                    'Diagnostyka, miejscowe opracowanie brodawek wirusowych oraz wsparcie profilaktyki domowej.',
                url: 'terapia-brodawki-wirusowej',
            },
            {
                badge: 'Zabieg podologiczny 02',
                title: 'Terapia grzybicy paznokci i stóp',
                description:
                    'Diagnostyka, badanie mykologiczne, opracowanie zmian grzybiczych i stosowanie preparatów.',
                url: 'terapia-grzybicy-paznokci-i-stop',
            },
            {
                badge: 'Zabieg podologiczny 03',
                title: 'Terapia wrastających paznokci',
                description:
                    'Diagnostyka, opracowanie paznokcia i wałów okołopaznokciowych, założenie klamry oraz odciążeń.',
                url: 'terapia-wrastajacych-paznokci',
            },
        ],
    },
    {
        category: 'Konsultacja podologiczna',
        items: [
            {
                title: 'Bezpłatna konsultacja z ulotką',
                description:
                    'Wstępna ocena stanu stóp, omówienie problemu i wskazanie możliwych kierunków dalszej terapii.',
                url: 'bezplatna-konsultacja-z-ulotka',
            },
            {
                title: 'Konsultacja w ramach zabiegu',
                description:
                    'Diagnostyka oraz dobór terapii wykonywane bez dodatkowych kosztów podczas wizyty zabiegowej.',
                url: 'bezplatna-konsultacja-w-ramach-zabiegu',
            },
            {
                title: 'Konsultacja podologiczna w gabinecie',
                description:
                    'Szczegółowy wywiad, ocena stanu stóp i paznokci oraz przygotowanie indywidualnego planu terapii.',
                url: 'konsultacja-podologiczna-w-gabinecie',
            },
        ],
    },
    {
        category: 'Zabiegi podologiczne na stopy zdrowe',
        items: [
            {
                title: 'Pedicure podologiczny',
                description:
                    'Konsultacja, obcięcie i opracowanie paznokci, oczyszczenie wałów, wygładzenie podeszwy oraz pielęgnacja.',
                url: 'pedicure-dla-zdrowych-stop',
            },
        ],
    },
    {
        category: 'Zabiegi podologiczne na stopy zmienione chorobowo',
        items: [
            {
                title: 'Opracowanie stopy cukrzycowej i łuszczycowej',
                description:
                    'Bezpieczne opracowanie podeszwy stopy zmienionej chorobowo, w tym stopy cukrzycowej i łuszczycowej.',
                url: 'stopa-cukrzycowa-i-luszczycowa',
            },
            {
                title: 'Opracowanie pękających pięt',
                description:
                    'Opracowanie pięt zmienionych chorobowo, rozpadlin, pęknięć oraz nadmiernych zrogowaceń.',
                url: 'terapia-pekajacych-piet',
            },
            {
                title: 'Usuwanie modzeli, odcisków i nagniotków',
                description:
                    'Miejscowe opracowanie bolesnych zmian skórnych, zmniejszenie ucisku oraz zalecenia profilaktyczne.',
                url: 'usuwanie-modzeli-i-odciskow',
            },
        ],
    },
    {
        category: 'Zabiegi na paznokcie zdrowe',
        items: [
            {
                title: 'Obcięcie paznokci zdrowych',
                description:
                    'Prawidłowe skrócenie zdrowych paznokci u stóp z zachowaniem komfortu i bezpieczeństwa.',
                url: 'obciecie-paznokci-zdrowych',
            },
            {
                title: 'Obcięcie i opracowanie paznokci oraz wałów',
                description:
                    'Skrócenie paznokci, opracowanie płytki oraz oczyszczenie wałów okołopaznokciowych.',
                url: 'opracowanie-paznokci-i-walow',
            },
        ],
    },
    {
        category: 'Zabiegi na paznokcie zmienione chorobowo / po urazach',
        items: [
            {
                title: 'Opracowanie paznokci dystroficznych',
                description:
                    'Specjalistyczne opracowanie paznokci zmienionych chorobowo, pogrubionych, zniekształconych lub dystroficznych.',
                url: 'paznokcie-dystroficzne',
            },
            {
                title: 'Odbarczanie krwiaka podpaznokciowego',
                description:
                    'Pomoc przy paznokciach po urazie, zmniejszenie ucisku i zabezpieczenie uszkodzonej płytki.',
                url: 'odbarczanie-krwiaka-podpaznokciowego',
            },
            {
                title: 'Opracowanie paznokci grzybiczych i łuszczycowych',
                description:
                    'Opracowanie zmian grzybiczych, łuszczycowych, onycholizy, pseudomonas, paznokci szponowatych i zmian po leczeniu onkologicznym.',
                url: 'terapia-grzybicy-paznokci-i-stop',
            },
        ],
    },
    {
        category: 'Kompleksowe zabiegi na stopy i paznokcie',
        items: [
            {
                title: 'Podstawowy zabieg podologiczny',
                description:
                    'Usunięcie mniejszych fizjologicznych zrogowaceń, opracowanie paznokci i wałów oraz nałożenie preparatów.',
                url: 'podstawowy-zabieg-podologiczny',
            },
            {
                title: 'Rozszerzony zabieg podologiczny',
                description:
                    'Usunięcie średnich fizjologicznych zrogowaceń, opracowanie paznokci i wałów oraz pielęgnacja preparatami.',
                url: 'rozszerzony-zabieg-podologiczny',
            },
        ],
    },
    {
        category: 'Diagnostyka i badania w obrębie stóp i paznokci',
        items: [
            {
                title: 'Pomiar poziomu cukru',
                description:
                    'Szybki kontrolny pomiar poziomu glukozy we krwi, szczególnie ważny u pacjentów z cukrzycą.',
                url: 'pomiar-poziomu-cukru',
            },
            {
                title: 'Badania mykologiczne',
                description:
                    'Badanie bezpośrednie, hodowla lub diagnostyka kompleksowa w celu wykrycia i identyfikacji grzybicy.',
                url: 'badania-mykologiczne',
            },
            {
                title: 'Badanie mikrobiologiczne z mykogramem',
                description:
                    'Wymaz przy stanie zapalnym lub infekcji oraz dobór dalszego kierunku terapii na podstawie wyniku.',
                url: 'badanie-mikrobiologiczne',
            },
            {
                title: 'Badanie genetyczne HLA-CW6',
                description:
                    'Diagnostyka genetyczna w kierunku predyspozycji do łuszczycy związanej z genem HLA-CW6.',
                url: 'badanie-genetyczne-hla-cw6',
            },
        ],
    },
    {
        category: 'Terapia wrastających paznokci',
        items: [
            {
                title: 'Założenie klamry ortonyksyjnej',
                description:
                    'Dobór i założenie klamry na wrastający lub wkręcający paznokieć w celu korekcji toru wzrostu.',
                url: 'klamry-ortonyksyjne',
            },
            {
                title: 'Przełożenie lub zdjęcie klamry',
                description:
                    'Wizyta kontrolna, korekta działania klamry albo jej bezpieczne zdjęcie po zakończeniu etapu terapii.',
                url: 'klamry-ortonyksyjne',
            },
            {
                title: 'Tamponada, taping i opatrunki',
                description:
                    'Odciążenie bolesnego miejsca, zabezpieczenie wałów okołopaznokciowych oraz opatrunki specjalistyczne.',
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
                                                                {'badge' in
                                                                    item &&
                                                                item.badge
                                                                    ? item.badge
                                                                    : `Zabieg ${globalIndex < 10 ? `0${globalIndex}` : globalIndex}`}
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
