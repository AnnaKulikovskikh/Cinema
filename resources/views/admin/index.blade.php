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
  @include('popup.movie_del')
  <!-- все залы из table-halls в $halls -->
  <input class="data-halls" type="hidden" value="{{ json_encode($halls) }}"/>
  <input class="data-movies" type="hidden" value="{{ json_encode($movies) }}"/>
  <input class="data-seances" type="hidden" value="{{ json_encode($seances) }}"/>
  <input class="data-seats" type="hidden" value="{{ json_encode($seats) }}"/>
  
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
            <li data-id="{{ $hall->id }}">{{ $hall->name}}
              <button class="conf-step__button conf-step__button-trash trash_hall"></button>
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
            <label class="conf-step__label">Рядов, шт
              <input type="text" class="conf-step__input rows" placeholder="2" onkeydown="if(event.keyCode==13){return false;}"/>
            </label>
            <span class="multiplier">x</span>
            <label class="conf-step__label">Мест, шт
              <input type="text" class="conf-step__input cols" placeholder="3" onkeydown="if(event.keyCode==13){return false;}"/>
            </label>
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
            <button class="conf-step__button conf-step__button-regular cancel">Отмена</button>
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

      
          <ul class="conf-step__selectors-box">
            @foreach ($halls as $hall)
              <li><input type="radio" class="conf-step__radio" name="chairs-hall1" value="{{ $hall->id}}" checked><span class="conf-step__selector">{{ $hall->name }}</span></li>
            @endforeach
          </ul>
        
            
          <p class="conf-step__paragraph">Установите цены для типов кресел:</p>
            <div class="conf-step__legend">
              <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input price" placeholder="0" ></label>
              за <span class="conf-step__chair conf-step__chair_standart"></span> обычные кресла
            </div>  
            <div class="conf-step__legend">
              <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input vip_price" placeholder="0"></label>
              за <span class="conf-step__chair conf-step__chair_vip"></span> VIP кресла
            </div>  
          
          <fieldset from="hall_update" class="conf-step__buttons text-center">
            <button class="conf-step__button conf-step__button-regular cancel">Отмена</button>
            <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
          </fieldset>  
        </div>
      </section>
    </form>  

  
      <section class="conf-step">
        <header class="conf-step__header conf-step__header_opened">
          <h2 class="conf-step__title">Сетка сеансов</h2>
        </header>

        <form action="/api/seance" id="seance_update" method="post">
          <div class="conf-step__wrapper">
            <p class="conf-step__paragraph">
              <button class="conf-step__button conf-step__button-accent add_movie">Добавить фильм</button>
            </p>

            <div class="conf-step__movies">
            </div>

            <div class="conf-step__seances">
            </div>
          
            <fieldset class="conf-step__buttons text-center" form="seance_update">
              <button class="conf-step__button conf-step__button-regular cancel">Отмена</button>
              <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
            </fieldset>  
          </div>
        </form>
      </section>
    
    
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Открыть продажи</h2>
      </header>
      <div class="conf-step__wrapper text-center">
        <p class="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button class="conf-step__button conf-step__button-accent" id="open_sales">Открыть продажу билетов</button>
      </div>
    </section>    
  </main>



  <script type="module" src="/js/admin/accordeon.js"></script>
  <script type="module" src="/js/admin/addDelHall.js"></script>
  <script type="module" src="/js/admin/resizeHall.js"></script>
  <script type="module" src="/js/admin/hallConfigurate.js"></script>
  <script type="module" src="/js/admin/addDelMovie.js"></script>
  <script type="module" src="/js/admin/addSeance.js"></script>
  <script type="module" src="/js/admin/delSeance.js"></script>
  <script type="module" src="/js/admin/viewSeances.js"></script>
  <script type="module" src="/js/admin/inputError.js"></script>
  <script type="module" src="/js/admin/sortSeances.js"></script>
  <script type="module" src="/js/admin/timeToMinutes.js"></script>
</body>
</html>

