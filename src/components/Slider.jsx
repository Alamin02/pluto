import React, { Component } from "react";
import { Carousel, Button } from "antd";
import {
  LeftCircleOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
const slideHeading = "MINIMAL SUMMER COLLECTION";
const description =
  "But I must explain you how all this mistaken idea of organized by the charms demouncing plesure and pain was";

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
      <div className="main-container">
        <LeftOutlined className="arrow-left" onClick={this.previous} />
        {/* <DoubleLeftOutlined className='arrow-left' onClick={this.previous}/> */}

        <Carousel
          autoplay
          effect="fade"
          className="slider-container"
          ref={(node) => (this.carousel = node)}
          {...props}
        >
          <div className="slider one">
            {/* <img src="images/slider-image1.jpg" alt="images"/> */}
            <div className="t-box">
              <h1>{slideHeading}</h1>
              <p>{description}</p>
              <Button className="btn-custom">Shop Now</Button>
            </div>
          </div>
          <div className="slider two">
            <div className="t-box">
              <h1>{slideHeading}</h1>
              <p>{description}</p>
              <Button className="btn-custom">Shop Now</Button>
            </div>
          </div>
          <div className="slider three">
            <div className="t-box">
              <h1>{slideHeading}</h1>
              <p>{description}</p>
              <Button className="btn-custom">Shop Now</Button>
            </div>
          </div>
          <div className="slider four">
            <div className="t-box">
              <h1>{slideHeading}</h1>
              <p>{description}</p>
              <Button className="btn-custom">Shop Now</Button>
            </div>
          </div>
        </Carousel>
        <RightOutlined className="arrow-right" onClick={this.next} />
        {/* <DoubleRightOutlined className='arrow-right' onClick={this.next}/> */}
      </div>
    );
  }
}
