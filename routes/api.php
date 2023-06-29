<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HallController;
use App\Http\Controllers\SeanceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/halls/{hall}', [HallController::class, 'update']);
//Route::post('/halls/{hall}/seats', [HallController::class, 'updateSeats']);
Route::post('/seats/{id}', [HallController::class, 'updateSeats']);
Route::post('/seances/{seance}', [SeanceController::class, 'addSeats']);
Route::post('/seances', [SeanceController::class, 'update']);
