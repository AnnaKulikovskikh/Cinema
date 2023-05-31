<div class="popup" id="addShowPopup">
  <div class="popup__container">
    <div class="popup__content">
      <div class="popup__header">
        <h2 class="popup__title">
          Добавление сеанса
          <a class="popup__dismiss" href="#"><img src="/i/close.png" alt="Закрыть"></a>
        </h2>

      </div>
      <div class="popup__wrapper">
        <form action="add_seance" method="post" accept-charset="utf-8" id="add_seance">
          @csrf
          <label class="conf-step__label conf-step__label-fullsize" for="hall">
            Название зала
            <select class="conf-step__input" name="hall" required>
              @foreach ($halls as $hall)
                <option value="{{$hall->id}}" selected>{{$hall->name}}</option>
              @endforeach
            </select>
          </label>
          <label class="conf-step__label conf-step__label-fullsize" for="start_time">
            Время начала
            <input class="conf-step__input" type="time" value="00:00" name="start_time" required>
          </label>

          <div class="conf-step__buttons text-center">
            <input type="submit" value="Добавить" class="conf-step__button conf-step__button-accent">
            <button class="abort conf-step__button conf-step__button-regular">Отменить</button>            
          </div>
        </form>
      </div>
    </div>
  </div>
</div>