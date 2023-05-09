<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Session;
use App\Http\Requests\AddHallPostRequest;
use App\Http\Requests\AddMoviePostRequest;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index()
    {
        $halls = Hall::paginate(7);
        $movies = Movie::paginate(10);
        return view('admin.index', ['halls' => $halls, 'movies' => $movies]);
    }

    public function addHall(AddHallPostRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        Hall::create([
            "name" => $validated['name'],
            "seats" => ['st','st','st','st','st','st'],
        ]);
        return redirect()->back();
    }

    public function deleteHall(Request $request, int $id): RedirectResponse
    {
        Hall::destroy($id);
        return redirect('admin/index');
    }

    public function addMovie(AddMoviePostRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        Movie::create([
            "title" => $validated['name'],
            "duration" => $validated['duration'],
        ]);
        return redirect()->back();
    }

    
    public function addSeance(Request $request, int $id): RedirectResponse
    {
        //$finish = 
        Session::create([
            "data" => $request['data'],
            "start" => $request['start'],
            "finish" => $finish,
            "movie_id" => $id,
            "hall_id" => $request['hall'],
        ]);
        return redirect()->back();
    }    
    
}
