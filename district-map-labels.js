(function () {
  const svgNamespace = "http://www.w3.org/2000/svg";

  document.querySelectorAll(".district-map-object").forEach((mapObject) => {
    const addDistrictLabels = () => {
      const map = mapObject.contentDocument?.documentElement;
      const districtLinks = map?.querySelectorAll("#districts > a");
      if (!map || !districtLinks || map.querySelector("#district-labels")) return;

      const labels = document.createElementNS(svgNamespace, "g");
      labels.id = "district-labels";
      labels.setAttribute("aria-label", "District names");
      labels.setAttribute("pointer-events", "none");

      districtLinks.forEach((link) => {
        const path = link.querySelector("path[data-name]");
        if (!path) return;

        const { x, y, width, height } = path.getBBox();
        const name = path.dataset.name;
        const words = name.split(" ");
        const longestWord = Math.max(...words.map((word) => word.length));
        const fontSize = Math.max(
          8,
          Math.min(16, width / (longestWord * 0.62), height / 2.2),
        );
        const lineHeight = fontSize * 1.05;
        const text = document.createElementNS(svgNamespace, "text");
        text.setAttribute("x", String(x + width / 2));
        text.setAttribute("y", String(y + height / 2));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("font-size", String(fontSize));
        text.setAttribute("font-family", "Arial, sans-serif");
        text.setAttribute("font-weight", "700");
        text.setAttribute("fill", "#14213d");
        text.setAttribute("stroke", "#ffffff");
        text.setAttribute(
          "stroke-width",
          String(Math.max(1.5, fontSize * 0.2)),
        );
        text.setAttribute("paint-order", "stroke");

        words.forEach((word, index) => {
          const line = document.createElementNS(svgNamespace, "tspan");
          line.setAttribute("x", String(x + width / 2));
          line.setAttribute(
            "dy",
            index === 0
              ? String(((1 - words.length) * lineHeight) / 2)
              : String(lineHeight),
          );
          line.textContent = word;
          text.append(line);
        });

        labels.append(text);
      });

      map.append(labels);
    };

    mapObject.addEventListener("load", addDistrictLabels);
    if (mapObject.contentDocument?.readyState === "complete") {
      addDistrictLabels();
    }
  });
})();
