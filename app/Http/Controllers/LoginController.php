<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function result(Request $request){
        // dump($request->input('mail'));
		// dump($request->input('pwd'));
        if ($request->input('mail') === 'user-1@mail.ru' and $request->input('pwd') === '12345678') {
            return redirect('/admin/index'); 
        }
    }

    public function form(){
        return view('admin.login');
    }
}
