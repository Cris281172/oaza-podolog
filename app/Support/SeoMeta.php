<?php

namespace App\Support;

use Illuminate\Http\Request;

class SeoMeta
{
    public static function forRequest(Request $request): array
    {
        $routeName = $request->route()?->getName();
        $defaults = [
            'title' => 'Podolog Kielce – Gabinet Podologiczny OAZA',
            'description' => 'Gabinet podologiczny OAZA w Kielcach. Profesjonalna pomoc przy wrastających paznokciach, odciskach, brodawkach, modzelach i innych problemach stóp.',
            'robots' => 'index, follow',
        ];

        $pages = [
            'home' => $defaults,
            'services' => [
                'title' => 'Usługi podologiczne Kielce | OAZA',
                'description' => 'Poznaj usługi podologiczne w gabinecie OAZA w Kielcach. Terapia wrastających paznokci, odcisków, modzeli i brodawek oraz pielęgnacja stóp.',
            ],
            'priceList' => [
                'title' => 'Cennik usług podologicznych Kielce | OAZA',
                'description' => 'Sprawdź cennik usług podologicznych w gabinecie OAZA w Kielcach: konsultacje, pedicure podologiczny i terapie problemów stóp oraz paznokci.',
            ],
            'contact' => [
                'title' => 'Kontakt – Podolog Kielce | OAZA',
                'description' => 'Skontaktuj się z gabinetem podologicznym OAZA w Kielcach, sprawdź adres, godziny otwarcia i umów wizytę telefonicznie.',
            ],
            'faq' => [
                'title' => 'FAQ – pytania do podologa | OAZA Kielce',
                'description' => 'Odpowiedzi na najczęstsze pytania dotyczące wizyt u podologa, zabiegów, przygotowania do wizyty oraz terapii problemów stóp i paznokci.',
            ],
        ];

        if ($routeName === 'service') {
            $service = config('podology_services.'.$request->route('slug').'.seo');

            if ($service) {
                $pages['service'] = [
                    'title' => $service['title'],
                    'description' => $service['description'],
                ];
            }
        }

        $meta = array_merge($defaults, $pages[$routeName] ?? []);
        $meta['canonical'] = url()->current();
        $meta['image'] = asset('og-image.jpg');

        if ($request->is('dashboard/*', 'settings/*', 'login', 'register', 'forgot-password', 'reset-password/*')) {
            $meta['robots'] = 'noindex, nofollow';
        }

        return $meta;
    }

    public static function structuredData(Request $request, array $page): array
    {
        $schemas = [[
            '@context' => 'https://schema.org',
            '@type' => 'MedicalBusiness',
            'name' => 'Gabinet Podologiczny OAZA',
            'url' => rtrim((string) config('app.url'), '/'),
            'image' => asset('og-image.jpg'),
            'telephone' => '+48 505 849 060',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'ul. Mieczysławy Ćwiklińskiej 1E',
                'postalCode' => '25-437',
                'addressLocality' => 'Kielce',
                'addressCountry' => 'PL',
            ],
            'areaServed' => ['@type' => 'City', 'name' => 'Kielce'],
        ]];

        if ($request->route()?->getName() === 'faq') {
            $schemas[] = [
                '@context' => 'https://schema.org',
                '@type' => 'FAQPage',
                'mainEntity' => collect(data_get($page, 'props.faqs', []))->map(fn ($faq) => [
                    '@type' => 'Question',
                    'name' => data_get($faq, 'question'),
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => data_get($faq, 'answer'),
                    ],
                ])->values()->all(),
            ];
        }

        if ($request->route()?->getName() === 'service') {
            $service = data_get($page, 'props.service');
            $title = trim(data_get($service, 'hero.title', '').' '.data_get($service, 'hero.titleSecond', ''));
            $serviceUrl = route('service', ['slug' => data_get($service, 'slug')]);

            $schemas[] = [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => [
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Strona główna', 'item' => route('home')],
                    ['@type' => 'ListItem', 'position' => 2, 'name' => 'Usługi', 'item' => route('services')],
                    ['@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $serviceUrl],
                ],
            ];
        }

        return $schemas;
    }
}
