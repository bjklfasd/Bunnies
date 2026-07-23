const express = require("express");
const path = require("path");
const { createBareServer } = require("@tomphttp/bare-server-node");

const app = express();

const bare = createBareServer("/carrot/");

app.use((req, res, next) => {
  if (bare.shouldRoute(req)) {
    return bare.routeRequest(req, res);
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "7d"
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Bunnies running");
});

server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});
