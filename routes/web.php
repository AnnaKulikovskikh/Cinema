<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    //return redirect('/client/index');
    return view('welcome');
});

Route::get('/admin/login', [\App\Http\Controllers\LoginController::class, 'form'])->name('login');
Route::post('/admin/login', [\App\Http\Controllers\LoginController::class, 'authenticate']);
//if (Auth::check()) { return redirect(route('/admin/index'));}

//роуты admin
Route::group(['middleware'=>'auth'], function() {
    Route::get('/admin/index', [\App\Http\Controllers\AdminController::class, 'index'])->name('index');
    Route::post('/admin/add_hall', [\App\Http\Controllers\AdminController::class, 'addHall'])->name('addHall');
    Route::post('/admin/add_movie', [\App\Http\Controllers\AdminController::class, 'addMovie'])->name('addMovie');
    Route::post('/admin/del_hall/{id}', [\App\Http\Controllers\AdminController::class, 'deleteHall']);
    Route::post('/admin/delete_movie/{id}', [\App\Http\Controllers\AdminController::class, 'deleteMovie']);
});

Route::get('/client/index', [\App\Http\Controllers\ClientController::class, 'index']);
Route::get('/client/hall/{id}', [\App\Http\Controllers\ClientController::class, 'hall']);
Route::get('/client/payment/{id}', [\App\Http\Controllers\ClientController::class, 'payment']);
Route::get('/client/ticket/{id}', [\App\Http\Controllers\ClientController::class, 'ticket']);
