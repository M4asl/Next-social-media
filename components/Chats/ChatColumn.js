import React from "react";
import ChatMenu from "./ChatMenu";
import ChatsBackground from "./ChatsBackground";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "calc(100vh - 66px)",
    width: "100%",
    position: "sticky",
    top: "66px"
  },
});

const ChatColumn = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ChatMenu />
      <ChatsBackground />
    </div>
  );
};

export default ChatColumn;
