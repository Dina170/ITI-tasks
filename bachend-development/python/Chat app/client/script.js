const webSocket = new WebSocket("ws://localhost:8080");

let username;

webSocket.onopen = function () {
  console.log("You are connected now");
  username = prompt("enter username:");
  const message = {
    user: username,
    text: "is connected now",
    // messageType: "status"
  };
  webSocket.send(JSON.stringify(message));
};

webSocket.onmessage = function (event) {
  const message = JSON.parse(event.data);
  console.log(message);

  showMessage(message, "server");
};

webSocket.onclose = function () {
  console.log("you are offline");
  showMessage(`${username} is offline`, "status");
};

function showMessage(message, messageType) {
  const messagesDiv = document.querySelector(".messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = messageType + "-message";

  if (messageType === "status") {
    messageDiv.textContent = message;
  } else {
    messageDiv.textContent = `${message.user}: ${message.text}`;
  }

  messagesDiv.appendChild(messageDiv);
}

function sendMessage() {
  const messageBox = document.querySelector("input");
  const message = {
    user: username,
    text: messageBox.value,
  };
  messageBox.value = "";
  showMessage(message, "user");
  webSocket.send(JSON.stringify(message));
}
