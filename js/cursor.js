/**
 * Brand Studio 360° — Curseur cercle premium
 * ─────────────────────────────────────────────
 * Cercle #EBCD0A 11 px, GSAP lerp 0.15, 60 FPS
 * États : default → link → image → button
 * Micro-interaction : respiration idle toutes les 3 s
 * Désactivé automatiquement sur mobile / touch
 */
(function () {
  'use strict';

  /* ── Touch → curseur natif ── */
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  /* ── Constantes ── */
  var COLOR = '#EBCD0A';
  var LERP  = 0.15;

  var SZ = {
    def    : 11,   /* défaut  */
    link   : 16,   /* lien    */
    image  : 18,   /* image   */
    button : 20,   /* bouton  */
  };

  /* ── Charge GSAP si absent ── */
  function withGSAP(cb) {
    if (window.gsap) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  withGSAP(function () {

    /* ── Supprime le curseur natif sur tout le site ── */
    var styleEl = document.createElement('style');
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleEl);

    /* ══════════════════════════════════════════════
       Construction du DOM
    ══════════════════════════════════════════════ */

    /* Cercle principal */
    var dot = document.createElement('div');
    dot.setAttribute('aria-hidden', 'true');
    dot.style.cssText = [
      'position:fixed',
      'top:0', 'left:0',
      'width:'  + SZ.def + 'px',
      'height:' + SZ.def + 'px',
      'background:' + COLOR,
      'border-radius:50%',
      'opacity:0',                 /* invisible au départ   */
      'border:0px solid ' + COLOR, /* activé en état image  */
      'box-sizing:border-box',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'pointer-events:none',
      'z-index:999999',
      'will-change:transform',
    ].join(';');

    /* Libellé "VIEW" (état image cliquable) */
    var lbl = document.createElement('span');
    lbl.textContent = 'VIEW';
    lbl.style.cssText = [
      'font-family:Inter,Helvetica,Arial,sans-serif',
      'font-size:10px',
      'font-weight:300',
      'color:#fff',
      'letter-spacing:0.12em',
      'opacity:0',
      'pointer-events:none',
      'user-select:none',
      'white-space:nowrap',
      'line-height:1',
    ].join(';');

    dot.appendChild(lbl);
    document.body.appendChild(dot);

    /* Centrage permanent via GSAP (ne jamais toucher xPercent/yPercent après) */
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    /* ══════════════════════════════════════════════
       Suivi de la souris
    ══════════════════════════════════════════════ */
    var mx = -999, my = -999;
    var px = -999, py = -999;
    var visible = false;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        /* Première apparition */
        gsap.to(dot, { opacity: 0.9, duration: 0.5, ease: 'power2.out' });
        visible = true;
      }

      resetBreathing();
    });

    /* ── Boucle lerp 60 FPS ── */
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(function () {
      px += (mx - px) * LERP;
      py += (my - py) * LERP;
      gsap.set(dot, { x: px, y: py });
    });

    /* ══════════════════════════════════════════════
       Micro-interaction : respiration idle
       98 % → 100 % toutes les 3 s, quasi imperceptible
    ══════════════════════════════════════════════ */
    var breathTween = null;
    var idleTimer   = null;

    function startBreathing() {
      if (breathTween) return;
      breathTween = gsap.to(dot, {
        scale    : 0.98,
        duration : 1.8,
        ease     : 'sine.inOut',
        yoyo     : true,
        repeat   : -1,
        overwrite: 'auto',
      });
    }

    function resetBreathing() {
      clearTimeout(idleTimer);
      if (breathTween) {
        breathTween.kill();
        breathTween = null;
        /* Retour discret à l'échelle 1 */
        gsap.to(dot, { scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      }
      /* Relance dans 3 s d'inactivité */
      idleTimer = setTimeout(startBreathing, 3000);
    }

    /* Démarre le timer au chargement */
    idleTimer = setTimeout(startBreathing, 3000);

    /* ══════════════════════════════════════════════
       Machine d'états
    ══════════════════════════════════════════════ */
    var state = 'default';

    /* Transition commune */
    var T = { duration: 0.3, ease: 'power3.out', overwrite: 'auto' };

    function setState(s, clickable) {
      if (s === state) return;
      state = s;

      /* Stoppe le pulse bouton si on en sort */
      gsap.killTweensOf(dot, 'scale');

      switch (s) {

        /* ① Lien */
        case 'link':
          gsap.to(dot, Object.assign({}, T, {
            width      : SZ.link,
            height     : SZ.link,
            background : COLOR,
            borderWidth: 0,
          }));
          gsap.to(lbl, { opacity: 0, duration: 0.15 });
          break;

        /* ② Image */
        case 'image':
          gsap.to(dot, Object.assign({}, T, {
            width      : SZ.image,
            height     : SZ.image,
            background : clickable ? 'transparent' : COLOR,
            borderWidth: clickable ? 1 : 0,
          }));
          gsap.to(lbl, clickable
            ? { opacity: 1, duration: 0.25, ease: 'power3.out', delay: 0.08 }
            : { opacity: 0, duration: 0.15 });
          break;

        /* ③ Bouton */
        case 'button':
          gsap.to(dot, Object.assign({}, T, {
            width      : SZ.button,
            height     : SZ.button,
            background : COLOR,
            borderWidth: 0,
          }));
          gsap.to(lbl, { opacity: 0, duration: 0.15 });
          /* Pulse très discret */
          gsap.fromTo(dot,
            { scale: 1 },
            { scale     : 1.08,
              duration  : 0.9,
              ease      : 'sine.inOut',
              yoyo      : true,
              repeat    : -1,
              overwrite : 'auto' }
          );
          break;

        /* ④ Défaut */
        default:
          gsap.to(dot, Object.assign({}, T, {
            width      : SZ.def,
            height     : SZ.def,
            background : COLOR,
            borderWidth: 0,
            scale      : 1,
          }));
          gsap.to(lbl, { opacity: 0, duration: 0.15 });
      }
    }

    /* ── Détection de l'élément sous le curseur ── */
    function detectState(el) {
      if (!el || el === document || el === document.documentElement)
        return ['default', false];

      /* Bouton */
      if (el.closest('button, .btn, [role="button"], input[type="submit"], input[type="button"]'))
        return ['button', false];

      /* Lien */
      if (el.closest('a'))
        return ['link', false];

      /* Image / carte projet */
      var inMedia = el.tagName === 'IMG'
        || el.closest('figure, .proj-card, .proj-card--video, .media-full, .yt-thumb');
      if (inMedia) {
        var clickable = !!el.closest('a, button, [onclick], .proj-card, .proj-card--video');
        return ['image', clickable];
      }

      return ['default', false];
    }

    document.addEventListener('mouseover', function (e) {
      var res = detectState(e.target);
      setState(res[0], res[1]);
    });

    document.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget) setState('default', false);
    });

    /* ── Visibilité fenêtre ── */
    document.addEventListener('mouseleave', function () {
      gsap.to(dot, { opacity: 0, duration: 0.22 });
    });
    document.addEventListener('mouseenter', function () {
      gsap.to(dot, { opacity: 0.9, duration: 0.22 });
    });

    /* ── Feedback clic ── */
    document.addEventListener('mousedown', function () {
      gsap.to(dot, { scale: 0.80, duration: 0.1, ease: 'power2.in', overwrite: 'auto' });
    });
    document.addEventListener('mouseup', function () {
      var target = state === 'button' ? 1.08 : 1;
      gsap.to(dot, { scale: target, duration: 0.35, ease: 'elastic.out(1, 0.55)', overwrite: 'auto' });
    });

  }); /* fin withGSAP */

})();
