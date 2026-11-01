
(function () {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('nepal-atlas-theme') || 'light';
  function applyTheme(theme) {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101827' : '#ffffff');
    themeButton.textContent = theme === 'dark' ? '☀ Light mode' : '☾ Dark mode';
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
    localStorage.setItem('nepal-atlas-theme', theme);
  }
  applyTheme(savedTheme);
  themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  const sidebar = document.querySelector('.calendar-sidebar');
  const expandButton = document.getElementById('calendar-expand');
  expandButton.addEventListener('click', () => {
    const expanded = sidebar.classList.toggle('is-expanded');
    expandButton.setAttribute('aria-expanded', String(expanded));
    expandButton.textContent = expanded ? 'Show compact calendar' : 'Expand calendar';
  });
})();

(function () {
const BS_DATA = {
  1975: [31,31,32,32,31,30,30,29,30,29,30,30],
  1976: [31,32,31,32,31,30,30,30,29,29,30,31],
  1977: [30,32,31,32,31,30,30,30,29,30,29,31],
  1978: [31,31,32,31,31,31,30,29,30,29,30,30],
  1979: [31,31,32,32,31,30,30,29,30,29,30,30],
  1980: [31,32,31,32,31,30,30,30,29,29,30,31],
  1981: [31,31,31,32,31,31,29,30,30,29,30,30],
  1982: [31,31,32,31,31,31,30,29,30,29,30,30],
  1983: [31,31,32,32,31,30,30,29,30,29,30,30],
  1984: [31,32,31,32,31,30,30,30,29,29,30,31],
  1985: [31,31,31,32,31,31,29,30,30,29,30,30],
  1986: [31,31,32,31,31,31,30,29,30,29,30,30],
  1987: [31,32,31,32,31,30,30,29,30,29,30,30],
  1988: [31,32,31,32,31,30,30,30,29,29,30,31],
  1989: [31,31,31,32,31,31,29,30,30,29,30,30],
  1990: [31,31,32,31,31,31,30,29,30,29,30,30],
  1991: [31,32,31,32,31,30,30,30,29,29,30,30],
  1992: [31,32,31,32,31,30,30,30,29,30,29,31],
  1993: [31,31,32,31,31,31,30,29,30,29,30,30],
  1994: [31,31,32,31,31,31,30,29,30,29,30,30],
  1995: [31,32,31,32,31,30,30,30,29,29,30,30],
  1996: [31,32,31,32,31,30,30,30,29,30,29,31],
  1997: [31,31,32,31,31,31,30,29,30,29,30,30],
  1998: [31,31,32,31,31,31,30,29,30,29,30,30],
  1999: [31,32,31,32,31,30,30,30,29,29,30,31],
  2000: [30,32,31,32,31,30,30,30,29,30,29,31],
  2001: [31,31,32,31,31,31,30,29,30,29,30,30],
  2002: [31,31,32,32,31,30,30,29,30,29,30,30],
  2003: [31,32,31,32,31,30,30,30,29,29,30,31],
  2004: [30,32,31,32,31,30,30,30,29,30,29,31],
  2005: [31,31,32,31,31,31,30,29,30,29,30,30],
  2006: [31,31,32,32,31,30,30,29,30,29,30,30],
  2007: [31,32,31,32,31,30,30,30,29,29,30,31],
  2008: [31,31,31,32,31,31,29,30,30,29,29,31],
  2009: [31,31,32,31,31,31,30,29,30,29,30,30],
  2010: [31,31,32,32,31,30,30,29,30,29,30,30],
  2011: [31,32,31,32,31,30,30,30,29,29,30,31],
  2012: [31,31,31,32,31,31,29,30,30,29,30,30],
  2013: [31,31,32,31,31,31,30,29,30,29,30,30],
  2014: [31,31,32,32,31,30,30,29,30,29,30,30],
  2015: [31,32,31,32,31,30,30,30,29,29,30,31],
  2016: [31,31,31,32,31,31,29,30,30,29,30,30],
  2017: [31,31,32,31,31,31,30,29,30,29,30,30],
  2018: [31,32,31,32,31,30,30,29,30,29,30,30],
  2019: [31,32,31,32,31,30,30,30,29,30,29,31],
  2020: [31,31,31,32,31,31,30,29,30,29,30,30],
  2021: [31,31,32,31,31,31,30,29,30,29,30,30],
  2022: [31,32,31,32,31,30,30,30,29,29,30,30],
  2023: [31,32,31,32,31,30,30,30,29,30,29,31],
  2024: [31,31,31,32,31,31,30,29,30,29,30,30],
  2025: [31,31,32,31,31,31,30,29,30,29,30,30],
  2026: [31,32,31,32,31,30,30,30,29,29,30,31],
  2027: [30,32,31,32,31,30,30,30,29,30,29,31],
  2028: [31,31,32,31,31,31,30,29,30,29,30,30],
  2029: [31,31,32,31,32,30,30,29,30,29,30,30],
  2030: [31,32,31,32,31,30,30,30,29,29,30,31],
  2031: [30,32,31,32,31,30,30,30,29,30,29,31],
  2032: [31,31,32,31,31,31,30,29,30,29,30,30],
  2033: [31,31,32,32,31,30,30,29,30,29,30,30],
  2034: [31,32,31,32,31,30,30,30,29,29,30,31],
  2035: [30,32,31,32,31,31,29,30,30,29,29,31],
  2036: [31,31,32,31,31,31,30,29,30,29,30,30],
  2037: [31,31,32,32,31,30,30,29,30,29,30,30],
  2038: [31,32,31,32,31,30,30,30,29,29,30,31],
  2039: [31,31,31,32,31,31,29,30,30,29,30,30],
  2040: [31,31,32,31,31,31,30,29,30,29,30,30],
  2041: [31,31,32,32,31,30,30,29,30,29,30,30],
  2042: [31,32,31,32,31,30,30,30,29,29,30,31],
  2043: [31,31,31,32,31,31,29,30,30,29,30,30],
  2044: [31,31,32,31,31,31,30,29,30,29,30,30],
  2045: [31,32,31,32,31,30,30,29,30,29,30,30],
  2046: [31,32,31,32,31,30,30,30,29,29,30,31],
  2047: [31,31,31,32,31,31,30,29,30,29,30,30],
  2048: [31,31,32,31,31,31,30,29,30,29,30,30],
  2049: [31,32,31,32,31,30,30,30,29,29,30,30],
  2050: [31,32,31,32,31,30,30,30,29,30,29,31],
  2051: [31,31,31,32,31,31,30,29,30,29,30,30],
  2052: [31,31,32,31,31,31,30,29,30,29,30,30],
  2053: [31,32,31,32,31,30,30,30,29,29,30,30],
  2054: [31,32,31,32,31,30,30,30,29,30,29,31],
  2055: [31,31,32,31,31,31,30,29,30,29,30,30],
  2056: [31,31,32,31,32,30,30,29,30,29,30,30],
  2057: [31,32,31,32,31,30,30,30,29,29,30,31],
  2058: [30,32,31,32,31,30,30,30,29,30,29,31],
  2059: [31,31,32,31,31,31,30,29,30,29,30,30],
  2060: [31,31,32,32,31,30,30,29,30,29,30,30],
  2061: [31,32,31,32,31,30,30,30,29,29,30,31],
  2062: [31,31,31,32,31,31,29,30,29,30,29,31],
  2063: [31,31,32,31,31,31,30,29,30,29,30,30],
  2064: [31,31,32,32,31,30,30,29,30,29,30,30],
  2065: [31,32,31,32,31,30,30,30,29,29,30,31],
  2066: [31,31,31,32,31,31,29,30,30,29,29,31],
  2067: [31,31,32,31,31,31,30,29,30,29,30,30],
  2068: [31,31,32,32,31,30,30,29,30,29,30,30],
  2069: [31,32,31,32,31,30,30,30,29,29,30,31],
  2070: [31,31,31,32,31,31,29,30,30,29,30,30],
  2071: [31,31,32,31,31,31,30,29,30,29,30,30],
  2072: [31,32,31,32,31,30,30,29,30,29,30,30],
  2073: [31,32,31,32,31,30,30,30,29,29,30,31],
  2074: [31,31,31,32,31,31,30,29,30,29,30,30],
  2075: [31,31,32,31,31,31,30,29,30,29,30,30],
  2076: [31,32,31,32,31,30,30,30,29,29,30,30],
  2077: [31,32,31,32,31,30,30,30,29,30,29,31],
  2078: [31,31,31,32,31,31,30,29,30,29,30,30],
  2079: [31,31,32,31,31,31,30,29,30,29,30,30],
  2080: [31,32,31,32,31,30,30,30,29,29,30,30],
  2081: [31,32,31,32,31,30,30,30,29,30,29,31],
  2082: [31,31,32,31,31,31,30,29,30,29,30,30],
  2083: [31,31,32,31,31,31,30,29,30,29,30,30],
  2084: [31,31,32,31,31,30,30,30,29,30,30,30],
  2085: [31,32,31,32,30,31,30,30,29,30,30,30],
  2086: [30,32,31,32,31,30,30,30,29,30,30,30],
  2087: [31,31,32,31,31,31,30,29,30,30,30,30],
  2088: [30,31,32,32,30,31,30,30,29,30,30,30],
  2089: [30,32,31,32,31,30,30,30,29,30,30,30],
  2090: [30,32,31,32,31,30,30,30,29,30,30,30],
  2091: [31,31,32,31,31,31,30,30,29,30,30,30],
  2092: [30,31,32,32,31,30,30,30,29,30,30,30],
  2093: [30,32,31,32,31,30,30,30,29,30,30,30],
  2094: [31,31,32,31,31,30,30,30,29,30,30,30],
  2095: [31,31,32,31,31,31,30,29,30,30,30,30],
  2096: [30,31,32,32,31,30,30,29,30,29,30,30],
  2097: [31,32,31,32,31,30,30,30,29,30,30,30],
  2098: [31,31,32,31,31,31,29,30,29,30,29,31],
  2099: [31,31,32,31,31,31,30,29,29,30,30,30],
  2100: [31,32,31,32,30,31,30,29,30,29,30,30]
};

/* ---------- Constants ---------- */
const FIRST_YEAR = 1975;
const LAST_YEAR = 2100;
// BS 1975-01-01 falls on 1918-04-13 AD (checked: BS 2083-01-01 = 2026-04-14 AD)
const EPOCH_UTC = Date.UTC(1918, 3, 13);
const DAY_MS = 86400000;

const MONTHS = ['बैशाख','जेठ','असार','श्रावण','भदौ','असोज','कार्तिक','मंसिर','पौष','माघ','फागुन','चैत'];
const WEEKDAYS_FULL = ['आइतबार','सोमबार','मङ्गलबार','बुधबार','बिहीबार','शुक्रबार','शनिबार'];
const WEEKDAYS_SHORT = ['आइत','सोम','मङ्गल','बुध','बिहि','शुक्र','शनि'];
const AD_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const AD_MONTHS_SHORT = AD_MONTHS.map(m => m.slice(0, 3));
const AD_WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/* ---------- Helpers ---------- */
function toNepali(n) {
  return String(n).replace(/\d/g, d => '०१२३४५६७८९'[d]);
}

// Today's calendar date in Nepal (UTC+5:45), regardless of the visitor's device timezone
function nepalToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kathmandu', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const get = t => Number(parts.find(p => p.type === t).value);
  return Date.UTC(get('year'), get('month') - 1, get('day'));
}

function daysBeforeYear(year) {
  let total = 0;
  for (let y = FIRST_YEAR; y < year; y++) total += BS_DATA[y].reduce((a, b) => a + b, 0);
  return total;
}

function adFromBS(year, month, day) {
  let days = daysBeforeYear(year);
  for (let m = 0; m < month; m++) days += BS_DATA[year][m];
  return new Date(EPOCH_UTC + (days + day - 1) * DAY_MS);
}

function bsFromAD(utcMs) {
  let days = Math.round((utcMs - EPOCH_UTC) / DAY_MS);
  if (days < 0) return null;
  for (let y = FIRST_YEAR; y <= LAST_YEAR; y++) {
    const len = BS_DATA[y].reduce((a, b) => a + b, 0);
    if (days >= len) { days -= len; continue; }
    for (let m = 0; m < 12; m++) {
      if (days < BS_DATA[y][m]) return { year: y, month: m, day: days + 1 };
      days -= BS_DATA[y][m];
    }
  }
  return null;
}

/* ---------- State ---------- */
let today = bsFromAD(nepalToday());
let view = { year: today.year, month: today.month };
let selected = { ...today };

const el = {
  title: document.getElementById('monthTitle'),
  range: document.getElementById('adRange'),
  grid: document.getElementById('grid'),
  weekdays: document.getElementById('weekdays'),
  detail: document.getElementById('detail'),
  prev: document.getElementById('prev'),
  next: document.getElementById('next'),
  todayBtn: document.getElementById('todayBtn')
};

el.weekdays.innerHTML = WEEKDAYS_SHORT.map(d => `<div>${d}</div>`).join('');

const same = (a, b) => a && b && a.year === b.year && a.month === b.month && a.day === b.day;

/* ---------- Rendering ---------- */
function render() {
  const { year, month } = view;
  const length = BS_DATA[year][month];
  const first = adFromBS(year, month, 1);
  const last = adFromBS(year, month, length);
  const offset = first.getUTCDay();

  el.title.textContent = `${MONTHS[month]} ${toNepali(year)}`;
  const fm = AD_MONTHS_SHORT[first.getUTCMonth()], lm = AD_MONTHS_SHORT[last.getUTCMonth()];
  el.range.textContent = first.getUTCMonth() === last.getUTCMonth()
    ? `${AD_MONTHS[first.getUTCMonth()]} ${first.getUTCFullYear()}`
    : first.getUTCFullYear() === last.getUTCFullYear()
      ? `${fm} – ${lm} ${last.getUTCFullYear()}`
      : `${fm} ${first.getUTCFullYear()} – ${lm} ${last.getUTCFullYear()}`;

  let html = '';
  for (let i = 0; i < offset; i++) html += '<div class="cell empty" aria-hidden="true"></div>';
  for (let d = 1; d <= length; d++) {
    const ad = new Date(first.getTime() + (d - 1) * DAY_MS);
    const cur = { year, month, day: d };
    const adDay = ad.getUTCDate();
    const classes = ['cell'];
    if (same(cur, today)) classes.push('today');
    if (same(cur, selected)) classes.push('selected');
    const label = `${toNepali(d)} ${MONTHS[month]} ${toNepali(year)}, ${AD_WEEKDAYS[ad.getUTCDay()]} ${adDay} ${AD_MONTHS[ad.getUTCMonth()]} ${ad.getUTCFullYear()}`;
    html += `<button type="button" class="${classes.join(' ')}" data-day="${d}" aria-label="${label}"${same(cur, today) ? ' aria-current="date"' : ''}>
      <span class="np">${toNepali(d)}</span>
      <span class="en${adDay === 1 ? ' first' : ''}">${adDay === 1 ? AD_MONTHS_SHORT[ad.getUTCMonth()] + ' ' : ''}${adDay}</span>
    </button>`;
  }
  el.grid.innerHTML = html;

  el.prev.disabled = year === FIRST_YEAR && month === 0;
  el.next.disabled = year === LAST_YEAR && month === 11;
  renderDetail();
}

function renderDetail() {
  if (!selected) { el.detail.innerHTML = ''; return; }
  const ad = adFromBS(selected.year, selected.month, selected.day);
  const wd = ad.getUTCDay();
  el.detail.className = 'detail' + (wd === 6 ? ' sat' : '');
  el.detail.innerHTML = `
    <p class="d-np">${WEEKDAYS_FULL[wd]}, ${toNepali(selected.day)} ${MONTHS[selected.month]} ${toNepali(selected.year)}</p>
    <p class="d-en">${AD_WEEKDAYS[wd]}, ${ad.getUTCDate()} ${AD_MONTHS[ad.getUTCMonth()]} ${ad.getUTCFullYear()}</p>
    ${same(selected, today) ? '<span class="d-tag">आज · Today</span>' : ''}`;
}

/* ---------- Events ---------- */
function shiftMonth(step) {
  let m = view.month + step, y = view.year;
  if (m < 0) { m = 11; y--; }
  if (m > 11) { m = 0; y++; }
  if (y < FIRST_YEAR || y > LAST_YEAR) return;
  view = { year: y, month: m };
  render();
}

el.prev.addEventListener('click', () => shiftMonth(-1));
el.next.addEventListener('click', () => shiftMonth(1));

el.todayBtn.addEventListener('click', () => {
  today = bsFromAD(nepalToday());
  view = { year: today.year, month: today.month };
  selected = { ...today };
  render();
});

el.grid.addEventListener('click', e => {
  const btn = e.target.closest('.cell[data-day]');
  if (!btn) return;
  selected = { year: view.year, month: view.month, day: Number(btn.dataset.day) };
  el.grid.querySelectorAll('.selected').forEach(c => c.classList.remove('selected'));
  btn.classList.add('selected');
  renderDetail();
});

document.addEventListener('keydown', e => {
  if (e.target.closest('input, textarea')) return;
  if (e.key === 'ArrowLeft' && e.shiftKey) shiftMonth(-1);
  if (e.key === 'ArrowRight' && e.shiftKey) shiftMonth(1);
});

// Update "today" when Nepal's date changes while the page stays open
setInterval(() => {
  const t = bsFromAD(nepalToday());
  if (!same(t, today)) { today = t; render(); }
}, 60000);

render();

})();

(function () {
/* ---------- Province data (edit freely) ---------- */
const PROVINCES = {
  1: { name: 'Koshi', np: 'कोशी प्रदेश', capital: 'Biratnagar', capitalNp: 'विराटनगर', districts: ['Bhojpur','Dhankuta','Ilam','Jhapa','Khotang','Morang','Okhaldhunga','Panchthar','Sankhuwasabha','Solukhumbu','Sunsari','Taplejung','Terhathum','Udayapur'] },
  2: { name: 'Madhesh', np: 'मधेश प्रदेश', capital: 'Janakpur', capitalNp: 'जनकपुरधाम', districts: ['Bara','Dhanusha','Mahottari','Parsa','Rautahat','Saptari','Sarlahi','Siraha'] },
  3: { name: 'Bagmati', np: 'बागमती प्रदेश', capital: 'Hetauda', capitalNp: 'हेटौंडा', districts: ['Bhaktapur','Chitwan','Dhading','Dolakha','Kathmandu','Kavrepalanchok','Lalitpur','Makwanpur','Nuwakot','Ramechhap','Rasuwa','Sindhuli','Sindhupalchok'] },
  4: { name: 'Gandaki', np: 'गण्डकी प्रदेश', capital: 'Pokhara', capitalNp: 'पोखरा', districts: ['Baglung','Gorkha','Kaski','Lamjung','Manang','Mustang','Myagdi','Nawalpur','Parbat','Syangja','Tanahun'] },
  5: { name: 'Lumbini', np: 'लुम्बिनी प्रदेश', capital: 'Deukhuri', capitalNp: 'देउखुरी', districts: ['Arghakhanchi','Banke','Bardiya','Dang','Gulmi','Kapilvastu','Nawalparasi West','Palpa','Pyuthan','Rolpa','Rukum East','Rupandehi'] },
  6: { name: 'Karnali', np: 'कर्णाली प्रदेश', capital: 'Birendranagar', capitalNp: 'वीरेन्द्रनगर', districts: ['Dailekh','Dolpa','Humla','Jajarkot','Jumla','Kalikot','Mugu','Rukum West','Salyan','Surkhet'] },
  7: { name: 'Sudurpashchim', np: 'सुदूरपश्चिम प्रदेश', capital: 'Godawari', capitalNp: 'गोदावरी', districts: ['Achham','Baitadi','Bajhang','Bajura','Dadeldhura','Darchula','Doti','Kailali','Kanchanpur'] }
};

const DISTRICT_INFO = {};
const districtRows = `
Bhojpur|Bhojpur|1507|157923
Dhankuta|Dhankuta|891|150599
Ilam|Ilam|1703|279534
Jhapa|Chandragadhi (Bhadrapur)|1606|998054
Khotang|Diktel|1591|175298
Morang|Biratnagar|1855|1148156
Okhaldhunga|Okhaldhunga (Siddhicharan)|1074|139552
Panchthar|Phidim|1241|172400
Sankhuwasabha|Khandbari|3480|158041
Solukhumbu|Salleri (Solududhkunda)|3312|104851
Sunsari|Inaruwa|1257|926962
Taplejung|Phungling|3646|120590
Terhathum|Myanglung|679|88731
Udayapur|Gaighat (Triyuga)|2063|340721
Parsa|Birgunj|1353|654471
Bara|Kalaiya|1190|763137
Rautahat|Gaur|1126|813573
Sarlahi|Malangwa|1259|862470
Dhanusha|Janakpur|1180|867747
Siraha|Siraha|1188|739953
Mahottari|Jaleshwar|1002|706994
Saptari|Rajbiraj|1363|706255
Sindhuli|Sindhulimadhi (Kamalamai)|2491|300026
Ramechhap|Manthali|1546|170302
Dolakha|Charikot (Bhimeshwar)|2191|172767
Bhaktapur|Bhaktapur|119|432132
Dhading|Dhading Besi (Nilkantha)|1926|325710
Kathmandu|Kathmandu|395|2041587
Kavrepalanchok|Dhulikhel|1396|364039
Lalitpur|Lalitpur|385|551667
Nuwakot|Bidur|1121|263391
Rasuwa|Dhunche|1544|46689
Sindhupalchok|Chautara|2542|262624
Chitwan|Bharatpur|2218|719859
Makwanpur|Hetauda|2426|466073
Baglung|Baglung|1784|249211
Gorkha|Gorkha|3610|251027
Kaski|Pokhara|2017|600051
Lamjung|Besisahar|1692|155852
Manang|Chame|2246|5658
Mustang|Jomsom|3573|14452
Myagdi|Beni|2297|107033
Nawalpur|Kawasoti|1370|378079
Parbat|Kusma|494|130887
Syangja|Putalibazar|1164|253024
Tanahun|Damauli (Vyas)|1546|321153
Kapilvastu|Taulihawa|1738|682961
Nawalparasi West|Parasi (Ramgram)|792|386868
Rupandehi|Bhairahawa (Siddharthanagar)|1360|1121957
Arghakhanchi|Sandhikharka|1193|177086
Gulmi|Tamghas (Resunga)|1149|246494
Palpa|Tansen|1373|245027
Dang|Ghorahi|2955|674993
Pyuthan|Pyuthan|1309|232019
Rolpa|Liwang (Rolpa)|1879|224506
Rukum East|Rukumkot|1161|56786
Banke|Nepalganj|2337|603194
Bardiya|Gulariya|2025|459900
Rukum West|Musikot|1716|166740
Salyan|Salyan (Sharada)|1462|238515
Dolpa|Dunai (Thuli Bheri)|7889|42774
Humla|Simikot|5655|55394
Jumla|Jumla (Chandannath)|2531|118349
Kalikot|Manma (Khandachakra)|1741|145292
Mugu|Gamgadhi (Chhyanath Rara)|3535|64549
Surkhet|Birendranagar|2451|415126
Dailekh|Dailekh (Narayan)|1502|252313
Jajarkot|Jajarkot Khalanga (Bheri)|2230|189360
Kailali|Dhangadhi|3235|904666
Achham|Mangalsen|1680|228852
Doti|Dipayal Silgadhi|2025|204831
Bajhang|Chainpur (Jayaprithvi)|3422|189085
Bajura|Martadi (Badimalika)|2188|138523
Kanchanpur|Mahendranagar (Bheemdatta)|1610|513757
Dadeldhura|Dadeldhura (Amargadhi)|1538|139602
Baitadi|Baitadi Khalanga (Dasharathchand)|1519|242157
Darchula|Darchula Khalanga (Mahakali)|2322|133310
`.trim();
districtRows.split('\n').forEach(row => {
  const [name, headquarters, area, population] = row.split('|');
  DISTRICT_INFO[name] = { headquarters, area: Number(area), population: Number(population) };
});

const toNepali = n => String(n).replace(/\d/g, d => '०१२३४५६७८९'[d]);

const svg = document.getElementById('nepal-map');
const paths = [...svg.querySelectorAll('.province')];
const outlineHover = document.getElementById('outline-hover');
const outlineSelected = document.getElementById('outline-selected');
const tooltip = document.getElementById('tooltip');
const legend = document.getElementById('legend');
const details = document.getElementById('province-details');

let selectedId = null;

/* Badges and accessible names */
svg.querySelectorAll('.badge-num').forEach(t => { t.textContent = toNepali(t.dataset.n); });
paths.forEach(p => {
  const d = PROVINCES[p.dataset.id];
  p.setAttribute('aria-label', `${d.name} Province, ${d.np}`);
  p.setAttribute('aria-pressed', 'false');
});

/* Legend buttons */
legend.innerHTML = Object.entries(PROVINCES).map(([id, d]) => `
  <li><button type="button" data-id="${id}">
    <span class="swatch" style="background:var(--c${id})"></span>
    <span>${d.name}<small>${d.np}</small></span>
  </button></li>`).join('');
const legendButtons = [...legend.querySelectorAll('button')];

/* Hover outline */
function setHover(id) {
  if (id) { outlineHover.setAttribute('d', document.getElementById(`province-${id}`).getAttribute('d')); outlineHover.classList.add('show'); }
  else outlineHover.classList.remove('show');
}

/* ---------- What happens when a province is clicked ---------- */
function selectProvince(id) {
  selectedId = String(id);
  selectedDistrict = null;
  districtProfile.hidden = true;
  const d = PROVINCES[id];
  paths.forEach(p => p.setAttribute('aria-pressed', String(p.dataset.id === String(id))));
  legendButtons.forEach(b => b.classList.toggle('active', b.dataset.id === String(id)));
  outlineSelected.setAttribute('d', document.getElementById(`province-${id}`).getAttribute('d'));
  outlineSelected.classList.add('show');

  document.getElementById('d-number').textContent = `Province ${id} · प्रदेश ${toNepali(id)}`;
  document.getElementById('d-name').textContent = d.name;
  document.getElementById('d-np').textContent = d.np;
  document.getElementById('d-capital').textContent = `${d.capital} (${d.capitalNp})`;
  document.getElementById('d-district-count').textContent = `${d.districts.length} districts`;
  details.hidden = false;
  renderDistricts();
  renderRegionalLinks();
  details.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.dispatchEvent(new CustomEvent('province:select', { detail: { id, ...d } }));
}

let selectedDistrict = null;
const districtGrid = document.getElementById('district-grid');
const districtProfile = document.getElementById('district-profile');
districtGrid.parentElement.addEventListener('mouseleave', hideDistrictHover);
const linkStoreKey = 'nepal-atlas-regional-links-v1';
const getSavedLinks = () => {
  try { return JSON.parse(localStorage.getItem(linkStoreKey) || '[]'); }
  catch (_) { return []; }
};

function renderDistricts() {
  const province = PROVINCES[selectedId];
  districtGrid.innerHTML = province.districts.map(name => `
    <button type="button" class="district-choice${selectedDistrict === name ? ' active' : ''}" data-district="${name}">
      <span>${name}</span><small>${province.name} Province</small>
    </button>`).join('');
  districtGrid.querySelectorAll('[data-district]').forEach(button => {
    button.addEventListener('click', () => selectDistrict(button.dataset.district));
    const showPreview = () => showDistrictHover(button.dataset.district);
    button.addEventListener('mouseenter', showPreview);
    button.addEventListener('focus', showPreview);
    button.addEventListener('blur', hideDistrictHover);
  });
  const districtScope = document.querySelector('#link-scope option[value="district"]');
  districtScope.disabled = !selectedDistrict;
  if (!selectedDistrict) districtScope.textContent = 'Selected district (select a district first)';
  else districtScope.textContent = `Selected district: ${selectedDistrict}`;
}

function showDistrictHover(name) {
  const card = document.getElementById('district-hover-card');
  if (!card || !selectedId) return;
  const province = PROVINCES[selectedId];
  const items = getSavedLinks().filter(item => item.provinceId === selectedId &&
    ((item.scope === 'province') || (item.scope === 'district' && item.district === name)));
  const links = items.slice(0, 5).map(item => `<a href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)} ↗</a>`).join('');
  card.innerHTML = `
    <svg viewBox="0 0 100 100" role="img" aria-label="Schematic SVG preview for ${escapeAttr(name)} district">
      <path d="M18 17 L42 8 L67 15 L84 35 L77 62 L58 86 L31 82 L12 58 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M25 29 L43 22 L59 31 L68 48 L54 69 L32 66 L22 48 Z" fill="currentColor" opacity=".13" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="50" cy="47" r="5" fill="currentColor"/><path d="M50 52 L50 66" stroke="currentColor" stroke-width="2"/>
      <text x="50" y="95" text-anchor="middle" font-size="7" fill="currentColor">SVG PREVIEW</text>
    </svg>
    <div><h4>${escapeHtml(name)} District</h4><p>${escapeHtml(province.name)} Province · Hover preview</p><p>Choose the district to open its full profile.</p></div>
    <div class="district-hover-links">${links || '<span class="empty-links">No regional links added yet. Add a news or Facebook URL below.</span>'}</div>`;
  card.hidden = false;
}
function hideDistrictHover() {
  const card = document.getElementById('district-hover-card');
  if (card) card.hidden = true;
}

function selectDistrict(name) {
  selectedDistrict = name;
  renderDistricts();
  const province = PROVINCES[selectedId];
  document.getElementById('district-province-label').textContent = province.name + ' Province';
  document.getElementById('district-name').textContent = name;
  document.getElementById('district-name-np').textContent = '';
  const info = DISTRICT_INFO[name];
  document.getElementById('district-hq').textContent = info ? info.headquarters : 'Data not available';
  document.getElementById('district-pop').textContent = info ? `${info.population.toLocaleString('en-IN')} (2021 census)` : 'Data not available';
  document.getElementById('district-area').textContent = info ? `${info.area.toLocaleString('en-IN')} km²` : 'Data not available';
  districtProfile.hidden = false;
  document.querySelector('#link-scope option[value="district"]').disabled = false;
  document.querySelector('#link-scope option[value="district"]').textContent = `Selected district: ${name}`;
  renderRegionalLinks();
  districtProfile.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  document.dispatchEvent(new CustomEvent('district:select', { detail: { provinceId: selectedId, province: province.name, district: name } }));
}

function renderRegionalLinks() {
  const links = getSavedLinks();
  const provinceItems = links.filter(item => item.provinceId === selectedId && item.scope === 'province');
  const districtItems = selectedDistrict ? links.filter(item => item.provinceId === selectedId && item.scope === 'district' && item.district === selectedDistrict) : [];
  const news = [...provinceItems, ...districtItems].filter(item => item.type === 'news');
  const facebook = [...provinceItems, ...districtItems].filter(item => item.type === 'facebook');
  const renderList = (items, target, emptyText) => {
    const node = document.getElementById(target);
    node.innerHTML = items.length ? items.map(item => `<a class="saved-link" href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)} <span aria-hidden="true">↗</span></a>`).join('') : `<p class="empty-links">${emptyText}</p>`;
  };
  const scopeText = selectedDistrict ? `${PROVINCES[selectedId].name} and ${selectedDistrict}` : PROVINCES[selectedId].name;
  renderList(news, 'news-links', `No news websites added for ${scopeText} yet. You can add links below.`);
  renderList(facebook, 'facebook-links', `No Facebook pages added for ${scopeText} yet. You can add links below.`);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function escapeAttr(value) { return escapeHtml(value); }

document.getElementById('regional-link-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!selectedId) return;
  const title = document.getElementById('link-title').value.trim();
  const url = document.getElementById('link-url').value.trim();
  const type = document.getElementById('link-type').value;
  const scope = document.getElementById('link-scope').value;
  if (!/^https?:\/\//i.test(url)) { alert('Please enter a valid URL starting with http:// or https://'); return; }
  const entry = { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, title, url, type, scope, provinceId: selectedId, district: scope === 'district' ? selectedDistrict : null };
  const links = getSavedLinks();
  links.push(entry);
  localStorage.setItem(linkStoreKey, JSON.stringify(links));
  event.target.reset();
  renderRegionalLinks();
});

/* ---------- Events ---------- */
paths.forEach(p => {
  const id = p.dataset.id;
  p.addEventListener('click', () => selectProvince(id));
  p.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectProvince(id); }
  });
  p.addEventListener('mouseenter', () => setHover(id));
  p.addEventListener('mouseleave', () => { setHover(null); tooltip.hidden = true; });
  p.addEventListener('focus', () => setHover(id));
  p.addEventListener('blur', () => setHover(null));
  p.addEventListener('mousemove', e => {
    const r = svg.parentElement.getBoundingClientRect();
    tooltip.textContent = `${PROVINCES[id].name} · ${PROVINCES[id].np}`;
    tooltip.style.left = `${e.clientX - r.left}px`;
    tooltip.style.top = `${e.clientY - r.top}px`;
    tooltip.hidden = false;
  });
});

legendButtons.forEach(b => {
  const id = b.dataset.id;
  b.addEventListener('click', () => selectProvince(id));
  b.addEventListener('mouseenter', () => setHover(id));
  b.addEventListener('mouseleave', () => setHover(null));
});

})();


(function () {
  const clock = document.getElementById('nepal-clock');
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kathmandu',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  function updateNepalClock() {
    clock.textContent = formatter.format(new Date());
  }
  updateNepalClock();
  setInterval(updateNepalClock, 1000);
})();
