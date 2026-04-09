<?php

use App\Http\Controllers\Dashboard\BlogController;
use App\Http\Controllers\Dashboard\FaqController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/uslugi', [PageController::class, 'services'])->name('services');
Route::get('/cennik', [PageController::class, 'priceList'])->name('priceList');
Route::get('/kontakt', [PageController::class, 'contact'])->name('contact');

//Route::get('/', function () {
//    return Inertia::render('welcome', [
//        'canRegister' => false,
//    ]);
//})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/home', [DashboardController::class, 'home'])->name('home');
        Route::get('/pricing', [DashboardController::class, 'pricing'])->name('pricing');

        Route::prefix('faq')->name('faq.')->group(function () {
            Route::get('/', [FaqController::class, 'index'])->name('index');
            Route::get('/create', [FaqController::class, 'create'])->name('create');
            Route::post('/', [FaqController::class, 'store'])->name('store');
            Route::post('/reorder', [FaqController::class, 'reorder'])->name('reorder');
            Route::delete('/{faq}', [FaqController::class, 'destroy'])->name('destroy');
            Route::get('/{faq}/edit', [FaqController::class, 'edit'])->name('edit');
            Route::patch('/{faq}', [FaqController::class, 'update'])->name('update');
        });

        Route::prefix('blog')->name('blog.')->group(function () {
            Route::get('/', [BlogController::class, 'index'])->name('index');
            Route::get('/create', [BlogController::class, 'create'])->name('create');
            Route::post('/', [BlogController::class, 'store'])->name('store');
            Route::delete('/{blog}', [BlogController::class, 'destroy'])->name('destroy');
            Route::get('/{blog}/edit', [BlogController::class, 'edit'])->name('edit');
            Route::patch('/{blog}', [BlogController::class, 'update'])->name('update');
        });;
    });


});

require __DIR__.'/settings.php';
