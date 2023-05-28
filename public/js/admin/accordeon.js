import addDelHall from "./addDelHall.js"
import resizeHall from "./resizeHall.js"
import hallConfigurate from "./hallConfigurate.js"
import addDelMovie from "./addDelMovie.js"
import addSeance from "./addSeance.js"
import delSeance from "./delSeance.js"
import viewSeances from "./viewSeances.js"
import inputError from "./inputError.js"

//сворачивание разделов
const headers = Array.from(document.querySelectorAll('.conf-step__header'));
headers.forEach(header => header.addEventListener('click', () => {
  header.classList.toggle('conf-step__header_closed');
  header.classList.toggle('conf-step__header_opened');
}));

//получение данных с сервера
//получение таблицы с залами с сервера
const hallsTable = document.querySelector('.data-halls')
const hallsData = JSON.parse(hallsTable.value)
hallsData.map(hall => {
    const arr = []
    for (let i = 0; i < hall.seat.length; i++) {
        arr.push(hall.seat[i].type_seat)
    }
    hall.seat = arr
})
//установление выбранного зала для отображения
let choosenHall = hallsData.length - 1
if (hallsData.length > 0) hallConfigurate(hallsData, choosenHall)

//получение кресел
const seatTable = document.querySelector('.data-seats')
const seatData = JSON.parse(seatTable.value)
//console.log(seatData)

//получение фильмов
const moviesTable = document.querySelector('.data-movies')
const moviesData = JSON.parse(moviesTable.value).data
console.log(moviesData)

//получение сеансов
const seancesTable = document.querySelector('.data-seances')
const seancesData = JSON.parse(seancesTable.value)
console.log(seancesData)


//массив из 6 всплывающих окон
const popup = [...document.querySelectorAll('.popup')]

//добавление-удаление зала
addDelHall(popup)

//проверка правильности ввода данных
inputError(moviesData, hallsData)

//кнопка "Отменить"
const abort = [...document.querySelectorAll('.abort')]
const dismiss = [...document.querySelectorAll('.popup__dismiss')]
const alert = [...document.querySelectorAll('.alert')]

for (let i = 0; i < abort.length; i++) {
    abort[i].addEventListener('click', close)
}

for (let i = 0; i < dismiss.length; i++) {
    dismiss[i].addEventListener('click', close)
}

function close(e) {
    e.preventDefault()
    for (let i = 0; i < alert.length; i++) {
        alert[i].textContent = null
    }
    for (let i = 0; i < popup.length; i++) {
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
        hallsList[i].checked = true
        hallConfigurate(hallsData, choosenHall)
    })

    hallsList[i].addEventListener('input', function(){
        choosenHall = i
        hallsList1[i].checked = true
        hallConfigurate(hallsData, choosenHall)
    })
}

//количество рядов и мест в них
document.querySelector('.rows').onchange = (e) => {
    resizeHall(hallsData, choosenHall,'rows', parseInt(e.target.value))
}

document.querySelector('.cols').onchange = (e) => {
    resizeHall(hallsData, choosenHall,'cols', parseInt(e.target.value))
}

//изменение цены
document.querySelector(".price").onchange = (e) => {
    const value = parseInt(e.target.value)
    if (!Number.isInteger(value) || value <= 0) {
        document.querySelector(".price").value = hallsData[choosenHall].price
        return null
    }
    hallsData[choosenHall].price = e.target.value
}

document.querySelector(".vip_price").onchange = (e) => {
    const value = parseInt(e.target.value)
    if (!Number.isInteger(value) || value <= 0) {
        document.querySelector(".vip_price").value = hallsData[choosenHall].price_vip
        return null
    }
    hallsData[choosenHall].price_vip = e.target.value
}

//сохранение hall_update
const formUpdate = document.getElementById("hall_update")
formUpdate.onsubmit = function(e){
    e.preventDefault()

    // const seatsArr1 = []
    // const seatsArr = []
    // for (let i = 0; i < hallsData[choosenHall].seat.length; i++) {
    //     seatsArr1.push({id: i, hall_id: hallsData[choosenHall].id, type_seat: hallsData[choosenHall].seat[i]})
    //     seatsArr.push(hallsData[choosenHall].seat[i])
    // }
    // //document.querySelector(".data-seats").value = seatsArr1

    const seatArr = hallsData[choosenHall].seat
    delete hallsData[choosenHall].seat
    document.querySelector(".data-tables").value = hallsData[choosenHall]
    
    const options = {
        method: "POST",
        body: JSON.stringify(hallsData[choosenHall]),
        headers: {"Content-Type": "application/json"}
    }

    fetch(`/api/halls/${hallsData[choosenHall].id}`, options)
        .then(res=> {
            res.json()
            if (res.ok) {
                alert('save')
            } else {
                throw new Error(res.status)
            }
        })
        //.then(data=>console.log(data))

        const options1 = {
            method: "POST",
            body: JSON.stringify(seatsArr),
            headers: {"Content-Type": "application/json"}
        }

        fetch(`/api/seats/${hallsData[choosenHall].id}`, options1)
        .then(res=> {
            res.json()
            if (res.ok) {
                alert('save')
            } else {
                throw new Error(res.status)
            }
        })
        
}

//отмена сохранения cancel
const cancel = [...document.querySelectorAll('.cancel')]
cancel.forEach(item => {
    item.onclick = (e) => {
        e.preventDefault()
        location.reload()
    }
})


//добавить-удалить фильм
addDelMovie(popup, moviesData)

// добавить-удалить сеанс
addSeance(popup, hallsData, moviesData, seancesData)
delSeance(hallsData, moviesData, seancesData)


// отобразить сеанс
viewSeances(hallsData, moviesData, seancesData)

//сохранить сеансы
const formSeance = document.getElementById("seance_update")
formSeance.onsubmit = function(e){
    e.preventDefault()

    //const seances = []
    seancesData.forEach(seance => delete seance.movie)
    console.log(seancesData)
    
    const options = {
        method: "POST",
        body: JSON.stringify(seancesData),
        headers: {"Content-Type": "application/json"}
    }

    fetch(`/api/seances`, options)
        .then(res=> {
            res.json()
            if (res.ok) {
                alert('save')
            } else {
                throw new Error(res.status)
            }
        })
}