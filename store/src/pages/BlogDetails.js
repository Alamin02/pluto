import React from "react";
import { useParams } from "react-router-dom";
import sampleBlogList from "../components/blogs/sampleBlogList";
import BlogDetailsCard from "../components/blogs/BlogDetailsCard";
import Error404 from "../components/error-404/Error404";
import appStyles from "../App.module.css";

export default function BlogDetails() {
  const { id } = useParams();

  const blog = sampleBlogList.find((blog) => blog.id === id);

  if (!blog) return <Error404 />;

  return (
    <div className={appStyles.containerMain}>
      <BlogDetailsCard blog={blog} />
    </div>
  );
}
