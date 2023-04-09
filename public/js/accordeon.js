//массив из 5 всплывающих окон
const popup = [...document.querySelectorAll('.popup')]

//добавление-удаление зала
const addHall = document.querySelector('.add_hall')
const delHall = [...document.querySelectorAll('.conf-step__button-trash')]

addHall.onclick = function(e) {
    console.log(popup);
    popup[0].classList.add('active');
}

for (let i = 0; i <delHall.length; i++) {
    delHall[i].addEventListener('click', () => {
        console.log(i)
    })
}


//кнопка "Отменить"
const abort = document.querySelector('.conf-step__button-regular')
abort.onclick = function(e) {
    console.log('click');
    for (let i = 0; i < 5; i++) {
        if (popup[i].classList.contains('active')) {
            popup[i].classList.remove('active')
        }
    }
}