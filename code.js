// FAVOURITES HTML


// ===============================
// STORAGE KEYS
// ===============================
// Centralised localStorage key names — changing them here updates all references automatically,
// preventing hard-coded string mismatches across the file.
const FAVORITES_KEY = "movieFavorites";
const SUGGESTIONS_KEY = "movieSuggestions";

// ===============================
// PAGE LOAD
// ===============================
// First DOMContentLoaded listener: runs shared initialisation that applies to every page.
// It checks which page-specific elements exist before calling their setup functions,
// so a single code.js file can safely be included on all HTML pages.
document.addEventListener("DOMContentLoaded", () => {
  // Show all movie cards on load so the grid is visible before any filter is applied.
  const movies = document.querySelectorAll(".movie-card");
  movies.forEach((movie) => {
    movie.style.display = "block";
  });

  // --- Recommendation page (recommendation.html) ---
  // "ageBtn" only exists on the recommendations page, so these calls are skipped elsewhere.
  if (document.getElementById("ageBtn")) {
    handleMovieFiltering(); // Sets up the genre + age filter logic (defined further down)
    enableAddToFavorites(); // Attaches "Add to Favorites" buttons to every card
  }

  // --- Favorites page (favourite.html) ---
  // "favoritesList" only exists on the favorites page.
  if (document.getElementById("favoritesList")) {
    loadFavorites(); // Reads localStorage and renders saved movies
  }

  // --- Suggestion form (favourite.html) ---
  if (document.getElementById("suggestForm")) {
    handleSuggestionForm(); // Wires up the movie-suggestion form
  }

  // --- Feedback form (favourite.html) ---
  if (document.getElementById("feedbackForm")) {
    handleFeedbackForm(); // Wires up the feedback form
  }
});




// RECOMENDATION HTML


// ===============================
// 1. MOVIE FILTERING
// ===============================
// Second DOMContentLoaded listener specifically for the filter button.
// It's kept separate so the filtering logic is self-contained and easy to locate.
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("ageBtn");

  // Guard clause: exit immediately if we're not on the recommendations page.
  if (!btn) return;

  btn.addEventListener("click", () => {
    const ageInput = document.getElementById("ageInput").value;
    const genre = document.getElementById("genre").value;
    const movieList = document.getElementById("movieList");
    const movies = document.querySelectorAll(".movie-card");

    // --- Input validation ---
    // Each guard uses alert() to surface feedback without a dedicated error element.
    if (ageInput === "") {
      alert("Please enter your age");
      return;
    }

    const age = parseInt(ageInput);

    // parseInt("abc") returns NaN; age <= 0 catches negative or zero input.
    if (isNaN(age) || age <= 0) {
      alert("Please enter a valid age");
      return;
    }

    if (genre === "select") {
      alert("Please select a genre");
      return;
    }

    // --- Age-group mapping ---
    // Maps the numeric age to a string that matches the data-age attributes on movie cards.
    // This is the key logic that links form input to HTML data attributes.
    let ageGroup = "";

    if (age >= 18) ageGroup = "18andAbove";
    else if (age >= 13) ageGroup = "13to17";
    else if (age >= 7) ageGroup = "7to12";
    else ageGroup = "6andBelow"; // Catches ages 1–6

    let found = false;

    // Make the grid container visible before iterating so shown cards render immediately.
    movieList.style.display = "grid";

    // --- Card visibility loop ---
    // Each card carries data-genre and data-age attributes set in the HTML.
    // A card is shown only when BOTH attributes match the user's selection.
    movies.forEach((movie) => {
      const movieGenre = movie.getAttribute("data-genre");
      const movieAge = movie.getAttribute("data-age");

      if (movieGenre === genre && movieAge === ageGroup) {
        movie.style.display = "block";
        found = true;

        // Dynamically add an "Add to Favorites" button the first time a card is shown.
        // The guard prevents duplicate buttons if the filter is run more than once.
        if (!movie.querySelector(".fav-btn")) {
          const favBtn = document.createElement("button");
          favBtn.textContent = "Add to Favorites";
          favBtn.classList.add("fav-btn");

          movie.appendChild(favBtn);

          // Click handler: reads the card's title and image, then saves to localStorage.
          favBtn.addEventListener("click", () => {
            const title = movie.querySelector("h3").textContent;
            const img = movie.querySelector("img").src;

            // Retrieve current favorites array, or start with an empty array.
            let favorites =
              JSON.parse(localStorage.getItem("movieFavorites")) || [];

            // Prevent the same movie being saved twice by checking the title.
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
        // Hide cards that don't match the current filter.
        movie.style.display = "none";
      }
    });

    // If no card matched, alert the user and collapse the now-empty grid container.
    if (!found) {
      alert("No movies found for your selection");
      movieList.style.display = "none";
    }
  });
});

// ===============================
// 2. ADD TO FAVORITES
// ===============================
// Called on page load for the recommendations page.
// Appends an "Add to Favorites" button to every movie card upfront,
// so cards already visible before any filter is applied also have the button.
// Note: The filtering section (above) also adds buttons dynamically to newly revealed cards,
// so cards that were hidden on load still get a button when they first appear.
function enableAddToFavorites() {
  const movies = document.querySelectorAll(".movie-card");

  movies.forEach((movie) => {
    // Create and append the button
    const btn = document.createElement("button");
    btn.textContent = "Add to Favorites";
    btn.classList.add("fav-btn");

    movie.appendChild(btn);

    btn.addEventListener("click", () => {
      const title = movie.querySelector("h3").textContent;
      const img = movie.querySelector("img").src;

      // Use the constant key defined at the top of the file.
      let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

      // Duplicate guard: only add if the title isn't already saved.
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
// Reads the favorites array from localStorage and rebuilds the favorites grid.
// Called on initial page load AND after each removal so the list stays in sync.
function loadFavorites() {
  const container = document.getElementById("favoritesList");
  const emptyMsg = document.getElementById("emptyFavorites");

  let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

  // Clear the container before re-rendering to avoid duplicate cards.
  container.innerHTML = "";

  // Show the "no favorites yet" message when the array is empty.
  if (favorites.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  // Build a card element for each saved movie.
  favorites.forEach((movie, index) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");

    // The card only needs the poster image and title — genre/description aren't stored.
    div.innerHTML = `
            <img src="${movie.img}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
            </div>
            <button class="remove-btn">Remove</button>
        `;

    container.appendChild(div);

    // Remove button: splices the item out of the array by its current index,
    // persists the updated array, then re-renders the whole list.
    // NOTE: Because loadFavorites() rebuilds innerHTML each time, the index captured
    // in the closure is always correct at the moment of the click.
    div.querySelector(".remove-btn").addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      loadFavorites(); // Re-render after removal
    });
  });
}

// ===============================
// 4. SUGGESTION FORM
// ===============================
// Handles the "Suggest a Movie" form on the favorites page.
// Saves suggestions to localStorage (they are not sent to a server).
function handleSuggestionForm() {
  const form = document.getElementById("suggestForm");
  const msg = document.getElementById("suggestMsg");

  // Hide the success message on load so it only appears after a valid submission.
  msg.style.display = "none";

  form.addEventListener("submit", (e) => {
    // Prevent the default browser form submission / page reload.
    e.preventDefault();

    const name = document.getElementById("movieName").value.trim();
    const genre = document.getElementById("movieGenre").value;

    // Both fields are required; the genre select defaults to an empty string.
    if (name === "" || genre === "") {
      alert("Please fill all fields.");
      return;
    }

    // Append the new suggestion to any existing ones in localStorage.
    let suggestions = JSON.parse(localStorage.getItem(SUGGESTIONS_KEY)) || [];
    suggestions.push({ name, genre });
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(suggestions));

    // Show confirmation message and reset form fields.
    msg.style.display = "block";
    form.reset();
  });
}

// ===============================
// 5. FEEDBACK FORM
// ===============================
// Handles the feedback form on the favorites page.
// Feedback is validated client-side only and is NOT persisted or sent anywhere.
function handleFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  const msg = document.getElementById("feedbackMsg");

  // Hide the success message on load.
  msg.style.display = "none";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const feedback = document.getElementById("feedbackText").value.trim();

    // All three fields must be filled before the form can be submitted.
    if (name === "" || email === "" || feedback === "") {
      alert("All fields are required.");
      return;
    }

    // Basic email validation: checks for the presence of "@".
    // This is intentionally lightweight — the HTML input type="email" handles deeper validation.
    if (!email.includes("@")) {
      alert("Enter a valid email.");
      return;
    }

    // Show confirmation and reset the form.
    msg.style.display = "block";
    form.reset();
  });
}
