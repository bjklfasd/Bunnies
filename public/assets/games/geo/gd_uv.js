/*
  Page side of the Geometry Dash proxy.

  Registers gd_uv_sw.js (scope: the game folder) before the game boots and
  waits until it controls this page, so the game's fetch() calls and its
  synchronous sound XMLHttpRequest calls are answered by Ultraviolet instead of
  going straight to the network where they would be blocked as cross origin.

  If service workers are unavailable, or registration fails, the game still
  starts and falls back to the server side /__proxy route, then to the public
  proxy list.
*/
(function () {
  'use strict';

  var notes = [];
  function note(text) {
    notes.push(text);
    if (notes.length > 40) notes.shift();
    // console.warn/error are not stubbed by the game page, so this shows up in
    // devtools even without ?debug
    try { console.warn('[gd-proxy] ' + text); } catch (e) {}
  }
  window.__gdProxyNote = note;

  // mirror what happened into the on page console once it exists
  var shown = 0;
  var timer = setInterval(function () {
    if (typeof window.say !== 'function') return;
    while (shown < notes.length) {
      try { window.say(notes[shown++]); } catch (e) { return; }
    }
  }, 500);
  setTimeout(function () { clearInterval(timer); }, 20000);

  var ready = null;

  window.__gdProxyReady = function () {
    if (ready) return ready;

    ready = new Promise(function (resolve) {
      if (!('serviceWorker' in navigator) || location.protocol === 'file:') {
        note('service workers unavailable, using server proxy');
        resolve(false);
        return;
      }

      var done = false;
      function finish(controlled) {
        if (done) return;
        done = true;
        window.__gdProxyControlled = !!controlled;
        if (controlled) note('ultraviolet service worker active');
        else note('no service worker control, using server proxy');
        resolve(!!controlled);
      }

      // safety net so a stuck worker can never keep the game from starting
      var timeout = setTimeout(function () { finish(!!navigator.serviceWorker.controller); }, 4000);

      navigator.serviceWorker
        .register('gd_uv_sw.js', { scope: './' })
        .then(function () {
          return navigator.serviceWorker.ready;
        })
        .then(function () {
          if (navigator.serviceWorker.controller) {
            clearTimeout(timeout);
            finish(true);
            return;
          }
          var onChange = function () {
            clearTimeout(timeout);
            navigator.serviceWorker.removeEventListener('controllerchange', onChange);
            finish(true);
          };
          navigator.serviceWorker.addEventListener('controllerchange', onChange);
        })
        .catch(function (e) {
          clearTimeout(timeout);
          note('registration failed: ' + e);
          finish(false);
        });
    });

    return ready;
  };
})();
