import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogDetails from "../../components/blogs/BlogDetails";
import Error404 from "../../components/error-404/Error404";
import MainContainer from "../../components/layout/MainContainer";
import { agent } from "../../helpers/agent";
export default function Blog() {
  const { id } = useParams();
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    agent
      .getBlogs()
      .then((res) => res.json())
      .then(({ data }) => {
        setBlogList(data.blogs);
      });
  }, []);

  const blog = blogList.find((blog) => blog.id === id);

  if (!blog) return <Error404 />;

  return (
    <MainContainer>
      <BlogDetails blog={blog} />
    </MainContainer>
  );
}
