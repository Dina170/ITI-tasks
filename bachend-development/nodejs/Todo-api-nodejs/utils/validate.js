function validate(data, res) {
  if (typeof data !== "object" || data === null) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Invalid data format");
    return false;
  } else if (!data.title || !data.content) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Title and content are required");
    return false;
  } else if (
    typeof data.title !== "string" ||
    typeof data.content !== "string"
  ) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Title and content must be strings");
    return false;
  } else if (data.title.length < 3 || data.content.length < 3) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Title and content must be at least 3 characters long");
    return false;
  } else if (data.title.length > 100 || data.content.length > 1000) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(
      "Title and content must not exceed 100 and 1000 characters, respectively"
    );
    return false;
  } else if (data.title.trim() === "" || data.content.trim() === "") {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Title and content must not be empty");
    return false;
  }

  return true;
}

module.exports = validate;
