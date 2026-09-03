# kitaak.com — website + web demo

Static site (no server needed): `index.html` (Home), `application.html`, `about.html`, `contact.html`, and the **unlinked** demo at `demo.html`.
The demo lives in `demo/`: `demo.js`, `demo.css`, `demo-data.js` (Marmalad Aviation — Allison Carmel and 47 colleagues), `app.css` + `themes/` (the application's own stylesheet and palette previews), `plans-data.js`, `icons.js`, `themes.js`, the covers, the background track `background-music.mp3` and the Digital Demonstrator's `demo-voice-message.mp3`.

Publish: copy everything in this folder to the root of the repository that serves kitaak.com (GitHub Pages) with a `CNAME` containing `kitaak.com`.
The demo page is not linked from any other page — share `https://kitaak.com/demo.html` directly. It also works when opened from a local folder (file://).

Contact page: phone and address are left blank on purpose; the form opens the visitor's email app (set the form's `action` to a form service endpoint to change that).
