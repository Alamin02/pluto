import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./BlogList.module.css";

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
        <img className={styles.imgStyled} src={imageSrc} alt="blog demo" />
        <div className={styles.cardBodyText}>
          <h2>{title}</h2>
          <p>
            {date} <strong>|</strong> by <b>{author}</b> <b>|</b> in{" "}
            <b>{category}</b>
          </p>
          <p className={styles.textClip}>{description}</p>
          <Link to={`/blogs/${id}`}>
            <Button
              type="primary"
              style={{ textTransform: "uppercase" }}
              onClick={() => onclick}
            >
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
