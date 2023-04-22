// const url = 'http://127.0.0.1:8000/admin/index'
// fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data))


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
        const hallID = delHall[i].closest('li').dataset.id
        popup[1].classList.add('active')
        trashForm.action =  trashForm.action + '/' + hallID
    })
}

//кнопка "Отменить"
const abort = [...document.querySelectorAll('.abort')]
const dismiss = [...document.querySelectorAll('.popup__dismiss')]

for (let i = 0; i < abort.length; i++) {
    abort[i].addEventListener('click', close)
}

for (let i = 0; i < dismiss.length; i++) {
    dismiss[i].addEventListener('click', close)
}

function close(e) {
    e.preventDefault()
    for (let i = 0; i < 5; i++) {
        if (popup[i].classList.contains('active')) {
            popup[i].classList.remove('active')
        }
    }
}

//выбор зала для конфигураций
const hallsTable = document.querySelector('.data-halls')
const hallsBD = hallsTable.dataset.halls

console.log(JSON.stringify(hallsBD))

const hallsList = [...document.getElementsByName('chairs-hall')]
const chooseForm = document.querySelector('.choose-form')

//let hallID = hallsList[hallsList.length - 1].value
for (let i = 0; i < hallsList.length; i++){
    hallsList[i].addEventListener('input', function(){

        const opt = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                completed: true
            })
        }

        fetch('/halls')
            .then(res => res.json())
            .then(data => console.log(data))

        //hallID = hallsList[i].value
        //console.log(hallID)
        //chooseForm.action =  chooseForm.action + '/' + i
    })
}

//изменение вида кресла

//const a = document.getElementsByName('rows')
// console.log(a)
// console.log(document.getElementsByName('rows').placeholder)
// console.log(document.getElementsByName('rows').value)
// console.log(document.getElementsByName('rows').classList)

let rows = 2 //цифру надо взять из index.blade
let cols = 3 //цифру надо взять из index.blade
const seatsArray = ['st', 'st', 'st', 'st', 'st', 'st'] //массив надо взять из index.blade, например из цикла по seats, а потом вернуть в php
const seats = [...document.getElementsByClassName('seat')]
for (let i = 0; i < seats.length; i++){
    seats[i].addEventListener('click', function(){
        if (seatsArray[i] == 'st') {
            seats[i].classList.toggle('conf-step__chair_standart')
            seats[i].classList.toggle('conf-step__chair_vip')
            seatsArray[i] ='vip'
        } else if (seatsArray[i] == 'disable') {
            seats[i].classList.toggle('conf-step__chair_disabled')
            seats[i].classList.toggle('conf-step__chair_standart')
            seatsArray[i] ='st'
        } else {
            seats[i].classList.toggle('conf-step__chair_vip')
            seats[i].classList.toggle('conf-step__chair_disabled')
            seatsArray[i] = 'disable'
        }
    })
}