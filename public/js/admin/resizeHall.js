import hallConfigurate from "./hallConfigurate.js";

export default function resizeHall(hallsData, choosenHall, dimension, value) {
    const hallsList = [...document.getElementsByName('chairs-hall')];
    if (!Number.isInteger(value) || value <=0 || value > 50) {
        if (dimension === 'cols') {
            document.querySelector('.cols').value = hallsData[choosenHall].cols;
        } else {
            document.querySelector('.rows').value = hallsData[choosenHall].rows;
        }
        return null;
    }
    for (let i = 0; i < hallsList.length; i++) {
        if (hallsList[i].checked) {
            choosenHall = i;
            if (dimension === 'cols') {
                hallsData[choosenHall].cols = value;
            } else {
                hallsData[choosenHall].rows = value;
            }
            hallsData[choosenHall].seat = [];
            let seatsCount = hallsData[choosenHall].rows *  hallsData[choosenHall].cols;
            for (let j = 0; j <  seatsCount; j++) {
                hallsData[choosenHall].seat.push('st');
            }
        }
    }
    hallConfigurate(hallsData, choosenHall);
}