import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChatMenu from "./ChatMenu";
import ChatsBackground from "./ChatsBackground";

const useStyles = makeStyles({
  container: {
    height: "calc(100vh - 66px)",
    position: "sticky",
    top: "66px",
  },
});

const ChatColumn = ({ widthProps }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.container}
      style={{ width: `${widthProps}` }}
    >
      <ChatMenu />
      <ChatsBackground />
    </div>
  );
};

export default ChatColumn;
