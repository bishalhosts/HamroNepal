const search = document.getElementById("district-map-search");
const count = document.getElementById("district-map-count");
const searchForm = document.getElementById("district-map-search-form");
const options = document.getElementById("district-name-options");
const districtData = window.NEPAL_DISTRICT_DATA;

if (!search || !count || !searchForm || !options || !districtData) {
  throw new Error("District map library could not initialize.");
}

const districts = Object.entries(districtData);

for (const [, district] of districts) {
  const option = document.createElement("option");
  option.value = district.name;
  options.append(option);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = search.value.trim().toLocaleLowerCase();
  const district = districts.find(
    ([, item]) => item.name.toLocaleLowerCase() === query,
  );

  if (!district) {
    count.textContent = "Choose a district name from the suggestions.";
    search.focus();
    return;
  }

  window.location.href = `District/${district[0]}.html`;
});
