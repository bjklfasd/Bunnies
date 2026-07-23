const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "https://frogiesarcade.win", 
    changeOrigin: true,
    ws: true,
  })
);

app.listen(process.env.PORT || 3000);
