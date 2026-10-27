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

function updateFavicon() {
  try {
    const iframeDoc = browserFrame.contentDocument || browserFrame.contentWindow.document;
    const icons = iframeDoc.querySelectorAll('link[rel*="icon"], link[rel*="shortcut"]');
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].href) {
        browserFavicon.src = icons[i].href;
        browserFavicon.style.display = 'block';
        return;
      }
    }
  } catch(e) {}
  try {
    const url = browserUrlInput.value;
    if (url.startsWith('http')) {
      const domain = new URL(url).origin;
      browserFavicon.src = domain + '/favicon.ico';
      browserFavicon.style.display = 'block';
      return;
    }
  } catch(e) {}
  browserFavicon.src = 'assets/images/favicon.ico';
}

function loadUrl(input) {
  const url = normalizeUrl(input);
  if (!url || !browserFrame) return;
  const proxied = proxyUrl(url);
  browserFrame.src = proxied;
  browserUrlInput.value = url;
  localStorage.setItem('bunnies-more-url', url);
  setTimeout(updateFavicon, 1000);
  setTimeout(updateFavicon, 2000);
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
      setTimeout(updateFavicon, 500);
    } catch(e) {}
  });
}

if (browserForward) {
  browserForward.addEventListener('click', () => {
    try {
      browserFrame.contentWindow.history.forward();
      setTimeout(updateFavicon, 500);
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
    setTimeout(updateFavicon, 1000);
  });
}

if (browserFrame) {
  browserFrame.addEventListener('load', () => {
    setTimeout(updateFavicon, 500);
    try {
      const iframeDoc = browserFrame.contentDocument || browserFrame.contentWindow.document;
      if (iframeDoc && iframeDoc.title) {
        document.title = iframeDoc.title + ' - Bunnies';
      }
    } catch(e) {}
    try {
      // Try to get current URL from iframe
      const iframeWindow = browserFrame.contentWindow;
      if (iframeWindow && iframeWindow.location) {
        const loc = iframeWindow.location.href;
        if (loc && loc !== 'about:blank') {
          // Try to decode UV URL
          try {
            const cfg = window.__uv$config || (typeof __uv$config !== 'undefined' ? __uv$config : null);
            if (cfg && cfg.prefix && loc.includes(cfg.prefix)) {
              const encoded = loc.substring(loc.indexOf(cfg.prefix) + cfg.prefix.length);
              if (typeof cfg.decodeUrl === 'function') {
                const decoded = cfg.decodeUrl(encoded);
                browserUrlInput.value = decoded;
                localStorage.setItem('bunnies-more-url', decoded);
              } else {
                browserUrlInput.value = loc;
              }
            } else {
              browserUrlInput.value = loc;
            }
          } catch(e) {
            browserUrlInput.value = loc;
          }
        }
      }
    } catch(e) {}
  });
}

if (browserHome) {
  browserHome.addEventListener('click', () => {
    window.location.href = '/';
  });
}

// Load from localStorage or start with DuckDuckGo
const savedUrl = localStorage.getItem('bunnies-more-url') || 'https://duckduckgo.com';
loadUrl(savedUrl);
browserUrlInput.value = savedUrl;
