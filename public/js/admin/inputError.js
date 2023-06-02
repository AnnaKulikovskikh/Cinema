export default function inputError(moviesData, hallsData) {
    let error = false;
    let typeError = null;
    const alert = [...document.querySelectorAll('.alert')];
    
    const inputHallName = document.getElementById('name');
    inputHallName.addEventListener("change", function (event) {
        error = false;
        hallsData.forEach(hall => {
            if (hall.name.toLowerCase() === inputHallName.value.toLowerCase()) {
                error = true;
                typeError = "Зал с таким названием уже есть";
            }
        })
        if (inputHallName.value.length > 15) {
            error = true;
            typeError = "Слишком длинное название";
        }
    })
    
    const inputMovieTitle = document.getElementById('movie-name');
    inputMovieTitle.addEventListener("change", function (event) {
        error = false;
        const value = inputMovieTitle.value;
        moviesData.forEach(movie => {
            if (movie.title.toLowerCase() === value.toLowerCase()) {
                error = true;
                typeError = "Такой фильм уже есть";
            }
        })
        if (value.length > 40) {
            error = true;
            typeError = "Слишком длинное название";
        }
    })
    
    const inputMovieDur = document.getElementById('movie-dur');
    inputMovieDur.addEventListener("change", function (event) {
        const value =  parseInt(inputMovieDur.value);
        if (!Number.isInteger(value) || value <=0 || value > 300) {
            error = true;
            typeError = "Неверно указана продолжительность фильма";
        }
    })
    
    document.getElementById('addHall').onsubmit = (e) => {
        if (error) {
            e.preventDefault();
            alert[0].textContent = typeError;
        }
    }
    
    document.getElementById('addMovie').onsubmit = (e) => {
        if (error) {
            e.preventDefault();
            alert[1].textContent = typeError;
        }
    }
}