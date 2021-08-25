import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FollowProfileButton from "../Layout/FollowProfileButton";

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
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);

  const clickFollowButton = (callApi) => {
    dispatch(
      callApi(
        userReducer.currentUserDetails._id,
        userReducer.user._id,
      ),
    );
    setFollowing(!following);
  };

  const checkFollow = (user) => {
    // console.log(user.followers);
    const matchFollowers = user?.followers.some(
      (follower) =>
        follower._id == userReducer.currentUserDetails._id,
    );
    return matchFollowers;
  };

  useEffect(() => {
    if (
      userReducer &&
      Object.keys(userReducer).length === 0 &&
      userReducer.constructor === Object
    ) {
      return true;
    }
    const following = checkFollow(userReducer.user);
    // console.log(following);
    setFollowing(following);
  }, [userReducer]);

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
      <CardActions>
        <FollowProfileButton
          following={following}
          onButtonClick={clickFollowButton}
        />
        <Button
          variant="outlined"
          color="primary"
          style={{ width: "50%" }}
        >
          Message
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserProfileDetails;
