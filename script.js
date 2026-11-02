(function () {
  const sidebar = document.querySelector(".calendar-sidebar");
  const atlasLayout = document.querySelector(".atlas-layout");

  if (atlasLayout) {
    const setFocus = (hash) => {
      atlasLayout.classList.toggle("calendar-first", hash === "#calendar-app");
      atlasLayout.classList.toggle("map-first", hash === "#map");
    };

    document
      .querySelectorAll('.site-header nav a[href="#map"], .site-header nav a[href="#calendar-app"]')
      .forEach((link) => {
        link.addEventListener("click", () => setFocus(link.hash));
      });

    window.addEventListener("hashchange", () => setFocus(window.location.hash));
    setFocus(window.location.hash);
  }

  const expandButton = document.getElementById("calendar-expand");

  expandButton.addEventListener("click", () => {
    const expanded = sidebar.classList.toggle("is-expanded");

    expandButton.setAttribute("aria-expanded", String(expanded));

    expandButton.textContent = expanded
      ? "Show compact calendar"
      : "Expand calendar";
  });
})();

(function () {
  /* ---------- Province data (edit freely) ---------- */

  const PROVINCES = {
    1: {
      name: "Koshi",
      np: "कोशी प्रदेश",
      capital: "Biratnagar",
      capitalNp: "विराटनगर",
      districts: [
        "Bhojpur",
        "Dhankuta",
        "Ilam",
        "Jhapa",
        "Khotang",
        "Morang",
        "Okhaldhunga",
        "Panchthar",
        "Sankhuwasabha",
        "Solukhumbu",
        "Sunsari",
        "Taplejung",
        "Terhathum",
        "Udayapur",
      ],
    },

    2: {
      name: "Madhesh",
      np: "मधेश प्रदेश",
      capital: "Janakpur",
      capitalNp: "जनकपुरधाम",
      districts: [
        "Bara",
        "Dhanusha",
        "Mahottari",
        "Parsa",
        "Rautahat",
        "Saptari",
        "Sarlahi",
        "Siraha",
      ],
    },

    3: {
      name: "Bagmati",
      np: "बागमती प्रदेश",
      capital: "Hetauda",
      capitalNp: "हेटौंडा",
      districts: [
        "Bhaktapur",
        "Chitwan",
        "Dhading",
        "Dolakha",
        "Kathmandu",
        "Kavrepalanchok",
        "Lalitpur",
        "Makwanpur",
        "Nuwakot",
        "Ramechhap",
        "Rasuwa",
        "Sindhuli",
        "Sindhupalchok",
      ],
    },

    4: {
      name: "Gandaki",
      np: "गण्डकी प्रदेश",
      capital: "Pokhara",
      capitalNp: "पोखरा",
      districts: [
        "Baglung",
        "Gorkha",
        "Kaski",
        "Lamjung",
        "Manang",
        "Mustang",
        "Myagdi",
        "Nawalpur",
        "Parbat",
        "Syangja",
        "Tanahun",
      ],
    },

    5: {
      name: "Lumbini",
      np: "लुम्बिनी प्रदेश",
      capital: "Deukhuri",
      capitalNp: "देउखुरी",
      districts: [
        "Arghakhanchi",
        "Banke",
        "Bardiya",
        "Dang",
        "Gulmi",
        "Kapilvastu",
        "Nawalparasi West",
        "Palpa",
        "Pyuthan",
        "Rolpa",
        "Rukum East",
        "Rupandehi",
      ],
    },

    6: {
      name: "Karnali",
      np: "कर्णाली प्रदेश",
      capital: "Birendranagar",
      capitalNp: "वीरेन्द्रनगर",
      districts: [
        "Dailekh",
        "Dolpa",
        "Humla",
        "Jajarkot",
        "Jumla",
        "Kalikot",
        "Mugu",
        "Rukum West",
        "Salyan",
        "Surkhet",
      ],
    },

    7: {
      name: "Sudurpashchim",
      np: "सुदूरपश्चिम प्रदेश",
      capital: "Godawari",
      capitalNp: "गोदावरी",
      districts: [
        "Achham",
        "Baitadi",
        "Bajhang",
        "Bajura",
        "Dadeldhura",
        "Darchula",
        "Doti",
        "Kailali",
        "Kanchanpur",
      ],
    },
  };

  const placeSearch = document.getElementById("place-search");
  const placeResults = document.getElementById("place-search-results");
  const placeSearchStatus = document.getElementById("place-search-status");
  const placeSearchForm = placeSearch?.closest("form");

  if (placeSearch && placeResults && placeSearchStatus && placeSearchForm) {
    const slugify = (name) =>
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const places = Object.values(PROVINCES).flatMap((province) => [
      {
        name: province.name,
        type: "Province",
        province: province.np,
        href: `province/${slugify(province.name)}.html`,
      },
      ...province.districts.map((district) => ({
        name: district,
        type: "District",
        province: province.name,
        href: `District/${slugify(district)}.html`,
      })),
    ]);

    placeSearch.addEventListener("input", () => {
      const query = placeSearch.value.trim().toLocaleLowerCase();
      placeResults.replaceChildren();

      if (!query) {
        placeSearchStatus.textContent = "";
        return;
      }

      const matches = places
        .filter((place) => place.name.toLocaleLowerCase().includes(query))
        .sort((first, second) => {
          const firstStarts = first.name.toLocaleLowerCase().startsWith(query);
          const secondStarts = second.name
            .toLocaleLowerCase()
            .startsWith(query);
          return (
            Number(secondStarts) - Number(firstStarts) ||
            first.name.localeCompare(second.name)
          );
        });

      if (matches.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "place-search-empty";
        emptyMessage.textContent =
          "No places found. Check the spelling or try another name.";
        placeResults.append(emptyMessage);
        placeSearchStatus.textContent =
          "No places found. Check the spelling or try another name.";
        return;
      }

      const list = document.createElement("ul");
      list.className = "place-search-list";

      for (const place of matches.slice(0, 8)) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = place.href;

        const name = document.createElement("span");
        name.textContent = place.name;
        link.append(name);

        const detail = document.createElement("small");
        detail.textContent = `${place.type} · ${place.province}`;
        link.append(detail);

        item.append(link);
        list.append(item);
      }

      placeResults.append(list);
      placeSearchStatus.textContent =
        matches.length > 8
          ? `Showing 8 of ${matches.length} matching places. Keep typing to narrow your search.`
          : `${matches.length} matching ${
              matches.length === 1 ? "place" : "places"
            }.`;

      if (matches.length > 8) {
        const resultCount = document.createElement("p");
        resultCount.className = "place-search-count";
        resultCount.textContent = `Showing 8 of ${matches.length} matches. Keep typing to narrow your search.`;
        placeResults.append(resultCount);
      }
    });

    placeSearchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const firstResult = placeResults.querySelector("a");
      if (firstResult) window.location.href = firstResult.href;
    });
  }

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

  districtRows.split("\n").forEach((row) => {
    const [name, headquarters, area, population] = row.split("|");

    DISTRICT_INFO[name] = {
      headquarters,
      area: Number(area),
      population: Number(population),
    };
  });

  const toNepali = (n) => String(n).replace(/\d/g, (d) => "०१२३४५६७८९"[d]);

  const svg = document.getElementById("nepal-map");

  const paths = [...svg.querySelectorAll(".province")];

  const outlineHover = document.getElementById("outline-hover");

  const outlineSelected = document.getElementById("outline-selected");

  const tooltip = document.getElementById("tooltip");

  const legend = document.getElementById("legend");

  const details = document.getElementById("province-details");

  let selectedId = null;

  /* Badges and accessible names */

  svg.querySelectorAll(".badge-num").forEach((t) => {
    t.textContent = toNepali(t.dataset.n);
  });

  paths.forEach((p) => {
    const d = PROVINCES[p.dataset.id];

    p.setAttribute("aria-label", `${d.name} Province, ${d.np}`);

    p.setAttribute("aria-pressed", "false");
  });

  /* Legend buttons */

  legend.innerHTML = Object.entries(PROVINCES)
    .map(
      ([id, d]) => `

  <li><button type="button" data-id="${id}">

    <span class="swatch" style="background:var(--c${id})"></span>

    <span>${d.name}<small>${d.np}</small></span>

  </button></li>`,
    )
    .join("");

  const legendButtons = [...legend.querySelectorAll("button")];

  /* Hover outline */

  function setHover(id) {
    if (id) {
      outlineHover.setAttribute(
        "d",
        document.getElementById(`province-${id}`).getAttribute("d"),
      );
      outlineHover.classList.add("show");
    } else outlineHover.classList.remove("show");
  }

  /* ---------- What happens when a province is clicked ---------- */

  function selectProvince(id) {
    const province = PROVINCES[String(id)];
    if (!province) return;
    const slug = province.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    window.location.href = `province/${slug}.html`;
  }

  let selectedDistrict = null;

  const districtGrid = document.getElementById("district-grid");

  const districtProfile = document.getElementById("district-profile");
  const regionalLinkStatus = document.getElementById("regional-link-status");

  districtGrid.parentElement.addEventListener("mouseleave", hideDistrictHover);

  const linkStoreKey = "nepal-atlas-regional-links-v1";

  function setRegionalLinkStatus(message) {
    regionalLinkStatus.textContent = message;
  }

  const getSavedLinks = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(linkStoreKey) || "[]");
      if (!Array.isArray(saved)) {
        console.error("Saved regional links must be stored as a list.");
        setRegionalLinkStatus(
          "Saved links could not be read. You may need to clear this site's saved data.",
        );
        return [];
      }
      return saved;
    } catch (error) {
      console.error("Could not read saved regional links.", error);
      setRegionalLinkStatus(
        "Saved links are unavailable. Check your browser's storage settings.",
      );
      return [];
    }
  };

  function saveLinks(links) {
    try {
      localStorage.setItem(linkStoreKey, JSON.stringify(links));
      return true;
    } catch (error) {
      console.error("Could not save regional links.", error);
      setRegionalLinkStatus(
        "Could not save this link. Check your browser's storage settings.",
      );
      return false;
    }
  }

  function renderDistricts() {
    const province = PROVINCES[selectedId];

    districtGrid.innerHTML = province.districts
      .map(
        (name) => `

    <button type="button" class="district-choice${selectedDistrict === name ? " active" : ""}" data-district="${name}">

      <span>${name}</span><small>${province.name} Province</small>

    </button>`,
      )
      .join("");

    districtGrid.querySelectorAll("[data-district]").forEach((button) => {
      button.addEventListener("click", () =>
        selectDistrict(button.dataset.district),
      );

      const showPreview = () => showDistrictHover(button.dataset.district);

      button.addEventListener("mouseenter", showPreview);

      button.addEventListener("focus", showPreview);

      button.addEventListener("blur", hideDistrictHover);
    });

    const districtScope = document.querySelector(
      '#link-scope option[value="district"]',
    );

    districtScope.disabled = !selectedDistrict;

    if (!selectedDistrict)
      districtScope.textContent = "Selected district (select a district first)";
    else districtScope.textContent = `Selected district: ${selectedDistrict}`;
  }

  function showDistrictHover(name) {
    const card = document.getElementById("district-hover-card");

    if (!card || !selectedId) return;

    const province = PROVINCES[selectedId];

    const items = getSavedLinks().filter(
      (item) =>
        item.provinceId === selectedId &&
        (item.scope === "province" ||
          (item.scope === "district" && item.district === name)),
    );

    const links = items
      .slice(0, 5)
      .map(
        (item) =>
          `<a href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)} ↗</a>`,
      )
      .join("");

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
    const card = document.getElementById("district-hover-card");

    if (card) card.hidden = true;
  }

  function selectDistrict(name) {
    selectedDistrict = name;

    renderDistricts();

    const province = PROVINCES[selectedId];

    document.getElementById("district-province-label").textContent =
      province.name + " Province";

    document.getElementById("district-name").textContent = name;

    document.getElementById("district-name-np").textContent = "";
    document.getElementById("district-page-link").href = `District/${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}.html`;

    const info = DISTRICT_INFO[name];

    document.getElementById("district-hq").textContent = info
      ? info.headquarters
      : "Data not available";

    document.getElementById("district-pop").textContent = info
      ? `${info.population.toLocaleString("en-IN")} (2021 census)`
      : "Data not available";

    document.getElementById("district-area").textContent = info
      ? `${info.area.toLocaleString("en-IN")} km²`
      : "Data not available";

    districtProfile.hidden = false;

    document.querySelector('#link-scope option[value="district"]').disabled =
      false;

    document.querySelector('#link-scope option[value="district"]').textContent =
      `Selected district: ${name}`;

    renderRegionalLinks();

    districtProfile.scrollIntoView({ behavior: "smooth", block: "nearest" });

    document.dispatchEvent(
      new CustomEvent("district:select", {
        detail: {
          provinceId: selectedId,
          province: province.name,
          district: name,
        },
      }),
    );
  }

  function renderRegionalLinks() {
    const links = getSavedLinks();

    const provinceItems = links.filter(
      (item) => item.provinceId === selectedId && item.scope === "province",
    );

    const districtItems = selectedDistrict
      ? links.filter(
          (item) =>
            item.provinceId === selectedId &&
            item.scope === "district" &&
            item.district === selectedDistrict,
        )
      : [];

    const news = [...provinceItems, ...districtItems].filter(
      (item) => item.type === "news",
    );

    const facebook = [...provinceItems, ...districtItems].filter(
      (item) => item.type === "facebook",
    );

    const renderList = (items, target, emptyText) => {
      const node = document.getElementById(target);
      node.replaceChildren();

      if (items.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-links";
        emptyMessage.textContent = emptyText;
        node.append(emptyMessage);
        return;
      }

      for (const item of items) {
        const row = document.createElement("div");
        row.className = "saved-link-row";

        const link = document.createElement("a");
        link.className = "saved-link";
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.title;
        row.append(link);

        const removeButton = document.createElement("button");
        removeButton.className = "remove-link-btn";
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.setAttribute(
          "aria-label",
          `Remove ${item.title} from this device`,
        );
        removeButton.addEventListener("click", () => {
          const remainingLinks = getSavedLinks().filter(
            (savedLink) => savedLink.id !== item.id,
          );
          if (!saveLinks(remainingLinks)) return;
          setRegionalLinkStatus(`${item.title} removed from this device.`);
          renderRegionalLinks();
        });
        row.append(removeButton);
        node.append(row);
      }
    };

    const scopeText = selectedDistrict
      ? `${PROVINCES[selectedId].name} and ${selectedDistrict}`
      : PROVINCES[selectedId].name;

    renderList(
      news,
      "news-links",
      `No news websites added for ${scopeText} yet. You can add links below.`,
    );

    renderList(
      facebook,
      "facebook-links",
      `No Facebook pages added for ${scopeText} yet. You can add links below.`,
    );
  }

  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  document
    .getElementById("regional-link-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      if (!selectedId) {
        setRegionalLinkStatus(
          "Select a province on the map before saving a regional link.",
        );
        return;
      }

      const title = document.getElementById("link-title").value.trim();

      const url = document.getElementById("link-url").value.trim();

      const type = document.getElementById("link-type").value;

      const scope = document.getElementById("link-scope").value;

      let parsedUrl;
      try {
        parsedUrl = new URL(url);
      } catch {
        setRegionalLinkStatus("Enter a valid website address.");
        return;
      }
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        setRegionalLinkStatus("Use a website address beginning with https://.");
        return;
      }

      const entry = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title,
        url: parsedUrl.href,
        type,
        scope,
        provinceId: selectedId,
        district: scope === "district" ? selectedDistrict : null,
      };

      const links = getSavedLinks();

      const duplicate = links.some(
        (savedLink) =>
          savedLink.provinceId === entry.provinceId &&
          savedLink.scope === entry.scope &&
          savedLink.district === entry.district &&
          savedLink.url === entry.url,
      );
      if (duplicate) {
        setRegionalLinkStatus(
          "That link is already saved for this province or district.",
        );
        return;
      }

      links.push(entry);

      if (!saveLinks(links)) return;

      event.target.reset();

      renderRegionalLinks();
      setRegionalLinkStatus(`${title} saved on this device.`);
    });

  /* ---------- Events ---------- */

  paths.forEach((p) => {
    const id = p.dataset.id;

    p.addEventListener("click", () => selectProvince(id));

    p.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectProvince(id);
      }
    });

    p.addEventListener("mouseenter", () => setHover(id));

    p.addEventListener("mouseleave", () => {
      setHover(null);
      tooltip.hidden = true;
    });

    p.addEventListener("focus", () => setHover(id));

    p.addEventListener("blur", () => setHover(null));

    p.addEventListener("mousemove", (e) => {
      const r = svg.parentElement.getBoundingClientRect();

      tooltip.textContent = `${PROVINCES[id].name} · ${PROVINCES[id].np}`;

      tooltip.style.left = `${e.clientX - r.left}px`;

      tooltip.style.top = `${e.clientY - r.top}px`;

      tooltip.hidden = false;
    });
  });

  legendButtons.forEach((b) => {
    const id = b.dataset.id;

    b.addEventListener("click", () => selectProvince(id));

    b.addEventListener("mouseenter", () => setHover(id));

    b.addEventListener("mouseleave", () => setHover(null));
  });
})();
