import React, { Component } from "react";
import { Carousel, Row } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import styles from "./Slider.module.css";
import "./SliderDots.css";
import ButtonStyled from "../ButtonStyled";
const btnText = "Shop Now";
const Slide = ({ imageClass, heading, desc }) => {
  return (
    <div className={imageClass}>
      <div className={styles.tBox}>
        <h1>{heading}</h1>
        <p>{desc}</p>
        <ButtonStyled title={btnText} />
      </div>
    </div>
  );
};
const slideList = [
  {
    id: 1,
    imgClass: styles.one,
    slideHeading: "MINIMAL SUMMER COLLECTION 1",
    description:
      "But I must explain you how all this mistaken idea of organized by the charms demouncing plesure and pain was",
  },
  {
    id: 2,
    imgClass: styles.two,
    slideHeading: "MINIMAL SUMMER COLLECTION 2",
    description:
      "A watch is a portable timepiece intended to be carried or worn by a living being. It is designed to keep a consistent movement",
  },
  {
    id: 3,
    imgClass: styles.three,
    slideHeading: "MINIMAL SUMMER COLLECTION 3",
    description:
      "One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material",
  },
  {
    id: 4,
    imgClass: styles.four,
    slideHeading: "MINIMAL SUMMER COLLECTION 4",
    description:
      "One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material,",
  },
];
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }
  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }

  render() {
    const props = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Row>
        <div className={styles.mainContainer}>
          <LeftOutlined className={styles.arrowLeft} onClick={this.previous} />
          <Carousel
            autoplay
            effect="fade"
            ref={(node) => (this.carousel = node)}
            {...props}
          >
            {slideList.map((slide) => (
              <Slide
                imageClass={slide.imgClass}
                heading={slide.slideHeading}
                desc={slide.description}
              />
            ))}
          </Carousel>
          <RightOutlined className={styles.arrowRight} onClick={this.next} />
        </div>
      </Row>
    );
  }
}
