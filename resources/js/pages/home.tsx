import AboutMeSection from '@/components/sections/home/AboutMeSection';
import ContactFaqSection from '@/components/sections/home/ContactFaqSection';
import CTASection from '@/components/sections/home/CTASection';
import HeroSection from '@/components/sections/home/HeroSection';
import PricingSection from '@/components/sections/home/PricingSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import PageLayout from '@/layouts/page-layout';
import { Faq } from '@/types';

interface PropsI {
    faqs: Faq[];
}

const Home = ({ faqs }: PropsI) => {
    return (
        <PageLayout>
            <main className="flex-1">
                <HeroSection />
                <ServicesSection />
                <AboutMeSection />
                <PricingSection />
                <ContactFaqSection faqs={faqs} />
                <CTASection />
            </main>
        </PageLayout>
    );
};

export default Home;
