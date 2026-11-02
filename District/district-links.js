const districtLinks = Object.fromEntries(
  Object.keys(window.NEPAL_DISTRICT_DATA ?? {}).map((slug) => [
    slug,
    { news: [], facebook: [], websites: [], other: [] },
  ]),
);

// Add owner-managed public links here. Each category accepts multiple links.
districtLinks.achham.news.push({ label: "Local News", url: "https://example.com" });





 // Kathmandu District
districtLinks.kathmandu.news.push({ label: "Bankingsamachar", url: "https://www.facebook.com/bankingsamachar" });
districtLinks.kathmandu.news.push({ label: "RoutineOfNepalBanda", url: "https://www.facebook.com/officialroutineofnepalbanda" });
districtLinks.kathmandu.news.push({ label: "Bankingsamachar", url: "https://bankingsamachar.com/" });






//Bajura District


















const linkGroups = [
  ["news", "News websites"],
  ["facebook", "Facebook pages"],
];

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
    const mapFigure = document.createElement("figure");
    mapFigure.className = "district-boundary-map";
    const mapImage = document.createElement("img");
    mapImage.src = `../districts/${districtSlug}.svg`;
    mapImage.alt = `Boundary map of ${district.name} District, ${district.province} Province`;
    mapImage.loading = "lazy";
    mapFigure.append(mapImage);

    const mapCaption = document.createElement("figcaption");
    mapCaption.textContent = `${district.name} District boundary · ${district.province} Province`;
    const openMap = document.createElement("a");
    openMap.href = mapImage.src;
    openMap.target = "_blank";
    openMap.rel = "noopener noreferrer";
    openMap.textContent = "Open full-size map";
    mapCaption.append(openMap);
    mapFigure.append(mapCaption);
    heading.after(mapFigure);

    const profile = document.createElement("section");
    profile.className = "district-facts-panel";
    profile.setAttribute("aria-labelledby", "district-facts-heading");

    const profileHeading = document.createElement("h2");
    profileHeading.id = "district-facts-heading";
    profileHeading.textContent = "District at a glance";
    profile.append(profileHeading);

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

    profile.append(facts);

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
    profile.append(localGovernments);

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
    profile.append(sources);

    page.querySelector(".back")?.before(profile);
  }

  const section = document.createElement("section");
  section.className = "district-links";
  section.setAttribute("aria-labelledby", "district-links-heading");
  section.id = "district-links";

  const header = document.createElement("div");
  header.className = "district-links-header";
  const intro = document.createElement("div");

  const eyebrow = document.createElement("p");
  eyebrow.className = "district-links-eyebrow";
  eyebrow.textContent = "DISTRICT NEWS & RESOURCES";
  intro.append(eyebrow);

  const sectionHeading = document.createElement("h2");
  sectionHeading.id = "district-links-heading";
  sectionHeading.textContent = `${heading.textContent.replace(
    /\s+District$/i,
    "",
  )} news and local links`;
  intro.append(sectionHeading);

  const description = document.createElement("p");
  description.textContent =
    "Browse district news and Facebook pages added by the site admin.";
  intro.append(description);
  header.append(intro);

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

        const category =
          url.hostname.toLowerCase() === "facebook.com" ||
          url.hostname.toLowerCase().endsWith(".facebook.com")
            ? "facebook"
            : "news";
        const categoryLabel = linkGroups.find(
          ([group]) => group === category,
        )?.[1];

        return [
          {
            ...link,
            category,
            categoryLabel,
            href: url.href,
            domain: url.hostname.replace(/^www\./, ""),
          },
        ];
      }),
  );

  const count = document.createElement("span");
  count.className = "district-links-count";
  count.textContent = `${allLinks.length} local ${
    allLinks.length === 1 ? "resource" : "resources"
  }`;
  count.setAttribute("aria-live", "polite");
  header.append(count);
  section.append(header);

  const newsFinder = document.createElement("section");
  newsFinder.className = "district-news-finder";
  newsFinder.id = "district-news-finder";
  newsFinder.setAttribute("aria-labelledby", "district-news-heading");

  const newsHeading = document.createElement("h3");
  newsHeading.id = "district-news-heading";
  newsHeading.textContent = `Popular news & Facebook links · ${district.name}`;
  newsFinder.append(newsHeading);

  const newsIntro = document.createElement("p");
  newsIntro.textContent =
    "Open news websites and Facebook pages for this district.";
  newsFinder.append(newsIntro);

  const newsCards = document.createElement("div");
  newsCards.className = "district-news-grid";
  for (const source of allLinks) {
    const card = document.createElement("a");
    card.className = "district-news-card";
    card.href = source.href;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const sourceName = document.createElement("strong");
    sourceName.textContent = source.label;
    card.append(sourceName);

    const sourceDescription = document.createElement("span");
    sourceDescription.textContent = source.categoryLabel;
    card.append(sourceDescription);

    const sourceDomain = document.createElement("small");
    sourceDomain.textContent = source.domain;
    card.append(sourceDomain);
    newsCards.append(card);
  }
  if (allLinks.length > 0) {
    newsFinder.append(newsCards);
  } else {
    const emptyNews = document.createElement("p");
    emptyNews.className = "district-news-note";
    emptyNews.textContent =
      "No news websites or Facebook pages have been added for this district yet.";
    newsFinder.append(emptyNews);
  }
  section.append(newsFinder);

  const categorySlots = document.createElement("div");
  categorySlots.className = "district-link-slots";
  categorySlots.setAttribute("aria-label", "District resource categories");
  for (const [category, label] of linkGroups) {
    const categoryCount = allLinks.filter(
      (link) => link.category === category,
    ).length;
    const slot = document.createElement("div");
    slot.className = "district-link-slot";

    const slotHeading = document.createElement("h3");
    slotHeading.textContent = label;
    slot.append(slotHeading);

    const slotCount = document.createElement("span");
    slotCount.textContent = `${categoryCount} ${
      categoryCount === 1 ? "link" : "links"
    }`;
    slot.append(slotCount);

    const slotDescription = document.createElement("p");
    slotDescription.textContent =
      categoryCount === 0
        ? "No local links listed yet."
        : "Links are listed in the directory below.";
    slot.append(slotDescription);
    categorySlots.append(slot);
  }
  section.append(categorySlots);

  if (allLinks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "district-links-empty";

    const emptyTitle = document.createElement("h3");
    emptyTitle.textContent = "No local links listed yet";
    emptyState.append(emptyTitle);

    const emptyMessage = document.createElement("p");
    emptyMessage.textContent =
      "News websites and Facebook pages will appear here when the site admin adds them.";
    emptyState.append(emptyMessage);
    section.append(emptyState);
  }

  if (allLinks.length > 0) {
    const controls = document.createElement("div");
    controls.className = "district-links-controls";

    const searchLabel = document.createElement("label");
    searchLabel.className = "district-links-search";
    searchLabel.htmlFor = "district-links-search";
    searchLabel.textContent = "Search links";

    const search = document.createElement("input");
    search.id = "district-links-search";
    search.type = "search";
    search.placeholder = "Try a name or website";
    search.autocomplete = "off";
    searchLabel.append(search);
    controls.append(searchLabel);

    const options = document.createElement("div");
    options.className = "district-links-options";
    controls.append(options);

    const sortLabel = document.createElement("label");
    sortLabel.className = "district-links-sort";
    sortLabel.htmlFor = "district-links-sort";
    sortLabel.textContent = "Sort by";

    const sortSelect = document.createElement("select");
    sortSelect.id = "district-links-sort";
    for (const [value, label] of [
      ["name", "Name: A to Z"],
      ["name-desc", "Name: Z to A"],
      ["category", "Category"],
    ]) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      sortSelect.append(option);
    }
    sortLabel.append(sortSelect);
    options.append(sortLabel);

    const savedOnly = document.createElement("button");
    savedOnly.className = "district-links-saved-toggle";
    savedOnly.type = "button";
    savedOnly.setAttribute("aria-pressed", "false");
    options.append(savedOnly);

    const filters = document.createElement("div");
    filters.className = "district-links-filters";
    filters.setAttribute("role", "group");
    filters.setAttribute("aria-label", "Filter resources by type");
    controls.append(filters);
    section.append(controls);

    const results = document.createElement("p");
    results.className = "district-links-results";
    results.setAttribute("aria-live", "polite");
    section.append(results);

    const cards = document.createElement("div");
    cards.className = "district-links-grid";
    section.append(cards);

    const noResults = document.createElement("p");
    noResults.className = "district-links-no-results";
    noResults.hidden = true;
    noResults.textContent =
      "No links match your search. Try another word or filter.";
    section.append(noResults);

    const status = document.createElement("p");
    status.className = "district-links-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    section.append(status);

    let activeCategory = "all";
    let showingSavedOnly = false;
    let storageAvailable = true;
    const storageKey = `nepal-atlas-saved-district-links:${districtSlug}`;
    let savedLinks = new Set();
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const currentUrls = new Set(allLinks.map((link) => link.href));
          savedLinks = new Set(
            parsed.filter(
              (value) => typeof value === "string" && currentUrls.has(value),
            ),
          );
        } else {
          console.error(`Invalid saved links data for ${districtSlug}.`);
        }
      }
    } catch (error) {
      storageAvailable = false;
      console.error("Could not load saved district links.", error);
    }

    const updateSavedToggle = () => {
      savedOnly.textContent = `Saved (${savedLinks.size})`;
      savedOnly.disabled = !storageAvailable || savedLinks.size === 0;
      savedOnly.setAttribute("aria-pressed", String(showingSavedOnly));
    };

    const filterButtons = [];

    const sortCards = () => {
      const cardsInOrder = [...cards.children].sort((first, second) => {
        if (sortSelect.value === "category") {
          const categoryOrder = first.dataset.category.localeCompare(
            second.dataset.category,
          );
          if (categoryOrder !== 0) return categoryOrder;
        }

        const nameOrder = first.dataset.name.localeCompare(second.dataset.name);
        return sortSelect.value === "name-desc" ? -nameOrder : nameOrder;
      });

      for (const card of cardsInOrder) cards.append(card);
    };

    const applyFilters = () => {
      const query = search.value.trim().toLowerCase();
      let visibleCount = 0;

      for (const card of cards.children) {
        const matchesCategory =
          activeCategory === "all" || card.dataset.category === activeCategory;
        const matchesQuery = card.dataset.search.includes(query);
        const matchesSaved =
          !showingSavedOnly || savedLinks.has(card.dataset.href);
        const visible = matchesCategory && matchesQuery && matchesSaved;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      }

      results.textContent = `Showing ${visibleCount} of ${allLinks.length} ${
        allLinks.length === 1 ? "resource" : "resources"
      }`;
      noResults.hidden = visibleCount > 0;
      if (visibleCount === 0 && showingSavedOnly && savedLinks.size === 0) {
        noResults.textContent =
          "You have not saved any links on this device yet.";
      } else {
        noResults.textContent =
          "No links match your search. Try another word or filter.";
      }
    };

    const persistSavedLinks = () => {
      try {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify([...savedLinks]),
        );
        storageAvailable = true;
        return true;
      } catch (error) {
        storageAvailable = false;
        console.error("Could not save district links on this device.", error);
        status.textContent =
          "Your browser could not save this link. Check its storage settings.";
        updateSavedToggle();
        return false;
      }
    };

    const addFilter = (category, label, total) => {
      const button = document.createElement("button");
      button.className = "district-links-filter";
      button.type = "button";
      button.textContent = `${label} (${total})`;
      button.setAttribute("aria-pressed", String(category === activeCategory));
      button.addEventListener("click", () => {
        activeCategory = category;
        for (const filterButton of filterButtons) {
          filterButton.setAttribute(
            "aria-pressed",
            String(filterButton.dataset.category === activeCategory),
          );
        }
        applyFilters();
      });
      button.dataset.category = category;
      filterButtons.push(button);
      filters.append(button);
    };

    addFilter("all", "All", allLinks.length);

    for (const [category, label] of linkGroups) {
      const total = allLinks.filter(
        (link) => link.category === category,
      ).length;
      if (total > 0) addFilter(category, label, total);
    }

    for (const link of allLinks) {
      const card = document.createElement("article");
      card.className = "district-link-card";
      card.dataset.category = link.category;
      card.dataset.name = link.label.toLowerCase();
      card.dataset.href = link.href;
      card.dataset.search =
        `${link.label} ${link.domain} ${link.categoryLabel}`.toLowerCase();

      const categoryLabel = document.createElement("span");
      categoryLabel.className = "district-link-category";
      categoryLabel.textContent = link.categoryLabel;
      card.append(categoryLabel);

      const linkName = document.createElement("h3");
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = link.label;
      linkName.append(anchor);
      card.append(linkName);

      const domain = document.createElement("p");
      domain.className = "district-link-domain";
      domain.textContent = link.domain;
      card.append(domain);

      const actions = document.createElement("div");
      actions.className = "district-link-actions";

      const saveButton = document.createElement("button");
      saveButton.className = "district-link-save";
      saveButton.type = "button";
      saveButton.setAttribute(
        "aria-pressed",
        String(savedLinks.has(link.href)),
      );
      saveButton.textContent = savedLinks.has(link.href)
        ? "Saved"
        : "Save link";
      saveButton.disabled = !storageAvailable;
      saveButton.addEventListener("click", () => {
        status.textContent = "";
        const wasSaved = savedLinks.has(link.href);
        if (savedLinks.has(link.href)) {
          savedLinks.delete(link.href);
        } else {
          savedLinks.add(link.href);
        }
        if (!persistSavedLinks()) {
          if (wasSaved) savedLinks.add(link.href);
          else savedLinks.delete(link.href);
          return;
        }

        const isSaved = savedLinks.has(link.href);
        saveButton.textContent = isSaved ? "Saved" : "Save link";
        saveButton.setAttribute("aria-pressed", String(isSaved));
        updateSavedToggle();
        applyFilters();
        status.textContent = isSaved
          ? `${link.label} saved on this device.`
          : `${link.label} removed from saved links.`;
      });
      actions.append(saveButton);

      const shareButton = document.createElement("button");
      shareButton.className = "district-link-share";
      shareButton.type = "button";
      shareButton.textContent = "Share";
      shareButton.addEventListener("click", async () => {
        status.textContent = "";
        try {
          if (typeof navigator.share === "function") {
            await navigator.share({ title: link.label, url: link.href });
            status.textContent = `Shared ${link.label}.`;
          } else if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(link.href);
            status.textContent = "Link copied to clipboard.";
          } else {
            status.textContent =
              "Sharing is unavailable in this browser. Copy the link from the address bar.";
          }
        } catch (error) {
          if (error.name === "AbortError") {
            status.textContent = "Sharing cancelled.";
          } else {
            console.error(`Could not share ${link.href}.`, error);
            status.textContent =
              "Could not share this link. Copy its address from the link above.";
          }
        }
      });
      actions.append(shareButton);
      card.append(actions);

      cards.append(card);
    }

    savedOnly.addEventListener("click", () => {
      showingSavedOnly = !showingSavedOnly;
      updateSavedToggle();
      applyFilters();
    });
    sortSelect.addEventListener("change", () => {
      sortCards();
      applyFilters();
    });
    search.addEventListener("input", applyFilters);
    sortCards();
    updateSavedToggle();
    applyFilters();
  }

  page.querySelector(".back")?.before(section);

  const overview = document.createElement("div");
  overview.className = "district-overview-layout";

  const overviewContent = document.createElement("div");
  overviewContent.className = "district-overview-content";
  const mapFigure = page.querySelector(".district-boundary-map");
  const profile = page.querySelector(".district-facts-panel");
  if (mapFigure) overviewContent.append(mapFigure);
  if (profile) overviewContent.append(profile);

  const newsSidebar = document.createElement("aside");
  newsSidebar.className = "district-news-sidebar";
  newsSidebar.setAttribute(
    "aria-label",
    "Popular district news and Facebook links",
  );
  newsSidebar.append(newsFinder);

  overview.append(overviewContent, newsSidebar);
  heading.after(overview);
}
