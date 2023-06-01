 //получение данных с сервера
//получение таблицы с сеансами с сервера
const seanceTable = document.querySelector('.data-seance')
const seance = JSON.parse(seanceTable.value)
console.log(seance)

const seatsTable = document.querySelector('.data-seats')
const seats = JSON.parse(seatsTable.value)
//console.log(seats)

document.querySelector('.buying__info-title').textContent = seance.movie.title
document.querySelector('.buying__info-start').textContent = `Начало сеанса: ${seance.start}`
document.querySelector('.buying__info-hall').textContent = `Зал ${seance.hall.name}`

//отображение кресел

let addSeats = ''
let s = 0
const classSeat = ['buying-scheme__chair_standart', 'buying-scheme__chair_disabled', 'buying-scheme__chair_vip', 'buying-scheme__chair_taken', 'buying-scheme__chair_selected']
let typeSeat = classSeat[0]
for (let i = 0; i < seance.hall.rows; i++) {
    addSeats += '<div class="buying-scheme__row">'
    for (let j = 0; j < seance.hall.cols; j++) {
        if (seats[s].type_seat == 'st') {
            typeSeat = 'buying-scheme__chair_standart'
        } else if (seats[s].type_seat == 'disabled') {
            typeSeat = classSeat[1]
        } else if (seats[s].type_seat == 'vip') {
            typeSeat = classSeat[2]
        } else {
            typeSeat = classSeat[3]
        }
        addSeats += `<span class="buying-scheme__chair ${typeSeat}"></span>`
        s++
    }
    addSeats += '</div>'
}
document.querySelector('.buying-scheme__wrapper').innerHTML = addSeats

//выбор кресел
const chosenChairs = []
const rowAndSeat = []
const chairs = [...document.querySelectorAll('.buying-scheme__chair')]
for (let i = 0; i < chairs.length; i++) {
    chairs[i].onclick = () => {
        if (chairs[i].classList.contains(classSeat[1]) || chairs[i].classList.contains(classSeat[3])) {
            return null
        }
        if (chairs[i].classList.contains(classSeat[4])){
            chairs[i].classList.remove(classSeat[4])
            if (seats[i].type_seat == 'vip') {
                chairs[i].classList.add(classSeat[2])
            } else {
                chairs[i].classList.add(classSeat[0])
            }
            seats.filter(seat => seat.id != seats[i].id)
            return null
        }
        if (chairs[i].classList.contains(classSeat[0])){
            chairs[i].classList.remove(classSeat[0])
            chairs[i].classList.add(classSeat[4])
            chosenChairs.push(seats[i])
            rowAndSeat.push(seatInHall(i))
            return null
        }
        if (chairs[i].classList.contains(classSeat[2])){
            chairs[i].classList.remove(classSeat[2])
            chairs[i].classList.add(classSeat[4])
            chosenChairs.push(seats[i])
            rowAndSeat.push(seatInHall(i))
            return null
        }
    }
}

document.querySelector('.acceptin-button').addEventListener('click', (e) => {
    e.preventDefault()
    if (chosenChairs.length < 1) return null
    //seance.selected_seats = chosenChairs
    seance.selected_seats = rowAndSeat

    //console.log(chosenChairs)
    console.log(rowAndSeat)
    //console.log(seance)

    const options = {
        method: "POST",
        body: JSON.stringify(seance),
        headers: {"Content-Type": "application/json"}
    }

    fetch(`/api/seances/${seance.id}`, options)
        // .then(res=> {
        //     res.json()
        //     if (res.ok) {
        //         alert('save')
        //     } else {
        //         throw new Error(res.status)
        //     }
        // })


    location.href = `/client/payment/${seance.id}`
    //передать выбранные seats, чтобы потом перезаписать как проданные
    //передать отображение мест как "Ряд, Место" для билета
    //передать сеанс, чтобы отметить фильм время и зал в билете
    //добавить к seat поле descriiption по умолчанию пустое, куда можно записать ряд и место
})


//перевести номер seat в ряд и место в зале
function seatInHall(num) {
    const row = Math.floor(num/seance.hall.cols) + 1
    const firstSeatOfRow = seance.hall.cols * (row - 1 )
    const lastSeatOfRow = seance.hall.cols + firstSeatOfRow - 1
    let s = 1
    for (let i = lastSeatOfRow; i >= firstSeatOfRow; i--) {
        if (seats[i] !== 'disabled' && i > num) {
            s++
        } else if (seats[i] === 'disabled') {
            continue
        } else {
            break
        }
    }
    //return `Ряд ${row}, Место ${s} `
    return {id: seats[num].id, row: row, seat: s, type: seats[num].type_seat}
}
