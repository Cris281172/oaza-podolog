<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Pricing;
use App\Models\PricingItem;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function home(){
        return Inertia::render('dashboard/home', [
            'stats' => [
                'services' => Service::count(),
                'serviceCategories' => ServiceCategory::count(),
                'pricing' => Pricing::count(),
                'pricingItems' => PricingItem::count(),
                'faq' => Faq::count(),
            ],
        ]);
    }
    public function pricing(){
        return Inertia::render('dashboard/pricing');
    }
}
