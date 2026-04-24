import { Head } from '@inertiajs/react';

interface PropsI {
    title?: string;
    desc?: string;
    canonicalUrl?: string;
}

const SEO = ({
    title = 'Podolog Kielce – Leczenie Wrastających Paznokci | OAZA',
    desc = 'Podolog Kielce OAZA – leczenie wrastających paznokci, odcisków, brodawek i problemów stóp. Umów konsultację podologiczną w Kielcach.',
    canonicalUrl,
}: PropsI) => {
    const appURL = import.meta.env.VITE_APP_URL || '';
    const finalUrl = canonicalUrl ?? appURL;

    return (
        <Head>
            <title>{title}</title>

            <meta name="robots" content="noindex" />
            {/*<meta name="robots" content="index, follow" />*/}
            <meta name="description" content={desc} />

            <link rel="canonical" href={finalUrl} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:image" content={`${appURL}/og-image.jpg`} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
        </Head>
    );
};
export default SEO;
