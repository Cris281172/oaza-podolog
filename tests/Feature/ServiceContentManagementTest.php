<?php

use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;

test('administrator can edit the complete service page', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $category = ServiceCategory::create(['name' => 'Testowa kategoria', 'order' => 1]);
    $service = Service::create([
        'name' => 'Testowa usługa',
        'slug' => 'testowa-usluga',
        'short_description' => 'Krótki opis',
        'order' => 1,
        'category_id' => $category->id,
    ]);
    $content = [
        'type' => 'doc',
        'content' => [[
            'type' => 'paragraph',
            'content' => [['type' => 'text', 'text' => 'Pełny opis zmieniony w panelu']],
        ]],
    ];

    $this->actingAs($user)
        ->patch(route('dashboard.services.update', $service->id), [
            'name' => 'Zmieniona usługa',
            'slug' => 'zmieniona-usluga',
            'shortDesc' => 'Nowy opis kafelka',
            'pageIntro' => 'Nowy tekst pod tytułem',
            'descriptionHeading' => 'Nowy nagłówek opisu',
            'pageContent' => $content,
            'seoTitle' => 'Zmieniona usługa | Gabinet Podologiczna Oaza',
            'seoDescription' => 'Nowy opis SEO usługi.',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('services', [
        'id' => $service->id,
        'name' => 'Zmieniona usługa',
        'page_intro' => 'Nowy tekst pod tytułem',
        'description_heading' => 'Nowy nagłówek opisu',
        'seo_title' => 'Zmieniona usługa | Gabinet Podologiczna Oaza',
    ]);

    $this->get(route('service', 'zmieniona-usluga'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('service')
            ->where('service.hero.text', 'Nowy tekst pod tytułem')
            ->where('service.treatment.title', 'Nowy nagłówek opisu')
            ->where('service.pageContent', $content)
            ->where('service.seo.description', 'Nowy opis SEO usługi.'));
});
