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

    public function add_hall(Request $request)
    {
        $hall = new Hall;
        $hall->name = $request->input('name');
        $hall->seats = ['st','st','st','st','st','st','st','st'];
        $hall->save();
        return redirect()->back();
    }

    public function del_hall(Request $request, $id)
    {
        // dump($request);
        
        //Hall::destroy($id);
        return redirect('admin/index');
    }
}
