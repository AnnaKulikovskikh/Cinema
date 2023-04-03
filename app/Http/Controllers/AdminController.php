<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function login(){
        $note = new User;

        $note->name = "Admin";
        $note->email = "admin@mail.ru";
        $note->password = "123";
        $note->is_admin = true;

        $notes = User::all();
        dump($notes);
        return view('admin.login');
    }

    public function index(){
        return view('admin.index');
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
