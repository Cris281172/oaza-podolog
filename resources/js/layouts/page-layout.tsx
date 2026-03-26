import Header from '@/components/header';
import type { PropsWithChildren } from 'react';

const PageLayout = ({children}: PropsWithChildren) => {
    return(
        <>
            <Header />
            {children}
        </>
    )
}

export default PageLayout;
