<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Movie;
use App\Models\Seat;
use App\Models\Session;
use App\Models\User;
use App\Http\Requests\MovieStoreRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class AdminController extends Controller
{
    public function index()
    {
        $halls = Hall::with('seat')->get();
        $seats = Seat::all();
        $movies = Movie::query()->paginate(10);
        $seances = Session::with('movie')->get();

        return view('admin.index', [
            'halls' => $halls,
            'movies' => $movies,
            'seances' => $seances,
            'seats' => $seats,
        ]);
    }
    
    public function addMovie(MovieStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        Movie::create([
            'title' => Arr::get($validated, 'name'), //$validated['name']
            'duration' => Arr::get($validated, 'duration'), //$validated['duration'],
        ]);

        return redirect()->back();
    }


    public function deleteMovie(int $id): RedirectResponse
    {
        Movie::destroy($id);

        return redirect('admin/index');
    }   
}
