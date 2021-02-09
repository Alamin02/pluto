import React from "react";
import Blogs from "../components/blogs/Blogs";
import BreadCrumb from "../components/blogs/BreadCrumb";
import MainHeader from "../components/main-header/MainHeader";

export default function BlogPage() {
  return (
    <>
      <MainHeader name="Latest News" sub="home - shop - Blogs" />
      <Blogs />
      <BreadCrumb />
    </>
  );
}
