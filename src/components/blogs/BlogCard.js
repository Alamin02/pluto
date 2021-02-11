import React from "react";
import { Space } from "antd";
import { Link } from "react-router-dom";
import styles from "./Blogs.module.css";
import ButtonBlack from "../styled-components/ButtonBlack";
const BlogCard = ({
  imageSrc,
  description,
  title,
  date,
  author,
  category,
  id,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBody}>
        <Space direction="vertical" size={"small"}>
          <img className={styles.imgStyled} src={imageSrc} alt="blog demo" />
          <div className={styles.cardBodyText}>
            <h2>{title}</h2>
            <p>
              {date} <strong>|</strong> by <b>{author}</b> <b>|</b> in{" "}
              <b>{category}</b>
            </p>
            <p className={styles.textClip}>{description}</p>
            <Link to={`/blogs/${id}`}>
              <ButtonBlack buttonText="Read More" onClick={() => onclick} />
            </Link>
          </div>
        </Space>
      </div>
    </div>
  );
};
export default BlogCard;
