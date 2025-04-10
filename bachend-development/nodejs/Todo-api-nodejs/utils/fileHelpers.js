const fs = require("fs");
const path = require("path");

function readData(callback) {
  fs.readFile("./notes.json", "utf-8", (err, data) => {
    if (err) callback(err, null);
    else callback(null, JSON.parse(data));
  });
}

function writeData(data, callback) {
  fs.writeFile("./notes.json", JSON.stringify(data, null, 4), callback);
}

function readStaticFile(file, callback) {
  const filePath = path.resolve(__dirname, "../public", file);
  fs.readFile(filePath, callback);
}

module.exports = { readData, writeData, readStaticFile };
