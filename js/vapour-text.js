/**
 * VapourText — Effet texte vapeur (port vanilla JS du composant 21st.dev)
 * Les particules du texte s'évaporent de gauche à droite, puis le texte
 * suivant apparaît en fondu. Canvas transparent, 60 FPS.
 *
 * Usage :
 *   new VapourText(canvasEl, ['Texte 1', 'Texte 2'], options)
 */
(function (global) {
  'use strict';

  /* ── Interpolation de la dispersion selon la taille de police ── */
  function calcSpread(px) {
    var pts = [{ s: 20, v: 0.2 }, { s: 50, v: 0.5 }, { s: 100, v: 1.5 }];
    if (px <= pts[0].s) return pts[0].v;
    if (px >= pts[2].s) return pts[2].v;
    var i = px < 50 ? 0 : 1;
    return pts[i].v + (px - pts[i].s) * (pts[i + 1].v - pts[i].v) / (pts[i + 1].s - pts[i].s);
  }

  /* ══════════════════════════════════════════════════════════════
     Constructeur
  ══════════════════════════════════════════════════════════════ */
  function VapourText(canvas, texts, opts) {
    var self = this;
    opts = opts || {};

    self.canvas = canvas;
    self.ctx    = canvas.getContext('2d');
    self.texts  = texts || [''];
    self.idx    = 0;

    /* Options avec valeurs par défaut */
    self.o = {
      fontFamily:        opts.fontFamily        || 'Poppins, sans-serif',
      fontSize:          opts.fontSize          || 56,
      fontWeight:        opts.fontWeight        || 300,
      letterSpacing:     opts.letterSpacing     || 0.04, /* em */
      color:             opts.color             || 'rgb(255,255,255)',
      spread:            opts.spread            || 4,
      density:           opts.density           || 5,
      vaporizeDuration:  opts.vaporizeDuration  || 2000, /* ms */
      fadeInDuration:    opts.fadeInDuration    || 900,
      waitDuration:      opts.waitDuration      || 2600,
      direction:         opts.direction         || 'left-to-right',
      alignment:         opts.alignment         || 'center',
    };

    self.dpr       = Math.min(window.devicePixelRatio || 1, 2);
    self.particles = [];
    self.bounds    = null;

    /* État de l'animation */
    self.state     = 'fadingIn';
    self.vapProg   = 0;     /* 0→100 */
    self.fadeAlpha = 0;     /* 0→1   */
    self.lastTime  = performance.now();
    self._waitTmr  = null;

    /* Densité normalisée [0,10] → [0.3,1] */
    self._density = Math.max(0.3, Math.min(1, self.o.density / 10 * 0.7 + 0.3));

    /* Init */
    self._resize();
    window.addEventListener('resize', function () { self._resize(); });

    /* Attend que la police soit prête */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        self._buildParticles();
        requestAnimationFrame(function (t) { self._loop(t); });
      });
    } else {
      setTimeout(function () {
        self._buildParticles();
        requestAnimationFrame(function (t) { self._loop(t); });
      }, 300);
    }
  }

  /* ── Redimensionne le canvas ── */
  VapourText.prototype._resize = function () {
    var self = this;
    var el   = self.canvas;
    /* offsetWidth/Height = dimensions réelles après le CSS (position:absolute inset:0) */
    var w    = el.offsetWidth  || window.innerWidth;
    var h    = el.offsetHeight || window.innerHeight;

    el.width  = Math.floor(w * self.dpr);
    el.height = Math.floor(h * self.dpr);

    if (self.particles.length) self._buildParticles();
  };

  /* ── Dessine le texte et échantillonne les pixels → particules ── */
  VapourText.prototype._buildParticles = function () {
    var self   = this;
    var canvas = self.canvas;
    var ctx    = self.ctx;
    var text   = self.texts[self.idx];
    var dpr    = self.dpr;
    var o      = self.o;

    if (!canvas.width || !canvas.height || !text) return;

    /* Font string (taille × DPR pour la netteté rétina) */
    var fontSize = o.fontSize * dpr;
    ctx.font        = o.fontWeight + ' ' + fontSize + 'px ' + o.fontFamily;
    ctx.textBaseline = 'middle';
    ctx.textAlign    = o.alignment;
    ctx.fillStyle    = o.color;

    var cx = o.alignment === 'center' ? canvas.width / 2
           : o.alignment === 'right'  ? canvas.width : 0;
    var cy = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Lettre-espacement manuel (letterSpacing en em) */
    if (o.letterSpacing) {
      ctx.letterSpacing = (o.letterSpacing * o.fontSize * dpr) + 'px';
    }

    ctx.fillText(text, cx, cy);

    /* Limites du texte (pour piloter la vague de vaporisation) */
    var metrics = ctx.measureText(text);
    var tw      = metrics.width;
    var left    = o.alignment === 'center' ? cx - tw / 2
                : o.alignment === 'right'  ? cx - tw : cx;

    self.bounds = { left: left, right: left + tw, width: tw };

    /* Échantillonnage des pixels */
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data      = imageData.data;
    var step      = Math.max(1, Math.round(dpr));

    self.particles = [];

    for (var y = 0; y < canvas.height; y += step) {
      for (var x = 0; x < canvas.width; x += step) {
        var idx   = (y * canvas.width + x) * 4;
        var alpha = data[idx + 3];
        if (alpha > 0) {
          var oa = (alpha / 255) * (step / dpr);
          self.particles.push({
            x: x, y: y, ox: x, oy: y,
            r: data[idx], g: data[idx + 1], b: data[idx + 2],
            opacity: oa, oa: oa,
            vx: 0, vy: 0, speed: 0,
            quick: Math.random() > self._density,
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Repart en fondu entrant */
    self.fadeAlpha = 0;
    self.state     = 'fadingIn';
  };

  /* ── Remet chaque particule à sa position d'origine ── */
  VapourText.prototype._resetParticles = function () {
    this.particles.forEach(function (p) {
      p.x = p.ox; p.y = p.oy;
      p.opacity = p.oa;
      p.vx = p.vy = p.speed = 0;
    });
  };

  /* ── Boucle principale ── */
  VapourText.prototype._loop = function (now) {
    var self = this;
    var dt   = Math.min((now - self.lastTime) / 1000, 0.05);
    self.lastTime = now;

    var canvas = self.canvas;
    var ctx    = self.ctx;
    var o      = self.o;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (self.state) {

      /* ── Fondu entrant ── */
      case 'fadingIn':
        self.fadeAlpha += dt * 1000 / o.fadeInDuration;
        var fa = Math.min(self.fadeAlpha, 1);
        self.particles.forEach(function (p) {
          var op = fa * p.oa;
          if (op > 0.005) {
            ctx.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b + ',' + op + ')';
            ctx.fillRect(p.ox / self.dpr, p.oy / self.dpr,
                         1.4 / self.dpr, 1.4 / self.dpr);
          }
        });
        if (self.fadeAlpha >= 1) {
          self.state = 'waiting';
          self._waitTmr = setTimeout(function () {
            self.vapProg = 0;
            self._resetParticles();
            self.state = 'vaporizing';
          }, o.waitDuration);
        }
        break;

      /* ── Texte affiché (attente) ── */
      case 'waiting':
        self.particles.forEach(function (p) {
          if (p.oa > 0.005) {
            ctx.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b + ',' + p.oa + ')';
            ctx.fillRect(p.ox / self.dpr, p.oy / self.dpr,
                         1.4 / self.dpr, 1.4 / self.dpr);
          }
        });
        break;

      /* ── Vaporisation ── */
      case 'vaporizing':
        self.vapProg += dt * 100 / (o.vaporizeDuration / 1000);
        var prog = Math.min(100, self.vapProg);
        var vx   = o.direction === 'left-to-right'
          ? self.bounds.left  + self.bounds.width * prog / 100
          : self.bounds.right - self.bounds.width * prog / 100;

        var spread      = calcSpread(o.fontSize) * Math.max(0.3, o.spread / 5);
        var maxV        = spread * 2;
        var allInvisible = true;

        self.particles.forEach(function (p) {
          var passed = o.direction === 'left-to-right' ? p.ox <= vx : p.ox >= vx;

          if (passed) {
            /* Initialisation au premier passage */
            if (p.speed === 0) {
              var ang = Math.random() * Math.PI * 2;
              p.speed = (Math.random() + 0.5) * spread;
              p.vx = Math.cos(ang) * p.speed;
              p.vy = Math.sin(ang) * p.speed;
            }

            if (p.quick) {
              p.opacity = Math.max(0, p.opacity - dt * 2.5);
            } else {
              var dx = p.ox - p.x, dy = p.oy - p.y;
              var dist = Math.sqrt(dx * dx + dy * dy);
              var damp = Math.max(0.95, 1 - dist / (100 * spread));
              var rs   = spread * 3;
              p.vx = (p.vx + (Math.random() - 0.5) * rs + dx * 0.002) * damp;
              p.vy = (p.vy + (Math.random() - 0.5) * rs + dy * 0.002) * damp;
              var cv = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
              if (cv > maxV) { p.vx *= maxV / cv; p.vy *= maxV / cv; }
              p.x += p.vx * dt * 20;
              p.y += p.vy * dt * 10;
              var fadeRate = 0.25 * (2000 / o.vaporizeDuration);
              p.opacity = Math.max(0, p.opacity - dt * fadeRate);
            }
          } else {
            allInvisible = false; /* particule pas encore atteinte */
          }

          if (p.opacity > 0.01) {
            allInvisible = false;
            ctx.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b + ',' + p.opacity + ')';
            ctx.fillRect(p.x / self.dpr, p.y / self.dpr,
                         1.4 / self.dpr, 1.4 / self.dpr);
          }
        });

        /* Fin de la vaporisation → passe au texte suivant */
        if (prog >= 100 && allInvisible) {
          self.idx = (self.idx + 1) % self.texts.length;
          self._buildParticles();
        }
        break;
    }

    requestAnimationFrame(function (t) { self._loop(t); });
  };

  /* ── Export global ── */
  global.VapourText = VapourText;

})(window);
