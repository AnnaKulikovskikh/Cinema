
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
            <form action="" method="post" accept-charset="utf-8">
            <label class="conf-step__label conf-step__label-fullsize" for="name">
                Название зала
                <input class="conf-step__inputв" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="name" required>
            </label>
            <div class="conf-step__buttons text-center">
                <input type="submit" value="Добавить зал" class="conf-step__button conf-step__button-accent">
                <a href="{{ route('index') }}"><button class="conf-step__button conf-step__button-regular">Отменить</button></a>            
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>