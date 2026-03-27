import Footer from '@/components/footer';
import Header from '@/components/header';
import { MotionConfig } from 'framer-motion';
import type { PropsWithChildren } from 'react';

const PageLayout = ({ children }: PropsWithChildren) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    console.log(isMobile);
    return (
        <MotionConfig transition={{ duration: isMobile ? 0 : 0.4 }}>
            <Header />
            {children}
            <Footer />
        </MotionConfig>
    );
};

export default PageLayout;
