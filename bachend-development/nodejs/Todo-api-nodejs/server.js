const http = require("http");
const url = require("url");
const { getContentType, send404 } = require("./utils/responseHelpers");
const { readStaticFile } = require("./utils/fileHelpers");
const notesRouter = require("./routes/notesRoutes");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const match = pathname.match(/^\/api\/notes\/(\d+)$/);
  const query = parsedUrl.query;

  console.log(`${req.method} ${pathname}`);

  if (pathname === "/") {
    return readStaticFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  if (pathname.startsWith("/public/")) {
    const fileName = pathname.replace("/public/", "");
    const contentType = getContentType(fileName);
    return readStaticFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }

  if (pathname.startsWith("/api/notes")) {
    return notesRouter(req, res, pathname, match, query);
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
