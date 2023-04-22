<?php

namespace App\Http\Controllers;
use App\Models\Hall;

use Illuminate\Http\Request;

class HallController extends Controller
{
    public function take(Request $request): JsonResponse
    {
        $halls = Hall::paginate(7);
        return response() -> json($halls);
    }
}
