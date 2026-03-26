import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import PageLayout from '@/layouts/page-layout';
import { Faq } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    Clock,
    Footprints,
    GraduationCap,
    Heart,
    MapPin,
    Phone,
    Plus,
} from 'lucide-react';
import heroImage from '../assets/hero-bg.png';

const services = [
    {
        icon: Footprints,
        title: 'Usuwanie odcisków',
        description: 'Profesjonalne usuwanie odcisków i modzeli',
        link: '/services/usuwanie-odciskow',
    },
    {
        icon: Footprints,
        title: 'Leczenie wrastających paznokci',
        description: 'Skuteczne leczenie wrastających paznokci',
        link: '/services/wrastajace-paznokcie',
    },
    {
        icon: Footprints,
        title: 'Rekonstrukcja paznokci',
        description: 'Odbudowa uszkodzonych płytek paznokciowych',
        link: '/services/rekonstrukcja-paznokci',
    },
];
const diplomas = [
    { src: '/images/cert-1.webp', alt: 'Certyfikat Podologia Kliniczna' },
    { src: '/images/cert-1.webp', alt: 'Dyplom Ortonyksja' },
    { src: '/images/cert-1.webp', alt: 'Szkolenie Stopa Cukrzycowa' },
    { src: '/images/cert-1.webp', alt: 'Certyfikat Rekonstrukcja Paznokcia' },
    { src: '/images/cert-1.webp', alt: 'Dyplom Kursu Pękające Pięty' },
];
const pricingPreview = [
    { name: 'Usunięcie odcisku', price: 'od 80 zł' },
    { name: 'Opracowanie paznokci', price: 'od 70 zł' },
    { name: 'Wrastający paznokieć', price: 'od 100 zł' },
    { name: 'Rekonstrukcja paznokcia', price: 'od 120 zł' },
];

interface PropsI {
    faqs: Faq[];
}


const Home = ({ faqs }: PropsI) => {
    return (
        <PageLayout>
            <main className="flex-1">
                <section
                    className="relative flex h-[650px] items-center justify-center bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
                    }}
                >
                    <div className="container mx-auto px-4 text-center text-white">
                        <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase">
                            Profesjonalna Podologia | Kielce
                        </span>

                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Skuteczny{' '}
                            <span className="text-primary">Podolog Kielce</span>{' '}
                            <br />– Twoja ulga w bólu stóp
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-light text-white/90 md:text-lg">
                            Cierpisz na{' '}
                            <span className="font-medium text-primary">
                                wrastające paznokcie
                            </span>
                            , modzele lub bolesne odciski? W gabinecie OAZA
                            łączymy doświadczenie z nowoczesną terapią, by
                            przywrócić Ci pełną sprawność i zdrowy wygląd stóp.
                        </p>

                        <div className="flex flex-col items-center gap-4">
                            <Button asChild size="lg" className="rounded-full">
                                <a href="#contact">
                                    Zarezerwuj wizytę w Kielcach
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="bg-white py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div className="max-w-xl">
                                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                    Oferta
                                </span>
                                <h2 className="mt-4 mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                    Specjalistyczna{' '}
                                    <span className="text-primary">oferta</span>
                                </h2>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    W OAZIE skupiamy się na rozwiązaniach, które
                                    przywracają stopom zdrowie i estetyczny
                                    wygląd. Oto nasze kluczowe zabiegi:
                                </p>
                            </div>
                            <Link
                                href="/services"
                                className="hidden font-semibold text-primary underline-offset-8 hover:underline md:block"
                            >
                                Zobacz wszystkie usługi (12+)
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    href={service.link}
                                    className="group"
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
                            ))}

                            <Link href="/services" className="group">
                                <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/20 bg-primary/[0.02] p-8 text-center transition-all hover:border-primary hover:bg-primary">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-white">
                                        <Plus className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold transition-colors group-hover:text-white">
                                        Poznaj pełną <br /> ofertę zabiegów
                                    </h3>
                                    <p className="mt-2 text-sm text-muted-foreground transition-colors group-hover:text-white/80">
                                        Ponad 15 specjalistycznych usług
                                        podologicznych
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div className="mt-8 text-center md:hidden">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full rounded-2xl py-6"
                            >
                                <Link href="/services">Wszystkie usługi</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
                            <div className="group relative">
                                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 transition-all group-hover:shadow-2xl group-hover:shadow-primary/5">
                                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-32Opacity-50 h-32"
                                        >
                                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                    NASZA MISJA
                                </span>
                                <h2 className="mt-4 mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                    Nazywam się Anna Kowalska <br /> i dbam o
                                    zdrowie Twoich stóp
                                </h2>

                                <div className="space-y-6 text-base leading-relaxed font-light text-muted-foreground">
                                    <p>
                                        Jestem dyplomowanym podologiem z
                                        wieloletnim doświadczeniem w leczeniu
                                        schorzeń stóp. Ukończyłam
                                        specjalistyczne kursy z zakresu
                                        podologii klinicznej i nowoczesnych
                                        metod terapii.
                                    </p>
                                    <p>
                                        W gabinecie OAZA moim priorytetem jest
                                        kompleksowe podejście — od precyzyjnej
                                        diagnostyki, przez dobór odpowiedniej
                                        terapii, po edukację. Chcę, aby każdy
                                        pacjent czuł się tu bezpiecznie i
                                        komfortowo.
                                    </p>
                                </div>

                                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {[
                                        {
                                            icon: GraduationCap,
                                            text: 'Dyplomowany podolog',
                                        },
                                        {
                                            icon: BadgeCheck,
                                            text: 'Certyfikowane szkolenia',
                                        },
                                        {
                                            icon: Heart,
                                            text: 'Indywidualne podejście',
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5">
                                                <item.icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-700">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 w-full border-t border-slate-50">
                            <div className="w-full px-8 md:px-12">
                                <Carousel
                                    opts={{
                                        align: 'start',
                                        loop: true,
                                    }}
                                    className="w-full"
                                >
                                    <CarouselContent className="-ml-2 md:-ml-4">
                                        {diplomas.map((diploma, index) => (
                                            <CarouselItem
                                                key={index}
                                                className="basis-1/1 pl-2 sm:basis-1/3 md:basis-1/3 md:pl-4"
                                            >
                                                <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white transition-all hover:shadow-md">
                                                    <div className="overflow-hidden">
                                                        <img
                                                            src={diploma.src}
                                                            alt={diploma.alt}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    <div className="hidden md:block">
                                        <CarouselPrevious className="-left-12 border-slate-200 text-slate-400 hover:bg-primary hover:text-white" />
                                        <CarouselNext className="-right-12 border-slate-200 text-slate-400 hover:bg-primary hover:text-white" />
                                    </div>
                                </Carousel>

                                <p className="mt-6 text-center text-[10px] font-medium tracking-widest text-slate-400 uppercase md:hidden">
                                    Przesuń palcem, aby zobaczyć certyfikaty
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto mb-16 max-w-xl text-center">
                            <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                CENNIK
                            </span>
                            <h2 className="mt-4 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                Przykładowe{' '}
                                <span className={'text-primary'}>ceny</span>
                            </h2>
                            <p className="text-base font-light text-muted-foreground">
                                Transparentne ceny najpopularniejszych zabiegów.
                                Pełny cennik dostępny w gabinecie i na
                                podstronie.
                            </p>
                        </div>

                        <div className="mx-auto max-w-3xl space-y-3">
                            {pricingPreview.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:bg-slate-100 hover:shadow-sm"
                                >
                                    <span className="text-base font-medium text-slate-800">
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
                                    Zobacz wszystkie 20+ pozycji w cenniku
                                </span>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-all group-hover:bg-primary group-hover:text-white">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </Link>
                        </div>

                    </div>
                </section>
                <section className="bg-slate-50/50 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                            {/* FAQ */}
                            <div className="lg:col-span-7">
                                <div className="mb-12">
                                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                        WIECEJ WIEDZY
                                    </span>
                                    <h2 className="mt-4 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                        Często zadawane{' '}
                                        <span className={'text-primary'}>
                                            pytania
                                        </span>
                                    </h2>
                                </div>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full space-y-2"
                                >
                                    {faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index}`}
                                            className="rounded-xl border border-slate-100 bg-white px-6"
                                        >
                                            <AccordionTrigger className="cursor-pointer py-5 text-left text-base font-medium transition-colors hover:text-primary">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-6 text-base leading-relaxed font-light text-muted-foreground">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                                <div className="mt-10 rounded-2xl border border-primary/10 bg-primary/5 p-6">
                                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                        <div>
                                            <h4 className="font-bold text-slate-900">
                                                Nie znalazłeś odpowiedzi?
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Przygotowaliśmy obszerniejszą
                                                bazę wiedzy dla naszych
                                                pacjentów.
                                            </p>
                                        </div>
                                        <Button
                                            asChild
                                            variant="link"
                                            className="p-0 font-bold text-primary"
                                        >
                                            <Link
                                                href="/faq"
                                                className="flex items-center gap-2"
                                            >
                                                Zobacz pełne FAQ{' '}
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="contact"
                                className="lg:col-span-5 lg:pl-10"
                            >
                                <div className="mb-12">
                                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                        KONTAKT
                                    </span>
                                    <h2 className="mt-4 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                        Umów{' '}
                                        <span className={'text-primary'}>
                                            wizytę
                                        </span>
                                    </h2>
                                </div>

                                <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-black/[0.02]">
                                    {[
                                        {
                                            icon: MapPin,
                                            title: 'Adres',
                                            content:
                                                'ul. Mieczysławy Ćwiklińskiej 1E\n25-437 Kielce',
                                            link: null,
                                        },
                                        {
                                            icon: Phone,
                                            title: 'Telefon',
                                            content: '505 849 060',
                                            link: 'tel:505849060',
                                        },
                                        {
                                            icon: Clock,
                                            title: 'Godziny',
                                            content:
                                                'Pon - Pt: 9:00 - 18:00\nSob - Nd: Zamknięte',
                                            link: null,
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 text-primary">
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 text-xs font-bold tracking-wider text-slate-900 uppercase">
                                                    {item.title}
                                                </h3>
                                                {item.link ? (
                                                    <a
                                                        href={item.link}
                                                        className="text-lg font-medium text-slate-700 transition-colors hover:text-primary"
                                                    >
                                                        {item.content}
                                                    </a>
                                                ) : (
                                                    <p className="text-base font-light whitespace-pre-line text-slate-600">
                                                        {item.content}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        asChild
                                        size="lg"
                                        className="mt-6 w-full rounded-xl"
                                    >
                                        <a href="tel:505849060">
                                            Zadzwoń i zarezerwuj termin
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 h-96 overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-inner">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.362!2d20.6282!3d50.8661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUxJzU4LjAiTiAyMMKwMzcnNDEuNSJF!5e0!3m2!1spl!2spl!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{
                                    border: 0,
                                    filter: 'grayscale(0.2) contrast(1.1)',
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
                <section className="bg-primary py-20 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
                            Nie lekceważ problemów ze stopami. <br /> Zaufaj
                            ekspertom.
                        </h2>
                        <p className="mx-auto mb-10 max-w-xl text-lg font-light opacity-90">
                            Pierwsza konsultacja pozwoli nam zdiagnozować
                            problem i dobrać skuteczną metodę leczenia.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="rounded-full text-base text-primary shadow-2xl transition-colors hover:bg-white"
                        >
                            <Link href="/contact">
                                <span>Umów wizytę online</span>
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
            <footer className="mt-20 border-t border-border bg-secondary">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-primary">
                                OAZA GABINET PODOLOGICZNY
                            </h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Profesjonalna opieka podologiczna w Kielcach.
                                Dbamy o zdrowie Twoich stóp.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-semibold">
                                Kontakt
                            </h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>
                                        ul. Mieczysławy Ćwiklińskiej 1E
                                        <br />
                                        25-437 Kielce
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4" />
                                    <a
                                        href="tel:505849060"
                                        className="transition-colors hover:text-primary"
                                    >
                                        505 849 060
                                    </a>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4" />
                                    <span>Pon-Pt: 9:00 - 18:00</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-semibold">Menu</h4>
                            <nav className="space-y-2 text-sm">
                                <Link
                                    href="/services"
                                    className="block text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Usługi
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="block text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Cennik
                                </Link>
                                <Link
                                    href="/gallery"
                                    className="block text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Galeria
                                </Link>
                                <Link
                                    href="/blog"
                                    className="block text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Blog
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                        <p>
                            &copy; {new Date().getFullYear()} Gabinet
                            Podologiczny OAZA. Wszelkie prawa zastrzeżone.
                        </p>
                    </div>
                </div>
            </footer>
        </PageLayout>
    );
};

export default Home;
