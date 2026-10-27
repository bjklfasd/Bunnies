const filterInput = document.getElementById("games-filter");
const gamesGrid = document.getElementById("games-grid");

const renderGames = (games, query = "") => {
  if (!gamesGrid) return;
  gamesGrid.innerHTML = "";
  const filtered = games.filter((game) => {
    if (!query) return true;
    return (game.title || "").toLowerCase().includes(query);
  });

  filtered.forEach((game) => {
    const card = document.createElement("a");
    card.className = "game-card";
    card.href = `extra.html?game=${encodeURIComponent(game.title || "")}&url=${encodeURIComponent(game.url || "")}`;
    card.dataset.title = game.title || "";

    const img = document.createElement("img");
    img.src = game.image || "";
    img.alt = game.title || "Game";

    const overlay = document.createElement("div");
    overlay.className = "game-card-overlay";

    const title = document.createElement("span");
    title.className = "game-card-title";
    title.textContent = game.title || "";

    overlay.appendChild(title);
    card.appendChild(img);
    card.appendChild(overlay);
    gamesGrid.appendChild(card);
  });
};

fetch("assets/json/games.json")
  .then((res) => res.json())
  .then((games) => {
    renderGames(games);
    if (filterInput) {
      filterInput.addEventListener("input", () => {
        const query = filterInput.value.toLowerCase().trim();
        renderGames(games, query);
      });
    }
  })
  .catch(() => {
    renderGames([]);
  });
