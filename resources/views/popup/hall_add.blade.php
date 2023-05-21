<div class="popup">
  <div class="popup__container">
    <div class="popup__content">
      <div class="popup__header">
        <h2 class="popup__title">
          Добавление зала
          <a class="popup__dismiss" href="#"><img src="/i/close.png" alt="Закрыть"></a>
        </h2>

      </div>
      <div class="popup__wrapper">
        <form action="/admin/add_hall" method="post" accept-charset="utf-8">
            
          @csrf

          <label class="conf-step__label conf-step__label-fullsize" for="name">
            Название зала
            <input class="conf-step__input" type="text" id="name" placeholder="Например, &laquo;Зал 1&raquo;" name="name" required>
          </label>
          @if ($errors->any())
            <div class="alert alert-danger">
              <ul>
                  @foreach ($errors->all() as $error)
                      <li>{{ $error }}</li>
                  @endforeach
              </ul>
            </div>
          @endif
          <div class="conf-step__buttons text-center">
            <input type="submit" value="Добавить зал" class="conf-step__button conf-step__button-accent">
            <button class="abort conf-step__button conf-step__button-regular">Отменить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>