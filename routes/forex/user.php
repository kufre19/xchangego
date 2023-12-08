<?php

use Illuminate\Support\Facades\Route;

Route::get('dashboard/forex', 'ForexController@dash')->middleware('checkKYC')->name('home.forex');
Route::group(['middleware' => 'checkKYC', 'prefix' => 'forex', 'as' => 'forex.'], function() {
    Route::get('/trade', 'ForexController@trade')->name('trade');
    Route::get('/create', 'ForexController@create')->name('create');
    Route::post('/investment/store', 'ForexController@store')->name('store');
    Route::post('/withdraw', 'ForexController@withdraw')->name('withdraw');
    Route::post('/deposit', 'ForexController@deposit')->name('deposit');
});
