<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index()
    {
        return view('admin.index');
    }

    public function add_hall(Request $request)
    {
        $token = $request->session()->token();
        $token = csrf_token();
        dump($request->input('name'));
        return redirect()->back();
        //return redirect('/admin/index');
    }
}
