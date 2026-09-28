/*
  Geometry Dash proxy service worker.

  The game's HTTP layer (gd_http_start in gd_web.js) uses fetch(), and its
  sound loader uses a synchronous XMLHttpRequest, so every remote request has
  to be same origin. This worker answers the game's /__proxy?url= requests by
  handing them to the site's own Ultraviolet proxy, which tunnels them through
  the bare server at /carrot/.

  Nothing else is touched: requests this worker does not answer fall through
  to the network untouched.
*/
// uv.sw.js pulls in uv.bundle.js and uv.config.js itself
importScripts("/fetch/uv/uv.sw.js");

var uv = new UVServiceWorker();
var prefix = __uv$config.prefix;

self.addEventListener("install", function () {
  return self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  return event.waitUntil(self.clients.claim());
});

function encode(target) {
  return location.origin + prefix + __uv$config.encodeUrl(target);
}

self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }
  if (url.origin !== location.origin) return;

  // already an ultraviolet request
  if (url.pathname.indexOf(prefix) === 0) {
    event.respondWith(uv.fetch({ request: request }));
    return;
  }

  // the game's /__proxy?url=<absolute url>
  if (url.pathname === "/__proxy") {
    var target = url.searchParams.get("url");
    if (target) {
      event.respondWith(uv.fetch({ request: new Request(encode(target), request) }));
    }
  }
});
