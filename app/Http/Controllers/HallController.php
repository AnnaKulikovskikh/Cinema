<?php

namespace App\Http\Controllers;
use App\Models\Hall;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function update(Request $request)
    {
        app('log')->info($request->all());
        $halls = Hall::all();
        $halls = $request;
        $halls->save();
        $updateHalls = $request;
        return response()->json($updateHalls);
    }
}
