function applyCloak(favicon, title) {
  if (favicon) {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favicon;
    document.head.appendChild(link);
    localStorage.setItem('bunnies-cloak-favicon', favicon);
  }
  if (title) {
    document.title = title;
    localStorage.setItem('bunnies-cloak-title', title);
  }
}

function resetCloak() {
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = 'assets/images/favicon.ico';
  document.head.appendChild(link);
  document.title = 'Science';
  localStorage.removeItem('bunnies-cloak-favicon');
  localStorage.removeItem('bunnies-cloak-title');
  const faviconInput = document.getElementById('faviconInput');
  const titleInput = document.getElementById('titleInput');
  const preset = document.getElementById('cloakPreset');
  if (faviconInput) faviconInput.value = '';
  if (titleInput) titleInput.value = '';
  if (preset) preset.value = '';
}

function initCloak() {
  const savedFavicon = localStorage.getItem('bunnies-cloak-favicon');
  const savedTitle = localStorage.getItem('bunnies-cloak-title');
  if (savedFavicon) {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = savedFavicon;
    document.head.appendChild(link);
  } else {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'assets/images/favicon.ico';
    document.head.appendChild(link);
  }
  if (savedTitle) {
    document.title = savedTitle;
  } else if (document.title === 'Bunnies - Settings') {
    document.title = 'Bunnies - Options';
  } else if (document.title === 'Bunnies - Games') {
    document.title = 'Bunnies - Math';
  } else if (document.title === 'Bunnies - Apps') {
    document.title = 'Bunnies - Science';
  } else if (document.title === 'Bunnies - Play') {
    document.title = 'Bunnies - Extra';
  }
  
  const preset = document.getElementById('cloakPreset');
  const faviconInput = document.getElementById('faviconInput');
  const titleInput = document.getElementById('titleInput');
  
  if (preset) {
    preset.addEventListener('change', function() {
      if (this.value) {
        if (faviconInput) faviconInput.value = this.value;
        const title = this.options[this.selectedIndex]?.dataset?.title;
        if (title && titleInput) titleInput.value = title;
      }
    });
  }
  
  const applyBtn = document.getElementById('applyCloak');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const favicon = faviconInput ? faviconInput.value.trim() : '';
      const title = titleInput ? titleInput.value.trim() : '';
      applyCloak(favicon, title);
    });
  }
  
  const resetBtn = document.getElementById('resetCloak');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetCloak);
  }
}

document.addEventListener('DOMContentLoaded', initCloak);
