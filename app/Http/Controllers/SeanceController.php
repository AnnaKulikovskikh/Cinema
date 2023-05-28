<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Session;

class SeanceController extends Controller
{
    public function update(Request $request)
    {
        app('log')->info($request->all());
        Session::destroy(all);
        for ($i = 0; $i < count($request); $i++)
        {
            Session::create([
                "start" => $request['start_time'],
                "hall_id" => $request['hall_id'],
                "movie_id" => $request['movie_id'],
            ]);
        }
        $seances = Session::with('movie')->get();
        return response()->json($seances);
    }

}
