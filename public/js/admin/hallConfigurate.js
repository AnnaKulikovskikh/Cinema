export default function hallConfigurate(hallsData, choosenHall) {
        document.querySelector(".price").value = hallsData[choosenHall].price;
        document.querySelector(".vip_price").value = hallsData[choosenHall].price_vip;
        document.querySelector('.rows').value = hallsData[choosenHall].rows;
        document.querySelector('.cols').value = hallsData[choosenHall].cols;

        const openSales = document.querySelector('#open_sales');
        if (hallsData[choosenHall].is_open) {
            openSales.textContent = 'Приостановить продажу билетов';
        } else {
            openSales.textContent = 'Открыть продажу билетов';
        }
    
        const wrapper = document.querySelector('.conf-step__hall-wrapper');
    
        let type = 'conf-step__chair_standart';
        let i = 0;
        let addSeat = '';
    
        for (let row = 0; row < hallsData[choosenHall].rows; row++) {
            addSeat += '<div class="conf-step__row">';
            for (let col = 0; col < hallsData[choosenHall].cols; col++) {
                if (hallsData[choosenHall].seat[i] === 'vip') {
                    type = 'conf-step__chair_vip';
                } else if (hallsData[choosenHall].seat[i] === 'disabled') {
                    type = 'conf-step__chair_disabled';
                } else {
                    type = 'conf-step__chair_standart';
                }
                addSeat += `<span class="seat conf-step__chair ${type}"></span>`;
                i++;
            }
            addSeat += '</div>';
        }
    
        wrapper.innerHTML = addSeat;
    
        //изменение вида кресла
        const seats = [...document.getElementsByClassName('seat')];
        for (let i = 0; i < seats.length; i++) {
            seats[i].addEventListener('click', function() {
                if (hallsData[choosenHall].seat[i] == 'st') {
                    seats[i].classList.toggle('conf-step__chair_standart');
                    seats[i].classList.toggle('conf-step__chair_vip');
                    hallsData[choosenHall].seat[i] = 'vip';
                } else if (hallsData[choosenHall].seat[i] == 'disabled') {
                    seats[i].classList.toggle('conf-step__chair_disabled');
                    seats[i].classList.toggle('conf-step__chair_standart');
                    hallsData[choosenHall].seat[i] = 'st';
                } else if (hallsData[choosenHall].seat[i] == 'vip') {
                    seats[i].classList.toggle('conf-step__chair_vip');
                    seats[i].classList.toggle('conf-step__chair_disabled');
                    hallsData[choosenHall].seat[i] = 'disabled';
                } else {
                    seats[i].classList.add('conf-step__chair_standart');
                    hallsData[choosenHall].seat[i] = 'st';
                }
            })
        }
}