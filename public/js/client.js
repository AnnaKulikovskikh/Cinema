const date = new Date();
const nameDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
let add = `<a class="page-nav__day page-nav__day_today page-nav__day_chosen" href="#">
            <span class="page-nav__day-week">${nameDay[date.getDay()]}</span>
            <span class="page-nav__day-number">${date.getDate()}</span>
            </a>`
for (let i = 1; i < 6; i++) {
    let day = (date.getDay() + i) < 7 ? nameDay[date.getDay() + i] : nameDay[date.getDay() + i - 7]
    add += `<a class="page-nav__day" href="#">
                <span class="page-nav__day-week">${day}</span>
                <span class="page-nav__day-number">${date.getDate() + i}</span>
            </a>`
}

const next = '<a class="page-nav__day page-nav__day_next" href="#"></a>'
add += next
document.querySelector('.page-nav').innerHTML = add
const day = [...document.querySelectorAll('.page-nav__day')]
day.forEach(item => item.onclick = () => {
    day.forEach(d => {
        if (d.classList.contains('page-nav__day_chosen')) d.classList.remove('page-nav__day_chosen')
    })
    item.classList.add('page-nav__day_chosen')
  })