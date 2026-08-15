import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import heroImageMobile from '../../../assets/hero-bg-mobile.webp';
import heroImage from '../../../assets/hero-bg.webp';
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
const HeroSection = () => {
    const [imgReady, setImgReady] = useState(false);
    const isMobile = useIsMobile();

    return (
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background py-12 md:py-20">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-100" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: imgReady ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-0 overflow-hidden"
            >
                <picture className="absolute inset-0">
                    <source
                        media="(max-width: 767px)"
                        srcSet={heroImageMobile}
                    />
                    <img
                        src={heroImage}
                        alt=""
                        className="h-full w-full object-cover object-center"
                        onLoad={() => setImgReady(true)}
                        loading="eager"
                        fetchPriority="high"
                    />
                </picture>

                <div className="absolute inset-0 bg-black/70" />
            </motion.div>

            <motion.div
                className="relative z-10 container mx-auto px-4 text-center text-white"
                variants={isMobile ? {} : containerVariants}
                initial={isMobile ? 'visible' : 'hidden'}
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
                    className="mb-4 text-4xl font-extrabold tracking-tight md:mb-6 md:text-5xl"
                >
                    Profesjonalny{' '}
                    <span className="text-primary">Podolog Kielce</span>
                    <br />
                    <span className="text-2xl font-bold md:text-4xl">
                        pomoc w bólu i problemach stóp
                    </span>
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="mx-auto mb-7 max-w-2xl text-base leading-relaxed font-light text-white/90 md:mb-10 md:text-lg"
                >
                    Pomagamy pacjentom zmagającym się z wrastającymi
                    paznokciami, bolesnymi odciskami, modzelami i innymi
                    dolegliwościami stóp. W gabinecie{' '}
                    <span className={'text-primary'}>OAZA w Kielce</span>{' '}
                    łączymy doświadczenie, nowoczesną podologię i indywidualnie
                    dobraną terapię.
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
                        <Link href="/kontakt">Zarezerwuj wizytę</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
