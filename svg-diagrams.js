// ===================================================
// svg-diagrams.js
// Clean 2-D SVG anatomical diagrams (no canvas needed)
// Each specimen has: external view + dissected/internal view
// Click any labeled part → shows info in panel
// ===================================================

// ── COCKROACH SVG VIEWS ───────────────────────────
const CK_VIEWS = {

  external: {
    label: "External (Dorsal)",
    svg: `
<svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#8B6914"/>
      <stop offset="100%" stop-color="#4a3208"/>
    </radialGradient>
    <radialGradient id="headGrad" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#6b4c10"/>
      <stop offset="100%" stop-color="#3a2505"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="520" fill="#f0ede6" rx="12"/>
  <text x="200" y="22" text-anchor="middle" font-size="11" fill="#888" font-family="Georgia,serif" font-style="italic">Periplaneta americana — External Dorsal View</text>

  <!-- Antennae -->
  <path d="M155,65 Q100,20 40,5" stroke="#6b4c10" stroke-width="2" fill="none"/>
  <path d="M245,65 Q300,20 360,5" stroke="#6b4c10" stroke-width="2" fill="none"/>
  <!-- antenna segments -->
  <line x1="130" y1="42" x2="40" y2="5" stroke="#8B6914" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="270" y1="42" x2="360" y2="5" stroke="#8B6914" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- HEAD -->
  <ellipse cx="200" cy="80" rx="42" ry="38" fill="url(#headGrad)" stroke="#3a2505" stroke-width="1.5"/>
  <!-- Compound eyes -->
  <ellipse cx="168" cy="68" rx="13" ry="10" fill="#111" stroke="#555" stroke-width="1"/>
  <ellipse cx="232" cy="68" rx="13" ry="10" fill="#111" stroke="#555" stroke-width="1"/>
  <!-- eye shine -->
  <ellipse cx="164" cy="65" rx="4" ry="3" fill="#333"/>
  <ellipse cx="228" cy="65" rx="4" ry="3" fill="#333"/>
  <!-- Labrum label spot -->
  <ellipse cx="200" cy="108" rx="10" ry="7" fill="#c8a040" stroke="#8B6914" stroke-width="1"/>

  <!-- PRONOTUM -->
  <ellipse cx="200" cy="155" rx="68" ry="52" fill="url(#bodyGrad)" stroke="#3a2505" stroke-width="1.5"/>
  <!-- pronotum texture lines -->
  <path d="M150,138 Q200,132 250,138" stroke="#3a2505" stroke-width="0.7" fill="none" opacity="0.5"/>
  <path d="M140,155 Q200,148 260,155" stroke="#3a2505" stroke-width="0.7" fill="none" opacity="0.5"/>

  <!-- ABDOMEN -->
  <path d="M145,195 Q130,290 140,400 Q200,430 260,400 Q270,290 255,195 Z"
        fill="url(#bodyGrad)" stroke="#3a2505" stroke-width="1.5"/>
  <!-- Abdominal tergite lines -->
  <line x1="146" y1="225" x2="254" y2="225" stroke="#3a2505" stroke-width="0.8" opacity="0.6"/>
  <line x1="144" y1="255" x2="256" y2="255" stroke="#3a2505" stroke-width="0.8" opacity="0.6"/>
  <line x1="143" y1="285" x2="257" y2="285" stroke="#3a2505" stroke-width="0.8" opacity="0.6"/>
  <line x1="143" y1="315" x2="257" y2="315" stroke="#3a2505" stroke-width="0.8" opacity="0.6"/>
  <line x1="144" y1="345" x2="256" y2="345" stroke="#3a2505" stroke-width="0.8" opacity="0.6"/>
  <line x1="146" y1="375" x2="254" y2="375" stroke="#3a2505" stroke-width="0.8" opacity="0.6"/>

  <!-- WINGS (tegmina) -->
  <path d="M145,195 Q110,230 112,350 Q140,365 148,340 Q150,280 152,195 Z"
        fill="#c8a040" stroke="#8B6914" stroke-width="1" opacity="0.75"/>
  <path d="M255,195 Q290,230 288,350 Q260,365 252,340 Q250,280 248,195 Z"
        fill="#c8a040" stroke="#8B6914" stroke-width="1" opacity="0.75"/>
  <!-- wing veins -->
  <line x1="130" y1="210" x2="135" y2="335" stroke="#8B6914" stroke-width="0.6" opacity="0.6"/>
  <line x1="270" y1="210" x2="265" y2="335" stroke="#8B6914" stroke-width="0.6" opacity="0.6"/>

  <!-- LEGS — 3 pairs -->
  <!-- Pair 1 (prothoracic) -->
  <path d="M145,175 L95,195 L68,230 L48,260" stroke="#6b4c10" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M255,175 L305,195 L332,230 L352,260" stroke="#6b4c10" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Pair 2 (mesothoracic) -->
  <path d="M143,205 L88,222 L62,258 L45,285" stroke="#6b4c10" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M257,205 L312,222 L338,258 L355,285" stroke="#6b4c10" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Pair 3 (metathoracic) -->
  <path d="M143,235 L90,255 L66,292 L50,318" stroke="#6b4c10" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M257,235 L310,255 L334,292 L350,318" stroke="#6b4c10" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Claw tips -->
  <circle cx="48" cy="260" r="2.5" fill="#3a2505"/>
  <circle cx="352" cy="260" r="2.5" fill="#3a2505"/>
  <circle cx="45" cy="285" r="2.5" fill="#3a2505"/>
  <circle cx="355" cy="285" r="2.5" fill="#3a2505"/>
  <circle cx="50" cy="318" r="2.5" fill="#3a2505"/>
  <circle cx="350" cy="318" r="2.5" fill="#3a2505"/>

  <!-- Anal cerci -->
  <path d="M185,410 Q175,440 165,460" stroke="#6b4c10" stroke-width="2" fill="none"/>
  <path d="M215,410 Q225,440 235,460" stroke="#6b4c10" stroke-width="2" fill="none"/>

  <!-- ── CLICKABLE HOTSPOTS ── -->
  <g class="ck-hotspot" data-organ="mouth" style="cursor:pointer">
    <ellipse cx="200" cy="108" rx="18" ry="13" fill="#f39c12" opacity="0.35"/>
    <text x="200" y="112" text-anchor="middle" font-size="8.5" fill="#7a5000" font-weight="bold" font-family="Inter,sans-serif">Mouth Parts</text>
  </g>
  <g class="ck-hotspot" data-organ="head-label" style="cursor:pointer">
    <ellipse cx="200" cy="78" rx="38" ry="30" fill="#e67e22" opacity="0.10"/>
  </g>

  <!-- ── LABELS ── -->
  <!-- Antenna -->
  <line x1="88" y1="25" x2="125" y2="55" stroke="#555" stroke-width="0.8"/>
  <text x="45" y="22" font-size="9" fill="#333" font-family="Inter,sans-serif">Antenna</text>
  <!-- Compound Eye -->
  <line x1="162" y1="68" x2="120" y2="95" stroke="#555" stroke-width="0.8"/>
  <text x="60" y="98" font-size="9" fill="#333" font-family="Inter,sans-serif">Compound Eye</text>
  <!-- Pronotum -->
  <line x1="268" y1="145" x2="310" y2="130" stroke="#555" stroke-width="0.8"/>
  <text x="312" y="133" font-size="9" fill="#333" font-family="Inter,sans-serif">Pronotum</text>
  <!-- Tegmina -->
  <line x1="118" y1="275" x2="78" y2="300" stroke="#555" stroke-width="0.8"/>
  <text x="18" y="303" font-size="9" fill="#333" font-family="Inter,sans-serif">Tegmina</text>
  <!-- Abdomen -->
  <line x1="258" y1="310" x2="295" y2="310" stroke="#555" stroke-width="0.8"/>
  <text x="297" y="313" font-size="9" fill="#333" font-family="Inter,sans-serif">Abdomen</text>
  <!-- Legs -->
  <line x1="52" y1="195" x2="80" y2="195" stroke="#555" stroke-width="0.8"/>
  <text x="5" y="197" font-size="9" fill="#333" font-family="Inter,sans-serif">Legs (3 pairs)</text>
  <!-- Cerci -->
  <line x1="170" y1="455" x2="152" y2="478" stroke="#555" stroke-width="0.8"/>
  <text x="100" y="490" font-size="9" fill="#333" font-family="Inter,sans-serif">Anal Cerci</text>
</svg>`,
  },

  dissected: {
    label: "Internal (Dissected)",
    svg: `
<svg viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect width="400" height="540" fill="#f0ede6" rx="12"/>
  <text x="200" y="22" text-anchor="middle" font-size="11" fill="#888" font-family="Georgia,serif" font-style="italic">Periplaneta americana — Internal Anatomy</text>

  <!-- Body outline ghost -->
  <ellipse cx="200" cy="80" rx="42" ry="36" fill="none" stroke="#c8a040" stroke-width="1.2" stroke-dasharray="5,3"/>
  <ellipse cx="200" cy="148" rx="66" ry="48" fill="none" stroke="#c8a040" stroke-width="1.2" stroke-dasharray="5,3"/>
  <path d="M148,188 Q133,290 142,400 Q200,428 258,400 Q267,290 252,188 Z"
        fill="none" stroke="#c8a040" stroke-width="1.2" stroke-dasharray="5,3"/>

  <!-- ── ALIMENTARY CANAL ── -->
  <!-- Mouth -->
  <ellipse cx="200" cy="108" rx="16" ry="10" fill="#f39c12" opacity="0.85" class="ck-hotspot" data-organ="mouth" style="cursor:pointer"/>
  <text x="200" y="112" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Mouth</text>

  <!-- Pharynx -->
  <rect x="192" y="118" width="16" height="14" rx="4" fill="#e67e22" opacity="0.85" class="ck-hotspot" data-organ="oesophagus" style="cursor:pointer"/>

  <!-- Oesophagus -->
  <rect x="194" y="132" width="12" height="22" rx="4" fill="#e74c3c" opacity="0.85" class="ck-hotspot" data-organ="oesophagus" style="cursor:pointer"/>
  <text x="240" y="148" font-size="8" fill="#c0392b" font-family="Inter,sans-serif">Oesophagus</text>
  <line x1="206" y1="145" x2="238" y2="145" stroke="#c0392b" stroke-width="0.8"/>

  <!-- Crop -->
  <ellipse cx="200" cy="178" rx="28" ry="22" fill="#e67e22" opacity="0.85" class="ck-hotspot" data-organ="crop" style="cursor:pointer"/>
  <text x="200" y="182" text-anchor="middle" font-size="8.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Crop</text>

  <!-- Gizzard -->
  <ellipse cx="200" cy="218" rx="22" ry="16" fill="#c0392b" opacity="0.88" class="ck-hotspot" data-organ="gizzard" style="cursor:pointer"/>
  <text x="200" y="222" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Gizzard</text>

  <!-- Hepatic caeca (8 finger-like) -->
  <g opacity="0.75">
    <ellipse cx="175" cy="242" rx="8" ry="14" fill="#d35400" transform="rotate(-20,175,242)"/>
    <ellipse cx="163" cy="248" rx="7" ry="13" fill="#d35400" transform="rotate(-35,163,248)"/>
    <ellipse cx="225" cy="242" rx="8" ry="14" fill="#d35400" transform="rotate(20,225,242)"/>
    <ellipse cx="237" cy="248" rx="7" ry="13" fill="#d35400" transform="rotate(35,237,248)"/>
  </g>
  <text x="148" y="238" font-size="7.5" fill="#a04000" font-family="Inter,sans-serif">Hepatic Caeca</text>
  <line x1="162" y1="244" x2="148" y2="240" stroke="#a04000" stroke-width="0.7"/>

  <!-- Midgut -->
  <rect x="182" y="256" width="36" height="48" rx="8" fill="#d35400" opacity="0.85" class="ck-hotspot" data-organ="midgut" style="cursor:pointer"/>
  <text x="200" y="284" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Midgut</text>

  <!-- Malpighian Tubules -->
  <g class="ck-hotspot" data-organ="malpighian" style="cursor:pointer" opacity="0.85">
    <path d="M218,266 Q245,255 255,240" stroke="#8e44ad" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M218,272 Q248,268 262,258" stroke="#8e44ad" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M218,278 Q250,278 258,270" stroke="#8e44ad" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M182,266 Q155,255 145,240" stroke="#8e44ad" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M182,272 Q152,268 138,258" stroke="#8e44ad" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
  <text x="262" y="248" font-size="7.5" fill="#6c3483" font-family="Inter,sans-serif">Malpighian</text>
  <text x="262" y="258" font-size="7.5" fill="#6c3483" font-family="Inter,sans-serif">Tubules</text>

  <!-- Ileum -->
  <rect x="185" y="308" width="30" height="22" rx="5" fill="#16a085" opacity="0.85" class="ck-hotspot" data-organ="ileum" style="cursor:pointer"/>
  <text x="200" y="322" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Ileum</text>

  <!-- Colon -->
  <rect x="186" y="333" width="28" height="22" rx="5" fill="#1abc9c" opacity="0.85" class="ck-hotspot" data-organ="colon" style="cursor:pointer"/>
  <text x="200" y="347" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Colon</text>

  <!-- Rectum -->
  <rect x="187" y="358" width="26" height="24" rx="5" fill="#27ae60" opacity="0.85" class="ck-hotspot" data-organ="rectum" style="cursor:pointer"/>
  <text x="200" y="373" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Rectum</text>

  <!-- ── NERVOUS SYSTEM ── -->
  <!-- Brain -->
  <ellipse cx="200" cy="68" rx="18" ry="12" fill="#3498db" opacity="0.82" class="ck-hotspot" data-organ="brain" style="cursor:pointer"/>
  <text x="200" y="72" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" style="pointer-events:none">Brain</text>

  <!-- Circumoesophageal connective -->
  <path d="M185,72 Q178,88 182,100" stroke="#2980b9" stroke-width="1.5" fill="none"/>
  <path d="M215,72 Q222,88 218,100" stroke="#2980b9" stroke-width="1.5" fill="none"/>

  <!-- Ventral nerve cord (double) -->
  <line x1="196" y1="100" x2="196" y2="390" stroke="#2980b9" stroke-width="2.5" opacity="0.7" class="ck-hotspot" data-organ="nerve-cord" style="cursor:pointer"/>
  <line x1="204" y1="100" x2="204" y2="390" stroke="#2980b9" stroke-width="2.5" opacity="0.7"/>
  <!-- Ganglia dots -->
  <circle cx="200" cy="120" r="5" fill="#2980b9" opacity="0.9"/>
  <circle cx="200" cy="165" r="5" fill="#2980b9" opacity="0.9"/>
  <circle cx="200" cy="210" r="5" fill="#2980b9" opacity="0.9"/>
  <circle cx="200" cy="260" r="4.5" fill="#2980b9" opacity="0.9"/>
  <circle cx="200" cy="310" r="4.5" fill="#2980b9" opacity="0.9"/>
  <circle cx="200" cy="355" r="4.5" fill="#2980b9" opacity="0.9"/>
  <text x="145" y="215" font-size="7.5" fill="#1a6090" font-family="Inter,sans-serif">Ventral</text>
  <text x="145" y="224" font-size="7.5" fill="#1a6090" font-family="Inter,sans-serif">Nerve Cord</text>
  <line x1="195" y1="220" x2="165" y2="220" stroke="#1a6090" stroke-width="0.7"/>

  <!-- ── REPRODUCTIVE (faint background layer) ── -->
  <ellipse cx="170" cy="365" rx="18" ry="25" fill="#f1c40f" opacity="0.40" class="ck-hotspot" data-organ="ovary" style="cursor:pointer"/>
  <ellipse cx="230" cy="365" rx="18" ry="25" fill="#f1c40f" opacity="0.40"/>
  <text x="136" y="392" font-size="7.5" fill="#a07d00" font-family="Inter,sans-serif">Gonads</text>
  <line x1="162" y1="385" x2="150" y2="390" stroke="#a07d00" stroke-width="0.7"/>

  <!-- Label lines for alimentary -->
  <text x="232" y="182" font-size="8" fill="#c0550e" font-family="Inter,sans-serif">Crop</text>
  <line x1="228" y1="178" x2="230" y2="179" stroke="#c0550e" stroke-width="0.7"/>
  <text x="232" y="222" font-size="8" fill="#922b21" font-family="Inter,sans-serif">Gizzard</text>
  <text x="232" y="288" font-size="8" fill="#a84300" font-family="Inter,sans-serif">Midgut</text>
</svg>`,
  },

  mouthparts: {
    label: "Mouth Parts",
    svg: `
<svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect width="400" height="480" fill="#f0ede6" rx="12"/>
  <text x="200" y="22" text-anchor="middle" font-size="11" fill="#888" font-family="Georgia,serif" font-style="italic">Periplaneta americana — Mouth Parts (Biting-Chewing Type)</text>

  <!-- LABRUM -->
  <ellipse cx="200" cy="90" rx="38" ry="28" fill="#c8a040" stroke="#8B6914" stroke-width="1.5" class="ck-hotspot" data-organ="mouth" style="cursor:pointer"/>
  <path d="M168,90 Q200,105 232,90" fill="#a07828" opacity="0.4"/>
  <text x="200" y="88" text-anchor="middle" font-size="10" fill="#3a2505" font-weight="bold" font-family="Inter,sans-serif">LABRUM</text>
  <text x="200" y="102" text-anchor="middle" font-size="8" fill="#5a3a05" font-family="Inter,sans-serif">(Upper Lip)</text>
  <line x1="245" y1="85" x2="285" y2="78"/><text x="287" y="80" font-size="9" fill="#555" font-family="Inter,sans-serif">Labrum</text>

  <!-- MANDIBLES -->
  <!-- Left mandible -->
  <g class="ck-hotspot" data-organ="mouth" style="cursor:pointer">
    <path d="M118,185 Q98,165 102,195 Q106,225 128,235 Q148,230 155,210 Q158,188 140,178 Z" fill="#a07828" stroke="#6b4c10" stroke-width="1.5"/>
    <path d="M128,235 Q135,248 125,258 Q118,268 110,262 Q105,255 112,245 Z" fill="#8B6914"/>
    <path d="M148,230 Q155,242 150,252 Q145,262 136,258 Q130,250 138,240 Z" fill="#8B6914"/>
    <text x="85" y="210" font-size="9" fill="#3a2505" font-weight="bold" font-family="Inter,sans-serif">MANDIBLE</text>
    <text x="85" y="222" font-size="7.5" fill="#5a3a05" font-family="Inter,sans-serif">(Jaw — biting)</text>
  </g>
  <!-- Right mandible -->
  <g class="ck-hotspot" data-organ="mouth" style="cursor:pointer">
    <path d="M282,185 Q302,165 298,195 Q294,225 272,235 Q252,230 245,210 Q242,188 260,178 Z" fill="#a07828" stroke="#6b4c10" stroke-width="1.5"/>
    <path d="M272,235 Q265,248 275,258 Q282,268 290,262 Q295,255 288,245 Z" fill="#8B6914"/>
    <path d="M252,230 Q245,242 250,252 Q255,262 264,258 Q270,250 262,240 Z" fill="#8B6914"/>
  </g>

  <!-- HYPOPHARYNX -->
  <g class="ck-hotspot" data-organ="mouth" style="cursor:pointer">
    <ellipse cx="200" cy="195" rx="20" ry="28" fill="#e8c060" stroke="#c8a040" stroke-width="1.2"/>
    <text x="200" y="193" text-anchor="middle" font-size="8" fill="#3a2505" font-weight="bold" font-family="Inter,sans-serif">HYPO-</text>
    <text x="200" y="204" text-anchor="middle" font-size="8" fill="#3a2505" font-weight="bold" font-family="Inter,sans-serif">PHARYNX</text>
    <text x="200" y="215" text-anchor="middle" font-size="7" fill="#5a3a05" font-family="Inter,sans-serif">(Tongue)</text>
  </g>

  <!-- MAXILLAE -->
  <!-- Left -->
  <g class="ck-hotspot" data-organ="mouth" style="cursor:pointer">
    <path d="M88,295 Q68,270 72,300 Q76,330 95,345 Q115,350 128,335 Q138,318 130,300 Q118,280 100,282 Z" fill="#d4a030" stroke="#8B6914" stroke-width="1.2"/>
    <!-- maxillary palp -->
    <path d="M88,340 Q80,360 72,378 Q68,390 78,396 Q88,398 92,386 Q96,372 100,354" stroke="#8B6914" stroke-width="2" fill="none"/>
    <path d="M100,350 Q92,372 90,390" stroke="#8B6914" stroke-width="1.5" fill="none"/>
    <text x="42" y="316" font-size="9" fill="#3a2505" font-weight="bold" font-family="Inter,sans-serif">MAXILLA</text>
    <text x="42" y="328" font-size="7.5" fill="#5a3a05" font-family="Inter,sans-serif">(w/ palp)</text>
  </g>
  <!-- Right -->
  <g class="ck-hotspot" data-organ="mouth" style="cursor:pointer">
    <path d="M312,295 Q332,270 328,300 Q324,330 305,345 Q285,350 272,335 Q262,318 270,300 Q282,280 300,282 Z" fill="#d4a030" stroke="#8B6914" stroke-width="1.2"/>
    <path d="M312,340 Q320,360 328,378 Q332,390 322,396 Q312,398 308,386 Q304,372 300,354" stroke="#8B6914" stroke-width="2" fill="none"/>
    <path d="M300,350 Q308,372 310,390" stroke="#8B6914" stroke-width="1.5" fill="none"/>
  </g>

  <!-- LABIUM -->
  <g class="ck-hotspot" data-organ="mouth" style="cursor:pointer">
    <path d="M160,310 Q160,345 165,368 Q175,392 200,400 Q225,392 235,368 Q240,345 240,310 Q220,302 200,302 Q180,302 160,310 Z" fill="#b8860b" stroke="#8B6914" stroke-width="1.5"/>
    <!-- labial palps -->
    <path d="M175,390 Q168,410 162,428 Q158,440 168,444" stroke="#8B6914" stroke-width="2" fill="none"/>
    <path d="M185,396 Q180,418 176,436" stroke="#8B6914" stroke-width="1.5" fill="none"/>
    <path d="M225,390 Q232,410 238,428 Q242,440 232,444" stroke="#8B6914" stroke-width="2" fill="none"/>
    <path d="M215,396 Q220,418 224,436" stroke="#8B6914" stroke-width="1.5" fill="none"/>
    <text x="200" y="350" text-anchor="middle" font-size="10" fill="#f0ede6" font-weight="bold" font-family="Inter,sans-serif">LABIUM</text>
    <text x="200" y="363" text-anchor="middle" font-size="7.5" fill="#f0d8a0" font-family="Inter,sans-serif">(Lower Lip)</text>
  </g>

  <!-- Bracket showing all = mouthparts -->
  <text x="200" y="468" text-anchor="middle" font-size="9" fill="#555" font-family="Georgia,serif" font-style="italic">All parts together = Biting–Chewing Mouthparts</text>
</svg>`,
  },
};

// ── CHANNA SVG VIEWS ──────────────────────────────
const CH_VIEWS = {

  external: {
    label: "External (Lateral)",
    svg: `
<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <linearGradient id="fishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2d5a3d"/>
      <stop offset="60%" stop-color="#3d7a52"/>
      <stop offset="100%" stop-color="#2d5a3d"/>
    </linearGradient>
    <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d7a52"/>
      <stop offset="100%" stop-color="#b8d4c0"/>
    </linearGradient>
  </defs>
  <rect width="500" height="300" fill="#e8f4f8" rx="12"/>
  <text x="250" y="20" text-anchor="middle" font-size="11" fill="#555" font-family="Georgia,serif" font-style="italic">Channa punctata — External Lateral View</text>

  <!-- BODY -->
  <path d="M55,150 Q80,90 180,80 Q320,72 420,105 Q460,120 480,150 Q460,180 420,195 Q320,228 180,220 Q80,210 55,150 Z"
        fill="url(#fishGrad)" stroke="#1e4028" stroke-width="1.5"/>
  <!-- Belly lighter -->
  <path d="M55,150 Q80,175 180,185 Q320,198 420,175 Q450,162 475,150 Q450,140 420,148 Q320,165 180,158 Q80,150 55,150 Z"
        fill="url(#bellyGrad)" opacity="0.45"/>

  <!-- Scale pattern — rows of arcs -->
  <g stroke="#1e4028" stroke-width="0.6" fill="none" opacity="0.35">
    <path d="M130,90 Q140,100 150,90"/><path d="M150,90 Q160,100 170,90"/>
    <path d="M170,90 Q180,100 190,90"/><path d="M190,90 Q200,100 210,90"/>
    <path d="M210,90 Q220,100 230,90"/><path d="M230,90 Q240,100 250,90"/>
    <path d="M250,90 Q260,100 270,90"/><path d="M270,90 Q280,100 290,90"/>
    <path d="M290,90 Q300,100 310,90"/><path d="M310,90 Q320,100 330,90"/>
    <path d="M330,92 Q340,102 350,92"/><path d="M350,94 Q360,104 370,94"/>
    <path d="M120,108 Q132,118 144,108"/><path d="M144,108 Q156,118 168,108"/>
    <path d="M168,108 Q180,118 192,108"/><path d="M192,108 Q204,118 216,108"/>
    <path d="M216,108 Q228,118 240,108"/><path d="M240,108 Q252,118 264,108"/>
    <path d="M264,108 Q276,118 288,108"/><path d="M288,108 Q300,118 312,108"/>
    <path d="M312,108 Q324,118 336,108"/><path d="M336,110 Q348,120 360,110"/>
    <path d="M120,126 Q132,136 144,126"/><path d="M144,126 Q156,136 168,126"/>
    <path d="M168,126 Q180,136 192,126"/><path d="M192,126 Q204,136 216,126"/>
    <path d="M216,126 Q228,136 240,126"/><path d="M240,126 Q252,136 264,126"/>
    <path d="M264,126 Q276,136 288,126"/><path d="M288,126 Q300,136 312,126"/>
    <!-- Spots — punctata -->
    <circle cx="160" cy="130" r="5" fill="#0d3018" stroke="none" opacity="0.5"/>
    <circle cx="210" cy="115" r="6" fill="#0d3018" stroke="none" opacity="0.5"/>
    <circle cx="260" cy="132" r="5" fill="#0d3018" stroke="none" opacity="0.5"/>
    <circle cx="310" cy="118" r="5.5" fill="#0d3018" stroke="none" opacity="0.5"/>
    <circle cx="350" cy="125" r="4.5" fill="#0d3018" stroke="none" opacity="0.5"/>
    <circle cx="185" cy="100" r="4" fill="#0d3018" stroke="none" opacity="0.4"/>
    <circle cx="235" cy="108" r="4.5" fill="#0d3018" stroke="none" opacity="0.4"/>
    <circle cx="285" cy="102" r="4" fill="#0d3018" stroke="none" opacity="0.4"/>
  </g>

  <!-- Lateral line -->
  <path d="M100,145 Q250,138 420,148" stroke="#c8e0d0" stroke-width="1.5" fill="none" stroke-dasharray="6,3"/>
  <text x="380" y="138" font-size="8" fill="#2d5a3d" font-family="Inter,sans-serif">Lateral Line</text>

  <!-- TAIL (caudal fin) -->
  <path d="M475,150 L500,112 L498,150 L500,188 Z" fill="#2d5a3d" stroke="#1e4028" stroke-width="1.2"/>
  <line x1="476" y1="150" x2="500" y2="112" stroke="#1e4028" stroke-width="0.7" opacity="0.5"/>
  <line x1="476" y1="150" x2="500" y2="188" stroke="#1e4028" stroke-width="0.7" opacity="0.5"/>

  <!-- DORSAL FIN -->
  <path d="M160,80 Q220,45 340,72 Q380,80 420,105 Q380,88 340,82 Q220,60 160,80 Z"
        fill="#245038" stroke="#1e4028" stroke-width="1" opacity="0.85"/>
  <!-- dorsal fin rays -->
  <g stroke="#1e4028" stroke-width="0.7" opacity="0.5">
    <line x1="170" y1="79" x2="168" y2="57"/>
    <line x1="195" y1="76" x2="193" y2="52"/>
    <line x1="222" y1="73" x2="220" y2="49"/>
    <line x1="250" y1="71" x2="248" y2="47"/>
    <line x1="278" y1="71" x2="276" y2="48"/>
    <line x1="306" y1="73" x2="305" y2="50"/>
    <line x1="330" y1="76" x2="330" y2="55"/>
    <line x1="352" y1="79" x2="353" y2="62"/>
  </g>

  <!-- PECTORAL FIN -->
  <path d="M140,148 Q130,170 148,192 Q165,200 175,185 Q178,165 160,148 Z"
        fill="#245038" stroke="#1e4028" stroke-width="1"/>

  <!-- PELVIC FIN -->
  <path d="M195,185 Q190,210 205,218 Q215,215 218,202 Q212,190 195,185 Z"
        fill="#245038" stroke="#1e4028" stroke-width="1"/>

  <!-- ANAL FIN -->
  <path d="M310,195 Q340,215 400,205 Q420,198 420,195 Q380,192 340,192 Z"
        fill="#245038" stroke="#1e4028" stroke-width="1"/>

  <!-- HEAD / EYE -->
  <ellipse cx="88" cy="145" rx="8" ry="9" fill="#111" stroke="#444" stroke-width="1"/>
  <ellipse cx="86" cy="143" rx="3" ry="2.5" fill="#333"/>

  <!-- MOUTH -->
  <path d="M42,148 Q52,138 60,145 Q52,158 42,155 Z" fill="#c8a040" stroke="#8B6914" stroke-width="1" class="ck-hotspot" data-organ="mouth-ch" style="cursor:pointer"/>

  <!-- OPERCULUM -->
  <path d="M105,110 Q130,105 135,148 Q130,190 105,188 Q95,168 95,148 Q95,128 105,110 Z"
        fill="#3d7a52" stroke="#1e4028" stroke-width="1" opacity="0.8"/>

  <!-- ── LABELS ── -->
  <line x1="50" y1="148" x2="22" y2="135"/><text x="2" y="133" font-size="8.5" fill="#333" font-family="Inter,sans-serif">Mouth</text>
  <line x1="88" y1="136" x2="80" y2="110"/><text x="56" y="107" font-size="8.5" fill="#333" font-family="Inter,sans-serif">Eye</text>
  <line x1="118" y1="148" x2="105" y2="120"/><text x="70" y="118" font-size="8.5" fill="#333" font-family="Inter,sans-serif">Operculum</text>
  <line x1="155" y1="170" x2="128" y2="210"/><text x="80" y="215" font-size="8.5" fill="#333" font-family="Inter,sans-serif">Pectoral Fin</text>
  <line x1="250" y1="65" x2="250" y2="38"/><text x="200" y="35" font-size="8.5" fill="#333" font-family="Inter,sans-serif">Dorsal Fin (long)</text>
  <line x1="365" y1="200" x2="365" y2="230"/><text x="320" y="243" font-size="8.5" fill="#333" font-family="Inter,sans-serif">Anal Fin</text>
  <line x1="490" y1="150" x2="510" y2="150"/><text x="440" y="265" font-size="8.5" fill="#333" font-family="Inter,sans-serif">Caudal Fin</text>
  <line x1="250" y1="138" x2="250" y2="120"/><text x="210" y="118" font-size="8.5" fill="#2d5a3d" font-family="Inter,sans-serif">Lateral Line</text>
</svg>`,
  },

  dissected: {
    label: "Internal (Dissected)",
    svg: `
<svg viewBox="0 0 460 560" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect width="460" height="560" fill="#e8f4f8" rx="12"/>
  <text x="230" y="20" text-anchor="middle" font-size="11" fill="#555" font-family="Georgia,serif" font-style="italic">Channa punctata — Digestive System (Ventral Dissection)</text>

  <!-- Body outline ghost -->
  <ellipse cx="230" cy="80" rx="55" ry="52" fill="none" stroke="#5a9a6a" stroke-width="1" stroke-dasharray="5,3"/>
  <path d="M178,130 Q158,230 162,400 Q230,440 298,400 Q302,230 282,130 Z"
        fill="none" stroke="#5a9a6a" stroke-width="1" stroke-dasharray="5,3"/>

  <!-- HEAD region -->
  <ellipse cx="230" cy="80" rx="55" ry="50" fill="#b8d4c0" opacity="0.3"/>

  <!-- MOUTH -->
  <ellipse cx="230" cy="38" rx="24" ry="14" fill="#f39c12" opacity="0.88" class="ck-hotspot" data-organ="mouth-ch" style="cursor:pointer"/>
  <text x="230" y="42" text-anchor="middle" font-size="8.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Mouth</text>

  <!-- GILLS (left + right) -->
  <g class="ck-hotspot" data-organ="gills-ch" style="cursor:pointer" opacity="0.85">
    <ellipse cx="185" cy="85" rx="28" ry="20" fill="#3498db"/>
    <line x1="162" y1="78" x2="208" y2="78" stroke="#fff" stroke-width="0.8"/>
    <line x1="160" y1="85" x2="210" y2="85" stroke="#fff" stroke-width="0.8"/>
    <line x1="162" y1="92" x2="208" y2="92" stroke="#fff" stroke-width="0.8"/>
    <text x="185" y="89" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Gills (L)</text>
    <ellipse cx="275" cy="85" rx="28" ry="20" fill="#3498db"/>
    <line x1="252" y1="78" x2="298" y2="78" stroke="#fff" stroke-width="0.8"/>
    <line x1="250" y1="85" x2="300" y2="85" stroke="#fff" stroke-width="0.8"/>
    <line x1="252" y1="92" x2="298" y2="92" stroke="#fff" stroke-width="0.8"/>
    <text x="275" y="89" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Gills (R)</text>
  </g>

  <!-- SUPRABRANCHIAL AIR ORGAN -->
  <path d="M195,55 Q230,42 265,55 Q268,70 230,72 Q192,70 195,55 Z"
        fill="#2980b9" opacity="0.8" class="ck-hotspot" data-organ="suprabranchial-ch" style="cursor:pointer"/>
  <text x="230" y="66" text-anchor="middle" font-size="7" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Air Organ</text>

  <!-- PHARYNX -->
  <rect x="216" y="104" width="28" height="16" rx="5" fill="#e74c3c" opacity="0.85" class="ck-hotspot" data-organ="pharynx-ch" style="cursor:pointer"/>
  <text x="230" y="115" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Pharynx</text>

  <!-- OESOPHAGUS -->
  <rect x="220" y="120" width="20" height="20" rx="4" fill="#c0392b" opacity="0.85" class="ck-hotspot" data-organ="oesophagus-ch" style="cursor:pointer"/>
  <text x="230" y="133" text-anchor="middle" font-size="7" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Oeso.</text>

  <!-- LIVER (large, bilobed, flanking stomach) -->
  <g class="ck-hotspot" data-organ="liver-ch" style="cursor:pointer" opacity="0.88">
    <path d="M175,140 Q158,148 155,168 Q155,188 170,195 Q190,200 200,188 Q205,170 200,150 Q192,138 175,140 Z" fill="#8e44ad"/>
    <path d="M285,140 Q302,148 305,168 Q305,188 290,195 Q270,200 260,188 Q255,170 260,150 Q268,138 285,140 Z" fill="#8e44ad"/>
    <text x="158" y="172" font-size="7" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" text-anchor="middle">Liver</text>
    <text x="158" y="182" font-size="7" fill="#fff" font-family="Inter,sans-serif" text-anchor="middle">(R. Lobe)</text>
    <text x="302" y="172" font-size="7" fill="#fff" font-weight="bold" font-family="Inter,sans-serif" text-anchor="middle">Liver</text>
    <text x="302" y="182" font-size="7" fill="#fff" font-family="Inter,sans-serif" text-anchor="middle">(L. Lobe)</text>
  </g>

  <!-- GALL BLADDER -->
  <ellipse cx="218" cy="175" rx="10" ry="14" fill="#27ae60" opacity="0.88" class="ck-hotspot" data-organ="liver-ch" style="cursor:pointer"/>
  <text x="200" y="198" font-size="7" fill="#1a5e30" font-family="Inter,sans-serif">Gall</text>
  <text x="198" y="207" font-size="7" fill="#1a5e30" font-family="Inter,sans-serif">Bladder</text>
  <line x1="218" y1="188" x2="206" y2="196" stroke="#1a5e30" stroke-width="0.8"/>

  <!-- STOMACH (cardiac + pyloric) -->
  <g class="ck-hotspot" data-organ="stomach-ch" style="cursor:pointer">
    <path d="M210,140 Q210,148 215,162 Q218,178 225,185 Q235,188 245,185 Q252,178 255,162 Q260,148 260,140 Q248,135 230,134 Q215,135 210,140 Z"
          fill="#e67e22" opacity="0.88"/>
    <text x="232" y="155" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Cardiac</text>
    <text x="232" y="165" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Stomach</text>
  </g>

  <!-- PYLORIC CAECA -->
  <g class="ck-hotspot" data-organ="pyloricCaeca-ch" style="cursor:pointer" opacity="0.85">
    <path d="M240,182 Q255,188 260,200 Q256,210 245,208 Q238,198 240,182 Z" fill="#d35400"/>
    <path d="M248,180 Q265,184 270,196 Q266,208 254,206 Q246,196 248,180 Z" fill="#d35400"/>
    <path d="M256,178 Q273,180 278,192 Q273,205 260,203 Q253,192 256,178 Z" fill="#d35400"/>
    <text x="278" y="200" font-size="7.5" fill="#a03000" font-family="Inter,sans-serif">Pyloric</text>
    <text x="278" y="210" font-size="7.5" fill="#a03000" font-family="Inter,sans-serif">Caeca</text>
    <line x1="275" y1="197" x2="272" y2="194" stroke="#a03000" stroke-width="0.7"/>
  </g>

  <!-- INTESTINE (coiled) -->
  <g class="ck-hotspot" data-organ="intestine-ch" style="cursor:pointer" opacity="0.88">
    <path d="M215,192 Q195,200 188,220 Q182,245 192,265 Q205,278 225,275 Q248,272 258,255 Q268,235 258,215 Q248,198 230,195 Z"
          fill="#16a085" stroke="#0e7060" stroke-width="1"/>
    <text x="223" y="235" text-anchor="middle" font-size="8.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Intestine</text>
    <text x="223" y="247" text-anchor="middle" font-size="7" fill="#d0f4ee" font-family="Inter,sans-serif">(coiled)</text>
  </g>

  <!-- KIDNEY -->
  <g class="ck-hotspot" data-organ="kidney-ch" style="cursor:pointer" opacity="0.82">
    <rect x="178" y="285" width="104" height="14" rx="7" fill="#f39c12"/>
    <text x="230" y="295" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Kidney (Mesonephros)</text>
  </g>

  <!-- GONADS -->
  <g class="ck-hotspot" data-organ="gonad-ch" style="cursor:pointer" opacity="0.82">
    <ellipse cx="200" cy="330" rx="22" ry="40" fill="#e91e63"/>
    <ellipse cx="260" cy="330" rx="22" ry="40" fill="#e91e63"/>
    <text x="200" y="334" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Gonad</text>
    <text x="260" y="334" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Gonad</text>
  </g>

  <!-- RECTUM -->
  <rect x="216" y="378" width="28" height="30" rx="6" fill="#27ae60" opacity="0.88" class="ck-hotspot" data-organ="rectum-ch" style="cursor:pointer"/>
  <text x="230" y="396" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold" font-family="Inter,sans-serif">Rectum</text>

  <!-- ANUS -->
  <ellipse cx="230" cy="420" rx="10" ry="6" fill="#1e8449" opacity="0.85"/>
  <text x="230" y="437" text-anchor="middle" font-size="7.5" fill="#1e8449" font-family="Inter,sans-serif">Anus</text>

  <!-- Label lines -->
  <line x1="310" y1="85" x2="335" y2="85"/><text x="337" y="89" font-size="8" fill="#1a5fa0" font-family="Inter,sans-serif">Gills</text>
  <line x1="230" y1="58" x2="310" y2="45"/><text x="312" y="48" font-size="8" fill="#1a5fa0" font-family="Inter,sans-serif">Air Organ</text>
  <line x1="155" y1="185" x2="118" y2="200"/><text x="55" y="204" font-size="8" fill="#6c3483" font-family="Inter,sans-serif">Liver (bilobed)</text>
  <line x1="230" y1="163" x2="138" y2="155"/><text x="55" y="158" font-size="8" fill="#a04010" font-family="Inter,sans-serif">Stomach</text>
  <line x1="230" y1="240" x2="130" y2="240"/><text x="55" y="244" font-size="8" fill="#0e7060" font-family="Inter,sans-serif">Intestine</text>
  <line x1="230" y1="292" x2="130" y2="292"/><text x="55" y="296" font-size="8" fill="#b07000" font-family="Inter,sans-serif">Kidney</text>
  <line x1="200" y1="362" x2="130" y2="362"/><text x="55" y="366" font-size="8" fill="#c01060" font-family="Inter,sans-serif">Gonads</text>
  <line x1="230" y1="393" x2="310" y2="393"/><text x="312" y="397" font-size="8" fill="#1a7a35" font-family="Inter,sans-serif">Rectum</text>
</svg>`,
  },
};
