function getContentType(fileName) {
  if (fileName.endsWith(".css")) return "text/css";
  if (fileName.endsWith(".js")) return "text/javascript";
  if (fileName.endsWith(".html")) return "text/html";
  return "text/plain";
}

function send500(res) {
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end("500 Server Error");
}

function send404(res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
}

function sendJson(data, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

module.exports = { getContentType, send500, send404, sendJson };
