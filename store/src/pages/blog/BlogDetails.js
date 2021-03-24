import React from "react";
import { useParams } from "react-router-dom";

import sampleBlogList from "../../components/blogs/sampleBlogList";
import BlogDetailsCard from "../../components/blogs/BlogDetailsCard";
import Error404 from "../../components/error-404/Error404";
import MainContainer from "../../components/layout/MainContainer";

export default function BlogDetails() {
  const { id } = useParams();

  const blog = sampleBlogList.find((blog) => blog.id === id);

  if (!blog) return <Error404 />;

  return (
    <MainContainer>
      <BlogDetailsCard blog={blog} />
    </MainContainer>
  );
}
