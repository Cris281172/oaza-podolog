<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Pricing\PricingCreateRequest;
use App\Http\Requests\Dashboard\Pricing\PricingUpdateRequest;
use App\Models\Pricing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pricing = Pricing::orderBy('order', 'asc')->with('items')->get();
        return Inertia::render('dashboard/pricing/index', compact('pricing'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/pricing/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PricingCreateRequest $request)
    {
        $data = $request->validated();

        Pricing::create([
            "title" => $data["title"],
            "order" => Pricing::max('order') + 1,
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Pricing $pricing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pricing $pricing, string $id)
    {
        $pricing = Pricing::where('id', $id)->first();
        return Inertia::render('dashboard/pricing/edit', compact('pricing'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PricingUpdateRequest $request, Pricing $pricing)
    {
        $data = $request->validated();
        Pricing::where('id', $request->pricingID)->update([
            "title" => $data["title"],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pricing $pricing)
    {
        $pricing->delete();
        return redirect()->back();
    }
    public function reorder(Request $request){
        $ids = $request->input('ids');
        foreach ($ids as $index => $id) {
            Pricing::where('id', $id)->update(['order' => $index]);
        }
        return back();
    }
}
