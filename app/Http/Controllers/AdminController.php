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

    public function test()
    {
        return view('admin.test', ['text' => 'this is content of the page']);
    }


    public function index()
    {
        return view('admin.index');
    }
}
