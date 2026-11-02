(function () {
  const BS_DATA = {
    1975: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    1976: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    1977: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    1978: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1979: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    1980: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    1981: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    1982: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1983: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    1984: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    1985: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    1986: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1987: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    1988: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    1989: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    1990: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1991: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],

    1992: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    1993: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1994: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1995: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],

    1996: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    1997: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1998: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    1999: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],

    2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],

    2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],

    2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],

    2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],

    2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],

    2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],

    2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],

    2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],

    2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],

    2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],

    2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2062: [31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],

    2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],

    2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],

    2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],

    2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],

    2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],

    2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],

    2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],

    2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],

    2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],

    2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],

    2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],

    2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],

    2087: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],

    2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],

    2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],

    2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],

    2091: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],

    2092: [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],

    2093: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],

    2094: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],

    2095: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],

    2096: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],

    2097: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],

    2098: [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31],

    2099: [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],

    2100: [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30],
  };

  /* ---------- Constants ---------- */

  const FIRST_YEAR = 1975;

  const LAST_YEAR = 2100;

  // BS 1975-01-01 falls on 1918-04-13 AD (checked: BS 2083-01-01 = 2026-04-14 AD)

  const EPOCH_UTC = Date.UTC(1918, 3, 13);

  const DAY_MS = 86400000;

  const MONTHS = [
    "बैशाख",
    "जेठ",
    "असार",
    "श्रावण",
    "भदौ",
    "असोज",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फागुन",
    "चैत",
  ];

  const WEEKDAYS_FULL = [
    "आइतबार",
    "सोमबार",
    "मङ्गलबार",
    "बुधबार",
    "बिहीबार",
    "शुक्रबार",
    "शनिबार",
  ];

  const WEEKDAYS_SHORT = ["आइत", "सोम", "मङ्गल", "बुध", "बिहि", "शुक्र", "शनि"];

  const AD_MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const AD_MONTHS_SHORT = AD_MONTHS.map((m) => m.slice(0, 3));

  const AD_WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  /* ---------- Helpers ---------- */

  function toNepali(n) {
    return String(n).replace(/\d/g, (d) => "०१२३४५६७८९"[d]);
  }

  // Today's calendar date in Nepal (UTC+5:45), regardless of the visitor's device timezone

  function nepalToday() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());

    const get = (t) => Number(parts.find((p) => p.type === t).value);

    return Date.UTC(get("year"), get("month") - 1, get("day"));
  }

  function daysBeforeYear(year) {
    let total = 0;

    for (let y = FIRST_YEAR; y < year; y++)
      total += BS_DATA[y].reduce((a, b) => a + b, 0);

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

      if (days >= len) {
        days -= len;
        continue;
      }

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
    title: document.getElementById("monthTitle"),

    range: document.getElementById("adRange"),

    grid: document.getElementById("grid"),

    weekdays: document.getElementById("weekdays"),

    detail: document.getElementById("detail"),

    prev: document.getElementById("prev"),

    next: document.getElementById("next"),

    todayBtn: document.getElementById("todayBtn"),
  };

  el.weekdays.innerHTML = WEEKDAYS_SHORT.map((d) => `<div>${d}</div>`).join("");

  const same = (a, b) =>
    a && b && a.year === b.year && a.month === b.month && a.day === b.day;

  /* ---------- Rendering ---------- */

  function render() {
    const { year, month } = view;

    const length = BS_DATA[year][month];

    const first = adFromBS(year, month, 1);

    const last = adFromBS(year, month, length);

    const offset = first.getUTCDay();

    el.title.textContent = `${MONTHS[month]} ${toNepali(year)}`;

    const fm = AD_MONTHS_SHORT[first.getUTCMonth()],
      lm = AD_MONTHS_SHORT[last.getUTCMonth()];

    el.range.textContent =
      first.getUTCMonth() === last.getUTCMonth()
        ? `${AD_MONTHS[first.getUTCMonth()]} ${first.getUTCFullYear()}`
        : first.getUTCFullYear() === last.getUTCFullYear()
          ? `${fm} – ${lm} ${last.getUTCFullYear()}`
          : `${fm} ${first.getUTCFullYear()} – ${lm} ${last.getUTCFullYear()}`;

    let html = "";

    for (let i = 0; i < offset; i++)
      html += '<div class="cell empty" aria-hidden="true"></div>';

    for (let d = 1; d <= length; d++) {
      const ad = new Date(first.getTime() + (d - 1) * DAY_MS);

      const cur = { year, month, day: d };

      const adDay = ad.getUTCDate();

      const classes = ["cell"];

      if (same(cur, today)) classes.push("today");

      if (same(cur, selected)) classes.push("selected");

      const label = `${toNepali(d)} ${MONTHS[month]} ${toNepali(year)}, ${AD_WEEKDAYS[ad.getUTCDay()]} ${adDay} ${AD_MONTHS[ad.getUTCMonth()]} ${ad.getUTCFullYear()}`;

      html += `<button type="button" class="${classes.join(" ")}" data-day="${d}" aria-label="${label}"${same(cur, today) ? ' aria-current="date"' : ""}>

      <span class="np">${toNepali(d)}</span>

      <span class="en${adDay === 1 ? " first" : ""}">${adDay === 1 ? AD_MONTHS_SHORT[ad.getUTCMonth()] + " " : ""}${adDay}</span>

    </button>`;
    }

    el.grid.innerHTML = html;

    el.prev.disabled = year === FIRST_YEAR && month === 0;

    el.next.disabled = year === LAST_YEAR && month === 11;

    renderDetail();
  }

  function renderDetail() {
    if (!selected) {
      el.detail.innerHTML = "";
      return;
    }

    const ad = adFromBS(selected.year, selected.month, selected.day);

    const wd = ad.getUTCDay();

    el.detail.className = "detail" + (wd === 6 ? " sat" : "");

    el.detail.innerHTML = `

    <p class="d-np">${WEEKDAYS_FULL[wd]}, ${toNepali(selected.day)} ${MONTHS[selected.month]} ${toNepali(selected.year)}</p>

    <p class="d-en">${AD_WEEKDAYS[wd]}, ${ad.getUTCDate()} ${AD_MONTHS[ad.getUTCMonth()]} ${ad.getUTCFullYear()}</p>

    ${same(selected, today) ? '<span class="d-tag">आज · Today</span>' : ""}`;
  }

  /* ---------- Events ---------- */

  function shiftMonth(step) {
    let m = view.month + step,
      y = view.year;

    if (m < 0) {
      m = 11;
      y--;
    }

    if (m > 11) {
      m = 0;
      y++;
    }

    if (y < FIRST_YEAR || y > LAST_YEAR) return;

    view = { year: y, month: m };

    render();
  }

  el.prev.addEventListener("click", () => shiftMonth(-1));

  el.next.addEventListener("click", () => shiftMonth(1));

  el.todayBtn.addEventListener("click", () => {
    today = bsFromAD(nepalToday());

    view = { year: today.year, month: today.month };

    selected = { ...today };

    render();
  });

  el.grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".cell[data-day]");

    if (!btn) return;

    selected = {
      year: view.year,
      month: view.month,
      day: Number(btn.dataset.day),
    };

    el.grid
      .querySelectorAll(".selected")
      .forEach((c) => c.classList.remove("selected"));

    btn.classList.add("selected");

    renderDetail();
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea")) return;

    if (e.key === "ArrowLeft" && e.shiftKey) shiftMonth(-1);

    if (e.key === "ArrowRight" && e.shiftKey) shiftMonth(1);
  });

  // Update "today" when Nepal's date changes while the page stays open

  setInterval(() => {
    const t = bsFromAD(nepalToday());

    if (!same(t, today)) {
      today = t;
      render();
    }
  }, 60000);

  render();
})();
