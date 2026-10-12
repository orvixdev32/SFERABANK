MintixBank

Frontend part of a website for a modern online bank. The project demonstrates modern UI/UX design, interactive elements, and optimized performance on mobile devices.

Core Features

Responsive design (Mobile-First) using Flexbox and CSS Grid.

Theme switcher (Light/Dark) with state saved in LocalStorage.

Multilingual support (UA/EN) with dynamic text replacement via JavaScript.

Interactive 3D card in the hero section (powered by vanilla-tilt.js).

Chatbot widget:

Animated message appearance.

Typing indicator for the manager.

New message badge and popup greeting (tooltip).

Full-screen mode for mobile devices.

Card order form with floating labels effect.

Authorization modal window with CSS loading animation (spinner) and input error handling.

Technologies

HTML5 (Semantic markup, a11y accessibility attributes)

CSS3 (CSS variables, keyframes animations, backdrop-filter)

JavaScript (ES6, DOM manipulation, setTimeout, LocalStorage)

Project Structure

index.html : Main markup file.

style.css : All project styles, including media queries for responsiveness and dark theme styles.

javascript.js : Logic for language switcher, themes, modal windows, login form, and chatbot.

How to Run

The project is completely static and requires no build steps or dependencies.
To view it, simply open the index.html file in any modern web browser.

For development and to avoid potential CORS issues (if external APIs are added later), it is recommended to run the project via a local server, such as the Live Server extension for VS Code.