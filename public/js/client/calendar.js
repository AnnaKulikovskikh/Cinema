export default function viewCalendar(s, date) {
  const nameDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  let add = "";
  if (s === 1) {
    add += `<a class="page-nav__day page-nav__day_today page-nav__day_chosen" href="#">
            <span class="page-nav__day-week">${nameDay[date.getDay()]}</span>
            <span class="page-nav__day-number">${date.getDate()}</span>
            </a>`;
  } else {
      add += '<a class="page-nav__day page-nav__day_prev" href="#"></a>';
  }
    
  for (let i = s; i < s + 5; i++) {
    date.setDate(date.getDate() + 1);
    add += `<a class="page-nav__day" href="#">
                <span class="page-nav__day-week">${nameDay[date.getDay()]}</span>
                <span class="page-nav__day-number">${date.getDate()}</span>
            </a>`;
  }   
  add += '<a class="page-nav__day page-nav__day_next" href="#"></a>';
  document.querySelector('.page-nav').innerHTML = add;
  const dayEl = [...document.querySelectorAll('.page-nav__day')];

  dayEl.forEach(item => item.onclick = () => {
    dayEl.forEach(d => {
      if (d.classList.contains('page-nav__day_chosen')) {
        d.classList.remove('page-nav__day_chosen');
      }
      })
    item.classList.add('page-nav__day_chosen');
    })

  document.querySelector('.page-nav__day_next').onclick = () => {
    s += 5;
    viewCalendar(s, date);
  }

  if (s > 1) {
    document.querySelector('.page-nav__day_prev').onclick = () => {
      s -= 5;
      date.setDate(date.getDate() - 10);
      viewCalendar(s, date);
    }
  }
}
