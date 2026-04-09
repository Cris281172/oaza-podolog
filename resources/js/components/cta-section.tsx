import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

interface CTAProps {
    title?: string;
    subtitle?: string;
    description?: string;
}

const CTASection = ({
    title = 'Nie lekceważ problemów ze stopami.',
    subtitle = 'Zaufaj ekspertom.',
    description = 'Pierwsza konsultacja pozwoli nam zdiagnozować problem i dobrać skuteczną metodę leczenia. Zadbasz o swój komfort i zdrowie.',
}: CTAProps) => {
    const isMobile = useIsMobile();
    return (
        <section className="relative overflow-hidden bg-primary py-20 text-white">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/5 blur-3xl" />

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={isMobile ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
                        {title} <br />
                        <span className="text-white/80">{subtitle}</span>
                    </h2>

                    <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed font-light opacity-90">
                        {description}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="w-full rounded-full text-base font-bold text-primary shadow-xl transition-all hover:bg-white active:scale-95 sm:w-auto"
                        >
                            <Link
                                href="/kontakt"
                                className="flex items-center gap-2"
                            >
                                <span>Umów wizytę online</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="w-full rounded-full border-white/30 bg-white/10 text-base font-bold text-white transition-all hover:bg-white/20 sm:w-auto"
                        >
                            <a
                                href="tel:505849060"
                                className="flex items-center gap-2"
                            >
                                <Phone className="h-4 w-4" />
                                <span>Zadzwoń teraz</span>
                            </a>
                        </Button>
                    </div>

                    <p className="mt-10 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">
                        Oaza Kielce • Gabinet Podologiczny
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
