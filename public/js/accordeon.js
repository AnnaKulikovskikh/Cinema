const btn = document.querySelector('.conf-step__button-accent');
const popup = document.querySelector('.popup')
const abort = document.querySelector('.conf-step__button-regular');

btn.onclick = function(e) {
    popup.classList.add('active');
}

abort.onclick = function(e) {
    popup.classList.remove('active');
}