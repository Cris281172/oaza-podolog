<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Pricing\PricingItemCreateRequest;
use App\Models\PricingItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $id)
    {
        return Inertia::render('dashboard/pricing/item/create', compact('id'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PricingItemCreateRequest $request)
    {
        $data = $request->validated();

        PricingItem::create([
            'pricing_id' => $data['pricingID'],
            "name" => $data["name"],
            "price" => $data["price"],
            "order" => PricingItem::max('order') + 1,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PricingItem $pricingItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PricingItem $pricingItem)
    {
        return Inertia::render('dashboard/pricing/item/edit', compact('pricingItem'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PricingItem $pricingItem)
    {
        $data = $request->validate([
            "name" => 'required|string',
            "price" => 'required|numeric|min:0',
        ]);

        $pricingItem->update($data);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        PricingItem::where('id', $id)->delete();
        return back();
    }
    public function reorder(Request $request){
        $ids = $request->input('ids');

        foreach ($ids as $index => $id) {
            PricingItem::where('id', $id)->update(['order' => $index]);
        }
        return back();
    }
}
