import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="overflow-hidden bg-primary py-20 text-white">
            <motion.div
                className="container mx-auto px-4 text-center"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
                    Nie lekceważ problemów ze stopami. <br />
                    <span className="text-white/90">Zaufaj ekspertom.</span>
                </h2>

                <p className="mx-auto mb-10 max-w-xl text-lg font-light opacity-90">
                    Pierwsza konsultacja pozwoli nam zdiagnozować problem i
                    dobrać skuteczną metodę leczenia.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="w-full sm:w-auto">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="w-full rounded-full text-base text-primary shadow-2xl transition-colors hover:bg-white sm:w-auto"
                        >
                            <Link
                                href="/contact"
                                className="flex items-center gap-2"
                            >
                                <span>Umów wizytę online</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
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
                                <span>Zadzwoń teraz</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CTASection;
