 //получение данных с сервера
//получение таблицы с сеансами с сервера
const seanceTable = document.querySelector('.data-seance')
const seance = JSON.parse(seanceTable.value)
console.log(seance)

document.querySelector('.ticket__title').textContent = seance.movie.title
document.querySelector('.ticket__chairs').textContent = 'Надо добавить выбранные места к сеансу'
document.querySelector('.ticket__hall').textContent = `${seance.hall.name}`
document.querySelector('.ticket__start').textContent =`Начало сеанса: ${seance.start}`