import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";
import Suggestion from "../components/Profile/Suggestion";
import NewPost from "../components/Post/NewPost";
import ChatColumn from "../components/Chats/ChatColumn";
import PostList from "../components/Post/PostList";
import { wrapper } from "../store/store";
import { listNewsFeed } from "../store/actions/postActions";
import { authCookie } from "../store/actions/authActions";
import {
  findPeople,
  getCurrentUserDetails,
} from "../store/actions/userActions";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "10px",
      backgroundColor: "#bfbfbf",
      borderRadius: "15px",
    },
    "*::-webkit-scrollbar-track": {
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "15px",
      backgroundColor: "#bfbfbf",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: "15px",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "#2d2d2d",
    },
  },
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "66px",
    width: "100%",
    height: "calc(100vh - 66px)",
    zIndex: "900",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.white,
  },
  center: {
    margin: "0px auto",
  },
}));

function Home() {
  const classes = useStyles();
  const { postReducer, userReducer } = useSelector((state) => state);

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between">
        <Hidden mdDown>
          <Grid item xs={3} style={{ padding: "0px 20px" }}>
            <Profile />
            <Suggestion userReducer={userReducer} />
          </Grid>
        </Hidden>
        <Grid item xs={10} md={8} lg={5} className={classes.center}>
          <NewPost />
          <PostList postReducer={postReducer} />
        </Grid>
        <Hidden smDown>
          <Grid item xs={3}>
            <ChatColumn />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const { token } = await parseCookies({ req });
      if (!token) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      await store.dispatch(authCookie(req.headers.cookie));
      await store.dispatch(
        getCurrentUserDetails(req.headers.cookie, req),
      );
      await store.dispatch(listNewsFeed(req.headers.cookie, req));
      await store.dispatch(findPeople(req.headers.cookie, req));
      return {
        props: {},
      };
    },
);

export default Home;
