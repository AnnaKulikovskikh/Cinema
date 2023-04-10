//массив из 5 всплывающих окон
const popup = [...document.querySelectorAll('.popup')]

//добавление-удаление зала
const addHall = document.querySelector('.add_hall')
const delHall = [...document.querySelectorAll('.conf-step__button-trash')]

addHall.onclick = function(e) {
    popup[0].classList.add('active');
}

for (let i = 0; i <delHall.length; i++) {
    delHall[i].addEventListener('click', () => {
        console.log(i);
        popup[1].classList.add('active');
    })
}


//кнопка "Отменить"
const abort = [...document.querySelector('.conf-step__button-regular')]
const dismiss = [...document.querySelectorAll('.popup__dismiss')]

for (let i = 0; i < abort.length; i++) {
    abort[i].addEventListener('click', close)
}

for (let i = 0; i < dismiss.length; i++) {
    dismiss[i].addEventListener('click', close)
}

function close() {
    console.log('close')
    for (let i = 0; i < 5; i++) {
        if (popup[i].classList.contains('active')) {
            popup[i].classList.remove('active')
        }
    }
}