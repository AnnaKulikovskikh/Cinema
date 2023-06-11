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
        //все сеансы стираются и пересоздаются заново. При этом теряется инфо о купленных местах

        $seances = $request->json();
        Session::query()->delete();
        foreach ($seances as $seance)
        {
            Session::query()->create($seance);
        }
        $seances = Session::with('movie')->get();

        // $seances = Session::all();
        // $seancesIn = $request->json();
        // $s = 0;
        // $d = 0;
        // foreach ($seancesIn as $seanceIn) {
        //     foreach ($seances as $seance) {
        //         if ($seanceIn['id'] === $seance->id) {
        //             $s++;
        //         }
        //         Session::query()->create($seanceIn);
        //         $s = 0;
        //     }
        // }
        // $seancesOut = Session::all();
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