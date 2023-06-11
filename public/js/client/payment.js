const seanceTable = document.querySelector('.data-seance');
const seance = JSON.parse(seanceTable.value);
console.log(seance);

document.querySelector('.ticket__title').textContent = seance.movie.title;
document.querySelector('.ticket__chairs').textContent = seatsForTicket();
document.querySelector('.ticket__hall').textContent = `${seance.hall.name}`;
document.querySelector('.ticket__start').textContent =`Начало сеанса: ${seance.start}`;
document.querySelector('.ticket__cost').textContent = calcPrice();

function seatsForTicket() {
    let result = '';
    for (let seat of seance.selected_seats) {
        result += `Ряд ${seat.row} Место ${seat.seat}; `;
    }
    result = result.slice(0, -2);
    return result;
}

function calcPrice() {
    let result = 0;
    for (let seat of seance.selected_seats) {
        if (seat.type == 'vip') {
            result += seance.hall.price_vip;
        } else {
            result += seance.hall.price;
        }
    }
    return result;
}

document.querySelector('.acceptin-button').addEventListener('click', () => {
    location.href = `/client/ticket/${seance.id}`;
})