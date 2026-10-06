# Pakistan Explorer (class project)
Stack: HTML, CSS, Tailwind (CDN), Node.js (no dependencies).
Free APIs (no keys): REST Countries, Wikipedia REST, Open-Meteo.

## Run
1. Install Node.js 18 or newer
2. `cd pakistan-explorer && npm start`
3. Open http://localhost:3000   (needs internet for APIs, fonts and Tailwind CDN)

## Notes
Images are loaded from Wikipedia/Wikimedia. Wikimedia only serves standard thumbnail widths (250, 330, 500, 960, 1280, 1920), so the code snaps to those and falls back to the original size, then to a placeholder.
