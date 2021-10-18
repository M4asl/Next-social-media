import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import cookie from "js-cookie";
import PropTypes from "prop-types";
import LoadPost from "./LoadPost";
import Post from "./Post";
import Loader from "../Layout/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    zIndex: 100,
    color: theme.palette.text.primary,
    fontWeight: "500",
    background: "rgba( 255, 255, 255, 0.25 )",
    backdropFilter: "blur( 10.0px )",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    marginTop: "20px",
    height: "20vh",
  },
}));

const PostList = ({ postReducer }) => {
  const classes = useStyles();
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const [postList, setPostList] = useState([]);
  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    setPostList(postReducer.posts);
  }, [postReducer]);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts/feed`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });
      // console.log(res.data.length);
      if (res.data.length === 0) setHasMore(false);

      setPostList((prev) => [...prev, ...res.data]);
      console.log(pageNumber);
      setPageNumber((prev) => prev + 1);
      console.log(pageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {postReducer.loading && <Loader />}
      {postReducer.posts.length > 0 ? (
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<LoadPost />}
          endMessage={<h1>No posts.</h1>}
          dataLength={postList.length}
        >
          {postList.map((item) => (
            <Post post={item} key={item._id} />
          ))}
        </InfiniteScroll>
      ) : (
        <>
          <div className={classes.root}>
            <Typography
              style={{
                fontSize: "1.3rem",
                color: "#141414",
                letterSpacing: "0.02rem",
              }}
            >
              No posts yet.
            </Typography>
            <Typography
              style={{
                fontSize: "1.3rem",
                color: "#141414",
                letterSpacing: "0.02rem",
              }}
            >
              {router.route.includes("users")
                ? "This user has no posts yet."
                : "Create new post or follow some users."}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;

PostList.propTypes = {
  postReducer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
