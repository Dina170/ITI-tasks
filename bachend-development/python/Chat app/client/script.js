const webSocket = new WebSocket("ws://localhost:8080");

let username;

webSocket.onopen = function () {
  console.log("You are connected now");
  username = prompt("enter username:");
  const message = {
    user: username,
    text: "is connected now",
    messageType: "status",
  };
  webSocket.send(JSON.stringify(message));
};

webSocket.onmessage = function (event) {
  const message = JSON.parse(event.data);
  console.log("onmessage", message);
  if (message.messageType == "user") message.messageType = "server";
  showMessage(message);
};

webSocket.onclose = function () {
  console.log("you are offline");
  const message = {
    user: username,
    text: "is offline",
    messageType: "status",
  };
  webSocket.send(JSON.stringify(message));
};

function showMessage(message) {
  const messagesDiv = document.querySelector(".messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = message.messageType + "-message";

  messageDiv.textContent = `${message.user}: ${message.text}`;

  messagesDiv.appendChild(messageDiv);
}

function sendMessage() {
  const messageBox = document.querySelector("input");
  const message = {
    user: username,
    text: messageBox.value,
    messageType: "user",
  };
  messageBox.value = "";
  showMessage(message);
  webSocket.send(JSON.stringify(message));
}
