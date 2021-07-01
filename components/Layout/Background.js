import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  circleOne: {
    background: `linear-gradient(-45deg, #D8B5FF, #1EAE98)`,
    width: 230,
    height: 230,
    position: "fixed",
    top: "23%",
    left: "-5%",
    borderRadius: "300px",
  },
  circleTwo: {
    background: `linear-gradient(90deg, #FF61D2, #FE9090)`,
    width: 120,
    height: 120,
    position: "fixed",
    top: "6%",
    left: "20%",
    borderRadius: "300px",
  },
  circleThree: {
    background: `linear-gradient(120deg, #BFF098, #6FD6FF)`,
    width: 420,
    height: 420,
    position: "fixed",
    top: "44%",
    left: "23%",
    borderRadius: "300px",
  },
  circleFour: {
    background: `linear-gradient(180deg, #EA8D8D, #A890FE)`,
    width: 279,
    height: 279,
    position: "fixed",
    top: "4%",
    left: "72%",
    borderRadius: "300px",
  },
});

const Background = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.circleOne} />
      <div className={classes.circleTwo} />
      <div className={classes.circleThree} />
      <div className={classes.circleFour} />
    </>
  );
};

export default Background;
