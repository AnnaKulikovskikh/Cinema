export default function sortSeances(moviesData, hallsData, seancesData) {
    const arrMovie = [];
    const arrSeance = [];
    for (let i = 0; i < moviesData.length; i++) {
        arrMovie[i] = seancesData.filter(item => item.movie_id == moviesData[i].id);
        arrMovie[i].sort((a, b) => a.hall_id > b.hall_id ? 1 : -1);
        arrSeance[i] = [];
        for (let j = 0; j < hallsData.length; j++) {
        arrSeance[i][j] = arrMovie[i].filter(item => item.hall_id == hallsData[j].id);
        arrSeance[i][j].sort((a, b) => a.start > b.start ? 1 : -1);
        }
    }
    let result = [];
    for (let i = 0; i < arrSeance.length; i++) {
        for (let j = 0; j < arrSeance[i].length; j++) {
          result = result.concat(arrSeance[i][j]);
        }
    }
    return result;
}