/* =========================================================
   BRAND STUDIO 360° — Configurateur de devis
   Estimation en temps réel · 6 services
   Tarifs calibrés sur la fourchette CHF 500 – 5'000
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Icônes ---------- */
  const I = {
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"/><path d="M19 11a7 7 0 0 1-14 0M12 18v3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m21 8-9-5-9 5 9 5 9-5Zm0 0v8l-9 5-9-5V8"/><path d="m12 13v8"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>',
    cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.4"/><path d="M8 6l1.5-2h5L16 6"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m12 2 2.9 6.3 6.8.8-5 4.6 1.3 6.8L12 18l-6 3.5 1.3-6.8-5-4.6 6.8-.8Z"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 19h8M16 4l4 4L7 21l-4 1 1-4Z"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m3 11 9-8 9 8M5 9v11h14V9"/></svg>',
    sofa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M3 11a2 2 0 0 1 4 0v3h10v-3a2 2 0 0 1 4 0v6H3Zm2 6v2m14-2v2"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L22 7H6"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3.7 10.7c.7.6 1.2 1.4 1.4 2.3h4.6c.2-.9.7-1.7 1.4-2.3A6 6 0 0 0 12 2Z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 10.7 7.4-4.3M8.3 13.3l7.4 4.3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="#16140f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>',
  };

  /* ---------- Définition des services ---------- */
  const SERVICES = {
    "web-design": {
      label: "Web Design", icon: I.monitor,
      steps: [
        { key: "type", title: "Quel type de site ?", hint: "Choisissez le format qui correspond le mieux à votre projet.", kind: "cards", options: [
          { id: "landing", label: "Landing page", icon: I.layout, base: 500 },
          { id: "vitrine", label: "Site vitrine", icon: I.monitor, base: 1200 },
          { id: "ecommerce", label: "Site e-commerce", icon: I.cart, base: 2500 },
          { id: "appli", label: "Application web", icon: I.grid, base: 3500 },
        ]},
        { key: "objectif", title: "Quel est votre objectif principal ?", hint: "Cela nous aide à orienter la conception.", kind: "radio", options: [
          { id: "presenter", label: "Présenter mon activité", add: 0 },
          { id: "vendre", label: "Vendre en ligne", add: 400 },
          { id: "leads", label: "Générer des leads", add: 250 },
          { id: "refonte", label: "Refonte complète", add: 300 },
        ]},
        { key: "precisions", title: "Précisez votre projet", hint: "Ces informations affinent l'estimation.", kind: "precisions",
          slider: { name: "Nombre de pages", min: 1, max: 20, step: 1, def: 5, unit: "pages", perUnit: 50 },
          groups: [
            { name: "Fonctionnalités", multiple: true, options: [
              { id: "blog", label: "Blog", add: 200 }, { id: "multi", label: "Multilingue", add: 300 },
              { id: "rdv", label: "Réservation / RDV", add: 350 }, { id: "membre", label: "Espace membre", add: 450 },
              { id: "seo", label: "SEO avancé", add: 250 },
            ]},
          ]},
        { key: "options", title: "Options supplémentaires", hint: "Affinez votre projet avec des prestations complémentaires.", kind: "toggles", options: [
          { id: "redac", label: "Rédaction des contenus", add: 300 },
          { id: "host", label: "Hébergement & maintenance (1 an)", add: 400 },
          { id: "formation", label: "Formation à l'outil", add: 150 },
          { id: "ident", label: "Identité visuelle légère", add: 300 },
        ]},
      ],
    },

    "brand-identity": {
      label: "Brand Identity", icon: I.star,
      steps: [
        { key: "type", title: "Quel type d'identité ?", hint: "Choisissez le périmètre de création.", kind: "cards", options: [
          { id: "logo", label: "Logo seul", icon: I.pen, base: 500 },
          { id: "charte", label: "Charte + déclinaisons", icon: I.grid, base: 1000 },
          { id: "complete", label: "Identité complète", icon: I.star, base: 1800 },
          { id: "refonte", label: "Refonte de marque", icon: I.bulb, base: 2500 },
        ]},
        { key: "objectif", title: "Quel est votre objectif principal ?", hint: "Cela oriente la direction artistique.", kind: "radio", options: [
          { id: "lancer", label: "Lancer mon entreprise", add: 0 },
          { id: "moderniser", label: "Moderniser mon image", add: 300 },
          { id: "demarquer", label: "Me démarquer de la concurrence", add: 200 },
          { id: "structurer", label: "Structurer ma marque", add: 350 },
        ]},
        { key: "precisions", title: "Précisez votre projet", hint: "Ces informations affinent l'estimation.", kind: "precisions",
          slider: { name: "Pistes créatives", min: 1, max: 5, step: 1, def: 2, unit: "pistes", perUnit: 150 },
          groups: [
            { name: "Livrables", multiple: true, options: [
              { id: "cg", label: "Charte graphique", add: 400 }, { id: "papeterie", label: "Papeterie", add: 250 },
              { id: "templates", label: "Templates réseaux", add: 300 }, { id: "signal", label: "Signalétique", add: 350 },
              { id: "guide", label: "Guidelines de marque", add: 450 },
            ]},
          ]},
        { key: "options", title: "Options supplémentaires", hint: "Affinez votre projet avec des prestations complémentaires.", kind: "toggles", options: [
          { id: "naming", label: "Naming / nom de marque", add: 500 },
          { id: "book", label: "Brand book imprimé", add: 300 },
          { id: "pack", label: "Déclinaison packaging", add: 500 },
          { id: "strat", label: "Accompagnement stratégique", add: 400 },
        ]},
      ],
    },

    "video-production": {
      label: "Video Production", icon: I.cam,
      steps: [
        { key: "type", title: "Quel type de vidéo ?", hint: "Choisissez le format qui correspond le mieux à votre projet.", kind: "cards", options: [
          { id: "social", label: "Réseaux sociaux", icon: I.cam, base: 600 },
          { id: "interview", label: "Interview", icon: I.mic, base: 900 },
          { id: "temoignage", label: "Témoignage client", icon: I.chat, base: 1100 },
          { id: "produit", label: "Vidéo produit", icon: I.box, base: 1300 },
          { id: "corporate", label: "Vidéo corporate", icon: I.monitor, base: 1400 },
          { id: "event", label: "Événement d'entreprise", icon: I.cal, base: 1800 },
        ]},
        { key: "objectif", title: "Quel est votre objectif principal ?", hint: "Cela nous aide à orienter la création vers ce qui compte vraiment pour vous.", kind: "radio", options: [
          { id: "presenter", label: "Présenter mon entreprise", add: 0 },
          { id: "talents", label: "Attirer des talents", add: 200 },
          { id: "investisseurs", label: "Convaincre des investisseurs", add: 300 },
          { id: "image", label: "Renforcer mon image de marque", add: 250 },
        ]},
        { key: "precisions", title: "Précisez votre projet", hint: "Ces informations nous permettent de vous proposer une estimation précise.", kind: "precisions",
          slider: { name: "Durée vidéo finale", min: 1, max: 15, step: 1, def: 5, unit: "min", perUnit: 30 },
          groups: [
            { name: "Durée du tournage", multiple: false, options: [
              { id: "heures", label: "Quelques heures (2-3h)", add: 0 }, { id: "demi", label: "Demi-journée (4h)", add: 300 },
              { id: "journee", label: "Journée complète (8h)", add: 600 }, { id: "plusieurs", label: "Plusieurs jours", add: 1200 },
            ]},
            { name: "Date estimée du projet", multiple: false, options: [
              { id: "moins1", label: "Moins d'un mois", add: 200 }, { id: "1a3", label: "1 à 3 mois", add: 0 },
              { id: "3a6", label: "3 à 6 mois", add: 0 }, { id: "flex", label: "Date flexible", add: 0 },
            ]},
          ]},
        { key: "options", title: "Options supplémentaires", hint: "Affinez votre projet avec des prestations complémentaires.", kind: "toggles", options: [
          { id: "deplacement", label: "Déplacement hors canton", add: 150 },
          { id: "drone", label: "Drone", add: 200 },
          { id: "cameraman", label: "Caméraman supplémentaire", add: 300 },
          { id: "soustitres", label: "Sous-titres", add: 75 },
          { id: "motion", label: "Motion design / animations", add: 300 },
        ]},
      ],
    },

    "brand-photography": {
      label: "Brand Photography", icon: I.cam,
      steps: [
        { key: "type", title: "Quel type de photographie ?", hint: "Choisissez le format qui correspond le mieux à votre projet.", kind: "cards", options: [
          { id: "portraits", label: "Portraits corporate", icon: I.cam, base: 500 },
          { id: "produits", label: "Photos produits", icon: I.box, base: 700 },
          { id: "lifestyle", label: "Lifestyle / ambiance", icon: I.star, base: 800 },
          { id: "reportage", label: "Reportage d'entreprise", icon: I.grid, base: 900 },
          { id: "archi", label: "Architecture / intérieur", icon: I.home, base: 1000 },
        ]},
        { key: "objectif", title: "À quoi serviront ces visuels ?", hint: "Cela oriente le style et le cadrage.", kind: "radio", options: [
          { id: "site", label: "Alimenter mon site web", add: 0 },
          { id: "social", label: "Mes réseaux sociaux", add: 150 },
          { id: "catalogue", label: "Un catalogue / une brochure", add: 250 },
          { id: "campagne", label: "Une campagne publicitaire", add: 400 },
        ]},
        { key: "precisions", title: "Précisez votre projet", hint: "Ces informations affinent l'estimation.", kind: "precisions",
          slider: { name: "Visuels retouchés", min: 5, max: 60, step: 5, def: 15, unit: "visuels", perUnit: 15 },
          groups: [
            { name: "Durée de la séance", multiple: false, options: [
              { id: "court", label: "1 à 2 heures", add: 0 }, { id: "demi", label: "Demi-journée", add: 250 }, { id: "journee", label: "Journée complète", add: 450 },
            ]},
            { name: "Lieux", multiple: true, options: [
              { id: "studio", label: "Studio", add: 0 }, { id: "site", label: "Sur site", add: 150 }, { id: "exterieur", label: "Extérieur", add: 200 },
            ]},
          ]},
        { key: "options", title: "Options supplémentaires", hint: "Affinez votre projet avec des prestations complémentaires.", kind: "toggles", options: [
          { id: "maquillage", label: "Maquillage / stylisme", add: 250 },
          { id: "studio", label: "Location de studio", add: 250 },
          { id: "retouche", label: "Retouche avancée", add: 150 },
          { id: "droits", label: "Cession de droits étendue", add: 350 },
        ]},
      ],
    },

    "social-media": {
      label: "Social Media Management", icon: I.share,
      steps: [
        { key: "type", title: "Quel accompagnement ?", hint: "Choisissez le format qui correspond le mieux à votre projet.", kind: "cards", options: [
          { id: "gestion", label: "Gestion mensuelle", icon: I.share, base: 600 },
          { id: "community", label: "Community management", icon: I.chat, base: 700 },
          { id: "contenu", label: "Création de contenu", icon: I.cam, base: 900 },
          { id: "campagne", label: "Campagne ponctuelle", icon: I.star, base: 1000 },
          { id: "strategie", label: "Stratégie éditoriale", icon: I.bulb, base: 1200 },
        ]},
        { key: "objectif", title: "Quel est votre objectif principal ?", hint: "Cela oriente la ligne éditoriale.", kind: "radio", options: [
          { id: "visibilite", label: "Gagner en visibilité", add: 0 },
          { id: "communaute", label: "Développer ma communauté", add: 200 },
          { id: "ventes", label: "Générer des ventes", add: 350 },
          { id: "lancement", label: "Lancer un produit", add: 250 },
        ]},
        { key: "precisions", title: "Précisez votre projet", hint: "Ces informations affinent l'estimation.", kind: "precisions",
          slider: { name: "Publications / mois", min: 4, max: 30, step: 1, def: 12, unit: "/ mois", perUnit: 35 },
          groups: [
            { name: "Plateformes", multiple: false, options: [
              { id: "p1", label: "1 plateforme", add: 0 }, { id: "p2", label: "2 plateformes", add: 250 }, { id: "p3", label: "3 plateformes ou +", add: 500 },
            ]},
            { name: "Formats", multiple: true, options: [
              { id: "posts", label: "Posts", add: 0 }, { id: "stories", label: "Stories", add: 150 },
              { id: "reels", label: "Reels / vidéos", add: 350 }, { id: "carrousels", label: "Carrousels", add: 200 },
            ]},
          ]},
        { key: "options", title: "Options supplémentaires", hint: "Affinez votre projet avec des prestations complémentaires.", kind: "toggles", options: [
          { id: "shooting", label: "Shooting photo mensuel", add: 400 },
          { id: "ads", label: "Publicités payantes (gestion)", add: 350 },
          { id: "reporting", label: "Reporting & analytics", add: 200 },
          { id: "redac", label: "Rédaction des légendes", add: 200 },
        ]},
      ],
    },

    "animation-produit": {
      label: "Animation Produit", icon: I.bulb,
      steps: [
        { key: "type", title: "Quel type d'animation ?", hint: "Choisissez le format qui correspond le mieux à votre produit.", kind: "cards", options: [
          { id: "motion", label: "Motion design", icon: I.bulb, base: 800 },
          { id: "produit3d", label: "Vidéo produit 3D", icon: I.box, base: 1200 },
          { id: "packshot", label: "Packshot animé", icon: I.cam, base: 1000 },
          { id: "360", label: "Vue 360° interactive", icon: I.grid, base: 1500 },
        ]},
        { key: "objectif", title: "Quel est votre objectif principal ?", hint: "Cela oriente la direction artistique et le style d'animation.", kind: "radio", options: [
          { id: "web", label: "Publication web & réseaux sociaux", add: 0 },
          { id: "campagne", label: "Campagne publicitaire", add: 300 },
          { id: "showcase", label: "Présentation produit premium", add: 400 },
          { id: "ecom", label: "E-commerce / fiche produit", add: 200 },
        ]},
        { key: "precisions", title: "Précisez votre projet", hint: "Ces informations affinent l'estimation.", kind: "precisions",
          slider: { name: "Durée de l'animation", min: 5, max: 60, step: 5, def: 15, unit: "sec", perUnit: 25 },
          groups: [
            { name: "Formats de livraison", multiple: true, options: [
              { id: "mp4", label: "MP4 / Web", add: 0 },
              { id: "social", label: "Format réseaux sociaux", add: 150 },
              { id: "4k", label: "4K / haute résolution", add: 300 },
              { id: "loop", label: "Loop / GIF", add: 100 },
            ]},
          ]},
        { key: "options", title: "Options supplémentaires", hint: "Affinez votre projet avec des prestations complémentaires.", kind: "toggles", options: [
          { id: "son", label: "Création sonore / sound design", add: 250 },
          { id: "voix", label: "Voix-off", add: 300 },
          { id: "color", label: "Étalonnage premium", add: 200 },
          { id: "decli", label: "Déclinaisons supplémentaires (×3)", add: 400 },
        ]},
      ],
    },

    "interior-design": {
      label: "Interior Design & Concept", icon: I.sofa,
      steps: [
        { key: "type", title: "Quel type de projet ?", hint: "Choisissez le format qui correspond le mieux à votre projet.", kind: "cards", options: [
          { id: "conseil", label: "Conseil & moodboard", icon: I.bulb, base: 800 },
          { id: "staging", label: "Home staging", icon: I.grid, base: 1200 },
          { id: "concept", label: "Design de concept", icon: I.star, base: 2000 },
          { id: "amenagement", label: "Aménagement complet", icon: I.sofa, base: 3000 },
          { id: "commercial", label: "Espace commercial", icon: I.home, base: 3500 },
        ]},
        { key: "objectif", title: "Quel est votre objectif principal ?", hint: "Cela oriente le concept.", kind: "radio", options: [
          { id: "ouvrir", label: "Ouvrir un commerce", add: 0 },
          { id: "renover", label: "Rénover un espace", add: 400 },
          { id: "ambiance", label: "Créer une ambiance de marque", add: 300 },
          { id: "optimiser", label: "Optimiser l'espace", add: 250 },
        ]},
        { key: "precisions", title: "Précisez votre projet", hint: "Ces informations affinent l'estimation.", kind: "precisions",
          slider: { name: "Surface", min: 10, max: 300, step: 10, def: 60, unit: "m²", perUnit: 10 },
          groups: [
            { name: "Type d'espace", multiple: false, options: [
              { id: "bureau", label: "Bureau", add: 0 }, { id: "retail", label: "Commerce / Retail", add: 350 },
              { id: "resto", label: "Restaurant / Café", add: 500 }, { id: "resid", label: "Résidentiel", add: 200 },
            ]},
          ]},
        { key: "options", title: "Options supplémentaires", hint: "Affinez votre projet avec des prestations complémentaires.", kind: "toggles", options: [
          { id: "3d", label: "Plans 3D / rendus", add: 500 },
          { id: "chantier", label: "Suivi de chantier", add: 700 },
          { id: "mobilier", label: "Sélection mobilier", add: 400 },
          { id: "branding", label: "Signalétique & branding espace", add: 500 },
        ]},
      ],
    },
  };

  /* ---------- Éléments ---------- */
  const root = document.getElementById("cfg-root");
  if (!root) return;

  let serviceKey = null;
  let service = null;
  let stepIndex = 0; // 0..steps.length (last = result)
  const state = { type: null, objectif: null, slider: 0, groups: {}, options: new Set() };

  const fmt = (n) => n.toLocaleString("fr-CH").replace(/ |\s/g, "'");

  /* ---------- Calcul du prix ---------- */
  function computePrice() {
    if (!state.type) return 0;
    let total = state.type.base;
    if (state.objectif) total += state.objectif.add;
    const prec = service.steps.find((s) => s.kind === "precisions");
    if (prec) {
      total += state.slider * prec.slider.perUnit;
      prec.groups.forEach((g) => {
        const sel = state.groups[g.name];
        if (!sel) return;
        if (g.multiple) sel.forEach((id) => { total += (g.options.find((o) => o.id === id) || {}).add || 0; });
        else { const o = g.options.find((x) => x.id === sel); if (o) total += o.add; }
      });
    }
    const opt = service.steps.find((s) => s.kind === "toggles");
    if (opt) state.options.forEach((id) => { total += (opt.options.find((o) => o.id === id) || {}).add || 0; });
    return Math.round(total / 10) * 10;
  }

  /* ---------- Vue : sélection de service ---------- */
  function renderPicker() {
    const cards = Object.entries(SERVICES).map(([key, s]) =>
      `<button class="svc-pick" data-svc="${key}">
        ${s.icon}<h3>${s.label}</h3>
        <span>Estimer mon projet →</span>
      </button>`
    ).join("");
    root.innerHTML =
      `<div class="cfg-layout">
        <div class="cfg-head">
          <span class="eyebrow">Configurateur de devis</span>
          <h1>Estimez votre projet <b>en 5 étapes</b></h1>
          <p class="hint" style="max-width:52ch;color:var(--text-soft)">Sélectionnez un service pour démarrer. L'estimation s'affiche en temps réel, sans engagement.</p>
        </div>
        <div class="svc-picker">${cards}</div>
      </div>`;
    root.querySelectorAll(".svc-pick").forEach((b) =>
      b.addEventListener("click", () => start(b.dataset.svc))
    );
  }

  /* ---------- Démarrage d'un service ---------- */
  function start(key) {
    serviceKey = key;
    service = SERVICES[key];
    stepIndex = 0;
    state.type = null; state.objectif = null; state.options = new Set(); state.groups = {};
    const prec = service.steps.find((s) => s.kind === "precisions");
    state.slider = prec ? prec.slider.def : 0;
    renderConfigurator();
  }

  /* ---------- Vue : configurateur ---------- */
  function renderConfigurator() {
    root.innerHTML =
      `<div class="cfg-layout">
        <div class="cfg-head">
          <span class="eyebrow">Estimez votre projet</span>
          <h1><b>${service.label}</b></h1>
        </div>
        <div class="stepper" id="stepper"></div>
        <div class="price-banner" id="priceBanner" hidden>
          <span class="label">Estimation en temps réel</span>
          <span class="val"><span class="cur">CHF</span><span id="livePrice">—</span></span>
        </div>
        <div id="stepHost"></div>
        <div class="cfg-nav">
          <button class="btn-back" id="btnBack">← Retour</button>
          <button class="btn btn--dark" id="btnNext">Continuer <span class="arrow">→</span></button>
        </div>
      </div>`;
    document.getElementById("btnNext").addEventListener("click", next);
    document.getElementById("btnBack").addEventListener("click", back);
    renderStep();
  }

  function renderStepper() {
    const host = document.getElementById("stepper");
    let html = "";
    for (let i = 0; i < 5; i++) {
      const cls = i < stepIndex ? "done" : i === stepIndex ? "active" : "";
      html += `<div class="stepper__node ${cls}">${i < stepIndex ? "✓" : i + 1}</div>`;
      if (i < 4) html += `<div class="stepper__bar ${i < stepIndex ? "fill" : ""}"></div>`;
    }
    host.innerHTML = html;
  }

  function updatePrice() {
    const banner = document.getElementById("priceBanner");
    const el = document.getElementById("livePrice");
    if (!banner || !el) return;
    if (state.type && stepIndex > 0) {
      banner.hidden = false;
      el.textContent = fmt(computePrice());
    } else {
      banner.hidden = true;
    }
  }

  /* ---------- Rendu d'une étape ---------- */
  function renderStep() {
    renderStepper();
    const host = document.getElementById("stepHost");
    const btnNext = document.getElementById("btnNext");
    const btnBack = document.getElementById("btnBack");
    btnBack.disabled = stepIndex === 0;
    btnNext.style.display = "";

    if (stepIndex < service.steps.length) {
      const step = service.steps[stepIndex];
      btnNext.firstChild.textContent = stepIndex === service.steps.length - 1 ? "Voir le résultat " : "Continuer ";
      host.innerHTML = `<div class="step active"><h2>${step.title}</h2><p class="hint">${step.hint}</p><div id="stepBody"></div></div>`;
      const body = document.getElementById("stepBody");
      if (step.kind === "cards") renderCards(body, step);
      else if (step.kind === "radio") renderRadio(body, step);
      else if (step.kind === "precisions") renderPrecisions(body, step);
      else if (step.kind === "toggles") renderToggles(body, step);
    } else {
      renderResult(host);
    }
    updatePrice();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ----- Cards (type) ----- */
  function renderCards(body, step) {
    body.innerHTML = `<div class="opt-grid">${step.options.map((o) =>
      `<button class="opt-card ${state.type && state.type.id === o.id ? "selected" : ""}" data-id="${o.id}">
        ${o.icon}<span>${o.label}</span><small>dès CHF ${fmt(o.base)}</small>
      </button>`).join("")}</div>`;
    body.querySelectorAll(".opt-card").forEach((c) =>
      c.addEventListener("click", () => {
        const o = step.options.find((x) => x.id === c.dataset.id);
        state.type = { id: o.id, label: o.label, base: o.base };
        body.querySelectorAll(".opt-card").forEach((x) => x.classList.remove("selected"));
        c.classList.add("selected");
        updatePrice();
      })
    );
  }

  /* ----- Radio (objectif) ----- */
  function renderRadio(body, step) {
    body.innerHTML = `<div class="radio-list">${step.options.map((o) =>
      `<button class="radio-item ${state.objectif && state.objectif.id === o.id ? "selected" : ""}" data-id="${o.id}">
        <span class="dot"></span><span>${o.label}</span>
      </button>`).join("")}</div>`;
    body.querySelectorAll(".radio-item").forEach((it) =>
      it.addEventListener("click", () => {
        const o = step.options.find((x) => x.id === it.dataset.id);
        state.objectif = { id: o.id, label: o.label, add: o.add };
        body.querySelectorAll(".radio-item").forEach((x) => x.classList.remove("selected"));
        it.classList.add("selected");
        updatePrice();
      })
    );
  }

  /* ----- Précisions (slider + chip groups) ----- */
  function renderPrecisions(body, step) {
    const sl = step.slider;
    let html =
      `<div class="slider-block">
        <div class="slabel"><span class="sname">${sl.name}</span>
          <span class="sval"><span id="slVal">${state.slider}</span><small>${sl.unit}</small></span></div>
        <input type="range" id="slider" min="${sl.min}" max="${sl.max}" step="${sl.step}" value="${state.slider}">
        <div class="slider-ends"><span>${sl.min} ${sl.unit}</span><span>${sl.max} ${sl.unit}</span></div>
      </div>`;
    step.groups.forEach((g, gi) => {
      const sel = state.groups[g.name];
      html += `<div class="chip-label">${g.name}</div><div class="chip-group" data-gi="${gi}">` +
        g.options.map((o) => {
          const active = g.multiple ? (sel && sel.has(o.id)) : sel === o.id;
          return `<button class="chip ${active ? "selected" : ""}" data-id="${o.id}">${o.label}</button>`;
        }).join("") + `</div>`;
    });
    body.innerHTML = html;

    const slider = document.getElementById("slider");
    slider.addEventListener("input", () => {
      state.slider = parseInt(slider.value, 10);
      document.getElementById("slVal").textContent = state.slider;
      updatePrice();
    });
    body.querySelectorAll(".chip-group").forEach((grp) => {
      const g = step.groups[parseInt(grp.dataset.gi, 10)];
      grp.querySelectorAll(".chip").forEach((chip) =>
        chip.addEventListener("click", () => {
          if (g.multiple) {
            if (!state.groups[g.name]) state.groups[g.name] = new Set();
            const set = state.groups[g.name];
            if (set.has(chip.dataset.id)) { set.delete(chip.dataset.id); chip.classList.remove("selected"); }
            else { set.add(chip.dataset.id); chip.classList.add("selected"); }
          } else {
            state.groups[g.name] = chip.dataset.id;
            grp.querySelectorAll(".chip").forEach((x) => x.classList.remove("selected"));
            chip.classList.add("selected");
          }
          updatePrice();
        })
      );
    });
  }

  /* ----- Toggles (options) ----- */
  function renderToggles(body, step) {
    body.innerHTML = `<div class="toggle-list">${step.options.map((o) =>
      `<button class="toggle-item ${state.options.has(o.id) ? "on" : ""}" data-id="${o.id}">
        <span class="ti-text"><b>${o.label}</b><small>+ CHF ${fmt(o.add)}</small></span>
        <span class="switch"></span>
      </button>`).join("")}</div>`;
    body.querySelectorAll(".toggle-item").forEach((it) =>
      it.addEventListener("click", () => {
        const id = it.dataset.id;
        if (state.options.has(id)) state.options.delete(id); else state.options.add(id);
        it.classList.toggle("on");
        updatePrice();
      })
    );
  }

  /* ----- Résultat + coordonnées ----- */
  function renderResult(host) {
    document.getElementById("btnNext").style.display = "none";
    const price = computePrice();
    const rows = [];
    rows.push(["Service", service.label]);
    if (state.type) rows.push([service.steps[0].title.replace(/\s*\?$/, ""), state.type.label]);
    if (state.objectif) rows.push(["Objectif", state.objectif.label]);
    const prec = service.steps.find((s) => s.kind === "precisions");
    if (prec) {
      rows.push([prec.slider.name, state.slider + " " + prec.slider.unit]);
      prec.groups.forEach((g) => {
        const sel = state.groups[g.name];
        if (!sel) return;
        let txt;
        if (g.multiple) txt = [...sel].map((id) => g.options.find((o) => o.id === id).label).join(", ");
        else txt = (g.options.find((o) => o.id === sel) || {}).label;
        if (txt) rows.push([g.name, txt]);
      });
    }
    if (state.options.size) {
      const opt = service.steps.find((s) => s.kind === "toggles");
      rows.push(["Options", [...state.options].map((id) => opt.options.find((o) => o.id === id).label).join(", ")]);
    }

    host.innerHTML =
      `<div class="step active">
        <div class="result-hero">
          <div class="label">Estimation de votre projet</div>
          <div class="big"><span class="cur">CHF</span>${fmt(price)}</div>
          <div class="note">Estimation indicative, arrondie à la dizaine.</div>
        </div>
        <div class="recap">
          <h3>Récapitulatif</h3>
          ${rows.map((r) => `<div class="recap-row"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join("")}
        </div>
        <p class="disclaimer">Chaque projet est unique : ce prix est une estimation basée sur vos paramètres. Laissez-nous vos coordonnées pour un devis précis et personnalisé.</p>
        <form id="cfgForm">
          <div class="field-row">
            <div class="field"><label>Prénom *</label><input type="text" name="prenom" required></div>
            <div class="field"><label>Email *</label><input type="email" name="email" required></div>
          </div>
          <div class="field"><label>Message (optionnel)</label><textarea name="message" placeholder="Parlez-nous de votre projet…"></textarea></div>
          <button type="submit" class="btn btn--dark btn--block">Recevoir mon devis personnalisé <span class="arrow">→</span></button>
        </form>
      </div>`;

    document.getElementById("cfgForm").addEventListener("submit", (e) => {
      e.preventDefault();
      host.innerHTML =
        `<div class="cfg-success">
          <div class="check">${I.check}</div>
          <h2>Merci, votre demande est partie.</h2>
          <p>Nous revenons vers vous sous 48 h avec un devis précis pour votre projet <b>${service.label}</b> (estimation : CHF ${fmt(price)}).</p>
          <div style="margin-top:2rem"><a class="btn btn--ghost" href="index.html">Retour à l'accueil</a></div>
        </div>`;
      document.querySelector(".cfg-nav").style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Navigation ---------- */
  function next() {
    const step = service.steps[stepIndex];
    if (step) {
      if (step.kind === "cards" && !state.type) { shake(); return; }
      if (step.kind === "radio" && !state.objectif) { shake(); return; }
    }
    if (stepIndex < service.steps.length) { stepIndex++; renderStep(); }
  }
  function back() {
    if (stepIndex > 0) { stepIndex--; renderStep(); }
    else renderPicker();
  }
  function shake() {
    const b = document.getElementById("stepBody");
    if (!b) return;
    b.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }],
      { duration: 320, easing: "ease-in-out" }
    );
  }

  /* ---------- Init (gère ?service=) ---------- */
  const params = new URLSearchParams(location.search);
  const pre = params.get("service");
  if (pre && SERVICES[pre]) start(pre); else renderPicker();
})();
