(function() {
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#b7a0c9" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.4, "random": true },
      "size": { "value": 3, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": "#9370b3", "opacity": 0.2, "width": 1 },
      "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
    },
    "interactivity": {
      "events": { "onhover": { "enable": true, "mode": "repulse" } }
    }
  });

  const defaultLogo = "/assets/images/bunnies.png";

  function loadLogo() {
    const savedLogo = localStorage.getItem('customLogo');
    const img = document.getElementById('navLogo');
    const previewImg = document.getElementById('previewLogo');
    if (savedLogo) {
      img.src = savedLogo;
      if (previewImg) previewImg.src = savedLogo;
    } else {
      img.src = defaultLogo;
      if (previewImg) previewImg.src = defaultLogo;
    }
  }

  document.getElementById('uploadLogoBtn').addEventListener('click', () => {
    document.getElementById('logoInput').click();
  });

  document.getElementById('logoInput').addEventListener('change', function(e) {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const dataUrl = event.target.result;
        localStorage.setItem('customLogo', dataUrl);
        loadLogo();
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('resetLogoBtn').addEventListener('click', () => {
    localStorage.removeItem('customLogo');
    loadLogo();
  });

  let currentTheme = localStorage.getItem('selectedTheme') || 'default';
  let customThemeData = null;

  try {
    const saved = localStorage.getItem('customTheme');
    if (saved) customThemeData = JSON.parse(saved);
  } catch {}

  function applyTheme(themeId) {
    document.documentElement.className = '';
    if (themeId === 'custom' && customThemeData) {
      const root = document.documentElement;
      root.style.setProperty('--bg-primary', customThemeData.bg || '#1a1025');
      root.style.setProperty('--text-primary', customThemeData.text || '#e8d5ff');
      root.style.setProperty('--text-accent', customThemeData.accent || '#c89bff');
      root.style.setProperty('--text-secondary', customThemeData.secondary || '#b89fd4');
      root.style.setProperty('--bg-secondary', 'rgba(26, 16, 37, 0.9)');
      root.style.setProperty('--bg-card', 'rgba(26, 16, 37, 0.6)');
      root.style.setProperty('--bg-container', 'rgba(10, 6, 18, 0.5)');
      root.style.setProperty('--border-color', 'rgba(180, 130, 255, 0.08)');
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.5)');
      root.style.setProperty('--hover-bg', 'rgba(180, 130, 255, 0.1)');
      root.style.setProperty('--input-bg', 'rgba(10, 6, 18, 0.6)');
      root.style.setProperty('--game-card-bg', 'rgba(26, 16, 37, 0.6)');
      root.style.setProperty('--game-card-hover', 'rgba(26, 16, 37, 0.85)');
      root.style.setProperty('--popup-bg', '#1f1330');
      root.style.setProperty('--scrollbar-thumb', '#5a3d7a');
      localStorage.setItem('selectedTheme', 'custom');
      currentTheme = 'custom';
    } else if (themeId !== 'default' && themeId !== 'custom') {
      document.documentElement.classList.add('theme-' + themeId);
      document.documentElement.style.cssText = '';
      localStorage.setItem('selectedTheme', themeId);
      currentTheme = themeId;
    } else if (themeId === 'default') {
      document.documentElement.style.cssText = '';
      localStorage.setItem('selectedTheme', 'default');
      currentTheme = 'default';
    }
    applyFont(currentFont);
    const select = document.getElementById('themeSelect');
    if (select) select.value = themeId;
  }

  ['customBg', 'customText', 'customAccent', 'customSecondary'].forEach(id => {
    const colorInput = document.getElementById(id);
    const textInput = document.getElementById(id + 'Text');
    if (colorInput && textInput) {
      colorInput.addEventListener('input', () => { textInput.value = colorInput.value; });
      textInput.addEventListener('input', () => {
        if (textInput.value.match(/^#[0-9a-f]{6}$/i)) {
          colorInput.value = textInput.value;
        }
      });
    }
  });

  document.getElementById('applyCustomTheme').addEventListener('click', () => {
    const bg = document.getElementById('customBg').value;
    const text = document.getElementById('customText').value;
    const accent = document.getElementById('customAccent').value;
    const secondary = document.getElementById('customSecondary').value;
    customThemeData = { bg, text, accent, secondary };
    localStorage.setItem('customTheme', JSON.stringify(customThemeData));
    applyTheme('custom');
    document.getElementById('themeSelect').value = 'custom';
  });

  document.getElementById('resetCustomTheme').addEventListener('click', () => {
    localStorage.removeItem('customTheme');
    customThemeData = null;
    document.documentElement.style.cssText = '';
    applyTheme('default');
    document.getElementById('themeSelect').value = 'default';
  });

  let currentFont = localStorage.getItem('siteFont') || 'Poppins';
  const loadedFontLinks = {};

  function ensureFontLoaded(fontName) {
    const bare = fontName.replace(/'/g, '');
    if (loadedFontLinks[bare]) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(bare) + ':wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    loadedFontLinks[bare] = true;
  }

  function applyFont(fontName) {
    ensureFontLoaded(fontName);
    document.documentElement.style.setProperty('--site-font', fontName + ", sans-serif");
    currentFont = fontName;
    localStorage.setItem('siteFont', fontName);
    const select = document.getElementById('fontSelect');
    if (select) select.value = fontName;
    const status = document.getElementById('fontStatus');
    if (status) status.textContent = 'Current font: ' + fontName.replace(/'/g, '');
  }

  document.getElementById('applyFontBtn').addEventListener('click', () => {
    const chosen = document.getElementById('fontSelect').value;
    applyFont(chosen);
  });

  document.getElementById('resetFontBtn').addEventListener('click', () => {
    applyFont('Poppins');
  });

  function applyCloak(favicon, title) {
    if (favicon) {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = favicon;
      document.head.appendChild(link);
      localStorage.setItem('cloakFavicon', favicon);
    }
    if (title) {
      document.title = title;
      localStorage.setItem('cloakTitle', title);
    }
  }

  function resetCloak() {
    const defaultFavicon = '/assets/images/bunnies.png';
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = defaultFavicon;
    document.head.appendChild(link);
    document.title = 'Bunnies';
    localStorage.removeItem('cloakFavicon');
    localStorage.removeItem('cloakTitle');
    document.getElementById('faviconInput').value = '';
    document.getElementById('titleInput').value = '';
    document.getElementById('faviconPreset').value = '';
  }

  const savedFavicon = localStorage.getItem('cloakFavicon');
  const savedTitle = localStorage.getItem('cloakTitle');
  if (savedFavicon || savedTitle) applyCloak(savedFavicon, savedTitle);

  document.getElementById('faviconPreset').addEventListener('change', function() {
    if (this.value) {
      document.getElementById('faviconInput').value = this.value;
      const title = this.options[this.selectedIndex]?.dataset?.title;
      if (title) document.getElementById('titleInput').value = title;
    }
  });

  let clickerInterval = null;
  let isClickerRunning = false;
  let clickerKeybind = localStorage.getItem('clickerKeybind') || 'F8';

  function loadKeybind() {
    const input = document.getElementById('clickerKeybind');
    if (input) input.value = clickerKeybind;
    updateClickerInfo();
  }

  function updateClickerInfo() {
    const info = document.getElementById('clickerInfo');
    const ms = parseInt(document.getElementById('clickerInterval').value) || 100;
    if (isClickerRunning) {
      info.textContent = `Clicking every ${ms}ms • Press ${clickerKeybind} to stop`;
    } else {
      info.textContent = `Click interval: ${ms}ms • Press ${clickerKeybind} to start`;
    }
  }

  function saveKeybind(key) {
    clickerKeybind = key.toUpperCase();
    localStorage.setItem('clickerKeybind', clickerKeybind);
    updateClickerInfo();
  }

  document.getElementById('clickerKeybind').addEventListener('keydown', function(e) {
    e.preventDefault();
    let key = e.key;
    const specialKeys = {
      ' ': 'SPACE', 'Escape': 'ESC', 'Control': 'CTRL', 'Shift': 'SHIFT',
      'Alt': 'ALT', 'Meta': 'WIN', 'ArrowUp': 'UP', 'ArrowDown': 'DOWN',
      'ArrowLeft': 'LEFT', 'ArrowRight': 'RIGHT', 'Enter': 'ENTER',
      'Tab': 'TAB', 'Backspace': 'BACKSPACE', 'Delete': 'DELETE',
      'Home': 'HOME', 'End': 'END', 'PageUp': 'PAGEUP', 'PageDown': 'PAGEDOWN'
    };
    key = specialKeys[key] || (key.length === 1 ? key.toUpperCase() : key);
    this.value = key;
    saveKeybind(key);
  });

  function simulateClick() {
    const event = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
    document.activeElement?.dispatchEvent(event);
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    if (el) el.click();
  }

  function toggleClicker() {
    const intervalInput = document.getElementById('clickerInterval');
    const status = document.getElementById('clickerStatus');
    const info = document.getElementById('clickerInfo');
    const btn = document.getElementById('toggleClicker');

    if (isClickerRunning) {
      clearInterval(clickerInterval);
      clickerInterval = null;
      isClickerRunning = false;
      btn.innerHTML = '<i class="fas fa-play"></i> Start';
      status.textContent = 'Stopped';
      status.style.color = 'var(--text-secondary)';
      info.textContent = `Clicker stopped • Press ${clickerKeybind} to start`;
    } else {
      const ms = parseInt(intervalInput.value) || 100;
      if (ms < 50) { info.textContent = '⚠️ Minimum interval is 50ms'; return; }
      clickerInterval = setInterval(simulateClick, ms);
      isClickerRunning = true;
      btn.innerHTML = '<i class="fas fa-stop"></i> Stop';
      status.textContent = 'Running';
      status.style.color = '#5fb85f';
      info.textContent = `Clicking every ${ms}ms • Press ${clickerKeybind} to stop`;
    }
  }

  document.getElementById('toggleClicker').addEventListener('click', toggleClicker);
  document.getElementById('clickerTest').addEventListener('click', function() {
    simulateClick();
    document.getElementById('clickerInfo').textContent = '✅ Test click performed!';
    setTimeout(updateClickerInfo, 1000);
  });
  document.getElementById('clickerInterval').addEventListener('change', updateClickerInfo);

  document.addEventListener('keydown', (e) => {
    let key = e.key;
    const specialKeys = {
      ' ': 'SPACE', 'Escape': 'ESC', 'Control': 'CTRL', 'Shift': 'SHIFT',
      'Alt': 'ALT', 'Meta': 'WIN', 'ArrowUp': 'UP', 'ArrowDown': 'DOWN',
      'ArrowLeft': 'LEFT', 'ArrowRight': 'RIGHT', 'Enter': 'ENTER',
      'Tab': 'TAB', 'Backspace': 'BACKSPACE', 'Delete': 'DELETE',
      'Home': 'HOME', 'End': 'END', 'PageUp': 'PAGEUP', 'PageDown': 'PAGEDOWN'
    };
    key = specialKeys[key] || (key.length === 1 ? key.toUpperCase() : key);
    if (key === clickerKeybind) { e.preventDefault(); toggleClicker(); }
  });

  let embedOverlay = null;
  let embedIframe = null;
  let embedClose = null;

  function createEmbedOverlay() {
    const existing = document.getElementById('embedOverlay');
    if (existing) existing.remove();

    embedOverlay = document.createElement('div');
    embedOverlay.id = 'embedOverlay';
    embedOverlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
      z-index: 1001; display: none; align-items: center; justify-content: center;
      padding: 40px;
    `;

    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%; max-width: 1000px; height: 85%;
      background: var(--bg-primary); border-radius: 32px;
      overflow: hidden; position: relative;
      border: 1px solid var(--border-color);
      box-shadow: 0 30px 80px var(--shadow-color);
    `;

    embedIframe = document.createElement('iframe');
    embedIframe.style.cssText = 'width:100%; height:100%; border:none;';
    embedIframe.src = 'about:blank';

    embedClose = document.createElement('button');
    embedClose.innerHTML = '<i class="fas fa-times"></i>';
    embedClose.style.cssText = `
      position: absolute; top: 16px; right: 20px;
      background: rgba(255,255,255,0.08); border: none;
      color: white; width: 44px; height: 44px;
      border-radius: 40px; font-size: 1.4rem;
      cursor: pointer; transition: 0.15s; z-index: 10;
      display: flex; align-items: center; justify-content: center;
    `;

    container.appendChild(embedIframe);
    container.appendChild(embedClose);
    embedOverlay.appendChild(container);
    document.body.appendChild(embedOverlay);

    embedClose.addEventListener('click', () => {
      embedOverlay.style.display = 'none';
      embedIframe.src = 'about:blank';
      document.getElementById('embedStatus').textContent = 'Closed';
    });

    embedOverlay.addEventListener('click', (e) => {
      if (e.target === embedOverlay) embedClose.click();
    });
  }

  document.getElementById('embedButton').addEventListener('click', function() {
    const url = document.getElementById('embedUrl').value.trim();
    const status = document.getElementById('embedStatus');
    if (!url) { status.textContent = '⚠️ Please enter a URL'; return; }
    try { new URL(url); } catch { status.textContent = '⚠️ Invalid URL. Include http:// or https://'; return; }
    if (!embedOverlay) createEmbedOverlay();
    embedIframe.src = url;
    embedOverlay.style.display = 'flex';
    status.textContent = `✅ Embedded: ${url}`;
  });

  function getRecent(type) {
    try {
      const data = localStorage.getItem('recent' + type);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function addRecent(type, id) {
    let recent = getRecent(type).filter(itemId => itemId !== id);
    recent.unshift(id);
    if (recent.length > 8) recent.pop();
    localStorage.setItem('recent' + type, JSON.stringify(recent));
    if (type === 'Games') renderRecentGames();
    else renderRecentApps();
  }

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]'); } catch { return []; }
  }

  function saveFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
  }

  function isFavorite(id) {
    return getFavorites().some(f => f.id === id);
  }

  function toggleFavorite(id, type) {
    let favs = getFavorites();
    const idx = favs.findIndex(f => f.id === id);
    if (idx > -1) {
      favs.splice(idx, 1);
    } else {
      favs.push({ id, type });
    }
    saveFavorites(favs);
    renderRecentGames();
    renderRecentApps();
    renderFavorites();
    if (currentPage === 'games') renderGamesRoster(document.getElementById('sharedSearchBar').value);
    else if (currentPage === 'apps') renderAppsRoster(document.getElementById('sharedSearchBar').value);
  }

  function renderRecentGames() {
    const container = document.getElementById('recentGames');
    const recentIds = getRecent('Games');
    if (recentIds.length === 0) {
      container.innerHTML = '<span style="opacity:0.4; font-size:0.9rem;"><i class="fas fa-info-circle"></i> No games played yet</span>';
      return;
    }
    const recentItems = recentIds.map(id => games.find(g => g.id === id)).filter(Boolean);
    container.innerHTML = recentItems.map(g => `
      <div class="recent-item" data-id="${g.id}" data-type="game">
        <img src="${g.img}" alt="${g.name}" onerror="handleImgError(this)">
        <span class="recent-name">${g.name}</span>
        <button class="fav-btn${isFavorite(g.id) ? ' fav-active' : ''}" data-id="${g.id}" data-type="game"><i class="fa${isFavorite(g.id) ? 's' : 'r'} fa-heart"></i></button>
      </div>
    `).join('');
    container.querySelectorAll('.recent-item > .fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(btn.dataset.id, 'game'); });
    });
    container.querySelectorAll('.recent-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;
        const game = games.find(g => g.id === el.dataset.id);
        if (game) launchItem(game);
      });
    });
  }

  function renderRecentApps() {
    const container = document.getElementById('recentApps');
    const recentIds = getRecent('Apps');
    if (recentIds.length === 0) {
      container.innerHTML = '<span style="opacity:0.4; font-size:0.9rem;"><i class="fas fa-info-circle"></i> No apps used yet</span>';
      return;
    }
    const recentItems = recentIds.map(id => apps.find(a => a.id === id)).filter(Boolean);
    container.innerHTML = recentItems.map(a => `
      <div class="recent-item" data-id="${a.id}" data-type="app">
        <img src="${a.img}" alt="${a.name}" onerror="handleImgError(this)">
        <span class="recent-name">${a.name}</span>
        <button class="fav-btn${isFavorite(a.id) ? ' fav-active' : ''}" data-id="${a.id}" data-type="app"><i class="fa${isFavorite(a.id) ? 's' : 'r'} fa-heart"></i></button>
      </div>
    `).join('');
    container.querySelectorAll('.recent-item > .fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(btn.dataset.id, 'app'); });
    });
    container.querySelectorAll('.recent-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;
        const app = apps.find(a => a.id === el.dataset.id);
        if (app) launchItem(app);
      });
    });
  }

  function renderFavorites() {
    const container = document.getElementById('favoritesGrid');
    const favs = getFavorites();
    if (favs.length === 0) {
      container.innerHTML = '<span style="opacity:0.4; font-size:0.9rem;"><i class="fas fa-info-circle"></i> No favorites yet. Click the <i class="far fa-heart"></i> on any game or app to favorite it.</span>';
      return;
    }
    const items = favs.map(f => {
      const game = games.find(g => g.id === f.id);
      const app = apps.find(a => a.id === f.id);
      return game || app;
    }).filter(Boolean);
    container.innerHTML = items.map(item => {
      const type = games.some(g => g.id === item.id) ? 'game' : 'app';
      return `
      <div class="recent-item" data-id="${item.id}" data-type="${type}">
        <img src="${item.img}" alt="${item.name}" onerror="handleImgError(this)">
        <span class="recent-name">${item.name}</span>
        <button class="fav-btn fav-active" data-id="${item.id}" data-type="${type}"><i class="fas fa-heart"></i></button>
      </div>`;
    }).join('');
    container.querySelectorAll('.recent-item > .fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(btn.dataset.id, btn.dataset.type); });
    });
    container.querySelectorAll('.recent-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;
        const item = games.find(g => g.id === el.dataset.id) || apps.find(a => a.id === el.dataset.id);
        if (item) launchItem(item);
      });
    });
  }

  let currentItem = null;

  async function launchItem(item) {
    const overlay = document.getElementById('gameIframeOverlay');
    const iframe = document.getElementById('gameIframe');
    let url = item.url;
    if (url.startsWith('http') && typeof __uv$config !== 'undefined') {
      try { await registerSW(); } catch {}
      url = __uv$config.prefix + __uv$config.encodeUrl(url);
    }
    iframe.src = url;
    overlay.classList.add('active');
    currentItem = item;
    const isGame = games.some(g => g.id === item.id);
    addRecent(isGame ? 'Games' : 'Apps', item.id);
  }

  document.getElementById('gameIframeClose').addEventListener('click', () => {
    document.getElementById('gameIframeOverlay').classList.remove('active');
    document.getElementById('gameIframe').src = 'about:blank';
    currentItem = null;
  });

  document.getElementById('gameIframeReload').addEventListener('click', () => {
    const iframe = document.getElementById('gameIframe');
    if (currentItem) {
      let url = currentItem.url;
      if (url.startsWith('http') && typeof __uv$config !== 'undefined') {
        url = __uv$config.prefix + __uv$config.encodeUrl(url);
      }
      iframe.src = url;
    } else {
      iframe.src = iframe.src;
    }
  });

  document.getElementById('gameIframeFullscreen').addEventListener('click', () => {
    const iframe = document.getElementById('gameIframe');
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  });

  document.getElementById('gameIframeOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) document.getElementById('gameIframeClose').click();
  });

  function renderGamesRoster(filter = '') {
    const container = document.getElementById('gamesRoster');
    const filtered = games.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));
    filtered.sort((a, b) => (isFavorite(b.id) ? 1 : 0) - (isFavorite(a.id) ? 1 : 0));
    container.innerHTML = filtered.map(g => `
      <div class="roster-card" data-id="${g.id}" data-type="game">
        <img src="${g.img}" alt="${g.name}" onerror="handleImgError(this)">
        <span>${g.name}</span>
        <button class="fav-btn${isFavorite(g.id) ? ' fav-active' : ''}" data-id="${g.id}" data-type="game"><i class="fa${isFavorite(g.id) ? 's' : 'r'} fa-heart"></i></button>
      </div>
    `).join('');
    container.querySelectorAll('.roster-card > .fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(btn.dataset.id, 'game'); });
    });
    container.querySelectorAll('.roster-card').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;
        const game = games.find(g => g.id === el.dataset.id);
        if (game) launchItem(game);
      });
    });
  }

  function renderAppsRoster(filter = '') {
    const container = document.getElementById('appsRoster');
    const filtered = apps.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()));
    filtered.sort((a, b) => (isFavorite(b.id) ? 1 : 0) - (isFavorite(a.id) ? 1 : 0));
    container.innerHTML = filtered.map(a => `
      <div class="roster-card" data-id="${a.id}" data-type="app">
        <img src="${a.img}" alt="${a.name}" onerror="handleImgError(this)">
        <span>${a.name}</span>
        <button class="fav-btn${isFavorite(a.id) ? ' fav-active' : ''}" data-id="${a.id}" data-type="app"><i class="fa${isFavorite(a.id) ? 's' : 'r'} fa-heart"></i></button>
      </div>
    `).join('');
    container.querySelectorAll('.roster-card > .fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(btn.dataset.id, 'app'); });
    });
    container.querySelectorAll('.roster-card').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;
        const app = apps.find(a => a.id === el.dataset.id);
        if (app) launchItem(app);
      });
    });
  }

  const homeSearchBar = document.getElementById('homeSearchBar');
  const aiResponseHome = document.getElementById('aiResponseHome');
  const aiResponseHomeText = document.getElementById('aiResponseHomeText');

  function updateHomeAIResponse(text) {
    aiResponseHomeText.textContent = text;
    aiResponseHome.classList.add('visible');
  }

  homeSearchBar.addEventListener('input', function() {
    const query = this.value.trim();
    if (query.length > 2) {
      const response = getAIResponse(query);
      if (response) updateHomeAIResponse(response);
    } else if (query.length === 0) {
      aiResponseHome.classList.remove('visible');
    }
  });

  homeSearchBar.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim().length > 2) {
      const query = this.value.trim();
      const response = getAIResponse(query);
      if (response) {
        updateHomeAIResponse(response);
      } else {
        updateHomeAIResponse('I don\'t have a quick answer for that. Try asking in the AI assistant!');
      }
    }
  });

  const sharedSearch = document.getElementById('sharedSearchBar');
  sharedSearch.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (currentPage === 'games' && document.getElementById('gamesRoster').style.display !== 'none') {
      renderGamesRoster(val);
    } else if (currentPage === 'apps' && document.getElementById('appsRoster').style.display !== 'none') {
      renderAppsRoster(val);
    }
  });

  const taglines = [
    'we love hopping',
    'essentially biw v7',
    'carrots not included',
    'made with love <3',
    'you should go play roblox',
    'woahh',
    'ayo thats gay',
    'we love ynrbsu'
  ];

  function setRandomTagline() {
    const el = document.getElementById('taglineWord');
    if (!el) return;
    let next;
    do { next = taglines[Math.floor(Math.random() * taglines.length)]; } while (taglines.length > 1 && next === el.textContent);
    el.textContent = next;
  }

  const taglineTextEl = document.getElementById('taglineText');
  if (taglineTextEl) {
    taglineTextEl.style.cursor = 'pointer';
    taglineTextEl.addEventListener('click', setRandomTagline);
  }

  const navHome = document.getElementById('navHome');
  const navApps = document.getElementById('navApps');
  const navGames = document.getElementById('navGames');
  const navAddons = document.getElementById('navAddons');
  const navSettings = document.getElementById('navSettings');
  const navAi = document.getElementById('navAi');

  const backBtn = document.getElementById('navBack');
  const forwardBtn = document.getElementById('navForward');
  const reloadBtn = document.getElementById('navReload');

  let currentPage = 'home';
  let pageHistory = ['home'];
  let historyIndex = 0;

  function setActive(btn) {
    [navHome, navApps, navGames, navAddons].forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function updateNavButtons() {
    backBtn.disabled = historyIndex === 0;
    forwardBtn.disabled = historyIndex === pageHistory.length - 1;
  }

  function navigateTo(page, addToHistory = true) {
    if (page === currentPage && addToHistory) return;
    if (addToHistory) {
      pageHistory = pageHistory.slice(0, historyIndex + 1);
      pageHistory.push(page);
      historyIndex = pageHistory.length - 1;
    }
    currentPage = page;

    const homeContent = document.getElementById('homeContent');
    const gamesRoster = document.getElementById('gamesRoster');
    const appsRoster = document.getElementById('appsRoster');
    const pageTitle = document.getElementById('pageTitle');
    const pageIndicator = document.getElementById('pageIndicator');
    const searchBar = document.getElementById('sharedSearchBar');

    homeContent.style.display = 'none';
    gamesRoster.style.display = 'none';
    appsRoster.style.display = 'none';
    searchBar.classList.remove('visible');
    document.getElementById('aiResponseHome').classList.remove('visible');
    searchBar.value = '';

    if (page === 'home') {
      homeContent.style.display = 'block';
      pageTitle.innerHTML = '<i class="fas fa-bunny"></i> Bunnies';
      pageIndicator.innerHTML = '<i class="fas fa-home"></i> Home';
      setActive(navHome);
      renderRecentGames();
      renderRecentApps();
      renderFavorites();
    } else if (page === 'games') {
      gamesRoster.style.display = 'flex';
      pageTitle.innerHTML = '<i class="fas fa-gamepad"></i> Games';
      pageIndicator.innerHTML = '<i class="fas fa-gamepad"></i> Games';
      setActive(navGames);
      searchBar.placeholder = 'Search games...';
      searchBar.classList.add('visible');
      renderGamesRoster();
    } else if (page === 'apps') {
      appsRoster.style.display = 'flex';
      pageTitle.innerHTML = '<i class="fas fa-th-large"></i> Apps';
      pageIndicator.innerHTML = '<i class="fas fa-th-large"></i> Apps';
      setActive(navApps);
      searchBar.placeholder = 'Search apps...';
      searchBar.classList.add('visible');
      renderAppsRoster();
    }
    document.getElementById('contentContainer').scrollTop = 0;
    updateNavButtons();
  }

  navHome.addEventListener('click', () => navigateTo('home', true));
  navApps.addEventListener('click', () => navigateTo('apps', true));
  navGames.addEventListener('click', () => navigateTo('games', true));

  backBtn.addEventListener('click', () => {
    if (historyIndex > 0) { historyIndex--; navigateTo(pageHistory[historyIndex], false); }
  });

  forwardBtn.addEventListener('click', () => {
    if (historyIndex < pageHistory.length - 1) { historyIndex++; navigateTo(pageHistory[historyIndex], false); }
  });

  reloadBtn.addEventListener('click', () => {
    setRandomTagline();
    if (currentPage === 'home') {
      renderRecentGames();
      renderRecentApps();
      renderFavorites();
    } else if (currentPage === 'games') {
      renderGamesRoster(document.getElementById('sharedSearchBar').value);
    } else if (currentPage === 'apps') {
      renderAppsRoster(document.getElementById('sharedSearchBar').value);
    }
  });

  document.getElementById('navFullscreen').addEventListener('click', () => {
    const card = document.getElementById('contentCard');
    if (!document.fullscreenElement) {
      card.requestFullscreen?.() || card.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  });

  document.getElementById('discordLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.open('/discord', '_blank');
  });

  document.getElementById('moneyLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.open('https://www.effectivecpmnetwork.com/m6f5kffz?key=0ee4bd2935616ab215beace3e13a7403', '_blank');
  });

  document.getElementById('closeAddonPopupX').addEventListener('click', () => addonPopup.classList.remove('active'));
  document.getElementById('closeSettingsPopupX').addEventListener('click', () => settingsPopup.classList.remove('active'));
  document.getElementById('closeAiPopupX').addEventListener('click', () => aiPopup.classList.remove('active'));

  document.getElementById('closeAddonPopup').addEventListener('click', () => addonPopup.classList.remove('active'));
  document.getElementById('closeSettingsPopup').addEventListener('click', () => settingsPopup.classList.remove('active'));
  document.getElementById('closeAiPopup').addEventListener('click', () => aiPopup.classList.remove('active'));

  [addonPopup, settingsPopup, aiPopup].forEach(pop => {
    pop.addEventListener('click', (e) => { if (e.target === pop) pop.classList.remove('active'); });
  });

  navAddons.addEventListener('click', () => {
    addonPopup.classList.add('active');
    if (customThemeData) {
      document.getElementById('customBg').value = customThemeData.bg || '#1a1025';
      document.getElementById('customBgText').value = customThemeData.bg || '#1a1025';
      document.getElementById('customText').value = customThemeData.text || '#e8d5ff';
      document.getElementById('customTextText').value = customThemeData.text || '#e8d5ff';
      document.getElementById('customAccent').value = customThemeData.accent || '#c89bff';
      document.getElementById('customAccentText').value = customThemeData.accent || '#c89bff';
      document.getElementById('customSecondary').value = customThemeData.secondary || '#b89fd4';
      document.getElementById('customSecondaryText').value = customThemeData.secondary || '#b89fd4';
    }
    loadKeybind();
    const fontSelect = document.getElementById('fontSelect');
    if (fontSelect) fontSelect.value = currentFont;
    const fontStatus = document.getElementById('fontStatus');
    if (fontStatus) fontStatus.textContent = 'Current font: ' + currentFont.replace(/'/g, '');
  });

  navSettings.addEventListener('click', () => {
    settingsPopup.classList.add('active');
    document.getElementById('faviconInput').value = localStorage.getItem('cloakFavicon') || '';
    document.getElementById('titleInput').value = localStorage.getItem('cloakTitle') || '';
    document.getElementById('autoCloakFaviconInput').value = localStorage.getItem('autoCloakFavicon') || '';
    document.getElementById('autoCloakTitleInput').value = localStorage.getItem('autoCloakTitle') || '';
    document.getElementById('themeSelect').value = currentTheme;
  });

  navAi.addEventListener('click', () => {
    aiPopup.classList.add('active');
    document.getElementById('aiResponse').innerHTML = '<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> Hello! I\'m your AI assistant. Ask me anything about the site or click a preset question above.';
    document.getElementById('aiInput').value = '';
  });

  document.querySelectorAll('.ai-presets button').forEach(btn => {
    btn.addEventListener('click', function() {
      const question = this.dataset.question;
      document.getElementById('aiInput').value = question;
      sendAIQuestion(question);
    });
  });

  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiInput = document.getElementById('aiInput');
  const aiResponse = document.getElementById('aiResponse');
  const GROQ_API_KEY = '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';

  function sendAIQuestion(query) {
    if (!query.trim()) { aiResponse.innerHTML = 'Please ask something!'; return; }
    aiResponse.innerHTML = '<i class="fas fa-spinner fa-spin"></i> thinking...';

    const localAnswer = getAIResponse(query);
    if (localAnswer) {
      aiResponse.innerHTML = `<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> ${localAnswer}`;
      return;
    }

    try {
      fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [{
            role: 'system',
            content: 'You are a helpful assistant for a website called "Bunnies". The site has features like: apps, games, custom themes, custom logo upload, auto clicker with keybinds, iframe embedder, settings, tab cloaking, and extensions. Keep answers concise and helpful. If the user asks a general question not related to the site (like writing an essay, answering trivia, or anything else), answer that too.'
          },
          {
            role: 'user',
            content: query
          }],
          temperature: 0.7,
          max_tokens: 500
        })
      })
        .then(res => {
          if (!res.ok) throw new Error(`API error ${res.status}`);
          return res.json();
        })
        .then(data => {
          const reply = data.choices?.[0]?.message?.content || 'No reply';
          aiResponse.innerHTML = `<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> ${reply}`;
        })
        .catch(() => {
          aiResponse.innerHTML = `<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> Hmm, I'm having trouble connecting right now. Try asking again or check your connection!`;
        });
    } catch {
      aiResponse.innerHTML = `<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> Hmm, I'm having trouble connecting right now. Try asking again or check your connection!`;
    }
  }

  aiSendBtn.addEventListener('click', () => {
    sendAIQuestion(aiInput.value);
  });

  aiInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendAIQuestion(aiInput.value);
  });

  document.getElementById('themeSelect').addEventListener('change', function() {
    applyTheme(this.value);
  });

  document.getElementById('applyCloak').addEventListener('click', () => {
    const favicon = document.getElementById('faviconInput').value.trim();
    const title = document.getElementById('titleInput').value.trim();
    if (favicon || title) applyCloak(favicon, title);
  });

  document.getElementById('resetCloak').addEventListener('click', resetCloak);

  // Auto Cloak (tab switch) handlers
  document.getElementById('autoCloakPreset').addEventListener('change', function() {
    if (this.value) {
      document.getElementById('autoCloakFaviconInput').value = this.value;
      const title = this.options[this.selectedIndex]?.dataset?.title;
      if (title) document.getElementById('autoCloakTitleInput').value = title;
    }
  });

  document.getElementById('applyAutoCloak').addEventListener('click', () => {
    const favicon = document.getElementById('autoCloakFaviconInput').value.trim();
    const title = document.getElementById('autoCloakTitleInput').value.trim();
    if (favicon) localStorage.setItem('autoCloakFavicon', favicon);
    else localStorage.removeItem('autoCloakFavicon');
    if (title) localStorage.setItem('autoCloakTitle', title);
    else localStorage.removeItem('autoCloakTitle');
  });

  document.getElementById('resetAutoCloak').addEventListener('click', () => {
    localStorage.removeItem('autoCloakFavicon');
    localStorage.removeItem('autoCloakTitle');
    document.getElementById('autoCloakPreset').value = '';
    document.getElementById('autoCloakFaviconInput').value = '';
    document.getElementById('autoCloakTitleInput').value = '';
  });

  // URL Cloaking
  document.getElementById('launchAboutBlank').addEventListener('click', function() {
    const url = window.location.href;
    const title = document.title;
    const link = document.querySelector("link[rel*='icon']");
    const favicon = link ? link.href : '';
    const w = window.open('about:blank');
    if (w) {
      w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + title + '</title><link rel="icon" href="' + favicon + '"></head><body style="margin:0;overflow:hidden;"><iframe src="' + url + '" style="width:100vw;height:100vh;border:none;"></iframe></body></html>');
      w.document.close();
    }
  });

  document.getElementById('launchBlob').addEventListener('click', function() {
    const url = window.location.href;
    const title = document.title;
    const link = document.querySelector("link[rel*='icon']");
    const favicon = link ? link.href : '';
    const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + title + '</title><link rel="icon" href="' + favicon + '"></head><body style="margin:0;overflow:hidden;"><iframe src="' + url + '" style="width:100vw;height:100vh;border:none;"></iframe></body></html>';
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.sandbox = 'allow-scripts allow-popups';
    iframe.srcdoc = '<script>var h=' + JSON.stringify(html) + ';var b=new Blob([h],{type:"text/html"});window.open(URL.createObjectURL(b));<\/script>';
    document.body.appendChild(iframe);
    setTimeout(function() { iframe.remove(); }, 100);
  });

  // Browser (tabbed proxy)
  const browserOverlay = document.getElementById('browserOverlay');
  const browserTabsEl = document.getElementById('browserTabs');
  const browserTabAdd = document.getElementById('browserTabAdd');
  const browserClose = document.getElementById('browserClose');
  const browserBack = document.getElementById('browserBack');
  const browserForward = document.getElementById('browserForward');
  const browserReload = document.getElementById('browserReload');
  const browserUrl = document.getElementById('browserUrl');
  const browserContent = document.getElementById('browserContent');
  const browserUrlInput = document.getElementById('browserUrlInput');
  const browserLaunchBtn = document.getElementById('browserLaunchBtn');
  const browserStatus = document.getElementById('browserStatus');

  let browserTabsData = [];
  let browserActiveTabId = null;
  let browserTabIdCounter = 1;
  let browserSWReady = false;

  async function browserEnsureSW() {
    if (!browserSWReady && typeof registerSW !== 'undefined') {
      try {
        await registerSW();
        browserSWReady = true;
      } catch (e) {
        console.warn('Browser SW:', e);
      }
    }
  }

  function browserGetTab(id) {
    return browserTabsData.find(t => t.id === id);
  }

  function browserGetActive() {
    return browserActiveTabId ? browserGetTab(browserActiveTabId) : null;
  }

  function browserMakeUrl(input) {
    if (typeof search !== 'undefined') {
      return search(input, 'https://duckduckgo.com/?q=%s');
    }
    try { return new URL(input).toString(); }
    catch { return 'https://duckduckgo.com/?q=' + encodeURIComponent(input); }
  }

  function browserEncodeUrl(raw) {
    if (raw === 'about:blank' || raw.startsWith('data:')) return raw;
    if (typeof __uv$config !== 'undefined' && browserSWReady) {
      return __uv$config.prefix + __uv$config.encodeUrl(raw);
    }
    return raw;
  }

  function browserCreateIframe(src) {
    const iframe = document.createElement('iframe');
    iframe.src = src || 'about:blank';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'width:100%;height:100%;border:none;display:none;';
    browserContent.appendChild(iframe);
    iframe.addEventListener('load', function() { browserUpdateFromFrame(); });
    iframe.addEventListener('pageshow', function() { browserUpdateFromFrame(); });
    return iframe;
  }

  function browserCreateTab(input, switchTo) {
    const id = browserTabIdCounter++;
    const isBlank = !input || !input.trim();
    const rawUrl = isBlank ? 'about:blank' : browserMakeUrl(input.trim());
    const displayTitle = isBlank ? 'New Tab' : input.trim();
    const encodedUrl = browserEncodeUrl(rawUrl);
    const tab = {
      id,
      iframe: browserCreateIframe(encodedUrl),
      rawUrl,
      encodedUrl,
      title: displayTitle,
      favicon: null,
      history: isBlank ? [] : [rawUrl],
      historyIndex: isBlank ? -1 : 0
    };
    browserTabsData.push(tab);
    if (switchTo !== false) {
      browserActiveTabId = id;
      browserLoadTab(tab);
    }
    browserRenderTabs();
    return tab;
  }

  function browserSwitchTab(id) {
    const tab = browserGetTab(id);
    if (!tab) return;
    browserActiveTabId = id;
    browserLoadTab(tab);
    browserRenderTabs();
  }

  function browserLoadTab(tab) {
    if (!tab) return;
    browserTabsData.forEach(t => {
      t.iframe.style.display = t.id === tab.id ? 'flex' : 'none';
    });
    browserUrl.value = tab.rawUrl;
  }

  function browserCloseTab(id) {
    const tab = browserGetTab(id);
    if (!tab) return;
    tab.iframe.remove();
    const idx = browserTabsData.findIndex(t => t.id === id);
    browserTabsData.splice(idx, 1);
    if (browserTabsData.length === 0) {
      browserOverlay.classList.remove('active');
      browserActiveTabId = null;
      browserTabsEl.innerHTML = '';
      browserDisableAutoCloak();
      return;
    }
    if (browserActiveTabId === id) {
      const newIdx = Math.min(idx, browserTabsData.length - 1);
      browserActiveTabId = browserTabsData[newIdx].id;
      browserLoadTab(browserTabsData[newIdx]);
    }
    browserRenderTabs();
  }

  function browserNavigate(input) {
    const tab = browserGetActive();
    if (!tab) {
      browserCreateTab(input);
      return;
    }
    const rawUrl = browserMakeUrl(input.trim());
    const encoded = browserEncodeUrl(rawUrl);
    tab.rawUrl = rawUrl;
    tab.encodedUrl = encoded;
    tab.title = input.trim();
    tab.history = tab.history.slice(0, tab.historyIndex + 1);
    tab.history.push(rawUrl);
    tab.historyIndex = tab.history.length - 1;
    tab.iframe.src = encoded;
    browserUrl.value = rawUrl;
    browserRenderTabs();
  }

  function browserDecodeFrameUrl(iframe) {
    try {
      const loc = iframe.contentWindow.location;
      const href = loc.href;
      if (href === 'about:blank') return null;
      const prefix = typeof __uv$config !== 'undefined' ? __uv$config.prefix : null;
      if (prefix) {
        const idx = href.indexOf(prefix);
        if (idx !== -1) {
          const encoded = href.substring(idx + prefix.length);
          return __uv$config.decodeUrl(encoded);
        }
      }
      return href;
    } catch (e) {
      return null;
    }
  }

  function browserExtractFavicon(iframe) {
    try {
      const doc = iframe.contentDocument;
      const iconLink = doc.querySelector('link[rel="icon"]') || doc.querySelector('link[rel="shortcut icon"]') || doc.querySelector('link[rel="apple-touch-icon"]');
      if (iconLink) return iconLink.href;
    } catch {}
    const decoded = browserDecodeFrameUrl(iframe);
    if (decoded) {
      try {
        const domain = new URL(decoded).hostname;
        return 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=16';
      } catch {}
    }
    return null;
  }

  function browserUpdateFromFrame() {
    const tab = browserGetActive();
    if (!tab) return;
    const decoded = browserDecodeFrameUrl(tab.iframe);
    if (!decoded) return;
    tab.rawUrl = decoded;
    tab.encodedUrl = tab.iframe.src;
    try {
      const title = tab.iframe.contentDocument.title;
      if (title) tab.title = title;
    } catch {}
    const favicon = browserExtractFavicon(tab.iframe);
    if (favicon) tab.favicon = favicon;
    browserUrl.value = decoded;
    browserRenderTabs();
  }

  function browserGoBack() {
    const tab = browserGetActive();
    if (tab) try { tab.iframe.contentWindow.history.back(); } catch {}
  }

  function browserGoForward() {
    const tab = browserGetActive();
    if (tab) try { tab.iframe.contentWindow.history.forward(); } catch {}
  }

  function browserReloadTab() {
    const tab = browserGetActive();
    if (tab) {
      try { tab.iframe.contentWindow.location.reload(); } catch {
        tab.iframe.src = tab.encodedUrl;
      }
    }
  }

  function browserRenderTabs() {
    if (!browserTabsEl) return;
    browserTabsEl.innerHTML = browserTabsData.map(t => {
      const active = t.id === browserActiveTabId ? ' active' : '';
      const fav = t.favicon ? `<img class="browser-tab-fav" src="${t.favicon}" onerror="this.style.display='none'">` : '<i class="fas fa-globe browser-tab-fav fallback"></i>';
      return `<div class="browser-tab${active}" data-tab-id="${t.id}">
        ${fav}
        <span class="browser-tab-title">${t.title}</span>
        <button class="browser-tab-close" data-tab-close="${t.id}"><i class="fas fa-times"></i></button>
      </div>`;
    }).join('');
    browserTabsEl.querySelectorAll('.browser-tab').forEach(el => {
      el.addEventListener('click', function(e) {
        if (e.target.closest('.browser-tab-close')) return;
        browserSwitchTab(parseInt(this.dataset.tabId));
      });
    });
    browserTabsEl.querySelectorAll('.browser-tab-close').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        browserCloseTab(parseInt(this.dataset.tabClose));
      });
    });
  }

  function getAutoCloakSettings() {
    const savedFavicon = localStorage.getItem('autoCloakFavicon');
    const savedTitle = localStorage.getItem('autoCloakTitle');
    if (savedFavicon || savedTitle) {
      return {
        favicon: savedFavicon || '/assets/images/icons/googleclassroom.ico',
        title: savedTitle || 'Classroom'
      };
    }
    return { favicon: '/assets/images/icons/googleclassroom.ico', title: 'Classroom' };
  }

  let autoCloakSaved = null;

  function browserEnableAutoCloak() {
    if (autoCloakSaved) return;
    const link = document.querySelector("link[rel*='icon']");
    autoCloakSaved = {
      title: document.title,
      favicon: link ? link.href : null
    };
    const cloak = getAutoCloakSettings();
    let faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
    faviconLink.type = 'image/x-icon';
    faviconLink.rel = 'shortcut icon';
    faviconLink.href = cloak.favicon;
    document.head.appendChild(faviconLink);
    document.title = cloak.title;
  }

  function browserDisableAutoCloak() {
    if (!autoCloakSaved) return;
    if (autoCloakSaved.favicon) {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = autoCloakSaved.favicon;
      document.head.appendChild(link);
    }
    if (autoCloakSaved.title) {
      document.title = autoCloakSaved.title;
    }
    autoCloakSaved = null;
  }

  function browserCloseAll() {
    browserOverlay.classList.remove('active');
    browserTabsData.forEach(t => t.iframe.remove());
    browserTabsData = [];
    browserActiveTabId = null;
    browserTabIdCounter = 1;
    browserTabsEl.innerHTML = '';
    browserDisableAutoCloak();
  }

  async function browserOpen(input) {
    await browserEnsureSW();
    browserOverlay.classList.add('active');
    browserEnableAutoCloak();
    if (input && input.trim()) {
      const tab = browserGetActive();
      if (tab) { browserNavigate(input); return; }
    }
    browserCreateTab(input || 'https://duckduckgo.com');
  }

  if (browserLaunchBtn) {
    browserLaunchBtn.addEventListener('click', function() {
      const val = browserUrlInput.value.trim();
      if (!val) { browserStatus.textContent = '⚠️ Enter a URL or search term'; return; }
      browserStatus.textContent = 'Opening browser...';
      browserOpen(val);
    });
  }

  if (browserUrlInput) {
    browserUrlInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') browserLaunchBtn.click();
    });
  }

  if (browserUrl) {
    browserUrl.addEventListener('keydown', async function(e) {
      if (e.key === 'Enter') {
        await browserEnsureSW();
        browserNavigate(this.value);
      }
    });
  }

  if (browserTabAdd) {
    browserTabAdd.addEventListener('click', function() {
      browserOpen();
    });
  }

  if (browserClose) {
    browserClose.addEventListener('click', browserCloseAll);
  }

  if (browserBack) browserBack.addEventListener('click', browserGoBack);
  if (browserForward) browserForward.addEventListener('click', browserGoForward);
  if (browserReload) browserReload.addEventListener('click', browserReloadTab);

  if (browserOverlay) {
    browserOverlay.addEventListener('click', function(e) {
      if (e.target === this) browserCloseAll();
    });
  }

  // Auto-cloak on tab switch (visibility change)
  (function() {
    let prevTitle = null;
    let prevFavicon = null;
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        prevTitle = document.title;
        const link = document.querySelector("link[rel*='icon']");
        prevFavicon = link ? link.href : null;
        const cloak = getAutoCloakSettings();
        if (document.title !== cloak.title) {
          let fl = document.querySelector("link[rel*='icon']") || document.createElement('link');
          fl.type = 'image/x-icon';
          fl.rel = 'shortcut icon';
          fl.href = cloak.favicon;
          document.head.appendChild(fl);
          document.title = cloak.title;
        }
      } else if (prevTitle && !browserOverlay.classList.contains('active')) {
        if (prevFavicon) {
          let fl = document.querySelector("link[rel*='icon']") || document.createElement('link');
          fl.type = 'image/x-icon';
          fl.rel = 'shortcut icon';
          fl.href = prevFavicon;
          document.head.appendChild(fl);
        }
        document.title = prevTitle;
        prevTitle = null;
        prevFavicon = null;
      }
    });
  })();

  loadLogo();
  applyTheme(currentTheme);
  loadKeybind();
  renderRecentGames();
  renderRecentApps();
  renderFavorites();
  navigateTo('home', true);

  console.log('🐇');
})();

window.handleImgError = function(img) {
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:var(--bg-card);color:var(--text-secondary);font-size:1.8rem;border-radius:8px;';
  d.innerHTML = '<i class="fas fa-question"></i>';
  img.parentNode.replaceChild(d, img);
};
