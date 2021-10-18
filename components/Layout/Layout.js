import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Background from "./Background";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import Loader from "./Loader";

const Layout = ({ children }) => {
  const { userReducer } = useSelector((state) => state);
  return (
    <>
      <HeadTags />
      {userReducer.loading ? (
        <Loader />
      ) : (
        Object.keys(userReducer.currentUserDetails).length > 1 && (
          <Navbar />
        )
      )}
      {children}
      <Background />
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.elementType.isRequired,
};
