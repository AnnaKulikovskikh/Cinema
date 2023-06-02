export default function sortSeances(hallsData, seancesData) {
    let hallSession = [];
    for (let i = 0; i < hallsData.length; i++) {
        if (seancesData.length == 0) {
            hallSession[i] = 0;
        } else {
            hallSession.push(seancesData.filter(item => item.hall_id === hallsData[i].id));
        }
    }
    return hallSession;
}