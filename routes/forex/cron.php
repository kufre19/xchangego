<?php

use Illuminate\Support\Facades\Route;

Route::get('cron/forex/result', 'CronController@ForexResult')->name('forex.result');
Route::get('cron/forex/missed', 'CronController@ForexMissed')->name('forex.missed');
