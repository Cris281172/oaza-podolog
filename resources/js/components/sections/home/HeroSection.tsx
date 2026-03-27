import heroImage from '@/assets/hero-bg.webp';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

const HeroSection = () => {
    const [imgReady, setImgReady] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-950 py-12 md:py-20">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-100" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: imgReady ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
                    transform: 'translateZ(0)',
                }}
            >
                <img
                    src={heroImage}
                    className="hidden"
                    onLoad={() => setImgReady(true)}
                    loading="eager"
                />
            </motion.div>

            <motion.div
                className="relative z-10 container mx-auto px-4 text-center text-white"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ transform: 'translateZ(0)' }}
            >
                <motion.span
                    variants={itemVariants}
                    className="mb-4 inline-block text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase"
                >
                    Profesjonalna Podologia | Kielce
                </motion.span>

                <motion.h1
                    variants={itemVariants}
                    className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl"
                >
                    Skuteczny{' '}
                    <span className="text-primary">Podolog Kielce</span> <br />–
                    Twoja ulga w bólu stóp
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-light text-white/90 md:text-lg"
                >
                    Cierpisz na{' '}
                    <span className="font-medium text-primary">
                        wrastające paznokcie
                    </span>
                    , modzele lub bolesne odciski? W gabinecie OAZA łączymy
                    doświadczenie z nowoczesną terapią, by przywrócić Ci pełną
                    sprawność i zdrowy wygląd stóp.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center gap-4"
                >
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full px-10 shadow-2xl shadow-primary/20"
                    >
                        <a href="#contact">Zarezerwuj wizytę</a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
