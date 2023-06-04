<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
  <title>Авторизация | ИдёмВКино</title>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/styles.css">
  
</head>

<body>

  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    <span class="page-header__subtitle">Администраторррская</span>
  </header>
  
  <main>
    <section class="login">
      <header class="login__header">
        <h2 class="login__title">Авторизация</h2>
      </header>
      <div class="login__wrapper">

        <form class="login__form" action="{{ route('login') }}" method="POST" accept-charset="utf-8">
          @csrf

          @if(isset($errors) && count($errors) > 0)
                @foreach($errors->all() as $error)
                  @php
                    $sentences = explode('\n', $error);
                  @endphp
                  @if (count($sentences) > 1)
                    @foreach ($sentences as $sentence)
                      <p class="login__error">{{ $sentence }}</p>
                    @endforeach
                  @else
                    <p class="login__error">{{ $error }}</p>
                  @endif
                @endforeach
          @endif

          <label class="login__label" for="mail">
            E-mail
            <input class="login__input" type="mail" placeholder="example@domain.xyz" name="mail" required>
          </label>
          <label class="login__label" for="pwd">
            Пароль
            <input class="login__input" type="password" placeholder="" name="pwd" required>
          </label>
          <div class="text-center">
            <input value="Авторизоваться" type="submit" class="login__button">
          </div>
        </form>

      </div>
    </section>
  </main>

</body>
</html>