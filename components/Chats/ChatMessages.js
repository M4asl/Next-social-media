import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Messages/Message";

const useStyles = makeStyles((theme) => ({
  chatMessagesContainer: {
    width: "100%",
    height: "82%",
    background: "#2D2D2D",
  },
}));

const ChatMessages = () => {
  const classes = useStyles();

  const { messageReducer, userReducer } = useSelector(
    (state) => state,
  );
  const [messages, setMessages] = useState(messageReducer.messages);
  const { currentUserDetails } = userReducer;
  return (
    <div className={classes.chatMessagesContainer}>
      {messages.map((message, index) => (
        <Message
          key={message._id}
          message={message}
          index={index}
          messages={messages}
          currentUserDetails={currentUserDetails}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
