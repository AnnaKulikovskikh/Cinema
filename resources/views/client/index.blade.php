<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ИдёмВКино</title>
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/styles.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
</head>

<body>
  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
  </header>

  <!-- все залы из table-halls в $halls -->
  <input class="data-halls" type="hidden" value="{{ json_encode($halls) }}"/>
  <input class="data-movies" type="hidden" value="{{ json_encode($movies) }}"/>
  <input class="data-seances" type="hidden" value="{{ json_encode($seances) }}"/>
  
  <nav class="page-nav">

  </nav>
  
  <main>
    @foreach ($movies as $movie)
      <section class="movie">
        <div class="movie__info">
          <div class="movie__poster">
            <img class="movie__poster-image" alt="Звёздные войны постер" src="i/poster1.jpg">
          </div>
          <div class="movie__description">
            <h2 class="movie__title">{{ $movie->title }}</h2>
            <p class="movie__synopsis">Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.</p>
            <p class="movie__data">
              <span class="movie__data-duration">{{ $movie->duration }}</span>
              <span class="movie__data-origin">США</span>
            </p>
          </div>
        </div>

        @foreach ($halls as $hall)
          <div class="movie-seances__hall">
            <h3 class="movie-seances__hall-title">{{ $hall->name }}</h3>
            <ul class="movie-seances__list">
            @foreach ($seances as $seance)
              <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">10:20</a></li>
            @endforeach  
            </ul>
          </div>
        @endforeach
      </section>
    @endforeach
  </main>

  <script type="module" src="/js/client/client.js"></script>
  <script type="module" src="/js/client/calendar.js"></script>
</body>
</html>