<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Services\PodologyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home(){
        $faqs = Faq::orderBy('order', 'asc')->take(5)->get();
        return Inertia::render('home', compact('faqs'));
    }
    public function services(){
        return Inertia::render('services');
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
