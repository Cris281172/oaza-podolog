<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function home(){
        return Inertia::render('dashboard/home');
    }
    public function pricing(){
        return Inertia::render('dashboard/pricing');
    }
}
