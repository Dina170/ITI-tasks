const { readData, writeData } = require("../utils/fileHelpers");
const { send500, send404, sendJson } = require("../utils/responseHelpers");
const handleBody = require("../utils/bodyParser");
const validate = require("../utils/validate");

function notesRouter(req, res, pathname, match) {
  if (pathname === "/api/notes" && req.method === "GET") {
    return readData((err, data) => {
      if (err) return send500(res);
      sendJson(data, res);
    });
  } else if (match && req.method === "GET") {
    return readData((err, data) => {
      if (err) return send500(res);
      const note = data.find((n) => n.id == Number(match[1]));
      if (!note) return send404(res);
      sendJson(note, res);
    });
  } else if (pathname === "/api/notes" && req.method === "POST") {
    return handleBody(req, (parsedData) => {
      readData((err, data) => {
        if (err) return send500(res);
        const lastId = data[data.length - 1]?.id || 0;
        const newNote = {
          id: lastId + 1,
          title: parsedData.title,
          content: parsedData.content,
        };
        if (!validate(newNote, res)) return;

        data.push(newNote);
        writeData(data, (err) => {
          if (err) return send500(res);
          res.writeHead(201, { "Content-Type": "text/plain" });
          res.end("Note created");
        });
      });
    });
  } else if (match && req.method === "PUT") {
    return handleBody(req, (parsedData) => {
      readData((err, data) => {
        if (err) return send500(res);
        const note = data.find((n) => n.id == Number(match[1]));
        if (!note) return send404(res);

        const updatedNote = { ...note, ...parsedData };
        if (!validate(updatedNote, res)) return;

        if (parsedData.title) note.title = parsedData.title;
        if (parsedData.content) note.content = parsedData.content;

        writeData(data, (err) => {
          if (err) return send500(res);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Note updated");
        });
      });
    });
  } else if (match && req.method === "DELETE") {
    return readData((err, data) => {
      if (err) return send500(res);
      const index = data.findIndex((n) => n.id == Number(match[1]));
      if (index === -1) return send404(res);
      data.splice(index, 1);
      writeData(data, (err) => {
        if (err) return send500(res);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Note deleted");
      });
    });
  }
}

module.exports = notesRouter;
