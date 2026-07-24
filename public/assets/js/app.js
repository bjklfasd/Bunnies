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

      const siteKnowledge = {
        'custom themes': "You can find custom themes in the Extensions panel! Click the puzzle piece icon in the side nav, then scroll down to 'Custom Theme'. You can pick your own background, text, accent, and secondary colors. Once you click 'Apply Custom Theme', it will be saved automatically.",
        'change logo': "To change the logo, open the Extensions panel (puzzle piece icon), scroll to 'Custom Logo', click 'Upload Logo', and select an image file. The logo will appear in the side navigation. You can reset it to the default bunny logo anytime.",
        'settings': "The Settings panel (gear icon) contains theme selection (including your custom theme) and Tab Cloaking options. Tab Cloaking lets you change the favicon and browser tab title.",
        'auto clicker': "The Auto Clicker is in the Extensions panel. Set your preferred interval in milliseconds (minimum 50ms), then click Start or press your custom keybind (default: F8). You can change the keybind by clicking the keybind input and pressing any key. Test Click lets you try a single click.",
        'embed website': "The Iframe Embedder is in the Extensions panel. Enter any URL (with http:// or https://) and click Embed. It will open in a fullscreen iframe overlay. Click the X or outside the overlay to close it.",
        'games': "Click the Games icon (gamepad) in the side nav to see the full game roster. Click any game card to launch it in an iframe overlay. Your recently played games appear on the Home page.",
        'change theme': "You can change themes in Settings (gear icon). Choose from built-in themes like Midnight Purple, Ocean Deep, Forest Night, Cherry Blossom, Cyber Neon, Royal Crimson, or Galaxy. You can also create your own custom theme in the Extensions panel.",
        'discord': "Click the Discord icon on the Home page to join our community! ",
        'coins': "The coins icon on the Home page takes you to the shop page.",
        'keybind': "The Auto Clicker keybind can be changed in the Extensions panel. Click the keybind input, press any key on your keyboard, and it will be saved. The keybind persists across sessions.",
        'fullscreen': "Use the fullscreen button (expand icon) in the top-right of the main content box to enter fullscreen mode. Press Escape or click the button again to exit.",
        'back forward': "The back and forward buttons let you navigate between Home and Games pages. Your browsing history is tracked so you can easily go back and forth.",
        'font': "You can change the site-wide font in the Extensions panel under 'Custom Font'. Pick from the dropdown and click Apply. Default is Poppins."
      };

      function getAIResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        for (const [key, response] of Object.entries(siteKnowledge)) {
          if (lowerQuery.includes(key)) return response;
        }
        
        const keywords = {
          'theme': 'custom themes',
          'logo': 'change logo',
          'setting': 'settings',
          'clicker': 'auto clicker',
          'embed': 'embed website',
          'game': 'games',
          'discord': 'discord',
          'coin': 'coins',
          'keybind': 'keybind',
          'fullscreen': 'fullscreen',
          'back': 'back forward',
          'forward': 'back forward',
          'nav': 'back forward',
          'font': 'font'
        };
        
        for (const [word, key] of Object.entries(keywords)) {
          if (lowerQuery.includes(word)) {
            return siteKnowledge[key] || "I'm not sure about that. Try asking about custom themes, logo, settings, auto clicker, embedding websites, games, fonts, or keybinds!";
          }
        }
        
        return "I'm not sure about that. Here are some things I can help with:\n• Custom themes\n• Changing the logo\n• Settings\n• Auto clicker\n• Embedding websites\n• Games\n• Fonts\n• Keybinds\n\nJust ask me about any of these!";
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
        if (this.value) document.getElementById('faviconInput').value = this.value;
      });

      // ---- AUTO CLICKER ----
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
        const el = document.elementFromPoint(window.innerWidth/2, window.innerHeight/2);
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

     const games = [
    { id: 'roblox', name: 'Roblox', url: '/assets/math/roblox/', img: '/assets/math/roblox/roblox.png' },
    { id: 'fortnite', name: 'Fortnite', url: '/assets/math/fortnite/', img: '/assets/math/fortnite/fortnite.png' },
    { id: '1-date-danger', name: '1 Date Danger', url: '/assets/math/1datedanger/', img: '/assets/math/1datedanger/logo.png' },
    { id: 'bfdia-5b', name: 'BFDIA 5b', url: '/assets/math/bfdia5b/', img: '/assets/math/bfdia5b/637.png' },
    { id: 'hollow-knight', name: 'Hollow Knight', url: '/assets/math/hollowknight/', img: '/assets/math/hollowknight/468.png' },
    { id: 'omori', name: 'Omori', url: '/assets/math/omori/', img: '/assets/math/omori/427.png' },
    { id: 'oneshot', name: 'OneShot', url: '/assets/math/oneshot/', img: '/assets/math/oneshot/622.png' },
    { id: 'silk-song', name: 'Silk Song', url: '/assets/math/silksong/', img: '/assets/math/silksong/771.png' },
    { id: 'animal-crossing-gamecube', name: 'Animal Crossing (GAMECUBE)', url: '/assets/math/animalcrossing/', img: '/assets/math/animalcrossing/828.png' },
    { id: 'eaglercraft-1-8', name: 'Eaglercraft 1.8', url: '/assets/math/eaglercraft18/', img: '/assets/math/eaglercraft1122/minecrafteagle.png' },
    { id: 'eaglercraft-1-12-2', name: 'Eaglercraft 1.12.2', url: '/assets/math/eaglercraft1122/', img: '/assets/math/eaglercraft1122/minecrafteagle.png' },
    { id: 'blockpost', name: 'BlockPost', url: '/assets/math/blockpost/', img: '/assets/math/blockpost/273.png' },
    { id: 'ovo', name: 'OvO', url: '/assets/math/ovo/', img: '/assets/math/ovo/1.png' },
    { id: 'ovo-2', name: 'OvO 2', url: '/assets/math/ovo2/', img: '/assets/math/ovo2/2.png' },
    { id: 'ovo-3', name: 'OvO 3', url: '/assets/math/ovo3/', img: '/assets/math/ovo3/3.png' },
    { id: 'bad-parenting', name: 'Bad Parenting', url: '/assets/math/badparenting/', img: '/assets/math/badparenting/166.png' },
    { id: 'tattletail', name: 'Tattletail', url: '/assets/math/tattletail/', img: '/assets/math/tattletail/607.png' },
    { id: 'ultrakill', name: 'Ultrakill', url: '/assets/math/ultrakill/', img: '/assets/math/ultrakill/196.png' },
    { id: 'half-life', name: 'Half Life', url: '/assets/math/halflife/', img: '/assets/math/halflife/262.png' },
    { id: 'terraria', name: 'Terraria', url: '/assets/math/terraria/', img: '/assets/math/terraria/669.png' },
    { id: 'just-shapes-and-beats', name: 'Just Shapes & Beats', url: '/assets/math/justshapes/', img: '/assets/math/justshapes/826.png' },
    { id: 'fnae', name: 'FNAE', url: '/assets/math/fivenightsatepsteins/', img: '/assets/math/fivenightsatepsteins/710.png' },
    { id: 'iron-lung', name: 'Iron Lung', url: '/assets/math/ironlung/', img: '/assets/math/ironlung/705.png' },
    { id: 'cooking-mama', name: 'Cooking Mama', url: '/assets/math/cookingmama/', img: '/assets/math/cookingmama/cookingmama.png' },
    { id: '20-minutes-till-dawn', name: '20 Minutes Till Dawn', url: '/assets/math/20minutestildawn/', img: '/assets/math/20minutestildawn/819.png' },
    { id: '2048', name: '2048', url: '/assets/math/2048/2048.html', img: '/assets/math/2048/114.png' },
    { id: '2048-merge-run', name: '2048 Merge Run', url: '/assets/math/2048mergerun/', img: '/assets/math/2048mergerun/375.png' },
    { id: 'tabs', name: 'T.A.B.S', url: '/assets/math/tabs/', img: '/assets/math/tabs/827.png' },
    { id: 'bad-time-simulator', name: 'Bad Time Simulator', url: '/assets/math/badtimesimulator/', img: '/assets/math/badtimesimulator/472.png' },
    { id: 'slope', name: 'Slope', url: '/assets/math/slope/', img: '/assets/math/slope/198.png' },
    { id: 'slope-2', name: 'Slope 2', url: '/assets/math/slope2/', img: '/assets/math/slope2/368.png' },
    { id: 'slowroads', name: 'Slowroads', url: '/assets/math/slowroads/', img: '/assets/math/slowroads/369.png' },
    { id: 'fnf-shucks', name: 'FNF Shucks', url: '/assets/math/shucks/', img: '/assets/math/shucks/836.png' },
    { id: 'fnf-pibby-corrupted', name: 'FNF Pibby Corrupted', url: '/assets/math/pibbycorrupted/', img: '/assets/math/pibbycorrupted/700.png' },
    { id: 'fnf-bobs-onslaught', name: 'FNF Bobs Onslaught', url: '/assets/math/bobsonslaught/', img: '/assets/math/bobsonslaught/618.png' },
    { id: 'fnf-wednesdays-infidelity', name: 'FNF Wedndesdays Infidelity', url: '/assets/math/wednesdaysinfidelity/', img: '/assets/math/wednesdaysinfidelity/616.png' },
    { id: 'fnf-dave-and-bambi', name: 'FNF Dave and Bambi', url: '/assets/math/daveandbambi/', img: '/assets/math/daveandbambi/615.png' },
    { id: 'fnf-sonic-exe', name: 'FNF Sonic.exe', url: '/assets/math/sonicexe/', img: '/assets/math/sonicexe/601.png' },
    { id: 'famidash', name: 'Famidash', url: '/assets/math/famidash/', img: '/assets/math/famidash/famidash.png' },
    { id: 'cookie-clicker', name: 'Cookie Clicker', url: '/assets/math/cookieclicker/', img: '/assets/math/cookieclicker/82.png' },
    { id: 'jetpack-joyride', name: 'Jetpack Joyride', url: '/assets/math/jetpackjoyride/', img: '/assets/math/jetpackjoyride/7.png' },
    { id: 'stickman-hook', name: 'Stickman Hook', url: '/assets/math/stickmanhook/', img: '/assets/math/stickmanhook/11.png' },
    { id: 'bridge-race', name: 'Bridge Race', url: '/assets/math/bridgerace/', img: '/assets/math/bridgerace/14.png' },
    { id: 'attack-hole', name: 'Attack Hole', url: '/assets/math/attackhole/', img: '/assets/math/attackhole/13.png' },
    { id: 'achievement-unlocked', name: 'Achievement Unlocked', url: '/assets/math/achievementunlocked/', img: '/assets/math/achievementunlocked/60.png' },
    { id: 'achievement-unlocked-2', name: 'Achievement Unlocked 2', url: '/assets/math/achievementunlocked2/', img: '/assets/math/achievementunlocked2/61.png' },
    { id: 'achievement-unlocked-3', name: 'Achievement Unlocked 3', url: '/assets/math/achievementunlocked3/', img: '/assets/math/achievementunlocked3/62.png' },
    { id: 'fnf-twiddlefinger', name: 'FNF Twiddlefinger', url: '/assets/math/twiddlefinger/', img: '/assets/math/twiddlefinger/500.png' },
    { id: '8-ball-pool', name: '8 Ball Pool', url: '/assets/math/8ballpool/', img: '/assets/math/8ballpool/115.png' },
    { id: 'awesome-tanks', name: 'Awesome Tanks', url: '/assets/math/awesometanks/', img: '/assets/math/awesometanks/436.png' },
    { id: 'awesome-tanks-2', name: 'Awesome Tanks 2', url: '/assets/math/awesometanks2/', img: '/assets/math/awesometanks2/438.png' },
    { id: 'bad-ice-cream', name: 'Bad Ice Cream', url: '/assets/math/badicecream/', img: '/assets/math/badicecream/269.png' },
    { id: 'bad-ice-cream-2', name: 'Bad Ice Cream 2', url: '/assets/math/badicecream2/', img: '/assets/math/badicecream2/270.png' },
    { id: 'bad-ice-cream-3', name: 'Bad Ice Cream 3', url: '/assets/math/badicecream3/', img: '/assets/math/badicecream3/271.png' }
];

      function getRecentGames() {
  try { 
    const data = localStorage.getItem('recentGames');
    return data ? JSON.parse(data) : [];
  } catch { 
    return []; 
  }
}

function addRecentGame(gameId) {
  let recent = getRecentGames().filter(id => id !== gameId);
  recent.unshift(gameId);
  if (recent.length > 8) recent.pop();
  localStorage.setItem('recentGames', JSON.stringify(recent));
  renderRecentGames();
}

function renderRecentGames() {
  const container = document.getElementById('recentGames');
  const recentIds = getRecentGames();
  
  if (recentIds.length === 0) {
    container.innerHTML = '<span style="opacity:0.4; font-size:0.9rem;"><i class="fas fa-info-circle"></i> No games played yet</span>';
    return;
  }
  
  const recentGames = recentIds.map(id => games.find(g => g.id === id)).filter(Boolean);
  container.innerHTML = recentGames.map(g => `
    <div class="recent-game" data-game-id="${g.id}">
      <img src="${g.img}" alt="${g.name}">
      <span class="game-name">${g.name}</span>
    </div>
  `).join('');
  
  container.querySelectorAll('.recent-game').forEach(el => {
    el.addEventListener('click', () => {
      const game = games.find(g => g.id === el.dataset.gameId);
      if (game) launchGame(game);
    });
  });
}

      let currentGame = null;
      
      function launchGame(game) {
        const overlay = document.getElementById('gameIframeOverlay');
        const iframe = document.getElementById('gameIframe');
        iframe.src = game.url;
        overlay.classList.add('active');
        currentGame = game;
        addRecentGame(game.id);
      }

      document.getElementById('gameIframeClose').addEventListener('click', () => {
        document.getElementById('gameIframeOverlay').classList.remove('active');
        document.getElementById('gameIframe').src = 'about:blank';
        currentGame = null;
      });

      document.getElementById('gameIframeReload').addEventListener('click', () => {
        const iframe = document.getElementById('gameIframe');
        iframe.src = currentGame ? currentGame.url : iframe.src;
      });

      document.getElementById('gameIframeOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) document.getElementById('gameIframeClose').click();
      });

      function renderGamesRoster(filter = '') {
        const container = document.getElementById('gamesRoster');
        const filtered = games.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));
        container.innerHTML = filtered.map(g => `
          <div class="game-card" data-game-id="${g.id}">
            <img src="${g.img}" alt="${g.name}">
            <span>${g.name}</span>
          </div>
        `).join('');
        container.querySelectorAll('.game-card').forEach(el => {
          el.addEventListener('click', () => {
            const game = games.find(g => g.id === el.dataset.gameId);
            if (game) launchGame(game);
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
          updateHomeAIResponse(response);
        } else if (query.length === 0) {
          aiResponseHome.classList.remove('visible');
        }
      });

      homeSearchBar.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim().length > 2) {
          const query = this.value.trim();
          const response = getAIResponse(query);
          updateHomeAIResponse(response);

          document.getElementById('aiPopup').classList.add('active');
          document.getElementById('aiInput').value = query;
          document.getElementById('aiResponse').innerHTML = `<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> ${response}`;
        }
      });

      document.getElementById('gamesSearchBar').addEventListener('input', (e) => {
        if (document.getElementById('gamesRoster').style.display !== 'none') {
          renderGamesRoster(e.target.value.trim());
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
        do { next = taglines[Math.floor(Math.random() * taglines.length)]; }
        while (taglines.length > 1 && next === el.textContent);
        el.textContent = next;
      }

      const taglineTextEl = document.getElementById('taglineText');
      if (taglineTextEl) {
        taglineTextEl.style.cursor = 'pointer';
        taglineTextEl.addEventListener('click', setRandomTagline);
      }

      const navHome = document.getElementById('navHome');
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
        [navHome, navGames, navAddons].forEach(b => b.classList.remove('active'));
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
        
        if (page === 'home') {
          document.getElementById('homeContent').style.display = 'block';
          document.getElementById('gamesRoster').style.display = 'none';
          document.getElementById('pageTitle').innerHTML = '<i class="fas fa-bunny"></i> Bunnies';
          document.getElementById('pageIndicator').innerHTML = '<i class="fas fa-home"></i> Home';
          setActive(navHome);
          document.getElementById('gamesSearchBar').classList.remove('visible');
          document.getElementById('gamesSearchBar').value = '';
          renderRecentGames();
        } else if (page === 'games') {
          document.getElementById('homeContent').style.display = 'none';
          document.getElementById('gamesRoster').style.display = 'flex';
          document.getElementById('pageTitle').innerHTML = '<i class="fas fa-gamepad"></i> Games';
          document.getElementById('pageIndicator').innerHTML = '<i class="fas fa-gamepad"></i> Games';
          setActive(navGames);
          document.getElementById('aiResponseHome').classList.remove('visible');
          document.getElementById('gamesSearchBar').classList.add('visible');
          document.getElementById('gamesSearchBar').value = '';
          renderGamesRoster();
        }
        document.getElementById('contentContainer').scrollTop = 0;
        updateNavButtons();
      }

      navHome.addEventListener('click', () => navigateTo('home', true));
      navGames.addEventListener('click', () => navigateTo('games', true));

      backBtn.addEventListener('click', () => {
        if (historyIndex > 0) { historyIndex--; navigateTo(pageHistory[historyIndex], false); }
      });

      forwardBtn.addEventListener('click', () => {
        if (historyIndex < pageHistory.length - 1) { historyIndex++; navigateTo(pageHistory[historyIndex], false); }
      });

      reloadBtn.addEventListener('click', () => {
        setRandomTagline();
        if (currentPage === 'home') renderRecentGames();
        else if (currentPage === 'games') renderGamesRoster(document.getElementById('gamesSearchBar').value);
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
                content: 'You are a helpful assistant for a website called "Bunnies". The site has features like: custom themes, custom logo upload, auto clicker with keybinds, iframe embedder, games, settings, tab cloaking, and extensions. Keep answers concise and helpful.' 
              }, { 
                role: 'user', 
                content: query 
              }],
              temperature: 0.7,
              max_tokens: 200
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
            aiResponse.innerHTML = `<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> ${getAIResponse(query)}`;
          });
        } catch {
          aiResponse.innerHTML = `<i class="fas fa-robot" style="color:var(--text-accent); margin-right:8px;"></i> ${getAIResponse(query)}`;
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

      loadLogo();
applyTheme(currentTheme);
loadKeybind();
renderRecentGames();
navigateTo('home', true);

console.log('🐇');
    })();
