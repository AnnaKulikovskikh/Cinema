<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Session;

class ClientController extends Controller
{
    public function index()
    {
        $halls = Hall::paginate(7);
        $movies = Movie::paginate(10);
        $seances = Session::all();
        return view('client.index', ['halls' => $halls, 'movies' => $movies, 'seances' => $seances]);
    }

    public function hall()
    {
        return view('client.hall');
    }

    public function payment()
    {
        return view('client.payment');
    }

    public function ticket()
    {
        return view('client.ticket');
    }
    
}
