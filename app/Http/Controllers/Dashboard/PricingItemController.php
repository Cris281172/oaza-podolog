<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Pricing\PricingItemCreateRequest;
use App\Http\Requests\Dashboard\Pricing\PricingItemUpdateRequest;
use App\Models\PricingItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'name' => $data['name'],
            'price' => $data['price'],
            'order' => PricingItem::max('order') + 1,
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
    public function edit(string $id)
    {
        $pricingItem = PricingItem::findOrFail($id);

        return Inertia::render('dashboard/pricing/item/edit', compact('pricingItem'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PricingItemUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        PricingItem::where('id', $id)->update([
            'name' => $data['name'],
            'price' => $data['price'],
        ]);

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

    public function reorder(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $index => $id) {
            PricingItem::where('id', $id)->update(['order' => $index]);
        }

        return back();
    }

    public function updateHomePreview(Request $request)
    {
        $validated = $request->validate([
            'ids' => ['present', 'array'],
            'ids.*' => ['integer', 'distinct', 'exists:pricing_items,id'],
        ]);

        DB::transaction(function () use ($validated) {
            PricingItem::query()->update([
                'show_on_home' => false,
                'home_order' => null,
            ]);

            foreach ($validated['ids'] as $index => $id) {
                PricingItem::whereKey($id)->update([
                    'show_on_home' => true,
                    'home_order' => $index,
                ]);
            }
        });

        return back();
    }
}
