import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Loader from "../Layout/Loader";
import Error from "../Layout/Error";

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const postListNewsFeed = useSelector(
    (state) => state.postListNewsFeed,
  );
  const { loading, posts, error } = postListNewsFeed;
  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {posts &&
        postList.map((item) => <Post post={item} key={item._id} />)}
    </div>
  );
};

export default PostList;
