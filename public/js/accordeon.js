//массив из 5 всплывающих окон
const popup = [...document.querySelectorAll('.popup')]

//добавление-удаление зала
const addHall = document.querySelector('.add_hall')
const delHall = [...document.querySelectorAll('.conf-step__button-trash')]

addHall.onclick = function() {
    popup[0].classList.add('active')
}

for (let i = 0; i <delHall.length; i++) {
    delHall[i].addEventListener('click', () => {
        const nameHall = document.querySelector('.conf-step__paragraph')
        const trashForm = document.querySelector('.trash-form')
        nameHall.querySelector('span').textContent = delHall[i].closest('li').textContent
        const hallID = delHall[i].closest('li').className
        popup[1].classList.add('active')
        trashForm.action =  trashForm.action + '/' + hallID
    })
}

//кнопка "Отменить"
const abort = [...document.querySelectorAll('.conf-step__button-regular')]
const dismiss = [...document.querySelectorAll('.popup__dismiss')]

for (let i = 0; i < abort.length; i++) {
    abort[i].addEventListener('click', close)
}

for (let i = 0; i < dismiss.length; i++) {
    dismiss[i].addEventListener('click', close)
}

function close() {
    for (let i = 0; i < 5; i++) {
        if (popup[i].classList.contains('active')) {
            popup[i].classList.remove('active')
        }
    }
}

//выбор зала для конфигураций
const hallsList = [...document.getElementsByName('chairs-hall')]
let hallID = hallsList[hallsList.length - 1].value
for (let i = 0; i < hallsList.length; i++){
    hallsList[i].addEventListener('input', function(){
        hallID = hallsList[i].value
    })
}

//изменение вида кресла
const rows = 2
const cols = 3
const seatsArray = ['st', 'st', 'st', 'st', 'st', 'st']
const seats = [...document.getElementsByClassName('seat')]
for (let i = 0; i < seats.length; i++){
    seats[i].addEventListener('click', function(){
        if (seatsArray[i] == 'st') {
            seats[i].classList.toggle('conf-step__chair_standart')
            seats[i].classList.toggle('conf-step__chair_vip')
            seatsArray[i] ='vip'
        } else if (seatsArray[i] == 'disable') {
            seats[i].classList.toggle('conf-step__chair_disable')
            seats[i].classList.toggle('conf-step__chair_standart')
            seatsArray[i] ='st'
        } else {
            seats[i].classList.toggle('conf-step__chair_vip')
            seats[i].classList.toggle('conf-step__chair_disable')
            seatsArray[i] = 'disable'
        }
    })
}