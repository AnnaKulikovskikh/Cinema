export default function addDelHall() {
    const addHall = document.querySelector('.add_hall')
    const delHall = [...document.querySelectorAll('.trash_hall')]
    
    addHall.onclick = function() {
        document.getElementById('addHallPopup').classList.add('active')
    }
    
    for (let i = 0; i <delHall.length; i++) {
        delHall[i].addEventListener('click', () => {
            //работает, потому что conf-step__paragraph в рорар для удаления встречается в первый раз
            const nameHall = document.querySelector('.conf-step__paragraph') 
            const trashForm = document.querySelector('.trash-form')
            nameHall.querySelector('span').textContent = delHall[i].closest('li').textContent
            const hallID = delHall[i].closest('li').dataset.id
            document.getElementById('delHallPopup').classList.add('active')
            trashForm.action =  '/admin/del_hall/' + hallID
        })
    }
}