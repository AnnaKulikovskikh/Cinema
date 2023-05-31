<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Session;

class SeanceController extends Controller
{
    public function update(Request $request)
    {
        //app('log')->info($request->all());
        $seances = $request->json();
        Session::query()->delete();
        foreach ($seances as $seance)
        {
            Session::query()->create($seance);
        }
        $seances = Session::with('movie')->get();
        return response()->json($seances);
    }

}
