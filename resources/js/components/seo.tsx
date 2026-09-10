import { Head } from '@inertiajs/react';

interface PropsI {
    title?: string;
    desc?: string;
    canonicalUrl?: string;
    image?: string;
    noindex?: boolean;
    structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
    title = 'Podolog Kielce – Leczenie Wrastających Paznokci | Podologiczna Oaza',
    desc = 'Podologiczna Oaza w Kielcach – pomoc przy wrastających paznokciach, odciskach, brodawkach i problemach stóp. Umów konsultację podologiczną.',
    canonicalUrl,
    image = '/og-image.jpg',
    noindex = false,
    structuredData = [],
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
        name: 'Gabinet Podologiczna Oaza',
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
    const schemas = [
        localBusinessSchema,
        ...(Array.isArray(structuredData) ? structuredData : [structuredData]),
    ];

    return (
        <Head>
            <title>{title}</title>
            <meta head-key="robots" name="robots" content={robots} />
            <meta head-key="description" name="description" content={desc} />

            <link head-key="canonical" rel="canonical" href={finalUrl} />

            <meta head-key="og:title" property="og:title" content={title} />
            <meta
                head-key="og:description"
                property="og:description"
                content={desc}
            />
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:locale" property="og:locale" content="pl_PL" />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content="Gabinet Podologiczna Oaza"
            />
            <meta head-key="og:url" property="og:url" content={finalUrl} />
            <meta head-key="og:image" property="og:image" content={imageUrl} />
            <meta
                property="og:image:alt"
                content="Gabinet Podologiczna Oaza w Kielcach"
            />

            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={title}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={desc}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={imageUrl}
            />

            {schemas.map((schema, index) => (
                <script
                    key={index}
                    head-key={`structured-data-${index}`}
                    type="application/ld+json"
                >
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Head>
    );
};
export default SEO;
