<?php

namespace App\Support;

use App\Services\PodologyService;
use Illuminate\Http\Request;

class SeoMeta
{
    public static function forRequest(Request $request): array
    {
        $routeName = $request->route()?->getName();
        $defaults = [
            'title' => 'Podolog Kielce – Gabinet Podologiczna Oaza',
            'description' => 'Gabinet Podologiczna Oaza w Kielcach. Profesjonalna pomoc przy wrastających paznokciach, odciskach, brodawkach, modzelach i innych problemach stóp.',
            'robots' => 'index, follow',
        ];

        $pages = [
            'home' => $defaults,
            'services' => [
                'title' => 'Usługi podologiczne Kielce | Podologiczna Oaza',
                'description' => 'Poznaj usługi w gabinecie Podologiczna Oaza w Kielcach. Terapia wrastających paznokci, odcisków, modzeli i brodawek oraz pielęgnacja stóp.',
            ],
            'priceList' => [
                'title' => 'Cennik usług podologicznych Kielce | Podologiczna Oaza',
                'description' => 'Sprawdź cennik usług gabinetu Podologiczna Oaza w Kielcach: konsultacje, pedicure podologiczny i terapie problemów stóp oraz paznokci.',
            ],
            'contact' => [
                'title' => 'Kontakt – Podolog Kielce | Podologiczna Oaza',
                'description' => 'Skontaktuj się z gabinetem Podologiczna Oaza w Kielcach, sprawdź adres, godziny otwarcia i umów wizytę telefonicznie.',
            ],
            'faq' => [
                'title' => 'FAQ – pytania do podologa | Podologiczna Oaza Kielce',
                'description' => 'Odpowiedzi na najczęstsze pytania dotyczące wizyt u podologa, zabiegów, przygotowania do wizyty oraz terapii problemów stóp i paznokci.',
            ],
            'privacyPolicy' => [
                'title' => 'Polityka prywatności i cookies | Podologiczna Oaza',
                'description' => 'Informacje o ochronie danych osobowych, plikach cookies i usługach zewnętrznych na stronie gabinetu Podologiczna Oaza.',
            ],
        ];

        if ($routeName === 'service') {
            $service = PodologyService::resolve((string) $request->route('slug'))['seo'] ?? null;

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
            'name' => 'Gabinet Podologiczna Oaza',
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
