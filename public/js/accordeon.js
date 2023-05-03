
//получение таблицы с залами с сервера
const hallsTable = document.querySelector('.data-halls')
const hallsData = JSON.parse(hallsTable.value).data
let choosenHall = hallsData.length - 1
hallConfigurate()


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
        //работает, потому что conf-step__paragraph в рорар для удаления встречается в первый раз
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

const hallsList = [...document.getElementsByName('chairs-hall')] //переключатели для вида зала
const hallsList1 = [...document.getElementsByName('chairs-hall1')] //переключатели для цены
const chooseForm = document.querySelector('.choose-form')

for (let i = 0; i < hallsList.length; i++){
    hallsList1[i].addEventListener('input', function(){
        choosenHall = i
        hallConfigurate()
    })

    hallsList[i].addEventListener('input', function(){
        choosenHall = i
        hallConfigurate()
    })
}

//количество рядов и мест в них
document.querySelector('.rows').onchange = (e) => {
    resizeHall('rows', e.target.value)
}

document.querySelector('.cols').onchange = (e) => {
    resizeHall('cols', e.target.value)
}

function resizeHall(dimension, value){
    for (let i = 0; i < hallsList.length; i++){
        if (hallsList[i].checked){
            choosenHall = i
            if (dimension === 'cols'){
                hallsData[choosenHall].cols = value
            } else {
                hallsData[choosenHall].rows = value
            }
            hallsData[choosenHall].seats = []
            for (let j = 0; j <  hallsData[choosenHall].rows *  hallsData[choosenHall].cols; j++) {
                hallsData[choosenHall].seats.push('st')
            }
        }
    }
    hallConfigurate()
}


// отображение зала из JS

function hallConfigurate() {
    // hallsData   //перечень залов
    //let seatsArray = hallsData[choosenHall].seats  //типы кресел с сервера, массив ['st', 'st', 'st']
    const wrapper = document.querySelector('.conf-step__hall-wrapper')

    let type = 'conf-step__chair_standart'
    let i = 0
    let addSeat = '' //  DOM-элемент для вставки отображения кресел

    for (let row = 0; row < hallsData[choosenHall].rows; row++) {
        addSeat += '<div class="conf-step__row">'
        for (let col = 0; col < hallsData[choosenHall].cols; col++) {
            if (hallsData[choosenHall].seats[i] === 'vip'){
                type = 'conf-step__chair_vip'
            } else if (hallsData[choosenHall].seats[i] === 'disabled'){
                type = 'conf-step__chair_disabled'
            } else {
                type = 'conf-step__chair_standart'
            }
            addSeat += `<span class="seat conf-step__chair ${type}"></span>`
            i++
        }
        addSeat += '</div>'
    }

    wrapper.innerHTML = addSeat

    //изменение вида кресла
    const seats = [...document.getElementsByClassName('seat')] // элементы DOM обозрачающие кресла
    for (let i = 0; i < seats.length; i++){
        seats[i].addEventListener('click', function(){
            if (hallsData[choosenHall].seats[i] == 'st') {
                seats[i].classList.toggle('conf-step__chair_standart')
                seats[i].classList.toggle('conf-step__chair_vip')
                hallsData[choosenHall].seats[i] = 'vip'
            } else if (hallsData[choosenHall].seats[i] == 'disabled') {
                seats[i].classList.toggle('conf-step__chair_disabled')
                seats[i].classList.toggle('conf-step__chair_standart')
                hallsData[choosenHall].seats[i] = 'st'
            } else {
                seats[i].classList.toggle('conf-step__chair_vip')
                seats[i].classList.toggle('conf-step__chair_disabled')
                hallsData[choosenHall].seats[i] = 'disabled'
            }
        })
    }
}

//сохранение hall_update
const formUpdate = document.getElementById("hall_update")
formUpdate.onsubmit = function(e){
    document.querySelector(".data-tables").value = hallsData[choosenHall]
    e.preventDefault()

    const options = {
        method: "POST",
        body: JSON.stringify(hallsData),
        headers: {"Content-Type": "application/json"}
    }

    fetch('/api/halls', options)
        .then(res => res.json())
        .then(data => console.log(data))
        // .then(res => res.json())
        // if (res.ok) {
        //     alert('save')
        // } else {
        //     throw new Error(res.status)
        // }
}