import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import styles from "./BlogList.module.css";
import BlogCard from "./BlogCard";
// import sampleBlogList from "./sampleBlogList";
import { agent } from "../../helpers/agent";

export default function BlogList() {
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
  return (
    <div className={styles.container}>
      <Row gutter={[32, 32]}>
        {blogData.map((blog) => (
          <Col key={blog.id} sm={24} md={12} lg={12}>
            <BlogCard
              id={blog.id}
              // imageSrc={blog.imageSrc}
              imageSrc={blog.path}
              title={blog.title}
              description={blog.description}
              // date={blog.date}
              date={new Date().toDateString()}
              author={blog.author}
              // category={blog.category}
              category={"web design"}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
