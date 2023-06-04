<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Session;

class SeanceController extends Controller
{
    public function update(Request $request)
    {
        //app('log')->info($request[0]['seance_seats']);
        $seances = $request->json();
        Session::query()->delete();
        foreach ($seances as $seance)
        {
            Session::query()->create($seance);
        }
        $seances = Session::with('movie')->get();
        return response()->json($seances);
    }

    public function addSeats(Request $request, int $id)
    {
        $seance = Session::query()->findOrFail($id);
        $seance->selected_seats = $request->selected_seats;
        $seance->seance_seats = $request->seance_seats;
        $seance->save();
    }

}