// ===================================================
// canvas-channa.js — 2-D annotated Channa punctata model
// ===================================================

(function () {
  "use strict";

  const VIEWS = ["lateral", "dorsal", "ventral"];
  let currentView = "lateral";
  let activeOrgan = null;
  let showGut = true;
  let showNervous = true;
  let showReproductive = false;

  function getRegions(view, canvas) {
    const W = canvas.width;
    const H = canvas.height;
    const cy = H / 2;

    if (view === "lateral") {
      return [
        { id: "mouth-ch",          x: 40,  y: cy-20, w: 40, h: 24, label: "Mouth",       system: "alimentary" },
        { id: "pharynx-ch",        x: 84,  y: cy-26, w: 36, h: 30, label: "Pharynx",     system: "alimentary" },
        { id: "gills-ch",          x: 78,  y: cy-50, w: 50, h: 36, label: "Gills",       system: "nervous" },
        { id: "suprabranchial-ch", x: 84,  y: cy-78, w: 56, h: 26, label: "Air Organ",   system: "nervous" },
        { id: "oesophagus-ch",     x: 122, y: cy-22, w: 30, h: 22, label: "Oesophagus",  system: "alimentary" },
        { id: "stomach-ch",        x: 156, y: cy-24, w: 80, h: 56, label: "Stomach",      system: "alimentary" },
        { id: "pyloricCaeca-ch",   x: 230, y: cy-50, w: 40, h: 22, label: "Pyloric Caeca",system: "alimentary" },
        { id: "liver-ch",          x: 150, y: cy-58, w: 70, h: 30, label: "Liver",       system: "alimentary" },
        { id: "intestine-ch",      x: 244, y: cy-10, w: 96, h: 60, label: "Intestine",   system: "alimentary" },
        { id: "kidney-ch",         x: 200, y: cy-78, w: 100, h: 16,label: "Kidney",      system: "nervous" },
        { id: "gonad-ch",          x: 250, y: cy+20, w: 70, h: 36, label: "Gonad",       system: "reproductive" },
        { id: "rectum-ch",         x: 344, y: cy+10, w: 50, h: 30, label: "Rectum",      system: "alimentary" },
      ];
    }
    if (view === "dorsal") {
      const cx = W / 2;
      return [
        { id: "mouth-ch",          x: cx-16, y: 30,  w: 32, h: 26, label: "Mouth",     system: "alimentary" },
        { id: "gills-ch",          x: cx-44, y: 64,  w: 88, h: 30, label: "Gills",     system: "nervous" },
        { id: "kidney-ch",         x: cx-10, y: 100, w: 20, h: 180,label: "Kidney",   system: "nervous" },
        { id: "stomach-ch",        x: cx-48, y: 110, w: 40, h: 70, label: "Stomach",   system: "alimentary" },
        { id: "intestine-ch",      x: cx+10, y: 190, w: 50, h: 80, label: "Intestine", system: "alimentary" },
        { id: "gonad-ch",          x: cx-50, y: 200, w: 36, h: 80, label: "Gonad",     system: "reproductive" },
        { id: "rectum-ch",         x: cx-10, y: 300, w: 26, h: 30, label: "Rectum",    system: "alimentary" },
      ];
    }
    // ventral
    const cx = W / 2;
    return [
      { id: "mouth-ch",      x: cx-30, y: 30,  w: 60, h: 26, label: "Mouth",      system: "alimentary" },
      { id: "pharynx-ch",    x: cx-26, y: 62,  w: 52, h: 24, label: "Pharynx",    system: "alimentary" },
      { id: "liver-ch",      x: cx-50, y: 96,  w: 100,h: 40, label: "Liver",      system: "alimentary" },
      { id: "stomach-ch",    x: cx-40, y: 142, w: 80, h: 56, label: "Stomach",    system: "alimentary" },
      { id: "pyloricCaeca-ch",x:cx+34, y: 150, w: 40, h: 24, label: "Pyl. Caeca", system: "alimentary" },
      { id: "intestine-ch",  x: cx-46, y: 204, w: 92, h: 70, label: "Intestine",  system: "alimentary" },
      { id: "gonad-ch",      x: cx+30, y: 200, w: 40, h: 70, label: "Gonad",      system: "reproductive" },
      { id: "rectum-ch",     x: cx-14, y: 282, w: 28, h: 30, label: "Rectum",     system: "alimentary" },
    ];
  }

  function draw() {
    const canvas = document.getElementById("channa-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#06262e";
    ctx.fillRect(0, 0, W, H);

    if (currentView === "lateral") drawLateral(ctx, W, H);
    else if (currentView === "dorsal") drawDorsal(ctx, W, H);
    else drawVentral(ctx, W, H);

    const regions = getRegions(currentView, canvas);
    regions.forEach(r => {
      const organ = CHANNA_ORGANS.find(o => o.id === r.id);
      if (!organ) return;
      if (organ.system === "alimentary" && !showGut) return;
      if (organ.system === "nervous" && !showNervous) return;
      if (organ.system === "reproductive" && !showReproductive) return;

      const isActive = activeOrgan === r.id;
      ctx.save();
      ctx.globalAlpha = isActive ? 0.82 : 0.5;
      ctx.fillStyle = organ.color;
      ctx.beginPath();
      ctx.roundRect(r.x, r.y, r.w, r.h, 6);
      ctx.fill();
      if (isActive) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = isActive ? "#ffffff" : "rgba(255,255,255,0.85)";
      ctx.font = isActive ? "bold 9px Inter, sans-serif" : "8px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(r.label, r.x + r.w / 2, r.y + r.h / 2 + 3);
      ctx.restore();
    });
  }

  function fishBodyPath(ctx, W, H) {
    const cy = H / 2;
    ctx.beginPath();
    // body
    ctx.moveTo(30, cy);
    ctx.quadraticCurveTo(60, cy - 70, 200, cy - 65);
    ctx.quadraticCurveTo(380, cy - 55, 430, cy - 10);
    ctx.lineTo(470, cy);
    ctx.lineTo(430, cy + 10);
    ctx.quadraticCurveTo(380, cy + 55, 200, cy + 65);
    ctx.quadraticCurveTo(60, cy + 70, 30, cy);
    ctx.closePath();
  }

  function drawLateral(ctx, W, H) {
    const cy = H / 2;
    ctx.save();
    // Body
    ctx.fillStyle = "#2d4a3e";
    ctx.strokeStyle = "#4f7a64";
    ctx.lineWidth = 2.5;
    fishBodyPath(ctx, W, H);
    ctx.fill(); ctx.stroke();

    // Tail fin
    ctx.beginPath();
    ctx.moveTo(465, cy - 15);
    ctx.lineTo(505, cy);
    ctx.lineTo(465, cy + 15);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Dorsal fin
    ctx.beginPath();
    ctx.moveTo(180, cy - 64);
    ctx.lineTo(340, cy - 76);
    ctx.lineTo(360, cy - 56);
    ctx.closePath();
    ctx.fillStyle = "rgba(79,122,100,0.6)";
    ctx.fill(); ctx.stroke();

    // Pectoral fin
    ctx.beginPath();
    ctx.moveTo(130, cy + 10);
    ctx.lineTo(170, cy + 50);
    ctx.lineTo(120, cy + 45);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Eye
    ctx.fillStyle = "#0d1b1e";
    ctx.beginPath();
    ctx.arc(58, cy - 18, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(60, cy - 20, 2, 0, Math.PI * 2);
    ctx.fill();

    // Scale pattern (spots — punctata)
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    for (let i = 0; i < 24; i++) {
      const x = 70 + Math.random() * 380;
      const y = cy - 50 + Math.random() * 100;
      ctx.beginPath();
      ctx.arc(x, y, 4 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawDorsal(ctx, W, H) {
    const cx = W / 2;
    ctx.save();
    ctx.fillStyle = "#2d4a3e";
    ctx.strokeStyle = "#4f7a64";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, 20);
    ctx.quadraticCurveTo(cx + 60, 100, cx + 36, 250);
    ctx.quadraticCurveTo(cx + 20, 360, cx, 400);
    ctx.quadraticCurveTo(cx - 20, 360, cx - 36, 250);
    ctx.quadraticCurveTo(cx - 60, 100, cx, 20);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // spots
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    for (let i = 0; i < 20; i++) {
      const x = cx - 30 + Math.random() * 60;
      const y = 50 + Math.random() * 320;
      ctx.beginPath();
      ctx.arc(x, y, 4 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawVentral(ctx, W, H) {
    const cx = W / 2;
    ctx.save();
    ctx.fillStyle = "#27403a";
    ctx.strokeStyle = "#4f7a64";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, 20);
    ctx.quadraticCurveTo(cx + 60, 100, cx + 36, 250);
    ctx.quadraticCurveTo(cx + 20, 360, cx, 400);
    ctx.quadraticCurveTo(cx - 20, 360, cx - 36, 250);
    ctx.quadraticCurveTo(cx - 60, 100, cx, 20);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function handleCanvasClick(e) {
    const canvas = document.getElementById("channa-canvas");
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
    const organ = CHANNA_ORGANS.find(o => o.id === id);
    const el = document.getElementById("channa-organ-detail");
    if (organ && el) {
      el.innerHTML = `
        <div class="organ-name">${organ.name}</div>
        <div class="organ-system-badge sys-${organ.system}">${organ.system}</div>
        <p class="organ-desc">${organ.description}</p>
        <div class="organ-func"><strong>Function:</strong> ${organ.function}</div>
      `;
    }
    document.querySelectorAll("#ch-organ-chips .organ-chip").forEach(c => {
      c.classList.toggle("active", c.dataset.id === id);
    });
  }

  function setView(v) {
    currentView = v;
    document.getElementById("ch-view-badge").textContent =
      v.charAt(0).toUpperCase() + v.slice(1) + " View";
    draw();
  }

  function buildChips() {
    const wrap = document.getElementById("ch-organ-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    CHANNA_ORGANS.forEach(o => {
      const chip = document.createElement("button");
      chip.className = "organ-chip";
      chip.dataset.id = o.id;
      chip.style.setProperty("--chip-color", o.color);
      chip.textContent = o.name.split("(")[0].split("&")[0].trim();
      chip.addEventListener("click", () => selectOrgan(o.id));
      wrap.appendChild(chip);
    });
  }

  function init() {
    const canvas = document.getElementById("channa-canvas");
    if (!canvas) return;

    canvas.addEventListener("click", handleCanvasClick);

    document.getElementById("ch-rotate-left")?.addEventListener("click", () => {
      const idx = VIEWS.indexOf(currentView);
      setView(VIEWS[(idx - 1 + VIEWS.length) % VIEWS.length]);
    });
    document.getElementById("ch-rotate-right")?.addEventListener("click", () => {
      const idx = VIEWS.indexOf(currentView);
      setView(VIEWS[(idx + 1) % VIEWS.length]);
    });
    document.getElementById("ch-dorsal")?.addEventListener("click", () => setView("dorsal"));
    document.getElementById("ch-ventral")?.addEventListener("click", () => setView("ventral"));
    document.getElementById("ch-lateral")?.addEventListener("click", () => setView("lateral"));

    document.getElementById("ch-show-gut")?.addEventListener("change", e => {
      showGut = e.target.checked; draw();
    });
    document.getElementById("ch-show-nervous")?.addEventListener("change", e => {
      showNervous = e.target.checked; draw();
    });
    document.getElementById("ch-show-reproductive")?.addEventListener("change", e => {
      showReproductive = e.target.checked; draw();
    });

    buildChips();
    draw();
  }

  window.initChanna = init;
})();
