const siteKnowledge = {
    'custom themes': "You can find custom themes in the Extensions panel! Click the puzzle piece icon in the side nav, then scroll down to 'Custom Theme'. You can pick your own background, text, accent, and secondary colors. Once you click 'Apply Custom Theme', it will be saved automatically.",
    'change logo': "To change the logo, open the Extensions panel (puzzle piece icon), scroll to 'Custom Logo', click 'Upload Logo', and select an image file. The logo will appear in the side navigation. You can reset it to the default bunny logo anytime.",
    'settings': "The Settings panel (gear icon) contains theme selection (including your custom theme) and Tab Cloaking options. Tab Cloaking lets you change the favicon and browser tab title.",
    'auto clicker': "The Auto Clicker is in the Extensions panel. Set your preferred interval in milliseconds (minimum 50ms), then click Start or press your custom keybind (default: F8). You can change the keybind by clicking the keybind input and pressing any key. Test Click lets you try a single click.",
    'embed website': "The Iframe Embedder is in the Extensions panel. Enter any URL (with http:// or https://) and click Embed. It will open in a fullscreen iframe overlay. Click the X or outside the overlay to close it.",
    'games': "Click the Games icon (gamepad) in the side nav to see the full game roster. Click any game card to launch it in an iframe overlay. Your recently played games appear on the Home page.",
    'apps': "Click the Apps icon (grid) in the side nav to see all available apps. Click any app card to launch it in an iframe overlay. Your recently used apps appear on the Home page.",
    'change theme': "You can change themes in Settings (gear icon). Choose from built-in themes like Midnight Purple, Ocean Deep, Forest Night, Cherry Blossom, Cyber Neon, Royal Crimson, or Galaxy. You can also create your own custom theme in the Extensions panel.",
    'discord': "Click the Discord icon on the Home page to join our community! ",
    'coins': "The coins icon on the Home page takes you to the shop page.",
    'keybind': "The Auto Clicker keybind can be changed in the Extensions panel. Click the keybind input, press any key on your keyboard, and it will be saved. The keybind persists across sessions.",
    'fullscreen': "Use the fullscreen button (expand icon) in the top-right of the main content box to enter fullscreen mode. Press Escape or click the button again to exit.",
    'back forward': "The back and forward buttons let you navigate between Home, Apps, and Games pages. Your browsing history is tracked so you can easily go back and forth.",
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
        'apps': 'apps',
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
            return siteKnowledge[key] || null;
        }
    }

    return null;
}
