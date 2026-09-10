<?php

use App\Models\PrivacyPolicy;
use App\Models\User;

test('privacy policy page is available with default content', function () {
    $this->get(route('privacyPolicy'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('privacy-policy')
            ->where('policy.title', PrivacyPolicy::defaultTitle()));
});

test('administrator can update the privacy policy', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $content = [
        'type' => 'doc',
        'content' => [[
            'type' => 'paragraph',
            'content' => [['type' => 'text', 'text' => 'Zaktualizowana treść']],
        ]],
    ];

    $this->actingAs($user)
        ->patch(route('dashboard.privacyPolicy.update'), [
            'title' => 'Nowy tytuł',
            'intro' => 'Nowe wprowadzenie',
            'content' => $content,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('privacy_policies', [
        'title' => 'Nowy tytuł',
        'intro' => 'Nowe wprowadzenie',
    ]);

    $this->get(route('privacyPolicy'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('policy.title', 'Nowy tytuł')
            ->where('policy.content', $content));
});
