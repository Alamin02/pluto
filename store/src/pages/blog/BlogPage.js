import React from "react";

import Blogs from "../../components/blogs/Blogs";
import BreadCrumb from "../../components/blogs/BreadCrumb";
import HeaderSection from "../../components/styled-components/HeaderSection";
import MainContainer from "../../components/layout/MainContainer";

export default function BlogPage() {
  return (
    <>
      <MainContainer>
        <div style={{ marginTop: "1rem" }}>
          <HeaderSection headerText="Latest news" />
          <Blogs />
          <BreadCrumb />
        </div>
      </MainContainer>
    </>
  );
}
