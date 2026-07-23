const express = require("express");
const path = require("path");
const { createBareServer } = require("@tomphttp/bare-server-node");

const app = express();

const bare = createBareServer("/carrot/");

// Bare server routing
app.use((req, res, next) => {
  if (bare.shouldRoute(req)) {
    return bare.routeRequest(req, res);
  }
  next();
});

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
    maxAge: "7d"
  })
);

// Fallback to homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = app.listen(process.env.PORT || 3000, () => {
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
