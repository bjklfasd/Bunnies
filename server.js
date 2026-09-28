const express = require("express");
const path = require("path");
const { Readable } = require("stream");
const { createBareServer } = require("@tomphttp/bare-server-node");

const app = express();

const BARE_DIR = "/carrot/";

const bare = createBareServer(BARE_DIR);

// CORS for blob:null cloak
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (bare.shouldRoute(req)) {
    return bare.routeRequest(req, res);
  }
  next();
});

/*
  Same-origin HTTP proxy for games that cannot be CORS-proxied from the
  browser (Geometry Dash loads its remote files with synchronous XHR, which
  cannot send the x-bare-* headers a client side proxy needs).

  Requests go out through the Bare server that backs the site's Ultraviolet
  proxy (/carrot/), so there is no third party CORS proxy in the middle:

    /__proxy?url=https://example.com/file -> /carrot/v1/ with x-bare-* headers
*/
const PROXY_DIR = "/__proxy";
const PROXY_PORT = process.env.PORT || 3000;
const PROXY_MAX_BODY = 25 * 1024 * 1024;
const PROXY_METHODS = new Set(["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]);
const PROXY_SEND_SKIP = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "cookie",
  "origin",
  "referer",
  "set-cookie",
  "upgrade-insecure-requests",
  "sec-fetch-dest",
  "sec-fetch-mode",
  "sec-fetch-site",
  "sec-fetch-user"
]);
const PROXY_RECV_SKIP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "set-cookie",
  "set-cookie2",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade"
]);

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > PROXY_MAX_BODY) {
        reject(new Error("proxy body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

app.all(PROXY_DIR, (req, res, next) => {
  Promise.resolve(proxyRequest(req, res)).catch(next);
});

async function proxyRequest(req, res) {
  const target = new URL(req.url, "http://localhost").searchParams.get("url");
  let remote;
  try {
    remote = new URL(target);
  } catch {
    res.status(400).send("proxy: missing or invalid url");
    return;
  }
  if (remote.protocol !== "http:" && remote.protocol !== "https:") {
    res.status(400).send("proxy: only http and https are proxied");
    return;
  }
  if (!PROXY_METHODS.has(req.method)) {
    res.status(405).send("proxy: method not allowed");
    return;
  }

  const headers = {};
  for (const [name, value] of Object.entries(req.headers)) {
    if (value === undefined || PROXY_SEND_SKIP.has(name.toLowerCase())) continue;
    headers[name] = value;
  }
  headers.host = remote.host;

  let body;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      body = await readBody(req);
    } catch {
      res.status(413).send("proxy: request body too large");
      return;
    }
  }

  const controller = new AbortController();
  res.on("close", () => controller.abort());

  let bareResponse;
  try {
    bareResponse = await fetch(`http://127.0.0.1:${req.socket.localPort || PROXY_PORT}${BARE_DIR}v1/`, {
      method: req.method,
      headers: {
        "x-bare-protocol": remote.protocol,
        "x-bare-host": remote.hostname,
        "x-bare-path": remote.pathname + remote.search,
        "x-bare-port": remote.port || (remote.protocol === "https:" ? "443" : "80"),
        "x-bare-headers": JSON.stringify(headers),
        "x-bare-forward-headers": "[]"
      },
      body,
      redirect: "manual",
      signal: controller.signal
    });
  } catch (err) {
    if (!res.headersSent) res.status(502).send(`proxy: ${err.message}`);
    return;
  }

  let remoteHeaders = {};
  try {
    remoteHeaders = JSON.parse(bareResponse.headers.get("x-bare-headers") || "{}");
  } catch {
    // the bare server refused the request, its own body explains why
  }
  const out = {};
  for (const [name, value] of Object.entries(remoteHeaders)) {
    if (value === undefined || PROXY_RECV_SKIP.has(name.toLowerCase())) continue;
    out[name.toLowerCase()] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  // safety net: if the body was decoded on the way in, drop the encoding
  if (out["content-encoding"] && !bareResponse.headers.get("content-encoding")) {
    delete out["content-encoding"];
    delete out["content-length"];
  }

  // The bare server hands back the upstream bytes untouched, so the upstream
  // content-encoding and content-length stay valid as they are.
  const status = Number(bareResponse.headers.get("x-bare-status")) || bareResponse.status;
  const statusText = bareResponse.headers.get("x-bare-status-text") || "";
  console.log(`[proxy] ${req.method} ${remote.href} -> ${status}`);
  try {
    res.writeHead(status, statusText || undefined, out);
  } catch (err) {
    if (!res.headersSent) res.status(502).send(`proxy: ${err.message}`);
    return;
  }

  if (!bareResponse.body) {
    res.end();
    return;
  }
  Readable.fromWeb(bareResponse.body).on("error", () => {}).pipe(res);
}

// Discord redirect
app.get("/discord", (req, res) => {
  res.redirect("https://discord.gg/9QC5HVwMMj");
});

/*
  Add more redirects here:

  Example:

  app.get("/github", (req, res) => {
    res.redirect("https://github.com/yourname");
  });

  app.get("/youtube", (req, res) => {
    res.redirect("https://youtube.com/@yourname");
  });
*/

// Serve Bunnies website
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: 0
  })
);

// 404 page
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

const server = app.listen(PROXY_PORT, () => {
  console.log("Bunnies running");
});

// Better connection handling
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// Bare WebSocket support
server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});
