import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  chatMessagesContainer: {
    width: "100%",
    height: "82%",
    background: "#2D2D2D",
  },
}));

const ChatMessages = () => {
  const classes = useStyles();
  return (
    <div className={classes.chatMessagesContainer}>
      <h1>Chat messages</h1>
    </div>
  );
};

export default ChatMessages;
