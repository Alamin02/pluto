import React from "react";

import BlogList from "../../components/blogs/BlogList";
import BreadCrumb from "../../components/blogs/BreadCrumb";
import HeaderSection from "../../components/styled-components/HeaderSection";
import MainContainer from "../../components/layout/MainContainer";

export default function Blogs() {
  return (
    <>
      <MainContainer>
        <div style={{ marginTop: "1rem" }}>
          <HeaderSection headerText="Latest news" />
          <BlogList />
          <BreadCrumb />
        </div>
      </MainContainer>
    </>
  );
}
