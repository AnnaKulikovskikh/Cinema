<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function result(Request $request)
    {
        // dump($request->input('mail'));
		// dump($request->input('pwd'));
        //dump($request->session());
        if ($request->input('mail') === 'user-1@mail.ru' && $request->input('pwd') === '12345678') {
            // dump($request->input('mail'));
            // $value = $request->session()->get('counter', 1);
            // $request->session()->put('counter', $value + 1);
            // dump($value);
            return redirect('/admin/index'); 
        }
        return redirect()->back();
    }

    public function form()
    {
        return view('admin.login');
    }
}
