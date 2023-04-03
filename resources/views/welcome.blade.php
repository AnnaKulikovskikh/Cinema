<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>ИдёмВКино</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <style>
            button{width: 200px; height:50px; border-radius:0.5rem; font-size: 1rem; margin: 10px;}
            .center{display:flex; flex-direction:column;}
        </style>
    </head>
    <body>
        <div class="center">
            <a href="/admin/login"><button>Администратор</button></a>
            <a href="/user"><button>Гость</button></a>
        </div>    
    </body>
</html>
