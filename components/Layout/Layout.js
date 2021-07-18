import React from "react";
import { useSelector } from "react-redux";
import Background from "./Background";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import Loader from "./Loader";
import Error from "./Error";

const Layout = ({ children }) => {
  const { loading, error, currentUserDetails } = useSelector(
    (state) => state.getCurrentUserDetails,
  );
  return (
    <>
      <HeadTags />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        currentUserDetails && <Navbar />
      )}
      {children}
      <Background />
    </>
  );
};

export default Layout;
