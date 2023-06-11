<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Session;
use App\Models\Seat;
use App\Http\Requests\AddHallPostRequest;
use App\Http\Requests\AddMoviePostRequest;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller
{
    public function index()
    {
        $halls = Hall::with('seat')->get();
        $seats = Seat::all();
        $movies = Movie::paginate(10);
        $seances = Session::with('movie')->get();
        return view('admin.index', ['halls' => $halls, 'movies' => $movies, 'seances' => $seances, 'seats' => $seats]);
    }

    public function addHall(AddHallPostRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $hall = Hall::create([
            'name' => $validated['name']
        ]);
        
        for ($i = 0; $i < 6; $i++) 
        {
            Seat::create([
                'hall_id' => $hall->id,
                'type_seat' => 'st',
            ]);
        }
        return redirect()->back();
    }

    public function deleteHall(Request $request, int $id): RedirectResponse
    {
        $sessions = Session::all();
        foreach ($sessions as $session) {
            if ($session->hall_id === $id) {
                Session::destroy($session->id);
            }
        }
        Seat::query()->where(['hall_id' => $id])->delete();
        Hall::destroy($id);
        return redirect('admin/index');
    }

    public function addMovie(AddMoviePostRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        Movie::create([
            'title' => $validated['name'],
            'duration' => $validated['duration'],
        ]);
        return redirect()->back();
    }


    public function deleteMovie(Request $request, int $id): RedirectResponse
    {
        $sessions = Session::all();
        foreach ($sessions as $session) {
            if ($session->movie_id === $id) {
                Session::destroy($session->id);
            }
        }
        Movie::destroy($id);
        return redirect('admin/index');
    }   
}
