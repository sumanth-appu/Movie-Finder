const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=e7c2f293&s=";
const API_SEARCH_URL = "http://www.omdbapi.com/?apikey=e7c2f293&i=";

let searchInput = document.getElementById("search_input");
let card = document.getElementById("movie-cards");

document
  .getElementsByClassName("search")[0]
  .addEventListener("click", function () {
    console.log(searchInput.value);
    const query = searchInput.value;
    if (query) {
      getMovies(API_URL + query);
    }
  });

async function getMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();

  console.log(responseData);
  showMovie(responseData.Search);
}

function showMovie(movies) {
  let card = document.getElementById("movie-cards");
  card.innerHTML = "";
  movies.forEach(async function (movie) {
    console.log(movie);
    const movieData = await fetch(API_SEARCH_URL + movie.imdbID);
    const movieDataObj = await movieData.json();
    movie_Display(movieDataObj);
  });
}

function movie_Display(movieInfo) {
  const movieBox = document.createElement("div");
  movieBox.classList.add("card");
  movieBox.innerHTML = `

  <div class="col container">
    <div class="card container">
      <img src="${movieInfo.Poster}" class="card-img-top">
      <div class="card-body container">
        <h5 class="card-title">Movie title: ${movieInfo.Title}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Movie Director : ${movieInfo.Director} </li>
          <li class="list-group-item">Imdb Rating: ${movieInfo.imdbRating} </li>
          <li class="list-group-item">Release Data: ${movieInfo.Released} </li>
          <li class="list-group-item">Genre: ${movieInfo.Genre} </li>
        </ul>
      </div>
    </div>
  </div>
`;

  card.append(movieBox);
}
