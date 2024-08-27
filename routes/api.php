<?php

// use Controllers

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\OTPController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\RoommateController;
use App\Http\Controllers\PgListingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\FavouriteController;

// Api Routes 

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/logout', [RegisterController::class, 'logout']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/get-otp', [OTPController::class, 'getOTP']);
Route::middleware('auth:sanctum')->get('/details', [RegisterController::class, 'details']);
Route::post('/verify-otp', [OTPController::class, 'verifyOtp']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('reset-password', [ResetPasswordController::class, 'reset']);
Route::get('/password/reset/', [ForgotPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/listings', [ListingController::class, 'store']);
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/property/{id}/{location}/{listingType}', [PropertyController::class, 'show']);
Route::post('/upload', [ImageController::class, 'upload']);
Route::post('/roommates', [RoommateController::class, 'store']);
Route::post('/pg_listings', [PgListingController::class, 'store']);
Route::get('/userDetail', [UserController::class, 'decodeToken']);
Route::middleware('auth:api')->post('/update-profile', [RegisterController::class, 'updateProfile']);

Route::get('user/{userId}/ads', [AdsController::class, 'getUserAds']);
Route::put('/property/{id}/{listing_type}', [PropertyController::class, 'updateProperty']);
Route::delete('/property/{listingType}/{id}', [PropertyController::class, 'deleteProperty']);
Route::post('/change-password/{userId}', [RegisterController::class, 'changePassword']);
Route::post('/{listing_type}/{id}/toggle-favourite', [FavouriteController::class, 'toggleFavourite']);
Route::get('/user/{id}/favourites', [FavouriteController::class, 'getFavourites']);
Route::get('/nearbyproperties/{listingType}/{propertyId}', [PropertyController::class, 'getNearbyProperties']);
