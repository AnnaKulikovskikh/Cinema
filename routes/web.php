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
    return view('welcome');
});

Route::get('/admin/login', [\App\Http\Controllers\LoginController::class, 'form']);
Route::post('/admin/login', [\App\Http\Controllers\LoginController::class, 'result']);
//if (Auth::check()) { return redirect(route('/admin/index'));}

Route::get('/admin/index', [\App\Http\Controllers\AdminController::class, 'index'])->name('index');
Route::get('/admin/halladd', [\App\Http\Controllers\AdminController::class, 'hallAdd'])->name('addHall');
Route::get('/admin/halldel', [\App\Http\Controllers\AdminController::class, 'hallDel'])->name('delHall');
Route::get('/admin/movieadd', [\App\Http\Controllers\AdminController::class, 'movieAdd'])->name('addMovie');
Route::get('/admin/showadd', [\App\Http\Controllers\AdminController::class, 'showAdd'])->name('addShow');
Route::get('/admin/showdel', [\App\Http\Controllers\AdminController::class, 'showDel'])->name('delShow');
// Route::group(['middleware'=>'auth'], function() {
//  Route::get добавить сюда защещенные роуты
//})


Route::get('/client/index', [\App\Http\Controllers\ClientController::class, 'index']);
Route::get('/client/hall', [\App\Http\Controllers\ClientController::class, 'hall']);
Route::get('/client/payment', [\App\Http\Controllers\ClientController::class, 'payment']);
Route::get('/client/ticket', [\App\Http\Controllers\ClientController::class, 'ticket']);


