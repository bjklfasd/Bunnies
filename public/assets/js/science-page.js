const filterInput = document.getElementById("apps-filter");
const appsGrid = document.getElementById("apps-grid");

const renderApps = (apps, query = "") => {
  if (!appsGrid) return;
  appsGrid.innerHTML = "";
  const filtered = apps.filter((app) => {
    if (!query) return true;
    return (app.title || "").toLowerCase().includes(query);
  });

  filtered.forEach((app) => {
    const card = document.createElement("a");
    card.className = "game-card";
    card.href = `extra.html?app=${encodeURIComponent(app.title || "")}&url=${encodeURIComponent(app.url || "")}`;
    card.dataset.title = app.title || "";

    const img = document.createElement("img");
    img.src = app.image || "";
    img.alt = app.title || "App";

    const overlay = document.createElement("div");
    overlay.className = "game-card-overlay";

    const title = document.createElement("span");
    title.className = "game-card-title";
    title.textContent = app.title || "";

    overlay.appendChild(title);
    card.appendChild(img);
    card.appendChild(overlay);
    appsGrid.appendChild(card);
  });
};

fetch("assets/json/apps.json")
  .then((res) => res.json())
  .then((apps) => {
    renderApps(apps);
    if (filterInput) {
      filterInput.addEventListener("input", () => {
        const query = filterInput.value.toLowerCase().trim();
        renderApps(apps, query);
      });
    }
  })
  .catch(() => {
    renderApps([]);
  });
