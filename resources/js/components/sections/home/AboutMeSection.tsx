import { ImageZoom } from '@/components/animate-ui/primitives/effects/image-zoom';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Certificate } from '@/types';
import { motion, Variants } from 'framer-motion';
import { Maximize, X } from 'lucide-react';
import { useState } from 'react';
import selfImage from '../../../assets/self-image.webp';
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const textVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4 },
    },
};

const AboutMeSection = ({ certificates }: { certificates: Certificate[] }) => {
    const isMobile = useIsMobile();
    const [activeDiploma, setActiveDiploma] = useState<undefined | number>(
        undefined,
    );
    return (
        <section className="overflow-hidden bg-muted/50 py-12 md:py-24">
            <motion.div
                className="container mx-auto px-4"
                initial={isMobile ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={isMobile ? {} : containerVariants}
            >
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
                    <motion.div
                        variants={imageVariants}
                        className="group relative"
                    >
                        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 transition-all group-hover:shadow-2xl group-hover:shadow-primary/5">
                            <div className="flex h-full w-full items-center justify-center text-slate-300">
                                <img src={selfImage} alt="Agnieszka Schabek" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={textVariants}>
                        <span className="text-xs font-bold tracking-widest text-primary uppercase">
                            GABINET PODOLOGICZNA OAZA
                        </span>
                        <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            <span className={'text-primary'}>
                                Agnieszka Schabek
                            </span>{' '}
                            – Podolog w Kielcach
                        </h2>

                        <div className="space-y-6 text-base leading-relaxed font-light text-muted-foreground">
                            <p>
                                Agnieszka Schabek to doświadczona specjalistka
                                łącząca wiedzę i doświadczenie z zakresu
                                podologii oraz praktykę kliniczną zdobytą w
                                pracy jako położna. Tak interdyscyplinarne
                                przygotowanie pozwala jej spojrzeć na problemy
                                stóp i paznokci w sposób kompleksowy, z
                                uwzględnieniem ogólnego stanu zdrowia pacjenta,
                                procesów gojenia oraz szczególnych potrzeb osób
                                w trakcie leczenia. Dzięki doświadczeniu w
                                środowisku szpitalnym również w Gabinecie
                                Podologiczna Oaza stosuje najwyższe standardy
                                higieny i bezpieczeństwa. Przyjmuje osoby z
                                problemami w obrębie stóp i paznokci np. z
                                brodawkami, grzybicą czy wrastającymi
                                paznokciami.
                            </p>
                        </div>

                        {/*<motion.div variants={itemVariants} className="mt-10">*/}
                        {/*    <Button asChild className="rounded-xl">*/}
                        {/*        <Link*/}
                        {/*            href="/o-mnie"*/}
                        {/*            className="flex items-center gap-2"*/}
                        {/*        >*/}
                        {/*            Poznaj moją pełną ścieżkę zawodową*/}
                        {/*            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />*/}
                        {/*        </Link>*/}
                        {/*    </Button>*/}
                        {/*</motion.div>*/}
                    </motion.div>
                </div>

                {certificates.length > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 w-full border-slate-50"
                    >
                        <div className="w-full px-4 md:px-12">
                            <Carousel
                                opts={{ align: 'start', loop: true }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2 md:-ml-4">
                                    {certificates.map((certificate, index) => (
                                        <CarouselItem
                                            key={certificate.id}
                                            className="relative basis-full pl-2 sm:basis-1/3 md:basis-1/3 md:pl-4"
                                        >
                                            <Button
                                                onClick={() =>
                                                    setActiveDiploma(index + 1)
                                                }
                                                variant={'secondary'}
                                                className={
                                                    'absolute top-1 right-1 z-2 h-8 w-8 cursor-pointer'
                                                }
                                            >
                                                <Maximize />
                                            </Button>
                                            <motion.div
                                                whileHover={{ y: -5 }}
                                                className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md"
                                            >
                                                <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-slate-100">
                                                    <img
                                                        src={
                                                            certificate.thumbnail_path
                                                        }
                                                        alt={certificate.title}
                                                        className="h-full max-h-full w-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            </motion.div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                <div className="hidden md:block">
                                    <CarouselPrevious className="-left-12 border-slate-200 text-slate-400 hover:bg-primary hover:text-white" />
                                    <CarouselNext className="-right-12 border-slate-200 text-slate-400 hover:bg-primary hover:text-white" />
                                </div>
                            </Carousel>

                            <p className="mt-6 text-center text-[10px] font-medium tracking-widest text-slate-400 uppercase md:hidden">
                                Przesuń palcem, aby zobaczyć certyfikaty
                            </p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
            {activeDiploma && certificates[activeDiploma - 1] && (
                <Dialog
                    open={!!activeDiploma}
                    onOpenChange={() => setActiveDiploma(undefined)}
                >
                    <DialogContent
                        showCloseButton={false}
                        className="flex max-h-[100vh] max-w-[100vw] items-center justify-center border-0 bg-transparent p-0"
                    >
                        <div className="relative">
                            <Button
                                onClick={() => setActiveDiploma(undefined)}
                                size="icon"
                                className="absolute top-4 right-4 z-10"
                            >
                                <X />
                            </Button>

                            <ImageZoom zoomOnHover={false}>
                                <img
                                    src={
                                        certificates[activeDiploma - 1]
                                            .image_path
                                    }
                                    alt={certificates[activeDiploma - 1].title}
                                    className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
                                />
                            </ImageZoom>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </section>
    );
};

export default AboutMeSection;
