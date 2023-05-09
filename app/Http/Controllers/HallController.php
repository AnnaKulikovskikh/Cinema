<?php

namespace App\Http\Controllers;
use App\Models\Hall;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function update(Request $request, int $id)
    {
        app('log')->info($request->all());
        $halls = Hall::query()->findOrFail($id);
        $halls->fill($request->all());
        $halls->save();
        return response()->json($halls);
    }
}
