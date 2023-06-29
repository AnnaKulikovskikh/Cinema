<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Session;
use App\Models\Seat;

class ClientController extends Controller
{
    public function index()
    {
        $halls = Hall::query()->where(['is_open' => true])->get();
        $movies = Movie::with('sessions')->get();
        $seances = Session::all();

        return view('client.index', [
            'halls' => $halls,
            'movies' => $movies,
            'seances' => $seances,
        ]);
    }

    public function hall(int $id)
    {
        $seance = Session::with(['movie','hall'])->get()->findOrFail($id);
        $seats = Seat::query()->where(['hall_id' => $seance->hall_id])->get();

        return view('client.hall', ['seance' => $seance, 'seats'=> $seats]);
    }

    public function payment(Request $request, int $id)
    {
        $seance = Session::with(['movie','hall'])->get()->findOrFail($id);

        return view('client.payment', ['seance' => $seance]);
    }

    public function ticket(Request $request, int $id)
    {
        $seance = Session::with(['movie','hall'])->get()->findOrFail($id);

        return view('client.ticket', ['seance' => $seance]);
    }
    
}
