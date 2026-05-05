
/*
========================================================
MOVIE MOOD - JAVASCRIPT FUNCTIONALITY
========================================================

This script controls:
✔ Movie search
✔ Genre filtering
✔ Age-based recommendations
✔ Form validation and error handling
✔ Dynamic DOM updates
✔ Favorites system using localStorage
✔ "No movies found" feedback

========================================================
*/


/* =====================================================
   1. SELECT DOM ELEMENTS
   -----------------------------------------------------
   We grab elements from the HTML so we can interact
   with them dynamically using JavaScript.
===================================================== */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genre");
const ageInput = document.getElementById("ageInput");
const ageBtn = document.getElementById("ageBtn");

const errorMsg = document.getElementById("ageError");
const noResults = document.getElementById("noResults");

const movies = document.querySelectorAll(".movie-card");


/* =====================================================
   2. AGE CATEGORY FUNCTION
   -----------------------------------------------------
   Converts a user's age into a category used to filter
   movies (based on your HTML data-age attributes).
===================================================== */

function getAgeCategory(age) {
    if (age >= 18) return "18andAbove";
    if (age >= 13) return "13to17";
    if (age >= 7) return "7to12";
    return "6andBelow";
}


/* =====================================================
   3. MAIN FILTER FUNCTION
   -----------------------------------------------------
   This is the core logic of the application.

   It:
   ✔ Reads user input (search, genre, age)
   ✔ Validates age input
   ✔ Filters movies dynamically
   ✔ Updates the page in real-time
===================================================== */

function filterMovies() {

    // Get user inputs
    const searchValue = searchInput.value.toLowerCase();
    const selectedGenre = genreSelect.value;
    const ageValue = ageInput.value;

    let ageCategory = null;
    let visibleCount = 0; // counts visible movies


    /* -------------------------
       AGE VALIDATION
    -------------------------- */

    if (ageValue !== "") {
        const age = parseInt(ageValue);

        // Check for invalid age
        if (isNaN(age) || age < 0) {
            errorMsg.classList.add("show"); // show error
            return; // stop execution
        } else {
            errorMsg.classList.remove("show"); // hide error
            ageCategory = getAgeCategory(age);
        }
    } else {
        errorMsg.classList.remove("show");
    }


    /* -------------------------
       FILTER MOVIES
    -------------------------- */

    movies.forEach(movie => {

        // Get movie data
        const title = movie.querySelector("h3").textContent.toLowerCase();
        const genre = movie.dataset.genre;
        const age = movie.dataset.age;

        // Check conditions
        const matchSearch = title.includes(searchValue);
        const matchGenre = selectedGenre === "all" || genre === selectedGenre;
        const matchAge = !ageCategory || age === ageCategory;

        // Show or hide movie
        if (matchSearch && matchGenre && matchAge) {
            movie.style.display = "block";
            visibleCount++; // increase count
        } else {
            movie.style.display = "none";
        }
    });


    /* -------------------------
       NO RESULTS MESSAGE
    -------------------------- */

    if (visibleCount === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}


/* =====================================================
   4. FAVORITES SYSTEM (LOCAL STORAGE)
   -----------------------------------------------------
   Allows users to save movies.
   Data is stored in browser localStorage and can be
   accessed by other pages.
===================================================== */

function saveToFavorites(title) {

    // Get existing favorites or create empty array
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if already saved
    if (!favorites.includes(title)) {
        favorites.push(title);

        // Save back to localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert(title + " added to favorites!");
    } else {
        alert("Movie already in favorites!");
    }
}


/* =====================================================
   5. ADD BUTTONS DYNAMICALLY (DOM MANIPULATION)
   -----------------------------------------------------
   Adds "Add to Favorites" button to every movie card.
   Demonstrates dynamic creation of elements.
===================================================== */

movies.forEach(movie => {

    const title = movie.querySelector("h3").textContent;

    // Create button
    const btn = document.createElement("button");
    btn.textContent = "Add to Favorites";
    btn.style.marginTop = "10px";

    // Add click event
    btn.addEventListener("click", () => {
        saveToFavorites(title);
    });

    // Attach button to movie card
    movie.querySelector(".movie-info").appendChild(btn);
});


/* =====================================================
   6. EVENT LISTENERS
   -----------------------------------------------------
   Handles user interactions (clicks, typing, form
   submission).
===================================================== */


// SEARCH (form submission)
searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload
    filterMovies();
});


// LIVE SEARCH (typing)
searchInput.addEventListener("keyup", filterMovies);


// GENRE CHANGE (dropdown)
genreSelect.addEventListener("change", filterMovies);


// AGE BUTTON CLICK
ageBtn.addEventListener("click", function () {

    // Check if empty
    if (ageInput.value === "") {
        errorMsg.classList.add("show");
        return;
    }

    filterMovies();
});


// ================= GET ELEMENTS =================
const favoritesList = document.getElementById("favoritesList");
const emptyMsg = document.getElementById("emptyFavorites");

// ================= LOAD FAVORITES =================
function loadFavorites() {

    // Get saved data
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Clear existing content
    favoritesList.innerHTML = "";

    // If no favorites
    if (favorites.length === 0) {
        emptyMsg.style.display = "block";
        return;
    } else {
        emptyMsg.style.display = "none";
    }

    // Loop through favorites
    favorites.forEach(title => {

        // Create movie card
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <div class="movie-info">
                <h3>${title}</h3>
                <p>Saved movie</p>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        // REMOVE BUTTON
        card.querySelector(".remove-btn").addEventListener("click", () => {
            removeFromFavorites(title);
        });

        favoritesList.appendChild(card);
    });
}


// ================= REMOVE FUNCTION =================
function removeFromFavorites(title) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Remove movie
    favorites = favorites.filter(movie => movie !== title);

    // Save updated list
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Reload page content
    loadFavorites();
}


// ================= LOAD ON PAGE START =================
document.addEventListener("DOMContentLoaded", loadFavorites);



/* =====================================================
   END OF SCRIPT
===================================================== */

