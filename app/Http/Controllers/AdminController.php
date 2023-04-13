<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Hall;

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

    public function addHall(Request $request)
    {
        $hall = new Hall;
        $hall->name = $request->input('name');
        $hall->seats = ['st','st','st','st','st','st','st','st'];
        $hall->save();
        return redirect()->back();
    }

    public function deleteHall(Request $request, $id)
    {
        Hall::destroy($id-1);
        return redirect('admin/index');
    }
}
