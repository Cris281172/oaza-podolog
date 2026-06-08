import CTASection from '@/components/cta-section';
import HeaderPage from '@/components/header-page';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import PageLayout from '@/layouts/page-layout';
import { Faq as FaqTypes } from '@/types';

interface PropsI {
    faqs: FaqTypes[];
}

const Faq = ({ faqs }: PropsI) => {
    return (
        <PageLayout>
            <main className="bg-white">
                <HeaderPage
                    overline="Oaza Kielce"
                    title="Najczęściej"
                    titleSecondary="zadawane pytania"
                    text="Znajdź odpowiedzi na najczęstsze pytania dotyczące wizyt, terapii, zapisów oraz przebiegu leczenia w Oaza Kielce."
                />
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
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
                    </div>
                </section>
                <CTASection
                    title="Nie znalazłeś odpowiedzi?"
                    subtitle="Skontaktuj się z nami."
                    description="Chętnie odpowiemy na Twoje pytania i pomożemy dobrać odpowiedni zabieg podologiczny."
                />
            </main>
        </PageLayout>
    );
};

export default Faq;
