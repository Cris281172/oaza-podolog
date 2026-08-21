import logo from '@/assets/logo.png';
import { Head } from '@inertiajs/react';

interface PropsI {
    title?: string;
    desc?: string;
    canonicalUrl?: string;
    image?: string;
    noindex?: boolean;
}

const SEO = ({
    title = 'Podolog Kielce – Leczenie Wrastających Paznokci | OAZA',
    desc = 'Podolog Kielce OAZA – leczenie wrastających paznokci, odcisków, brodawek i problemów stóp. Umów konsultację podologiczną w Kielcach.',
    canonicalUrl,
    image = logo,
    noindex = false,
}: PropsI) => {
    const configuredUrl = (import.meta.env.VITE_APP_URL || '').replace(
        /\/$/,
        '',
    );
    const browserOrigin =
        typeof window !== 'undefined' ? window.location.origin : '';
    const appUrl = configuredUrl || browserOrigin;
    const pathname =
        typeof window !== 'undefined' ? window.location.pathname : '/';
    const finalUrl = canonicalUrl ?? `${appUrl}${pathname}`;
    const imageUrl = image.startsWith('http') ? image : `${appUrl}${image}`;
    const robots = noindex ? 'noindex, nofollow' : 'index, follow';

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: 'Gabinet Podologiczny OAZA',
        url: appUrl,
        image: imageUrl,
        telephone: '+48 505 849 060',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Mieczysławy Ćwiklińskiej 1E',
            postalCode: '25-437',
            addressLocality: 'Kielce',
            addressCountry: 'PL',
        },
        areaServed: {
            '@type': 'City',
            name: 'Kielce',
        },
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content={robots} />
            <meta name="description" content={desc} />

            <link rel="canonical" href={finalUrl} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="pl_PL" />
            <meta property="og:site_name" content="Gabinet Podologiczny OAZA" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta
                property="og:image:alt"
                content="Gabinet Podologiczny OAZA w Kielcach"
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={imageUrl} />

            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>
        </Head>
    );
};
export default SEO;
