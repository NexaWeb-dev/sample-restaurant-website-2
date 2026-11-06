'use strict';
(() => {
  const IMG = {
    'hero-dining-room': [2200, 1467, '1517248135467-4c7edcad34c4'],
    'cafe-street-exterior': [1600, 1067, '1559925393-8be0ec4767c8'],
    'cafe-seating': [1600, 1067, '1521017432531-fbd92d768814'],
    'dining-room-window': [1400, 934, '1550966871-3ed3cdb5ed0c'],
    'plated-dish': [1400, 933, '1414235077428-338989a2e8c0'],
    'lattes': [1400, 2100, '1509042239860-f550ce710b93'],
    'chocolate-cake': [1400, 1030, '1578985545062-69928b1d9587'],
    'sharing-plates': [1600, 1200, '1466978913421-dad2ebd01d17'],
    'coffee-cheers': [1200, 800, '1495474472287-4d71bcdd2085'],
    'cafe-bar-interior': [1400, 1050, '1514933651103-005eec06c04b'],
    'breakfast-table': [1200, 800, '1424847651672-bf20a4b0982b'],
    'ambience-interior': [1800, 1350, '1555396273-367ea4eb4db5'],
    'steak-fries': [1400, 933, '1600891964092-4316c288032e'],
    'pancakes': [1400, 1692, '1567620905732-2d1ec7ab7445'],
    'egg-toast': [1000, 1000, '1525351484163-7529414344d8'],
    'grain-bowl': [1000, 667, '1512621776951-a57141f2eefd'],
    'panna-cotta': [1000, 1500, '1488477181946-6428a0291777'],
    'pork-chop': [1000, 662, '1432139555190-58524dae6a55']
  };
  const src = n => `assets/images/${n}.jpg`;
  // Explicit width/height prevent layout shift; data-fb is a remote fallback used only if the local file fails.
  const imgTag = (n, alt, lazy = true) => `<img src="${src(n)}" width="${IMG[n][0]}" height="${IMG[n][1]}" alt="${alt}" data-fb="https://images.unsplash.com/photo-${IMG[n][2]}?auto=format&fit=max&w=1600&q=78"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const inr = n => '₹' + n.toLocaleString('en-IN');
  const vegMark = '<span class="veg" title="Vegetarian" aria-label="Vegetarian"></span>';

  /* =====================================================
     DATA
  ===================================================== */
  const features = [
    { name: 'Grilled <em>Ribeye</em>', cat: 'Main Course', price: 1850, img: 'steak-fries', alt: 'Grilled steak served with crisp fries on a white plate',
      desc: 'Dry-aged for thirty days and finished over embers. Bone-marrow butter melts into a shallot jus we reduce for six hours.' },
    { name: 'Dark Chocolate <em>Torte</em>', cat: 'Desserts', price: 480, veg: true, img: 'chocolate-cake', alt: 'Dark chocolate cake with ganache drip',
      desc: 'Single-origin chocolate, a whisper of sea salt and cold crème fraîche to cut through the richness. Baked each morning.' },
    { name: 'Saffron Pancake <em>Stack</em>', cat: 'Breakfast', price: 520, veg: true, img: 'pancakes', alt: 'Stack of pancakes with berries and syrup',
      desc: 'Feather-light buttermilk pancakes with saffron cream, poached pear and warm maple — our weekend ritual.' }
  ];

  const dishes = [
    { name: 'Slow Eggs & Sourdough', cat: 'Breakfast', price: 460, veg: true, img: 'egg-toast', alt: 'Eggs served on toasted sourdough with greens', desc: 'Soft-set eggs, whipped feta, herb oil, grilled sourdough.' },
    { name: 'Charred Pork Chop', cat: 'Main Course', price: 1650, chef: true, img: 'pork-chop', alt: 'Seared pork chop with caramelised apple and grilled broccolini', desc: 'Caramelised apple, grilled broccolini, mustard jus.' },
    { name: 'Garden Grain Bowl', cat: 'Main Course', price: 680, veg: true, img: 'grain-bowl', alt: 'Colourful bowl of grains and fresh vegetables', desc: 'Ancient grains, roasted roots, tahini, pickled onion.' },
    { name: 'Strawberry Panna Cotta', cat: 'Desserts', price: 450, veg: true, img: 'panna-cotta', alt: 'Vanilla panna cotta in glass jars with fresh strawberries', desc: 'Vanilla bean panna cotta, macerated strawberries, basil.' },
    { name: 'Signature Flat White', cat: 'Beverages', price: 260, veg: true, chef: true, img: 'lattes', alt: 'Flat white and latte with leaf latte art on a wooden table', desc: 'Double ristretto from our house blend, silky steamed milk.' }
  ];

  // [name, description, price, vegetarian, chef's pick]
  const menu = [
    ['Starters', 'To begin, and to share.', [
      ['Burrata & Heirloom Tomato', 'Basil oil, aged balsamic, toasted focaccia.', 620, 1, 1],
      ['Wild Mushroom Velouté', 'Roasted hazelnut, chive oil, sourdough crisp.', 480, 1],
      ['Seared Scallops', 'Cauliflower purée, caper raisin, brown butter.', 890, 0],
      ['Charred Beetroot Salad', 'Whipped goat cheese, walnut, pomegranate.', 540, 1]]],
    ['Breakfast', 'Served until 12 noon.', [
      ['Saffron Pancake Stack', 'Buttermilk pancakes, saffron cream, maple.', 520, 1, 1],
      ['Slow Eggs & Sourdough', 'Whipped feta, herb oil, grilled sourdough.', 460, 1],
      ['Smashed Avocado Toast', 'Chilli crumb, lime, poached egg, seeds.', 480, 1],
      ['The Aurelia Full Plate', 'Chicken sausage, bacon, eggs, roasted tomato.', 690, 0]]],
    ['Main Course', 'From the grill and the oven.', [
      ['Grilled Ribeye', 'Bone-marrow butter, shallot jus, greens.', 1850, 0, 1],
      ['Charred Pork Chop', 'Caramelised apple, grilled broccolini, mustard jus.', 1650, 0],
      ['Pan-Seared Sea Bass', 'Saffron beurre blanc, fennel, samphire.', 1450, 0],
      ['Garden Grain Bowl', 'Ancient grains, roasted roots, tahini.', 680, 1]]],
    ['Pizza & Pasta', 'Hand-rolled, slow-fermented.', [
      ['Margherita Verace', 'San Marzano, fior di latte, basil, 48-hour dough.', 720, 1],
      ['Truffle Funghi Pizza', 'Wild mushrooms, taleggio, truffle oil.', 890, 1, 1],
      ['Tagliatelle al Ragù', 'Slow-cooked beef ragù, parmigiano.', 820, 0],
      ['Cacio e Pepe', 'Hand-rolled spaghetti, pecorino, black pepper.', 690, 1]]],
    ['Desserts', 'Baked and finished each day.', [
      ['Dark Chocolate Torte', 'Sea salt, crème fraîche.', 480, 1, 1],
      ['Strawberry Panna Cotta', 'Vanilla bean, macerated strawberries, basil.', 450, 1],
      ['Tiramisù Classico', 'Mascarpone, espresso-soaked savoiardi, cocoa.', 420, 1],
      ['Burnt Basque Cheesecake', 'Caramelised top, salted caramel.', 440, 1]]],
    ['Coffee & Beverages', 'Roasted for us, poured by hand.', [
      ['Espresso / Doppio', 'Our house blend, medium roast.', 190, 1],
      ['Flat White', 'Double ristretto, silky steamed milk.', 260, 1, 1],
      ['Single-Origin Pour-Over', 'Brewed by hand, rotating estate.', 340, 1],
      ['Cardamom Cold Brew', '18-hour steep, orange peel, tonic.', 320, 1],
      ['Ceremonial Matcha Latte', 'Stone-ground matcha, oat or whole milk.', 360, 1],
      ['Fresh Pressed Juice', 'Seasonal fruit, pressed to order.', 280, 1]]]
  ];

  const gallery = [
    ['g1', 'cafe-street-exterior', 'Restaurant exterior', 'Our entrance on Linking Road'],
    ['g2', 'cafe-seating', 'Interior seating', 'Seating in the café'],
    ['g3', 'dining-room-window', 'Dining room by the window', 'Dining room by the window'],
    ['g4', 'plated-dish', 'Signature dish', 'A plate leaving the pass'],
    ['g5', 'lattes', 'Coffee preparation', 'Lattes, poured to order'],
    ['g6', 'chocolate-cake', 'Desserts', 'Chocolate cake from our pastry kitchen'],
    ['g7', 'sharing-plates', 'Dining experience', 'Sharing plates at the table'],
    ['g8', 'coffee-cheers', 'Coffee served', 'Coffee, served slowly']
  ];

  // Placeholder copy only — NOT real reviews.
  const reviews = [
    { t: 'The kind of place where nobody rushes you. The room is quietly beautiful and the food is calm and confident.', n: 'Sample review 01' },
    { t: 'Coffee poured with real care, and a dessert worth planning the whole visit around.', n: 'Sample review 02' },
    { t: 'Every small detail was handled before we had to ask. A restaurant that understands hospitality.', n: 'Sample review 03' }
  ];

  /* Weekly hours, index = Date.getDay() (0 Sun). Times are 24h; close 24 = midnight. null = closed. */
  const hours = [[8, 24], [8, 23], null, [8, 23], [8, 23], [8, 24], [8, 24]];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /* =====================================================
     SIGNATURE FEATURES + FILTERABLE DISHES
  ===================================================== */
  $('#features').innerHTML = features.map((d, i) => `
    <article class="feature f${i + 1}">
      <div class="feature__img mask">${imgTag(d.img, d.alt)}</div>
      <span class="feature__num" aria-hidden="true">0${i + 1}</span>
      <div class="feature__body reveal">
        <p class="feature__cat">${d.cat} <span class="chef-tag">Chef's pick</span></p>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="feature__meta"><span class="feature__price">${inr(d.price)}</span>${d.veg ? vegMark : ''}</div>
      </div>
    </article>`).join('');

  $('#dishes').innerHTML = dishes.map(d => `
    <article class="dish" data-cat="${d.cat}">
      <div class="dish__img">${imgTag(d.img, d.alt)}${d.chef ? '<span class="chef-tag">Chef\'s pick</span>' : ''}</div>
      <div class="dish__row"><h4>${d.veg ? vegMark : ''}${d.name}</h4><span class="dish__price">${inr(d.price)}</span></div>
      <p>${d.desc}</p>
    </article>`).join('');

  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#filters button').forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
    const f = b.dataset.filter;
    $$('.dish').forEach(d => {
      const showIt = f === 'all' || d.dataset.cat === f;
      d.classList.toggle('is-hidden', !showIt);
      d.classList.remove('is-in');
      if (showIt) { void d.offsetWidth; d.classList.add('is-in'); }
    });
  });

  /* =====================================================
     FULL MENU
  ===================================================== */
  $('#fullMenu').innerHTML = menu.map(([cat, blurb, items], i) => `
    <div class="mcat reveal">
      <div class="mcat__head"><span class="mcat__num">0${i + 1}</span><h3>${cat}</h3><p>${blurb}</p></div>
      <div class="mcat__items">
        ${items.map(([n, d, p, v, c]) => `
        <div class="item${c ? ' item--chef' : ''}">
          <div class="item__row"><h4>${v ? vegMark : ''}${n}</h4><span class="item__dots"></span><span class="item__price">${inr(p)}</span></div>
          <p>${d}</p>${c ? '<span class="chef-mark">★ Chef\'s pick</span>' : ''}
        </div>`).join('')}
      </div>
    </div>`).join('');

  /* =====================================================
     GALLERY + LIGHTBOX
  ===================================================== */
  const gal = $('#galleryGrid');
  gal.innerHTML = gallery.map(([c, id, alt], i) => `
    <figure class="${c} mask" data-i="${i}" tabindex="0" role="button" aria-label="Open image: ${alt}">
      ${imgTag(id, alt)}
    </figure>`).join('');

  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let cur = 0, lastFocus = null;
  const showLb = i => {
    cur = (i + gallery.length) % gallery.length;
    const [, id, alt, cap] = gallery[cur];
    lbImg.style.opacity = 0;
    lbImg.onload = () => (lbImg.style.opacity = 1);
    lbImg.src = src(id); lbImg.alt = alt; lbCap.textContent = cap;
  };
  const openLb = i => { lastFocus = document.activeElement; lb.hidden = false; requestAnimationFrame(() => lb.classList.add('is-open')); showLb(i); document.body.style.overflow = 'hidden'; $('#lbClose').focus(); };
  const closeLb = () => { lb.classList.remove('is-open'); setTimeout(() => (lb.hidden = true), 350); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  gal.addEventListener('click', e => { const f = e.target.closest('figure'); if (f) openLb(+f.dataset.i); });
  gal.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('figure')) { e.preventDefault(); openLb(+e.target.dataset.i); } });
  $('#lbClose').onclick = closeLb;
  $('#lbPrev').onclick = () => showLb(cur - 1);
  $('#lbNext').onclick = () => showLb(cur + 1);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showLb(cur - 1);
    if (e.key === 'ArrowRight') showLb(cur + 1);
  });

  /* =====================================================
     REVIEWS SLIDER (placeholder content)
  ===================================================== */
  const track = $('#sliderTrack'), bar = $('#bar'), count = $('#count');
  track.innerHTML = reviews.map(r => `
    <figure class="review">
      <span class="review__mark" aria-hidden="true">“</span>
      <blockquote>${r.t}</blockquote>
      <cite>${r.n}<span>Placeholder text · not a real review</span></cite>
    </figure>`).join('');
  let idx = 0, timer;
  const pad = n => String(n).padStart(2, '0');
  const go = i => {
    idx = (i + reviews.length) % reviews.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    count.textContent = `${pad(idx + 1)} / ${pad(reviews.length)}`;
    bar.classList.remove('run'); void bar.offsetWidth;
    if (!reduced) bar.classList.add('run');
  };
  const auto = () => { clearInterval(timer); if (!reduced) timer = setInterval(() => go(idx + 1), 7000); };
  $('#prev').onclick = () => { go(idx - 1); auto(); };
  $('#next').onclick = () => { go(idx + 1); auto(); };
  let sx = 0;
  const sl = $('#slider');
  sl.addEventListener('touchstart', e => (sx = e.touches[0].clientX), { passive: true });
  sl.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) { go(idx + (dx < 0 ? 1 : -1)); auto(); } });
  go(0); auto();

  /* =====================================================
     OPENING HOURS + OPEN-NOW (Asia/Kolkata)
  ===================================================== */
  const fmt = h => { const hh = h % 24; const s = hh < 12 ? 'am' : 'pm'; return `${((hh + 11) % 12) + 1}:00 ${s}`.replace(':00', '') ; };
  const fmtT = h => (h === 24 ? 'Midnight' : fmt(h));
  const nowIST = () => {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const get = t => p.find(x => x.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, t: (+get('hour') % 24) + (+get('minute')) / 60 };
  };
  const renderHours = () => {
    const { day, t } = nowIST();
    $('#hours').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => {
      const h = hours[d];
      return `<li class="${d === day ? 'is-today' : ''}${h ? '' : ' is-off'}"><span>${dayNames[d]}</span><span>${h ? `${fmtT(h[0])} – ${fmtT(h[1])}` : 'Closed'}</span></li>`;
    }).join('');
    const h = hours[day], badge = $('#openBadge');
    const open = h && t >= h[0] && t < h[1];
    badge.textContent = open ? `Open now · until ${fmtT(h[1])}` : 'Closed now';
    badge.classList.toggle('is-closed', !open);
  };
  renderHours();

  /* =====================================================
     NAV, BURGER, BACK TO TOP, PARALLAX
  ===================================================== */
  const nav = $('#nav'), links = $('#navLinks'), burger = $('#burger'), toTop = $('#toTop'), heroBg = $('#heroBg');
  const setMenu = open => {
    links.classList.toggle('is-open', open);
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.onclick = () => setMenu(burger.getAttribute('aria-expanded') !== 'true');
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Parallax targets — only those near the viewport are updated
  const px = $$('[data-parallax]');
  const visiblePx = new Set();
  const pxIO = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visiblePx.add(e.target) : visiblePx.delete(e.target)), { rootMargin: '15% 0px' });
  px.forEach(el => pxIO.observe(el));

  let lastY = 0, ticking = false;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-solid', y > 60);
    toTop.classList.toggle('is-show', y > 700);
    if (!nav.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > lastY + 4 && y > 500 ? true : (y < lastY - 4 ? false : nav.classList.contains('is-hidden')));
    lastY = y;
    if (!reduced) {
      if (y < innerHeight * 1.2) heroBg.style.transform = `translate3d(0,${y * 0.28}px,0)`;
      visiblePx.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        const d = (r.top + r.height / 2) - innerHeight / 2;
        el.style.translate = `0 ${(-d * parseFloat(el.dataset.parallax)).toFixed(1)}px`;
      });
    }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
  toTop.onclick = () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  // Active link highlight
  const linkMap = new Map($$('a[href^="#"]', links).map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { linkMap.forEach(a => a.classList.remove('is-current')); const a = linkMap.get(e.target.id); a && !a.classList.contains('btn') && a.classList.add('is-current'); }
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  /* =====================================================
     REVEAL + COUNTERS
  ===================================================== */
  const countUp = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '';
    if (reduced) { el.textContent = end + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const step = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-visible');
    $$('[data-count]', e.target).forEach(countUp);
    io.unobserve(e.target);
  }), { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal, .mask').forEach((el, i) => { if (el.classList.contains('reveal')) el.style.transitionDelay = (i % 3) * 80 + 'ms'; io.observe(el); });
  // Fallback: never leave content hidden if IntersectionObserver misses an element
  const pending = new Set($$('.reveal, .mask'));
  const scanReveal = () => {
    pending.forEach(el => {
      if (el.classList.contains('is-visible')) return pending.delete(el);
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.96 && r.bottom > 0) { el.classList.add('is-visible'); $$('[data-count]', el).forEach(countUp); pending.delete(el); }
    });
  };
  addEventListener('scroll', scanReveal, { passive: true });
  addEventListener('resize', scanReveal);
  addEventListener('load', scanReveal);
  setTimeout(scanReveal, 1600);

  // Image fallback: if a local file fails, try the remote copy once; otherwise tidy up the tile
  document.addEventListener('error', e => {
    const im = e.target;
    if (!(im instanceof HTMLImageElement)) return;
    if (im.dataset.fb && !im.dataset.tried) { im.dataset.tried = '1'; im.src = im.dataset.fb; return; }
    const box = im.closest('figure, .dish, .feature__img, .story__main, .story__small');
    if (box && box.matches('figure')) box.hidden = true;
  }, true);

  /* =====================================================
     RESERVATION FORM
  ===================================================== */
  const form = $('#resForm'), dateIn = $('#date'), timeIn = $('#time');
  const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateIn.min = iso(new Date());
  const max = new Date(); max.setDate(max.getDate() + 90); dateIn.max = iso(max);
  for (let h = 8; h <= 22; h++) for (const m of [0, 30]) {
    if (h === 22 && m) continue;
    const v = `${String(h).padStart(2, '0')}:${m ? '30' : '00'}`;
    const label = `${((h + 11) % 12) + 1}:${m ? '30' : '00'} ${h < 12 ? 'am' : 'pm'}`;
    timeIn.insertAdjacentHTML('beforeend', `<option value="${v}">${label}</option>`);
  }

  const rules = {
    name: v => v.trim().length < 2 ? 'Please enter your full name.' : '',
    phone: v => { const d = v.replace(/\D/g, ''); return /^[+\d][\d\s\-()+]*$/.test(v.trim()) && d.length >= 10 && d.length <= 13 ? '' : 'Enter a valid phone number (10–13 digits).'; },
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address.',
    guests: v => v ? '' : 'Select the number of guests.',
    date: v => {
      if (!v) return 'Choose a date.';
      if (v < iso(new Date())) return 'Date cannot be in the past.';
      return new Date(v + 'T00:00').getDay() === 2 ? 'We are closed on Tuesdays — please choose another day.' : '';
    },
    time: v => v ? '' : 'Choose a time.'
  };
  const check = el => {
    const msg = rules[el.name](el.value);
    const f = el.closest('.field');
    f.classList.toggle('has-error', !!msg);
    f.classList.toggle('is-valid', !msg && !!el.value);
    $('.err', f).textContent = msg;
    el.setAttribute('aria-invalid', !!msg);
    return !msg;
  };
  Object.keys(rules).forEach(n => {
    const el = form.elements[n];
    el.addEventListener('blur', () => el.value && check(el));
    el.addEventListener('change', () => check(el));
    el.addEventListener('input', () => el.closest('.field').classList.contains('has-error') && check(el));
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = Object.keys(rules).map(n => form.elements[n]).filter(el => !check(el));
    const box = $('#confirm');
    if (bad.length) { bad[0].focus(); box.hidden = true; return; }
    const when = new Date(dateIn.value + 'T00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    box.innerHTML = `<strong>Thank you, ${esc(form.name.value.trim().split(' ')[0])}.</strong>Your request for ${form.guests.value} guest${form.guests.value > 1 ? 's' : ''} on ${when} at ${timeIn.selectedOptions[0].textContent} has been noted.<br><em>Demo only — nothing was sent. A live site would need a backend or booking service to confirm tables.</em>`;
    box.hidden = false;
    box.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
    form.reset();
    $$('.field', form).forEach(f => f.classList.remove('is-valid', 'has-error'));
  });

  /* =====================================================
     NEWSLETTER + FOOTER YEAR
  ===================================================== */
  $('#newsForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#newsEmail').value.trim(), m = $('#newsMsg');
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { m.textContent = 'Thank you — demo only, no email was stored.'; e.target.reset(); }
    else m.textContent = 'Please enter a valid email address.';
  });
  $('#year').textContent = new Date().getFullYear();

  /* =====================================================
     HERO TITLE SPLIT + PAGE LOAD CURTAIN
  ===================================================== */
  const title = $('#heroTitle');
  title.setAttribute('aria-label', title.textContent);
  title.innerHTML = [...title.textContent].map((c, i) => `<span class="ch" style="--i:${i}" aria-hidden="true">${c}</span>`).join('');

  const loader = $('#loader');
  const start = () => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    loader.classList.add('is-done');
  };
  const minWait = new Promise(r => setTimeout(r, reduced ? 0 : 1300));
  const heroImg = heroBg.querySelector('img');
  const heroLoaded = new Promise(r => { if (heroImg.complete) return r(); heroImg.addEventListener('load', r); heroImg.addEventListener('error', r); setTimeout(r, 3500); });
  Promise.all([minWait, heroLoaded]).then(start);
})();
