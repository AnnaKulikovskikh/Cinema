<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        //Auth::login($user, $remember = true);

        // $credentials = $request->validate([
        //     'email' => ['required', 'email'],
        //     'password' => ['required'],
        // ]);
        
        // if (Auth::attempt($credentials)) {
        //     $request->session()->regenerate();
        //     return redirect('/admin/index');
        // }

        // return back()->withErrors([
        //     'email' => 'The provided credentials do not match our records.',
        // ]);
            if ($request->input('mail') === 'user-1@mail.ru' && $request->input('pwd') === '12345678') {
            return redirect('/admin/index'); 
        }
        return redirect()->back();
    }

    // public function result(Request $request)
    // {
    //     // $user = Auth::user();
    //     // if (Auth::check) {
    //     //     return redirect('/admin/index');
    //     // }
    //     //app('log')->info($user);

    //     if ($request->input('mail') === 'user-1@mail.ru' && $request->input('pwd') === '12345678') {
    //         // dump($request->input('mail'));
    //         // $value = $request->session()->get('counter', 1);
    //         // $request->session()->put('counter', $value + 1);
    //         // dump($value);
    //         return redirect('/admin/index'); 
    //     }
    //     return redirect()->back();
    // }

    public function form()
    {
        return view('admin.login');
    }
}
