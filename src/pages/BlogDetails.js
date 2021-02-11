import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import sampleBlogList from "../components/blogs/sampleBlogList";
import BlogDetailsCard from "../components/blogs/BlogDetailsCard";
import Error404 from "../components/error-404/Error404";
import styles from "../components/blogs/Blogs.module.css";

export default function BlogDetails() {
  const { id } = useParams();

  const blog = sampleBlogList.find((blog) => blog.id === id);

  if (!blog) return <Error404 />;

  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span="18">
          <BlogDetailsCard blog={blog} />
        </Col>
      </Row>
    </div>
  );
}
