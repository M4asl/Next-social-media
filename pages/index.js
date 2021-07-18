import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { parseCookies } from "nookies";
import { connect } from "react-redux";
import Profile from "../components/Profile/Profile";
import Suggestion from "../components/Profile/Suggestion";
import NewPost from "../components/Post/NewPost";
import ChatColumn from "../components/Chats/ChatColumn";
import PostList from "../components/Post/PostList";
import { wrapper } from "../store/store";
import { listNewsFeed } from "../store/actions/postActions";
import {
  getCurrentUserDetails,
  authCookie,
} from "../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
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

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between">
        <Hidden mdDown>
          <Grid item xs={3}>
            <Profile />
            <Suggestion />
          </Grid>
        </Hidden>
        <Grid item xs={10} md={8} lg={5} className={classes.center}>
          <NewPost />
          <PostList />
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
      return {
        props: {},
      };
    },
);

export default Home;
