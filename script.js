class Movie {
  static ratingId = 0;
  static movieRowId = 100;
  constructor(Title, Image, Rating, Overview,Id) {
    this.Title = Title;
    this.Image = Image;
    this.Rating = Rating;
    this.Overview = Overview;
    this.Id = Id
    this.ratingId = ++Movie.ratingId;
    this.movieRowId = ++Movie.movieRowId;
  
  }
  getHtml() {
    return `
      <tr id="${this.movieRowId}">
        <td scope="row">
        <img src="https://image.tmdb.org/t/p/original${this.Image}" id="${this.Id}"
        style="height: 150px; width: 120px; border-radius: 10px;">
        </td>
        <td><h4 class="original__header">${this.Title}</h4></td>
        <td ><span><h4 class="original__header">${this.Rating}</h4></span></td>
        <td><h6 class="overview-container">${this.Overview}</h6></td>
       <td><button onclick="clearMovie(${this.movieRowId})" class="btn-danger">x</button></td>
      </tr>
    `;
  }
}

let moviesList = [];
let tableDataEl = document.querySelector("tbody");

function addMovie(movie) {
  let title = movie.name;
  let image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  let rating = movie.vote_average;
  let overview = movie.overview;

  let newMovie = new Movie(title, image, rating, overview);
  moviesList.push(newMovie);
  printMovie();
}

function printMovie() {
  tableDataEl.innerHTML = "";
  for (let movie of moviesList) {
    tableDataEl.innerHTML += movie.getHtml();
  }
}


function clearMovie(movieRowId) {
  let row = document.getElementById(movieRowId);
  if (row) {
    row.remove();

    let movieIndex = moviesList.findIndex((movie) => movie.movieRowId === movieRowId);
    if (movieIndex !== -1) {
      moviesList.splice(movieIndex, 1);
    }
  }
}



const showMoviesButton = document.getElementById("showMoviesButton");
let divOriginal = document.querySelector("#original__movies")
showMoviesButton.addEventListener("click", () => {
  // divOriginal.classList.remove("original__movies")
  showMoviesButton.classList.add("showMovies")
  divOriginal.classList.add("showMovies");
  fetchMoviesData();
});

function fetchMoviesData() {
  const url = "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((movies) => {
      showMovies(movies.results);
    })
    .catch((error) => {
      console.log(error);
    });
}


function showMovies(movies) {
  let movieElement = document.querySelector(".original__movies");
  movieElement.innerHTML = "";

  for (let movie of movies) {
    let image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    image.addEventListener("click", () => {
      addMovie(movie);
    });
    movieElement.appendChild(image);
  }

  movieElement.classList.add("showMovies"); // נוסיף את הקלאס "showMovies" לתיבת הסרטים
}






