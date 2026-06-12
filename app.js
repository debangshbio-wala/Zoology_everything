// ===================================================
// app.js — Navigation & content rendering
// ===================================================

// ── PAGE NAVIGATION ────────────────────────────────
function goToPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

  const page = document.getElementById("page-" + pageId);
  const btn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
  if (page) page.classList.add("active");
  if (btn) btn.classList.add("active");

  document.getElementById("navMenu").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── KINGDOM CARDS ───────────────────────────────────
function renderKingdoms() {
  const grid = document.getElementById("kingdomGrid");
  if (!grid) return;
  grid.innerHTML = KINGDOMS.map(k => `
    <div class="kingdom-card" style="--accent:${k.color}">
      <div class="kingdom-emoji">${k.emoji}</div>
      <h3>${k.name}</h3>
      <div class="kingdom-meta">
        <span><strong>Cell:</strong> ${k.cell}</span>
        <span><strong>Nutrition:</strong> ${k.nutrition}</span>
        <span><strong>Nucleus:</strong> ${k.nucleus}</span>
      </div>
      <p>${k.description}</p>
      <div class="kingdom-branches">
        <strong>Branches:</strong>
        <div class="branch-tags">
          ${k.branches.map(b => `<span class="branch-tag">${b}</span>`).join("")}
        </div>
      </div>
      <div class="kingdom-example"><strong>Example:</strong> <em>${k.example}</em></div>
    </div>
  `).join("");
}

// ── TAXON LADDER ────────────────────────────────────
function renderTaxonLadder() {
  const wrap = document.getElementById("taxonLadder");
  if (!wrap) return;
  wrap.innerHTML = TAXON_RANKS.map((t, i) => `
    <div class="taxon-rung" style="--depth:${i}">
      <div class="taxon-rank">${t.rank}</div>
      <div class="taxon-example"><em>${t.example}</em></div>
      <div class="taxon-note">${t.note}</div>
    </div>
  `).join("");
}

// ── CRITERIA GRID ───────────────────────────────────
function renderCriteria() {
  const grid = document.getElementById("criteriaGrid");
  if (!grid) return;
  grid.innerHTML = CLASSIFICATION_CRITERIA.map(c => `
    <div class="criteria-card">
      <div class="criteria-icon">${c.icon}</div>
      <h4>${c.title}</h4>
      <p>${c.text}</p>
    </div>
  `).join("");
}

// ── PHYLA ACCORDION ─────────────────────────────────
function renderPhyla() {
  const wrap = document.getElementById("phylaAccordion");
  if (!wrap) return;
  wrap.innerHTML = PHYLA_DATA.map((p, i) => `
    <div class="phylum-item">
      <button class="phylum-head" data-index="${i}">
        <span class="phylum-name">${p.phylum}</span>
        <span class="phylum-common">${p.common}</span>
        <span class="phylum-arrow">＋</span>
      </button>
      <div class="phylum-body">
        <p><strong>Key features:</strong> ${p.key}</p>
        <p><strong>Example:</strong> <em>${p.example}</em></p>
        <p><strong>Habitat:</strong> ${p.habitat}</p>
      </div>
    </div>
  `).join("");

  wrap.querySelectorAll(".phylum-head").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".phylum-item");
      item.classList.toggle("open");
    });
  });
}

// ── CLASSIFICATION HISTORY TIMELINE ─────────────────
function renderTimeline() {
  const wrap = document.getElementById("classTimeline");
  if (!wrap) return;
  wrap.innerHTML = CLASS_HISTORY.map(h => `
    <div class="timeline-item">
      <div class="timeline-year">${h.year}</div>
      <div class="timeline-content">
        <h4>${h.system}</h4>
        <div class="timeline-scientist">${h.scientist}</div>
        <p>${h.detail}</p>
      </div>
    </div>
  `).join("");
}

// ── SPECIMEN TAB SWITCHING ───────────────────────────
function initSpecimenTabs() {
  document.querySelectorAll(".spec-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".spec-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".specimen-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("spec-" + tab.dataset.specimen).classList.add("active");
    });
  });
}

// ── NAV TOGGLE (mobile) ──────────────────────────────
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  toggle.addEventListener("click", () => menu.classList.toggle("open"));
}

// ── NAV BUTTON CLICKS ─────────────────────────────────
function initNavButtons() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => goToPage(btn.dataset.page));
  });
}

// ── SCROLL SHADOW ON NAV ──────────────────────────────
function initNavScroll() {
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  });
}

// ── INIT ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderKingdoms();
  renderTaxonLadder();
  renderCriteria();
  renderPhyla();
  renderTimeline();
  initSpecimenTabs();
  initNavToggle();
  initNavButtons();
  initNavScroll();

  if (window.initCockroach) window.initCockroach();
  if (window.initChanna) window.initChanna();
});
