/* Ölverk prototype: shared behaviour (bar, mobile menu, cart drawer, reveals, menu tabs, seasonal fan).
   Every reveal is an enhancement: without GSAP or with reduced motion the page renders plain. */
(() => {
  const D = window.OLVERK;
  const html = document.documentElement;
  const ROOT = location.pathname.includes('/products/') ? '../' : '';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  const kr = n => n.toLocaleString('de-DE') + ' kr.';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const byH = Object.fromEntries(D.products.map(p => [p.h, p]));

  /* ---------- smooth scroll (fine pointers only: Lenis breaks iOS toolbar collapse) ---------- */
  let lenis = null;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (!RM && FINE && window.Lenis && hasGsap) {
    lenis = new Lenis({ lerp: 0.11 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const barH = () => $('[data-bar]')?.offsetHeight || 0;
  const scrollToY = y => lenis ? lenis.scrollTo(y, { duration: 1.1 }) : window.scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
  window.OLV = { lenis, scrollToY, RM, FINE, hasGsap };

  /* same-page anchors: compute the target ourselves (Lenis + scroll-padding double-count) */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname) return;
    const id = url.hash.slice(1);
    const el = id === 'top' ? null : document.getElementById(id);
    if (id !== 'top' && !el) return;
    e.preventDefault();
    closeMenu(false);
    const y = el ? el.getBoundingClientRect().top + scrollY - barH() - 12 : 0;
    scrollToY(Math.max(0, y));
    history.replaceState(null, '', id === 'top' ? location.pathname : '#' + id);
  });

  /* ---------- bar border once scrolled ---------- */
  const bar = $('[data-bar]');
  const onScroll = () => bar && bar.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- mobile menu ---------- */
  const burger = $('[data-burger]'), mm = $('[data-mobmenu]');
  function openMenu() {
    mm.hidden = false; requestAnimationFrame(() => mm.classList.add('open'));
    burger.setAttribute('aria-expanded', 'true'); html.style.overflow = 'hidden'; lenis?.stop();
    $('a', mm)?.focus();
  }
  function closeMenu(focus = true) {
    if (!mm || mm.hidden) return;
    mm.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); html.style.overflow = ''; lenis?.start();
    setTimeout(() => { if (!mm.classList.contains('open')) mm.hidden = true; }, 300);
    if (focus) burger.focus();
  }
  burger?.addEventListener('click', () => burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeCart(); } });

  /* ---------- cart ---------- */
  const KEY = 'olverk-cart-v1';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || '[]').filter(l => byH[l.h]); } catch { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {} };
  const unit = l => { const p = byH[l.h]; return p.variants ? p.variants[l.v ?? 0].p : p.p; };
  const drawer = $('[data-drawer]'), panel = drawer?.querySelector('.drawer__panel');
  let lastFocus = null;

  function thumb(p) {
    if (p.cut) return `<div class="line__img" style="--tile:${p.tile}"><img src="${ROOT}${p.cut}" alt=""></div>`;
    return `<div class="line__img ${p.cover ? 'cover' : ''}" style="--tile:${p.fit || 'var(--lakk)'}"><img src="${ROOT}${p.img}" alt=""></div>`;
  }
  function render() {
    const n = cart.reduce((s, l) => s + l.q, 0);
    $$('[data-cart-count]').forEach(c => { c.textContent = n; c.classList.toggle('has', n > 0); });
    if (!drawer) return;
    const lines = $('[data-cart-lines]', drawer);
    lines.innerHTML = cart.map((l, i) => {
      const p = byH[l.h];
      return `<div class="line">${thumb(p)}<div><p class="line__name">${p.name}</p><p class="line__var">${p.variants ? p.variants[l.v ?? 0].t : p.size}</p>
        <div class="line__ctl"><div class="qty"><button type="button" data-q="${i}" data-d="-1" aria-label="One fewer ${p.name}"><i class="ph ph-minus" aria-hidden="true"></i></button><input type="number" inputmode="numeric" min="1" max="20" value="${l.q}" data-qi="${i}" aria-label="Quantity of ${p.name}"><button type="button" data-q="${i}" data-d="1" aria-label="One more ${p.name}"><i class="ph ph-plus" aria-hidden="true"></i></button></div>
        <button type="button" class="line__rm" data-rm="${i}">Remove</button></div></div>
        <p class="line__price price">${kr(unit(l) * l.q)}</p></div>`;
    }).join('');
    const empty = cart.length === 0;
    $('[data-cart-empty]', drawer).hidden = !empty;
    $('[data-cart-foot]', drawer).hidden = empty;
    lines.hidden = empty;
    $('[data-cart-subtotal]', drawer).textContent = kr(cart.reduce((s, l) => s + unit(l) * l.q, 0));
  }
  function add(h, v = null, q = 1) {
    const p = byH[h]; if (!p || p.soldOut) return;
    const ex = cart.find(l => l.h === h && (l.v ?? null) === v);
    if (ex) ex.q = Math.min(20, ex.q + q); else cart.push({ h, v, q });
    save(); render();
    $$('[data-cart-count]').forEach(c => { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); });
    toast(`${p.name}${p.variants ? ', ' + p.variants[v ?? 0].t : ''} is in your cart.`);
  }
  let tt, undoLine = null;
  function toast(msg, label = 'View cart', attr = 'data-cart-open') {
    const t = $('[data-toast]'); if (!t) return;
    t.innerHTML = `${msg} <button type="button" class="toast__open" ${attr}>${label}</button>`;
    t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 3600);
  }
  function openCart() {
    if (!drawer) return;
    lastFocus = document.activeElement; drawer.hidden = false; html.style.overflow = 'hidden'; lenis?.stop();
    requestAnimationFrame(() => { drawer.classList.add('open'); panel.focus(); });
    $('[data-toast]')?.classList.remove('show');
  }
  function closeCart() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('open'); html.style.overflow = ''; lenis?.start();
    setTimeout(() => { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 420);
    lastFocus?.focus?.();
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('button,a'); if (!t) return;
    if (t.matches('[data-cart-open]')) { openCart(); return; }
    if (t.matches('[data-cart-close]') || e.target.matches('.drawer__scrim')) { closeCart(); return; }
    if (t.dataset.add) { add(t.dataset.add); t.classList.add('is-added'); setTimeout(() => t.classList.remove('is-added'), 900); return; }
    if (t.dataset.q !== undefined) { const l = cart[+t.dataset.q]; l.q = Math.max(1, Math.min(20, l.q + +t.dataset.d)); save(); render(); return; }
    if (t.dataset.rm !== undefined) {
      const i = +t.dataset.rm, [gone] = cart.splice(i, 1); save(); render(); $('[data-cart-close]', drawer)?.focus();
      undoLine = { i, gone }; toast(`${byH[gone.h].name} removed.`, 'Undo', 'data-undo'); return;
    }
    if (t.matches('[data-undo]')) { if (undoLine) { cart.splice(Math.min(undoLine.i, cart.length), 0, undoLine.gone); undoLine = null; save(); render(); } $('[data-toast]')?.classList.remove('show'); return; }
    if (t.matches('[data-checkout]')) { const n = $('[data-proto]'); n.hidden = false; return; }
  });
  document.addEventListener('click', e => { if (e.target.classList?.contains('drawer__scrim')) closeCart(); });
  document.addEventListener('change', e => {
    if (e.target.dataset.qi !== undefined) { const l = cart[+e.target.dataset.qi]; l.q = Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)); save(); render(); }
  });
  /* focus trap inside the open drawer */
  drawer?.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = $$('button:not([hidden]),a[href],input', panel).filter(x => x.offsetParent);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  });
  addEventListener('storage', e => { if (e.key === KEY) { try { cart = JSON.parse(e.newValue || '[]'); } catch {} render(); } });
  window.Cart = { add, open: openCart };
  render();

  /* ---------- menu tabs (roving tabindex) ---------- */
  const tabs = $$('[role="tab"]');
  function sel(t) {
    tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
    if (hasGsap) ScrollTrigger.refresh();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => sel(t));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
      const n = tabs[(i + d + tabs.length) % tabs.length]; sel(n); n.focus();
    });
  });

  /* ---------- reveals, tied to scroll position ---------- */
  if (!hasGsap || RM) { html.classList.add('no-anim'); }
  else {
    $$('.rv').forEach(el => gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 72%', scrub: 0.6 } }));
    $$('.rv-img').forEach(el => {
      const img = $('img', el);
      gsap.fromTo(el, { clipPath: 'inset(12% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 55%', scrub: 0.6 } });
      if (img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 45%', scrub: 0.6 } });
    });
    const band = $('[data-band] img');
    if (band) gsap.fromTo(band, { scale: 1.14, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: '[data-band]', start: 'top bottom', end: 'bottom top', scrub: 0.4 } });
  }

  /* ---------- seasonal fan ---------- */
  const fan = $('[data-fan]');
  if (fan) {
    const cards = $$('[data-fan-card]', fan), items = $$('[data-fan-item]', fan);
    const wide = matchMedia('(min-width: 900px)');
    const spread = i => { const c = (cards.length - 1) / 2, d = i - c; return { x: d * Math.min(innerWidth * 0.15, 230), r: d * 7, y: Math.abs(d) * 18 }; };
    const lift = (i, on) => {
      items.forEach((it, j) => it.classList.toggle('on', on && j === i));
      cards.forEach((c, j) => c.classList.toggle('lift', on && j === i));
      if (!wide.matches) return;
      cards.forEach((c, j) => { c.style.zIndex = on && j === i ? 10 : 5 - Math.abs(j - (cards.length - 1) / 2); });
      if (hasGsap && !RM) cards.forEach((c, j) => gsap.to(c, { yPercent: on && j === i ? -9 : 0, duration: 0.28, ease: 'power3.out', overwrite: 'auto' }));
    };
    cards.forEach((c, i) => {
      c.addEventListener('click', () => { const on = !c.classList.contains('lift'); lift(i, on); if (on && !wide.matches) items[i].scrollIntoView({ block: 'nearest', behavior: RM ? 'auto' : 'smooth' }); });
      if (FINE) { c.addEventListener('pointerenter', () => lift(i, true)); c.addEventListener('pointerleave', () => lift(i, false)); }
      c.addEventListener('focus', () => lift(i, true)); c.addEventListener('blur', () => lift(i, false));
    });
    if (FINE) items.forEach((it, i) => { it.addEventListener('pointerenter', () => lift(i, true)); it.addEventListener('pointerleave', () => lift(i, false)); });
    const place = () => {
      cards.forEach((c, i) => { c.style.zIndex = 5 - Math.abs(i - (cards.length - 1) / 2); });
      if (!wide.matches) { cards.forEach(c => c.style.transform = ''); return; }
      if (hasGsap && !RM) {
        /* the fan opens as the section scrolls in: scrubbed, reversible, one owner per property */
        cards.forEach((c, i) => {
          const s = spread(i);
          gsap.fromTo(c, { x: 0, rotation: 0, y: 40 }, { x: s.x, rotation: s.r, y: s.y, ease: 'none',
            scrollTrigger: { trigger: fan, start: 'top 85%', end: 'top 25%', scrub: 0.7, invalidateOnRefresh: true } });
        });
      } else cards.forEach((c, i) => { const s = spread(i); c.style.transform = `translate(${s.x}px,${s.y}px) rotate(${s.r}deg)`; });
    };
    place();
  }

  /* ---------- bottles (cut-out products): tilt toward the pointer, lift off the floor, light rolls across ---------- */
  if (FINE && !RM) {
    $$('.ptile__link, .pdp__media').forEach(host => {
      const obj = $('[data-tilt]', host); if (!obj) return;
      const lift = $('.pmedia__lift', obj), sheen = $('.sheen', obj), shade = $('.shade', obj), shadow = $('.pmedia__shadow', obj);
      const s = { t: 0, h: 0, tx: 0, ty: 0, x: 0, y: 0, raf: 0, last: 0 };
      const tick = now => {
        const k = Math.min(1, ((now - (s.last || now)) || 16) / 1000 * 11); s.last = now;
        s.h += (s.t - s.h) * (s.t > s.h ? k : Math.min(1, k * 1.4)); s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
        lift.style.transform = `translate3d(0,${(-5 * s.h).toFixed(2)}%,0) rotateY(${(s.x * 16 * s.h).toFixed(2)}deg) rotateX(${(-s.y * 6 * s.h).toFixed(2)}deg) rotateZ(${(-s.x * 2.2 * s.h).toFixed(2)}deg)`;
        sheen.style.opacity = (s.h * 0.85).toFixed(3);
        sheen.style.backgroundPosition = `${(50 - s.x * 46).toFixed(1)}% 0`;
        shade.style.opacity = (s.h * 0.6).toFixed(3);
        shade.style.backgroundPosition = `${(50 - s.x * 30).toFixed(1)}% 0`;
        shadow.style.transform = `scale(${(1 - s.h * 0.2).toFixed(3)},${(1 - s.h * 0.12).toFixed(3)})`;
        shadow.style.opacity = (1 - s.h * 0.5).toFixed(3);
        const moving = Math.abs(s.t - s.h) > 0.002 || Math.abs(s.tx - s.x) > 0.002 || Math.abs(s.ty - s.y) > 0.002;
        s.raf = moving ? requestAnimationFrame(tick) : 0; if (!moving) s.last = 0;
      };
      const kick = () => { if (!s.raf) s.raf = requestAnimationFrame(tick); };
      host.addEventListener('pointermove', e => {
        const r = obj.getBoundingClientRect();
        s.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
        s.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
        s.t = 1; kick();
      });
      host.addEventListener('pointerleave', () => { s.t = 0; s.tx = 0; s.ty = 0; kick(); });
      host.addEventListener('focus', () => { s.t = 0.7; s.tx = 0.4; s.ty = -0.2; kick(); });
      host.addEventListener('blur', () => { s.t = 0; s.tx = 0; s.ty = 0; kick(); });
    });
  }

  if (hasGsap) addEventListener('load', () => ScrollTrigger.refresh());
})();
