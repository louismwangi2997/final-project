# Movie Mood


## Author information
**Name**: Louis .
**Email**: louismwangi2997@gamil.com .
**GitHub repo**:[(https://louismwangi2997.github.io/final-project/)]

---

## Project description
This web application helps users discover movies based on preferences such as genre and preferences , reducing decision fatigue when choosing entertainment.Moreover,MovieMood is a static, multi-page website built with plain HTML, CSS, and JavaScript. It requires no server, no database, and no build tools. All user data (favourites and suggestions) is stored in the browser's `localStorage`.

---

## Pages

- **index.html** — Home / landing page
- **recommendation.html** — Filter and browse movies
- **favourite.html** — View saved favourites, suggest movies, leave feedback

---

## Features

### Movie Filtering (`recommendation.html`)
- User enters their age and selects a genre (Action, Comedy, Romance, Horror).
- On clicking **Find Movies**, the app maps the age to one of four age groups and shows only cards that match both the genre and age group.
- If no movies match, an alert is shown and the grid is hidden.

### Add to Favourites (`recommendation.html`)
- Every visible movie card has an **Add to Favorites** button.
- Clicking it saves the movie's title and poster image URL to `localStorage`.
- Duplicate entries are prevented by checking the title before saving.

### Favourites List (`favourite.html`)
- Displays all saved movies on page load.
- Each card has a **Remove** button that deletes it from `localStorage` and refreshes the list.
- If no movies are saved, a friendly empty-state message is shown.

### Movie Suggestion Form (`favourite.html`)
- Users can submit a movie title and genre.
- Submissions are saved to `localStorage` under the `movieSuggestions` key.
- A success message is shown after a valid submission.

### Feedback Form (`favourite.html`)
- Collects name, email, and free-text feedback.
- Validated client-side (all fields required, email must contain `@`).
- Feedback is **not** stored or sent anywhere — the form is purely presentational.

---

## File Structure

```
MovieMood/
├── index.html            # Home page
├── recommendation.html   # Movie filter + results page
├── favourite.html        # Favourites, suggestion form, feedback form
├── style.css             # Shared stylesheet
├── code.js               # All JavaScript logic
└── img/                  # Movie poster images
    ├── actionHOME.jpg
    ├── finalDestination.png
    ├── theNun.jpg
    └── ... (one image per movie card)
```

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript (ES6) | Interactivity and logic |
| localStorage (Web Storage API) | Saving favourites and suggestions |

---

## How to Run

**Option 1 — Open directly in a browser**
1. Download or clone the project folder
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge)
3. No installation or internet connection required

**Option 2 — Use a local development server (recommended)**

Using VS Code with the Live Server extension:
1. Right-click `index.html` → **Open with Live Server**.
2. The site will open at [live site](https://louismwangi2997.github.io/final-project/).


---
# How MovieMood Works

## 1. Finding Movies

1. Go to the **Movies** page
2. Select a **genre** (Action, Comedy, Romance, Horror)
3. Enter your **age**
4. Click **Find Movies**
5. Your movie suggestions will appear below

---

## 2. Saving Favourites 

1. When your movies appear, click **Add to Favorites** on any movie card
2. Go to the **Favorites** page to see all your saved movies
3. Click **Remove** on any movie to delete it from your list

---

## 3. Suggesting a Movie 

1. Go to the **Favorites** page
2. Scroll down to the **Suggest a Movie** section
3. Type in a movie title and select a genre
4. Click **Submit**

---

## 4. Leaving Feedback 

1. Go to the **Favorites** page
2. Scroll down to the **Feedback** section
3. Fill in your name, email, and feedback
4. Click **Send**

---

## Age Guide

| Your Age | Movies You Will See |
|---|---|
| 6 and under | Comedy only |
| 7 – 12 | Action, Comedy, Romance |
| 13 – 17 | Action, Comedy, Romance |
| 18 and above | Action, Comedy, Romance, Horror |

> **Note:** Horror movies are only available to users aged 18 and above.

> **Note**Users aged 6 and below only have Comedy options available, as all other genres lack cards tagged `data-age="6andBelow"`.


---


## Known Bugs

- **Duplicate buttons** — "Add to Favorites" can appear twice on a card because the button is added both on page load and when the filter runs
- **Broken images after moving the folder** — Poster images saved to favourites use absolute file paths, so they may not load if the project folder is moved
- **Feedback not saved** — The feedback form shows a success message but the data is not stored or sent anywhere
- **Suggestions not displayed** — Movie suggestions are saved to `localStorage` but there is no page to view them
- **alert() popups** — All messages use browser alert boxes instead of cleaner inline messages

---

## License and Copyright
### Copyright © 2026 Movie Mood

This project is licensed under the MIT License. See below for details:

## MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




