# ZooBio — Interactive Zoology Lab 🔬

A static, dependency-free website for college Zoology practicals: explore the
six kingdoms of life, rotate annotated 2-D dissection models of a **cockroach**
(*Periplaneta americana*) and a **fish** (*Channa punctata*), and read a guide
to biological classification.

No build tools, frameworks, or servers required — pure HTML / CSS / JS.

---

## 📁 File structure

```
zoology-website/
├── index.html          # All 3 pages (Home, Dissection Lab, Classification)
├── styles.css           # All styling
├── data.js               # ALL text content lives here — edit this first
├── canvas-cockroach.js   # Draws & handles the cockroach model
├── canvas-channa.js      # Draws & handles the Channa punctata model
└── app.js                # Navigation + renders kingdom/criteria/timeline etc.
```

---

## 🚀 Run it locally

Just open `index.html` in a browser — no server needed. (Some browsers
restrict `fetch`/modules from `file://`, but this project uses plain scripts,
so it works directly.)

For a local dev server (optional, nicer for live-reload):

```bash
cd zoology-website
python3 -m http.server 8000
# visit http://localhost:8000
```

---

## ☁️ Deploy on GitHub + Render

### 1. Push to GitHub
```bash
cd zoology-website
git init
git add .
git commit -m "Initial commit: ZooBio interactive zoology site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com) → **New** → **Static Site**.
2. Connect your GitHub repo.
3. Settings:
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `.` (the repo root, since `index.html` is at the top level)
4. Click **Create Static Site**. Render will give you a live URL like
   `https://your-site.onrender.com`.

That's it — every future `git push` to `main` auto-redeploys.

---

## ✏️ How to extend the site

Everything is built so you can keep adding content without touching layout code.

### Add a new dissection specimen (e.g., frog, earthworm)
1. **HTML** (`index.html`): copy the `<div class="specimen-panel" id="spec-channa">…</div>`
   block, give it a new id (e.g. `spec-frog`), and add a matching tab button:
   ```html
   <button class="spec-tab" data-specimen="frog">🐸 Rana tigrina</button>
   ```
2. **Data** (`data.js`): add a `FROG_ORGANS` array following the same shape as
   `COCKROACH_ORGANS` (id, name, color, system, description, function).
3. **Canvas script**: copy `canvas-channa.js` → `canvas-frog.js`, rename the
   IDs (`channa-canvas` → `frog-canvas`, etc.) and adjust the `getRegions()`
   coordinates and the body-drawing function to look like a frog.
4. Add `<script src="canvas-frog.js"></script>` before `app.js` in `index.html`,
   and call `window.initFrog()` inside `app.js`'s `DOMContentLoaded` handler.
5. `app.js`'s existing `initSpecimenTabs()` will automatically handle the new
   tab — no changes needed there.

### Add/edit kingdoms, phyla, criteria, taxonomy ranks, or history
All of these are plain JavaScript arrays at the top of **`data.js`** —
`KINGDOMS`, `PHYLA_DATA`, `CLASSIFICATION_CRITERIA`, `TAXON_RANKS`,
`CLASS_HISTORY`. Add a new object to the array following the existing shape
and it will automatically render (cards, accordion rows, timeline entries, etc.)
— `app.js` loops over these arrays, so no HTML edits are needed.

### Add a 4th page
1. Add a `<section class="page" id="page-yourpage">…</section>` in `index.html`.
2. Add a nav button: `<button class="nav-btn" data-page="yourpage">Your Page</button>`.
3. Done — `app.js`'s `initNavButtons()` and `goToPage()` are generic and will
   pick it up automatically.

### Replace the 2-D canvas models with real 3-D models
The current models are lightweight 2-D canvas drawings with clickable
hotspots (no external assets, loads instantly). If you later want true 3-D:
- Use `<model-viewer>` (Google's web component for `.glb`/`.gltf` files) or
  Three.js.
- Replace the `<canvas>` element inside `.model-viewport` with your 3-D
  viewer, and keep the `.organ-panel` / organ-data structure for the
  information sidebar — that part doesn't need to change.

---

## 🧪 Notes for teachers / students

- All anatomical text is in `data.js` — easy to proofread, translate, or
  expand with diagrams/citations.
- The site is intentionally a **supplement**, not a replacement, for the
  practical syllabus — it's designed to help students revise organ
  identification and function before/after the lab session.
- Everything is keyboard- and mobile-friendly, and respects
  `prefers-reduced-motion`.

---

## 📜 License
Free to use, modify, and extend for educational purposes.
