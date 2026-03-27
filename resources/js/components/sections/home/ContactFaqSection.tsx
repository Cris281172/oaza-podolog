import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Faq } from '@/types';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';

interface PropsI {
    faqs: Faq[];
}

const faqVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const contactVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
    },
};

const ContactFaqSection = ({ faqs }: PropsI) => {
    return (
        <section className="overflow-hidden bg-slate-50/50 py-12 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    <motion.div
                        className="lg:col-span-7"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={faqVariants}
                    >
                        <div className="mb-8 md:mb-12">
                            <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                WIĘCEJ WIEDZY
                            </span>
                            <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                Często zadawane{' '}
                                <span className={'text-primary'}>pytania</span>
                            </h2>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-3"
                        >
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="rounded-xl border border-slate-100 bg-white px-6 transition-all hover:border-primary/20 hover:shadow-sm"
                                >
                                    <AccordionTrigger className="cursor-pointer py-5 text-left text-base font-medium transition-colors hover:text-primary hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-base leading-relaxed font-light text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-10 rounded-2xl border border-primary/10 bg-primary/5 p-6"
                        >
                            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <div>
                                    <h4 className="font-bold text-slate-900">
                                        Nie znalazłeś odpowiedzi?
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Przygotowaliśmy obszerniejszą bazę
                                        wiedzy.
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    variant="link"
                                    className="p-0 font-bold text-primary transition-transform hover:translate-x-1"
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
                        </motion.div>
                    </motion.div>

                    <motion.div
                        id="contact"
                        className="lg:col-span-5 lg:pl-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={contactVariants}
                    >
                        <div className="mb-8 md:mb-12">
                            <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                KONTAKT
                            </span>
                            <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                Umów{' '}
                                <span className={'text-primary'}>wizytę</span>
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
                                    className="group flex items-start gap-4"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
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
                                className="mt-6 w-full rounded-xl shadow-lg shadow-primary/20 transition-transform active:scale-95"
                            >
                                <a href="tel:505849060">
                                    Zadzwoń i zarezerwuj termin
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 h-96 overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-inner"
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
    );
};

export default ContactFaqSection;
