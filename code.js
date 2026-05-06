// ===============================
// STORAGE KEYS
// ===============================
const FAVORITES_KEY = "movieFavorites";
const SUGGESTIONS_KEY = "movieSuggestions";

// ===============================
// PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // SHOW ALL MOVIES BY DEFAULT
  const movies = document.querySelectorAll(".movie-card");
  movies.forEach((movie) => {
    movie.style.display = "block";
  });

  // Recommendation Page
  if (document.getElementById("ageBtn")) {
    handleMovieFiltering();
    enableAddToFavorites();
  }

  // Favorites Page
  if (document.getElementById("favoritesList")) {
    loadFavorites();
  }

  // Forms
  if (document.getElementById("suggestForm")) {
    handleSuggestionForm();
  }

  if (document.getElementById("feedbackForm")) {
    handleFeedbackForm();
  }
});

// ===============================
// 1. MOVIE FILTERING
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("ageBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const ageInput = document.getElementById("ageInput").value;
    const genre = document.getElementById("genre").value;
    const movieList = document.getElementById("movieList");
    const movies = document.querySelectorAll(".movie-card");

    // VALIDATION (NOW USING ALERTS)
    if (ageInput === "") {
      alert("Please enter your age");
      return;
    }

    const age = parseInt(ageInput);

    if (isNaN(age) || age <= 0) {
      alert("Please enter a valid age");
      return;
    }

    if (genre === "select") {
      alert("Please select a genre");
      return;
    }

    // DETERMINE AGE GROUP
    let ageGroup = "";

    if (age >= 18) ageGroup = "18andAbove";
    else if (age >= 13) ageGroup = "13to17";
    else if (age >= 7) ageGroup = "7to12";
    else ageGroup = "6andBelow";

    let found = false;

    // SHOW MOVIE CONTAINER NOW
    movieList.style.display = "grid";

    movies.forEach((movie) => {
      const movieGenre = movie.getAttribute("data-genre");
      const movieAge = movie.getAttribute("data-age");

      if (movieGenre === genre && movieAge === ageGroup) {
        movie.style.display = "block";
        found = true;

        // ✅ ADD FAVORITES BUTTON (ONLY ADD THIS PART)
        if (!movie.querySelector(".fav-btn")) {
          const favBtn = document.createElement("button");
          favBtn.textContent = "Add to Favorites";
          favBtn.classList.add("fav-btn");

          movie.appendChild(favBtn);

          favBtn.addEventListener("click", () => {
            const title = movie.querySelector("h3").textContent;
            const img = movie.querySelector("img").src;

            let favorites =
              JSON.parse(localStorage.getItem("movieFavorites")) || [];

            if (!favorites.some((f) => f.title === title)) {
              favorites.push({ title, img });
              localStorage.setItem("movieFavorites", JSON.stringify(favorites));
              alert("Added to favorites!");
            } else {
              alert("Already in favorites!");
            }
          });
        }
      } else {
        movie.style.display = "none";
      }
    });

    if (!found) {
      alert("No movies found for your selection");
      movieList.style.display = "none"; // hide again if none found
    }
  });
});

// ===============================
// 2. ADD TO FAVORITES
// ===============================
function enableAddToFavorites() {
  const movies = document.querySelectorAll(".movie-card");

  movies.forEach((movie) => {
    // CREATE BUTTON
    const btn = document.createElement("button");
    btn.textContent = "Add to Favorites";
    btn.classList.add("fav-btn");

    movie.appendChild(btn);

    btn.addEventListener("click", () => {
      const title = movie.querySelector("h3").textContent;
      const img = movie.querySelector("img").src;

      let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

      // AVOID DUPLICATES
      if (!favorites.some((fav) => fav.title === title)) {
        favorites.push({ title, img });
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        alert("Added to favorites!");
      } else {
        alert("Already in favorites!");
      }
    });
  });
}

// ===============================
// 3. LOAD FAVORITES PAGE
// ===============================
function loadFavorites() {
  const container = document.getElementById("favoritesList");
  const emptyMsg = document.getElementById("emptyFavorites");

  let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

  container.innerHTML = "";

  if (favorites.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  favorites.forEach((movie, index) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");

    div.innerHTML = `
            <img src="${movie.img}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
            </div>
            <button class="remove-btn">Remove</button>
        `;

    container.appendChild(div);

    // REMOVE BUTTON
    div.querySelector(".remove-btn").addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      loadFavorites();
    });
  });
}

// ===============================
// 4. SUGGESTION FORM
// ===============================
function handleSuggestionForm() {
  const form = document.getElementById("suggestForm");
  const msg = document.getElementById("suggestMsg");

  msg.style.display = "none";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("movieName").value.trim();
    const genre = document.getElementById("movieGenre").value;

    if (name === "" || genre === "") {
      alert("Please fill all fields.");
      return;
    }

    let suggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_KEY)) || [];

    suggestions.push({ name, genre });

    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(suggestions));

    msg.style.display = "block";
    form.reset();
  });
}

// ===============================
// 5. FEEDBACK FORM
// ===============================
function handleFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  const msg = document.getElementById("feedbackMsg");

  msg.style.display = "none";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const feedback = document.getElementById("feedbackText").value.trim();

    if (name === "" || email === "" || feedback === "") {
      alert("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email.");
      return;
    }

    msg.style.display = "block";
    form.reset();
  });
}
