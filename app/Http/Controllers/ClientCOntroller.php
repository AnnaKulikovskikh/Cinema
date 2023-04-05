<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return view('client.index');
    }

    public function hall()
    {
        return view('client.hall');
    }

    public function payment()
    {
        return view('client.payment');
    }

    public function ticket()
    {
        return view('client.ticket');
    }
    
}
