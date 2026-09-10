<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Certificate\CertificateStoreRequest;
use App\Models\Certificate;
use App\Services\CertificateImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/certificates/index', [
            'certificates' => Certificate::orderBy('order')->get(),
        ]);
    }

    public function store(CertificateStoreRequest $request, CertificateImageOptimizer $optimizer)
    {
        $paths = $optimizer->store($request->file('image'));

        Certificate::create([
            'title' => $request->validated('title'),
            ...$paths,
            'order' => (Certificate::max('order') ?? -1) + 1,
        ]);

        return back();
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:certificates,id'],
        ]);

        foreach ($validated['ids'] as $order => $id) {
            Certificate::whereKey($id)->update(['order' => $order]);
        }

        return back();
    }

    public function destroy(Certificate $certificate)
    {
        foreach ([$certificate->image_path, $certificate->thumbnail_path] as $path) {
            if (str_starts_with($path, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $path));
            }
        }

        $certificate->delete();

        return back();
    }
}
