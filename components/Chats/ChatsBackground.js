import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chats from "./Chats";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "85%",
    padding: "0px 8px",
    zIndex: 100,
    fontWeight: "500",
    background: "rgba( 255, 255, 255, 0.25 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    overflowY: "scroll",
  },
}));

const ChatsBackground = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Chats />
    </div>
  );
};

export default ChatsBackground;
