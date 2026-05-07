# Movie Mood


## Author information
**Name**: Louis .
**Email**: louismwangi2997@gmail.com

---

## Project description
This web application helps users discover movies based on preferences such as genre and preferences , reducing decision fatigue when choosing entertainment.Moreover,MovieMood is a static, multi-page website built with plain HTML, CSS, and JavaScript. It requires no server, no database, and no build tools. All user data (favourites and suggestions) is stored in the browser's `localStorage`.

---

## Pages

- **index.html** — Home / landing page
- **recommendation.html** — Filter and browse movies
- **favourite.html** — View saved favourites, suggest movies, leave feedback

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

---

# BBD (Behaviour Driven Development)


## Feature: Movie Filtering

**As a** user on the Movies page
**I want to** filter movies by my age and preferred genre
**So that** I only see movies that are appropriate for me


1. **Scenario: Successful movie filter.**

  Given I am on the Movies page
  When I select a genre from the dropdown
  And I enter a valid age
  And I click "Find Movies"
  Then I should see only movies that match my selected genre and age group

2. **Scenario: No movies found.**

  Given I am on the Movies page
  When I select a genre and enter an age
  And no movies exist for that combination
  Then I should see an alert saying "No movies found for your selection"
  And the movie grid should be hidden

3. **Scenario: Age or genre not provided.**

  Given I am on the Movies page
  When I click "Find Movies" without entering an age or selecting a genre
  Then I should see an alert prompting me to fill in the missing field


---

## Feature: Add to Favourites

**As a** user viewing movie results
**I want to** save a movie to my favourites
**So that** I can find it again later on the Favourites page


1. **Scenario: Adding a new favourite.**

  Given a movie card is visible on the Movies page
  When I click "Add to Favorites"
  Then the movie title and poster should be saved to localStorage
  And I should see an alert saying "Added to favorites!"

2. **Scenario: Adding a duplicate favourite.**

  Given a movie has already been saved to my favourites
  When I click "Add to Favorites" on the same movie again
  Then the movie should not be saved again
  And I should see an alert saying "Already in favorites!"


---

## Feature: Favourites List

**As a** user on the Favourites page
**I want to** see all my saved movies
**So that** I can manage the movies I have liked


1. **Scenario: Viewing saved favourites.**

  Given I have saved one or more movies
  When I open the Favourites page
  Then I should see a card for each saved movie with its title and poster

2. **Scenario: No saved favourites.**

  Given I have not saved any movies
  When I open the Favourites page
  Then I should see the message "You have no favorite movies yet"

3. **Scenario: Removing a favourite.**

  Given a movie is displayed on my Favourites page
  When I click "Remove" on that movie card
  Then the movie should be deleted from localStorage
  And the favourites list should refresh without that movie


---

## Feature: Movie Suggestion Form

**As a** user on the Favourites page
**I want to** suggest a movie
**So that** it can potentially be added to the website


1. **Scenario: Submitting a valid suggestion.**

  Given I am on the Favourites page
  When I enter a movie title and select a genre
  And I click "Submit"
  Then my suggestion should be saved to localStorage
  And I should see the message "Suggestion submitted!"
  And the form should reset

2. **Scenario: Submitting with empty fields.**

  Given I am on the Favourites page
  When I click "Submit" without filling in all fields
  Then I should see an alert saying "Please fill all fields."
  And the suggestion should not be saved


---

## Feature: Feedback Form

**As a** user on the Favourites page
**I want to** leave feedback about the website
**So that** the developer knows what I think


1. **Scenario: Submitting valid feedback.**

  Given I am on the Favourites page
  When I enter my name, a valid email, and feedback text
  And I click "Send"
  Then I should see the message "Feedback submitted!"
  And the form should reset

2. **Scenario: Submitting with empty fields.**

  Given I have not filled in all fields
  When I click "Send"
  Then I should see an alert saying "All fields are required."

3. **Scenario: Submitting an invalid email.**

  Given I have filled in all fields
  But my email does not contain "@"
  When I click "Send"
  Then I should see an alert saying "Enter a valid email."


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




