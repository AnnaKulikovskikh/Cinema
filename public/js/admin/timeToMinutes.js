//вспомогательная функция для перевода hh:mm в минуты
export default function timeToMinutes(time) {
    const h = time.slice(0,2)
    const m = time.slice(3,5)
    return h * 60 + Number(m)
}