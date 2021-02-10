import React from "react";
import { Space } from "antd";
import styles from "./Blogs.module.css";
import ButtonBlack from "../styled-components/ButtonBlack";
const BlogCard = ({ imageSrc, description, title, date, author, category }) => {
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
            <p>{description}</p>
            <ButtonBlack buttonText="Read More" onClick={() => onclick} />
          </div>
        </Space>
      </div>
    </div>
  );
};
export default BlogCard;
