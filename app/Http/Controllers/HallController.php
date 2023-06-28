<?php

namespace App\Http\Controllers;

use App\Http\Requests\HallStoreRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function addHall(HallStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $hall = Hall::create([
            'name' => $validated['name']
        ]);
        
        for ($i = 0; $i < 6; $i++) {
            Seat::create([
                'hall_id' => $hall->id,
                'type_seat' => 'st',
            ]);
        }
        return redirect()->back();
    }

    public function deleteHall(Request $request, int $id): RedirectResponse
    {
        $sessions = Session::all();
        foreach ($sessions as $session) {
            if ($session->hall_id === $id) {
                Session::destroy($session->id);
            }
        }
        Seat::query()->where(['hall_id' => $id])->delete();
        Hall::destroy($id);
        return redirect('admin/index');
    }

    public function update(Request $request, Hall $hall)
    {
        $hall->fill($request->all());
        $hall->save();
        return response()->json($hall);
    }

    public function updateSeats(Request $request, int $id)
    {
        Seat::query()->where(['hall_id' => $id])->delete();
        $newSeats = $request->json();
        foreach($newSeats as $newSeat) {
            Seat::query()->create($newSeat);
        }
        $seats = Seat::all();
        return response()->json($seats);
    }
}
