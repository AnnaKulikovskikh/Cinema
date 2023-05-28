<?php

namespace App\Http\Controllers;
use App\Models\Hall;
use App\Models\Seat;
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

    public function updateSeats(Request $request, int $id)
    {
        //app('log')->info($request);
        $halls = Hall::query()->findOrFail($id);
        $count = $halls->rows * $halls->cols;
        //app('log')->info($halls->rows * $halls->cols);
       Seat::query()->where(['hall_id' => $id])->delete();
        

        //$seats = [];
        for ($i = 0; $i < $count; $i++) 
        {
            //app('log')->info($request[i]);
            Seat::create([
                "hall_id" => $id,
                "type_seat" => $request[i],
            ]);
        }
        $seats = Seat::query()->where(['hall_id' => $id])->get();
        return response()->json($seats);
    }
}
