import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
// import sampleBlogList from "../components/blogs/sampleBlogList";
import BlogDetailsCard from "../components/blogs/BlogDetailsCard";
import Error404 from "../components/error-404/Error404";
import appStyles from "../App.module.css";
import { agent } from "../helpers/agent";

export default function BlogDetails() {
  const [blogData, setBlogData] = useState([]);

  const fetchBlogs = () => {
    agent
      .getBlogs()
      .then((res) => res.json())
      .then(({ data }) => {
        setBlogData(data.blogs);
        // console.log(data);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const { id } = useParams();

  // const blog = sampleBlogList.find((blog) => blog.id === id);
  const blog = blogData.find((blog) => blog.id === id);

  if (!blog) return <Error404 />;

  return (
    <div className={appStyles.containerMain}>
      <Row justify="center">
        <Col sm={24} md={24} lg={18}>
          <BlogDetailsCard blog={blog} />
        </Col>
      </Row>
    </div>
  );
}
