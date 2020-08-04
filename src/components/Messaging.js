import React, { useState, useEffect } from "react";
import socket from "../socket";

import Navbar from "./utils/Navbar";
import {
  Container,
  makeStyles,
  Box,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  chatContainer: {
    width: "60%",
    border: "1px solid #F8F8F8",
    height: "500px",
    margin: "100px auto",
    borderRadius: "5px",
    boxShadow: "0 0 12px rgba(0,0,0,0.2)",
    display: "flex",
  },
  openChats: {
    borderRight: "2px solid #ECECEC",
  },
  sendButton: {
    fontWeight: "bold",
  },
  // directMessages: {
  //   borderBottom: "1px solid #F8F8F8"
  // }
  // messageInput: {
  //   position: "absolute",
  //   bottom: 0
  //
});

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

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.chatContainer}>
        <Box
          display="flex"
          flexDirection="column"
          flexBasis="40%"
          className={classes.openChats}
        >
          <Box display="flex" height="50%" flexDirection="column">
            <h1>Direct messages</h1>
          </Box>
          <Box display="flex" height="50%" flexDirection="column">
            <h1>Group messages</h1>
          </Box>
        </Box>
        <Box display="flex" flexBasis="60%">
          <Box></Box>
          <Box
            display="flex"
            alignSelf="flex-end"
            width="100%"
            justifyContent="space-between"
          >
            <Box width="85%" ml={1}>
              <TextField
                type="text"
                fullWidth
                multiline
                value={message}
                placeholder=" Add message..."
                onChange={(e) => setMessage(e.target.value)}
              />
            </Box>
            <Button
              onClick={handlePostMessage}
              color="secondary"
              size="medium"
              className={classes.sendButton}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
      {/* <div>
        {messages.length > 0 &&
          messages.map((msg, i) => (
            <div key={i}>
              <p>{msg}</p>
            </div>
          ))}
        <input
          value={message}
          name="message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handlePostMessage}>Send Message</button>
      </div> */}
    </>
  );
};

export default Messaging;
