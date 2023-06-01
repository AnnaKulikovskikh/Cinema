 //получение данных с сервера
//получение таблицы с сеансами с сервера
const seanceTable = document.querySelector('.data-seance')
const seance = JSON.parse(seanceTable.value)
console.log(seance)

const seatsTable = document.querySelector('.data-seats')
const seats = JSON.parse(seatsTable.value)
console.log(seats)

document.querySelector('.ticket__title').textContent = seance.movie.title
document.querySelector('.ticket__chairs').textContent = seatsForTicket()
document.querySelector('.ticket__hall').textContent = `${seance.hall.name}`
document.querySelector('.ticket__start').textContent =`Начало сеанса: ${seance.start}`

function seatsForTicket() {
    let result = ''
    for (let seat of seance.selected_seats) {
        result += `Ряд ${seat.row} Место ${seat.seat}; `
    }
    result = result.slice(0, -2)
    return result
}