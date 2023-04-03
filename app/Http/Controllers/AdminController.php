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
        return view('login');
    }

    public function index(){
        return view('index');
    }
}
