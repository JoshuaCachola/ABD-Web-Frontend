import React, { useState, useEffect } from "react";
import socket from "../socket";

const Messaging = () => {
  const [messages, setMessages] = useState(["Hello"]),
    [message, setMessage] = useState("");

  useEffect(
    () => {
      getMessages();
    },
    // eslint-disable-next-line
    [messages.length]
  );

  const getMessages = () => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
  };

  const handlePostMessage = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please add a message to send...");
    }
  };

  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
      <input
        value={message}
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handlePostMessage}>Send Message</button>
    </div>
  );
};

export default Messaging;
