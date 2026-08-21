<?php

use App\Http\Controllers\Dashboard\BlogController;
use App\Http\Controllers\Dashboard\FaqController;
use App\Http\Controllers\Dashboard\PricingController;
use App\Http\Controllers\Dashboard\PricingItemController;
use App\Http\Controllers\Dashboard\ServiceCategoryController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/uslugi', [PageController::class, 'services'])->name('services');
Route::get('/uslugi/{slug}', [PageController::class, 'service'])->name('service');
Route::get('/cennik', [PageController::class, 'priceList'])->name('priceList');
Route::get('/kontakt', [PageController::class, 'contact'])->name('contact');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/home', [DashboardController::class, 'home'])->name('home');
        Route::get('/pricing', [DashboardController::class, 'pricing'])->name('pricing');

        Route::prefix('pricing')->name('pricing.')->group(function () {

            Route::get('/', [PricingController::class, 'index'])->name('index');
            Route::get('/create', [PricingController::class, 'create'])->name('create');
            Route::post('/', [PricingController::class, 'store'])->name('store');
            Route::patch('/{id}', [PricingController::class, 'update'])->name('update');
            Route::post('/reorder', [PricingController::class, 'reorder'])->name('reorder');
            Route::get('/{id}/edit', [PricingController::class, 'edit'])->name('edit');
            Route::patch('/{id}', [PricingController::class, 'update'])->name('update');
            Route::delete('/{pricing}', [PricingController::class, 'destroy'])->name('destroy');

            Route::prefix('items')->name('items.')->group(function () {

                Route::get('/create/{id}', [PricingItemController::class, 'create'])->name('create');
                Route::post('/', [PricingItemController::class, 'store'])->name('store');
                Route::get('/{id}/edit', [PricingItemController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [PricingItemController::class, 'update'])->name('update');
                Route::post('/reorder', [PricingItemController::class, 'reorder'])->name('reorder');
                Route::post('/home-preview', [PricingItemController::class, 'updateHomePreview'])->name('homePreview');
                Route::delete('/{id}', [PricingItemController::class, 'destroy'])->name('destroy');

            });

        });

        Route::prefix('faq')->name('faq.')->group(function () {
            Route::get('/', [FaqController::class, 'index'])->name('index');
            Route::get('/create', [FaqController::class, 'create'])->name('create');
            Route::post('/', [FaqController::class, 'store'])->name('store');
            Route::post('/reorder', [FaqController::class, 'reorder'])->name('reorder');
            Route::delete('/{faq}', [FaqController::class, 'destroy'])->name('destroy');
            Route::get('/{faq}/edit', [FaqController::class, 'edit'])->name('edit');
            Route::patch('/{faq}', [FaqController::class, 'update'])->name('update');
        });

        Route::prefix('services')->name('services.')->group(function () {

            Route::get('/', [ServiceController::class, 'index'])->name('index');
            Route::get('/create/{categoryID}', [ServiceController::class, 'create'])->name('create');
            Route::post('/', [ServiceController::class, 'store'])->name('store');
            Route::post('/reorder', [ServiceController::class, 'reorder'])->name('reorder');
            Route::post('/reorder-categories', [ServiceController::class, 'reorderCategories'])->name('reorderCategories');
            Route::get('/{id}/edit', [ServiceController::class, 'edit'])->name('edit');
            Route::patch('/{id}', [ServiceController::class, 'update'])->name('update');
            Route::delete('/{service}', [ServiceController::class, 'destroy'])->name('destroy');

            Route::prefix('categories')->name('services-category.')->group(function () {

                Route::get('/create', [ServiceCategoryController::class, 'create'])->name('create');
                Route::post('/', [ServiceCategoryController::class, 'store'])->name('store');
                Route::get('/{id}/edit', [ServiceCategoryController::class, 'edit'])->name('edit');
                Route::patch('/{id}', [ServiceCategoryController::class, 'update'])->name('update');
                Route::delete('/{serviceCategory}', [ServiceCategoryController::class, 'destroy'])->name('destroy');

            });

        });

        Route::prefix('blog')->name('blog.')->group(function () {
            Route::get('/', [BlogController::class, 'index'])->name('index');
            Route::get('/create', [BlogController::class, 'create'])->name('create');
            Route::post('/', [BlogController::class, 'store'])->name('store');
            Route::delete('/{blog}', [BlogController::class, 'destroy'])->name('destroy');
            Route::get('/{blog}/edit', [BlogController::class, 'edit'])->name('edit');
            Route::patch('/{blog}', [BlogController::class, 'update'])->name('update');
        });
    });

});

require __DIR__.'/settings.php';
