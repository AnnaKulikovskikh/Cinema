const headers = Array.from(document.querySelectorAll('.conf-step__header'));
headers.forEach(header => header.addEventListener('click', () => {
  header.classList.toggle('conf-step__header_closed');
  header.classList.toggle('conf-step__header_opened');
}));

//получение таблицы с залами с сервера
const hallsTable = document.querySelector('.data-halls')
const hallsData = JSON.parse(hallsTable.value).data
let choosenHall = hallsData.length - 1
if (hallsData.length > 0) hallConfigurate()

const moviesTable = document.querySelector('.data-movies')
const moviesData = JSON.parse(moviesTable.value).data

const seancesTable = document.querySelector('.data-seances')
const seancesData = JSON.parse(seancesTable.value)
console.log(moviesData)
console.log(seancesData)

const colors = ['#caff85', '#85ff89', '#85ffd3', '#85e2ff', '#8599ff', '#ba85ff', '#ff85fb', '#ff85b1', '#ffa285']

//массив из 6 всплывающих окон
const popup = [...document.querySelectorAll('.popup')]

//добавление-удаление зала
const addHall = document.querySelector('.add_hall')
const delHall = [...document.querySelectorAll('.trash_hall')]

addHall.onclick = function() {
    popup[0].classList.add('active')
}

for (let i = 0; i <delHall.length; i++) {
    delHall[i].addEventListener('click', () => {
        //работает, потому что conf-step__paragraph в рорар для удаления встречается в первый раз
        const nameHall = document.querySelector('.conf-step__paragraph') 
        const trashForm = document.querySelector('.trash-form')
        nameHall.querySelector('span').textContent = delHall[i].closest('li').textContent
        const hallID = delHall[i].closest('li').dataset.id
        popup[1].classList.add('active')
        trashForm.action =  '/admin/del_hall/' + hallID
    })
}

//кнопка "Отменить"
const abort = [...document.querySelectorAll('.abort')]
const dismiss = [...document.querySelectorAll('.popup__dismiss')]

for (let i = 0; i < abort.length; i++) {
    abort[i].addEventListener('click', close)
}

for (let i = 0; i < dismiss.length; i++) {
    dismiss[i].addEventListener('click', close)
}

function close(e) {
    e.preventDefault()
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
        hallConfigurate()
    })

    hallsList[i].addEventListener('input', function(){
        choosenHall = i
        hallsList1[i].checked = true
        hallConfigurate()
    })
}

//количество рядов и мест в них
document.querySelector('.rows').onchange = (e) => {
    resizeHall('rows', e.target.value)
}

document.querySelector('.cols').onchange = (e) => {
    resizeHall('cols', e.target.value)
}

function resizeHall(dimension, value){
    for (let i = 0; i < hallsList.length; i++){
        if (hallsList[i].checked){
            choosenHall = i
            if (dimension === 'cols'){
                hallsData[choosenHall].cols = value
            } else {
                hallsData[choosenHall].rows = value
            }
            hallsData[choosenHall].seats = []
            for (let j = 0; j <  hallsData[choosenHall].rows *  hallsData[choosenHall].cols; j++) {
                hallsData[choosenHall].seats.push('st')
            }
        }
    }
    hallConfigurate()
}


// отображение зала из JS

function hallConfigurate() {
    // hallsData   //перечень залов
    
    document.querySelector(".price").value = hallsData[choosenHall].price
    document.querySelector(".vip_price").value = hallsData[choosenHall].price_vip

    const wrapper = document.querySelector('.conf-step__hall-wrapper')

    let type = 'conf-step__chair_standart'
    let i = 0
    let addSeat = '' //  DOM-элемент для вставки отображения кресел

    for (let row = 0; row < hallsData[choosenHall].rows; row++) {
        addSeat += '<div class="conf-step__row">'
        for (let col = 0; col < hallsData[choosenHall].cols; col++) {
            if (hallsData[choosenHall].seats[i] === 'vip'){
                type = 'conf-step__chair_vip'
            } else if (hallsData[choosenHall].seats[i] === 'disabled'){
                type = 'conf-step__chair_disabled'
            } else {
                type = 'conf-step__chair_standart'
            }
            addSeat += `<span class="seat conf-step__chair ${type}"></span>`
            i++
        }
        addSeat += '</div>'
    }

    wrapper.innerHTML = addSeat

    //изменение вида кресла
    const seats = [...document.getElementsByClassName('seat')] // элементы DOM обозрачающие кресла
    for (let i = 0; i < seats.length; i++){
        seats[i].addEventListener('click', function(){
            if (hallsData[choosenHall].seats[i] == 'st') {
                seats[i].classList.toggle('conf-step__chair_standart')
                seats[i].classList.toggle('conf-step__chair_vip')
                hallsData[choosenHall].seats[i] = 'vip'
            } else if (hallsData[choosenHall].seats[i] == 'disabled') {
                seats[i].classList.toggle('conf-step__chair_disabled')
                seats[i].classList.toggle('conf-step__chair_standart')
                hallsData[choosenHall].seats[i] = 'st'
            } else {
                seats[i].classList.toggle('conf-step__chair_vip')
                seats[i].classList.toggle('conf-step__chair_disabled')
                hallsData[choosenHall].seats[i] = 'disabled'
            }
        })
    }
}

//изменение цены
document.querySelector(".price").onchange = (e) => {
    hallsData[choosenHall].price = e.target.value
}

document.querySelector(".vip_price").onchange = (e) => {
    hallsData[choosenHall].price_vip = e.target.value
}

//сохранение hall_update
const formUpdate = document.getElementById("hall_update")
formUpdate.onsubmit = function(e){
    document.querySelector(".data-tables").value = hallsData[choosenHall]
    e.preventDefault()

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
        // .then(data=>console.log(data))
}



//добавить фильм
document.querySelector('.add_movie').onclick = function() {
    popup[2].classList.add('active')
}


const wrapperMovies = document.querySelector(".conf-step__movies")
let addMovie = ""


for (let i = 0; i < moviesData.length; i++) {
    addMovie += `
        <div class="conf-step__movie">
            <img class="conf-step__movie-poster" alt="poster" src="/i/poster.png">
            <h3 class="conf-step__movie-title">${moviesData[i].title}</h3>
            <p class="conf-step__movie-duration">${moviesData[i].duration} минут</p>
            <button class="conf-step__button conf-step__button-trash trash_movie"></button>
        </div>
        
    `
}

wrapperMovies.innerHTML = addMovie


//вывод seances-timeline залов

const wrappersHalls = document.querySelector(".conf-step__seances")
let addTimeline = ""
const hallSession = [] //сортировка сеансов по залам

for (let j = 0; j < hallsData.length; j++){
    hallSession.push(seancesData.filter(item => item.hall_id === hallsData[j].id))
    addTimeline += `
      <div class="conf-step__seances-hall">
        <h3 class="conf-step__seances-title">${hallsData[j].name}</h3>
        <div class="conf-step__seances-timeline">
        
        </div>
      </div>  
    `
  }
  
wrappersHalls.innerHTML = addTimeline

//добавление сеанса
const moviesEl = [...document.querySelectorAll('.conf-step__movie')]
for (let i = 0; i < moviesEl.length; i++) {
    moviesEl[i].onclick = () => {
        popup[3].classList.add('active')
        document.getElementById('add_seance').action = '/admin/add_seance/' + moviesData[i].id
    }
}

//добавление сеансов в seances-timeline залов
const wrapperSeances = [...document.querySelectorAll(".conf-step__seances-timeline")]
let addSeance = ""

for (let j = 0; j < hallsData.length; j++){
    for (let k = 0; k < hallSession[j].length; k++){
      const movie = moviesData.find(movie => movie.id== hallSession[j][k].movie_id)
      addSeance += `
        <div class="conf-step__seances-movie" style="width: ${movie.duration/2}px; 
             background-color: ${colors[moviesData.findIndex(item => item.id === movie.id)]};
             left: ${timeToMinutes(hallSession[j][k].start)/2}px;">
          <p class="conf-step__seances-movie-title">${movie.title}</p>
          <p class="conf-step__seances-movie-start">${hallSession[j][k].start}</p>
        </div>
    `
    }
    wrapperSeances[j].innerHTML = addSeance
    addSeance = ""
}

//удаление фильма
const delMovie = [...document.querySelectorAll('.trash_movie')]
for (let i = 0; i < delMovie.length; i++) {
    delMovie[i].onclick = (e) => {
        e.stopPropagation()
        //удаление сеансов с фильмом
        //const seancesDel = seancesData.filter(seance => seance.movie_id === moviesData[i].id)
        //console.log(seancesDel)
        const formMovie = document.getElementById('delete_movie')
        formMovie.querySelector('span').textContent = moviesData[i].title
        formMovie.action = '/admin/delete_movie/' +  moviesData[i].id
        popup[5].classList.add('active')
    }
}

//удаление сеанса
const seanceEl = [...document.querySelectorAll('.conf-step__seances-movie')]
for (let i = 0; i < seanceEl.length; i++) {
    seanceEl[i].onclick = () => {
        const movie = moviesData.find(movie => movie.id == getSeanceId(i).movie_id)
        const formSeance = document.getElementById('delete_seance')
        formSeance.querySelector('span').textContent = movie.title
        formSeance.action = '/admin/delete_seance/' +  getSeanceId(i).id
        popup[4].classList.add('active')
        
    }
}


//вспомогательная функция возвращает сеанса от его номера в seances-timeline
function getSeanceId(k){
    let i = 0
    let j = 0
    for (let s = 0; s < hallSession.length; s++) {
        if (hallSession[s].length - k <= 0) {
            k -= hallSession[s].length
            i++
        } else {
            j = k
            break
        }
    }
    return hallSession[i][j]
}




//вспомогательная функция для перевода минут в hh:mm
function minutesToTime(min){
    let h = Math.floor(min/60)
    let m = min - h*60
    if (String(h).length < 2) h = `0${h}`
    if (String(m).length < 2) m = `0${m}`
    return `${h}:${m}`
  }

//вспомогательная функция для перевода hh:mm в минуты
function timeToMinutes(time){
    const h = time.slice(0,2)
    const m = time.slice(3,5)
    return h * 60 + Number(m)   
}



//сохранение seance_update
const formSeance = document.getElementById("seance_update")
formSeance.onsubmit = function(e){
    e.preventDefault()

    // const options = {
    //     method: "POST",
    //     body: JSON.stringify(hallsData[choosenHall]),
    //     headers: {"Content-Type": "application/json"}
    // }

    // fetch(`/api/halls/${hallsData[choosenHall].id}`, options)
    //     .then(res=> {
    //         res.json()
    //         if (res.ok) {
    //             alert('save')
    //         } else {
    //             throw new Error(res.status)
    //         }
    //     })
        // .then(data=>console.log(data))
}
  