#  GitHub Profile Finder (DevFinder)

A sleek, modern, and responsive web application built to search GitHub users, view their profile statistics, bio, location, join date, and explore their top recently updated repositories with rich details (language, stars, forks, and last update date).

---

## Features

- **Instant Search:** Search any valid GitHub username instantly via button click or `Enter` key.
- **Glassmorphism UI:** Gorgeous dark purple aesthetic with blur effects, smooth transitions, and polished typography.
- **Dynamic Profile Card:** Displays avatar, name, handle, bio, public repositories count, followers, and following.
- **Additional Metadata:** Location, personal blog/website link, and formatted GitHub join date.
- **Top Repositories List:** Shows up to 5 recently updated repositories with descriptions, language indicators, star counts, fork counts, and last update timestamps.
- **Fully Responsive:** Optimized layouts for mobile phones, tablets, and desktop displays.
- **Local Asset Support:** Utilizes a local image (`GitHub.png`) for the logo.

---

## Built With

- **HTML5:** Semantic markup structure.
- **CSS3:** Custom properties (CSS variables), Flexbox, glassmorphism styling, and responsive media queries.
- **JavaScript (ES6+):** Asynchronous API calls (`fetch` and `Promise.all`), DOM manipulation, and dynamic event listeners.
- **GitHub REST API:** Fetches live user and repository data.

---

## 📂 Project Structure

```text
github-profile-finder/
│
├── index.html       # Main HTML structure
├── style.css        # Styling and responsive design
├── script.js        # JavaScript logic & GitHub API integration
├── GitHub.png       # Local logo image asset
└── README.md        # Project documentation
