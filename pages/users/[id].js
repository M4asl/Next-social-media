import React from "react";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { getUserDetails } from "../../store/actions/userActions";
import { wrapper } from "../../store/store";
import {
  authCookie,
  getCurrentUserDetails,
} from "../../store/actions/authActions";
import UserProfileDetails from "../../components/User/UserProfileDetails";
import { listByUser } from "../../store/actions/postActions";
import PostList from "../../components/Post/PostList";

const useStyles = makeStyles((theme) => ({
  userDetailsContainer: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    zIndex: "100",
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const UserProfile = () => {
  const { userReducer, postReducer } = useSelector((state) => state);
  const classes = useStyles();
  return (
    <div className={classes.userDetailsContainer}>
      <UserProfileDetails
        userReducer={userReducer}
        postReducer={postReducer}
      />
      <PostList postReducer={postReducer} />
    </div>
  );
};

export default UserProfile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { token } = await parseCookies(ctx);
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const { id } = ctx.params;
    await store.dispatch(authCookie(ctx.req.headers.cookie));
    await store.dispatch(
      getCurrentUserDetails(ctx.req.headers.cookie, ctx.req),
    );
    await store.dispatch(
      getUserDetails(id, ctx.req.headers.cookie, ctx.req),
    );
    await store.dispatch(
      listByUser(ctx.req.headers.cookie, id, ctx.req),
    );
    return {
      props: {},
    };
  },
);
