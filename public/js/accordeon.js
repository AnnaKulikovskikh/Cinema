// const url = 'http://127.0.0.1:8000/admin/index'
// fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data))

const hallsData = [
    {
        id: 0,
        name: 'Holly',
        rows: 2,
        cols: 3,
        seats:  ['st','st','st','st','st','st'],
        price: 200,
        price_vio: 400,
    },
    {
        id: 1,
        name: 'Bolly',
        rows: 2,
        cols: 4,
        seats:  ['st','st','st','st','st','st','st','st'],
        price: 250,
        price_vio: 350,
    }
]

let choosenHall = hallsData.length - 1


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

// const hallsTable = document.querySelector('.data-halls')
// const hallsBD = hallsTable.dataset.halls

// console.log(JSON.stringify(hallsBD))

const hallsList = [...document.getElementsByName('chairs-hall')]
const chooseForm = document.querySelector('.choose-form')

let hallID = hallsList[hallsList.length - 1].value
for (let i = 0; i < hallsList.length; i++){
    hallsList[i].addEventListener('input', function(){
        hallConfigurate(i)
        // const opt = {
        //     method: 'POST',
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     },
        //     body: JSON.stringify({
        //         completed: true
        //     })
        // }

        // fetch('/halls')
        //     .then(res => res.json())
        //     .then(data => console.log(data))

        // hallID = hallsList[i].value
        // console.log(hallID)
        //chooseForm.action =  chooseForm.action + '/' + i
    })
}

// отображение зала из JS


//количество рядов и мест в них
document.querySelector('.rows').onchange = (e) => {
    hallsData[choosenHall].rows =  e.target.value
}

document.querySelector('.cols').onchange = (e) => {
    hallsData[choosenHall].cols =  e.target.value
}

//изменение вида кресла
function hallConfigurate(i) {
    // hallsData   //перечень залов якобы взятый из php
    choosenHall = i
    let rows = hallsData[choosenHall].rows
    let cols = hallsData[choosenHall].cols
    let seatsArray = hallsData[choosenHall].seats  //типы кресел с сервера, массив ['st', 'st', 'st']
    const wrapper = document.querySelector('.conf-step__hall-wrapper')
    let add = ''
    for (let i = 0; i< rows; i++) {
        add += '<div class="conf-step__row">'
        for (let j = 0; j < cols; j++) {
            add += '<span class="seat conf-step__chair conf-step__chair_standart"></span>'
        }
        add += '</div>'
    }

    wrapper.innerHTML = add

    const seats = [...document.getElementsByClassName('seat')] // элементы DOM обозрачающие кресла
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

}
