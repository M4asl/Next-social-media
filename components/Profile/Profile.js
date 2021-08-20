import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import Error from "../Layout/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100,
    position: "sticky",
    top: "10%",
    left: "6%",
    borderRadius: "20px",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 2px 12px 0 rgba( 255, 255, 255, 0.2 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    overflowWrap: "anyhere",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { authReducer, alert } = useSelector((state) => state);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt="Avatar Picture"
            src={`../../dist/img/users/${authReducer.currentUserDetails.photo}`}
          />
        }
        title={authReducer.currentUserDetails.name}
        subheader={authReducer.currentUserDetails.email}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {authReducer.loading ? (
            <Loader />
          ) : alert.error ? (
            <Error />
          ) : (
            authReducer.currentUserDetails &&
            authReducer.currentUserDetails.about
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
