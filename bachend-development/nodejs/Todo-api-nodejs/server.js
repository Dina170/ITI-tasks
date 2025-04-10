const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { log } = require("console");

function readData() {
  const dataString = fs.readFileSync("./notes.json", "utf-8");
  return JSON.parse(dataString);
}

function writeData(data) {
  fs.writeFileSync("./notes.json", JSON.stringify(data, null, 4));
}

function readStaticFile(file, callback) {
  const filePath = path.resolve(__dirname, "public", file);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`${req.method} ${pathname}`);
  const match = pathname.match(/^\/api\/notes\/(\d+)$/);

  if (pathname == "/") {
    const filePath = path.resolve(__dirname + "\\public", "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
    // TODO: Implement route handling for:
    // 1. Static files (HTML, CSS, JS)
    // 2. API endpoints for notes (GET, POST, PUT, DELETE)
  } else if (pathname.startsWith("/public/")) {
    const fileName = pathname.replace("/public/", "");
    const contentType = fileName.endsWith(".css")
      ? "text/css"
      : fileName.endsWith(".js")
      ? "text/javascript"
      : "text/plain";

    readStaticFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  } else if (pathname == "/api/notes" && req.method == "GET") {
    const data = readData();
    if (data) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("no todos yet");
    }
  } else if (match && req.method == "GET") {
    const data = readData().find((item) => item.id == Number(match[1]));
    if (data) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  } else if (pathname == "/api/notes" && req.method == "POST") {
    const data = readData();
    const lastId = data[data.length - 1]?.id || 0;
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);
        const newtodo = {
          title: parsedData.title,
          id: Number(lastId) + 1,
        };
        data.push(newtodo);
        writeData(data);
      } catch (error) {
        res.writeHead(422, { "Content-Type": "text/plain" });
        res.end("Error parsing data:");
      }

      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("POST data received");
    });
  } else if (match && req.method == "PUT") {
    const data = readData();
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);
        const todo = data.find((item) => item.id === Number(match[1]));

        if (parsedData.title) {
          console.log("data2", todo);
          todo.title = parsedData.title;
          console.log("data3", todo);
        }

        writeData(data);
      } catch (error) {
        res.writeHead(422, { "Content-Type": "text/plain" });
        res.end("Error parsing data:");
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("PUT data received");
    });
  } else if (match && req.method == "DELETE") {
    const data = readData();
    const idx = data.findIndex((item) => item.id === Number(match[1]));
    data.splice(idx, 1);
    writeData(data);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("data deleted successfully");
  } else {
    //Default response for unhandled routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
