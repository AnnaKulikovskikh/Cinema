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

    public function index(){
        return view('admin.index');
    }

    public function addHall(){
        $hall = new Hall;
        view('admin.halladd');

    }

    public function hallAdd(){
        return view('admin.halladd');
    }

    public function hallDel(){
        return view('admin.halldel');
    }

    public function movieAdd(){
        return view('admin.movieadd');
    }

    public function showAdd(){
        return view('admin.showadd');
    }

    public function showDel(){
        return view('admin.showdel');
    }
}
