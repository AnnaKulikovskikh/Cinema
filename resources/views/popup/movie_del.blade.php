<div class="popup" id="delMoviePopup">
  <div class="popup__container">
    <div class="popup__content">
      <div class="popup__header">
        <h2 class="popup__title">
          Удаление фильма
          <a class="popup__dismiss" href="#"><img src="/i/close.png" alt="Закрыть"></a>
        </h2>

      </div>
      <div class="popup__wrapper">
        <form action="/admin/delete_movie" method="post" accept-charset="utf-8" id="delete_movie">
        @csrf
          <p class="conf-step__paragraph">Вы действительно хотите удалить фильм <span></span>?</p>
          <!-- В span будет подставляться название зала -->
          <div class="conf-step__buttons text-center">
            <input type="submit" value="Удалить" class="conf-step__button conf-step__button-accent">
            <button class="abort conf-step__button conf-step__button-regular">Отменить</button>            
          </div>
        </form>
      </div>
    </div>
  </div>
</div>