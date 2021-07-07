import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listNewsFeed } from "../../store/actions/postActions";
import Post from "./Post";
import Loader from "../Layout/Loader";
import Error from "../Layout/Error";

const PostList = () => {
  const dispatch = useDispatch();
  const postListNewsFeed = useSelector(
    (state) => state.postListNewsFeed,
  );
  const { loading, posts, error } = postListNewsFeed;

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {posts &&
        posts.map((item) => <Post post={item} key={item._id} />)}
    </div>
  );
};

export default PostList;

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ req }) => {
//     await store.dispatch(listNewsFeed);
//   },
// );
