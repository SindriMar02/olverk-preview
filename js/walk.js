/* The spring walk. Desktop: one pinned stage scrubbed over the whole section.
   Act 1 (p < .16): headline + the five cans as a line-up with depth. Hover a can: its spring blooms
          underneath and the others step back. Click: walk straight to that beer.
   Act 2: the row becomes a walk; the focused can stands in its own spring (their contour art),
          the room takes that spring's ink, copy crossfades as a pure function of focus.
   Act 3 (p > .86): the line-up returns with the bottle-shop line.
   Scroll state is a pure function of progress (fully reversible). Hover is a separate damped layer:
   the can tilts toward the pointer, lifts off its floor shadow, light rolls across the label.
   Springs live on their own layer under every can, so a spring never paints over a neighbour.
   Phones and reduced motion get the flat scroll-snap row from the CSS instead. */
(() => {
  const walk = document.querySelector('[data-walk]');
  if (!walk) return;
  const { RM, hasGsap, scrollToY, lenis } = window.OLV || {};
  const wide = matchMedia('(min-width: 900px)');
  if (RM || !hasGsap || !wide.matches) return;

  const S = window.OLVERK.springs, N = S.length;
  const stage = walk.querySelector('[data-stage]');
  const springs = [...walk.querySelectorAll('[data-spring]')];
  const pools = [...walk.querySelectorAll('[data-pool]')];
  const objs = springs.map(s => s.querySelector('.spring__obj'));
  const lifts = springs.map(s => s.querySelector('.spring__lift'));
  const sheens = springs.map(s => s.querySelector('.sheen'));
  const shades = springs.map(s => s.querySelector('.shade'));
  const shadows = springs.map(s => s.querySelector('.spring__shadow'));
  const copies = [...walk.querySelectorAll('[data-copy]')];
  const intro = walk.querySelector('[data-intro]'), outro = walk.querySelector('[data-outro]');
  const index = walk.querySelector('.walk__index'), idxBtns = [...index.querySelectorAll('button')];
  walk.classList.add('is-pinned');
  pools.forEach(p => { const im = p.querySelector('img'); im.loading = 'eager'; im.classList.add('simmer'); });
  objs.forEach((o, i) => { o.setAttribute('role', 'button'); o.tabIndex = 0; o.setAttribute('aria-label', `${S[i].name}, ${S[i].style} ${S[i].abv}: show this beer`); });

  /* each can's own measured box inside its 1:1 spring image (fractions of S) */
  const G = S.map(s => ({ cx: s.box[0] + s.box[2] / 2, cy: s.box[1] + s.box[3] / 2, half: s.box[3] / 2 }));
  const HALF = G.reduce((a, g) => a + g.half, 0) / N;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const sstep = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const lerp = (a, b, t) => a + (b - a) * t;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const inks = S.map(s => hex(s.ink));
  const GUFA = [243, 244, 241];

  let W, H, SZ, floorF;
  function measure() {
    W = innerWidth; H = innerHeight;
    SZ = (H * 0.64) / (2 * HALF);              // spring size so the focused can is 64% of the viewport tall
    floorF = H * 0.86;                          // the floor every can stands on in act 2
    springs.concat(pools).forEach(s => s.style.setProperty('--S', SZ + 'px'));
  }

  /* act 1/3 line-up: centre can in front, the rest stepping back to the sides */
  const ROW = [{ d: -2, k: .44 }, { d: -1, k: .52 }, { d: 0, k: .62 }, { d: 1, k: .52 }, { d: 2, k: .44 }];
  function rowPos(i) {
    const r = ROW[i], cx = W * 0.745 + r.d * W * 0.08;
    const floor = H * 0.80 - (0.62 - r.k) * H * 0.42;
    return { x: cx, y: floor - G[i].half * SZ * r.k, k: r.k, z: 10 - Math.abs(r.d) };
  }
  /* act 2 walk: focused can at 70% width, the next ones queue small on the right, past ones leave left */
  function walkPos(i, f) {
    const d = i - f;
    let x, k, o;
    if (d >= 0) {
      const a = clamp(d), b = clamp(d - 1, 0, 3);
      x = W * 0.70 + a * W * 0.175 + b * W * 0.06;
      k = 1 - a * 0.56 - b * 0.06;
      o = 1 - clamp(d - 2.2, 0, 1);
    } else {
      x = W * 0.70 + d * W * 0.26;
      k = 1 + d * 0.25;
      o = clamp(1 + d * 1.7);
    }
    return { x, y: floorF - G[i].half * SZ * k, k, o, z: 20 - Math.round(Math.abs(d) * 2) };
  }
  const place = (el, i, x, y, k) => { el.style.transform = `translate3d(${(x - G[i].cx * SZ * k).toFixed(1)}px,${(y - G[i].cy * SZ * k).toFixed(1)}px,0) scale(${k.toFixed(4)})`; };

  /* hover layer: target (t*) and damped (h, x, y) per can */
  const hv = S.map(() => ({ t: 0, h: 0, tx: 0, ty: 0, x: 0, y: 0 }));
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  objs.forEach((o, i) => {
    if (FINE) {
      o.addEventListener('pointermove', e => {
        const r = o.getBoundingClientRect();
        hv[i].tx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
        hv[i].ty = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
        hv[i].t = 1;
      });
      o.addEventListener('pointerleave', () => { hv[i].t = 0; hv[i].tx = 0; hv[i].ty = 0; });
    }
    o.addEventListener('focus', () => { hv[i].t = 1; hv[i].tx = 0.45; hv[i].ty = -0.2; });
    o.addEventListener('blur', () => { hv[i].t = 0; hv[i].tx = 0; hv[i].ty = 0; });
    o.addEventListener('click', () => goto(i));
    o.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto(i); } });
  });

  let target = 0, p = -1, last = -1;
  const RATE = lenis ? 15 : 9;   // Lenis already smooths the scroll; don't damp it twice
  const st = ScrollTrigger.create({ trigger: walk, start: 'top top', end: 'bottom bottom', onUpdate: s => { target = s.progress; } });
  new IntersectionObserver(([e]) => walk.classList.toggle('is-away', !e.isIntersecting)).observe(walk);
  const fOf = pp => { const raw = clamp((pp - 0.16) / (0.84 - 0.16)) * (N - 1); const fi = Math.min(N - 2, Math.floor(raw)); return fi + sstep(0.22, 0.78, raw - fi); };
  function goto(i) {
    const t = 0.16 + (i / (N - 1)) * (0.84 - 0.16);
    scrollToY(st.start + (i === N - 1 ? t - 0.01 : t + 0.004) * (st.end - st.start));
  }

  function frame(dt) {
    p = p < 0 ? target : p + (target - p) * Math.min(1, (dt || 16) / 1000 * RATE);

    /* hover damping: springy follow, quicker release */
    const hs = Math.min(1, (dt || 16) / 1000 * 11);
    let hoverMoving = false;
    hv.forEach(v => {
      v.h += (v.t - v.h) * (v.t > v.h ? hs : Math.min(1, hs * 1.4));
      v.x += (v.tx - v.x) * hs; v.y += (v.ty - v.y) * hs;
      if (Math.abs(v.t - v.h) > 0.002 || Math.abs(v.tx - v.x) > 0.002 || Math.abs(v.ty - v.y) > 0.002) hoverMoving = true;
    });
    if (Math.abs(p - last) < 1e-5 && !hoverMoving) return;
    last = p;

    const a2 = sstep(0.05, 0.16, p), a3 = sstep(0.86, 0.95, p);   // cans: row -> walk, walk -> row
    const aIn = sstep(0.03, 0.09, p);                                  // hero text leaves first
    const cIn = sstep(0.10, 0.16, p), cOut = sstep(0.84, 0.885, p);    // then the copy arrives, and leaves before the outro
    const aOut = sstep(0.895, 0.95, p);
    const f = fOf(p);
    const live = a2 * (1 - a3), copyLive = cIn * (1 - cOut);
    const rowness = 1 - live;                                          // 1 on the line-up, 0 mid-walk
    const hoverMax = Math.max(...hv.map(v => v.h));

    springs.forEach((el, i) => {
      const r = rowPos(i), w = walkPos(i, f), v = hv[i];
      const x = lerp(r.x, w.x, live), y = lerp(r.y, w.y, live), k = lerp(r.k, w.k, live);
      const dim = rowness * hoverMax * (1 - v.h) * 0.35;               // on the line-up, the others step back
      place(el, i, x, y, k);
      el.style.opacity = lerp(1, w.o, live).toFixed(3);
      el.style.filter = dim > 0.004 ? `saturate(${(1 - dim * 1.6).toFixed(3)}) brightness(${(1 + dim * 0.12).toFixed(3)}) contrast(${(1 - dim * 0.4).toFixed(3)})` : '';
      el.style.zIndex = Math.round(lerp(r.z, w.z, live)) + (v.h > 0.5 ? 30 : 0);

      /* the spring: scroll-driven, plus a bloom while its can is hovered */
      const pScroll = clamp(1 - Math.abs(i - f) * 1.8) * live;
      place(pools[i], i, x, y, k * (1 + v.h * (0.045 + 0.06 * rowness)));
      pools[i].style.opacity = Math.min(1, Math.max(pScroll, v.h * 0.95 * rowness)).toFixed(3);

      /* the can itself: tilt toward the pointer, lift off the floor, light rolls across */
      lifts[i].style.transform = `translate3d(0,${(-4.2 * v.h).toFixed(2)}%,0) rotateY(${(v.x * 15 * v.h).toFixed(2)}deg) rotateX(${(-v.y * 6 * v.h).toFixed(2)}deg) rotateZ(${(-v.x * 1.4 * v.h).toFixed(2)}deg)`;
      sheens[i].style.opacity = (v.h * 0.85).toFixed(3);
      sheens[i].style.backgroundPosition = `${(50 - v.x * 46).toFixed(1)}% 0`;
      shades[i].style.opacity = (v.h * 0.7).toFixed(3);
      shades[i].style.backgroundPosition = `${(50 - v.x * 30).toFixed(1)}% 0`;
      shadows[i].style.transform = `scale(${(1 - v.h * 0.16).toFixed(3)},${(1 - v.h * 0.1).toFixed(3)})`;
      shadows[i].style.opacity = (1 - v.h * 0.45).toFixed(3);
    });

    const c0 = inks[Math.floor(f)], c1 = inks[Math.min(N - 1, Math.floor(f) + 1)], m = f - Math.floor(f);
    const ink = c0.map((v, j) => lerp(v, c1[j], m));
    const tint = 0.11 * live;   // the room takes the spring's ink: written straight to the stage, no inherited CSS vars
    stage.style.backgroundColor = `rgb(${GUFA.map((g, j) => Math.round(lerp(g, ink[j], tint))).join(',')})`;

    copies.forEach((c, i) => {
      const o = clamp(1 - Math.abs(i - f) * 2.6) * copyLive;
      c.style.opacity = o.toFixed(3);
      c.style.transform = `translateY(${((i - f) * 40).toFixed(1)}px)`;
      c.classList.toggle('on', o > 0.5);
    });
    intro.style.opacity = (1 - aIn).toFixed(3);
    intro.style.transform = `translateY(calc(-44% - ${(aIn * 40).toFixed(1)}px))`;
    intro.style.visibility = aIn > 0.99 ? 'hidden' : '';
    outro.style.opacity = aOut.toFixed(3);
    outro.style.transform = `translateY(calc(-44% + ${((1 - aOut) * 30).toFixed(1)}px))`;
    outro.style.pointerEvents = aOut > 0.5 ? 'auto' : 'none';
    outro.style.visibility = aOut < 0.01 ? 'hidden' : '';
    index.style.opacity = copyLive.toFixed(3);
    index.style.pointerEvents = copyLive > 0.5 ? 'auto' : 'none';
    const act = Math.round(f);
    idxBtns.forEach((b, i) => { b.classList.toggle('on', i === act); b.setAttribute('aria-current', i === act ? 'true' : 'false'); });
  }

  idxBtns.forEach((b, i) => b.addEventListener('click', () => goto(i)));
  measure();
  gsap.ticker.add((t, dt) => frame(dt));
  addEventListener('resize', () => { measure(); last = -1; ScrollTrigger.refresh(); });
  wide.addEventListener('change', () => location.reload());
})();
