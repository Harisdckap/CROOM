<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\Auth\ResetPasswordController;
Route::get('/', function () {
    return view('welcome');
});


// Route::get('/password/reset/{token}/{email}', [ForgotPasswordController::class, 'showResetForm'])->name('password.reset');
// Route::get('/listing', [ListingController::class, 'index']);
// Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword']);
