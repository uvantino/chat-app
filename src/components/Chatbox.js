// Chatbox.js
import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);

//   const sendMessageToChatGPT = async (message) => {
//     // Implement this function to send messages to ChatGPT API
//     // and update the 'messages' state with the response.
//   };

  const handleSendMessage = async (text) => {
    // Send user message to ChatGPT
    // https://api.openai.com/v1/chat/completions
    const response = await sendMessageToChatGPT(text);

    // Update state with user and ChatGPT messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: 'user' },
      { text: response, sender: 'chatbot' },
    ]);
  };
const sendMessageToChatGPT = async (message) => {
    try {
      const apiKey = 'https://api.openai.com/v1/chat/completions';
      const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: message,
          max_tokens: 150,
        }),
      });
  
      const data = await response.json();
  
      // Assuming the response structure has 'choices' array
      const chatbotResponse = data.choices[0].text.trim();
  
      // Update state with user and ChatGPT messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'user' },
        { text: chatbotResponse, sender: 'chatbot' },
      ]);
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
      // Handle error accordingly, e.g., show an error message to the user
    }
  };
  return (
    <div className="chatbox">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbox;
