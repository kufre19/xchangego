<?php

use App\Http\Controllers\Admin\ForexInvestmentsController;
use App\Http\Controllers\Admin\ForexSignalsController;
use App\Http\Controllers\Admin\ManageForexController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'forex', 'as' => 'forex.'], function() {
    Route::get('/', [ManageForexController::class, 'index'])->name('index');
    Route::get('new', [ManageForexController::class, 'new'])->name('new');
    Route::get('edit/{id}', [ManageForexController::class, 'edit'])->name('edit');
    Route::get('verify/{id}', [ManageForexController::class, 'verify'])->name('verify')->middleware('demo');
    Route::post('store', [ManageForexController::class, 'store'])->name('store')->middleware('demo');
    Route::post('update', [ManageForexController::class, 'update'])->name('update')->middleware('demo');
    Route::post('remove', [ManageForexController::class, 'remove'])->name('remove')->middleware('demo');

    Route::group(['prefix' => 'investment', 'as' => 'investment.'], function() {
        Route::get('/', [ForexInvestmentsController::class,'index'])->name('index');
        Route::get('new', [ForexInvestmentsController::class,'new'])->name('new');
        Route::get('edit/{id}', [ForexInvestmentsController::class,'edit'])->name('edit');
        Route::post('store', [ForexInvestmentsController::class,'store'])->name('store')->middleware('demo');
        Route::post('update', [ForexInvestmentsController::class,'update'])->name('update')->middleware('demo');
        Route::post('remove', [ForexInvestmentsController::class,'remove'])->name('remove')->middleware('demo');
        Route::post('set', [ForexInvestmentsController::class,'set'])->name('set')->middleware('demo');

        // Log
        Route::get('log', [ForexInvestmentsController::class,'log'])->name('log.list');
        Route::get('pending/log', [ForexInvestmentsController::class,'pending'])->name('log.pending');
        Route::get('completed/log', [ForexInvestmentsController::class,'completed'])->name('log.completed');
        Route::get('{scope}/search', [ForexInvestmentsController::class,'search'])->name('log.search');
    });

    Route::group(['prefix' => 'signals', 'as' => 'signals.'], function() {
        Route::get('/', [ForexSignalsController::class, 'index'])->name('index');
        Route::get('new', [ForexSignalsController::class, 'new'])->name('new');
        Route::get('edit/{id}', [ForexSignalsController::class, 'edit'])->name('edit');
        Route::post('store', [ForexSignalsController::class, 'store'])->name('store')->middleware('demo');
        Route::post('update', [ForexSignalsController::class, 'update'])->name('update')->middleware('demo');
        Route::post('remove', [ForexSignalsController::class, 'remove'])->name('remove')->middleware('demo');
    });

    // Log
    Route::get('log', [ManageForexController::class, 'log'])->name('log.list');
    Route::get('pending/log', [ManageForexController::class, 'pending'])->name('log.pending');
    Route::get('completed/log', [ManageForexController::class, 'completed'])->name('log.completed');
    Route::get('{scope}/search', [ManageForexController::class, 'search'])->name('log.search');
});
