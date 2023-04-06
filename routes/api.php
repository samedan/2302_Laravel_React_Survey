<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']); // return user to check
    Route::apiResource('survey', SurveyController::class);
    
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
// {survey:slug} = survey that will be type casted
// it will query 'survey' by using the 'slug'
Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']); 
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
