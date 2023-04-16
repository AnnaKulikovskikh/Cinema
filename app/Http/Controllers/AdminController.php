<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Hall;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index()
    {
        $halls = Hall::paginate();
        return view('admin.index', ['halls' => $halls]);
    }

    public function addHall(Request $request): RedirectResponse
    {
        Hall::create([
            "name" => $request->input('name'),
            "seats" => ['st','st','st','st','st','st','st','st'],
        ]);
        return redirect()->back();
    }

    public function deleteHall(Request $request, int $id): RedirectResponse
    {
        Hall::destroy($id);
        return redirect('admin/index');
    }

    public function chooseHall(Request $request, int $id): RedirectResponse
    {
        dd($id);
        //return view('admin.index', ['halls' => $halls, 'numberHall' = $id]);
    }
    
}
