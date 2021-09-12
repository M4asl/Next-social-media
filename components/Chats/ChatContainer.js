import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import ChatMessages from "./ChatMessages";
import Loader from "../Layout/Loader";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    height: "calc(100vh - 66px)",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
}));

const Chat = ({ widthProps }) => {
  const classes = useStyles();
  const { chatReducer } = useSelector((state) => state);

  const { chat } = chatReducer;

  return (
    <div
      style={{ width: `${widthProps}` }}
      className={classes.chatContainer}
    >
      {chat &&
      Object.keys(chat).length > 0 &&
      chat.constructor === Object ? (
        <>
          <ChatHeader />
          <ChatMessages />
          <ChatInputs />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Chat;
