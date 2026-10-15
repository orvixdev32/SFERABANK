# MintixBank — Frontend Web Application

MintixBank is a responsive landing page for a modern online banking platform, built using pure web technologies without heavy third-party frameworks. The project demonstrates core frontend competencies: semantic markup, clean CSS architecture powered by Custom Properties, and modular DOM interactions using native JavaScript.

## Key Features

- **Responsive Design (Mobile-First):** Optimized layout across mobile, tablet, and desktop viewports using Flexbox and CSS Grid.
- **Dark & Light Theme Support:** Dynamic color scheme powered by CSS variables, persisted in LocalStorage, with automatic detection of user system preferences (`prefers-color-scheme`).
- **Internationalization (i18n):** Real-time language switching (UA / EN) via a client-side dictionary without page reloads.
- **Interactive 3D Bank Card:** Dynamic tilt and glare perspective effect in the Hero section powered by `vanilla-tilt.js`.
- **Live Support Chatbot Widget:**
  - Floating greeting tooltip and unread notification badge;
  - Animated message appearance;
  - Simulated operator typing indicator;
  - Full-screen modal mode on mobile viewports.
- **Card Application Form:**
  - Animated Floating Labels effect;
  - Ukrainian phone number validation format (`+380...` / `0...`);
  - Interactive submission flow with loading state (CSS spinner) and demo notice without requiring a backend server.
- **Authentication & User Cabinet:**
  - Accessible login modal with input validation and loading state;
  - Client-side personal cabinet displaying verified user status, card info, and balance;
  - Session persistence via SessionStorage;
  - Keyboard accessibility (close via Escape key).

## Demo Credentials

To test the authentication flow and view the personal cabinet:
- **Username:** `admin`
- **Password:** `12345`

## Technologies Used

- **HTML5:** Semantic elements, ARIA accessibility attributes (a11y), proper heading hierarchy, autocomplete attributes.
- **CSS3:** Custom Properties (variables), CSS Grid, Flexbox, keyframes animations, backdrop-filter, `prefers-reduced-motion` media query.
- **JavaScript (ES6+):** DOM manipulation, event delegation, Web Storage API (LocalStorage, SessionStorage), asynchronous timers.
- **Libraries:** `vanilla-tilt.js` (loaded via CDN for the 3D card tilt effect).

## Project Structure

```text
├── index.html        # Main markup file
├── style.css         # Stylesheet with CSS variables, themes, and responsiveness
├── javascript.js     # Client-side logic (themes, i18n, modals, forms, chatbot)
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## How to Run

The project is completely static and requires no build steps or dependencies.

1. Clone the repository or download the source files.
2. Open `index.html` directly in any modern browser (Chrome, Firefox, Safari, Edge).
3. For local development, using the VS Code Live Server extension is recommended.