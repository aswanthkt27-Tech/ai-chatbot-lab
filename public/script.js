const sendBtn = document.getElementById("send-btn");

const userInput = document.getElementById("user-input");

const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    sendMessage();
  }

});

async function sendMessage() {

  const message = userInput.value.trim();

  if (!message) return;

  addMessage(message, "user");

  userInput.value = "";

  sendBtn.disabled = true;

  const loadingDiv = addMessage("Thinking...", "ai");

  try {

    const response = await fetch("/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: message
      })

    });

    const aiReply = await response.text();

    loadingDiv.remove();

    addMessage(aiReply, "ai");

    sendBtn.disabled = false;

  } catch (error) {

    console.error(error);

    addMessage("Something went wrong", "ai");

    sendBtn.disabled = false;

  }

}

function addMessage(text, sender) {

  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message");

  messageDiv.classList.add(sender);

  messageDiv.innerText = text;

  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  return messageDiv;

}