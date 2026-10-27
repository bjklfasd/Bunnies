const heroSubtexts = [
  "welcome to v2!",
  "learning resources"
];
const heroSubtextEl = document.getElementById("hero-subtext");
if (heroSubtextEl) {
  const randomIndex = Math.floor(Math.random() * heroSubtexts.length);
  heroSubtextEl.textContent = heroSubtexts[randomIndex];
  heroSubtextEl.style.cursor = "pointer";
  heroSubtextEl.title = "Click for another quote";
  heroSubtextEl.addEventListener("click", () => {
    const newIndex = Math.floor(Math.random() * heroSubtexts.length);
    heroSubtextEl.textContent = heroSubtexts[newIndex];
  });
}

const homeSearchForm = document.getElementById('home-search-form');
const homeSearchInput = document.getElementById('home-search-input');
if (homeSearchForm && homeSearchInput) {
  homeSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = homeSearchInput.value.trim();
    if (!query) return;
    if (!query.startsWith('http://') && !query.startsWith('https://')) {
      query = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
    }
    localStorage.setItem('bunnies-more-url', query);
    window.location.href = 'more.html';
  });
}

(function() {
  const mathPreviews = document.getElementById('recentMathPreviews');
  const sciencePreviews = document.getElementById('recentSciencePreviews');
  
  try {
    const recentGames = JSON.parse(localStorage.getItem('bunnies-recent-games') || '[]');
    const recentApps = JSON.parse(localStorage.getItem('bunnies-recent-apps') || '[]');
    
    if (mathPreviews && recentGames.length > 0) {
      mathPreviews.innerHTML = '';
      recentGames.slice(0, 5).forEach(game => {
        const img = document.createElement('img');
        img.src = game.image || '';
        img.alt = game.title || '';
        img.style.cssText = 'width:32px; height:32px; border-radius:6px; object-fit:cover; border:1px solid var(--border);';
        img.onerror = function() { this.style.display='none'; };
        mathPreviews.appendChild(img);
      });
    }
    
    if (sciencePreviews && recentApps.length > 0) {
      sciencePreviews.innerHTML = '';
      recentApps.slice(0, 5).forEach(app => {
        const img = document.createElement('img');
        img.src = app.image || '';
        img.alt = app.title || '';
        img.style.cssText = 'width:32px; height:32px; border-radius:6px; object-fit:cover; border:1px solid var(--border);';
        img.onerror = function() { this.style.display='none'; };
        sciencePreviews.appendChild(img);
      });
    }
  } catch(e) {}
})();
