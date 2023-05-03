<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ИдёмВКино</title>
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/styles.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
</head>

<body>

  @include('popup.hall_add');
  @include('popup.hall_del')
  @include('popup.movie_add')
  @include('popup.show_add')
  @include('popup.show_del')
  <!-- все залы из table-halls в $halls -->
  <input class="data-halls" type="hidden" value="{{ json_encode($halls) }}"/>
  
  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    <span class="page-header__subtitle">Администраторррская</span>
  </header>
  
  <main class="conf-steps">
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Управление залами</h2>
      </header>
      <div class="conf-step__wrapper">
        <p class="conf-step__paragraph">Доступные залы:</p>
        <ul class="conf-step__list">
          @foreach ($halls as $hall)
            <li data-id="{{ $hall->id }}">{{ $hall->id}} {{ $hall->name}}
              <button class="conf-step__button conf-step__button-trash"></button>
            </li>
          @endforeach
        </ul>

        <button class="conf-step__button conf-step__button-accent add_hall">Создать зал</button>

      </div>
    </section>

    <form action="/api/halls" id="hall_update" method="post">
    @csrf
    <input class="data-tables" type="hidden"/>

      <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
          <h2 class="conf-step__title">Конфигурация залов</h2>
        </header>
        <div class="conf-step__wrapper">
          <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>

          <ul class="conf-step__selectors-box">
            @foreach ($halls as $hall)
              <li><input type="radio" class="conf-step__radio" name="chairs-hall" value="{{ $hall->id}}" checked><span class="conf-step__selector">{{ $hall->name }}</span></li>
            @endforeach
          </ul>
        

          <p class="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
          <div class="conf-step__legend">
            <label class="conf-step__label">Рядов, шт<input type="text" class="conf-step__input rows" placeholder="2" ></label>
            <span class="multiplier">x</span>
            <label class="conf-step__label">Мест, шт<input type="text" class="conf-step__input cols" placeholder="3" ></label>
          </div>

          <p class="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
          <div class="conf-step__legend">
            <span class="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
            <span class="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
            <span class="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
            <p class="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
          </div>  


          <div class="conf-step__hall">
            <div class="conf-step__hall-wrapper">
  
            </div>
          </div>

          
          <fieldset from="hall_update" class="conf-step__buttons text-center">
            <button class="conf-step__button conf-step__button-regular abort">Отмена</button>
            <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
          </fieldset>                 
        </div>
      </section>



      
      <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
          <h2 class="conf-step__title">Конфигурация цен</h2>
        </header>
        <div class="conf-step__wrapper">
          <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <!-- <ul class="conf-step__selectors-box">
            <li><input type="radio" class="conf-step__radio" name="prices-hall" value="Зал 1"><span class="conf-step__selector">Зал 1</span></li>
            <li><input type="radio" class="conf-step__radio" name="prices-hall" value="Зал 2" checked><span class="conf-step__selector">Зал 2</span></li>
          </ul> -->

      
          <ul class="conf-step__selectors-box">
            @foreach ($halls as $hall)
              <li><input type="radio" class="conf-step__radio" name="chairs-hall1" value="{{ $hall->id}}" checked><span class="conf-step__selector">{{ $hall->name }}</span></li>
            @endforeach
          </ul>
        
            
          <p class="conf-step__paragraph">Установите цены для типов кресел:</p>
            <div class="conf-step__legend">
              <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input" placeholder="0" ></label>
              за <span class="conf-step__chair conf-step__chair_standart"></span> обычные кресла
            </div>  
            <div class="conf-step__legend">
              <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input" placeholder="0" value="350"></label>
              за <span class="conf-step__chair conf-step__chair_vip"></span> VIP кресла
            </div>  
          
          <fieldset from="hall_update" class="conf-step__buttons text-center">
            <button class="conf-step__button conf-step__button-regular">Отмена</button>
            <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
          </fieldset>  
        </div>
      </section>
      
      <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
          <h2 class="conf-step__title">Сетка сеансов</h2>
        </header>
        <div class="conf-step__wrapper">
          <p class="conf-step__paragraph">
            <button class="conf-step__button conf-step__button-accent">Добавить фильм</button>
          </p>
          <div class="conf-step__movies">
            <div class="conf-step__movie">
              <img class="conf-step__movie-poster" alt="poster" src="/i/poster.png">
              <h3 class="conf-step__movie-title">Звёздные войны XXIII: Атака клонированных клонов</h3>
              <p class="conf-step__movie-duration">130 минут</p>
            </div>
            
            <div class="conf-step__movie">
              <img class="conf-step__movie-poster" alt="poster" src="/i/poster.png">
              <h3 class="conf-step__movie-title">Миссия выполнима</h3>
              <p class="conf-step__movie-duration">120 минут</p>
            </div>
            
            <div class="conf-step__movie">
              <img class="conf-step__movie-poster" alt="poster" src="/i/poster.png">
              <h3 class="conf-step__movie-title">Серая пантера</h3>
              <p class="conf-step__movie-duration">90 минут</p>
            </div>
            
            <div class="conf-step__movie">
              <img class="conf-step__movie-poster" alt="poster" src="/i/poster.png">
              <h3 class="conf-step__movie-title">Движение вбок</h3>
              <p class="conf-step__movie-duration">95 минут</p>
            </div>   
            
            <div class="conf-step__movie">
              <img class="conf-step__movie-poster" alt="poster" src="/i/poster.png">
              <h3 class="conf-step__movie-title">Кот Да Винчи</h3>
              <p class="conf-step__movie-duration">100 минут</p>
            </div>            
          </div>
          
          <div class="conf-step__seances">
            <div class="conf-step__seances-hall">
              <h3 class="conf-step__seances-title">Зал 1</h3>
              <div class="conf-step__seances-timeline">
                <div class="conf-step__seances-movie" style="width: 60px; background-color: rgb(133, 255, 137); left: 0;">
                  <p class="conf-step__seances-movie-title">Миссия выполнима</p>
                  <p class="conf-step__seances-movie-start">00:00</p>
                </div>
                <div class="conf-step__seances-movie" style="width: 60px; background-color: rgb(133, 255, 137); left: 360px;">
                  <p class="conf-step__seances-movie-title">Миссия выполнима</p>
                  <p class="conf-step__seances-movie-start">12:00</p>
                </div>
                <div class="conf-step__seances-movie" style="width: 65px; background-color: rgb(202, 255, 133); left: 420px;">
                  <p class="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                  <p class="conf-step__seances-movie-start">14:00</p>
                </div>              
              </div>
            </div>
            <div class="conf-step__seances-hall">
              <h3 class="conf-step__seances-title">Зал 2</h3>
              <div class="conf-step__seances-timeline">
                <div class="conf-step__seances-movie" style="width: 65px; background-color: rgb(202, 255, 133); left: 595px;">
                  <p class="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                  <p class="conf-step__seances-movie-start">19:50</p>
                </div>
                <div class="conf-step__seances-movie" style="width: 60px; background-color: rgb(133, 255, 137); left: 660px;">
                  <p class="conf-step__seances-movie-title">Миссия выполнима</p>
                  <p class="conf-step__seances-movie-start">22:00</p>
                </div>              
              </div>
            </div>
          </div>
          
          <fieldset class="conf-step__buttons text-center">
            <button class="conf-step__button conf-step__button-regular">Отмена</button>
            <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
          </fieldset>  
        </div>
      </section>
    </form>  
    
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Открыть продажи</h2>
      </header>
      <div class="conf-step__wrapper text-center">
        <p class="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button class="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
      </div>
    </section>    
  </main>



  <script src="/js/accordeon.js"></script>
</body>
</html>

