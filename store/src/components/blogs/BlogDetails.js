import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import styles from "../blogs/BlogDetails.module.css";

const BlogDetails = ({ blog }) => (
  <>
    <h1 className={styles.h1Styled}>{blog.title}</h1>
    <div>
      <ul className={styles.listStyled}>
        <li>
          <b>
            <UserOutlined /> {blog.author}
          </b>
        </li>
        <li>
          <b>
            <CalendarOutlined /> {new Date().toDateString()}
            {/* <CalendarOutlined /> {blog.date} */}
          </b>
        </li>
        <li>
          {/* <b>Category: {blog.category}</b> */}
          <b>Category: {"Web design"}</b>
        </li>
      </ul>
    </div>
    <div className={styles.imageContainer}>
      <img className={styles.imageStyled} src={blog.path} alt="demo" />
      {/* <img className={styles.imageStyled} src={blog.imageSrc} alt="demo" /> */}
    </div>
    <p className={styles.descriptionText}>{blog.description}</p>
    <Link to="/blogs">
      <Button
        type="primary"
        style={{ textTransform: "uppercase" }}
        onClick={() => onclick}
      >
        Back
      </Button>
    </Link>
  </>
);

export default BlogDetails;
