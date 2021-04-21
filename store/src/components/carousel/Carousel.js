import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from "swiper";
import "swiper/swiper-bundle.css";
import "./Carousel.css";

import carouselItems from "./carouselItems";
import { Button } from "antd";

SwiperCore.use([Navigation, Pagination, Autoplay, A11y]);

export default function Carousel() {
  return (
    <React.Fragment>
      <Swiper
        navigation
        loop
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3500, disableOnInteraction: true }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) =>
          console.log("onSlideChange >", swiper.activeIndex)
        }
        onSwiper={(swiper) => console.log("onSwiper >")}
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.title}>
            <div>
              <img
                className="carousel-image"
                src={item.image.path}
                alt={item.title}
              />
              <div className="carousel-details-container">
                <p className="carousel-title">{item.title}</p>
                <p className="carousel-summary">{item.summary}</p>
                <Button type="primary" style={{ textTransform: "capitalize" }}>
                  <Link to={item.link}>view product</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </React.Fragment>
  );
}
