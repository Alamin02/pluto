import React from "react";
import { Row, Col } from "antd";
import styles from "./Blogs.module.css";
import image1 from "../../assets/images/slider-image1.jpg";
import image2 from "../../assets/images/slider-image2.jpg";
import image3 from "../../assets/images/slider-image3.jpg";
import image4 from "../../assets/images/slider-image4.jpg";
import BlogCard from "./BlogCard";

const titleAndDescription = [
  {
    id: "1",
    imageSrc: image1,
    title: "This is a demo title 1",
    description: `It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
  {
    id: "2",
    imageSrc: image2,
    title: "This is a demo title 2",
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
  {
    id: "3",
    imageSrc: image3,
    title: "This is a demo title 3",
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
  {
    id: "4",
    imageSrc: image4,
    title: "This is a demo title 4",
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
];

const date = new Date().toDateString();

export default function Blogs() {
  return (
    <div className={styles.container}>
      <Row gutter={[8, 8]}>
        {titleAndDescription.map((cardDetails) => (
          <Col key={cardDetails.id} sm={12} md={12} lg={12}>
            <BlogCard
              imageSrc={cardDetails.imageSrc}
              title={cardDetails.title}
              description={cardDetails.description}
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
