/**
 * Process — Parcours immersif « De l'idée à la marque »
 * ─────────────────────────────────────────────────────
 * Scroll cinématographique : chaque étape occupe un écran,
 * révélée progressivement, avec ligne de progression + compteur.
 * Vanilla JS (IntersectionObserver + rAF), aucune dépendance.
 * Pour changer un média : remplacez simplement la clé `img` ci-dessous.
 */
(function () {
  'use strict';

  var section = document.getElementById('ideaBrand');
  if (!section) return;

  /* ── Données centralisées : une seule source pour toutes les étapes ── */
  var U = 'https://images.unsplash.com/photo-';
  var Q = '?auto=format&fit=crop&w=1100&q=75';
  var STEPS = [
    { num: '01', index: 'Brand Discovery',          title: 'Comprendre votre vision',            keywords: ['Brief', 'Objectifs', 'Analyse', 'Stratégie'],                              img: U + '1497366754035-f200968a6e72' + Q, alt: 'Brand Discovery — comprendre votre vision' },
    { num: '02', index: 'Brand Identity',           title: 'Créer votre identité',               keywords: ['Logo', 'Charte graphique', 'Univers', 'Brand Book'],                       img: U + '1467232004584-a241de8bcf5d' + Q, alt: 'Brand Identity — créer votre identité' },
    { num: '03', index: 'Creative Direction',       title: 'Définir la direction artistique',    keywords: ['Concept', 'Storytelling', 'Moodboard', 'Stylisme'],                        img: U + '1555212697-194d092e3b8f' + Q, alt: 'Creative Direction — définir la direction artistique' },
    { num: '04', index: 'Brand Photography',        title: 'Créer les visuels de votre marque',  keywords: ['Portraits', 'Produits', 'Lifestyle', 'Campagnes'],                         img: U + '1441986300917-64674bd600d8' + Q, alt: 'Brand Photography — créer les visuels de votre marque' },
    { num: '05', index: 'Video Production',         title: 'Donner vie à votre histoire',        keywords: ['Film de marque', 'Publicité', 'Interviews', 'Reels'],                      img: U + '1719368472026-dc26f70a9b76' + Q, alt: 'Video Production — donner vie à votre histoire' },
    { num: '06', index: 'Motion Design',            title: 'Animer votre communication',         keywords: ['Logo Reveal', 'Animations', 'Publicités', 'Contenus digitaux'],            img: U + '1729086046027-09979ade13fd' + Q, alt: 'Motion Design — animer votre communication' },
    { num: '07', index: 'Studio Podcast',           title: 'Donner une voix à votre marque',     keywords: ['Podcast', 'Interviews', 'Captation', 'Diffusion'],                         img: U + '1478737270239-2f02b77fc618' + Q, alt: 'Studio Podcast — donner une voix à votre marque' },
    { num: '08', index: 'Web Design',               title: 'Créer votre présence digitale',      keywords: ['UX/UI', 'Site internet', 'Responsive', 'SEO'],                             img: U + '1556761175-5973dc0f32e7' + Q, alt: 'Web Design — créer votre présence digitale' },
    { num: '09', index: 'Social Media Management',  title: 'Développer votre visibilité',        keywords: ['Stratégie', 'Création de contenus', 'Publication', 'Community Management'], img: U + '1510812431401-41d2bd2722f3' + Q, alt: 'Social Media Management — développer votre visibilité' },
    { num: '10', index: 'Event Experience',         title: 'Faire vivre votre marque',           keywords: ['Lancement', 'Pop-up', 'Événements', 'Expériences immersives'],              img: U + '1540575467063-178a50c2df87' + Q, alt: 'Event Experience — faire vivre votre marque' },
    { num: '11', index: 'Brand Evolution',          title: 'Faire grandir votre marque',         keywords: ['Suivi', 'Optimisation', 'Nouveaux contenus', 'Évolution'],                 img: U + '1586023492125-27b2c045efd7' + Q, alt: 'Brand Evolution — faire grandir votre marque' }
  ];

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stepsWrap = document.getElementById('ibSteps');
  var counter   = document.getElementById('ibCurrent');
  var fill      = document.getElementById('ibFill');
  var rail      = document.getElementById('ibProgress');

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function pad(n) { return ('0' + n).slice(-2); }

  /* ── Génération du DOM depuis les données ── */
  STEPS.forEach(function (s) {
    var art = document.createElement('article');
    art.className = 'ib-step';

    /* Titre révélé mot par mot, avec léger décalage progressif */
    var words = s.title.split(' ').map(function (w, i) {
      var delay = (0.1 + i * 0.07).toFixed(2);
      return '<span class="ib-word"><span style="transition-delay:' + delay + 's">' + esc(w) + '</span></span>';
    }).join(' ');

    var keys = s.keywords.map(function (k) { return '<span>' + esc(k) + '</span>'; }).join('');

    art.innerHTML =
      '<div class="ib-step__media"><img src="' + s.img + '" alt="' + esc(s.alt) + '" loading="lazy"></div>' +
      '<div class="ib-step__content">' +
        '<span class="ib-step__ghost" aria-hidden="true">' + s.num + '</span>' +
        '<span class="ib-step__index">' + s.num + ' — ' + esc(s.index) + '</span>' +
        '<h3 class="ib-step__title">' + words + '</h3>' +
        '<div class="ib-step__keywords">' + keys + '</div>' +
      '</div>';

    stepsWrap.appendChild(art);
  });

  var steps = Array.prototype.slice.call(stepsWrap.querySelectorAll('.ib-step'));

  /* ── Révélation à l'entrée (persistante, donc toujours accessible) ── */
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) en.target.classList.add('is-active'); });
    }, { threshold: reduce ? 0.05 : 0.35 });
    steps.forEach(function (s) { revealIO.observe(s); });

    /* Affiche la ligne de progression uniquement dans la section */
    var railIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { rail.classList.toggle('visible', en.isIntersecting); });
    }, { threshold: 0.02 });
    railIO.observe(section);
  } else {
    steps.forEach(function (s) { s.classList.add('is-active'); });
    rail.classList.add('visible');
  }

  /* ── Scroll : remplissage de la barre, compteur, parallaxe légère ── */
  var ticking = false;
  function update() {
    var vh = window.innerHeight;
    var rect = section.getBoundingClientRect();
    var total = section.offsetHeight - vh;
    var scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    fill.style.transform = 'scaleY(' + (scrolled / Math.max(total, 1)).toFixed(4) + ')';

    /* Étape la plus centrée → numéro actif + parallaxe */
    var vc = vh / 2, best = 0, bestDist = Infinity;
    for (var i = 0; i < steps.length; i++) {
      var r = steps[i].getBoundingClientRect();
      var c = r.top + r.height / 2;
      var d = Math.abs(c - vc);
      if (d < bestDist) { bestDist = d; best = i; }

      if (!reduce && r.bottom > 0 && r.top < vh) {
        var media = steps[i].querySelector('.ib-step__media');
        if (media) {
          var off = (c - vc) / vh;              /* -0.5 .. 0.5 */
          media.style.transform = 'translateY(' + (off * -34).toFixed(1) + 'px)';
        }
      }
    }
    counter.textContent = pad(best + 1);
    ticking = false;
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
