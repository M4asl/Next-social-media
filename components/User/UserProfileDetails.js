import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "250px",
    color: theme.palette.text.primary,
    fontWeight: "500",
    background: "rgba( 255, 255, 255, 0.25 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
  divider: {
    height: "3px",
    backgroundColor: "#bfbfbf",
  },
  countContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 16px",
  },
}));

const UserProfileDetails = ({ userReducer, postReducer }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt="Avatar Picture"
            src={`../../dist/img/users/${userReducer.user.photo}`}
          />
        }
        title={userReducer.user.name}
        subheader={userReducer.user.email}
      />
      <Divider className={classes.divider} />
      <CardContent className={classes.countContainer}>
        <Typography
          variant="overline"
          color="textPrimary"
          component="p"
          style={{ fontWeight: "700" }}
        >
          {userReducer.user.followers.length === 0
            ? "0"
            : userReducer.user.followers.length}{" "}
          followers
        </Typography>
        <Typography
          variant="overline"
          color="textPrimary"
          component="p"
          style={{ fontWeight: "700" }}
        >
          {userReducer.user.following.length === 0
            ? "0"
            : userReducer.user.following.length}{" "}
          following
        </Typography>
        <Typography
          variant="overline"
          color="textPrimary"
          component="p"
          style={{ fontWeight: "700" }}
        >
          {postReducer.posts.length === 0
            ? "0"
            : postReducer.posts.length}{" "}
          posts
        </Typography>
      </CardContent>
      <Divider className={classes.divider} />
    </Card>
  );
};

export default UserProfileDetails;
