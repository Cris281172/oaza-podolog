import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import PageLayout from '@/layouts/page-layout';
import { priceList, service as serviceRoute } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowRight, Phone } from 'lucide-react';

interface ServiceI {
    slug: string;
    seo: { title: string; description: string };
    hero: {
        title: string;
        titleSecond?: string;
        text: string;
    };
    symptoms?: string[];
    treatment?: { title: string; paragraphs: string[] };
    steps?: { title: string; desc: string }[];
}

const nameOf = (item: ServiceI) =>
    [item.hero.title, item.hero.titleSecond].filter(Boolean).join(' ');

export default function SingleServicePage({
    service,
    crossSell,
}: {
    service: ServiceI;
    crossSell: ServiceI[];
}) {
    const name = nameOf(service);
    const descriptionParagraphs = [
        service.hero.text,
        ...(service.treatment?.paragraphs ?? []),
        service.symptoms?.length
            ? `Warto rozważyć wizytę szczególnie w przypadku takich problemów jak: ${service.symptoms.join(', ')}. Dokładny zakres postępowania jest dobierany po obejrzeniu stóp i rozmowie o występujących dolegliwościach.`
            : null,
        service.steps?.length
            ? `Wizyta ma uporządkowany przebieg. ${service.steps
                  .map((step) => `${step.title}: ${step.desc}`)
                  .join(
                      ' ',
                  )} Poszczególne etapy mogą zostać dostosowane do stanu skóry, paznokci oraz indywidualnych potrzeb pacjenta.`
            : null,
        'Każdy przypadek oceniany jest indywidualnie. Po wykonaniu usługi pacjent otrzymuje zrozumiałe zalecenia dotyczące pielęgnacji domowej, profilaktyki oraz ewentualnych kolejnych wizyt.',
    ].filter((paragraph): paragraph is string => Boolean(paragraph));

    return (
        <PageLayout>
            <SEO
                title={service.seo.title}
                desc={service.seo.description}
                canonicalUrl={`https://gabinetpodologicznaoaza.pl/uslugi/${service.slug}`}
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Strona główna',
                            item: 'https://gabinetpodologicznaoaza.pl',
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Usługi',
                            item: 'https://gabinetpodologicznaoaza.pl/uslugi',
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name,
                            item: `https://gabinetpodologicznaoaza.pl/uslugi/${service.slug}`,
                        },
                    ],
                }}
            />
            <main className="flex-1 bg-background">
                <HeaderPage
                    overline="Podologiczna Oaza Kielce"
                    title={service.hero.title}
                    titleSecondary={service.hero.titleSecond}
                    text={service.hero.text}
                    breadcrumbs={[
                        { title: 'Strona główna', href: '/' },
                        { title: 'Usługi', href: '/uslugi' },
                        { title: name, href: '' },
                    ]}
                >
                    <Button asChild size="lg" className="rounded-full px-7">
                        <a href="tel:505849060">
                            <Phone className="mr-2 h-4 w-4" />
                            Zadzwoń: 505 849 060
                        </a>
                    </Button>
                </HeaderPage>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto max-w-6xl px-4">
                        <article className="max-w-4xl">
                            <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                Szczegółowy opis
                            </span>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                {service.treatment?.title ?? name}
                            </h2>
                            <div className="mt-8 space-y-6">
                                {descriptionParagraphs.map(
                                    (paragraph, index) => (
                                        <p
                                            key={`${index}-${paragraph}`}
                                            className="text-lg leading-8 text-slate-600"
                                        >
                                            {paragraph}
                                        </p>
                                    ),
                                )}
                            </div>
                            <Link
                                href={priceList.url()}
                                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/75"
                            >
                                Sprawdź aktualny cennik
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </article>
                    </div>
                </section>

                {!!crossSell?.length && (
                    <section className="border-t border-slate-100 bg-background py-16 md:py-20">
                        <div className="container mx-auto max-w-6xl px-4">
                            <SectionTitle
                                eyebrow="Powiązane zabiegi"
                                title="Podobne usługi, które mogą Cię zainteresować"
                                text="Dobieramy je na podstawie rodzaju problemu, obszaru terapii i celu zabiegu."
                            />
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {crossSell.map((item, index) => (
                                    <Link
                                        key={item.slug}
                                        href={serviceRoute.url(item.slug)}
                                        className="group flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
                                    >
                                        <div>
                                            <span className="text-xs font-bold tracking-widest text-primary/40 uppercase">
                                                Zabieg 0{index + 1}
                                            </span>
                                            <h3 className="mt-4 text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-primary">
                                                {nameOf(item)}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">
                                                {item.hero.text}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center text-xs font-black tracking-tighter text-primary uppercase opacity-100 transition-all group-hover:opacity-100 md:opacity-0">
                                            Dowiedz się więcej →
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                <CTASection
                    title="Potrzebujesz pomocy podologa?"
                    subtitle="Umów wizytę w Podologicznej Oazie."
                    description="Skontaktuj się z nami — ocenimy problem i dobierzemy odpowiednie postępowanie."
                />
            </main>
        </PageLayout>
    );
}

function SectionTitle({
    eyebrow,
    title,
    text,
}: {
    eyebrow: string;
    title: string;
    text?: string;
}) {
    return (
        <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
                {eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                {title}
            </h2>
            {text && (
                <p className="mt-4 leading-7 text-muted-foreground">{text}</p>
            )}
        </div>
    );
}
