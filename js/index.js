const API_KEY = "8f30b9b0";
const url = "https://www.omdbapi.com/";

$(document).ready(() => {
    $("#searchForm").on('submit', async (e) => {
        e.preventDefault();
        const searchText = $("#searchText").val();
        await getMovies(searchText);
    });
});

async function getMovies(searchText) {
    try {
        const res = await fetch(`${url}?apikey=${API_KEY}&s=${searchText}`);
        if (res.ok) {
            const response = await res.json();
            console.log(response);
            let movies = response.Search; // Corrected property name
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
                </div>
                `;
            });
            $('#movies').html(output);
        } else {
            console.error("Error fetching data from OMDB API");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}


async function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  try {
      const res = await fetch(`${url}?apikey=${API_KEY}&i=${movieId}`);
      if (res.ok) {
          const movie = await res.json();
          console.log(movie);
          let output = `
          <div class="row">
              <div class="col-md-4">
                  <img src="${movie.Poster}" class="thumbnail">
              </div>
              <div class="col-md-8">
                  <h2>${movie.Title}</h2>
                  <ul class="list-group">
                      <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                      <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                      <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                      <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                      <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                      <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                      <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                      <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                      <li class="list-group-item"><strong>BoxOffice:</strong> ${movie.BoxOffice}</li>
                      <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
                      <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                  </ul>
              </div>
          </div>

          <div class="row">
              <div class="well">
                  <h3>Plot</h3>
                  ${movie.Plot}
                  <hr>
                  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                  <a href="index.html" class="btn btn-default">Go Back To Search</a>
              </div>
          </div>
          `;

          $('#movie').html(output);
      } else {
          console.error("Error fetching movie details from OMDB API");
      }
  } catch (error) {
      console.error("An error occurred:", error);
  }
}
