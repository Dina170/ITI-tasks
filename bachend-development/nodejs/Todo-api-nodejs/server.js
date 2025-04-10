const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

function readData(callback) {
  fs.readFile("./notes.json", "utf-8", (err, dataString) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(dataString));
    }
  });
}

function writeData(data, callback) {
  fs.writeFile("./notes.json", JSON.stringify(data, null, 4), (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
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
    readStaticFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
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
    readData((err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else if (data) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("no todos yet");
      }
    });
  } else if (match && req.method == "GET") {
    readData((err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else {
        const note = data.find((item) => item.id == Number(match[1]));
        if (note) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(note));
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        }
      }
    });
  } else if (pathname == "/api/notes" && req.method == "POST") {
    readData((err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else {
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
            writeData(data, (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Server Error");
              } else {
                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end("POST data received");
              }
            });
          } catch (error) {
            res.writeHead(422, { "Content-Type": "text/plain" });
            res.end("Error parsing data:");
          }
        });
      }
    });
  } else if (match && req.method == "PUT") {
    readData((err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const parsedData = JSON.parse(body);
            const todo = data.find((item) => item.id === Number(match[1]));

            if (parsedData.title) todo.title = parsedData.title;

            writeData(data, (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Server Error");
              } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("PUT data received");
              }
            });
          } catch (error) {
            res.writeHead(422, { "Content-Type": "text/plain" });
            res.end("Error parsing data:");
          }
        });
      }
    });
  } else if (match && req.method == "DELETE") {
    readData((err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else {
        const idx = data.findIndex((item) => item.id === Number(match[1]));
        if (idx !== -1) {
          data.splice(idx, 1);
          writeData(data, (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("500 Server Error");
            } else {
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end("data deleted successfully");
            }
          });
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        }
      }
    });
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
