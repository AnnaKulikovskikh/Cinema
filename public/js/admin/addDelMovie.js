export default function addDelMovie(moviesData) {
    //добавление фильма
    document.querySelector('.add_movie').onclick = function(e) {
        document.getElementById('addMoviePopup').classList.add('active');
        e.preventDefault();
    }
    
    const wrapperMovies = document.querySelector(".conf-step__movies");
    let addMovie = "";
    
    
    for (let i = 0; i < moviesData.length; i++) {
        addMovie += `
            <div class="conf-step__movie">
                <img class="conf-step__movie-poster" alt="poster" src="/i/poster.png">
                <h3 class="conf-step__movie-title">${moviesData[i].title}</h3>
                <p class="conf-step__movie-duration">${moviesData[i].duration} минут</p>
                <button class="conf-step__button conf-step__button-trash trash_movie"></button>
            </div>
            
        `;
    }
    
    wrapperMovies.innerHTML = addMovie;
    
    //удаление фильма
    const delMovie = [...document.querySelectorAll('.trash_movie')];
    for (let i = 0; i < delMovie.length; i++) {
    delMovie[i].onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formMovie = document.getElementById('delete_movie');
        formMovie.querySelector('span').textContent = moviesData[i].title;
        formMovie.action = '/admin/delete_movie/' +  moviesData[i].id;
        document.getElementById('delMoviePopup').classList.add('active');
    }
}
}
