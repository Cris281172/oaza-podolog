import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const isMobile = useIsMobile();

    return (
        <PageLayout>
            <main className="bg-white">
                <HeaderPage
                    overline="Kontakt"
                    title="Umów "
                    titleSecondary="wizytę"
                    text="Zadzwoń i dobierz odpowiedni termin oraz zabieg dopasowany do Twojego problemu."
                />

                <section className="overflow-hidden py-12 md:py-24">
                    <div className="container mx-auto px-4">
                        {/* CONTACT CARD */}
                        <motion.div
                            initial={isMobile ? false : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-xl"
                        >
                            <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-black/[0.03]">
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
                                        className="group flex items-start gap-4"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-white">
                                            <item.icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-xs font-bold tracking-wider text-slate-900 uppercase">
                                                {item.title}
                                            </h3>

                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    className="text-lg font-medium text-slate-700 transition hover:text-primary"
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
                                    className="mt-6 w-full rounded-xl shadow-lg shadow-primary/20"
                                >
                                    <a href="tel:505849060">
                                        Zadzwoń i zarezerwuj termin
                                    </a>
                                </Button>
                            </div>
                        </motion.div>

                        {/* MAP */}
                        <motion.div
                            initial={
                                isMobile ? false : { opacity: 0, scale: 0.95 }
                            }
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mx-auto mt-16 h-96 max-w-5xl overflow-hidden rounded-3xl border border-slate-100 shadow-inner"
                        >
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
                            ></iframe>
                        </motion.div>
                    </div>
                </section>

                <CTASection />
            </main>
        </PageLayout>
    );
};

export default Contact;
