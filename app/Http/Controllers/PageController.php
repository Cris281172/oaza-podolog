<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Faq;
use App\Models\Pricing;
use App\Models\PricingItem;
use App\Models\PrivacyPolicy;
use App\Models\ServiceCategory;
use App\Services\PodologyService;
use Inertia\Inertia;
use Throwable;

class PageController extends Controller
{
    public function home()
    {
        $categories = ServiceCategory::with(['services' => function ($query) {
            $query->orderBy('order');
        }])
            ->orderBy('order')
            ->get();
        $faqs = Faq::where('show_on_home', true)->orderBy('home_order')->get();
        $homePricingItems = PricingItem::where('show_on_home', true)
            ->orderBy('home_order')
            ->get(['id', 'name', 'price']);
        $certificates = Certificate::orderBy('order')->get();

        return Inertia::render('home', compact('faqs', 'categories', 'homePricingItems', 'certificates'));
    }

    public function services()
    {
        $categories = ServiceCategory::with(['services' => function ($query) {
            $query->orderBy('order');
        }])
            ->orderBy('order')
            ->get();

        return Inertia::render('services', compact('categories'));
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function priceList()
    {
        $pricingList = Pricing::orderBy('order', 'asc')->with('items')->get();

        return Inertia::render('priceList', compact('pricingList'));
    }

    public function service(string $slug)
    {
        $service = PodologyService::resolve($slug);
        if (! $service) {
            abort(404);
        }

        $crossSellSlug = PodologyService::canonicalSlug($slug);
        $crossSell = $crossSellSlug
            ? PodologyService::getCrossSell($crossSellSlug)
            : collect(PodologyService::getAll())
                ->take(3)
                ->map(fn (array $item, string $itemSlug) => [...$item, 'slug' => $itemSlug])
                ->values()
                ->all();

        return Inertia::render('service', [
            'service' => $service,
            'crossSell' => $crossSell,
        ]);
    }

    public function faq()
    {
        $faqs = Faq::orderBy('order', 'asc')->get();

        return Inertia::render('faq', compact('faqs'));
    }

    public function privacyPolicy()
    {
        $policy = null;

        try {
            $policy = PrivacyPolicy::query()->first();
        } catch (Throwable) {
            // The default policy remains available until the migration is run.
        }

        return Inertia::render('privacy-policy', [
            'policy' => [
                'title' => $policy?->title ?? PrivacyPolicy::defaultTitle(),
                'intro' => $policy?->intro ?? PrivacyPolicy::defaultIntro(),
                'content' => $policy?->content ?? PrivacyPolicy::defaultContent(),
            ],
        ]);
    }
}
