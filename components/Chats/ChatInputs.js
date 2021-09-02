import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  chatInputsContainer: {
    width: "100%",
    height: "9%",
    background: "rgba( 255, 255, 255, 0.25 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
}));

const ChatInputs = () => {
  const classes = useStyles();
  return (
    <div className={classes.chatInputsContainer}>
      <h1>chat ChatInputs</h1>
    </div>
  );
};

export default ChatInputs;
