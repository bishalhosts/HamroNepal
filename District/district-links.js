const districtLinks = Object.fromEntries(
  Object.keys(window.NEPAL_DISTRICT_DATA ?? {}).map((slug) => [
    slug,
    { news: [], facebook: [], websites: [], other: [] },
  ]),
);

// Add owner-managed news websites and Facebook pages here.
districtLinks.kathmandu.news.push({
  label: "Bankingsamachar",
  url: "https://www.facebook.com/bankingsamachar",
});
districtLinks.kathmandu.news.push({
  label: "RoutineOfNepalBanda",
  url: "https://www.facebook.com/officialroutineofnepalbanda",
});
districtLinks.kathmandu.news.push({
  label: "Bankingsamachar",
  url: "https://bankingsamachar.com/",
});

const page = document.querySelector(".province-page");
const heading = page?.querySelector("h1");
const districtSlug = window.location.pathname
  .split("/")
  .pop()
  ?.replace(/\.html$/i, "")
  .toLowerCase();

const siteHeader = document.querySelector(".atlas-page-header");
if (siteHeader) {
  siteHeader.className = "site-header";
  const brand = siteHeader.querySelector(".atlas-page-brand");
  if (brand) {
    brand.className = "brand";
    brand.href = "../index.html";
  }

  const headerNavigation = siteHeader.querySelector("nav");
  const navigationLinks = headerNavigation?.querySelectorAll("a");
  if (headerNavigation && navigationLinks?.length >= 3) {
    navigationLinks[0].href = "../index.html#map";
    navigationLinks[0].textContent = "Map";

    const calendarLink = document.createElement("a");
    calendarLink.href = "../index.html#calendar-app";
    calendarLink.textContent = "Calendar";
    headerNavigation.insertBefore(calendarLink, navigationLinks[1]);

    navigationLinks[1].href = "../maps.html";
    navigationLinks[1].textContent = "Districts & news";
    navigationLinks[2].href = "#district-links";
    navigationLinks[2].textContent = "Local news";
  }

  const searchForm = document.createElement("form");
  searchForm.className = "place-finder header-place-finder";
  searchForm.setAttribute("role", "search");
  searchForm.autocomplete = "off";

  const searchLabel = document.createElement("label");
  searchLabel.className = "visually-hidden";
  searchLabel.htmlFor = "place-search";
  searchLabel.textContent = "Find a district";

  const searchInput = document.createElement("input");
  searchInput.id = "place-search";
  searchInput.type = "search";
  searchInput.placeholder = "Search a district";
  searchInput.setAttribute("aria-controls", "place-search-results");
  searchInput.setAttribute("aria-describedby", "place-search-help");

  const searchHelp = document.createElement("p");
  searchHelp.id = "place-search-help";
  searchHelp.className = "visually-hidden";
  searchHelp.textContent =
    "Type a district name to open its news and information page.";

  const searchResults = document.createElement("div");
  searchResults.id = "place-search-results";
  searchResults.className = "place-search-results";

  const searchStatus = document.createElement("p");
  searchStatus.id = "place-search-status";
  searchStatus.className = "visually-hidden";
  searchStatus.setAttribute("role", "status");
  searchStatus.setAttribute("aria-live", "polite");

  searchForm.append(
    searchLabel,
    searchInput,
    searchHelp,
    searchResults,
    searchStatus,
  );
  siteHeader.insertBefore(searchForm, siteHeader.querySelector("nav"));

  const districts = Object.entries(window.NEPAL_DISTRICT_DATA ?? {}).map(
    ([slug, district]) => ({ slug, name: district.name }),
  );

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    searchResults.replaceChildren();

    if (!query) {
      searchStatus.textContent = "";
      return;
    }

    const matches = districts
      .filter((district) => district.name.toLocaleLowerCase().includes(query))
      .sort((first, second) => {
        const firstStarts = first.name.toLocaleLowerCase().startsWith(query);
        const secondStarts = second.name.toLocaleLowerCase().startsWith(query);
        return (
          Number(secondStarts) - Number(firstStarts) ||
          first.name.localeCompare(second.name)
        );
      });

    if (matches.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "place-search-empty";
      emptyMessage.textContent = "No districts found. Try another name.";
      searchResults.append(emptyMessage);
      searchStatus.textContent = emptyMessage.textContent;
      return;
    }

    const list = document.createElement("ul");
    list.className = "place-search-list";

    for (const district of matches.slice(0, 8)) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `../District/${district.slug}.html`;

      const name = document.createElement("span");
      name.textContent = district.name;
      link.append(name);

      const detail = document.createElement("small");
      detail.textContent = "District news and information";
      link.append(detail);

      item.append(link);
      list.append(item);
    }

    searchResults.append(list);
    searchStatus.textContent =
      matches.length > 8
        ? `Showing 8 of ${matches.length} matching districts. Keep typing to narrow your search.`
        : `${matches.length} matching ${
            matches.length === 1 ? "district" : "districts"
          }.`;
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstResult = searchResults.querySelector("a");
    if (firstResult) window.location.href = firstResult.href;
  });
}

if (page && heading && districtSlug) {
  const district = window.NEPAL_DISTRICT_DATA?.[districtSlug];

  if (!district) {
    console.error(`District profile data not found for "${districtSlug}".`);
  } else {
    page.className = "district-page";
    document.title = `${district.name} District | Hamro Nepal — District News & Local Links`;
    const breadcrumb = document.createElement("a");
    breadcrumb.className = "district-breadcrumb";
    breadcrumb.href = "../maps.html";
    breadcrumb.textContent = "← All districts";

    const pageIntro = document.createElement("p");
    pageIntro.className = "district-page-intro";
    pageIntro.textContent =
      "Explore the district map, key facts, and local news links.";

    const overview = document.createElement("div");
    overview.className = "district-overview-content";

    const mapCard = document.createElement("section");
    mapCard.className = "district-map-card";
    mapCard.setAttribute("aria-label", `${district.name} district information`);

    const mapFigure = document.createElement("figure");
    mapFigure.className = "district-boundary-map";
    const mapImage = document.createElement("img");
    mapImage.src = `../districts/${districtSlug}.svg`;
    mapImage.alt = `Boundary map of ${district.name} District`;
    mapImage.loading = "lazy";
    mapFigure.append(mapImage);

    const mapCaption = document.createElement("figcaption");
    mapCaption.textContent = `${district.name} District boundary`;
    const openMap = document.createElement("a");
    openMap.href = mapImage.src;
    openMap.target = "_blank";
    openMap.rel = "noopener noreferrer";
    openMap.textContent = "Open full-size map";
    mapCaption.append(openMap);
    mapFigure.append(mapCaption);
    mapCard.append(mapFigure);

    const facts = document.createElement("dl");
    facts.className = "district-facts-grid";
    const factItems = [
      ["District headquarters", district.headquarters],
      [
        "Population",
        `${district.population2021.toLocaleString("en-IN")} (2021 census)`,
      ],
      ["Area", `${district.areaSqKm.toLocaleString("en-IN")} km²`],
      ["Local governments", `${district.localGovernments.length} local levels`],
    ];

    for (const [label, value] of factItems) {
      const item = document.createElement("div");
      const term = document.createElement("dt");
      term.textContent = label;
      const definition = document.createElement("dd");
      definition.textContent = value;
      item.append(term, definition);
      facts.append(item);
    }
    mapCard.append(facts);

    const localGovernments = document.createElement("details");
    localGovernments.className = "local-government-list";
    const localGovernmentSummary = document.createElement("summary");
    localGovernmentSummary.textContent = `View all ${district.localGovernments.length} local governments`;
    localGovernments.append(localGovernmentSummary);

    const localGovernmentList = document.createElement("ul");
    for (const name of district.localGovernments) {
      const item = document.createElement("li");
      item.textContent = name;
      localGovernmentList.append(item);
    }
    localGovernments.append(localGovernmentList);
    mapCard.append(localGovernments);

    const sources = document.createElement("p");
    sources.className = "district-data-sources";
    sources.append("Population: ");
    const censusSource = document.createElement("a");
    censusSource.href = "https://censusresults.nsonepal.gov.np/";
    censusSource.target = "_blank";
    censusSource.rel = "noopener noreferrer";
    censusSource.textContent = "2021 National Census";
    sources.append(censusSource, " · Area and headquarters: ");

    const referenceSource = document.createElement("a");
    referenceSource.href = "https://index.nepalwide.org/districts/";
    referenceSource.target = "_blank";
    referenceSource.rel = "noopener noreferrer";
    referenceSource.textContent = "District Reference Directory";
    sources.append(referenceSource, " · Local government names: ");

    const localSource = document.createElement("a");
    localSource.href =
      "https://github.com/Pratik-Kattel/Nepal-Administrative-Data-JSON";
    localSource.target = "_blank";
    localSource.rel = "noopener noreferrer";
    localSource.textContent = "Nepal administrative data";
    sources.append(localSource);
    mapCard.append(sources);

    const linksPanel = document.createElement("section");
    linksPanel.className = "district-facts-panel";
    linksPanel.id = "district-links";
    linksPanel.setAttribute("aria-labelledby", "district-facts-heading");

    const linksHeading = document.createElement("h2");
    linksHeading.id = "district-facts-heading";
    linksHeading.textContent = `News for ${district.name} District`;
    linksPanel.append(linksHeading);

    const linksIntro = document.createElement("p");
    linksIntro.className = "district-links-intro";
    linksIntro.textContent = "News websites and Facebook pages";
    linksPanel.append(linksIntro);

    const allLinks = Object.values(districtLinks[districtSlug] ?? {}).flatMap(
      (categoryLinks) =>
        categoryLinks.flatMap((link) => {
          let url;
          try {
            url = new URL(link.url);
          } catch {
            console.error(`Invalid district resource URL: ${link.url}`);
            return [];
          }

          if (!["http:", "https:"].includes(url.protocol)) {
            console.error(`Unsupported district resource URL: ${link.url}`);
            return [];
          }

          const isFacebook =
            url.hostname.toLowerCase() === "facebook.com" ||
            url.hostname.toLowerCase().endsWith(".facebook.com");

          return [
            {
              label: link.label,
              href: url.href,
              domain: url.hostname.replace(/^www\./, ""),
              category: isFacebook ? "Facebook page" : "News website",
            },
          ];
        }),
    );

    const linksCount = document.createElement("span");
    linksCount.className = "district-links-count";
    linksCount.textContent = `${allLinks.length} ${
      allLinks.length === 1 ? "link" : "links"
    }`;
    linksCount.setAttribute("aria-live", "polite");
    linksPanel.append(linksCount);

    if (allLinks.length > 0) {
      const linkList = document.createElement("ul");
      linkList.className = "district-resource-list";
      if (allLinks.length > 10) linkList.classList.add("has-overflow");

      for (const link of allLinks) {
        const item = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = link.href;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.className = "district-resource-link";

        const name = document.createElement("strong");
        name.textContent = link.label;
        const details = document.createElement("span");
        details.textContent = `${link.category} · ${link.domain}`;
        anchor.append(name, details);
        item.append(anchor);
        linkList.append(item);
      }

      linksPanel.append(linkList);
    } else {
      const emptyState = document.createElement("p");
      emptyState.className = "district-links-empty";
      emptyState.textContent =
        "No news websites or Facebook pages have been added for this district yet.";
      linksPanel.append(emptyState);
    }

    overview.append(mapCard, linksPanel);

    page.querySelector(".eyebrow")?.remove();
    page.querySelectorAll(".back").forEach((backLink) => backLink.remove());
    page.replaceChildren(breadcrumb, heading, pageIntro, overview);
  }
}
