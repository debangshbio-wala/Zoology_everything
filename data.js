// ===================================================
// data.js — All zoological content for ZooBio
// Add new kingdoms, organs, phyla, etc. here only.
// ===================================================

// ── SIX KINGDOMS ──────────────────────────────────
const KINGDOMS = [
  {
    name: "Eubacteria",
    emoji: "🦠",
    color: "#e74c3c",
    cell: "Prokaryotic",
    nutrition: "Autotrophic / Heterotrophic",
    nucleus: "Absent",
    example: "Escherichia coli",
    description: "True bacteria with peptidoglycan cell walls. They are the most abundant organisms on Earth, colonising every habitat from deep-sea vents to the human gut. Reproduce by binary fission.",
    branches: ["Proteobacteria", "Firmicutes", "Cyanobacteria", "Actinobacteria", "Spirochaetes"],
  },
  {
    name: "Archaebacteria",
    emoji: "⚗️",
    color: "#e67e22",
    cell: "Prokaryotic",
    nutrition: "Chemosynthetic / Autotrophic",
    nucleus: "Absent",
    example: "Methanobacterium",
    description: "Ancient prokaryotes that thrive in extreme environments — hot springs, salt lakes, and anaerobic swamps. Their cell membranes contain unique ether-linked lipids absent in all other life.",
    branches: ["Methanogens", "Halophiles", "Thermophiles", "Acidophiles"],
  },
  {
    name: "Protista",
    emoji: "🔵",
    color: "#2ecc71",
    cell: "Eukaryotic",
    nutrition: "Autotrophic / Heterotrophic",
    nucleus: "Present",
    example: "Amoeba proteus",
    description: "A catch-all kingdom for unicellular (and some colonial) eukaryotes. Includes protozoa, algae, slime moulds and water moulds. They occupy virtually all aquatic ecosystems and are critical links in food chains.",
    branches: ["Protozoa", "Algae (Chlorophyta, Phaeophyta)", "Slime moulds", "Oomycetes"],
  },
  {
    name: "Fungi",
    emoji: "🍄",
    color: "#9b59b6",
    cell: "Eukaryotic",
    nutrition: "Heterotrophic (absorptive)",
    nucleus: "Present",
    example: "Aspergillus niger",
    description: "Multicellular (usually) eukaryotes with chitinous cell walls. Fungi absorb nutrients by secreting exoenzymes into substrate. They are essential decomposers recycling carbon and nitrogen in ecosystems.",
    branches: ["Zygomycota", "Ascomycota (sac fungi)", "Basidiomycota (club fungi)", "Deuteromycota"],
  },
  {
    name: "Plantae",
    emoji: "🌿",
    color: "#27ae60",
    cell: "Eukaryotic",
    nutrition: "Autotrophic (photosynthesis)",
    nucleus: "Present",
    example: "Ficus benghalensis",
    description: "Multicellular photosynthetic eukaryotes with cellulosic cell walls and chloroplasts containing chlorophyll a & b. They form the base of most terrestrial food webs and produce atmospheric oxygen.",
    branches: ["Bryophyta (mosses)", "Pteridophyta (ferns)", "Gymnosperms", "Angiosperms"],
  },
  {
    name: "Animalia",
    emoji: "🐾",
    color: "#3498db",
    cell: "Eukaryotic",
    nutrition: "Heterotrophic (ingestion)",
    nucleus: "Present",
    example: "Homo sapiens",
    description: "Multicellular eukaryotes lacking cell walls. Animals ingest organic matter and digest it internally. Most are motile at some stage of life and display remarkable structural diversity — from sponges to vertebrates.",
    branches: ["Porifera", "Cnidaria", "Platyhelminthes", "Annelida", "Arthropoda", "Mollusca", "Echinodermata", "Chordata"],
  },
];

// ── COCKROACH ORGANS ──────────────────────────────
const COCKROACH_ORGANS = [
  {
    id: "mouth",
    name: "Mouth Parts (Biting-Chewing)",
    color: "#f39c12",
    system: "alimentary",
    description: "The cockroach possesses biting and chewing mouthparts — the most primitive insect feeding type. These include: labrum (upper lip), mandibles (biting jaws), maxillae (cutting/tasting), labium (lower lip), and hypopharynx (tongue-like). Food is mechanically broken down before entering the alimentary canal.",
    function: "Mechanical ingestion and initial breakdown of solid food.",
  },
  {
    id: "oesophagus",
    name: "Oesophagus",
    color: "#e74c3c",
    system: "alimentary",
    description: "A narrow tube connecting the pharynx to the crop. It passes through the thorax and transports food posteriorly via peristalsis. No digestion occurs here.",
    function: "Food conduction from pharynx to crop.",
  },
  {
    id: "crop",
    name: "Crop (Ingluvies)",
    color: "#e67e22",
    system: "alimentary",
    description: "An enlarged sac-like expansion of the oesophagus located in the thorax. The crop temporarily stores ingested food and begins salivary enzyme action. Salivary amylase here starts starch digestion.",
    function: "Food storage and preliminary starch digestion.",
  },
  {
    id: "gizzard",
    name: "Gizzard (Proventriculus)",
    color: "#c0392b",
    system: "alimentary",
    description: "A muscular, thick-walled chamber armed with 6 chitinous teeth ('gastric mill'). The gizzard grinds food mechanically into fine particles and acts as a valve controlling passage into the midgut.",
    function: "Mechanical grinding of food; regulation of food flow.",
  },
  {
    id: "midgut",
    name: "Midgut (Mesenteron)",
    color: "#d35400",
    system: "alimentary",
    description: "The main site of chemical digestion and absorption. The midgut secretes proteases, lipases, amylases and maltases. 8 hepatic caeca (blind pouches) open at its anterior end, vastly increasing the absorptive surface area.",
    function: "Secretion of digestive enzymes and absorption of nutrients.",
  },
  {
    id: "malpighian",
    name: "Malpighian Tubules",
    color: "#8e44ad",
    system: "alimentary",
    description: "Thin, hair-like tubules (~60–150) arising at the junction of midgut and hindgut. They extract uric acid, salts and nitrogenous wastes from the haemolymph, functioning as the cockroach's kidneys. They are an arthropod innovation absent in other invertebrates.",
    function: "Osmoregulation and excretion of nitrogenous waste as uric acid.",
  },
  {
    id: "ileum",
    name: "Ileum (Hindgut anterior)",
    color: "#16a085",
    system: "alimentary",
    description: "The first segment of the hindgut. Water and ions are reabsorbed here from the digestive matter, concentrating waste. The lining bears longitudinal folds to enhance reabsorption.",
    function: "Water and ion reabsorption from intestinal contents.",
  },
  {
    id: "colon",
    name: "Colon",
    color: "#1abc9c",
    system: "alimentary",
    description: "The middle part of the hindgut. Further water recovery and compaction of faecal matter occurs here. Microbial fermentation of some carbohydrates also takes place.",
    function: "Final water recovery and faecal compaction.",
  },
  {
    id: "rectum",
    name: "Rectum & Anal Pad",
    color: "#27ae60",
    system: "alimentary",
    description: "The terminal chamber of the hindgut. Specialised rectal pads (6 paired pads) are highly permeable and perform the last stage of water absorption. The anus opens posteriorly to expel solid faecal pellets.",
    function: "Final water absorption; storage and egestion of faeces.",
  },
  {
    id: "nerve-cord",
    name: "Ventral Nerve Cord",
    color: "#2980b9",
    system: "nervous",
    description: "A double, ladder-like cord running along the ventral midline. It contains 3 thoracic ganglia and 6 abdominal ganglia. This segmental arrangement allows each segment some autonomy — a cockroach can still walk even without its head for a limited time.",
    function: "Transmission of sensory signals; motor coordination of appendages.",
  },
  {
    id: "brain",
    name: "Supra-oesophageal Ganglion (Brain)",
    color: "#3498db",
    system: "nervous",
    description: "Located dorsal to the oesophagus in the head. It integrates sensory input from compound eyes, ocelli, and antennae. Connected to the sub-oesophageal ganglion by a pair of circumoesophageal connectives.",
    function: "Processing of sensory information; initiation of complex behaviours.",
  },
  {
    id: "ovary",
    name: "Ovaries / Testes",
    color: "#f1c40f",
    system: "reproductive",
    description: "Female: 8 ovarioles per ovary produce oothecae (egg cases) containing ~16 eggs. Male: testis lobules produce sperm stored in seminal vesicles. The female accessory colleterial glands secrete the hardened ootheca casing.",
    function: "Production of gametes; formation of ootheca in females.",
  },
];

// ── CHANNA ORGANS ─────────────────────────────────
const CHANNA_ORGANS = [
  {
    id: "mouth-ch",
    name: "Mouth & Buccal Cavity",
    color: "#f39c12",
    system: "alimentary",
    description: "Channa has a wide, terminal mouth with bands of villiform teeth on the jaws and vomer. It is a voracious carnivore. The buccal cavity leads to the pharynx and is lined with mucus-secreting cells that lubricate prey.",
    function: "Prey capture; initial entry into the alimentary canal.",
  },
  {
    id: "pharynx-ch",
    name: "Pharynx",
    color: "#e74c3c",
    system: "alimentary",
    description: "The common passage for food and water. The pharyngeal teeth (pharyngeal bones) assist in further prey compression. Water passes to the gill chamber; food continues posteriorly.",
    function: "Routing of food to oesophagus and water to gills.",
  },
  {
    id: "oesophagus-ch",
    name: "Oesophagus",
    color: "#c0392b",
    system: "alimentary",
    description: "Short, muscular and highly distensible, allowing Channa to swallow large prey. Lined with stratified epithelium and mucous cells. No digestive enzymes are secreted here.",
    function: "Food transport from pharynx to stomach.",
  },
  {
    id: "stomach-ch",
    name: "Stomach (J-shaped)",
    color: "#e67e22",
    system: "alimentary",
    description: "A large, J-shaped muscular sac — the principal site of protein digestion. Gastric glands secrete pepsin (as pepsinogen) and hydrochloric acid (HCl), creating a strongly acidic environment (pH 2–3). The pyloric sphincter regulates passage to the intestine.",
    function: "Protein denaturation and partial digestion by pepsin.",
  },
  {
    id: "pyloricCaeca-ch",
    name: "Pyloric Caeca",
    color: "#d35400",
    system: "alimentary",
    description: "Finger-like blind pouches at the pyloric end of the stomach. In Channa, 3–6 such caeca are present. They increase the secretory and absorptive surface. Pancreatic-like enzymes (protease, lipase, amylase) are produced here.",
    function: "Enzyme secretion; increased absorptive surface area.",
  },
  {
    id: "intestine-ch",
    name: "Small & Large Intestine",
    color: "#16a085",
    system: "alimentary",
    description: "The intestine is coiled. The inner mucosa bears numerous villi with microvilli (brush border) for maximal nutrient absorption. Bile from the liver and enzymes from the pancreatic tissue complete digestion of fats, proteins and carbohydrates.",
    function: "Final digestion and major absorption of amino acids, sugars, fatty acids.",
  },
  {
    id: "liver-ch",
    name: "Liver & Gall Bladder",
    color: "#8e44ad",
    system: "alimentary",
    description: "The liver is a large, dark-red bilobed organ occupying much of the cranial abdominal cavity. It produces bile, detoxifies blood, stores glycogen and synthesises plasma proteins. The gall bladder stores bile (greenish fluid) and releases it via the bile duct into the intestine to emulsify fats.",
    function: "Bile production; glycogen storage; detoxification; fat emulsification.",
  },
  {
    id: "rectum-ch",
    name: "Rectum & Anus",
    color: "#27ae60",
    system: "alimentary",
    description: "The terminal intestine compacts undigested waste. The anus opens at the base of the caudal fin. Channa lacks a urogenital sinus — the anus and urogenital openings are separate.",
    function: "Waste compaction and egestion.",
  },
  {
    id: "gills-ch",
    name: "Gills (Holobranchs)",
    color: "#3498db",
    system: "nervous",
    description: "Four pairs of gill arches each bear two rows of gill filaments (holobranch). Each filament has secondary lamellae maximising gas exchange surface. Water flows over lamellae in the opposite direction to blood (counter-current exchange), achieving ~80% O₂ extraction.",
    function: "Gas exchange: O₂ absorption and CO₂ excretion from water.",
  },
  {
    id: "suprabranchial-ch",
    name: "Suprabranchial Air Organ",
    color: "#2980b9",
    system: "nervous",
    description: "Unique to the family Channidae. Located dorsal to the gill chamber, this labyrinth-like chamber is richly vascularised and lined with respiratory epithelium. It allows Channa to breathe atmospheric air directly — enabling survival in hypoxic or even temporarily drained water bodies.",
    function: "Accessory aerial respiration; survival in low-oxygen water.",
  },
  {
    id: "kidney-ch",
    name: "Kidneys (Mesonephros)",
    color: "#f1c40f",
    system: "nervous",
    description: "Dark-red elongated organs flanking the vertebral column. Each kidney is a mesonephros type (typical for teleosts), filtering blood to produce urine containing ammonia and urea. Teleosts excrete mainly as ammonia (ammonotelic).",
    function: "Blood filtration; osmoregulation; nitrogenous waste excretion.",
  },
  {
    id: "gonad-ch",
    name: "Gonads (Ovary / Testis)",
    color: "#e91e63",
    system: "reproductive",
    description: "Paired elongated gonads. Female ovaries are filled with yolky eggs during the breeding season. Male testes are white and lobular. Channa punctata shows parental care — the male guards the nest and fry after spawning.",
    function: "Gamete production; reproduction.",
  },
];

// ── CLASSIFICATION CRITERIA ───────────────────────
const CLASSIFICATION_CRITERIA = [
  {
    icon: "🔬",
    title: "Cell Type",
    text: "The most fundamental division: prokaryotic (no membrane-bound nucleus) vs eukaryotic (nucleus present). This single trait separates Bacteria and Archaea from all other life."
  },
  {
    icon: "🧬",
    title: "Body Organisation",
    text: "Unicellular → Colonial → Multicellular. Complexity of organisation determines whether an organism belongs to Protista, Fungi, Plantae or Animalia."
  },
  {
    icon: "🍽️",
    title: "Mode of Nutrition",
    text: "Autotrophs (photosynthesis / chemosynthesis) vs heterotrophs (holozoic, saprophytic, parasitic, absorptive). Nutrition strategy reflects metabolic strategy and ecological role."
  },
  {
    icon: "🪬",
    title: "Cell Wall Composition",
    text: "Bacteria: peptidoglycan. Fungi: chitin. Plants: cellulose. Animals: absent. Cell wall chemistry reflects ancient evolutionary divergences."
  },
  {
    icon: "🧫",
    title: "Reproduction",
    text: "Sexual (meiosis + fusion of gametes) or asexual (binary fission, budding, sporulation). The method of reproduction and genetic recombination is taxonomically informative."
  },
  {
    icon: "🧪",
    title: "Biochemistry & Molecular Data",
    text: "Ribosomal RNA (16S/18S rRNA) sequences, cytochrome c comparisons, and DNA hybridisation now provide objective molecular evidence for evolutionary relationships."
  },
  {
    icon: "🫁",
    title: "Body Symmetry",
    text: "Asymmetry (sponges), radial symmetry (jellyfish), or bilateral symmetry (most animals). Symmetry type correlates with lifestyle: sessile animals tend toward radial; active hunters are bilateral."
  },
  {
    icon: "🧱",
    title: "Embryonic Germ Layers",
    text: "Diploblastic (2 layers: ectoderm + endoderm) in Cnidaria. Triploblastic (+ mesoderm) in all higher animals. The mesoderm enables true coelom formation and organ complexity."
  },
  {
    icon: "🌀",
    title: "Coelom",
    text: "Acoelomate (no body cavity), Pseudocoelomate (false cavity), or Eucoelomate (true coelom lined by mesoderm). The coelom provides space for organ development and hydrostatic support."
  },
  {
    icon: "🔗",
    title: "Notochord & Nerve Cord",
    text: "The presence of a notochord (at any embryonic stage), dorsal hollow nerve cord, pharyngeal slits and post-anal tail defines the phylum Chordata — separating vertebrates from all invertebrates."
  },
];

// ── MAJOR PHYLA ───────────────────────────────────
const PHYLA_DATA = [
  {
    phylum: "Porifera",
    common: "Sponges",
    key: "Pore-bearing, sessile, acoelomate, no true tissues, filter feeders via choanocytes (collar cells), spicule skeleton.",
    example: "Sycon (canal sponge), Spongilla (freshwater sponge)",
    habitat: "Mostly marine",
  },
  {
    phylum: "Cnidaria",
    common: "Jellyfish, Corals, Hydra",
    key: "Diploblastic; radial symmetry; nematocysts (stinging cells) for prey capture; polymorphism (polyp + medusa stages).",
    example: "Hydra, Aurelia (moon jellyfish), Obelia",
    habitat: "Mostly marine, some freshwater",
  },
  {
    phylum: "Platyhelminthes",
    common: "Flatworms",
    key: "Triploblastic, acoelomate, dorsoventrally flattened; flame cells for excretion; no anus; many are parasitic.",
    example: "Taenia (tapeworm), Fasciola (liver fluke), Planaria",
    habitat: "Free-living (aquatic) or endoparasitic",
  },
  {
    phylum: "Nematoda",
    common: "Roundworms",
    key: "Pseudocoelomate; cylindrical; cuticle moulted 4×; hydrostatic skeleton; separate sexes; prominent in soil and parasitic niches.",
    example: "Ascaris lumbricoides, Wuchereria bancrofti (filarial worm)",
    habitat: "Ubiquitous — soil, water, parasitic",
  },
  {
    phylum: "Annelida",
    common: "Earthworms, Leeches, Polychaetes",
    key: "True coelom; metameric segmentation; closed circulatory system; setae for locomotion; nephridia for excretion.",
    example: "Lumbricus (earthworm), Hirudinaria (leech), Nereis",
    habitat: "Terrestrial, freshwater, marine",
  },
  {
    phylum: "Arthropoda",
    common: "Insects, Crustaceans, Arachnids",
    key: "Exoskeleton (chitin); jointed appendages; open circulatory system (haemocoel); Malpighian tubules; compound eyes; largest phylum (>80% of all animals).",
    example: "Periplaneta (cockroach), Apis (honeybee), Palaemon (prawn)",
    habitat: "All habitats",
  },
  {
    phylum: "Mollusca",
    common: "Snails, Clams, Octopus",
    key: "Soft body; mantle secretes calcareous shell; muscular foot; radula (file-like feeding organ); open or closed circulation.",
    example: "Pila (apple snail), Mytilus (mussel), Octopus vulgaris",
    habitat: "Marine, freshwater, terrestrial",
  },
  {
    phylum: "Echinodermata",
    common: "Starfish, Sea Urchins",
    key: "Pentamerous radial symmetry (adults); endoskeleton of ossicles; water vascular system (tube feet); deuterostome development; exclusively marine.",
    example: "Asterias (starfish), Echinus (sea urchin), Holothuria (sea cucumber)",
    habitat: "Exclusively marine",
  },
  {
    phylum: "Chordata",
    common: "Vertebrates + Relatives",
    key: "Notochord, dorsal hollow nerve cord, pharyngeal gill slits (embryonic), post-anal tail. Sub-phyla: Urochordata, Cephalochordata, Vertebrata.",
    example: "Channa punctata (fish), Rana (frog), Homo sapiens",
    habitat: "All habitats",
  },
];

// ── TAXONOMY LADDER ───────────────────────────────
const TAXON_RANKS = [
  { rank: "Domain", example: "Eukarya", note: "Highest rank; based on cellular organisation" },
  { rank: "Kingdom", example: "Animalia", note: "Mode of nutrition, cell type, body plan" },
  { rank: "Phylum", example: "Chordata", note: "Major body plan and symmetry" },
  { rank: "Class", example: "Actinopterygii", note: "Ray-finned fishes" },
  { rank: "Order", example: "Anabantiformes", note: "Shared structural and molecular features" },
  { rank: "Family", example: "Channidae", note: "Closer shared ancestry" },
  { rank: "Genus", example: "Channa", note: "Very closely related species" },
  { rank: "Species", example: "punctata", note: "Interbreeding natural population" },
];

// ── CLASSIFICATION HISTORY TIMELINE ──────────────
const CLASS_HISTORY = [
  {
    year: "1758",
    scientist: "Carl Linnaeus",
    system: "Two Kingdoms",
    detail: "Plantae and Animalia — the first formal hierarchical system with binomial nomenclature.",
  },
  {
    year: "1866",
    scientist: "Ernst Haeckel",
    system: "Three Kingdoms",
    detail: "Added Protista to accommodate unicellular organisms that did not fit plant or animal categories.",
  },
  {
    year: "1938",
    scientist: "Herbert Copeland",
    system: "Four Kingdoms",
    detail: "Separated Monera (prokaryotes) from Protista, recognising the prokaryote–eukaryote divide.",
  },
  {
    year: "1969",
    scientist: "Robert Whittaker",
    system: "Five Kingdoms",
    detail: "Added Fungi as a distinct kingdom based on absorptive heterotrophic nutrition and chitinous cell walls.",
  },
  {
    year: "1977–90",
    scientist: "Carl Woese & George Fox",
    system: "Six Kingdoms / Three Domains",
    detail: "rRNA sequencing revealed Archaebacteria are as different from Eubacteria as from eukaryotes, establishing Six Kingdoms and the three-Domain system (Bacteria, Archaea, Eukarya).",
  },
];
