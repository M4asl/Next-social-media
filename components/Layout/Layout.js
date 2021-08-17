import React from "react";
import { useSelector } from "react-redux";
import Background from "./Background";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import Loader from "./Loader";
import Error from "./Error";

const Layout = ({ children }) => {
  const { authReducer, alert } = useSelector((state) => state);
  return (
    <>
      <HeadTags />
      {authReducer.loading ? (
        <Loader />
      ) : alert.error ? (
        <Error />
      ) : (
        Object.keys(authReducer.currentUserDetails).length > 1 && (
          <Navbar />
        )
      )}
      {children}
      <Background />
    </>
  );
};

export default Layout;
