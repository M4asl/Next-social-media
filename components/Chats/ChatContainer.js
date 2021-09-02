import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import ChatMessages from "./ChatMessages";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    height: "calc(100vh - 66px)",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const Chat = ({ widthProps }) => {
  const classes = useStyles();

  return (
    <div
      style={{ width: `${widthProps}` }}
      className={classes.chatContainer}
    >
      <ChatHeader />
      <ChatMessages />
      <ChatInputs />
    </div>
  );
};

export default Chat;
