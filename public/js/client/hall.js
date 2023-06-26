//получение данных с сервера
//получение таблицы с сеансами с сервера
const seanceTable = document.querySelector('.data-seance');
const seance = JSON.parse(seanceTable.value);
console.log(seance);

const seatsTable = document.querySelector('.data-seats');
let seats =[];
if (seance.seance_seats.length == 0) {
    seats = JSON.parse(seatsTable.value);
} else {
    seats = seance.seance_seats;
}

document.querySelector('.buying__info-title').textContent = seance.movie.title;
document.querySelector('.buying__info-start').textContent = `Начало сеанса: ${seance.start}`;
document.querySelector('.buying__info-hall').textContent = `Зал ${seance.hall.name}`;
document.querySelector('.st_chair').textContent = `${seance.hall.price}`;
document.querySelector('.vip_chair').textContent = `${seance.hall.price_vip}`;

//отображение кресел
let addSeats = '';
let s = 0;
const classSeat = [
    'buying-scheme__chair_standart',
    'buying-scheme__chair_disabled',
    'buying-scheme__chair_vip',
    'buying-scheme__chair_taken',
    'buying-scheme__chair_selected'
]
let typeSeat = classSeat[0];
for (let i = 0; i < seance.hall.rows; i++) {
    addSeats += '<div class="buying-scheme__row">';
    for( let j = 0; j < seance.hall.cols; j++) {
        if (seats[s].type_seat == 'st') {
            typeSeat = 'buying-scheme__chair_standart';
        } else if (seats[s].type_seat == 'disabled') {
            typeSeat = classSeat[1];
        } else if (seats[s].type_seat == 'vip') {
            typeSeat = classSeat[2];
        } else {
            typeSeat = classSeat[3];
        }
        addSeats += `<span class="buying-scheme__chair ${typeSeat}"></span>`;
        s++;
    }
    addSeats += '</div>';
}
document.querySelector('.buying-scheme__wrapper').innerHTML = addSeats;

//выбор кресел
const chosenChairs = [];
const rowAndSeat = [];
const chairs = [...document.querySelectorAll('.buying-scheme__chair')];
for (let i = 0; i < chairs.length; i++) {
    chairs[i].onclick = () => {
        if (chairs[i].classList.contains(classSeat[1]) 
            || chairs[i].classList.contains(classSeat[3])) {
            return null;
        }
        if (chairs[i].classList.contains(classSeat[4])) {
            chairs[i].classList.remove(classSeat[4]);
            if (seats[i].type_seat == 'vip') {
                chairs[i].classList.add(classSeat[2]);
            } else {
                chairs[i].classList.add(classSeat[0]);
            }
            seats.filter(seat => seat.id != seats[i].id);
            return null;
        }
        if (chairs[i].classList.contains(classSeat[0])) {
            chairs[i].classList.remove(classSeat[0]);
            chairs[i].classList.add(classSeat[4]);
            chosenChairs.push(seats[i]);
            rowAndSeat.push(seatInHall(i));
            return null;
        }
        if (chairs[i].classList.contains(classSeat[2])) {
            chairs[i].classList.remove(classSeat[2]);
            chairs[i].classList.add(classSeat[4]);
            chosenChairs.push(seats[i]);
            rowAndSeat.push(seatInHall(i));
            return null;
        }
    }
}

document.querySelector('.acceptin-button').addEventListener('click', (e) => {
    e.preventDefault();
    if (chosenChairs.length < 1) return null;
    seats.forEach(seat => {
        for (let i = 0; i < chosenChairs.length; i++) {
            if (seat.id == chosenChairs[i].id) {
                seat.type_seat = 'taken';
            }
        }
    })
    seance.selected_seats = rowAndSeat;
    seance.seance_seats = seats;

    const options = {
        method: "POST",
        body: JSON.stringify(seance),
        headers: {"Content-Type": "application/json"}
    }

    fetch(`/api/seances/${seance.id}`, options);

    location.href = `/client/payment/${seance.id}`;
})

//перевести номер seat в ряд и место в зале
function seatInHall(num) {
    const row = Math.floor(num/seance.hall.cols) + 1;
    const firstSeatOfRow = seance.hall.cols * (row - 1 );
    const lastSeatOfRow = seance.hall.cols + firstSeatOfRow - 1;
    let s = 1;
    for (let i = lastSeatOfRow; i >= firstSeatOfRow; i--) {
        if (seats[i] !== 'disabled' && i > num) {
            s++;
        } else if (seats[i] === 'disabled') {
            continue;
        } else {
            break;
        }
    }
    //return `Ряд ${row}, Место ${s} `
    return {id: seats[num].id, row: row, seat: s, type: seats[num].type_seat};
}
