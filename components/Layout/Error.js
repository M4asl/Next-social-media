import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    fontSize: "20px",
    textAlign: "center",
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    lineHeight: "1.4",
  },
}));

const Error = ({ errorMessage }) => {
  const classes = useStyles();

  return (
    <Typography
      component="span"
      variant="body2"
      className={classes.error}
    >
      {errorMessage}
    </Typography>
  );
};

export default Error;
