<?php

namespace App\Http\Controllers;
use App\Models\Hall;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function update(Request $request)
    {
        dump($request);
        $updatedHall = 1;
        return response()->json($updatedHall);
    }
}
