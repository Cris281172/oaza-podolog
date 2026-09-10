<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Response;
use Throwable;

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
            ['loc' => route('privacyPolicy'), 'priority' => '0.3'],
        ];

        $serviceSlugs = array_keys(config('podology_services', []));

        try {
            $serviceSlugs = array_values(array_unique([
                ...$serviceSlugs,
                ...Service::query()->pluck('slug')->all(),
            ]));
        } catch (Throwable) {
            // The configured pages remain available if the database is temporarily unavailable.
        }

        foreach ($serviceSlugs as $slug) {
            $urls[] = [
                'loc' => route('service', ['slug' => $slug]),
                'priority' => '0.8',
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;

        foreach ($urls as $url) {
            $location = htmlspecialchars($url['loc'], ENT_XML1 | ENT_QUOTES, 'UTF-8');
            $xml .= "    <url>\n";
            $xml .= "        <loc>{$location}</loc>\n";
            $xml .= "        <priority>{$url['priority']}</priority>\n";
            $xml .= "    </url>\n";
        }

        $xml .= '</urlset>'.PHP_EOL;

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
