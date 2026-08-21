import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import Seo from '@/components/seo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const isMobile = useIsMobile();

    return (
        <PageLayout>
            <Seo
                title={'Kontakt – Podolog Kielce'}
                desc={
                    'Skontaktuj się z gabinetem podologicznym w Kielcach i umów wizytę. Sprawdź dane kontaktowe, lokalizację gabinetu oraz dostępne formy kontaktu.'
                }
            />
            <main className="bg-background">
                <HeaderPage
                    overline="Kontakt"
                    title="Umów "
                    titleSecondary="wizytę"
                    text="Zadzwoń i dobierz odpowiedni termin oraz zabieg dopasowany do Twojego problemu."
                />

                <section className="overflow-hidden py-12 md:py-24">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={isMobile ? false : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-5xl"
                        >
                            <div className="grid gap-4 md:grid-cols-3">
                                {[
                                    {
                                        icon: MapPin,
                                        title: 'Adres',
                                        content:
                                            'ul. Mieczysławy Ćwiklińskiej 1E\n25-437 Kielce',
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
                                            'Pon-Czw: 16:00 - 20:00\nPt: 14:00 - 20:00\nSob: 9:00 - 13:00',
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
                                    >
                                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-white">
                                            <item.icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="mb-2 text-xs font-bold tracking-wider text-primary uppercase">
                                                {item.title}
                                            </h3>

                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    className="text-lg font-semibold text-slate-800 transition hover:text-primary"
                                                >
                                                    {item.content}
                                                </a>
                                            ) : (
                                                <p className="text-base leading-relaxed font-light whitespace-pre-line text-muted-foreground">
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full rounded-full px-8 shadow-lg shadow-primary/20 sm:w-auto"
                                >
                                    <a href="tel:505849060">
                                        Zadzwoń i zarezerwuj termin
                                    </a>
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={
                                isMobile ? false : { opacity: 0, scale: 0.95 }
                            }
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mx-auto mt-12 h-80 max-w-5xl overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-xl shadow-primary/5 md:h-[28rem]"
                        >
                            <iframe
                                title="Lokalizacja gabinetu podologicznego OAZA w Kielcach"
                                src="https://www.google.com/maps?q=Gabinet%20Podologiczny%20OAZA%2C%20Mieczys%C5%82awy%20%C4%86wikli%C5%84skiej%201E%2C%2025-437%20Kielce&output=embed"
                                width="100%"
                                height="100%"
                                style={{
                                    border: 0,
                                    filter: 'grayscale(0.2) contrast(1.1)',
                                }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </motion.div>
                    </div>
                </section>
                <CTASection
                    title="Gotowy na wizytę?"
                    subtitle="Skontaktuj się z nami."
                    description="Zadzwoń i wybierz dogodny termin konsultacji lub zabiegu."
                />
            </main>
        </PageLayout>
    );
};

export default Contact;
