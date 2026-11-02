(function () {
  const shellScript = document.currentScript;
  const header = document.querySelector("header");

  if (header) {
    const navigation = header.querySelector("nav");
    let themeButton = document.getElementById("theme-toggle");

    if (!themeButton && navigation) {
      themeButton = document.createElement("button");
      themeButton.className = "theme-toggle";
      themeButton.id = "theme-toggle";
      themeButton.type = "button";
      navigation.append(themeButton);
    }

    if (themeButton) {
      let savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      try {
        const storedTheme = window.localStorage.getItem("nepal-atlas-theme");
        if (storedTheme === "light" || storedTheme === "dark") {
          savedTheme = storedTheme;
        }
      } catch (error) {
        console.warn("Could not read the saved theme preference.", error);
      }

      const applyTheme = (theme) => {
        document.documentElement.dataset.theme = theme;
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", theme === "dark" ? "#101827" : "#ffffff");
        themeButton.textContent =
          theme === "dark" ? "☀ Light mode" : "☾ Dark mode";
        themeButton.setAttribute("aria-pressed", String(theme === "dark"));

        try {
          window.localStorage.setItem("nepal-atlas-theme", theme);
        } catch (error) {
          console.warn("Could not save the theme preference.", error);
        }
      };

      applyTheme(savedTheme);
      themeButton.addEventListener("click", () => {
        applyTheme(
          document.documentElement.dataset.theme === "dark" ? "light" : "dark",
        );
      });
    } else {
      console.error("Could not add the theme toggle because the header has no navigation.");
    }

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

    let dateSummary = document.getElementById("detail");

    if (!dateSummary) {
      dateSummary = document.createElement("section");
      dateSummary.className = "detail header-date-summary";
      dateSummary.id = "detail";
      dateSummary.setAttribute("aria-live", "polite");
      dateSummary.setAttribute("aria-label", "Current Nepali date");
      header.insertBefore(dateSummary, navigation);
    }

    if (!document.getElementById("calendar-app") && shellScript) {
      const calendarScript = document.createElement("script");
      calendarScript.src = new URL("calendar.js", shellScript.src).href;
      calendarScript.addEventListener("error", () => {
        console.error("Could not load the Nepal calendar for the shared header date.");
      });
      document.body.append(calendarScript);
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
