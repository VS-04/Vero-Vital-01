// Initialize the socket connection
const socket = io();

function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    if (userMessage.trim() === "") {
        return;  // Don't send empty messages
    }

    // Clear the input field after sending the message
    document.getElementById('user-input').value = "";

    // Display the user's message in the chatbox
    displayMessage("You: " + userMessage);

    // Send the user's message to the server
    socket.emit('user_message', { message: userMessage });
}

// Function to display a message in the chatbox
function displayMessage(message) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);

    // Scroll to the bottom of the chatbox to see the new message
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Listen for the chatbot's reply
socket.on('chatbot_reply', function (data) {
    displayMessage("Chatbot: " + data.reply);
});
