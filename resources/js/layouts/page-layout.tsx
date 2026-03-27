import Footer from '@/components/footer';
import Header from '@/components/header';
import type { PropsWithChildren } from 'react';

const PageLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default PageLayout;
