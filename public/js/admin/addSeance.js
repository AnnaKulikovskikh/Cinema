import viewSeances from "./viewSeances.js"
import delSeance from "./delSeance.js"
import timeToMinutes from "./timeToMinutes.js"

export default function addSeance(hallsData, moviesData, seancesData) {
    //добавить сеанс
    const moviesEl = [...document.querySelectorAll('.conf-step__movie')]
    for (let i = 0; i < moviesEl.length; i++) {
        moviesEl[i].onclick = (e) => {
            document.getElementById('addShowPopup').classList.add('active')
            const form = document.getElementById('add_seance')
            form.action = '/admin/add_seance/' + moviesData[i].id
            form.onsubmit = function(e) { 
                e.preventDefault()
                if (!isTimeOk(form.hall.value, timeToMinutes(form.start_time.value), moviesData[i].duration, seancesData, moviesData)) {
                    alert('Сеанс нельзя установить на занятое время!')
                    return null
                }
                const id = seancesData.length > 0 ?  seancesData[seancesData.length-1].id + 1 : 0
                const hall_id = parseInt(form.hall.value)
                const movie = moviesData[i]
                const add = {id: id, start: form.start_time.value, hall_id: hall_id, movie_id: moviesData[i].id, movie: movie}
                seancesData.push(add)
                document.getElementById('addShowPopup').classList.remove('active')
                viewSeances(hallsData, moviesData, seancesData)
                delSeance(hallsData, moviesData, seancesData)
            }
        }
    }
}

//проверка добавлен ли сеанс в свободное время. Время сеанса + 10 мин на пересменку
function isTimeOk(hallID, start, duration, seancesData, moviesData) {
    let isOk = true
    let finish = start + duration + 10
    //если во время сеанса наступает полночь отсчет финиша с утренних минут
    if (finish > 1439) finish -= 1440 

    //отбор сеансов в выбранном зале. Перевод начала сеанса в минуты.
    // добавление продолжительности сеанса. Сортировка по началу сеанса
    let hallIDseances = seancesData.filter(seance => seance.hall_id == hallID)
    hallIDseances = hallIDseances.map(seance => {
        const dur = moviesData.find(movie => movie.id === seance.movie_id).duration
        return {...seance, start: timeToMinutes(seance.start), duration: dur}
    } )

    hallIDseances.sort((a, b) => a.start > b.start ? 1 : -1)

    //занятое время в зале
    const busyTime = []
    for (let hallIDSeance of hallIDseances) {
        busyTime.push({start: hallIDSeance.start, finish: hallIDSeance.start + hallIDSeance.duration + 10})
    }

    //проверка попадает ли новый сеанс на занятое время
    for (let busy of busyTime) {
        if ((start >= busy.start && start <= busy.finish) || (finish >= busy.start && finish <= busy.finish) || (start === busy.start)) {
            isOk = false
            break
        }
    }
    return isOk
}