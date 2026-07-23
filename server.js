const express = require("express");
const { createBareServer } = require("@tomphttp/bare-server-node");

const app = express();

const bare = createBareServer("/bare/");

app.use((req, res, next) => {
  if (bare.shouldRoute(req)) {
    return bare.routeRequest(req, res);
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Bare server is running!");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Bare server running");
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});
