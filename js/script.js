const global = {
  currentPage: window.location.pathname,
};

async function DisplayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
                  : `
              <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />
              `
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
              </p>
            </div>
          `;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Fetch Data from MovieDB API
async function fetchAPIData(endpoint) {
  const API_KEY = "034762d6f969bde75ad8302b2c2e63a5";
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = response.json();
  return data;
}

function highlightActiveLinks() {
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

function init() {
  // console.log(window.location.pathname);
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      // console.log("Home");
      DisplayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  highlightActiveLinks();
}

document.addEventListener("DOMContentLoaded", init);
