function addHall() {
    const addHallPopup = document.querySelector('#addHallPopup');
    addHallPopup.classList.add('active');
}

function deleteHall(event) {
    const deleteHallPopup = document.querySelector('#delHallPopup');
    deleteHallPopup.classList.add('active');
    const nameHall = document.querySelector('.conf-step__paragraph'); 
    const trashForm = document.querySelector('.trash-form');
    nameHall.querySelector('span').textContent = event.target.closest('li').textContent;
    const hallID = event.target.closest('li').dataset.id;
    trashForm.action =  '/admin/del_hall/' + hallID;
}