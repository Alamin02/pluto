import React from "react";
import Blogs from "../components/blogs/Blogs";
import BreadCrumb from "../components/blogs/BreadCrumb";
// import MainHeader from "../components/main-header/MainHeader";
import HeaderSection from "../components/styled-components/HeaderSection";
import appStyles from "../App.module.css";

export default function BlogPage() {
  return (
    <>
      <div className={appStyles.containerMain}>
        <div>
          <HeaderSection headerText="Latest news" />
          <Blogs />
          <BreadCrumb />
        </div>
      </div>
    </>
  );
}
