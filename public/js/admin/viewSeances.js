export default function viewSeances(hallsData, hallSession) {
    //вывод seances-timeline залов
    const wrappersHalls = document.querySelector(".conf-step__seances")
    let addTimeline = ""
    for (let j = 0; j < hallsData.length; j++){
        addTimeline += `
        <div class="conf-step__seances-hall">
            <h3 class="conf-step__seances-title">${hallsData[j].name}</h3>
            <div class="conf-step__seances-timeline">
            </div>
        </div>  
        `
    }
    wrappersHalls.innerHTML = addTimeline

    const wrapperSeances = [...document.querySelectorAll(".conf-step__seances-timeline")]
    let addSeance = ""

    for (let j = 0; j < hallsData.length; j++){
        for (let k = 0; k < hallSession[j].length; k++){
        //const movie = moviesData.find(movie => movie.id== hallSession[j][k].movie_id)
        const movie = hallSession[j][k].movie
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
}