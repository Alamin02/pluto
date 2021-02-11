import React from "react";
import { Row, Col } from "antd";
import styles from "./Blogs.module.css";
import BlogCard from "./BlogCard";
import sampleBlogList from "./sampleBlogList";

const date = new Date().toDateString();

export default function Blogs() {
  return (
    <div className={styles.container}>
      <Row gutter={[8, 8]} justify="center">
        {sampleBlogList.map((blog) => (
          <Col key={blog.id} sm={18} md={12} lg={12}>
            <BlogCard
              id={blog.id}
              imageSrc={blog.imageSrc}
              title={blog.title}
              description={blog.description}
              date={date}
              author="admin"
              category="web design"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
