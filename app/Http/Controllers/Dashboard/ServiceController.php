<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Service\ServiceCreateRequest;
use App\Http\Requests\Dashboard\Service\ServiceEditRequest;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Services\PodologyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $categories = ServiceCategory::with(['services' => function ($query) {
            $query->orderBy('order');
        }])
            ->orderBy('order')
            ->get();

        return Inertia::render('dashboard/services/index', compact('categories'));
    }

    public function create(string $categoryID)
    {
        return Inertia::render('dashboard/services/create', [
            'categoryID' => $categoryID,
            'defaultContent' => PodologyService::emptyEditorContent(),
        ]);
    }

    public function store(ServiceCreateRequest $request)
    {
        $data = $request->validated();
        $lastOrder = Service::where('category_id', $data['categoryID'])->max('order') ?? 0;
        Service::create([
            'name' => $data['name'],
            'slug' => $data['slug'],
            'short_description' => $data['shortDesc'],
            'page_intro' => $data['pageIntro'],
            'description_heading' => $data['descriptionHeading'],
            'page_content' => $data['pageContent'],
            'seo_title' => $data['seoTitle'],
            'seo_description' => $data['seoDescription'],
            'order' => $lastOrder + 1,
            'category_id' => $data['categoryID'],
        ]);

        return redirect()->back()->with('success', 'Service Created Successfully');
    }

    public function edit($id)
    {
        $service = Service::findOrFail($id);

        return Inertia::render('dashboard/services/edit', [
            'service' => $service,
            'page' => PodologyService::editorData($service),
        ]);
    }

    public function update(ServiceEditRequest $request, $id)
    {
        $data = $request->validated();
        Service::where('id', $id)->update([
            'name' => $data['name'],
            'slug' => $data['slug'],
            'short_description' => $data['shortDesc'],
            'page_intro' => $data['pageIntro'],
            'description_heading' => $data['descriptionHeading'],
            'page_content' => $data['pageContent'],
            'seo_title' => $data['seoTitle'],
            'seo_description' => $data['seoDescription'],
        ]);

        return redirect()->back();
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $ids = $request->input('ids');
        foreach ($ids as $index => $id) {
            Service::where('id', $id)->update(['order' => $index + 1]);
        }

        return redirect()->back();
    }

    public function reorderCategories(Request $request)
    {
        $ids = $request->input('ids');
        foreach ($ids as $index => $id) {
            ServiceCategory::where('id', $id)->update(['order' => $index + 1]);
        }

        return redirect()->back();
    }
}
