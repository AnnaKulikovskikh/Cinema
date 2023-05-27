export default function hallConfigurate(hallsData, choosenHall) {
        // hallsData   //перечень залов
    
        document.querySelector(".price").value = hallsData[choosenHall].price
        document.querySelector(".vip_price").value = hallsData[choosenHall].price_vip
    
        document.querySelector('.rows').value = hallsData[choosenHall].rows
        document.querySelector('.cols').value = hallsData[choosenHall].cols
    
        const wrapper = document.querySelector('.conf-step__hall-wrapper')
    
        let type = 'conf-step__chair_standart'
        let i = 0
        let addSeat = '' //  DOM-элемент для вставки отображения кресел
    
        for (let row = 0; row < hallsData[choosenHall].rows; row++) {
            addSeat += '<div class="conf-step__row">'
            for (let col = 0; col < hallsData[choosenHall].cols; col++) {
                if (hallsData[choosenHall].seat[i] === 'vip'){
                    type = 'conf-step__chair_vip'
                } else if (hallsData[choosenHall].seat[i] === 'disabled'){
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
                //console.log(hallsData[choosenHall].seat)
                //console.log(hallsData[choosenHall].seat[i])
                if (hallsData[choosenHall].seat[i] == 'st') {
                    seats[i].classList.toggle('conf-step__chair_standart')
                    seats[i].classList.toggle('conf-step__chair_vip')
                    hallsData[choosenHall].seat[i] = 'vip'
                } else if (hallsData[choosenHall].seat[i] == 'disabled') {
                    seats[i].classList.toggle('conf-step__chair_disabled')
                    seats[i].classList.toggle('conf-step__chair_standart')
                    hallsData[choosenHall].seat[i] = 'st'
                } else {
                    seats[i].classList.toggle('conf-step__chair_vip')
                    seats[i].classList.toggle('conf-step__chair_disabled')
                    hallsData[choosenHall].seat[i] = 'disabled'
                }
                //console.log(hallsData[choosenHall].seat[i])
            })
        }
}