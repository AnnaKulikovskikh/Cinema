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
        $halls = Hall::where('is_open', '=', true)->get();
        $movies = Movie::with('sessions')->get();
        $seances = Session::all();
        return view('client.index', ['halls' => $halls, 'movies' => $movies, 'seances' => $seances]);
    }

    public function hall(Request $request, int $id)
    {
        //$seance = Session::query()->findOrFail($id);
        $sessions = Session::with(['movie','hall'])->get();
        $seance = null;
        foreach($sessions as $session)
        {
            if ($session->id == $id)
            {
                $seance = $session;
                break;
            }
        }
        $seats = Seat::where('hall_id', '=', $seance->hall_id)->get();
        return view('client.hall', ['seance' => $seance, 'seats'=> $seats]);
    }

    public function payment(Request $request, int $id)
    {
        $sessions = Session::with(['movie','hall'])->get();
        $seance = null;
        foreach($sessions as $session)
        {
            if ($session->id == $id)
            {
                $seance = $session;
                break;
            }
        }
        return view('client.payment', ['seance' => $seance]);
    }

    public function ticket(Request $request, int $id)
    {
        $sessions = Session::with(['movie','hall'])->get();
        $seance = null;
        foreach($sessions as $session)
        {
            if ($session->id == $id)
            {
                $seance = $session;
                break;
            }
        }
        // app('log')->info($seance->selected_seats[0]['seance_seats']);
        // $seats = Seat::where('hall_id', '=', $seance->hall_id)->get();
        // foreach($seats as $seat)
        // {
        //     foreach($seance->selected_seats as $selected_seat)
        //     {
        //         if ($seat->id == $selected_seat['id'])
        //         {
        //             $seat->type_seat = 'taken';
        //             $seat->save();
        //         }
        //     }
        // }
        return view('client.ticket', ['seance' => $seance]);
    }
    
}
