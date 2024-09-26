const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    total_pages: 1,
    total_results: 0,
  },
  api: {
    API_URL: import.meta.env.VITE_TMDB_API_URL,
    API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  },
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  // console.log(results);
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

async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");

  // console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
                  : `
              <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
              />
              `
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Air Date: ${
                  show.first_air_date
                }</small>
              </p>
            </div>
          `;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  const movieID = window.location.search.split("=")[1];
  // console.log(movieID);
  const movie = await fetchAPIData(`movie/${movieID}`);

  // Overlay for BackGround Image
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  // console.log(movie);
  div.innerHTML = `
  <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )} Million</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )} Million</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
            ${movie.production_companies
              .map((company) => `<div>${company.name}</div>`)
              .join("")}
          </div>
        </div>
  `;

  document.querySelector("#movie-details").appendChild(div);
}

// Display Show Details
async function displayShowDetails() {
  const showID = window.location.search.split("=")[1];
  // console.log(movieID);
  const show = await fetchAPIData(`tv/${showID}`);

  // Overlay for BackGround Image
  displayBackgroundImage("tv", show.backdrop_path);

  const div = document.createElement("div");
  // console.log(movie);
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
              : `
              <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
              />
              `
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episode to Air:</span> ${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
            ${show.production_companies
              .map((company) => `<div>${company.name}</div>`)
              .join("")}
          </div>
        </div>
  `;

  document.querySelector("#show-details").appendChild(div);
}

// Display BackDrop on Details Page
function displayBackgroundImage(type, background_path) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://images.tmdb.org/t/p/original/${background_path})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.125";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Search Movies & Shows
async function search() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, total_results, page } = await searchAPIData();

    global.search.page = page;
    global.search.total_pages = total_pages;
    global.search.total_results = total_results;
    // console.log(results);
    if (results.length === 0) {
      showAlert("No Results Found");
      return;
    }

    displaySearchResults(results);

    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please Enter a Search Term");
  }
}

function displaySearchResults(results) {
  // To Clear Previous Results
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
              ${
                result.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                class="card-img-top"
                alt="${
                  global.search.type === "movie" ? result.title : result.name
                }"
              />`
                  : `
              <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${
                  global.search.type === "movie" ? result.title : result.name
                }"
              />
              `
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${
                global.search.type === "movie" ? result.title : result.name
              }</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${
                  global.search.type === "movie"
                    ? result.release_date
                    : result.first_air_date
                }</small>
              </p>
            </div>
          `;

    document.querySelector("#search-results-heading").innerHTML = `
                <h2>${results.length} of ${global.search.total_results} Results for ${global.search.term}</h2>
    `;

    document.querySelector("#search-results").appendChild(div);
  });

  displayPagination();
}

function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
      <button class="btn btn-primary" id="prev">Prev</button>
      <button class="btn btn-primary" id="next">Next</button>
      <div class="page-counter">Page ${global.search.page} of ${global.search.total_pages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  // Disable the Prev Button if on Page 1
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }
  // Disable the Next Button if on Last Page
  if (global.search.page === global.search.total_pages) {
    document.querySelector("#next").disabled = true;
  }

  // Previous 20 Movies or Page
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
  // Next 20 Movies or Page
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
}

// Display Slider
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
    `;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      // disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch Data from MovieDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.API_KEY;
  const API_URL = global.api.API_URL;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

// Make Request to Search
async function searchAPIData() {
  const API_KEY = global.api.API_KEY;
  const API_URL = global.api.API_URL;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function highlightActiveLinks() {
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Show Alert
function showAlert(message, className = "error") {
  const div = document.createElement("div");
  div.classList.add("alert", className);
  div.appendChild(document.createTextNode(message));

  document.querySelector("#alert").appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

// New function to check API accessibility
async function isAPIAccessible() {
  const response = await fetch(
    `${global.api.API_URL}movie/popular?api_key=${global.api.API_KEY}&language=en-US`
  );

  // Hide the spinner before returning the result
  hideSpinner();
  return response.ok;
}

async function init() {
  showSpinner(); // Show the spinner when initializing

  // Check if the API is accessible before proceeding
  if (!(await isAPIAccessible())) {
    document.body.innerHTML = `
        <div class="error-message">
          TMDB API doesn't work in India. Please use a VPN.
        </div>
      `;
    return;
  }

  // console.log(window.location.pathname);
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      // console.log("Home");
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      // console.log("Shows");
      displayPopularShows();
      break;
    case "/movie-details.html":
      // console.log("Movie Details");
      displayMovieDetails();
      break;
    case "/tv-details.html":
      // console.log("TV Details");
      displayShowDetails();
      break;
    case "/search.html":
      // console.log("Search");
      search();
      break;
  }

  highlightActiveLinks();
}

document.addEventListener("DOMContentLoaded", init);
