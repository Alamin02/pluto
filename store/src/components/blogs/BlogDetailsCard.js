import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import ButtonBlack from "../styled-components/ButtonBlack";
import styles from "../blogs/BlogDetails.module.css";
const BlogDetailsCard = ({ blog }) => (
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
            <CalendarOutlined /> {blog.date}
          </b>
        </li>
        <li>
          <b>Category: {blog.category}</b>
        </li>
      </ul>
    </div>
    <div className={styles.imageContainer}>
      <img className={styles.imageStyled} src={blog.imageSrc} alt="demo" />
    </div>
    <p className={styles.descriptionText}>{blog.description}</p>
    <Link to="/blogs">
      <ButtonBlack buttonText="Back " onClick={() => onclick} />
    </Link>
  </>
);
export default BlogDetailsCard;
