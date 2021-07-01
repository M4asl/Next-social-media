import React from "react";
import Background from "./Background";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <>
    <HeadTags />
    <Navbar />
    {children}
    <Background />
  </>
);

export default Layout;
