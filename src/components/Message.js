// Message.js
import React from 'react';
import './Message.css';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === 'user' ? 'user' : 'chatbot'}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
