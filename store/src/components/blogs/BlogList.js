import React from "react";
import { Row, Col } from "antd";
import styles from "./BlogList.module.css";
import BlogCard from "./BlogCard";
import sampleBlogList from "./sampleBlogList";

export default function BlogList() {
  return (
    <div className={styles.container}>
      <Row gutter={[32, 32]}>
        {sampleBlogList.map((blog) => (
          <Col key={blog.id} sm={24} md={12} lg={12}>
            <BlogCard
              id={blog.id}
              imageSrc={blog.imageSrc}
              title={blog.title}
              description={blog.description}
              date={blog.date}
              author={blog.author}
              category={blog.category}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
