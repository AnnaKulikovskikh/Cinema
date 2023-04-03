<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ИдёмВКино</title>
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/styles.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
</head>

<body>
  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    <span class="page-header__subtitle">Администраторррская</span>
  </header>
  
  <main class="conf-steps">

    <div class="popup">
    <div class="popup__container">
        <div class="popup__content">
        <div class="popup__header">
            <h2 class="popup__title">
            Добавление зала
            <a class="popup__dismiss" href="#"><img src="i/close.png" alt="Закрыть"></a>
            </h2>

        </div>
        <div class="popup__wrapper">
            <form action="add_hall" method="post" accept-charset="utf-8">
            <label class="conf-step__label conf-step__label-fullsize" for="name">
                Название зала
                <input class="conf-step__inputв" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="name" required>
            </label>
            <div class="conf-step__buttons text-center">
                <input type="submit" value="Добавить зал" class="conf-step__button conf-step__button-accent">
                <button class="conf-step__button conf-step__button-regular">Отменить</button>            
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>

</main>
</body>
</html>