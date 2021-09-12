import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
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
  const router = useRouter();
  const { messageReducer, userReducer } = useSelector(
    (state) => state,
  );
  const [messages, setMessages] = useState(messageReducer.messages);
  const { currentUserDetails } = userReducer;

  useEffect(() => {
    setMessages(messageReducer.messages);
  }, [router]);

  return (
    <div className={classes.chatMessagesContainer}>
      <ul>
        {messages.map((message, index) => (
          <Message
            key={message._id}
            message={message}
            index={index}
            messages={messages}
            currentUserDetails={currentUserDetails}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
