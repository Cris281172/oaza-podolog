import { Breadcrumbs } from '@/components/breadcrumbs';
import CTASection from '@/components/cta-section';
import { Button } from '@/components/ui/button';
import PageLayout from '@/layouts/page-layout';
import { service as serviceRoute } from '@/routes';
import { Link } from '@inertiajs/react';
import { Check } from 'lucide-react';

interface StepI {
    title: string;
    desc: string;
}

interface ServiceI {
    slug: string;
    hero: {
        title: string;
        titleSecond?: string;
        text: string;
        image?: string;
    };
    symptoms?: string[];
    treatment?: {
        title: string;
        paragraphs: string[];
    };
    steps?: StepI[];
}
interface PropsI {
    service: ServiceI;
    crossSell: ServiceI[];
}

const SingleServicePage = ({ service, crossSell }: PropsI) => {
    console.log(crossSell);
    return (
        <PageLayout>
            <main className="flex-1 bg-background">
                {/* HERO */}
                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-4">
                        <div
                            className={`${service.hero.image ? 'lg:grid-cols-2' : ''} grid items-center gap-12`}
                        >
                            <div>
                                <div className="mb-8">
                                    <Breadcrumbs
                                        breadcrumbs={[
                                            {
                                                title: 'Strona główna',
                                                href: '/',
                                            },
                                            {
                                                title: 'Usługi',
                                                href: '/uslugi',
                                            },
                                            {
                                                title: `${service.hero.title} ${
                                                    service.hero.titleSecond
                                                        ? service.hero
                                                              .titleSecond
                                                        : ''
                                                }`,
                                                href: ``,
                                            },
                                        ]}
                                    />
                                </div>
                                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                    Zabieg podologiczny
                                </span>

                                <h1 className="md: mt-2 mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                    {service.hero.title}{' '}
                                    <span className="text-primary">
                                        {service.hero.titleSecond}
                                    </span>
                                </h1>

                                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                    {service.hero.text}
                                </p>
                                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                    <Button asChild size="lg">
                                        <a href="tel:505849060">
                                            Zadzwoń teraz
                                        </a>
                                    </Button>
                                </div>
                            </div>
                            {service.hero.image && (
                                <div>
                                    <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border bg-slate-100 text-muted-foreground">
                                        Zdjęcie zabiegu / gabinetu
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {service.symptoms && service.symptoms.length !== 0 && (
                    <section className="bg-muted py-16">
                        <div className="container mx-auto max-w-5xl px-4">
                            <h2 className="mb-10 text-3xl font-bold">
                                Kiedy warto zgłosić się na zabieg?
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                {service.symptoms.map((item) => (
                                    <div className="flex gap-3 rounded-2xl border bg-background p-6">
                                        <Check className="mt-1 text-primary" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {service.treatment && (
                    <section className="py-20">
                        <div className="container mx-auto px-4">
                            <div className="grid items-center gap-12 lg:grid-cols-2">
                                <div>
                                    <h2 className="mb-6 text-3xl font-bold">
                                        {service.treatment.title}
                                    </h2>

                                    {service.treatment.paragraphs.map(
                                        (item, index) => (
                                            <p
                                                key={index}
                                                className="mb-5 text-lg leading-relaxed text-muted-foreground"
                                            >
                                                {item}
                                            </p>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* STEPS */}
                {service.steps && service.steps.length !== 0 && (
                    <section className="bg-muted py-20">
                        <div className="container mx-auto max-w-5xl px-4">
                            <h2 className="mb-10 text-3xl font-bold">
                                Jak wygląda terapia?
                            </h2>

                            <div className="grid gap-6 md:grid-cols-3">
                                {service.steps.map((step, i) => (
                                    <div className="rounded-3xl border bg-background p-8">
                                        <span className="font-bold text-primary">
                                            0{i + 1}
                                        </span>

                                        <h3 className="mt-4 text-xl font-bold">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            {step.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {crossSell && crossSell.length !== 0 && (
                    <section className="bg-background py-20">
                        <div className="container mx-auto px-4">
                            <div className="mb-10 text-center">
                                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                    Inne zabiegi
                                </span>
                                <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                                    Sprawdź również{' '}
                                    <span className="text-primary">
                                        podobne terapie
                                    </span>
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    Często pacjenci z podobnym problemem
                                    wybierają także te zabiegi
                                </p>
                            </div>

                            <div
                                className={
                                    'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                                }
                            >
                                {crossSell.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={serviceRoute.url(item.slug)}
                                        className="group flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
                                    >
                                        <div>
                                            <span className="text-xs font-bold tracking-widest text-primary/40 uppercase">
                                                Zabieg 0{index + 1}
                                            </span>
                                            <h3 className="mt-4 text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-primary">
                                                {item.hero.title}
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
                    title="Zadbaj o zdrowie swoich stóp."
                    subtitle="Umów profesjonalną terapię."
                    description="Każdy zabieg poprzedzamy dokładną oceną problemu i indywidualnym planem działania."
                />
            </main>
        </PageLayout>
    );
};

export default SingleServicePage;
