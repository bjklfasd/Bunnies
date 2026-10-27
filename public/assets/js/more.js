const browserFrame = document.getElementById('browser-frame');
const browserUrlInput = document.getElementById('browser-url-input');
const browserGo = document.getElementById('browser-go');
const browserBack = document.getElementById('browser-back');
const browserForward = document.getElementById('browser-forward');
const browserRefresh = document.getElementById('browser-refresh');
const browserHome = document.getElementById('browser-home');
const browserFavicon = document.getElementById('browser-favicon');

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
  }
  return url;
}

function normalizeUrl(input) {
  let url = input.trim();
  if (!url) return '';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    if (url.includes('.') && !url.includes(' ')) {
      url = 'https://' + url;
    } else {
      url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
    }
  }
  return url;
}

function loadUrl(input) {
  const url = normalizeUrl(input);
  if (!url || !browserFrame) return;
  const proxied = proxyUrl(url);
  browserFrame.src = proxied;
  browserUrlInput.value = url;
  localStorage.setItem('bunnies-more-url', url);
}

if (browserGo) {
  browserGo.addEventListener('click', () => {
    loadUrl(browserUrlInput.value);
  });
}

if (browserUrlInput) {
  browserUrlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      loadUrl(browserUrlInput.value);
    }
  });
}

if (browserBack) {
  browserBack.addEventListener('click', () => {
    try {
      browserFrame.contentWindow.history.back();
    } catch(e) {}
  });
}

if (browserForward) {
  browserForward.addEventListener('click', () => {
    try {
      browserFrame.contentWindow.history.forward();
    } catch(e) {}
  });
}

if (browserRefresh) {
  browserRefresh.addEventListener('click', () => {
    try {
      browserFrame.contentWindow.location.reload();
    } catch(e) {
      const src = browserFrame.src;
      browserFrame.src = src;
    }
  });
}

if (browserHome) {
  browserHome.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// Load from localStorage or start with DuckDuckGo
const savedUrl = localStorage.getItem('bunnies-more-url') || 'https://duckduckgo.com';
loadUrl(savedUrl);
browserUrlInput.value = savedUrl;
