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

Route::get('/admin/index', [\App\Http\Controllers\AdminController::class, 'index']);
Route::get('/admin/halladd', [\App\Http\Controllers\AdminController::class, 'hallAdd']);
Route::get('/admin/halldel', [\App\Http\Controllers\AdminController::class, 'hallDel']);
Route::get('/admin/movieadd', [\App\Http\Controllers\AdminController::class, 'movieAdd']);
Route::get('/admin/showadd', [\App\Http\Controllers\AdminController::class, 'showAdd']);
Route::get('/admin/showdel', [\App\Http\Controllers\AdminController::class, 'showDel']);
// Route::name('admin.')->group(function() {
//     Route::view('/private', 'private')->middleware('isAdmin')->name('private');
// });


Route::get('/client/index', [\App\Http\Controllers\ClientController::class, 'index']);
Route::get('/client/hall', [\App\Http\Controllers\ClientController::class, 'hall']);
Route::get('/client/payment', [\App\Http\Controllers\ClientController::class, 'payment']);
Route::get('/client/ticket', [\App\Http\Controllers\ClientController::class, 'ticket']);


