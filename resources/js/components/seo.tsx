import { Head } from '@inertiajs/react';

interface PropsI {
    title?: string;
    desc?: string;
    canonicalUrl?: string;
    image?: string;
}

const SEO = ({
    title = 'Podolog Kielce – Leczenie Wrastających Paznokci | OAZA',
    desc = 'Podolog Kielce OAZA – leczenie wrastających paznokci, odcisków, brodawek i problemów stóp. Umów konsultację podologiczną w Kielcach.',
    canonicalUrl,
    image = '/og-image.jpg',
}: PropsI) => {
    const appURL = import.meta.env.VITE_APP_URL || '';
    const finalUrl = canonicalUrl ?? `${appURL}${window.location.pathname}`;
    return (
        <Head>
            <title>{title}</title>

            <meta name="robots" content="index, follow" />
            <meta name="description" content={desc} />

            <link rel="canonical" href={finalUrl} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:image" content={`${appURL}${image}`} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
        </Head>
    );
};
export default SEO;
