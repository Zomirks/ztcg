<?php

use App\Http\Controllers\CollectionItemController;
use App\Http\Controllers\TcgController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('collection-items', CollectionItemController::class)->except(['show']);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('tcgs', TcgController::class);
});

require __DIR__.'/settings.php';
