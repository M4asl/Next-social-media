import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Loader from "../Layout/Loader";
import Error from "../Layout/Error";

const PostList = ({ postReducer }) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    setPostList(postReducer.posts);
  }, [postReducer]);

  return (
    <div>
      {postReducer.loading && <Loader />}
      {/* { && <Error />} */}
      {postReducer.posts &&
        postList.map((item) => <Post post={item} key={item._id} />)}
    </div>
  );
};

export default PostList;
