(function() {
  function initParticles(particleColor, linkColor) {
    if (window.pJSDom) {
      Object.values(window.pJSDom).forEach(p => {
        try { if (p.pJS && p.pJS.fn.vendors.destroy) p.pJS.fn.vendors.destroy(); } catch (e) {}
      });
      window.pJSDom = [];
    }
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": particleColor },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": linkColor, "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
      },
      "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" } }
      }
    });
  }

  const particleThemeColors = {
    'default': { dot: '#b7a0c9', link: '#9370b3' },
    'midnight-purple': { dot: '#9e9e9e', link: '#ffffff' },
    'arctic-freeze': { dot: '#5f87a8', link: '#6aaed6' },
    'forest-night': { dot: '#7fa37f', link: '#5fb85f' },
    'cherry-blossom': { dot: '#9c7486', link: '#f29ab2' },
    'cyber-neon': { dot: '#70b0d0', link: '#00ffaa' },
    'royal-crimson': { dot: '#d49a9a', link: '#e05050' },
    'galaxy': { dot: '#9a8ab8', link: '#7a5ad0' }
  };

  let currentParticleDot = '#b7a0c9';
  let currentParticleLink = '#9370b3';

  function updateParticlesForTheme(themeId) {
    let pc = particleThemeColors[themeId] || particleThemeColors['default'];
    if (themeId === 'custom' && customThemeData) {
      pc = { dot: customThemeData.secondary || '#b89fd4', link: customThemeData.accent || '#c89bff' };
    }
    currentParticleDot = pc.dot;
    currentParticleLink = pc.link;
    if (localStorage.getItem('particlesDisabled') !== 'true') {
      initParticles(currentParticleDot, currentParticleLink);
    }
  }

  function applyParticlesState() {
    if (localStorage.getItem('particlesDisabled') === 'true') {
      if (window.pJSDom) {
        Object.values(window.pJSDom).forEach(p => {
          try { if (p.pJS && p.pJS.fn.vendors.destroy) p.pJS.fn.vendors.destroy(); } catch (e) {}
        });
        window.pJSDom = [];
      }
    } else {
      initParticles(currentParticleDot, currentParticleLink);
    }
  }

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

  var themeData = {
    'default': {
      '--bg-primary': '#231d2f', '--bg-secondary': 'rgba(35,29,47,0.85)', '--bg-card': 'rgba(35,29,47,0.55)', '--bg-container': 'rgba(20,16,30,0.4)',
      '--text-primary': '#ffffff', '--text-secondary': '#b7a0c9', '--text-accent': '#d9b3ff',
      '--border-color': 'rgba(255,255,255,0.04)', '--shadow-color': 'rgba(0,0,0,0.5)', '--hover-bg': 'rgba(255,255,255,0.08)',
      '--input-bg': 'rgba(20,16,30,0.6)', '--game-card-bg': 'rgba(35,29,47,0.6)', '--game-card-hover': 'rgba(35,29,47,0.85)',
      '--popup-bg': '#2a2238', '--scrollbar-thumb': '#3d2b4f'
    },
    'midnight-purple': {
      '--bg-primary': '#000000', '--bg-secondary': 'rgba(0,0,0,0.9)', '--bg-card': 'rgba(0,0,0,0.6)', '--bg-container': 'rgba(18,18,18,0.5)',
      '--text-primary': '#ffffff', '--text-secondary': '#9e9e9e', '--text-accent': '#ffffff',
      '--border-color': 'rgba(255,255,255,0.1)', '--shadow-color': 'rgba(0,0,0,0.6)', '--hover-bg': 'rgba(255,255,255,0.1)',
      '--input-bg': 'rgba(22,22,22,0.6)', '--game-card-bg': 'rgba(24,24,24,0.6)', '--game-card-hover': 'rgba(40,40,40,0.85)',
      '--popup-bg': '#141414', '--scrollbar-thumb': '#3a3a3a'
    },
    'arctic-freeze': {
      '--bg-primary': '#dceefd', '--bg-secondary': 'rgba(220,238,253,0.92)', '--bg-card': 'rgba(255,255,255,0.65)', '--bg-container': 'rgba(245,250,255,0.75)',
      '--text-primary': '#2d4f6b', '--text-secondary': '#5f87a8', '--text-accent': '#6aaed6',
      '--border-color': 'rgba(106,174,214,0.18)', '--shadow-color': 'rgba(50,90,130,0.12)', '--hover-bg': 'rgba(106,174,214,0.15)',
      '--input-bg': 'rgba(255,255,255,0.7)', '--game-card-bg': 'rgba(240,247,255,0.8)', '--game-card-hover': 'rgba(230,242,255,0.95)',
      '--popup-bg': '#eaf5ff', '--scrollbar-thumb': '#8abfdf'
    },
    'forest-night': {
      '--bg-primary': '#0d1a0f', '--bg-secondary': 'rgba(13,26,15,0.9)', '--bg-card': 'rgba(13,26,15,0.6)', '--bg-container': 'rgba(8,18,10,0.5)',
      '--text-primary': '#b8d4b8', '--text-secondary': '#7fa37f', '--text-accent': '#5fb85f',
      '--border-color': 'rgba(80,200,80,0.08)', '--shadow-color': 'rgba(0,0,0,0.5)', '--hover-bg': 'rgba(80,200,80,0.1)',
      '--input-bg': 'rgba(8,18,10,0.6)', '--game-card-bg': 'rgba(13,26,15,0.6)', '--game-card-hover': 'rgba(13,26,15,0.85)',
      '--popup-bg': '#102012', '--scrollbar-thumb': '#2a5a2a'
    },
    'cherry-blossom': {
      '--bg-primary': '#fbeaf0', '--bg-secondary': 'rgba(251,234,240,0.92)', '--bg-card': 'rgba(255,255,255,0.68)', '--bg-container': 'rgba(255,247,250,0.75)',
      '--text-primary': '#6d4b5b', '--text-secondary': '#9c7486', '--text-accent': '#f29ab2',
      '--border-color': 'rgba(242,154,178,0.18)', '--shadow-color': 'rgba(120,80,100,0.12)', '--hover-bg': 'rgba(242,154,178,0.15)',
      '--input-bg': 'rgba(255,255,255,0.72)', '--game-card-bg': 'rgba(255,241,245,0.82)', '--game-card-hover': 'rgba(255,232,239,0.95)',
      '--popup-bg': '#fff2f6', '--scrollbar-thumb': '#e6a9bf'
    },
    'cyber-neon': {
      '--bg-primary': '#0a0a1a', '--bg-secondary': 'rgba(10,10,26,0.9)', '--bg-card': 'rgba(10,10,26,0.6)', '--bg-container': 'rgba(5,5,15,0.5)',
      '--text-primary': '#b0e0ff', '--text-secondary': '#70b0d0', '--text-accent': '#00ffaa',
      '--border-color': 'rgba(0,255,170,0.08)', '--shadow-color': 'rgba(0,0,0,0.5)', '--hover-bg': 'rgba(0,255,170,0.1)',
      '--input-bg': 'rgba(5,5,15,0.6)', '--game-card-bg': 'rgba(10,10,26,0.6)', '--game-card-hover': 'rgba(10,10,26,0.85)',
      '--popup-bg': '#0f0f1f', '--scrollbar-thumb': '#1a5a4a'
    },
    'royal-crimson': {
      '--bg-primary': '#1a0a0a', '--bg-secondary': 'rgba(26,10,10,0.9)', '--bg-card': 'rgba(26,10,10,0.6)', '--bg-container': 'rgba(15,5,5,0.5)',
      '--text-primary': '#f5d0d0', '--text-secondary': '#d49a9a', '--text-accent': '#e05050',
      '--border-color': 'rgba(255,80,80,0.08)', '--shadow-color': 'rgba(0,0,0,0.5)', '--hover-bg': 'rgba(255,80,80,0.1)',
      '--input-bg': 'rgba(15,5,5,0.6)', '--game-card-bg': 'rgba(26,10,10,0.6)', '--game-card-hover': 'rgba(26,10,10,0.85)',
      '--popup-bg': '#221010', '--scrollbar-thumb': '#5a2a2a'
    },
    'galaxy': {
      '--bg-primary': '#0a0518', '--bg-secondary': 'rgba(10,5,24,0.9)', '--bg-card': 'rgba(10,5,24,0.6)', '--bg-container': 'rgba(5,2,12,0.5)',
      '--text-primary': '#d4c8f0', '--text-secondary': '#9a8ab8', '--text-accent': '#7a5ad0',
      '--border-color': 'rgba(120,90,200,0.08)', '--shadow-color': 'rgba(0,0,0,0.5)', '--hover-bg': 'rgba(120,90,200,0.1)',
      '--input-bg': 'rgba(5,2,12,0.6)', '--game-card-bg': 'rgba(10,5,24,0.6)', '--game-card-hover': 'rgba(10,5,24,0.85)',
      '--popup-bg': '#120a20', '--scrollbar-thumb': '#4a2a7a'
    }
  };

  function applyTheme(themeId) {
    document.documentElement.className = '';
    document.documentElement.style.cssText = '';
    if (themeId === 'custom' && customThemeData) {
      var vars = themeData['midnight-purple'];
      var root = document.documentElement;
      root.style.setProperty('--bg-primary', customThemeData.bg || vars['--bg-primary']);
      root.style.setProperty('--text-primary', customThemeData.text || vars['--text-primary']);
      root.style.setProperty('--text-accent', customThemeData.accent || vars['--text-accent']);
      root.style.setProperty('--text-secondary', customThemeData.secondary || vars['--text-secondary']);
      root.style.setProperty('--bg-secondary', vars['--bg-secondary']);
      root.style.setProperty('--bg-card', vars['--bg-card']);
      root.style.setProperty('--bg-container', vars['--bg-container']);
      root.style.setProperty('--border-color', vars['--border-color']);
      root.style.setProperty('--shadow-color', vars['--shadow-color']);
      root.style.setProperty('--hover-bg', vars['--hover-bg']);
      root.style.setProperty('--input-bg', vars['--input-bg']);
      root.style.setProperty('--game-card-bg', vars['--game-card-bg']);
      root.style.setProperty('--game-card-hover', vars['--game-card-hover']);
      root.style.setProperty('--popup-bg', vars['--popup-bg']);
      root.style.setProperty('--scrollbar-thumb', vars['--scrollbar-thumb']);
      localStorage.setItem('selectedTheme', 'custom');
      currentTheme = 'custom';
    } else if (themeData[themeId]) {
      document.documentElement.classList.add('theme-' + themeId);
      var root = document.documentElement;
      var vars = themeData[themeId];
      for (var key in vars) root.style.setProperty(key, vars[key]);
      localStorage.setItem('selectedTheme', themeId);
      currentTheme = themeId;
    } else {
      localStorage.setItem('selectedTheme', 'default');
      currentTheme = 'default';
    }
    updateParticlesForTheme(currentTheme);
    applyFont(currentFont);
    var select = document.getElementById('themeSelect');
    if (select) select.value = currentTheme;
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

  const themeStatusEl = document.getElementById('themeStatus');

  function fillCustomThemeInputs(data) {
    const map = { bg: 'customBg', text: 'customText', accent: 'customAccent', secondary: 'customSecondary' };
    Object.keys(map).forEach(key => {
      const id = map[key];
      document.getElementById(id).value = data[key] || '';
      const textId = id + 'Text';
      const textEl = document.getElementById(textId);
      if (textEl) textEl.value = data[key] || '';
    });
  }

  document.getElementById('exportTheme').addEventListener('click', () => {
    const data = {
      bunniesTheme: 1,
      name: 'Bunnies Theme',
      colors: {
        bg: document.getElementById('customBg').value,
        text: document.getElementById('customText').value,
        accent: document.getElementById('customAccent').value,
        secondary: document.getElementById('customSecondary').value
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bunnies-theme.bunny';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    if (themeStatusEl) themeStatusEl.textContent = 'Theme exported as bunnies-theme.bunny';
  });

  document.getElementById('importTheme').addEventListener('click', () => {
    document.getElementById('themeImportInput').click();
  });

  document.getElementById('themeImportInput').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const colors = parsed && parsed.bunniesTheme ? parsed.colors : parsed;
        const hex = v => (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) ? v : null;
        const data = {
          bg: hex(colors && colors.bg),
          text: hex(colors && colors.text),
          accent: hex(colors && colors.accent),
          secondary: hex(colors && colors.secondary)
        };
        if (parsed && typeof parsed.name === 'string') data._name = parsed.name;
        if (!data.bg || !data.text || !data.accent || !data.secondary) throw new Error('missing valid colors (#RRGGBB)');
        customThemeData = { bg: data.bg, text: data.text, accent: data.accent, secondary: data.secondary };
        localStorage.setItem('customTheme', JSON.stringify(customThemeData));
        fillCustomThemeInputs(customThemeData);
        applyTheme('custom');
        if (themeStatusEl) themeStatusEl.textContent = 'Theme imported' + (data._name ? ': "' + data._name + '"' : '');
      } catch (err) {
        if (themeStatusEl) themeStatusEl.textContent = 'Import failed: ' + err.message;
      }
      e.target.value = '';
    };
    reader.readAsText(file);
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

  var cloakMode = 'tab';
  function getCloakKeys() {
    return cloakMode === 'auto' ? ['autoCloakFavicon', 'autoCloakTitle'] : ['cloakFavicon', 'cloakTitle'];
  }
  function loadCloakInputs() {
    var k = getCloakKeys();
    document.getElementById('faviconInput').value = localStorage.getItem(k[0]) || '';
    document.getElementById('titleInput').value = localStorage.getItem(k[1]) || '';
  }
  document.getElementById('cloakModeToggle').addEventListener('change', function() {
    var k = getCloakKeys();
    var fav = document.getElementById('faviconInput').value.trim();
    var tit = document.getElementById('titleInput').value.trim();
    if (fav) localStorage.setItem(k[0], fav); else localStorage.removeItem(k[0]);
    if (tit) localStorage.setItem(k[1], tit); else localStorage.removeItem(k[1]);
    cloakMode = this.checked ? 'auto' : 'tab';
    document.getElementById('cloakModeLabel').style.opacity = cloakMode === 'tab' ? '1' : '0.5';
    document.getElementById('cloakModeLabelAuto').style.opacity = cloakMode === 'auto' ? '1' : '0.5';
    loadCloakInputs();
    var p = document.getElementById('faviconPreset');
    var val = localStorage.getItem(getCloakKeys()[0]);
    if (val) { p.value = val; }
    else { p.value = ''; }
  });

  document.getElementById('faviconPreset').addEventListener('change', function() {
    if (this.value) {
      document.getElementById('faviconInput').value = this.value;
      var title = this.options[this.selectedIndex]?.dataset?.title;
      if (title) document.getElementById('titleInput').value = title;
    }
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
    renderInstantPanels();
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
    renderInstantPanels();
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

  homeSearchBar.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      const query = this.value.trim();
      this.value = '';
      browserOpen(query);
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

  document.getElementById('closeAddonPopup').addEventListener('click', () => addonPopup.classList.remove('active'));
  document.getElementById('closeSettingsPopup').addEventListener('click', () => settingsPopup.classList.remove('active'));

  [addonPopup, settingsPopup].forEach(pop => {
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
    const fontSelect = document.getElementById('fontSelect');
    if (fontSelect) fontSelect.value = currentFont;
    const fontStatus = document.getElementById('fontStatus');
    if (fontStatus) fontStatus.textContent = 'Current font: ' + currentFont.replace(/'/g, '');
  });

  navSettings.addEventListener('click', () => {
    settingsPopup.classList.add('active');
    loadCloakInputs();
    var p = document.getElementById('faviconPreset');
    var val = localStorage.getItem(getCloakKeys()[0]);
    if (val) p.value = val; else p.value = '';
    document.getElementById('themeSelect').value = currentTheme;
    document.getElementById('navPositionSelect').value = localStorage.getItem('navPosition') || 'left';
  });

  document.getElementById('themeSelect').addEventListener('change', function() {
    applyTheme(this.value);
  });

  function applyNavPosition() {
    const pos = localStorage.getItem('navPosition') || 'left';
    document.body.classList.toggle('nav-top', pos === 'top');
    const sel = document.getElementById('navPositionSelect');
    if (sel) sel.value = pos;
  }

  document.getElementById('navPositionSelect').addEventListener('change', function() {
    localStorage.setItem('navPosition', this.value);
    applyNavPosition();
  });

  document.getElementById('applyCloak').addEventListener('click', () => {
    var favicon = document.getElementById('faviconInput').value.trim();
    var title = document.getElementById('titleInput').value.trim();
    if (cloakMode === 'tab') {
      if (favicon || title) applyCloak(favicon, title);
    } else {
      var k = getCloakKeys();
      if (favicon) localStorage.setItem(k[0], favicon); else localStorage.removeItem(k[0]);
      if (title) localStorage.setItem(k[1], title); else localStorage.removeItem(k[1]);
    }
  });

  document.getElementById('resetCloak').addEventListener('click', function() {
    if (cloakMode === 'tab') {
      resetCloak();
    } else {
      var k = getCloakKeys();
      localStorage.removeItem(k[0]);
      localStorage.removeItem(k[1]);
      document.getElementById('faviconInput').value = '';
      document.getElementById('titleInput').value = '';
      document.getElementById('faviconPreset').value = '';
    }
  });

  // URL Cloaking — removed at user request

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
        title: savedTitle || 'Home'
      };
    }
    return { favicon: '/assets/images/icons/googleclassroom.ico', title: 'Home' };
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

  /* ===== Bunnies Instant Play ===== */
  const instantOverlay = document.getElementById('instantOverlay');
  const instantPlayBtn = document.getElementById('instantFab');
  const instantCloseBtn = document.getElementById('instantClose');
  const instantSearchBar = document.getElementById('instantSearchBar');
  const instantFavoritesEl = document.getElementById('instantFavorites');
  const instantGamesEl = document.getElementById('instantGames');
  const instantAppsEl = document.getElementById('instantApps');
  const particlesToggle = document.getElementById('particlesToggle');
  const simpleModeToggle = document.getElementById('simpleModeToggle');
  const reduceMotionToggle = document.getElementById('reduceMotionToggle');
  const bigIframesToggle = document.getElementById('bigIframesToggle');

  function closeInstantPlay() {
    instantOverlay.classList.remove('active');
    document.body.classList.remove('instant-open');
  }

  function renderInstantFavorites() {
    const favs = getFavorites();
    if (!favs.length) {
      instantFavoritesEl.innerHTML = '<span class="instant-empty">No favorites yet</span>';
      return;
    }
    const items = favs.map(f => {
      const game = games.find(g => g.id === f.id);
      const app = apps.find(a => a.id === f.id);
      return game || app;
    }).filter(Boolean);
    instantFavoritesEl.innerHTML = items.map(item => {
      const type = games.some(g => g.id === item.id) ? 'game' : 'app';
      return `
        <div class="instant-item" data-id="${item.id}" data-type="${type}">
          <img src="${item.img}" alt="${item.name}" onerror="handleImgError(this)">
          <span class="instant-name">${item.name}</span>
        </div>`;
    }).join('');
    instantFavoritesEl.querySelectorAll('.instant-item').forEach(el => {
      el.addEventListener('click', () => {
        const item = games.find(g => g.id === el.dataset.id) || apps.find(a => a.id === el.dataset.id);
        if (item) { closeInstantPlay(); launchItem(item); }
      });
    });
  }

  function renderInstantRecent(kind) {
    const container = kind === 'Games' ? instantGamesEl : instantAppsEl;
    const recentIds = getRecent(kind);
    if (!recentIds.length) {
      container.innerHTML = '<span class="instant-empty">Nothing here yet</span>';
      return;
    }
    const dataset = kind === 'Games' ? games : apps;
    const recentItems = recentIds.map(id => dataset.find(i => i.id === id)).filter(Boolean);
    container.innerHTML = recentItems.map(item => `
      <div class="instant-item" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" onerror="handleImgError(this)">
        <span class="instant-name">${item.name}</span>
      </div>
    `).join('');
    container.querySelectorAll('.instant-item').forEach(el => {
      el.addEventListener('click', () => {
        const item = dataset.find(i => i.id === el.dataset.id);
        if (item) { closeInstantPlay(); launchItem(item); }
      });
    });
  }

  function renderInstantPanels() {
    renderInstantFavorites();
    renderInstantRecent('Games');
    renderInstantRecent('Apps');
  }

  if (instantPlayBtn) {
    instantPlayBtn.addEventListener('click', () => {
      if (instantOverlay.classList.contains('active')) {
        closeInstantPlay();
        return;
      }
      renderInstantPanels();
      instantOverlay.classList.add('active');
      document.body.classList.add('instant-open');
    });
  }
  if (instantCloseBtn) {
    instantCloseBtn.addEventListener('click', closeInstantPlay);
  }
  if (instantOverlay) {
    instantOverlay.addEventListener('click', (e) => {
      if (e.target === instantOverlay) closeInstantPlay();
    });
  }
  if (instantSearchBar) {
    instantSearchBar.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const val = instantSearchBar.value.trim();
        if (!val) return;
        closeInstantPlay();
        await browserOpen(val);
      }
    });
  }
  document.querySelectorAll('.instant-ql').forEach(btn => {
    btn.addEventListener('click', async () => {
      closeInstantPlay();
      await browserOpen(btn.dataset.url);
    });
  });

  /* Step 1: simple mode + reduce motion pre-init (before applyTheme) */
  function applySimpleMode() {
    document.body.classList.toggle('simple-mode', localStorage.getItem('simpleMode') === 'true');
    if (simpleModeToggle) simpleModeToggle.checked = localStorage.getItem('simpleMode') === 'true';
  }

  function applyReduceMotion() {
    document.body.classList.toggle('reduce-motion', localStorage.getItem('reduceMotion') === 'true');
    if (reduceMotionToggle) reduceMotionToggle.checked = localStorage.getItem('reduceMotion') === 'true';
  }

  if (simpleModeToggle) {
    simpleModeToggle.addEventListener('change', () => {
      localStorage.setItem('simpleMode', simpleModeToggle.checked ? 'true' : 'false');
      applySimpleMode();
    });
  }
  if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener('change', () => {
      localStorage.setItem('reduceMotion', reduceMotionToggle.checked ? 'true' : 'false');
      applyReduceMotion();
    });
  }

  function applyBigIframes() {
    document.body.classList.toggle('big-iframes', localStorage.getItem('bigIframes') === 'true');
    if (bigIframesToggle) bigIframesToggle.checked = localStorage.getItem('bigIframes') === 'true';
  }

  if (bigIframesToggle) {
    bigIframesToggle.addEventListener('change', () => {
      localStorage.setItem('bigIframes', bigIframesToggle.checked ? 'true' : 'false');
      applyBigIframes();
    });
  }

  /* Screen recorder */
  let mediaRecorder = null;
  let mediaStream = null;
  let recordingChunks = [];

  const recStartBtn = document.getElementById('recStart');
  const recStopBtn = document.getElementById('recStop');
  const recStatusEl = document.getElementById('recStatus');
  const recVideoEl = document.getElementById('recVideo');
  const recDownloadEl = document.getElementById('recDownload');

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
  }

  if (recStartBtn) {
    recStartBtn.addEventListener('click', async () => {
      try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: 'always' }, audio: false });
        recordingChunks = [];
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) recordingChunks.push(e.data); };
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordingChunks, { type: 'video/webm' });
          recVideoEl.src = URL.createObjectURL(blob);
          recVideoEl.style.display = 'block';
          recDownloadEl.href = recVideoEl.src;
          recDownloadEl.style.display = 'inline-block';
          recStatusEl.textContent = 'Recording saved';
        };
        mediaRecorder.start();
        recStartBtn.disabled = true;
        recStopBtn.disabled = false;
        recStatusEl.textContent = 'Recording…';
        mediaStream.getTracks().forEach(track => {
          track.addEventListener('ended', () => {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
          });
        });
      } catch (err) {
        recStatusEl.textContent = 'Recording unavailable: ' + err.message;
      }
    });
  }

  if (recStopBtn) {
    recStopBtn.addEventListener('click', () => {
      if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
      stopRecording();
      recStartBtn.disabled = false;
      recStopBtn.disabled = true;
    });
  }

  /* Particles toggle */
  function applyParticlesToggleState() {
    if (particlesToggle) particlesToggle.checked = localStorage.getItem('particlesDisabled') === 'true';
  }

  if (particlesToggle) {
    particlesToggle.addEventListener('change', () => {
      localStorage.setItem('particlesDisabled', particlesToggle.checked ? 'true' : 'false');
      applyParticlesState();
    });
  }

  loadLogo();
  applyTheme(currentTheme);
  applyNavPosition();
  applySimpleMode();
  applyReduceMotion();
  applyBigIframes();
  applyParticlesToggleState();
  setRandomTagline();
  renderRecentGames();
  renderRecentApps();
  renderFavorites();
  renderInstantPanels();
  navigateTo('home', true);

  console.log('🐇');
})();

window.handleImgError = function(img) {
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:var(--bg-card);color:var(--text-secondary);font-size:1.8rem;border-radius:8px;';
  d.innerHTML = '<i class="fas fa-question"></i>';
  img.parentNode.replaceChild(d, img);
};
