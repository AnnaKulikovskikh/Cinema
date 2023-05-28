 import viewCalendar from "./calendar.js"
 
 let s = 1
 const date = new Date()

 viewCalendar(s, date)


 //получение данных с сервера
//получение таблицы с залами с сервера
const hallsTable = document.querySelector('.data-halls')
const hallsData = JSON.parse(hallsTable.value).data
//console.log(hallsData)

//получение фильмов
const moviesTable = document.querySelector('.data-movies')
const moviesData = JSON.parse(moviesTable.value)
//console.log(moviesData)

//получение сеансов
const seancesTable = document.querySelector('.data-seances')
const seancesData = JSON.parse(seancesTable.value)
//console.log(seancesData)

//сеансы, сортированные по фильмам и залам
seancesData.sort((a, b) => a.start > b.start ? 1 : -1)
console.log(seancesData)
// const hallSession = []
// for (let i = 0; i < moviesData.length; i++) {
//     for (let j = 0; j < hallsData.length; j++) {
//         seancesData.forEach(seance => {
//             if (seance.movie_id == moviesData[i].id && seance.hall_id == hallsData[j].id) {
//                 hallSession.push(seance)
//                 //console.log(seance)
//             }
//         })
//     }
// }
// console.log(hallSession)


//выбор сеанса
const seanceBtn = [...document.querySelectorAll('.movie-seances__time')]
seanceBtn.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('click')
}))


