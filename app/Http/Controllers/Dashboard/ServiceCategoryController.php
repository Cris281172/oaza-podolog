<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Service\ServiceCategoryCreateRequest;
use App\Http\Requests\Dashboard\Service\ServiceCategoryEditRequest;
use App\Http\Requests\Dashboard\Service\ServiceCreateRequest;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    public function create(){
        return Inertia::render('dashboard/services/cateogires/create');
    }
    public function store(ServiceCategoryCreateRequest $request){
        $data = $request->validated();
        ServiceCategory::create([
            "name" => $data['name'],
        ]);
        return back();
    }
    public function destroy(ServiceCategory $serviceCategory){
        $serviceCategory->delete();
        return back();
    }
    public function edit(string $id){
        $serviceCategory = ServiceCategory::findOrFail($id);
        return Inertia::render('dashboard/services/cateogires/edit', compact('serviceCategory'));
    }
    public function update(ServiceCategoryEditRequest $request, string $id){
        $data = $request->validated();
        $serviceCategory = ServiceCategory::findOrFail($id);
        $serviceCategory->update([
            "name" => $data['name'],
        ]);
        return back();
    }
}
