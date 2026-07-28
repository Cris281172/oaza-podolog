<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Services\PodologyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home(){
        $categories = ServiceCategory::with(['services' => function ($query) {
            $query->orderBy('order');
        }])
            ->orderBy('order')
            ->get();
        $faqs = Faq::orderBy('order', 'asc')->take(5)->get();
        return Inertia::render('home', compact('faqs', 'categories'));
    }
    public function services(){
        $categories = ServiceCategory::with(['services' => function ($query) {
            $query->orderBy('order');
        }])
            ->orderBy('order')
            ->get();
        return Inertia::render('services', compact('categories'));
    }
    public function contact(){
        return Inertia::render('contact');
    }
    public function priceList(){
        return Inertia::render('priceList');
    }
    public function service(string $slug){
        $serviceConfig = config('podology_services');
        if (!isset($serviceConfig[$slug])) {
            abort(404);
        }

        $service = $serviceConfig[$slug];

        return Inertia::render('service', [
            'service' => $service,
            'crossSell' => PodologyService::getCrossSell($slug),
        ]);
    }
    public function faq(){
        $faqs = Faq::orderBy('order', 'asc')->get();
        return Inertia::render('faq', compact('faqs'));
    }
}
