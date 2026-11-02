(function () {
  const header = document.querySelector("header");

  if (header) {
    let clock = document.getElementById("nepal-live-time");

    if (!clock) {
      clock = document.createElement("div");
      clock.id = "nepal-live-time";
      clock.setAttribute("aria-label", "Current time in Nepal");

      const label = document.createElement("span");
      label.className = "time-label";
      label.textContent = "Nepal time";

      const time = document.createElement("time");
      time.id = "nepal-clock";
      time.textContent = "--:--:--";

      const zone = document.createElement("span");
      zone.className = "time-zone";
      zone.textContent = "NPT · UTC+5:45";

      clock.append(label, time, zone);
      header.insertBefore(clock, header.querySelector("nav"));
    }

    const time = clock.querySelector("time");
    if (time) {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const updateNepalClock = () => {
        time.textContent = formatter.format(new Date());
      };

      updateNepalClock();
      window.setInterval(updateNepalClock, 1000);
    }
  }

  let footer = document.querySelector("footer.site-footer");
  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "site-footer";
    document.body.append(footer);
  }

  footer.id = "site-sources";
  footer.replaceChildren();

  const sources = document.createElement("p");
  sources.append(
    "Map boundaries are simplified for display and are not for surveying or legal use. District profiles use public census and administrative sources: ",
  );

  const mapSource = document.createElement("a");
  mapSource.href = "https://www.npmjs.com/package/nepal-geojson";
  mapSource.target = "_blank";
  mapSource.rel = "noopener noreferrer";
  mapSource.textContent = "Map data";

  const censusSource = document.createElement("a");
  censusSource.href = "https://censusresults.nsonepal.gov.np/";
  censusSource.target = "_blank";
  censusSource.rel = "noopener noreferrer";
  censusSource.textContent = "Census results";

  const districtSource = document.createElement("a");
  districtSource.href = "https://index.nepalwide.org/districts/";
  districtSource.target = "_blank";
  districtSource.rel = "noopener noreferrer";
  districtSource.textContent = "District reference";

  const boundarySource = document.createElement("a");
  boundarySource.href = "https://localboundries.oknp.org/";
  boundarySource.target = "_blank";
  boundarySource.rel = "noopener noreferrer";
  boundarySource.textContent = "LocalBoundaries";

  sources.append(
    mapSource,
    " · ",
    censusSource,
    " · ",
    districtSource,
    " · ",
    boundarySource,
  );

  const credit = document.createElement("p");
  credit.className = "developer-credit";
  credit.append("Website developed by ", document.createElement("strong"));
  credit.querySelector("strong").textContent = "Bishal Regmi";

  const copyright = document.createElement("p");
  copyright.className = "copyright";
  copyright.textContent = "© 2026 Bishal Regmi. All rights reserved.";

  footer.append(sources, credit, copyright);
})();
