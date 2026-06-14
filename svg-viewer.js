// ===================================================
// svg-viewer.js
// Replaces canvas models with SVG diagrams
// + Video section + extensible specimen system
// ===================================================

// ── VIDEO DATA ────────────────────────────────────
// To add more videos: just push objects to this array
const DISSECTION_VIDEOS = [
  {
    specimen: "cockroach",
    title: "Cockroach External Morphology",
    channel: "Zoology Practical",
    url: "https://www.youtube.com/results?search_query=cockroach+dissection+alimentary+canal+zoology+practical",
    thumb: "🪲",
    desc: "External features and morphology of Periplaneta americana"
  },
  {
    specimen: "cockroach",
    title: "Cockroach Internal Anatomy & Gut",
    channel: "Biology Lab",
    url: "https://www.youtube.com/results?search_query=cockroach+internal+anatomy+dissection+gut+nerve+cord",
    thumb: "🔬",
    desc: "Step-by-step dissection showing alimentary canal and nerve cord"
  },
  {
    specimen: "cockroach",
    title: "Cockroach Nervous System",
    channel: "Zoology Lab",
    url: "https://www.youtube.com/results?search_query=cockroach+nervous+system+ventral+nerve+cord+ganglia",
    thumb: "🧠",
    desc: "Ventral nerve cord, ganglia and brain dissection"
  },
  {
    specimen: "channa",
    title: "Channa punctata External Features",
    channel: "Fish Biology",
    url: "https://www.youtube.com/results?search_query=channa+punctata+lata+fish+external+morphology+practical",
    thumb: "🐟",
    desc: "External characters — fins, lateral line, scales of Lata fish"
  },
  {
    specimen: "channa",
    title: "Channa Dissection — Digestive System",
    channel: "Zoology Practical",
    url: "https://www.youtube.com/results?search_query=channa+punctata+dissection+digestive+system+lata+fish",
    thumb: "🔬",
    desc: "Complete digestive system dissection and display"
  },
  {
    specimen: "channa",
    title: "Suprabranchial Air Organ of Channa",
    channel: "Fish Anatomy",
    url: "https://www.youtube.com/results?search_query=channa+suprabranchial+air+organ+respiration+labyrinth",
    thumb: "🫁",
    desc: "Unique accessory respiratory organ — how Channa breathes air"
  },
];

// ── SPECIMEN REGISTRY ─────────────────────────────
// To add a NEW specimen:
// 1. Add entry here
// 2. Add its SVG views in svg-diagrams.js (follow CK_VIEWS / CH_VIEWS pattern)
// 3. Add its organs in data.js (follow COCKROACH_ORGANS pattern)
// 4. Add video entries in DISSECTION_VIDEOS above
const SPECIMEN_REGISTRY = [
  {
    id: "cockroach",
    label: "🪲 Periplaneta americana",
    views: () => CK_VIEWS,       // from svg-diagrams.js
    organs: () => COCKROACH_ORGANS, // from data.js
    detailId: "cockroach-organ-detail",
    chipsId: "ck-organ-chips",
    viewBadgeId: "ck-view-badge",
  },
  {
    id: "channa",
    label: "🐟 Channa punctata",
    views: () => CH_VIEWS,
    organs: () => CHANNA_ORGANS,
    detailId: "channa-organ-detail",
    chipsId: "ch-organ-chips",
    viewBadgeId: "ch-view-badge",
  },
  // ── ADD NEW SPECIMEN BELOW THIS LINE ──
  // {
  //   id: "frog",
  //   label: "🐸 Rana tigrina",
  //   views: () => FROG_VIEWS,       // define in svg-diagrams.js
  //   organs: () => FROG_ORGANS,     // define in data.js
  //   detailId: "frog-organ-detail",
  //   chipsId: "frog-organ-chips",
  //   viewBadgeId: "frog-view-badge",
  // },
];

// ── STATE ─────────────────────────────────────────
const state = {};  // state[specimenId] = { currentView, activeOrgan }

// ── RENDER SVG VIEWER ─────────────────────────────
function renderSVGViewer(spec) {
  const views = spec.views();
  const viewKeys = Object.keys(views);
  if (!state[spec.id]) state[spec.id] = { currentView: viewKeys[0], activeOrgan: null };

  const wrap = document.getElementById(`svg-wrap-${spec.id}`);
  if (!wrap) return;

  const current = state[spec.id].currentView;
  wrap.innerHTML = views[current].svg;

  // Update view badge
  const badge = document.getElementById(spec.viewBadgeId);
  if (badge) badge.textContent = views[current].label;

  // Attach click handlers to hotspots inside the SVG
  wrap.querySelectorAll(".ck-hotspot").forEach(el => {
    el.addEventListener("click", () => {
      const organId = el.dataset.organ;
      selectOrgan(spec, organId);
    });
  });

  // Highlight active organ if any
  highlightActiveOrgan(spec);
}

function highlightActiveOrgan(spec) {
  const wrap = document.getElementById(`svg-wrap-${spec.id}`);
  if (!wrap) return;
  const activeId = state[spec.id].activeOrgan;
  wrap.querySelectorAll(".ck-hotspot").forEach(el => {
    const isActive = el.dataset.organ === activeId;
    el.style.outline = isActive ? "2px solid #fff" : "";
    el.style.filter = isActive ? "brightness(1.3) drop-shadow(0 0 6px #fff)" : "";
  });
}

function selectOrgan(spec, organId) {
  state[spec.id].activeOrgan = organId;
  highlightActiveOrgan(spec);

  const organ = spec.organs().find(o => o.id === organId);
  const el = document.getElementById(spec.detailId);
  if (organ && el) {
    el.innerHTML = `
      <div class="organ-name">${organ.name}</div>
      <div class="organ-system-badge sys-${organ.system}">${organ.system}</div>
      <p class="organ-desc">${organ.description}</p>
      <div class="organ-func"><strong>Function:</strong> ${organ.function}</div>
    `;
  }
  document.querySelectorAll(`#${spec.chipsId} .organ-chip`).forEach(c => {
    c.classList.toggle("active", c.dataset.id === organId);
  });
}

function buildViewButtons(spec) {
  const container = document.getElementById(`view-btns-${spec.id}`);
  if (!container) return;
  const views = spec.views();
  container.innerHTML = "";
  Object.keys(views).forEach(key => {
    const btn = document.createElement("button");
    btn.className = "ctrl-btn";
    btn.textContent = views[key].label;
    btn.addEventListener("click", () => {
      state[spec.id].currentView = key;
      renderSVGViewer(spec);
    });
    container.appendChild(btn);
  });
}

function buildChips(spec) {
  const wrap = document.getElementById(spec.chipsId);
  if (!wrap) return;
  wrap.innerHTML = "";
  spec.organs().forEach(o => {
    const chip = document.createElement("button");
    chip.className = "organ-chip";
    chip.dataset.id = o.id;
    chip.style.setProperty("--chip-color", o.color);
    chip.textContent = o.name.split("(")[0].split("&")[0].trim();
    chip.addEventListener("click", () => selectOrgan(spec, o.id));
    wrap.appendChild(chip);
  });
}

// ── VIDEO SECTION ─────────────────────────────────
function renderVideoSection(specimenId) {
  const container = document.getElementById(`videos-${specimenId}`);
  if (!container) return;
  const vids = DISSECTION_VIDEOS.filter(v => v.specimen === specimenId);
  container.innerHTML = vids.map(v => `
    <a class="video-card" href="${v.url}" target="_blank" rel="noopener noreferrer">
      <div class="video-thumb">${v.thumb}</div>
      <div class="video-info">
        <div class="video-title">${v.title}</div>
        <div class="video-channel">${v.channel}</div>
        <div class="video-desc">${v.desc}</div>
      </div>
      <div class="video-play">▶ Search YouTube</div>
    </a>
  `).join("");
}

// ── SPECIMEN TAB SWITCHING ─────────────────────────
function initSpecimenTabs() {
  document.querySelectorAll(".spec-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".spec-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".specimen-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const id = tab.dataset.specimen;
      const panel = document.getElementById("spec-" + id);
      if (panel) panel.classList.add("active");
    });
  });
}

// ── INIT ──────────────────────────────────────────
function initSVGViewers() {
  SPECIMEN_REGISTRY.forEach(spec => {
    buildViewButtons(spec);
    buildChips(spec);
    renderSVGViewer(spec);
    renderVideoSection(spec.id);
  });
  initSpecimenTabs();
}

window.initSVGViewers = initSVGViewers;
