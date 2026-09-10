import AboutMeSection from '@/components/sections/home/AboutMeSection';
import ContactFaqSection from '@/components/sections/home/ContactFaqSection';
import CTASection from '@/components/sections/home/CTASection';
import HeroSection from '@/components/sections/home/HeroSection';
import PricingSection from '@/components/sections/home/PricingSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import SEO from '@/components/seo';
import PageLayout from '@/layouts/page-layout';
import { Certificate, Faq, PricingItem } from '@/types';

interface PropsI {
    faqs: Faq[];
    homePricingItems: PricingItem[];
    certificates: Certificate[];
}

const Home = ({ faqs, homePricingItems, certificates }: PropsI) => {
    return (
        <PageLayout>
            <SEO
                title={'Podolog Kielce'}
                desc={
                    'Gabinet Podologiczna Oaza w Kielcach. Profesjonalna pomoc przy wrastających paznokciach, odciskach, brodawkach, modzelach i innych problemach stóp.'
                }
            />
            <main className="flex-1">
                <HeroSection />
                <ServicesSection />
                <AboutMeSection certificates={certificates} />
                <PricingSection items={homePricingItems} />
                <ContactFaqSection faqs={faqs} />
                <CTASection />
            </main>
        </PageLayout>
    );
};

export default Home;
