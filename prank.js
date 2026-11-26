/* Montaje visual sobre la copia de la web del club de Illescas.
   Todo ocurre en el navegador. Ningún servidor implicado. */
(function () {
  if (window.__bkPrank) return;
  window.__bkPrank = true;

  var YELLOW = '#ffd400';
  var INK = '#0d0d0d';
  var changes = 0;

  /* ---------- 1. textos ---------- */
  var MAP = [
    ['Black Week · Solo hasta el domingo 29', 'David Week · Gratis hasta que me aburra'],
    ['BLACK WEEK · SOLO HASTA EL DOMINGO 29', 'DAVID WEEK · GRATIS HASTA QUE ME ABURRA'],
    ['Black Week en Illescas', 'David Week en Illescas'],
    ['BLACK WEEK EN ILLESCAS', 'DAVID WEEK EN ILLESCAS'],
    ['BLACK WEEK', 'DAVID WEEK'],
    ['Black Week', 'David Week'],
    ['Black Pack', 'Pack de David'],
    ['BLACK PACK', 'PACK DE DAVID'],
    ['Clase de prueba', 'Clase de prueba gratis'],
    ['CLASE DE PRUEBA', 'CLASE DE PRUEBA GRATIS'],
    ['4 clases de 47 min', '4 clases de 47 min · invitación del jefe'],
    ['1 clase de 47 min', '1 clase de 47 min · sin pagar nada'],
    ['24,95', '0,00'],
    ['9,95', '0,00'],
    ['6,24', '0'],
    ['88', '0'],
    ['Pack valorado en 0', 'Pack valorado en 0'],
    ['4 clases para coger el ritmo y la técnica.', '4 clases para coger el ritmo, la técnica y el sitio del jefe.'],
    ['Guantes y vendas de regalo, para quedártelos.', 'Guantes y vendas de regalo, cortesía de la casa.'],
    ['Tienes 1 mes desde la compra para usarlas.', 'Sin caducidad. Me las pido cuando quiero.'],
    ['Si te quedas, sin matrícula y −25% en tu primera cuota.', 'Si te quedas, la cuota la pongo yo: cero euros.'],
    ['Una clase completa, guiada por un trainer.', 'Una clase completa, guiada por mí.'],
    ['El Black Pack es para quien aún no ha entrenado en Brooklyn Fitboxing.', 'El Pack de David es solo para David. Y para quien David diga.'],
    ['RESERVA TU CLASE POR 0,00€', 'RESERVA TU CLASE. ES GRATIS.'],
    ['© 2026 Brooklyn Fitboxing', '© 2026 Brooklyn Fitboxing · PD: es una broma de David. No se ha tocado nada.']
  ];

  function fixTexts(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node, batch = [], i;
    while ((node = walker.nextNode())) {
      var t = node.nodeValue;
      if (!t || !t.trim()) continue;
      var out = t;
      for (i = 0; i < MAP.length; i++) {
        if (out.indexOf(MAP[i][0]) !== -1) { out = out.split(MAP[i][0]).join(MAP[i][1]); changes++; }
      }
      if (out !== t) batch.push([node, out]);
    }
    batch.forEach(function (p) { p[0].nodeValue = p[1]; });
  }
  fixTexts(document.body);

  /* ---------- 1b. menú móvil (sin UIKit, lo abro yo) ---------- */
  var st0 = document.createElement('style');
  st0.textContent = '.bf-exit,.ev-exit-intent{display:none!important}' +
    '#onetrust-consent-sdk,#onetrust-banner-sdk,#ot-sdk-btn-floating{display:none!important}';
  document.head.appendChild(st0);
  [].forEach.call(document.images, function (i) {
    if (!i.complete) { i.loading = 'eager'; var s = i.src; i.src = s; }
  });

  var st = document.createElement('style');
  st.textContent = '#bf-menu{display:none!important}#bf-menu.bk-open{display:block!important}' +
    '#bk-nuevas h2{color:#fff!important}#bk-nuevas p{color:#fff}' +
    '#bk-nuevas{padding-bottom:110px!important}' +
    '@media (max-width:639px){.bf-bw-marquee__item{white-space:nowrap;font-size:11.5px!important;letter-spacing:.04em!important}' +
    '.bf-club-bw__title{font-size:clamp(28px,11vw,44px)!important;letter-spacing:-.02em!important}' +
    '.bf-club-bw__pack{font-size:17px!important}' +
    '.bf-club-bw__gloves{height:62px!important;width:auto!important}' +
    '.bf-club-bw__value{position:relative;z-index:3}}';
  document.head.appendChild(st);

  var packT = document.querySelector('.bf-club-bw__pack');
  if (packT) { packT.textContent = '4 clases gratis'; changes += 1; }

  var burger = document.querySelector('.bf-header__burger');
  var menu = document.getElementById('bf-menu');
  if (burger && menu) {
    burger.addEventListener('click', function (e) {
      e.preventDefault();
      var open = menu.classList.toggle('bk-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  /* ---------- 2. tarjeta extra de oferta ---------- */
  var grid = document.querySelector('.bf-club-offers__grid');
  if (grid) {
    var card = document.createElement('article');
    card.className = 'bf-club-offers__card bf-club-offers__card--web';
    card.innerHTML =
      '<p class="bf-club-offers__eyebrow"><span class="bf-club-offers__eyebrow-text">Solo para mí</span></p>' +
      '<div class="bf-club-offers__body">' +
      '<div class="bf-club-offers__head"><div class="bf-club-offers__naming">' +
      '<h3 class="bf-club-offers__name">Clase VIP con el jefe</h3>' +
      '<p class="bf-club-offers__sessions">1 clase privada · 47 min</p></div>' +
      '<div class="bf-club-offers__pricing"><p class="bf-club-offers__price"><span>0,00<span class="currency">€</span></span></p></div></div>' +
      '<div class="bf-club-offers__box"><ul class="bf-club-offers__list">' +
      '<li class="bf-club-offers__item">El club entero para mí solo.</li>' +
      '<li class="bf-club-offers__item">Trainer, saco y música a mi gusto.</li>' +
      '<li class="bf-club-offers__item">La nómina del trainer la pago con likes.</li>' +
      '</ul></div>' +
      '<div class="bf-club-offers__foot"><a class="bf-btn bf-club-offers__btn--outline bf-club-offers__btn" href="#" data-bk-demo="1"><span>Reservar</span></a></div>' +
      '</div>';
    grid.appendChild(card);
    grid.classList.remove('bf-club-offers__grid--duo');
    grid.style.gridTemplateColumns = 'repeat(auto-fit,minmax(280px,1fr))';
    changes += 5;
  }

  /* ---------- 3. sección: clases creadas a mano ---------- */
  var host = document.querySelector('.bf-club-offers') || grid;
  var sec = document.createElement('section');
  sec.id = 'bk-nuevas';
  sec.style.cssText = 'padding:56px 20px;background:' + INK + ';color:#fff;font-family:inherit';
  sec.innerHTML =
    '<div style="max-width:1100px;margin:0 auto">' +
    '<p style="letter-spacing:.18em;font-size:12px;color:' + YELLOW + ';margin:0 0 10px">HORARIO NUEVO · SIN PERMISO DE NADIE</p>' +
    '<h2 style="margin:0 0 6px;font-size:clamp(26px,5vw,40px);line-height:1.05">Clases que acabo de crear</h2>' +
    '<p style="margin:0 0 22px;opacity:.7;font-size:14px">Precio: 0,00 €. Plazas: las que me dé la gana.</p>' +
    '<div id="bk-list" style="display:grid;gap:10px"></div>' +
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px">' +
    '<button id="bk-add" style="background:' + YELLOW + ';color:' + INK + ';border:0;border-radius:999px;padding:14px 26px;font-weight:800;font-size:14px;letter-spacing:.04em;cursor:pointer">CREAR OTRA CLASE GRATIS</button>' +
    '<span id="bk-count" style="align-self:center;font-size:13px;opacity:.65"></span>' +
    '</div></div>';
  if (host && host.parentNode) host.parentNode.insertBefore(sec, host.nextSibling);

  var classes = [
    ['SÁBADO · 10:00', 'Entrenamiento con el jefe', 'Saco 1 reservado para mí'],
    ['DOMINGO · 12:00', 'Fitboxing a puerta cerrada', 'La llave la tengo yo'],
    ['LUNES · 07:00', 'Clase de recuperación', 'Solo para resaca de jefe']
  ];
  var list = sec.querySelector('#bk-list');
  function row(t, n, s) {
    var d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:14px;align-items:center;justify-content:space-between;padding:14px 16px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:rgba(255,255,255,.03);flex-wrap:wrap';
    d.innerHTML = '<div><div style="font-size:11px;letter-spacing:.16em;color:' + YELLOW + '">' + t + '</div>' +
      '<div style="font-weight:700;font-size:15px;margin-top:3px">' + n + '</div>' +
      '<div style="font-size:12px;opacity:.55;margin-top:2px">' + s + '</div></div>' +
      '<div style="font-weight:800;font-size:18px">0,00 €</div>';
    return d;
  }
  classes.forEach(function (c) { list.appendChild(row(c[0], c[1], c[2])); });
  sec.querySelector('#bk-count').textContent = '3 clases · 0,00 € de ingresos';

  sec.querySelector('#bk-add').addEventListener('click', function () {
    var hoy = new Date();
    var dias = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    var h = 8 + Math.floor(Math.random() * 12);
    list.appendChild(row(dias[hoy.getDay()] + ' · ' + (h < 10 ? '0' + h : h) + ':00', 'Clase de ' + (Math.random() < .5 ? 'fuerza' : 'fitboxing') + ' · la mía', 'Creada por mí, aprobada por mí'));
    var n = list.children.length;
    sec.querySelector('#bk-count').textContent = n + ' clases · 0,00 € de ingresos';
    setChanges(changes + 1);
  });

  /* ---------- 4. barra de editor ---------- */
  var bar = document.createElement('div');
  bar.id = 'bk-bar';
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#111;color:#fff;border-top:2px solid ' + YELLOW + ';display:flex;align-items:center;gap:8px;padding:8px 12px;font:600 12px/1.25 -apple-system,Segoe UI,Roboto,sans-serif;flex-wrap:wrap';
  bar.innerHTML =
    '<span style="display:inline-flex;align-items:center;gap:6px;min-width:0;flex:1 1 auto"><span style="width:8px;height:8px;border-radius:50%;background:#38e07b;display:inline-block;flex:0 0 auto"></span><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11.5px">MODO EDITOR · david@brooklynfitboxing.com</span></span>' +
    '<span id="bk-chg" style="color:' + YELLOW + ';white-space:nowrap;font-size:11.5px">' + changes + ' cambios sin publicar</span>' +
    '<span style="display:flex;gap:8px;margin-left:auto">' +
    '<button id="bk-pub" style="background:' + YELLOW + ';color:' + INK + ';border:0;border-radius:6px;padding:7px 12px;font:800 11.5px inherit;cursor:pointer">PUBLICAR</button>' +
    '<button id="bk-reset" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:6px;padding:7px 12px;font:600 11.5px inherit;cursor:pointer">DESHACER</button>' +
    '</span>';
  document.body.appendChild(bar);
  function fitBar() {
    var h = bar.getBoundingClientRect().height;
    if (h > 0) document.body.style.paddingBottom = Math.round(h + 20) + 'px';
  }
  [60, 350, 900, 1600].forEach(function (t) { setTimeout(fitBar, t); });
  window.addEventListener('load', fitBar);
  window.addEventListener('resize', fitBar);
  if (window.ResizeObserver) new ResizeObserver(fitBar).observe(bar);

  function setChanges(n) {
    changes = n;
    var el = document.getElementById('bk-chg');
    if (el) el.textContent = n + ' cambios sin publicar';
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:' + YELLOW + ';color:' + INK + ';padding:12px 18px;border-radius:10px;font:700 13px -apple-system,Segoe UI,Roboto,sans-serif;z-index:100000;box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:88vw;text-align:center';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }

  bar.querySelector('#bk-pub').addEventListener('click', function () {
    toast('Publicado en brooklynfitboxing.com · es broma, tu web está intacta');
    setChanges(0);
  });
  bar.querySelector('#bk-reset').addEventListener('click', function () {
    toast('Nada que deshacer: esto solo pasa en este móvil');
  });

  /* ---------- 5. enlaces fuera de combate ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    if (a.hasAttribute('data-bk-demo')) toast('Plaza reservada (mentira)');
    else toast('Aquí no se reserva nada: es una broma de David');
  }, true);

  /* ---------- 6. barra falsa de Safari si va a pantalla completa ---------- */
  var standalone = window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  if (standalone) {
    var ios = document.createElement('div');
    ios.id = 'bk-ios';
    ios.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:100001;background:#f2f2f7;padding:calc(env(safe-area-inset-top,0px) + 8px) 10px 8px;display:flex;align-items:center;gap:8px;font:600 12px -apple-system,sans-serif;color:#111;border-bottom:1px solid #d8d8dd';
    ios.innerHTML = '<span style="opacity:.55">AA</span><span style="flex:1;background:#fff;border-radius:8px;padding:6px 10px;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">www.brooklynfitboxing.com/public/es/es-es/club/ILLESCAS</span><span style="opacity:.55">↻</span>';
    document.body.appendChild(ios);
    document.body.style.paddingTop = 'calc(env(safe-area-inset-top,0px) + 46px)';
  }
})();
