# GoldTech Fitness — Frontend Dashboard

This workspace contains a production-quality responsive Home Dashboard page for a premium smart gym platform.

Files:
- `index.html` — Full dashboard UI built with Tailwind CDN and vanilla JavaScript.

How to run:
1. Open `index.html` in your browser (double-click or via editor preview).
2. For a local static server (recommended), run in the project folder:

```bash
# Python 3
python -m http.server 8000

# then open http://localhost:8000/index.html
```

Notes:
- Uses Tailwind CDN (no build step required).
- Replace placeholder images and video sources with production assets.
- The code is intentionally modular and uses semantic HTML, Tailwind utilities, and vanilla JS for interactions.

Accessibility & performance suggestions:
- Add aria-live regions for real-time widgets.
- Lazy-load large images and videos for faster initial load.

Enjoy the premium dashboard — tell me if you want separate component files, image assets, or a minimal dev toolchain.
