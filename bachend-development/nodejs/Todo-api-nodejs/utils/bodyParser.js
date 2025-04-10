function handleBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", () => {
    try {
      callback(JSON.parse(body));
    } catch {
      res.writeHead(422, { "Content-Type": "text/plain" });
      res.end("Invalid JSON");
    }
  });
}

module.exports = handleBody;
