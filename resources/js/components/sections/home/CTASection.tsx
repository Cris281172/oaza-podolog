import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const CTASection = () => {
    const isMobile = useIsMobile();
    return (
        <section className="overflow-hidden bg-primary py-20 text-white">
            <motion.div
                className="container mx-auto px-4 text-center"
                initial={isMobile ? false : { opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
                    Masz problem ze stopami lub paznokciami?
                    <br />
                    <span className="text-white/90">
                        Umów wizytę u podologa w Kielcach.
                    </span>
                </h2>

                <p className="mx-auto mb-10 max-w-xl text-lg font-light opacity-90">
                    Dobierzemy odpowiedni zabieg i pomożemy skutecznie rozwiązać
                    problem.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="w-full sm:w-auto">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="w-full rounded-full text-base text-primary shadow-2xl transition-colors hover:bg-white sm:w-auto"
                        >
                            <a
                                href="https://booksy.com/pl-pl/254137_gabinet-podologiczna-oaza-podolog-kielce_podologia_7937_kielce"
                                target={'_blank'}
                                className="flex items-center gap-2"
                            >
                                <span>Zarezerwuj wizytę</span>
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>

                    <div className="w-full sm:w-auto">
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="w-full rounded-full border-white/40 bg-white/10 text-base text-white transition-colors sm:w-auto"
                        >
                            <a
                                href="tel:505849060"
                                className="flex items-center gap-2"
                            >
                                <Phone className="h-4 w-4" />
                                <span>505 849 060</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CTASection;
