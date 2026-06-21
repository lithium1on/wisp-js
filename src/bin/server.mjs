import { server as wisp, logging } from "./src/entrypoints/server.mjs";
import http from "node:http";

logging.set_level(logging.INFO);

const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("wisp server running");
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`wisp server listening on 0.0.0.0:${port}`);
});
