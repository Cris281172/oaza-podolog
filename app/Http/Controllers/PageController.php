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
}
