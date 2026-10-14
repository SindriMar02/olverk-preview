/* Shop grid (filters, sort, deep-linkable #category) and product page (variants, quantity, add). */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const kr = n => n.toLocaleString('de-DE') + ' kr.';
  const { RM, hasGsap } = window.OLV || {};

  /* ---------- grid ---------- */
  const grid = $('[data-grid]');
  if (grid) {
    const tiles = $$('.ptile', grid);
    tiles.forEach((t, i) => (t.dataset.i = i));
    const chips = $$('[data-filter]'), sortSel = $('[data-sort]'), status = $('[data-shop-status]');
    const names = Object.fromEntries(window.OLVERK.cats);
    let cat = 'all';

    function apply(animate = true) {
      const shown = tiles.filter(t => cat === 'all' || t.dataset.cat === cat);
      tiles.forEach(t => (t.hidden = !shown.includes(t)));
      const mode = sortSel.value;
      const order = [...tiles].sort((a, b) => mode === 'low' ? a.dataset.price - b.dataset.price : mode === 'high' ? b.dataset.price - a.dataset.price : a.dataset.i - b.dataset.i);
      order.forEach(t => grid.appendChild(t));
      chips.forEach(c => c.setAttribute('aria-pressed', c.dataset.filter === cat));
      status.textContent = `Showing ${shown.length} ${shown.length === 1 ? 'product' : 'products'}${cat === 'all' ? '' : ' in ' + names[cat]}.`;
      if (animate && hasGsap && !RM) gsap.fromTo(shown, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out', stagger: { each: 0.025, amount: Math.min(0.3, shown.length * 0.025) }, overwrite: true });
      if (hasGsap) ScrollTrigger.refresh();
    }
    chips.forEach(c => c.addEventListener('click', () => {
      cat = c.dataset.filter;
      history.replaceState(null, '', cat === 'all' ? location.pathname : '#' + cat);
      apply();
    }));
    sortSel.addEventListener('change', () => apply());
    const fromHash = () => { const h = location.hash.slice(1); cat = names[h] ? h : 'all'; apply(false); };
    addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ---------- product page ---------- */
  const pdp = $('[data-pdp]');
  if (pdp) {
    const h = pdp.dataset.pdp;
    const priceEl = $('[data-pdp-price]', pdp);
    const radios = $$('input[name="v"]', pdp);
    radios.forEach(r => r.addEventListener('change', () => { priceEl.textContent = kr(+r.dataset.price); }));
    const qty = $('[data-qty] input', pdp);
    $$('[data-step]', pdp).forEach(b => b.addEventListener('click', () => {
      qty.value = Math.max(1, Math.min(20, (parseInt(qty.value, 10) || 1) + +b.dataset.step));
    }));
    qty?.addEventListener('change', () => { qty.value = Math.max(1, Math.min(20, parseInt(qty.value, 10) || 1)); });
    const btn = $('[data-add-pdp]', pdp);
    btn?.addEventListener('click', () => {
      const v = radios.length ? +radios.find(r => r.checked).value : null;
      window.Cart.add(h, v, parseInt(qty.value, 10) || 1);
      btn.textContent = 'Added'; btn.classList.add('is-added');
      setTimeout(() => { btn.textContent = 'Add to cart'; btn.classList.remove('is-added'); }, 1400);
    });
  }
})();
