import React from "react";
import Blogs from "../components/blogs/Blogs";
import BreadCrumb from "../components/blogs/BreadCrumb";
import MainHeader from "../components/main-header/MainHeader";
import HeaderSection from "../components/styled-components/HeaderSection";

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  marginTop: "1rem",
  padding: "0 1rem",
};

export default function BlogPage() {
  return (
    <>
      <div style={container}>
        {/* <MainHeader name="Latest News" sub="home - shop - Blogs" /> */}
        <HeaderSection headerText="Latest news" />
        <Blogs />
        <BreadCrumb />
      </div>
    </>
  );
}
