<?php

namespace App\Http\Controllers;

use App\Models\Faq;
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
}
