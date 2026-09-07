<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = [
            ['loc' => route('home'), 'priority' => '1.0'],
            ['loc' => route('services'), 'priority' => '0.9'],
            ['loc' => route('priceList'), 'priority' => '0.8'],
            ['loc' => route('contact'), 'priority' => '0.7'],
            ['loc' => route('faq'), 'priority' => '0.7'],
        ];

        foreach (array_keys(config('podology_services', [])) as $slug) {
            $urls[] = [
                'loc' => route('service', ['slug' => $slug]),
                'priority' => '0.8',
            ];
        }

        return response()
            ->view('sitemap', compact('urls'))
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
