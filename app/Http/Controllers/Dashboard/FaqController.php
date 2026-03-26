<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Faq\FaqCreateRequest;
use App\Http\Requests\Dashboard\Faq\FaqUpdateRequest;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $faqs = Faq::orderBy('order', 'asc')->get();
        return Inertia::render('dashboard/faq/index', compact('faqs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/faq/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqCreateRequest $request)
    {
        $data = $request->validated();

        Faq::create([
            'question' => $data['question'],
            'order' => Faq::max('order') + 1,
            'answer' => $data['answer'],
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq)
    {
        return Inertia::render('dashboard/faq/edit', compact('faq'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaqUpdateRequest $request, Faq $faq)
    {
        $faq->update($request->validated());

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq)
    {
        $faq->delete();

        return back();
    }
    public function reorder(Request $request){
        $ids = $request->input('ids');
        foreach ($ids as $index => $id) {
            Faq::where('id', $id)->update(['order' => $index]);
        }
        return back();
    }
}
