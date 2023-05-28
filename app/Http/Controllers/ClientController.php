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
        //$movies = Movie::paginate(10);
        $movies = Movie::with('sessions')->get();
        //$halls = Hall::with('seat')->get();
        $seances = Session::all();
        //$seances = Movie::with('sessions')->get();
        //$seances = Movie::with('session')->get();
        //$seances = Movie::with('hall')->get();
        return view('client.index', ['halls' => $halls, 'movies' => $movies, 'seances' => $seances]);
        //return view('client.index', ['movies' => $movies]);
        //$seances = Session::with('movie')->get();
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
