<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\PrivacyPolicyUpdateRequest;
use App\Models\PrivacyPolicy;
use Inertia\Inertia;

class PrivacyPolicyController extends Controller
{
    public function edit()
    {
        $policy = PrivacyPolicy::query()->first();

        return Inertia::render('dashboard/privacy-policy/edit', [
            'policy' => [
                'title' => $policy?->title ?? PrivacyPolicy::defaultTitle(),
                'intro' => $policy?->intro ?? PrivacyPolicy::defaultIntro(),
                'content' => $policy?->content ?? PrivacyPolicy::defaultContent(),
            ],
        ]);
    }

    public function update(PrivacyPolicyUpdateRequest $request)
    {
        PrivacyPolicy::query()->updateOrCreate(['id' => 1], $request->validated());

        return back();
    }
}
