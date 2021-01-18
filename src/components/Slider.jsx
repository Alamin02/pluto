import React, { Component } from "react";
import { Carousel} from "antd";
import {LeftCircleOutlined,RightCircleOutlined,DoubleLeftOutlined,DoubleRightOutlined,LeftOutlined} from '@ant-design/icons';

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
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className='main-container'>
         {/* <LeftCircleOutlined className='arrow' onClick={this.previous}/> */}
         <DoubleLeftOutlined className='arrow-left' onClick={this.previous}/>

        <Carousel className='slider-container' ref={node => (this.carousel = node)} {...props}>
       
          <div className='slider' >
            <h3>1</h3>
          </div>
          <div className='slider'>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
         
        </Carousel>
        {/* <RightCircleOutlined className='arrow2' onClick={this.next}/> */}
        <DoubleRightOutlined className='arrow-right' onClick={this.next}/>
        {/* <Icon type="right-circle"  /> */}
      </div>
    );
  }
}