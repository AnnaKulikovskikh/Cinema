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
  
  <main class="conf-steps">
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Управление залами</h2>
      </header>
      <div class="conf-step__wrapper">
        <p class="conf-step__paragraph">Доступные залы:</p>
        <ul class="conf-step__list">
          <li>Зал 1
            <button class="conf-step__button conf-step__button-trash"></button>
          </li>
          <li>Зал 2
            <button class="conf-step__button conf-step__button-trash"></button>
          </li>
        </ul>

        <button class="conf-step__button conf-step__button-accent">Создать зал</button>
        
        <x-admin/hallAdd />
        <x-admin/hallDel />
        @php
          require_once('../resources/popup/hallAdd.php');
        @endphp
      </div>
    </section>
  </main>



  <script src="/js/accordeon.js"></script>
</body>
</html>

