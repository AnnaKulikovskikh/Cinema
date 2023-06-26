<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function update(Request $request, int $hall)
    {
        //$hall = Hall::query()->findOrFail($hall);
        $hall->fill($request->all());
        $hall->save();
        return response()->json($hall);
    }

    public function updateSeats(Request $request, int $id)
    {
        Seat::query()->where(['hall_id' => $id])->delete();
        $newSeats = $request->json();
        foreach($newSeats as $newSeat)
        {
            Seat::query()->create($newSeat);
        }
        $seats = Seat::all();
        return response()->json($seats);
    }
}
