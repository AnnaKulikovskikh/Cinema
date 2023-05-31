import sortSeances from "./sortSeances.js"
import viewSeances from "./viewSeances.js"

//удаление сеанса
export default function delSeance(hallsData, moviesData, seancesData) {
    //массив из 6 всплывающих окон
    const seanceEl = [...document.querySelectorAll('.conf-step__seances-movie')]
    for (let i = 0; i < seanceEl.length; i++) {
        seanceEl[i].onclick = () => {
            const movie = moviesData.find(movie => movie.id == getSeanceId(i, hallsData, seancesData).movie_id)
            const formSeance = document.getElementById('delete_seance')
            formSeance.querySelector('span').textContent = movie.title
            formSeance.action = '/admin/delete_seance/' +  getSeanceId(i, hallsData, seancesData).id
            document.getElementById('delShowPopup').classList.add('active')
            formSeance.onsubmit = (e) => {
                e.preventDefault()
                let delEl = seancesData.findIndex(item => item.id == getSeanceId(i, hallsData, seancesData).id)
                seancesData.splice(delEl, 1)
                viewSeances(hallsData, moviesData, seancesData)
                document.getElementById('delShowPopup').classList.remove('active')
            }
            
        }
    }
}

//вспомогательная функция возвращает сеанса от его номера в seances-timeline
function getSeanceId(k, hallsData, seancesData){
    let hallSession = sortSeances(hallsData, seancesData)
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