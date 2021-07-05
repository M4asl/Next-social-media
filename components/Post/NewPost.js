import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    zIndex: 100,
    color: theme.palette.text.primary,
    fontWeight: "500",
    background: "rgba( 255, 255, 255, 0.25 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    marginTop: "60px"
  },
  avatar: {
    backgroundColor: red[500],
  },
  textField: {
    background: theme.palette.background.default,
    width: "100%",
    borderRadius: "15px",
    color: theme.palette.text.primary,
  },
  divider: {
    height: "3px",
    backgroundColor: "#bfbfbf",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0px 20px 16px 0px",
  },
  button: {
    backgroundColor: "rgb(23, 105, 170)",
    padding: "8px 24px",
    borderRadius: "7px",
    "&:hover": {
      backgroundColor: "#2196f3"
    }
  },
  button2: {
    backgroundColor: "#eceff1"
  }
}));

const Input = withStyles({
  root: {
    width: "100%",
    borderRadius: "15px",
    background: theme.palette.background.secondary,
    marginTop: "10px",
    "& label": {
      color: theme.palette.text.primary,
    },
    "& label.Mui-focused": {
      color: theme.palette.text.primary,
      fontWeight: "700",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
        borderRadius: "15px",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.primary,
        borderRadius: "15px",
      },
    },
  },
})(TextField);

export default function NewPost() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="M4asl"
        subheader="Mateusz Masłowiec"
      />
      <Divider className={classes.divider} />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          Whats happening?
        </Typography>
        <Input label="Text something..." variant="outlined" />
      </CardContent>
      <div className={classes.buttonContainer}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
        <Button variant="contained" className={classes.button}>Post</Button>
      </div>
    </Card>
  );
}