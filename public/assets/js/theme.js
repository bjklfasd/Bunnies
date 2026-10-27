const themes = {
  default: {
    '--bg': '#000000',
    '--bg-primary': '#000000',
    '--bg-secondary': 'rgba(0, 0, 0, 0.7)',
    '--bg-card': 'rgba(0, 0, 0, 0.6)',
    '--bg-container': 'rgba(0, 0, 0, 0.4)',
    '--text': '#ffffff',
    '--text-primary': '#ffffff',
    '--text-secondary': '#b7a0c9',
    '--text-accent': '#d9b3ff',
    '--nav-bg': 'rgba(0, 0, 0, 0.7)',
    '--border': 'rgba(255, 255, 255, 0.08)',
    '--border-color': 'rgba(255, 255, 255, 0.08)',
    '--shadow-color': 'rgba(0, 0, 0, 0.5)',
    '--hover-bg': 'rgba(255, 255, 255, 0.08)',
  },
  midnight: {
    '--bg': '#0f0820',
    '--bg-primary': '#0f0820',
    '--bg-secondary': 'rgba(26, 15, 46, 0.9)',
    '--bg-card': 'rgba(26, 15, 46, 0.6)',
    '--bg-container': 'rgba(15, 8, 32, 0.5)',
    '--text': '#e8d5ff',
    '--text-primary': '#e8d5ff',
    '--text-secondary': '#b89fd4',
    '--text-accent': '#d9b3ff',
    '--nav-bg': 'rgba(15, 8, 32, 0.9)',
    '--border': 'rgba(168, 85, 247, 0.15)',
    '--border-color': 'rgba(168, 85, 247, 0.15)',
    '--shadow-color': 'rgba(88, 28, 135, 0.4)',
    '--hover-bg': 'rgba(168, 85, 247, 0.15)',
  },
  crimson: {
    '--bg': '#0f0505',
    '--bg-primary': '#0f0505',
    '--bg-secondary': 'rgba(26, 10, 10, 0.9)',
    '--bg-card': 'rgba(26, 10, 10, 0.6)',
    '--bg-container': 'rgba(15, 5, 5, 0.5)',
    '--text': '#f5d0d0',
    '--text-primary': '#f5d0d0',
    '--text-secondary': '#d49a9a',
    '--text-accent': '#e05050',
    '--nav-bg': 'rgba(26, 10, 10, 0.9)',
    '--border': 'rgba(239, 68, 68, 0.2)',
    '--border-color': 'rgba(239, 68, 68, 0.2)',
    '--shadow-color': 'rgba(153, 27, 27, 0.4)',
    '--hover-bg': 'rgba(239, 68, 68, 0.15)',
  }
};

function applyTheme(themeName) {
  const theme = themes[themeName] || themes.default;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(key, value);
  }
  localStorage.setItem('bunnies-theme', themeName);
  
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.toggle('active', card.dataset.theme === themeName);
  });
}

function initThemes() {
  const savedTheme = localStorage.getItem('bunnies-theme') || 'default';
  applyTheme(savedTheme);
  
  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
      applyTheme(card.dataset.theme);
    });
  });
}

document.addEventListener('DOMContentLoaded', initThemes);
