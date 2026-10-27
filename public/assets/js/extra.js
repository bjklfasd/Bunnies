const params = new URLSearchParams(window.location.search);
const gameName = params.get("game") || "";
const appName = params.get("app") || "";
const directUrl = params.get("url") || "";
const playName = document.getElementById("play-name");
const playFrame = document.getElementById("play-frame");
const refreshBtn = document.getElementById("refresh-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const frameWrapper = document.getElementById("play-frame-wrapper");

const targetName = gameName || appName;
if (playName) {
  playName.textContent = targetName || "Play";
}

function proxyUrl(url) {
  if (!url) return url;
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const cfg = window.__uv$config || (typeof __uv$config !== 'undefined' ? __uv$config : null);
      if (cfg && typeof cfg.encodeUrl === 'function') {
        return cfg.prefix + cfg.encodeUrl(url);
      }
    } catch (e) {}
    try {
      if (typeof UV !== 'undefined' && typeof UV.encodeUrl === 'function') {
        return UV.encodeUrl(url);
      }
    } catch (e) {}
    // Last resort - try to construct UV URL manually
    try {
      const cfg = window.__uv$config;
      if (cfg) {
        return cfg.prefix + btoa(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      }
    } catch (e) {}
  }
  return url;
}

const loadUrl = (url) => {
  if (playFrame && url) {
    const proxied = proxyUrl(url);
    playFrame.src = proxied;
    localStorage.setItem('bunnies-extra-url', url);
    localStorage.setItem('bunnies-extra-name', targetName);
    
    if (targetName) {
      if (gameName) {
        const recent = JSON.parse(localStorage.getItem('bunnies-recent-games') || '[]');
        const gameData = { title: targetName, image: '' };
        fetch('assets/json/games.json').then(r => r.json()).then(games => {
          const g = games.find(x => x.title === targetName);
          if (g && g.image) gameData.image = g.image;
          const filtered = recent.filter(r => r.title !== targetName);
          filtered.unshift(gameData);
          localStorage.setItem('bunnies-recent-games', JSON.stringify(filtered.slice(0, 5)));
        }).catch(() => {
          const filtered = recent.filter(r => r.title !== targetName);
          filtered.unshift(gameData);
          localStorage.setItem('bunnies-recent-games', JSON.stringify(filtered.slice(0, 5)));
        });
      } else if (appName) {
        const recent = JSON.parse(localStorage.getItem('bunnies-recent-apps') || '[]');
        const appData = { title: targetName, image: '' };
        fetch('assets/json/apps.json').then(r => r.json()).then(apps => {
          const a = apps.find(x => x.title === targetName);
          if (a && a.image) appData.image = a.image;
          const filtered = recent.filter(r => r.title !== targetName);
          filtered.unshift(appData);
          localStorage.setItem('bunnies-recent-apps', JSON.stringify(filtered.slice(0, 5)));
        }).catch(() => {
          const filtered = recent.filter(r => r.title !== targetName);
          filtered.unshift(appData);
          localStorage.setItem('bunnies-recent-apps', JSON.stringify(filtered.slice(0, 5)));
        });
      }
    }
  }
};

if (gameName || appName || directUrl) {
  if (directUrl) {
    loadUrl(directUrl);
  } else {
    const urlsFile = gameName ? "assets/json/game-urls.json" : "assets/json/app-urls.json";
    fetch(urlsFile)
      .then((res) => res.json())
      .then((urls) => {
        loadUrl(urls[targetName] || "");
      })
      .catch(() => {});
  }
  if (window.history.replaceState) {
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
} else {
  const savedUrl = localStorage.getItem('bunnies-extra-url');
  const savedName = localStorage.getItem('bunnies-extra-name');
  if (savedUrl && playFrame) {
    if (playName && savedName) playName.textContent = savedName.length > 30 ? savedName.substring(0, 30) + '...' : savedName;
    const proxied = proxyUrl(savedUrl);
    playFrame.src = proxied;
  }
}

if (refreshBtn && playFrame) {
  refreshBtn.addEventListener("click", () => {
    const src = playFrame.src;
    playFrame.src = "";
    playFrame.src = src;
  });
}

if (fullscreenBtn && frameWrapper) {
  fullscreenBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (frameWrapper.requestFullscreen) {
      frameWrapper.requestFullscreen();
    }
  });
}
