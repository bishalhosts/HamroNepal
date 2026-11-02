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

if (page && heading && districtSlug) {
  const district = window.NEPAL_DISTRICT_DATA?.[districtSlug];

  if (!district) {
    console.error(`District profile data not found for "${districtSlug}".`);
  } else {
    page.className = "district-page";
    document.title = `${district.name} District | Hamro Nepal — District News & Local Links`;
    document
      .querySelector('.atlas-page-header nav a[href="#district-news-finder"]')
      ?.setAttribute("href", "#district-links");

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
