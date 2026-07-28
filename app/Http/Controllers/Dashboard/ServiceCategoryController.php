<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Service\ServiceCreateRequest;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    public function create(){
        return Inertia::render('dashboard/services/cateogires/create');
    }
    public function store(ServiceCreateRequest $request){
        $data = $request->validated();
        ServiceCategory::create([
            "name" => $data['name'],
        ]);
        return back();
    }
}
