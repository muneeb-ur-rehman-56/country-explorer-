// Pakistan Explorer - zero-dependency Node.js server (Node 18+).
// Serves /public and proxies 3 free APIs (no keys): REST Countries, Wikipedia, Open-Meteo.
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 3000, PUB = path.join(__dirname, 'public');
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.ico':'image/x-icon' };
const cache = new Map();

async function getJSON(url, ttl) {
  const c = cache.get(url);
  if (c && Date.now() - c.t < ttl) return c.d;
  const r = await fetch(url, { headers: { 'User-Agent': 'PakistanExplorer/1.0 (class project)' }, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error('upstream ' + r.status);
  const d = await r.json();
  cache.set(url, { t: Date.now(), d });
  return d;
}
const isNums = s => /^-?\d+(\.\d+)?(,-?\d+(\.\d+)?)*$/.test(s || '');
const enc = encodeURIComponent;
const WIKI = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

const routes = {
  '/api/country': () => getJSON('https://restcountries.com/v3.1/alpha/PK?fields=name,capital,population,area,languages,currencies,timezones,flags,borders', 36e5),
  '/api/wiki': async q => {
    const t = q.get('title') || '';
    if (!t || t.length > 100) throw new Error('bad title');
    try { return await getJSON(WIKI + enc(t), 864e5); }
    catch (e) { // fall back to a title search
      const s = await getJSON('https://en.wikipedia.org/w/rest.php/v1/search/title?limit=1&q=' + enc(t.replace(/_/g, ' ')), 864e5);
      if (!s.pages || !s.pages.length) throw e;
      return getJSON(WIKI + enc(s.pages[0].key), 864e5);
    }
  },
  '/api/weather': q => {
    const lat = q.get('lat'), lon = q.get('lon');
    if (!isNums(lat) || !isNums(lon)) throw new Error('bad coordinates');
    const f = q.get('forecast') ? '&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5' : '';
    return getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m${f}&timezone=auto`, 6e5);
  }
};

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://localhost');
  const route = routes[u.pathname];
  if (route) {
    try { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(await route(u.searchParams))); }
    catch (e) { res.writeHead(502, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: e.message })); }
    return;
  }
  let file = path.normalize(path.join(PUB, u.pathname === '/' ? 'index.html' : decodeURIComponent(u.pathname)));
  if (!file.startsWith(PUB)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, () => console.log(`Pakistan Explorer running at http://localhost:${PORT}`));
