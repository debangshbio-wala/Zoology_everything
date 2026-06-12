// ===================================================
// canvas-cockroach.js — 2-D annotated cockroach model
// ===================================================

(function () {
  "use strict";

  const VIEWS = ["dorsal", "lateral", "ventral"];
  let currentView = "dorsal";
  let activeOrgan = null;
  let showGut = true;
  let showNervous = true;
  let showReproductive = false;
  let rotationAngle = 0; // used for transition effect

  // ── Regions per view ─────────────────────────────
  // Each region: { id, x, y, w, h, label, system }
  function getRegions(view, canvas) {
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;

    if (view === "dorsal") {
      return [
        { id: "mouth",        x: cx-18, y: 55,  w: 36, h: 22, label: "Mouth",      system: "alimentary" },
        { id: "oesophagus",   x: cx-10, y: 85,  w: 20, h: 28, label: "Oesophagus", system: "alimentary" },
        { id: "crop",         x: cx-22, y: 120, w: 44, h: 34, label: "Crop",        system: "alimentary" },
        { id: "gizzard",      x: cx-18, y: 160, w: 36, h: 26, label: "Gizzard",     system: "alimentary" },
        { id: "midgut",       x: cx-24, y: 195, w: 48, h: 50, label: "Midgut",      system: "alimentary" },
        { id: "malpighian",   x: cx+26, y: 200, w: 20, h: 40, label: "Malpigh.",    system: "alimentary" },
        { id: "ileum",        x: cx-20, y: 252, w: 40, h: 22, label: "Ileum",       system: "alimentary" },
        { id: "colon",        x: cx-18, y: 280, w: 36, h: 22, label: "Colon",       system: "alimentary" },
        { id: "rectum",       x: cx-16, y: 308, w: 32, h: 24, label: "Rectum",      system: "alimentary" },
        { id: "brain",        x: cx-14, y: 38,  w: 28, h: 18, label: "Brain",       system: "nervous" },
        { id: "nerve-cord",   x: cx-8,  y: 160, w: 16, h: 130,label: "Nerve Cord",  system: "nervous" },
        { id: "ovary",        x: cx-38, y: 270, w: 26, h: 36, label: "Gonads",      system: "reproductive" },
      ];
    }
    if (view === "lateral") {
      return [
        { id: "mouth",        x: 80,  y: 90,  w: 30, h: 20, label: "Mouth",      system: "alimentary" },
        { id: "oesophagus",   x: 115, y: 85,  w: 50, h: 16, label: "Oesophagus", system: "alimentary" },
        { id: "crop",         x: 172, y: 78,  w: 50, h: 34, label: "Crop",        system: "alimentary" },
        { id: "gizzard",      x: 228, y: 82,  w: 36, h: 28, label: "Gizzard",     system: "alimentary" },
        { id: "midgut",       x: 268, y: 78,  w: 60, h: 46, label: "Midgut",      system: "alimentary" },
        { id: "malpighian",   x: 334, y: 92,  w: 20, h: 36, label: "Malpigh.",    system: "alimentary" },
        { id: "ileum",        x: 358, y: 100, w: 40, h: 18, label: "Ileum",       system: "alimentary" },
        { id: "rectum",       x: 400, y: 96,  w: 36, h: 24, label: "Rectum",      system: "alimentary" },
        { id: "brain",        x: 66,  y: 68,  w: 28, h: 20, label: "Brain",       system: "nervous" },
        { id: "nerve-cord",   x: 110, y: 140, w: 300, h: 14, label: "Nerve Cord", system: "nervous" },
        { id: "ovary",        x: 340, y: 140, w: 34, h: 40, label: "Gonads",      system: "reproductive" },
      ];
    }
    // ventral
    return [
      { id: "mouth",        x: cx-18, y: 55,  w: 36, h: 22, label: "Mouth",      system: "alimentary" },
      { id: "nerve-cord",   x: cx-10, y: 90,  w: 20, h: 240,label: "Nerve Cord", system: "nervous" },
      { id: "brain",        x: cx-14, y: 38,  w: 28, h: 18, label: "Brain",       system: "nervous" },
      { id: "crop",         x: cx+16, y: 120, w: 44, h: 34, label: "Crop",        system: "alimentary" },
      { id: "gizzard",      x: cx+14, y: 162, w: 36, h: 24, label: "Gizzard",     system: "alimentary" },
      { id: "midgut",       x: cx+18, y: 194, w: 46, h: 50, label: "Midgut",      system: "alimentary" },
      { id: "malpighian",   x: cx+66, y: 200, w: 22, h: 40, label: "Malpigh.",    system: "alimentary" },
      { id: "rectum",       x: cx+12, y: 306, w: 32, h: 24, label: "Rectum",      system: "alimentary" },
      { id: "ovary",        x: cx-54, y: 240, w: 30, h: 40, label: "Gonads",      system: "reproductive" },
    ];
  }

  // ── Draw ─────────────────────────────────────────
  function draw() {
    const canvas = document.getElementById("cockroach-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#0d1b1e";
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2;

    if (currentView === "dorsal") drawDorsal(ctx, cx, H);
    else if (currentView === "lateral") drawLateral(ctx, W, H);
    else drawVentral(ctx, cx, H);

    // Organ overlays
    const regions = getRegions(currentView, canvas);
    regions.forEach(r => {
      const organ = COCKROACH_ORGANS.find(o => o.id === r.id);
      if (!organ) return;
      if (organ.system === "alimentary" && !showGut) return;
      if (organ.system === "nervous" && !showNervous) return;
      if (organ.system === "reproductive" && !showReproductive) return;

      const isActive = activeOrgan === r.id;
      ctx.save();
      ctx.globalAlpha = isActive ? 0.82 : 0.52;
      ctx.fillStyle = organ.color;
      ctx.beginPath();
      ctx.roundRect(r.x, r.y, r.w, r.h, 5);
      ctx.fill();

      if (isActive) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label
      ctx.globalAlpha = 1;
      ctx.fillStyle = isActive ? "#ffffff" : "rgba(255,255,255,0.85)";
      ctx.font = isActive ? "bold 9px Inter, sans-serif" : "8px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(r.label, r.x + r.w / 2, r.y + r.h / 2 + 3);
      ctx.restore();
    });
  }

  function drawDorsal(ctx, cx, H) {
    // Body outline
    ctx.save();
    ctx.fillStyle = "#3d2b1a";
    ctx.strokeStyle = "#6b4c2a";
    ctx.lineWidth = 2;

    // Head
    ctx.beginPath();
    ctx.ellipse(cx, 65, 30, 28, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Pronotum
    ctx.beginPath();
    ctx.ellipse(cx, 120, 48, 38, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Abdomen
    ctx.beginPath();
    ctx.roundRect(cx - 38, 148, 76, 210, 20);
    ctx.fill(); ctx.stroke();

    // Segmentation lines
    ctx.strokeStyle = "#5a3d22";
    ctx.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      const y = 160 + i * 28;
      ctx.beginPath();
      ctx.moveTo(cx - 36 + i * 1.5, y);
      ctx.lineTo(cx + 36 - i * 1.5, y);
      ctx.stroke();
    }

    // Antennae
    ctx.strokeStyle = "#8b6914";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 20, 48); ctx.quadraticCurveTo(cx - 60, 10, cx - 80, -10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 20, 48); ctx.quadraticCurveTo(cx + 60, 10, cx + 80, -10);
    ctx.stroke();

    // Legs (3 pairs)
    const legY = [165, 200, 235];
    ctx.strokeStyle = "#6b4c2a"; ctx.lineWidth = 2;
    legY.forEach(y => {
      // Left
      ctx.beginPath(); ctx.moveTo(cx - 38, y);
      ctx.quadraticCurveTo(cx - 68, y + 10, cx - 80, y + 30); ctx.stroke();
      // Right
      ctx.beginPath(); ctx.moveTo(cx + 38, y);
      ctx.quadraticCurveTo(cx + 68, y + 10, cx + 80, y + 30); ctx.stroke();
    });

    // Wings outline (tegmina)
    ctx.fillStyle = "rgba(100,70,30,0.3)";
    ctx.strokeStyle = "#7a5530";
    ctx.beginPath();
    ctx.roundRect(cx - 44, 148, 36, 130, 8);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(cx + 8, 148, 36, 130, 8);
    ctx.fill(); ctx.stroke();

    ctx.restore();
  }

  function drawLateral(ctx, W, H) {
    ctx.save();
    ctx.fillStyle = "#3d2b1a";
    ctx.strokeStyle = "#6b4c2a";
    ctx.lineWidth = 2;

    // Body side
    ctx.beginPath();
    ctx.roundRect(70, 75, 380, 100, 30);
    ctx.fill(); ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.ellipse(88, 100, 28, 38, -0.3, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Legs
    ctx.strokeStyle = "#6b4c2a"; ctx.lineWidth = 2;
    const lx = [160, 230, 310];
    lx.forEach(x => {
      ctx.beginPath(); ctx.moveTo(x, 168);
      ctx.quadraticCurveTo(x - 10, 200, x - 20, 230); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + 10, 168);
      ctx.quadraticCurveTo(x + 20, 200, x + 30, 230); ctx.stroke();
    });

    // Antenna
    ctx.strokeStyle = "#8b6914"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(80, 72);
    ctx.quadraticCurveTo(50, 30, 20, 10); ctx.stroke();

    // Wing
    ctx.fillStyle = "rgba(100,70,30,0.25)";
    ctx.beginPath();
    ctx.roundRect(130, 75, 270, 60, 12);
    ctx.fill(); ctx.stroke();

    ctx.restore();
  }

  function drawVentral(ctx, cx, H) {
    ctx.save();
    ctx.fillStyle = "#2b1e10";
    ctx.strokeStyle = "#5a3c1c";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(cx, 65, 30, 28, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx, 120, 48, 38, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(cx - 38, 148, 76, 210, 20);
    ctx.fill(); ctx.stroke();

    // Sternal plates
    ctx.strokeStyle = "#4a2e10"; ctx.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      const y = 160 + i * 28;
      ctx.beginPath();
      ctx.moveTo(cx - 34 + i * 1.5, y);
      ctx.lineTo(cx + 34 - i * 1.5, y);
      ctx.stroke();
    }

    const legY2 = [165, 200, 235];
    ctx.strokeStyle = "#5a3c1c"; ctx.lineWidth = 2;
    legY2.forEach(y => {
      ctx.beginPath(); ctx.moveTo(cx - 38, y);
      ctx.quadraticCurveTo(cx - 68, y + 10, cx - 80, y + 30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 38, y);
      ctx.quadraticCurveTo(cx + 68, y + 10, cx + 80, y + 30); ctx.stroke();
    });

    ctx.restore();
  }

  // ── Interaction ──────────────────────────────────
  function handleCanvasClick(e) {
    const canvas = document.getElementById("cockroach-canvas");
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    const regions = getRegions(currentView, canvas);
    let hit = null;
    for (const r of regions) {
      if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
        hit = r.id;
        break;
      }
    }
    if (hit) selectOrgan(hit);
  }

  function selectOrgan(id) {
    activeOrgan = id;
    draw();
    const organ = COCKROACH_ORGANS.find(o => o.id === id);
    const el = document.getElementById("cockroach-organ-detail");
    if (organ && el) {
      el.innerHTML = `
        <div class="organ-name">${organ.name}</div>
        <div class="organ-system-badge sys-${organ.system}">${organ.system}</div>
        <p class="organ-desc">${organ.description}</p>
        <div class="organ-func"><strong>Function:</strong> ${organ.function}</div>
      `;
    }
    // Sync chips
    document.querySelectorAll("#ck-organ-chips .organ-chip").forEach(c => {
      c.classList.toggle("active", c.dataset.id === id);
    });
  }

  function setView(v) {
    currentView = v;
    document.getElementById("ck-view-badge").textContent =
      v.charAt(0).toUpperCase() + v.slice(1) + " View";
    draw();
  }

  function buildChips() {
    const wrap = document.getElementById("ck-organ-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    COCKROACH_ORGANS.forEach(o => {
      const chip = document.createElement("button");
      chip.className = "organ-chip";
      chip.dataset.id = o.id;
      chip.style.setProperty("--chip-color", o.color);
      chip.textContent = o.name.split("(")[0].trim();
      chip.addEventListener("click", () => selectOrgan(o.id));
      wrap.appendChild(chip);
    });
  }

  function init() {
    const canvas = document.getElementById("cockroach-canvas");
    if (!canvas) return;

    canvas.addEventListener("click", handleCanvasClick);

    document.getElementById("ck-rotate-left")?.addEventListener("click", () => {
      const idx = VIEWS.indexOf(currentView);
      setView(VIEWS[(idx - 1 + VIEWS.length) % VIEWS.length]);
    });
    document.getElementById("ck-rotate-right")?.addEventListener("click", () => {
      const idx = VIEWS.indexOf(currentView);
      setView(VIEWS[(idx + 1) % VIEWS.length]);
    });
    document.getElementById("ck-dorsal")?.addEventListener("click", () => setView("dorsal"));
    document.getElementById("ck-ventral")?.addEventListener("click", () => setView("ventral"));
    document.getElementById("ck-lateral")?.addEventListener("click", () => setView("lateral"));

    document.getElementById("ck-show-gut")?.addEventListener("change", e => {
      showGut = e.target.checked; draw();
    });
    document.getElementById("ck-show-nervous")?.addEventListener("change", e => {
      showNervous = e.target.checked; draw();
    });
    document.getElementById("ck-show-reproductive")?.addEventListener("change", e => {
      showReproductive = e.target.checked; draw();
    });

    buildChips();
    draw();
  }

  // Expose init
  window.initCockroach = init;
})();
