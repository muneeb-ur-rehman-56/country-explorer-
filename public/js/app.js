import { PEAKS, POSITIVES, PROVINCES, CITIES, CATS, PLACES } from './data.js';
const $ = s => document.querySelector(s);
const api = async u => { const r = await fetch(u); if (!r.ok) throw new Error(r.status); return r.json(); };
const fmt = n => new Intl.NumberFormat('en').format(n);
const SIZES = [250, 330, 500, 960, 1280, 1920]; // widths Wikimedia allows
const big = (u, w = 960) => u ? u.replace(/\/\d+px-/, `/${SIZES.find(x => x >= w) || 1920}px-`) : '';
const wmo = c => c === 0 ? 'Clear' : c <= 3 ? 'Partly cloudy' : c <= 48 ? 'Fog' : c <= 67 ? 'Rain' : c <= 77 ? 'Snow' : c <= 82 ? 'Showers' : c <= 86 ? 'Snow showers' : 'Thunderstorm';
const wiki = t => api('/api/wiki?title=' + encodeURIComponent(t));

/* Image fallback: retry the original thumbnail, then show a neutral placeholder */
const PH = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"><rect width="400" height="260" fill="#CFE6E8"/><path d="M0 260 L120 110 L190 190 L270 80 L400 260Z" fill="#12795F" opacity=".55"/></svg>');
document.addEventListener('error', e => {
  const i = e.target; if (i.tagName !== 'IMG' || i.dataset.done) return;
  if (i.dataset.orig && i.src !== i.dataset.orig) i.src = i.dataset.orig; else { i.dataset.done = 1; i.src = PH; }
}, true);

/* Elevation ribbon: sea level to K2 */
function ribbon() {
  const W = 1000, H = 280, n = PEAKS.length, max = 8611;
  const pts = PEAKS.map(([name, m], i) => [60 + i * (880 / (n - 1)), 240 - (m / max) * 175, name, m]);
  const line = pts.map(p => p[0] + ',' + p[1]).join(' ');
  $('#ribbon').innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="min-w-[900px] w-full" role="img" aria-label="Elevation from Gwadar at sea level to K2 at 8,611 metres">
   <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4A340" stop-opacity=".55"/><stop offset="1" stop-color="#F4A340" stop-opacity="0"/></linearGradient></defs>
   <polygon points="60,250 ${line} 940,250" fill="url(#g)"/><polyline points="${line}" fill="none" stroke="#F4A340" stroke-width="2.5"/>
   ${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="#F6F9F8"/><text x="${p[0]}" y="${p[1] - 26}" text-anchor="middle" fill="#fff" font-size="12.5" font-weight="600">${p[2]}</text><text x="${p[0]}" y="${p[1] - 11}" text-anchor="middle" fill="#CFE6E8" font-size="11">${fmt(p[3])} m</text>`).join('')}</svg>`;
}

/* Live country facts (REST Countries) */
async function facts() {
  let d, live = true;
  try { d = await api('/api/country'); if (Array.isArray(d)) d = d[0]; }
  catch { live = false; d = { capital:['Islamabad'], population:241499431, area:881913, currencies:{PKR:{name:'Pakistani rupee',symbol:'₨'}}, languages:{urd:'Urdu',eng:'English'}, borders:['AFG','CHN','IND','IRN'], flags:{svg:''}, timezones:['UTC+05:00'] }; }
  const nb = { AFG:'Afghanistan', CHN:'China', IND:'India', IRN:'Iran' };
  const cur = Object.values(d.currencies || {})[0] || {};
  const rows = [['Capital', d.capital[0]], ['Population', fmt(d.population)], ['Area', fmt(d.area) + ' km²'], ['Currency', `${cur.name} (${cur.symbol})`], ['Languages', Object.values(d.languages).slice(0, 4).join(', ')], ['Neighbours', (d.borders || []).map(b => nb[b] || b).join(', ')]];
  $('#facts').innerHTML = (d.flags.svg ? `<img src="${d.flags.svg}" alt="Flag of Pakistan" class="h-16 w-auto rounded shadow col-span-2 md:col-span-1 self-center">` : '') +
    rows.map(([k, v]) => `<div><dt class="text-sm text-ink/60">${k}</dt><dd class="font-display text-xl font-semibold mt-1">${v}</dd></div>`).join('');
  $('#src').textContent = live ? 'Live data: REST Countries API' : 'Offline fallback data';
}

/* Why Pakistan: one lead statement + five supporting points */
function positives() {
  const [lead, ...rest] = POSITIVES;
  $('#why-grid').innerHTML = `<div class="lg:col-span-2 lg:row-span-2 bg-pine text-white rounded-3xl p-8 md:p-10"><h3 class="font-display text-3xl md:text-4xl font-bold">${lead[0]}</h3><p class="mt-4 text-glacier text-lg max-w-md">${lead[1]}</p></div>` +
    rest.map(p => `<div class="bg-white rounded-2xl p-6 border border-pine/10"><h3 class="font-display text-xl font-semibold">${p[0]}</h3><p class="mt-2 text-ink/70">${p[1]}</p></div>`).join('');
}

/* Provinces with Wikipedia summary + image */
function provinces() {
  $('#tabs').innerHTML = PROVINCES.map((p, i) => `<button role="tab" class="tab text-left px-4 py-3 rounded-xl font-medium bg-white border border-pine/10 hover:border-emerald" data-i="${i}" aria-selected="${i === 0}">${p.n}</button>`).join('');
  $('#tabs').onclick = e => { const b = e.target.closest('.tab'); if (b) show(+b.dataset.i); };
  async function show(i) {
    const p = PROVINCES[i];
    document.querySelectorAll('.tab').forEach((t, j) => t.setAttribute('aria-selected', j === i));
    $('#prov').innerHTML = `<div id="pimg" class="skeleton h-64 md:h-80 w-full"></div><div class="p-6 md:p-8"><h3 class="font-display text-3xl font-bold">${p.n}</h3><p class="text-ink/70 mt-1">${p.tag}</p>
     <dl class="grid grid-cols-3 gap-4 my-6"><div><dt class="text-sm text-ink/60">Capital</dt><dd class="font-semibold">${p.cap}</dd></div><div><dt class="text-sm text-ink/60">Area</dt><dd class="font-semibold">${p.area}</dd></div><div><dt class="text-sm text-ink/60">Population</dt><dd class="font-semibold">${p.pop}</dd></div></dl>
     <p id="pext" class="text-ink/80 max-w-prose"></p><div class="flex flex-wrap gap-2 mt-5">${p.hl.map(h => `<span class="px-3 py-1 rounded-full bg-glacier text-pine text-sm">${h}</span>`).join('')}</div></div>`;
    try { const w = await wiki(p.w); if (!$('#pext') || $('#prov h3').textContent !== p.n) return; $('#pext').textContent = w.extract.split('. ').slice(0, 3).join('. ') + '.';
      if (w.thumbnail) $('#pimg').outerHTML = `<img data-orig="${w.thumbnail.source}" referrerpolicy="no-referrer" src="${big(w.thumbnail.source, 960)}" alt="${p.n}" class="h-64 md:h-80 w-full object-cover">`; else $('#pimg').remove(); }
    catch { const im = $('#pimg'); if (im) im.remove(); }
  }
  show(0);
}

/* Cities with live weather (Open-Meteo) */
async function cities() {
  $('#city-grid').innerHTML = CITIES.map((c, i) => `<button data-c="${i}" class="text-left bg-white rounded-2xl p-5 border border-pine/10 hover:border-emerald hover:shadow-lg transition"><div class="flex justify-between items-start"><div><h3 class="font-display text-xl font-semibold">${c.n}</h3><p class="text-sm text-ink/60">${c.sub}</p></div><div class="text-right"><div class="font-display text-3xl font-bold text-emerald" id="t${i}">–°</div><div class="text-xs text-ink/60" id="w${i}">Loading</div></div></div><p class="mt-3 text-sm text-ink/75">${c.b}</p></button>`).join('');
  $('#city-grid').onclick = e => { const b = e.target.closest('[data-c]'); if (b) openModal(CITIES[b.dataset.c]); };
  try {
    let w = await api(`/api/weather?lat=${CITIES.map(c => c.lat)}&lon=${CITIES.map(c => c.lon)}`); if (!Array.isArray(w)) w = [w];
    w.forEach((x, i) => { $('#t' + i).textContent = Math.round(x.current.temperature_2m) + '°C'; $('#w' + i).textContent = wmo(x.current.weather_code) + ' · ' + x.current.relative_humidity_2m + '% humidity'; });
  } catch { CITIES.forEach((_, i) => $('#w' + i).textContent = 'Weather unavailable'); }
}

/* Places with filter, search, lazy images */
let cat = 'All';
function places() {
  $('#chips').innerHTML = CATS.map(c => `<button class="chip px-4 py-2 rounded-full border border-pine/20 bg-white text-sm font-medium" aria-pressed="${c === cat}" data-cat="${c}">${c}</button>`).join('');
  $('#chips').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; cat = b.dataset.cat; places(); };
  const q = $('#search').value.toLowerCase();
  const list = PLACES.filter(p => (cat === 'All' || p.cat === cat) && (p.n + p.sub).toLowerCase().includes(q));
  $('#place-grid').innerHTML = list.length ? list.map(p => `<article><button data-p="${PLACES.indexOf(p)}" class="group w-full text-left bg-white rounded-2xl overflow-hidden border border-pine/10 hover:shadow-xl transition"><div class="skeleton h-52 overflow-hidden" data-w="${p.w}"></div><div class="p-5"><p class="text-sm text-emerald font-medium">${p.cat} · ${p.sub}</p><h3 class="font-display text-xl font-semibold mt-1">${p.n}</h3><p class="text-sm text-ink/70 mt-2">${p.b}</p><p class="text-sm mt-3 font-medium">Best time: ${p.best}</p></div></button></article>`).join('')
    : '<p class="col-span-full text-ink/70">No places match your search. Try another name or province.</p>';
  const io = new IntersectionObserver(es => es.forEach(async en => { if (!en.isIntersecting) return; io.unobserve(en.target); const el = en.target;
    try { const w = await wiki(el.dataset.w); if (w.thumbnail) el.innerHTML = `<img loading="lazy" data-orig="${w.thumbnail.source}" referrerpolicy="no-referrer" src="${big(w.thumbnail.source, 500)}" alt="${el.dataset.w.replace(/_/g, ' ')}" class="h-full w-full object-cover group-hover:scale-105 transition duration-500">`; } catch {} }), { rootMargin: '200px' });
  document.querySelectorAll('[data-w]').forEach(el => io.observe(el));
}
$('#place-grid').onclick = e => { const b = e.target.closest('[data-p]'); if (b) openModal(PLACES[b.dataset.p]); };
$('#search').oninput = places;

/* Detail dialog: Wikipedia summary + 5-day forecast */
async function openModal(it) {
  const d = $('#modal');
  $('#m-body').innerHTML = `<div class="skeleton h-64"></div><div class="p-6"><h3 class="font-display text-3xl font-bold">${it.n}</h3><p class="text-ink/60">${it.sub}</p><p class="mt-4 text-ink/70">Loading live details…</p></div>`;
  d.showModal();
  const [w, f] = await Promise.allSettled([wiki(it.w), api(`/api/weather?lat=${it.lat}&lon=${it.lon}&forecast=1`)]);
  const W = w.value, F = f.value;
  $('#m-body').innerHTML = `${W && W.thumbnail ? `<img data-orig="${W.thumbnail.source}" referrerpolicy="no-referrer" src="${big(W.thumbnail.source, 960)}" alt="${it.n}" class="h-64 w-full object-cover">` : ''}
   <div class="p-6 md:p-8"><h3 class="font-display text-3xl font-bold">${it.n}</h3><p class="text-ink/60">${it.sub}</p>
   <p class="mt-4 max-w-prose text-ink/85">${W ? W.extract : it.b}</p>
   ${W && W.content_urls ? `<a class="inline-block mt-3 text-emerald underline" href="${W.content_urls.desktop.page}" target="_blank" rel="noopener">Read more on Wikipedia</a>` : ''}
   ${F ? `<h4 class="font-display text-lg font-semibold mt-6">Now: ${Math.round(F.current.temperature_2m)}°C, ${wmo(F.current.weather_code)}</h4><div class="grid grid-cols-5 gap-2 mt-3">${F.daily.time.map((t, i) => `<div class="rounded-xl bg-glacier/60 p-3 text-center text-sm"><div class="font-medium">${new Date(t).toLocaleDateString('en', { weekday: 'short' })}</div><div class="text-xs my-1">${wmo(F.daily.weather_code[i])}</div><div>${Math.round(F.daily.temperature_2m_max[i])}° / ${Math.round(F.daily.temperature_2m_min[i])}°</div></div>`).join('')}</div>` : '<p class="mt-5 text-sm text-ink/60">Forecast unavailable right now.</p>'}</div>`;
}
$('#close').onclick = () => $('#modal').close();
$('#modal').onclick = e => { if (e.target.id === 'modal') e.target.close(); };

/* Hero background from Wikipedia (K2) */
wiki('K2').then(w => { if (!w.thumbnail) return; const im = new Image(); const use = u => { $('#hero-img').style.backgroundImage = `url(${u})`; $('#hero-img').style.opacity = .35; };
  im.onload = () => use(im.src); im.onerror = () => { im.onerror = null; im.src = w.thumbnail.source; }; im.src = big(w.thumbnail.source, 1280); }).catch(() => {});
$('#menu').onclick = () => $('#mnav').classList.toggle('hidden');
$('#mnav').onclick = () => $('#mnav').classList.add('hidden');
ribbon(); facts(); positives(); provinces(); cities(); places();
