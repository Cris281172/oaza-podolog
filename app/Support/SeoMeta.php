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
        $meta['image'] = asset('apple-touch-icon.png');

        if ($request->is('dashboard/*', 'settings/*', 'login', 'register', 'forgot-password', 'reset-password/*')) {
            $meta['robots'] = 'noindex, nofollow';
        }

        return $meta;
    }
}
