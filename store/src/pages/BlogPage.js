import React from "react";
import Blogs from "../components/blogs/Blogs";
import BreadCrumb from "../components/blogs/BreadCrumb";
import MainHeader from "../components/main-header/MainHeader";
import HeaderSection from "../components/styled-components/HeaderSection";
import appStyles from "../App.module.css";

const container = {
  marginTop: "1rem",
};

export default function BlogPage() {
  return (
    <>
      <div className={appStyles.containerMain}>
        <div style={container}>
          {/* <MainHeader name="Latest News" sub="home - shop - Blogs" /> */}
          <HeaderSection headerText="Latest news" />
          <Blogs />
          <BreadCrumb />
        </div>
      </div>
    </>
  );
}
