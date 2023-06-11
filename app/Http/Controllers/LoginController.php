<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $user = User::query()->firstWhere(['email' => $request->input('mail')]);
        if ($user && Hash::check($request->input('pwd'), $user->password)) {
            Auth::login($user);
            return redirect('/admin/index');
        }
        $text = 'Пользователь не найден или введён неверный пароль.';
        return redirect()->back()->withErrors(['mail' => $text]);
    }

    public function form()
    {
        return view('admin.login');
    }
}
